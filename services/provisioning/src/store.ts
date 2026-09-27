import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import type {
  AsyncOperation,
  CreateTenantBody,
  TenantBindings,
  TenantRecord,
} from "./types.js";
import { REQUIRED_BINDING_KEYS } from "./types.js";
import { loadSeedTenants } from "./seed.js";

export interface TenantDirectorySnapshot {
  schema_version: "1.0";
  tenants: TenantRecord[];
  operations: Record<string, AsyncOperation>;
}

export interface TenantDirectoryOptions {
  seedPath?: string;
  dataFile?: string | null;
  /** When true, seed tenants replace missing file; existing data file wins on load. */
  seedIfEmpty?: boolean;
}

export class TenantDirectory {
  private tenants = new Map<string, TenantRecord>();
  private operations = new Map<string, AsyncOperation>();
  private readonly dataFile: string | null;

  constructor(private readonly options: TenantDirectoryOptions = {}) {
    this.dataFile =
      options.dataFile === undefined
        ? path.resolve(
            fileURLToPath(new URL("..", import.meta.url)),
            "data/tenants.json",
          )
        : options.dataFile;
    this.bootstrap();
  }

  private bootstrap(): void {
    if (this.dataFile && fs.existsSync(this.dataFile)) {
      this.loadFromDisk();
      return;
    }
    if (this.options.seedIfEmpty !== false) {
      for (const tenant of loadSeedTenants(this.options.seedPath)) {
        this.tenants.set(tenant.tenant_id, tenant);
      }
      this.persist();
    }
  }

  resetFromSeed(seedPath?: string): void {
    this.tenants.clear();
    this.operations.clear();
    for (const tenant of loadSeedTenants(seedPath ?? this.options.seedPath)) {
      this.tenants.set(tenant.tenant_id, tenant);
    }
    this.persist();
  }

  listTenants(): TenantRecord[] {
    return [...this.tenants.values()];
  }

  getTenant(tenantId: string): TenantRecord | undefined {
    return this.tenants.get(tenantId);
  }

  getBindings(tenantId: string): TenantBindings | null {
    const tenant = this.tenants.get(tenantId);
    return tenant ? { ...tenant.bindings } : null;
  }

  getOperation(operationId: string): AsyncOperation | undefined {
    return this.operations.get(operationId);
  }

  createTenantIdempotent(body: CreateTenantBody): {
    tenant: TenantRecord;
    operation: AsyncOperation;
    created: boolean;
  } {
    const existing = this.tenants.get(body.tenant_id);
    const now = new Date().toISOString();
    if (existing) {
      if (
        existing.slug !== body.slug ||
        existing.display_name !== body.display_name
      ) {
        throw new TenantConflictError(
          "Tenant already exists with different slug or display_name",
        );
      }
      const operation = this.ensureProvisioningOperation(existing, now);
      return { tenant: existing, operation, created: false };
    }

    const operationId = randomUUID();
    const tenant: TenantRecord = {
      tenant_id: body.tenant_id,
      slug: body.slug,
      display_name: body.display_name,
      status: "provisioning",
      bindings: emptyBindings(),
      allow_new_execution: false,
      provisioning_operation_id: operationId,
      created_at: now,
      updated_at: now,
    };
    const operation: AsyncOperation = {
      operation_id: operationId,
      state: "accepted",
      resource_type: "tenant",
      resource_id: body.tenant_id,
      created_at: now,
      updated_at: now,
      status_url: `/operations/${operationId}`,
    };
    this.tenants.set(tenant.tenant_id, tenant);
    this.operations.set(operationId, operation);
    this.persist();
    return { tenant, operation, created: true };
  }

  provisionTenant(tenantId: string): { tenant: TenantRecord; operation: AsyncOperation } {
    const tenant = this.requireTenant(tenantId);
    const now = new Date().toISOString();
    const operation = this.ensureProvisioningOperation(tenant, now);

    if (tenant.status === "ready" && bindingsComplete(tenant.bindings)) {
      operation.state = "succeeded";
      operation.result = {
        status: "ready",
        bindings: { ...tenant.bindings },
      };
      operation.updated_at = now;
      tenant.updated_at = now;
      this.persist();
      return { tenant, operation };
    }

    operation.state = "running";
    operation.updated_at = now;
    tenant.status = "provisioning";
    tenant.updated_at = now;

    this.applyFixtureBindings(tenant);
    if (bindingsComplete(tenant.bindings)) {
      tenant.status = "ready";
      tenant.allow_new_execution = true;
      operation.state = "succeeded";
      operation.result = {
        status: "ready",
        bindings: { ...tenant.bindings },
      };
    } else {
      tenant.status = "blocked";
      tenant.allow_new_execution = false;
      operation.state = "blocked";
      operation.result = {
        status: "blocked",
        reason: "INCOMPLETE_BINDINGS",
      };
    }
    operation.updated_at = new Date().toISOString();
    tenant.updated_at = operation.updated_at;
    this.persist();
    return { tenant, operation };
  }

