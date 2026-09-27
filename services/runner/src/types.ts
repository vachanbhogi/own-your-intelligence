export const LEASE_DURATION_MS = 60_000;
export const HEARTBEAT_INTERVAL_MS = 15_000;

export interface ResourceLimits {
  max_model_micro_usd: number;
  max_wall_seconds: number;
  max_tool_calls: number;
}

export type ContainerPhase =
  | "provisioned"
  | "prepared"
  | "running"
  | "stopped"
  | "destroyed";

export interface ContainerRecord {
  handle_id: string;
  tenant_id: string;
  task_id: string;
  attempt_id: string;
  generation: number;
  limits: ResourceLimits;
  /** Matches Sandbox.provision lifecycle phase. */
  phase: ContainerPhase;
  fenced: boolean;
  lease_expires_at: string;
  heartbeat_at: string | null;
  egress_deny_default: true;
  /** Internal-only; never exposed via inspect. */
  secrets: Record<string, string>;
  input_manifest_id?: string;
  artifact_refs?: string[];
  task_type?: string;
  result_artifact_id?: string;
  stopped_at?: string;
  destroyed_at?: string;
}

export interface AllocateRequest {
  tenant_id: string;
  task_id: string;
  attempt_id: string;
  generation: number;
  limits: ResourceLimits;
}

export interface PrepareRequest {
  handle_id: string;
  input_manifest_id: string;
  artifact_refs: string[];
}

export interface ExecuteRequest {
  handle_id: string;
  task_type: string;
}

export interface ErrorBody {
  code: string;
  message: string;
  request_id: string;
  retryable: boolean;
}
