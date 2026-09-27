import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { TenantRecord, TenantSeedFile, TenantStatus } from "./types.js";

export function defaultSeedPath(): string {
  const serviceRoot = path.resolve(
    fileURLToPath(new URL("../..", import.meta.url)),
  );
  const localFixture = path.resolve(serviceRoot, "fixtures/tenants.seed.json");
  const contractFixture = path.resolve(
    serviceRoot,
    "../../contracts/v1/fixtures/tenants.seed.json",
  );
  return fs.existsSync(localFixture) ? localFixture : contractFixture;
}

function normalizeStatus(raw: string): TenantStatus {
  if (raw === "ready" || raw === "active") return "ready";
  if (raw === "provisioning") return "provisioning";
  if (raw === "degraded") return "degraded";
  if (raw === "blocked") return "blocked";
  if (raw === "suspended") return "suspended";
  return "provisioning";
}

export function loadSeedTenants(seedPath = defaultSeedPath()): TenantRecord[] {
  const raw = fs.readFileSync(seedPath, "utf8");
  const parsed = JSON.parse(raw) as TenantSeedFile;
  const now = new Date().toISOString();
  return parsed.tenants.map((row) => ({
    tenant_id: row.tenant_id,
    slug: row.slug,
    display_name: row.display_name,
    status: normalizeStatus(row.status),
    bindings: {
      ufo_workspace_id: row.bindings.ufo_workspace_id ?? null,
      qm_deployment_id: row.bindings.qm_deployment_id ?? null,
      qm_scope_id: row.bindings.qm_scope_id ?? null,
      gbrain_endpoint: row.bindings.gbrain_endpoint ?? null,
      gbrain_database: row.bindings.gbrain_database ?? null,
      worker_pool: row.bindings.worker_pool ?? null,
      artifact_prefix: row.bindings.artifact_prefix ?? null,
    },
    allow_new_execution: normalizeStatus(row.status) === "ready",
    provisioning_operation_id: null,
    created_at: now,
    updated_at: now,
  }));
}
