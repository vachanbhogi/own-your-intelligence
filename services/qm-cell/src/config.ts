import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { QmCellConfig, Tenant } from "./types.js";

const here = dirname(fileURLToPath(import.meta.url));

export function loadSeedTenants(): Tenant[] {
  const fixturePath = join(here, "../../../contracts/v1/fixtures/tenants.seed.json");
  const raw = JSON.parse(readFileSync(fixturePath, "utf8")) as {
    tenants: Tenant[];
  };
  return raw.tenants;
}

export function loadReleaseLock(): {
  contract_major: number;
  contract_version: string;
  repositories: { qm: { sha: string } };
} {
  const lockPath = join(here, "../../../release-lock.json");
  return JSON.parse(readFileSync(lockPath, "utf8"));
}

export function resolveDeploymentTenantId(
  env: NodeJS.ProcessEnv = process.env,
  seedTenants: Tenant[] = loadSeedTenants(),
): string {
  if (env.QM_TENANT_ID) {
    return env.QM_TENANT_ID;
  }
  const deploymentId = env.QM_DEPLOYMENT_ID ?? "qm-cell-tenant-a";
  const match = seedTenants.find((t) => t.bindings.qm_deployment_id === deploymentId);
  if (!match) {
    throw new Error(`No tenant binding for QM deployment ${deploymentId}`);
  }
  return match.tenant_id;
}

export function loadQmCellConfig(
  overrides: Partial<QmCellConfig> = {},
  env: NodeJS.ProcessEnv = process.env,
): QmCellConfig {
  const lock = loadReleaseLock();
  return {
    tenantId: resolveDeploymentTenantId(env),
    harmonyEventsUrl:
      env.HARMONY_EVENTS_URL ??
      "http://127.0.0.1:7100/internal/harmony/v1/events/qm",
    runnerBaseUrl: env.RUNNER_BASE_URL ?? "http://127.0.0.1:7102",
    buildSha: lock.repositories.qm.sha,
    contractMajor: lock.contract_major,
    contractVersion: lock.contract_version,
    ...overrides,
  };
}
