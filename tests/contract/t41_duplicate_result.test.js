import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadFixture, validateAgainst, SCHEMA_IDS } from "./helpers/schema.mjs";
import { createEventInbox } from "./fakes/inbox.mjs";

describe("T41 — duplicate and out-of-order result events", () => {
  it("deduplicates by event_id", () => {
    const event = loadFixture("event.task_result_received.json");
    const { ok } = validateAgainst(SCHEMA_IDS.eventEnvelope, event);
    assert.equal(ok, true);

    const inbox = createEventInbox();
    const first = inbox.ingest(event);
    const duplicate = inbox.ingest(event);

    assert.equal(first.applied, true);
    assert.equal(first.duplicate, false);
    assert.equal(duplicate.duplicate, true);
    assert.equal(duplicate.applied, false);
    assert.equal(inbox.seenCount(), 1);
    assert.equal(
      inbox.getAggregateVersion(event.aggregate_type, event.aggregate_id),
      event.aggregate_version,
    );
  });

  it("ignores stale aggregate_version and keeps authoritative state", () => {
    const newer = loadFixture("event.task_result_received.json");
    const older = {
      ...newer,
      event_id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
      aggregate_version: newer.aggregate_version - 1,
    };

    const inbox = createEventInbox();
    inbox.ingest(newer);
    const outOfOrder = inbox.ingest(older);

    assert.equal(outOfOrder.applied, false);
    assert.equal(outOfOrder.reason, "stale_aggregate_version");
    assert.equal(
      inbox.getAggregateVersion(newer.aggregate_type, newer.aggregate_id),
      newer.aggregate_version,
    );
  });
});
