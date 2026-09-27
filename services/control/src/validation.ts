import type { AssignmentBody, Tenant } from "./types.js";
import {
  RESEARCH_RESULT_CONTRACT,
  RESEARCH_TASK_TYPES,
} from "./types.js";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HASH_RE = /^[a-f0-9]{64}$/;

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

export function validateResearchAssignment(
  body: unknown,
  tenant: Tenant | undefined,
): { ok: true; assignment: AssignmentBody } | { ok: false; code: string; message: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, code: "CONTRACT_INVALID", message: "Body must be a JSON object" };
  }
  const b = body as Record<string, unknown>;

  if (b.schema_version !== "1.0") {
    return { ok: false, code: "CONTRACT_INVALID", message: "schema_version must be 1.0" };
  }

  const requiredStrings = [
    "assignment_id",
    "tenant_id",
    "task_id",
    "attempt_id",
    "input_manifest_id",
    "context_manifest_id",
    "deadline_at",
    "result_contract",
    "input_hash",
    "task_type",
  ] as const;

  for (const field of requiredStrings) {
    if (typeof b[field] !== "string") {
      return { ok: false, code: "CONTRACT_INVALID", message: `Missing or invalid ${field}` };
    }
  }

  if (!isUuid(b.tenant_id as string)) {
    return { ok: false, code: "CONTRACT_INVALID", message: "Invalid tenant_id" };
  }

  if (!tenant || tenant.tenant_id !== b.tenant_id) {
    return { ok: false, code: "TENANT_MISMATCH", message: "Unknown or mismatched tenant" };
  }

  if (tenant.status !== "ready") {
    return { ok: false, code: "FORBIDDEN", message: "Tenant is not ready for assignments" };
  }

  const taskType = b.task_type as string;
  if (!RESEARCH_TASK_TYPES.has(taskType)) {
    return {
      ok: false,
      code: "CONTRACT_INVALID",
      message: `First slice supports research task types only; got ${taskType}`,
    };
  }

  if (b.result_contract !== RESEARCH_RESULT_CONTRACT) {
    return {
      ok: false,
      code: "CONTRACT_INVALID",
      message: `result_contract must be ${RESEARCH_RESULT_CONTRACT} for research tasks`,
    };
  }

  if (b.candidate_id !== null || b.candidate_revision !== null) {
    return {
      ok: false,
      code: "CONTRACT_INVALID",
      message: "Research tasks require candidate_id and candidate_revision to be null",
    };
  }

  if (typeof b.generation !== "number" || b.generation < 1) {
    return { ok: false, code: "CONTRACT_INVALID", message: "Invalid generation" };
  }

  if (!HASH_RE.test(b.input_hash as string)) {
    return { ok: false, code: "CONTRACT_INVALID", message: "input_hash must be 64 lowercase hex" };
  }

  const budget = b.budget;
  if (!budget || typeof budget !== "object") {
    return { ok: false, code: "CONTRACT_INVALID", message: "budget is required" };
  }

  const assignment = b as unknown as AssignmentBody;
  return { ok: true, assignment };
}
