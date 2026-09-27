import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadFixture } from "./helpers/schema.mjs";
import { createHarmonyControlFake } from "./fakes/harmony_control.mjs";

describe("T38 — outbox resumes one logical assignment after restart", () => {
  it("commit survives kill-before-dispatch; resume dispatches exactly once", () => {
    const fixture = loadFixture("assignment.valid.research.json");
    const harmony = createHarmonyControlFake();
    const key = "idem-t38-outbox";

    const admitted = harmony.startAssignment({
      idempotencyKey: key,
      body: fixture,
      grantTenantId: fixture.tenant_id,
    });
    assert.equal(admitted.status, 202);

    const beforeKill = harmony.outbox.killBeforeDispatch();
    assert.equal(beforeKill.pending, 1);
    assert.equal(harmony.outbox.dispatchCount(fixture.assignment_id), 0);

    let dispatchCalls = 0;
    const resume = harmony.dispatchOutboxAfterRestart(() => {
      dispatchCalls++;
    });
    assert.equal(resume.dispatchedNow, 1);
    assert.equal(dispatchCalls, 1);
    assert.equal(harmony.outbox.logicalAssignmentCount(), 1);

    const secondResume = harmony.dispatchOutboxAfterRestart(() => {
      dispatchCalls++;
    });
    assert.equal(secondResume.dispatchedNow, 0);
    assert.equal(dispatchCalls, 1);
  });

  it("cancel is idempotent for the same idempotency key", () => {
    const fixture = loadFixture("assignment.valid.research.json");
    const harmony = createHarmonyControlFake();
    const cancelKey = "idem-t38-cancel";

    const first = harmony.cancelAssignment({
      idempotencyKey: cancelKey,
      assignmentId: fixture.assignment_id,
    });
    const second = harmony.cancelAssignment({
      idempotencyKey: cancelKey,
      assignmentId: fixture.assignment_id,
    });

    assert.equal(first.status, 202);
    assert.equal(second.replay, true);
    assert.equal(second.body.state, "cancelled");
    assert.equal(harmony.idempotency.size(), 1);
  });
});
