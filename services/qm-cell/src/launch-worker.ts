import { randomUUID } from "node:crypto";
import type { AssignmentRecord, QmCellConfig, QmCellStore } from "./types.js";
import { RESEARCH_TASK_TYPES } from "./types.js";
import {
  buildResultReceivedEnvelope,
  buildStartedEnvelope,
  flushOutbox,
  type FetchLike,
} from "./outbox-publisher.js";
import { appendOutboxEvent, markAssignmentRunning } from "./store.js";
import { runResearchTaskOnRunner } from "./runner-client.js";

export interface LaunchWorkerOptions {
  config: QmCellConfig;
  store: QmCellStore;
  fetchImpl?: FetchLike;
  autoLaunch?: boolean;
}

export async function processLaunchQueue(options: LaunchWorkerOptions): Promise<void> {
  const { store, config } = options;
  const fetchImpl = options.fetchImpl ?? fetch;

  for (const launch of store.launchOutbox) {
    if (launch.started_at) {
      continue;
    }
    const assignment = store.assignments.get(launch.assignment_id);
    if (!assignment || assignment.state === "cancelled") {
      launch.started_at = new Date().toISOString();
      continue;
    }

    launch.started_at = new Date().toISOString();

    if (!RESEARCH_TASK_TYPES.has(launch.task_type)) {
      continue;
    }

    try {
      const run = await runResearchTaskOnRunner(assignment.body, {
        runnerBaseUrl: config.runnerBaseUrl,
        fetchImpl,
      });
      const providerRunId = randomUUID();
      markAssignmentRunning(store, assignment.assignment_id, providerRunId);

      const startedVersion =
        (store.aggregateVersions.get(`task:${assignment.task_id}`) ?? 1) + 1;
      store.aggregateVersions.set(`task:${assignment.task_id}`, startedVersion);
      appendOutboxEvent(
        store,
        buildStartedEnvelope({
          assignmentId: assignment.assignment_id,
          tenantId: assignment.tenant_id,
          taskId: assignment.task_id,
          attemptId: assignment.attempt_id,
          generation: assignment.generation,
          aggregateVersion: startedVersion,
          correlationId: assignment.assignment_id,
          providerRunId,
        }),
      );

      if (run.outcome === "succeeded") {
        assignment.state = "succeeded";
      } else {
        assignment.state = "failed";
      }
      assignment.lock_version += 1;

      const resultVersion = startedVersion + 1;
      store.aggregateVersions.set(`task:${assignment.task_id}`, resultVersion);
      appendOutboxEvent(
        store,
        buildResultReceivedEnvelope({
          assignmentId: assignment.assignment_id,
          tenantId: assignment.tenant_id,
          taskId: assignment.task_id,
          attemptId: assignment.attempt_id,
          generation: assignment.generation,
          aggregateVersion: resultVersion,
          correlationId: assignment.assignment_id,
        }),
      );
    } catch {
      assignment.state = "failed";
      assignment.lock_version += 1;
    }
  }

  await flushOutbox(store, {
    harmonyEventsUrl: config.harmonyEventsUrl,
    fetchImpl,
    serviceIdentity: config.tenantId,
  });
}

export function scheduleLaunchProcessing(options: LaunchWorkerOptions): void {
  if (options.autoLaunch === false) {
    return;
  }
  void processLaunchQueue(options);
}
