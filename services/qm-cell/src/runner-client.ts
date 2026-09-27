import type { AssignmentBody, TaskResultBody } from "./types.js";
import { RESEARCH_TASK_TYPES } from "./types.js";

export type FetchLike = typeof fetch;

export interface RunnerSession {
  run_id: string;
}

export interface RunnerExecuteResult {
  outcome: "succeeded" | "failed" | "blocked";
  task_result: TaskResultBody;
}

export interface RunnerClientOptions {
  runnerBaseUrl: string;
  fetchImpl?: FetchLike;
}

function bindPayload(assignment: AssignmentBody) {
  return {
    tenant_id: assignment.tenant_id,
    task_id: assignment.task_id,
    attempt_id: assignment.attempt_id,
    generation: assignment.generation,
    assignment_id: assignment.assignment_id,
    task_type: assignment.task_type,
    input_manifest_id: assignment.input_manifest_id,
    context_manifest_id: assignment.context_manifest_id,
    budget: assignment.budget,
  };
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

  const allocateRes = await fetchImpl(`${base}/internal/runner/v1/allocate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bindPayload(assignment)),
  });
  if (!allocateRes.ok) {
    throw new Error(`Runner allocate failed: ${allocateRes.status}`);
  }
  const allocateBody = (await allocateRes.json()) as RunnerSession;

  const prepareRes = await fetchImpl(`${base}/internal/runner/v1/prepare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...bindPayload(assignment), run_id: allocateBody.run_id }),
  });
  if (!prepareRes.ok) {
    throw new Error(`Runner prepare failed: ${prepareRes.status}`);
  }

  const executeRes = await fetchImpl(`${base}/internal/runner/v1/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...bindPayload(assignment), run_id: allocateBody.run_id }),
  });
  if (!executeRes.ok) {
    throw new Error(`Runner execute failed: ${executeRes.status}`);
  }
  const executeBody = (await executeRes.json()) as { task_result: TaskResultBody };
  return {
    outcome: executeBody.task_result.outcome,
    task_result: executeBody.task_result,
  };
}
