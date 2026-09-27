import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import test from "node:test";
import { createRunnerApp } from "./app.js";

const FIXTURE = {
  tenant_id: "33333333-3333-4333-8333-333333333333",
  task_id: "44444444-4444-4444-8444-444444444444",
  attempt_id: "55555555-5555-4555-8555-555555555555",
  generation: 1,
  limits: {
    max_model_micro_usd: 2_000_000,
    max_wall_seconds: 900,
    max_tool_calls: 120,
  },
  input_manifest_id: "77777777-7777-4777-8777-777777777777",
};

async function withServer(
  fn: (baseUrl: string, store: ReturnType<typeof createRunnerApp>["store"]) => Promise<void>,
): Promise<void> {
  const app = createRunnerApp();
  const server: Server = createServer((req, res) => {
    void app.handle(req, res);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const addr = server.address();
  assert.ok(addr && typeof addr === "object");
  const baseUrl = `http://127.0.0.1:${addr.port}`;
  try {
    await fn(baseUrl, app.store);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve())),
    );
  }
}

test("allocate → prepare → execute (source_discovery) returns synthetic artifact", async () => {
  await withServer(async (baseUrl) => {
    const allocRes = await fetch(`${baseUrl}/allocate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        tenant_id: FIXTURE.tenant_id,
        task_id: FIXTURE.task_id,
        attempt_id: FIXTURE.attempt_id,
        generation: FIXTURE.generation,
        limits: FIXTURE.limits,
      }),
    });
    assert.equal(allocRes.status, 201);
    const alloc = (await allocRes.json()) as { handle_id: string };
    assert.ok(alloc.handle_id);

    const prepRes = await fetch(`${baseUrl}/prepare`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        handle_id: alloc.handle_id,
        input_manifest_id: FIXTURE.input_manifest_id,
        artifact_refs: ["art-input-1"],
      }),
    });
    assert.equal(prepRes.status, 200);

    const execRes = await fetch(`${baseUrl}/execute`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        handle_id: alloc.handle_id,
        task_type: "source_discovery",
      }),
    });
    assert.equal(execRes.status, 200);
    const exec = (await execRes.json()) as {
      result_artifact_id: string;
      phase: string;
    };
    assert.equal(exec.phase, "running");
    assert.match(exec.result_artifact_id, /^99999999-9999-4999-8999-/);

    const inspectRes = await fetch(`${baseUrl}/inspect/${alloc.handle_id}`);
    assert.equal(inspectRes.status, 200);
    const inspect = (await inspectRes.json()) as Record<string, unknown>;
    assert.equal(inspect.handle_id, alloc.handle_id);
    assert.equal(inspect.egress_deny_default, true);
    assert.equal("secrets" in inspect, false);
  });
});

test("expired lease fences mutations with FENCED", async () => {
  await withServer(async (baseUrl, store) => {
    const allocRes = await fetch(`${baseUrl}/allocate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        tenant_id: FIXTURE.tenant_id,
        task_id: FIXTURE.task_id,
        attempt_id: FIXTURE.attempt_id,
        generation: FIXTURE.generation,
        limits: FIXTURE.limits,
      }),
    });
    const alloc = (await allocRes.json()) as { handle_id: string };

    store.setLeaseExpiresAt(alloc.handle_id, "2020-01-01T00:00:00.000Z");

    const prepRes = await fetch(`${baseUrl}/prepare`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        handle_id: alloc.handle_id,
        input_manifest_id: FIXTURE.input_manifest_id,
        artifact_refs: [],
      }),
    });
    assert.equal(prepRes.status, 409);
    const err = (await prepRes.json()) as { code: string };
    assert.equal(err.code, "FENCED");

    const inspectRes = await fetch(`${baseUrl}/inspect/${alloc.handle_id}`);
    assert.equal(inspectRes.status, 200);
    const inspect = (await inspectRes.json()) as { fenced: boolean };
    assert.equal(inspect.fenced, true);
  });
});

test("heartbeat refreshes lease", async () => {
  await withServer(async (baseUrl, store) => {
    const allocRes = await fetch(`${baseUrl}/allocate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        tenant_id: FIXTURE.tenant_id,
        task_id: FIXTURE.task_id,
        attempt_id: FIXTURE.attempt_id,
        generation: FIXTURE.generation,
        limits: FIXTURE.limits,
      }),
    });
    const alloc = (await allocRes.json()) as { handle_id: string };
    const before = store.get(alloc.handle_id)!.lease_expires_at;

    const hbRes = await fetch(`${baseUrl}/heartbeat/${alloc.handle_id}`, {
      method: "POST",
    });
    assert.equal(hbRes.status, 200);
    const after = store.get(alloc.handle_id)!.lease_expires_at;
    assert.notEqual(before, after);
  });
});

test("destroy is idempotent", async () => {
  await withServer(async (baseUrl) => {
    const allocRes = await fetch(`${baseUrl}/allocate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        tenant_id: FIXTURE.tenant_id,
        task_id: FIXTURE.task_id,
        attempt_id: FIXTURE.attempt_id,
        generation: FIXTURE.generation,
        limits: FIXTURE.limits,
      }),
    });
    const alloc = (await allocRes.json()) as { handle_id: string };

    const d1 = await fetch(`${baseUrl}/destroy/${alloc.handle_id}`, { method: "POST" });
    assert.equal(d1.status, 200);
    const d2 = await fetch(`${baseUrl}/destroy/${alloc.handle_id}`, { method: "POST" });
    assert.equal(d2.status, 200);
    const body = (await d2.json()) as { phase: string };
    assert.equal(body.phase, "destroyed");
  });
});
