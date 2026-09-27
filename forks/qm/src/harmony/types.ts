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
  provider_run_id: string | null;
  lock_version: number;
}

export interface TaskFence {
  tenant_id: string;
  task_id: string;
  attempt_generation: number;
  current_assignment_id: string;
  current_attempt_id: string;
}

export interface OutboxRow {
  event_id: string;
  envelope: EventEnvelope;
  delivered_at: string | null;
  attempts: number;
}

export interface LaunchOutboxRow {
  launch_id: string;
  assignment_id: string;
  tenant_id: string;
  task_id: string;
  attempt_id: string;
  generation: number;
  task_type: string;
  enqueued_at: string;
  started_at: string | null;
}

export interface IdempotencyRecord {
  route_key: string;
  idempotency_key: string;
  request_hash: string;
  response_status: number;
  response_json: unknown;
}

export interface HarmonyGrant {
  tenant_id: string;
  task_id: string;
  attempt_id: string;
  generation: number;
  actions?: string[];
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
  field_errors?: Array<{ field: string; message: string; code?: string }>;
  current_version?: number;
}

export interface QmCellConfig {
  tenantId: string;
  harmonyEventsUrl: string;
  runnerBaseUrl: string;
  buildSha: string;
  contractMajor: number;
  contractVersion: string;
}

export interface TaskResultBody {
  schema_version: "1.0";
  task_id: string;
  attempt_id: string;
  generation: number;
  outcome: "succeeded" | "failed" | "blocked";
  input_hash: string;
  result_contract: string;
  result_artifact_id: string | null;
  artifact_ids: string[];
  usage: {
    model_micro_usd: number;
    wall_seconds: number;
    tool_calls: number;
  };
  completed_at: string;
}

export const RESEARCH_TASK_TYPES = new Set([
  "source_discovery",
  "company_profile",
  "opportunity_analysis",
]);

export const TASK_TYPE_RESULT_CONTRACT: Record<string, string> = {
  source_discovery: "research_report.v1",
  company_profile: "research_report.v1",
  opportunity_analysis: "opportunity_analysis.v1",
  pm_spec: "pm_spec.v1",
};

export interface QmCellStore {
  assignments: Map<string, AssignmentRecord>;
  tasks: Map<string, TaskFence>;
  outbox: OutboxRow[];
  launchOutbox: LaunchOutboxRow[];
  idempotency: Map<string, IdempotencyRecord>;
  aggregateVersions: Map<string, number>;
}
