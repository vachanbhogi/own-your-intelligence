import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { Server } from "node:http";
import { createControlApp } from "../src/app.js";
import type { AssignmentBody } from "../src/types.js";

const fixturesDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../contracts/v1/fixtures",
);

function loadResearchAssignment(): AssignmentBody {
  return JSON.parse(
    readFileSync(join(fixturesDir, "assignment.valid.research.json"), "utf8"),
  ) as AssignmentBody;
}

async function request(
  server: Server,
  method: string,
  path: string,
  opts: { body?: unknown; headers?: Record<string, string> } = {},
): Promise<{ status: number; json: unknown }> {
  const addr = server.address();
  assert.ok(addr && typeof addr === "object");
  const url = `http://127.0.0.1:${addr.port}${path}`;
  const headers: Record<string, string> = {
    "X-Request-ID": "11111111-1111-4111-8111-111111111111",
    ...opts.headers,
  };
  let body: string | undefined;
  if (opts.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(opts.body);
  }
  const res = await fetch(url, { method, headers, body });
  const json = (await res.json()) as unknown;
  return { status: res.status, json };
}

describe("Harmony control plane", () => {
  let server: Server;

  before(async () => {
    const app = createControlApp({ dispatchToQm: false });
    server = app.server;
    await new Promise<void>((resolve) => server.listen(0, resolve));
  });

  after(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  });

  it("start_assignment is idempotent for identical retries", async () => {
    const assignment = loadResearchAssignment();
    const idempotencyKey = "idem-start-1";
    const first = await request(server, "POST", "/tools/start_assignment", {
      body: assignment,
      headers: { "Idempotency-Key": idempotencyKey },
    });
    assert.equal(first.status, 202);
    const second = await request(server, "POST", "/tools/start_assignment", {
      body: assignment,
      headers: { "Idempotency-Key": idempotencyKey },
    });
    assert.equal(second.status, 202);
    assert.deepEqual(second.json, first.json);
  });

  it("start_assignment returns 409 on idempotency conflict", async () => {
    const assignment = {
      ...loadResearchAssignment(),
      assignment_id: "88888888-8888-4888-8888-888888888888",
      task_id: "77777777-7777-4777-8777-777777777778",
      attempt_id: "66666666-6666-4666-8666-666666666668",
    };
    const idempotencyKey = "idem-start-conflict";
    const altered = {
      ...assignment,
      assignment_id: "99999999-9999-4999-8999-999999999999",
    };
    await request(server, "POST", "/tools/start_assignment", {
      body: assignment,
      headers: { "Idempotency-Key": idempotencyKey },
    });
    const conflict = await request(server, "POST", "/tools/start_assignment", {
      body: altered,
      headers: { "Idempotency-Key": idempotencyKey },
    });
    assert.equal(conflict.status, 409);
    const err = conflict.json as { code: string };
    assert.equal(err.code, "IDEMPOTENCY_CONFLICT");
  });

  it("cancel_assignment is idempotent", async () => {
    const assignment = {
      ...loadResearchAssignment(),
      assignment_id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3",
      task_id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3",
      attempt_id: "cccccccc-cccc-4ccc-8ccc-ccccccccccc3",
    };
    const start = await request(server, "POST", "/tools/start_assignment", {
      body: assignment,
      headers: { "Idempotency-Key": "idem-cancel-start" },
    });
    assert.equal(start.status, 202);

    const cancelKey = "idem-cancel-1";
    const first = await request(
      server,
      "POST",
      `/tools/assignments/${assignment.assignment_id}/cancel`,
      { headers: { "Idempotency-Key": cancelKey } },
    );
    assert.equal(first.status, 202);
    const second = await request(
      server,
      "POST",
      `/tools/assignments/${assignment.assignment_id}/cancel`,
      { headers: { "Idempotency-Key": cancelKey } },
    );
    assert.equal(second.status, 202);
    assert.deepEqual(second.json, first.json);
    assert.equal((second.json as { state: string }).state, "cancelled");
  });

  it("qm event ingress rejects stale generation after inbox commit path", async () => {
    const assignment = {
      ...loadResearchAssignment(),
      assignment_id: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
      task_id: "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee",
      attempt_id: "ffffffff-ffff-4fff-8fff-ffffffffffff",
    };
    await request(server, "POST", "/tools/start_assignment", {
      body: assignment,
      headers: { "Idempotency-Key": "idem-qm-event" },
    });

    const staleEvent = {
      schema_version: "1.0",
      event_id: "12121212-1212-4121-8121-121212121212",
      event_type: "task.started",
      tenant_id: assignment.tenant_id,
      aggregate_type: "task",
      aggregate_id: assignment.task_id,
      aggregate_version: 3,
      occurred_at: new Date().toISOString(),
      correlation_id: "13131313-1313-4131-8131-131313131313",
      causation_id: null,
      payload: { generation: 99, attempt_id: assignment.attempt_id },
    };

    const res = await request(server, "POST", "/internal/harmony/v1/events/qm", {
      body: staleEvent,
      headers: { "Idempotency-Key": "qm-event-1" },
    });
    assert.equal(res.status, 409);
    const err = res.json as { code: string };
    assert.equal(err.code, "STALE_ATTEMPT");
  });
});
