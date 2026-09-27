import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadFixture, validateAgainst, SCHEMA_IDS } from "./helpers/schema.mjs";
import { createAdmissionService } from "./fakes/admission.mjs";
import { createHarmonyControlFake } from "./fakes/harmony_control.mjs";

describe("T15 — research assignment fixture and admission accept/reject", () => {
  it("validates assignment.valid.research.json against assignment schema", () => {
    const fixture = loadFixture("assignment.valid.research.json");
    const { ok, errors } = validateAgainst(SCHEMA_IDS.assignment, fixture);
    assert.equal(ok, true, errors.map((e) => JSON.stringify(e)).join("; "));
    assert.equal(fixture.task_type, "source_discovery");
    assert.equal(fixture.result_contract, "research_report.v1");
    assert.equal(fixture.candidate_id, null);
    assert.equal(fixture.candidate_revision, null);
  });

  it("accepts research assignment when grant tenant matches payload", () => {
    const fixture = loadFixture("assignment.valid.research.json");
    const admission = createAdmissionService();
    const grantTenantId = fixture.tenant_id;

    const result = admission.admit(fixture, { grantTenantId });
    assert.equal(result.status, 202);
    assert.equal(result.body.state, "accepted");
    assert.equal(result.body.assignment_id, fixture.assignment_id);
    assert.equal(result.body.input_hash, fixture.input_hash);
    assert.equal(result.body.generation, fixture.generation);
  });

  it("rejects tenant mismatch before session creation", () => {
    const mismatch = loadFixture("assignment.invalid.tenant_mismatch.json");
    const { ok } = validateAgainst(SCHEMA_IDS.assignment, mismatch);
    assert.equal(ok, true, "invalid fixture is schema-valid; mismatch is grant vs payload");

    const admission = createAdmissionService();
    const grantTenantId = "33333333-3333-4333-8333-333333333333";

    const result = admission.admit(mismatch, { grantTenantId });
    assert.equal(result.status, 403);
    assert.equal(result.body.code, "TENANT_MISMATCH");
  });

  it("one assignment_id links start_assignment admission and durable outbox", () => {
    const fixture = loadFixture("assignment.valid.research.json");
    const harmony = createHarmonyControlFake();
    const key = "idem-t15-research";

    const first = harmony.startAssignment({
      idempotencyKey: key,
      body: fixture,
      grantTenantId: fixture.tenant_id,
    });
    assert.equal(first.status, 202);
    assert.equal(first.body.assignment_id, fixture.assignment_id);

    harmony.dispatchOutboxAfterRestart();
    assert.equal(harmony.outbox.dispatchCount(fixture.assignment_id), 1);
    assert.equal(harmony.admission.get(fixture.assignment_id).task_id, fixture.task_id);
  });
});
