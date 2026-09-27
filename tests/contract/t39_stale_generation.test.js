import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadFixture } from "./helpers/schema.mjs";
import { createQmRunRegistry } from "./fakes/qm_reconcile.mjs";

describe("T39 — reconcile original QM run after provider acceptance (no parallel writer)", () => {
  it("provider acceptance records one run; restart reconcile reuses it", () => {
    const fixture = loadFixture("assignment.valid.research.json");
    const qm = createQmRunRegistry();

    const accepted = qm.onProviderAccepted(
      fixture.assignment_id,
      fixture.generation,
    );
    assert.equal(accepted.duplicate, false);
    assert.ok(accepted.providerRunId);

    qm.simulateKill();
    assert.equal(qm.activeWriterCount(fixture.assignment_id), 0);

    const reconciled = qm.reconcileAfterRestart(fixture.assignment_id);
    assert.equal(reconciled.found, true);
    assert.equal(reconciled.providerRunId, accepted.providerRunId);
    assert.equal(reconciled.parallelWriterCreated, false);
    assert.equal(qm.activeWriterCount(fixture.assignment_id), 1);

    const secondReconcile = qm.reconcileAfterRestart(fixture.assignment_id);
    assert.equal(secondReconcile.providerRunId, accepted.providerRunId);
    assert.equal(qm.getProviderRunId(fixture.assignment_id), accepted.providerRunId);
  });

  it("stale generation on acceptance is rejected with STALE_ATTEMPT", () => {
    const fixture = loadFixture("assignment.valid.research.json");
    const qm = createQmRunRegistry();

    qm.onProviderAccepted(fixture.assignment_id, fixture.generation);
    const stale = qm.onProviderAccepted(fixture.assignment_id, fixture.generation + 1);

    assert.ok(stale.error);
    assert.equal(stale.error.status, 409);
    assert.equal(stale.error.body.code, "STALE_ATTEMPT");
  });
});
