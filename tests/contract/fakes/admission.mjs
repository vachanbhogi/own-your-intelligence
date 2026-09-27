import { validateAgainst, SCHEMA_IDS } from "../helpers/schema.mjs";

/**
 * Minimal QM assignment admission (handoff 06 §5).
 */
export function createAdmissionService() {
  /** @type {Map<string, object>} */
  const admitted = new Map();

  return {
    admit(assignment, { grantTenantId }) {
      const { ok, errors } = validateAgainst(SCHEMA_IDS.assignment, assignment);
      if (!ok) {
        return {
          status: 422,
          body: {
            code: "CONTRACT_INVALID",
            message: "Assignment payload failed schema validation",
            request_id: crypto.randomUUID(),
            retryable: false,
            field_errors: errors.slice(0, 5).map((e) => ({
              field: e.instancePath || e.schemaPath,
              message: e.message ?? "invalid",
            })),
          },
        };
      }

      if (grantTenantId && assignment.tenant_id !== grantTenantId) {
        return {
          status: 403,
          body: {
            code: "TENANT_MISMATCH",
            message: "Payload tenant_id does not match service grant",
            request_id: crypto.randomUUID(),
            retryable: false,
          },
        };
      }

      if (
        (assignment.candidate_id === null) !== (assignment.candidate_revision === null)
      ) {
        return {
          status: 422,
          body: {
            code: "CONTRACT_INVALID",
            message: "candidate_id and candidate_revision must both be null or both set",
            request_id: crypto.randomUUID(),
            retryable: false,
          },
        };
      }

      const record = {
        assignment_id: assignment.assignment_id,
        state: "accepted",
        accepted_at: new Date().toISOString(),
        input_hash: assignment.input_hash,
        generation: assignment.generation,
        task_id: assignment.task_id,
        attempt_id: assignment.attempt_id,
        tenant_id: assignment.tenant_id,
      };
      admitted.set(assignment.assignment_id, record);
      return { status: 202, body: record };
    },

    get(assignmentId) {
      return admitted.get(assignmentId) ?? null;
    },

    count() {
      return admitted.size;
    },
  };
}
