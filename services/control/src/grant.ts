import type { AssignmentBody, HarmonyGrant } from "./types.js";

const DEFAULT_ACTIONS = [
  "assignment:read",
  "artifact:upload",
  "task:complete",
  "context:read",
];

export function mintHarmonyGrant(assignment: AssignmentBody): HarmonyGrant {
  return {
    tenant_id: assignment.tenant_id,
    task_id: assignment.task_id,
    attempt_id: assignment.attempt_id,
    generation: assignment.generation,
    actions: [...DEFAULT_ACTIONS, `task_type:${assignment.task_type}`],
  };
}

export function grantHeaderValue(grant: HarmonyGrant): string {
  return JSON.stringify(grant);
}
