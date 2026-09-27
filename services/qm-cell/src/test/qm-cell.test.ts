import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { createQmCellApp } from "../app.js";
import { grantHeaderValue, mintTestGrant } from "../grant.js";
import type { AssignmentBody } from "../types.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(here, "../../../../contracts/v1/fixtures");

function loadFixture<T>(name: string): T {
  return JSON.parse(readFileSync(join(fixturesDir, name), "utf8")) as T;
}

async function inject(
  app: ReturnType<typeof createQmCellApp>,
  init: {
    method: string;
    path: string;
    headers?: Record<string, string>;
    body?: unknown;
  },
): Promise<{ status: number; json: unknown }> {
  const chunks: Buffer[] = [];
  const res = {
    statusCode: 200,
    setHeader() {
      return undefined;
    },
    end(data: string | Buffer) {
      chunks.push(typeof data === "string" ? Buffer.from(data) : data);
    },
  };
  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(init.headers ?? {})) {
    headers[key.toLowerCase()] = value;
  }
  const req = {
    method: init.method,
    url: init.path,
    headers,
    async *[Symbol.asyncIterator]() {
      if (init.body !== undefined) {
        yield Buffer.from(JSON.stringify(init.body));
      }
    },
  };
  await app.handler(req as never, res as never);
  const raw = Buffer.concat(chunks).toString("utf8");
  return { status: res.statusCode, json: raw ? JSON.parse(raw) : null };
}

test("admit research assignment returns 202 with durable outbox and launch rows", async () => {
  const assignment = loadFixture<AssignmentBody>("assignment.valid.research.json");
  const grant = grantHeaderValue(mintTestGrant(assignment));
  const events: unknown[] = [];

  const app = createQmCellApp({
    config: { tenantId: assignment.tenant_id },
    autoLaunch: false,
    fetchImpl: async (_url, init) => {
      events.push(JSON.parse(String(init?.body)));
      return new Response(null, { status: 202 });
    },
  });

  const response = await inject(app, {
    method: "POST",
    path: "/internal/harmony/v1/assignments",
    headers: {
      "Idempotency-Key": "idem-research-1",
      "X-Request-ID": "66666666-6666-4666-8666-666666666666",
      "X-Harmony-Grant": grant,
    },
    body: assignment,
  });

  assert.equal(response.status, 202);
  const body = response.json as { state: string; assignment_id: string };
  assert.equal(body.state, "accepted");
  assert.equal(body.assignment_id, assignment.assignment_id);

  assert.equal(app.store.outbox.length, 1);
  assert.equal(app.store.launchOutbox.length, 1);
  assert.equal(app.store.outbox[0]!.envelope.event_type, "task.accepted");
  assert.equal(app.store.launchOutbox[0]!.assignment_id, assignment.assignment_id);

  const replay = await inject(app, {
    method: "POST",
    path: "/internal/harmony/v1/assignments",
    headers: {
      "Idempotency-Key": "idem-research-1",
      "X-Request-ID": "77777777-7777-4777-8777-777777777777",
      "X-Harmony-Grant": grant,
    },
    body: assignment,
  });
  assert.equal(replay.status, 202);
  assert.equal(app.store.outbox.length, 1);
});

test("tenant mismatch rejects with TENANT_MISMATCH", async () => {
  const assignment = loadFixture<AssignmentBody>("assignment.invalid.tenant_mismatch.json");
  const grant = grantHeaderValue(mintTestGrant(assignment));

  const app = createQmCellApp({
    config: { tenantId: "33333333-3333-4333-8333-333333333333" },
    autoLaunch: false,
  });

  const response = await inject(app, {
    method: "POST",
    path: "/internal/harmony/v1/assignments",
    headers: {
      "Idempotency-Key": "idem-tenant-mismatch",
      "X-Request-ID": "88888888-8888-4888-8888-888888888888",
      "X-Harmony-Grant": grant,
    },
    body: assignment,
  });

  assert.equal(response.status, 403);
  const err = response.json as { code: string };
  assert.equal(err.code, "TENANT_MISMATCH");
  assert.equal(app.store.assignments.size, 0);
  assert.equal(app.store.outbox.length, 0);
});

test("capabilities exposes contract major and build sha", async () => {
  const app = createQmCellApp({ autoLaunch: false });
  const response = await inject(app, {
    method: "GET",
    path: "/internal/harmony/v1/capabilities",
  });
  assert.equal(response.status, 200);
  const body = response.json as { contract_majors: number[]; build_sha: string };
  assert.deepEqual(body.contract_majors, [1]);
  assert.match(body.build_sha, /^[0-9a-f]{40}$/);
});
