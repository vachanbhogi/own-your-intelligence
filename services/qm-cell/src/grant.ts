import type { AssignmentBody, HarmonyGrant } from "./types.js";

export function parseHarmonyGrantHeader(raw: string | undefined): HarmonyGrant | null {
  if (!raw || !raw.trim()) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as HarmonyGrant;
    if (
      typeof parsed.tenant_id !== "string" ||
      typeof parsed.task_id !== "string" ||
      typeof parsed.attempt_id !== "string" ||
      typeof parsed.generation !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function grantMatchesAssignment(
  grant: HarmonyGrant,
  assignment: AssignmentBody,
): boolean {
  return (
    grant.tenant_id === assignment.tenant_id &&
    grant.task_id === assignment.task_id &&
    grant.attempt_id === assignment.attempt_id &&
    grant.generation === assignment.generation
  );
}

export function mintTestGrant(assignment: AssignmentBody): HarmonyGrant {
  return {
    tenant_id: assignment.tenant_id,
    task_id: assignment.task_id,
    attempt_id: assignment.attempt_id,
    generation: assignment.generation,
    actions: ["assignment:admit"],
  };
}

export function grantHeaderValue(grant: HarmonyGrant): string {
  return JSON.stringify(grant);
}
