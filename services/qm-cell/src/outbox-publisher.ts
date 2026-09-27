import { randomUUID } from "node:crypto";
import type { EventEnvelope, OutboxRow, QmCellStore } from "./types.js";

export type FetchLike = typeof fetch;

export interface PublishOptions {
  harmonyEventsUrl: string;
  fetchImpl?: FetchLike;
  serviceIdentity?: string;
}

export async function publishOutboxRow(
  row: OutboxRow,
  options: PublishOptions,
): Promise<boolean> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const response = await fetchImpl(options.harmonyEventsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": row.event_id,
      "X-Request-ID": row.envelope.correlation_id,
      ...(options.serviceIdentity
        ? { "X-Harmony-Service": options.serviceIdentity }
        : {}),
    },
    body: JSON.stringify(row.envelope),
  });
  if (response.status === 202 || response.status === 200) {
    row.delivered_at = new Date().toISOString();
    return true;
  }
  row.attempts += 1;
  return false;
}

export async function flushOutbox(
  store: QmCellStore,
  options: PublishOptions,
): Promise<number> {
  let delivered = 0;
  for (const row of store.outbox) {
    if (row.delivered_at) {
      continue;
    }
    const ok = await publishOutboxRow(row, options);
    if (ok) {
      delivered += 1;
    }
  }
  return delivered;
}

export function buildStartedEnvelope(params: {
  assignmentId: string;
  tenantId: string;
  taskId: string;
  attemptId: string;
  generation: number;
  aggregateVersion: number;
  correlationId: string;
  providerRunId: string;
}): EventEnvelope {
  return {
    schema_version: "1.0",
    event_id: randomUUID(),
    event_type: "task.started",
    tenant_id: params.tenantId,
    aggregate_type: "task",
    aggregate_id: params.taskId,
    aggregate_version: params.aggregateVersion,
    occurred_at: new Date().toISOString(),
    correlation_id: params.correlationId,
    causation_id: params.assignmentId,
    payload: {
      assignment_id: params.assignmentId,
      attempt_id: params.attemptId,
      generation: params.generation,
      provider_run_id: params.providerRunId,
    },
  };
}

export function buildResultReceivedEnvelope(params: {
  assignmentId: string;
  tenantId: string;
  taskId: string;
  attemptId: string;
  generation: number;
  aggregateVersion: number;
  correlationId: string;
}): EventEnvelope {
  return {
    schema_version: "1.0",
    event_id: randomUUID(),
    event_type: "task.result_received",
    tenant_id: params.tenantId,
    aggregate_type: "task",
    aggregate_id: params.taskId,
    aggregate_version: params.aggregateVersion,
    occurred_at: new Date().toISOString(),
    correlation_id: params.correlationId,
    causation_id: params.assignmentId,
    payload: {
      attempt_id: params.attemptId,
      generation: params.generation,
    },
  };
}
