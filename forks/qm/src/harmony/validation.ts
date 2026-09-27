import type { AssignmentBody } from "./types.js";
import { TASK_TYPE_RESULT_CONTRACT } from "./types.js";
import { formatSchemaErrors, getAssignmentValidator } from "./schema.js";

export function validateAssignmentBody(
  body: unknown,
): { ok: true; assignment: AssignmentBody } | { ok: false; code: string; message: string } {
  const validate = getAssignmentValidator();
  if (!validate(body)) {
    return {
      ok: false,
      code: "CONTRACT_INVALID",
      message: formatSchemaErrors(validate.errors),
    };
  }
  const assignment = body as AssignmentBody;
  const expectedContract = TASK_TYPE_RESULT_CONTRACT[assignment.task_type];
  if (!expectedContract) {
    return {
      ok: false,
      code: "CONTRACT_INVALID",
      message: `Unregistered task_type ${assignment.task_type}`,
    };
  }
  if (assignment.result_contract !== expectedContract) {
    return {
      ok: false,
      code: "CONTRACT_INVALID",
      message: `result_contract must be ${expectedContract} for task_type ${assignment.task_type}`,
    };
  }
  return { ok: true, assignment };
}

export function assertDeploymentTenant(
  assignmentTenantId: string,
  deploymentTenantId: string,
): { ok: true } | { ok: false; code: string; message: string } {
  if (assignmentTenantId !== deploymentTenantId) {
    return {
      ok: false,
      code: "TENANT_MISMATCH",
      message: "Assignment tenant_id does not match QM cell deployment binding",
    };
  }
  return { ok: true };
}