  degradeTenant(tenantId: string): TenantRecord {
    const tenant = this.requireTenant(tenantId);
    tenant.status = "degraded";
    tenant.allow_new_execution = false;
    tenant.updated_at = new Date().toISOString();
    this.persist();
    return tenant;
  }

  private ensureProvisioningOperation(
    tenant: TenantRecord,
    now: string,
  ): AsyncOperation {
    if (tenant.provisioning_operation_id) {
      const existing = this.operations.get(tenant.provisioning_operation_id);
      if (existing) return existing;
    }
    const operationId = randomUUID();
    const operation: AsyncOperation = {
      operation_id: operationId,
      state:
        tenant.status === "ready"
          ? "succeeded"
          : tenant.status === "blocked"
            ? "blocked"
            : "accepted",
      resource_type: "tenant",
      resource_id: tenant.tenant_id,
      created_at: now,
      updated_at: now,
      status_url: `/operations/${operationId}`,
    };
    tenant.provisioning_operation_id = operationId;
    this.operations.set(operationId, operation);
    return operation;
  }

  private applyFixtureBindings(tenant: TenantRecord): void {
    const slug = tenant.slug;
    const id = tenant.tenant_id;
    const short = slug.replace(/[^a-z0-9-]/gi, "-");
    tenant.bindings = {
      ufo_workspace_id:
        tenant.bindings.ufo_workspace_id ??
        deterministicUuid(`ufo-workspace:${id}`),
      qm_deployment_id:
        tenant.bindings.qm_deployment_id ?? `qm-cell-${short}`,
      qm_scope_id: tenant.bindings.qm_scope_id ?? `org:${short}`,
      gbrain_endpoint:
        tenant.bindings.gbrain_endpoint ??
        `http://gbrain-${short}.internal:8080`,
      gbrain_database:
        tenant.bindings.gbrain_database ?? `gbrain_${short.replace(/-/g, "_")}`,
      worker_pool: tenant.bindings.worker_pool ?? `worker-pool-${short}`,
      artifact_prefix:
        tenant.bindings.artifact_prefix ?? `tenants/${id}/`,
    };
  }

  private requireTenant(tenantId: string): TenantRecord {
    const tenant = this.tenants.get(tenantId);
    if (!tenant) throw new TenantNotFoundError(tenantId);
    return tenant;
  }

  private loadFromDisk(): void {
    if (!this.dataFile) return;
    const parsed = JSON.parse(
      fs.readFileSync(this.dataFile, "utf8"),
    ) as TenantDirectorySnapshot;
    this.tenants.clear();
    this.operations.clear();
    for (const tenant of parsed.tenants) {
      this.tenants.set(tenant.tenant_id, tenant);
    }
    for (const [id, op] of Object.entries(parsed.operations ?? {})) {
      this.operations.set(id, op);
    }
  }

  persist(): void {
    if (!this.dataFile) return;
    fs.mkdirSync(path.dirname(this.dataFile), { recursive: true });
    const snapshot: TenantDirectorySnapshot = {
      schema_version: "1.0",
      tenants: this.listTenants(),
      operations: Object.fromEntries(this.operations.entries()),
    };
    fs.writeFileSync(this.dataFile, `${JSON.stringify(snapshot, null, 2)}\n`);
  }
}

export function bindingsComplete(bindings: TenantBindings): boolean {
  return REQUIRED_BINDING_KEYS.every((key) => {
    const value = bindings[key];
    return typeof value === "string" && value.length > 0;
  });
}

function emptyBindings(): TenantBindings {
  return {
    ufo_workspace_id: null,
    qm_deployment_id: null,
    qm_scope_id: null,
    gbrain_endpoint: null,
    gbrain_database: null,
    worker_pool: null,
    artifact_prefix: null,
  };
}

/** Deterministic UUID v4-shaped id from a reconciliation key (fixture provisioning). */
export function deterministicUuid(key: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < key.length; i += 1) {
    const c = key.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193);
    h2 = Math.imul(h2 ^ c, 0x01000193);
  }
  const hex = (n: number, len: number) =>
    (n >>> 0).toString(16).padStart(len, "0").slice(-len);
  const a = hex(h1, 8);
  const b = hex(h2, 4);
  const c = hex(h1 ^ h2, 4);
  const d = hex(h2 ^ h1, 12);
  return `${a}-${b.slice(0, 4)}-4${b.slice(1, 4)}-8${c.slice(1, 4)}-${d}`;
}

export class TenantNotFoundError extends Error {
  readonly code = "TENANT_NOT_FOUND";
  constructor(tenantId: string) {
    super(`Tenant not found: ${tenantId}`);
    this.name = "TenantNotFoundError";
  }
}

export class TenantConflictError extends Error {
  readonly code = "TENANT_CONFLICT";
  constructor(message: string) {
    super(message);
    this.name = "TenantConflictError";
  }
}
