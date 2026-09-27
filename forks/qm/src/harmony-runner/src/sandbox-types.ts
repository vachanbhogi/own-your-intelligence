/**
 * Minimal Sandbox seam aligned with QM `src/sandbox/sandbox.ts` lifecycle:
 * provision → prepare inputs → run → teardown.
 */

export interface ResourceLimits {
  max_model_micro_usd: number;
  max_wall_seconds: number;
  max_tool_calls: number;
}

export interface SandboxProvisionRequest {
  tenant_id: string;
  task_id: string;
  attempt_id: string;
  generation: number;
  limits: ResourceLimits;
}

export interface SandboxPrepareInput {
  input_manifest_id: string;
  artifact_refs: string[];
}

export interface SandboxHandle {
  handle_id: string;
}

export interface SandboxRunResult {
  task_type: string;
  result_artifact_id?: string;
}

export interface SandboxInspectView {
  handle_id: string;
  tenant_id: string;
  task_id: string;
  attempt_id: string;
  generation: number;
  phase: string;
  fenced: boolean;
  lease_expires_at: string;
  heartbeat_at: string | null;
  egress_deny_default: true;
  input_manifest_id?: string;
  artifact_refs?: string[];
  task_type?: string;
  result_artifact_id?: string;
}

/** Harmony runner-backed Sandbox provider. */
export interface Sandbox {
  provision(request: SandboxProvisionRequest): Promise<SandboxHandle>;
  prepare(handle_id: string, input: SandboxPrepareInput): Promise<void>;
  run(handle_id: string, task_type: string): Promise<SandboxRunResult>;
  inspect(handle_id: string): Promise<SandboxInspectView>;
  stop(handle_id: string): Promise<void>;
  destroy(handle_id: string): Promise<void>;
  heartbeat(handle_id: string): Promise<void>;
}
