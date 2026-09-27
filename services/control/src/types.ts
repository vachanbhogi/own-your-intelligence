export type TenantStatus = "ready" | "provisioning" | "suspended";

export interface TenantBindings {
  ufo_workspace_id: string;
  qm_deployment_id: string;
  qm_scope_id: string;
  gbrain_endpoint: string;
  gbrain_database: string;
  worker_pool: string;
  artifact_prefix: string;
}

export interface Tenant {
  tenant_id: string;
  slug: string;
  display_name: string;
  status: TenantStatus;
  bindings: TenantBindings;
}

export interface Budget {
  max_model_micro_usd: number;
  max_wall_seconds: number;
  max_tool_calls: number;
}

export interface AssignmentBody {
  schema_version: "1.0";
  assignment_id: string;
  tenant_id: string;
  task_id: string;
  attempt_id: string;
  generation: number;
  task_type: string;
  candidate_id: string | null;
  candidate_revision: number | null;
  input_manifest_id: string;
  context_manifest_id: string;
  policy_revision: number;
  deadline_at: string;
  budget: Budget;
  result_contract: string;
  input_hash: string;
}

export type AssignmentState =
  | "accepted"
  | "running"
  | "cancellation_requested"
  | "cancelled"
  | "succeeded"
  | "failed";

export interface AssignmentRecord {
  assignment_id: string;
  tenant_id: string;
  task_id: string;
  attempt_id: string;
  generation: number;
  body: AssignmentBody;
  state: AssignmentState;
  accepted_at: string;
  input_hash: string;
  lease_expires_at: string | null;
  lock_version: number;
}

export type TaskStatus =
  | "queued"
  | "admitting"
  | "running"
  | "cancellation_requested"
  | "cancelled"
  | "succeeded"
  | "failed";

export interface TaskRecord {
  tenant_id: string;
  task_id: string;
  task_type: string;
  status: TaskStatus;
  attempt_generation: number;
  current_attempt_id: string;
  current_assignment_id: string;
  input_hash: string;
  lock_version: number;
}

export interface OutboxRow {
  event_id: string;
  aggregate_type: string;
  aggregate_id: string;
  aggregate_version: number;
  event_type: string;
  schema_version: string;
  payload: Record<string, unknown>;
  occurred_at: string;
  delivered_at: string | null;
  attempts: number;
}

export interface InboxRow {
  consumer_id: string;
  event_id: string;
  payload_hash: string;
  processed_at: string;
  outcome: string;
}

export interface IdempotencyRecord {
  tenant_id: string;
  actor_id: string;
  route_key: string;
  idempotency_key: string;
  request_hash: string;
  operation_id: string;
  response_status: number;
  response_json: unknown;
  expires_at: string;
}

export interface HarmonyGrant {
  tenant_id: string;
  task_id: string;
  attempt_id: string;
  generation: number;
  actions: string[];
}

export interface EventEnvelope {
  schema_version: "1.0";
  event_id: string;
  event_type: string;
  tenant_id: string;
  aggregate_type: string;
  aggregate_id: string;
  aggregate_version: number;
  occurred_at: string;
  correlation_id: string;
  causation_id: string | null;
  payload: Record<string, unknown>;
}

export interface ErrorBody {
  code: string;
  message: string;
  request_id: string;
  retryable: boolean;
}

export const RESEARCH_TASK_TYPES = new Set([
  "source_discovery",
  "company_profile",
]);

export const RESEARCH_RESULT_CONTRACT = "research_report.v1";
