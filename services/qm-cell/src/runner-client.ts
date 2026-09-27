import type { AssignmentBody, TaskResultBody } from "./types.js";
import { RESEARCH_TASK_TYPES } from "./types.js";

export type FetchLike = typeof fetch;

export interface RunnerExecuteResult {
  outcome: "succeeded" | "failed" | "blocked";
  task_result: TaskResultBody;
}

export interface RunnerClientOptions {
  runnerBaseUrl: string;
  fetchImpl?: FetchLike;
}

export async function runResearchTaskOnRunner(
  assignment: AssignmentBody,
  options: RunnerClientOptions,
): Promise<RunnerExecuteResult> {
  if (!RESEARCH_TASK_TYPES.has(assignment.task_type)) {
    throw new Error(`Runner hook supports research tasks only; got ${assignment.task_type}`);
  }
  const fetchImpl = options.fetchImpl ?? fetch;
  const base = options.runnerBaseUrl.replace(/\/$/, "");

  const allocateRes = await fetchImpl(`${base}/allocate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tenant_id: assignment.tenant_id,
      task_id: assignment.task_id,
      attempt_id: assignment.attempt_id,
      generation: assignment.generation,
      limits: {
        max_model_micro_usd: assignment.budget.max_model_micro_usd,
        max_wall_seconds: assignment.budget.max_wall_seconds,
        max_tool_calls: assignment.budget.max_tool_calls,
      },
    }),
  });
  if (!allocateRes.ok) {
    throw new Error(`Runner allocate failed: ${allocateRes.status}`);
  }
  const allocateBody = (await allocateRes.json()) as { handle_id: string };

  const prepareRes = await fetchImpl(`${base}/prepare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      handle_id: allocateBody.handle_id,
      input_manifest_id: assignment.input_manifest_id,
      artifact_refs: [assignment.context_manifest_id],
    }),
  });
  if (!prepareRes.ok) {
    throw new Error(`Runner prepare failed: ${prepareRes.status}`);
  }

  const executeRes = await fetchImpl(`${base}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      handle_id: allocateBody.handle_id,
      task_type: assignment.task_type,
    }),
  });
  if (!executeRes.ok) {
    throw new Error(`Runner execute failed: ${executeRes.status}`);
  }
  const executeBody = (await executeRes.json()) as {
    handle_id: string;
    phase: string;
    task_type: string;
    result_artifact_id?: string;
  };

  const succeeded = Boolean(executeBody.result_artifact_id);
  const completedAt = new Date().toISOString();
  const task_result: TaskResultBody = {
    schema_version: "1.0",
    task_id: assignment.task_id,
    attempt_id: assignment.attempt_id,
    generation: assignment.generation,
    outcome: succeeded ? "succeeded" : "failed",
    input_hash: assignment.input_hash,
    result_contract: assignment.result_contract,
    result_artifact_id: executeBody.result_artifact_id ?? null,
    artifact_ids: executeBody.result_artifact_id ? [executeBody.result_artifact_id] : [],
    usage: {
      model_micro_usd: 0,
      wall_seconds: 0,
      tool_calls: 1,
    },
    completed_at: completedAt,
    ...(succeeded
      ? {}
      : {
          error: {
            code: "UPSTREAM_UNKNOWN",
            retryable: true,
            message: "Runner execute completed without a result artifact",
            details_artifact_id: null,
          },
        }),
  };

  return {
    outcome: task_result.outcome === "succeeded" ? "succeeded" : "failed",
    task_result,
  };
}
