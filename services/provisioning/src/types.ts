export type TenantStatus =
  | "provisioning"
  | "ready"
  | "degraded"
  | "blocked"
  | "suspended";

/** Required before a tenant may enter `ready` (handoff 03 §5, 13 §4). */
export const REQUIRED_BINDING_KEYS = [
  "ufo_workspace_id",
  "qm_deployment_id",
  "gbrain_endpoint",
  "worker_pool",
  "artifact_prefix",
] as const;

export type RequiredBindingKey = (typeof REQUIRED_BINDING_KEYS)[number];

export interface TenantBindings {
  ufo_workspace_id: string | null;
  qm_deployment_id: string | null;
  qm_scope_id: string | null;
  gbrain_endpoint: string | null;
  gbrain_database: string | null;
  worker_pool: string | null;
  artifact_prefix: string | null;
}

export interface TenantRecord {
  tenant_id: string;
  slug: string;
  display_name: string;
  status: TenantStatus;
  bindings: TenantBindings;
  /** When false, new execution admission must stop (degraded / operator hold). */
  allow_new_execution: boolean;
  provisioning_operation_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface AsyncOperation {
  operation_id: string;
  state: "accepted" | "running" | "blocked" | "succeeded" | "failed" | "cancelled";
  resource_type: string;
  resource_id: string | null;
  created_at: string;
  updated_at: string;
  result?: Record<string, unknown> | null;
  status_url?: string;
}

export interface CreateTenantBody {
  tenant_id: string;
  slug: string;
  display_name: string;
  timezone?: string;
}

export interface TenantSeedFile {
  fixture_id: string;
  schema_version: string;
  tenants: Array<{
    tenant_id: string;
    slug: string;
    display_name: string;
    status: string;
    bindings: Record<string, string>;
  }>;
}
