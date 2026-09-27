import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadFixture } from "./helpers/schema.mjs";
import { createLeaseFence } from "./fakes/lease_fence.mjs";

describe("T40 — lease loss fences stale completion", () => {
  it("old fence token after lease loss returns STALE_ATTEMPT and does not advance candidate", () => {
    const fixture = loadFixture("assignment.valid.pm_spec.json");
    const fence = createLeaseFence();

    const lease = fence.grant(
      fixture.task_id,
      fixture.attempt_id,
      fixture.generation,
      fixture.candidate_revision,
    );
    const oldToken = lease.fenceToken;

    fence.loseLease(fixture.task_id, fixture.attempt_id);

    const stale = fence.submitCompletion(fixture.task_id, fixture.attempt_id, {
      fenceToken: oldToken,
      candidateRevision: fixture.candidate_revision + 1,
    });

    assert.equal(stale.status, 409);
    assert.equal(stale.body.code, "STALE_ATTEMPT");
    assert.equal(stale.candidateAdvanced, false);
    assert.equal(
      fence.currentCandidateRevision(fixture.task_id, fixture.attempt_id),
      fixture.candidate_revision,
    );
  });

  it("completion with current fence token after re-lease is accepted", () => {
    const fixture = loadFixture("assignment.valid.pm_spec.json");
    const fence = createLeaseFence();

    const initialLease = fence.grant(
      fixture.task_id,
      fixture.attempt_id,
      fixture.generation,
      fixture.candidate_revision,
    );
    const afterLoss = fence.loseLease(fixture.task_id, fixture.attempt_id);
    const reLease = fence.grant(
      fixture.task_id,
      fixture.attempt_id,
      fixture.generation + 1,
      fixture.candidate_revision,
    );

    const ok = fence.submitCompletion(fixture.task_id, fixture.attempt_id, {
      fenceToken: reLease.fenceToken,
      candidateRevision: fixture.candidate_revision + 1,
    });

    assert.equal(ok.status, 202);
    assert.equal(ok.candidateAdvanced, true);
    assert.ok(afterLoss.hadLease);
    assert.notEqual(reLease.fenceToken, initialLease.fenceToken);
  });
});
