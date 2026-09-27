import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadFixture } from "./helpers/schema.mjs";
import { createIdempotencyStore } from "./fakes/idempotency.mjs";
import { canonicalRequestHash } from "./helpers/canonical.mjs";

describe("T37 — idempotency key reuse", () => {
  it("same key and same body returns the same accepted result", () => {
    const store = createIdempotencyStore();
    const body = loadFixture("assignment.valid.research.json");
    const key = "idem-t37-same";
    const hash = canonicalRequestHash({
      method: "POST",
      route: "/internal/harmony/v1/assignments",
      body,
    });

    const first = store.run(key, hash, () => ({
      status: 202,
      body: { assignment_id: body.assignment_id, state: "accepted" },
    }));
    const second = store.run(key, hash, () => {
      throw new Error("must not execute twice");
    });

    assert.equal(first.status, 202);
    assert.equal(second.replay, true);
    assert.equal(second.status, 202);
    assert.deepEqual(second.body, first.body);
    assert.equal(store.size(), 1);
  });

  it("same key with different body returns IDEMPOTENCY_CONFLICT and no second effect", () => {
    const store = createIdempotencyStore();
    const bodyA = loadFixture("assignment.valid.research.json");
    const bodyB = {
      ...bodyA,
      assignment_id: "22222222-2222-4222-8222-222222222223",
    };
    const key = "idem-t37-conflict";

    const hashA = canonicalRequestHash({
      method: "POST",
      route: "/internal/harmony/v1/assignments",
      body: bodyA,
    });
    const hashB = canonicalRequestHash({
      method: "POST",
      route: "/internal/harmony/v1/assignments",
      body: bodyB,
    });

    const first = store.run(key, hashA, () => ({
      status: 202,
      body: { assignment_id: bodyA.assignment_id, state: "accepted" },
    }));
    const conflict = store.run(key, hashB, () => ({
      status: 202,
      body: { assignment_id: bodyB.assignment_id, state: "accepted" },
    }));

    assert.equal(first.status, 202);
    assert.equal(conflict.status, 409);
    assert.equal(conflict.body.code, "IDEMPOTENCY_CONFLICT");
    assert.equal(conflict.conflict, true);
    assert.equal(store.size(), 1);
  });
});
