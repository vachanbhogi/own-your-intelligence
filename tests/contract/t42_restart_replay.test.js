import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadFixture } from "./helpers/schema.mjs";
import { createHarmonyControlFake } from "./fakes/harmony_control.mjs";

describe("T42 — restart during review wait; replay start_assignment does not duplicate", () => {
  it("review stays pending with no workers after restart", () => {
    const harmony = createHarmonyControlFake();
    const candidateId = "66666666-6666-4666-8666-666666666666";

    harmony.enterReviewWait(candidateId);
    assert.equal(harmony.isReviewPending(candidateId), true);
    assert.equal(harmony.workerCount(candidateId), 0);

    const afterRestart = harmony.restartDuringReviewWait(candidateId);
    assert.equal(afterRestart.found, true);
    assert.equal(afterRestart.reviewPending, true);
    assert.equal(afterRestart.workersAlive, 0);
    assert.equal(harmony.isReviewPending(candidateId), true);
  });

  it("replay start_assignment with same idempotency key does not create a second assignment", () => {
    const fixture = loadFixture("assignment.valid.research.json");
    const harmony = createHarmonyControlFake();
    const key = "idem-t42-restart-replay";

    harmony.enterReviewWait(fixture.candidate_id ?? "review-only-candidate");

    const first = harmony.startAssignment({
      idempotencyKey: key,
      body: fixture,
      grantTenantId: fixture.tenant_id,
    });

    harmony.restartDuringReviewWait(fixture.candidate_id ?? "review-only-candidate");

    const replay = harmony.startAssignment({
      idempotencyKey: key,
      body: fixture,
      grantTenantId: fixture.tenant_id,
    });

    assert.equal(first.status, 202);
    assert.equal(replay.replay, true);
    assert.equal(replay.body.assignment_id, first.body.assignment_id);
    assert.equal(harmony.admission.count(), 1);
    assert.equal(harmony.outbox.logicalAssignmentCount(), 1);
    assert.equal(harmony.idempotency.size(), 1);
  });
});
