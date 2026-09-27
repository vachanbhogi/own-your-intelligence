import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  createProvisioningApp,
  getTenantBindings,
  resetSharedDirectoryForTests,
} from "../src/app.js";
import { bindingsComplete, TenantDirectory } from "../src/store.js";
import { defaultSeedPath, loadSeedTenants } from "../src/seed.js";
import { REQUIRED_BINDING_KEYS } from "../src/types.js";

const TENANT_A = "33333333-3333-4333-8333-333333333333";
const TENANT_B = "33333333-3333-4333-8333-333333333334";

function tempDataFile(): string {
  return path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), "harmony-provisioning-")),
    "tenants.json",
  );
}

test("loads two-tenant seed with distinct bindings", () => {
  const seed = loadSeedTenants(defaultSeedPath());
  assert.equal(seed.length, 2);
  const a = seed.find((t) => t.tenant_id === TENANT_A);
  const b = seed.find((t) => t.tenant_id === TENANT_B);
  assert.ok(a && b);
  assert.notEqual(a.bindings.qm_deployment_id, b.bindings.qm_deployment_id);
  assert.notEqual(a.bindings.gbrain_database, b.bindings.gbrain_database);
  for (const tenant of seed) {
    assert.equal(bindingsComplete(tenant.bindings), true);
    for (const key of REQUIRED_BINDING_KEYS) {
      assert.ok(tenant.bindings[key]);
    }
  }
});

test("GET /tenants/:id/bindings returns seed tenant directory rows", async () => {
  const dataFile = tempDataFile();
  const app = createProvisioningApp({ dataFile, seedIfEmpty: true });
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const addr = server.address();
  assert.ok(addr && typeof addr === "object");
  const port = addr.port;

  const res = await fetch(
    `http://127.0.0.1:${port}/tenants/${TENANT_A}/bindings`,
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    tenant_id: string;
    bindings: { qm_deployment_id: string };
  };
  assert.equal(body.tenant_id, TENANT_A);
  assert.equal(body.bindings.qm_deployment_id, "qm-cell-tenant-a");

  server.close();
  fs.rmSync(path.dirname(dataFile), { recursive: true, force: true });
});

test("idempotent POST /tenants and POST /tenants/:id/provision", async () => {
  const dataFile = tempDataFile();
  const app = createProvisioningApp({ dataFile, seedIfEmpty: false });
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const port = (server.address() as { port: number }).port;

  const tenantId = "44444444-4444-4444-8444-444444444444";
  const createBody = {
    tenant_id: tenantId,
    slug: "acme-c",
    display_name: "Acme C",
  };

  const first = await fetch(`http://127.0.0.1:${port}/tenants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(createBody),
  });
  assert.equal(first.status, 202);
  const op1 = (await first.json()) as { operation_id: string; state: string };
  assert.equal(op1.state, "accepted");

  const second = await fetch(`http://127.0.0.1:${port}/tenants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(createBody),
  });
  assert.equal(second.status, 202);
  const op2 = (await second.json()) as { operation_id: string };
  assert.equal(op2.operation_id, op1.operation_id);

  const prov1 = await fetch(
    `http://127.0.0.1:${port}/tenants/${tenantId}/provision`,
    { method: "POST" },
  );
  assert.equal(prov1.status, 202);
  const provBody1 = (await prov1.json()) as {
    state: string;
    result?: { status: string };
  };
  assert.equal(provBody1.state, "succeeded");
  assert.equal(provBody1.result?.status, "ready");

  const prov2 = await fetch(
    `http://127.0.0.1:${port}/tenants/${tenantId}/provision`,
    { method: "POST" },
  );
  assert.equal(prov2.status, 202);
  const provBody2 = (await prov2.json()) as { operation_id: string; state: string };
  assert.equal(provBody2.operation_id, op1.operation_id);
  assert.equal(provBody2.state, "succeeded");

  const bindingsRes = await fetch(
    `http://127.0.0.1:${port}/tenants/${tenantId}/bindings`,
  );
  const bindings = (await bindingsRes.json()) as {
    status: string;
    allow_new_execution: boolean;
    bindings: Record<string, string>;
  };
  assert.equal(bindings.status, "ready");
  assert.equal(bindings.allow_new_execution, true);
  for (const key of REQUIRED_BINDING_KEYS) {
    assert.ok(bindings.bindings[key]);
  }

  server.close();
  fs.rmSync(path.dirname(dataFile), { recursive: true, force: true });
});

test("POST /tenants/:id/degrade stops new execution", async () => {
  const dataFile = tempDataFile();
  const directory = new TenantDirectory({ dataFile, seedIfEmpty: true });
  directory.degradeTenant(TENANT_A);
  const tenant = directory.getTenant(TENANT_A);
  assert.equal(tenant?.status, "degraded");
  assert.equal(tenant?.allow_new_execution, false);
  fs.rmSync(path.dirname(dataFile), { recursive: true, force: true });
});

test("getTenantBindings reads from shared directory after seed load", () => {
  resetSharedDirectoryForTests();
  const dataFile = tempDataFile();
  createProvisioningApp({ dataFile, seedIfEmpty: true });
  const bindings = getTenantBindings(TENANT_B);
  assert.ok(bindings);
  assert.equal(bindings.worker_pool, "worker-pool-tenant-b");
  fs.rmSync(path.dirname(dataFile), { recursive: true, force: true });
});
