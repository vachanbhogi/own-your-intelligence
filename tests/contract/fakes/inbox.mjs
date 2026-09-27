/**
 * Harmony QM event inbox with deduplication (T41).
 */
export function createEventInbox() {
  /** @type {Set<string>} */
  const seenEventIds = new Set();
  /** @type {Map<string, { aggregateVersion: number, lastEventId: string }>} */
  const authoritative = new Map();

  return {
    ingest(event) {
      if (seenEventIds.has(event.event_id)) {
        return { status: 202, duplicate: true, applied: false };
      }
      seenEventIds.add(event.event_id);

      const aggKey = `${event.aggregate_type}:${event.aggregate_id}`;
      const current = authoritative.get(aggKey) ?? {
        aggregateVersion: 0,
        lastEventId: null,
      };

      if (event.aggregate_version <= current.aggregateVersion) {
        return {
          status: 202,
          duplicate: false,
          applied: false,
          reason: "stale_aggregate_version",
          currentVersion: current.aggregateVersion,
        };
      }

      authoritative.set(aggKey, {
        aggregateVersion: event.aggregate_version,
        lastEventId: event.event_id,
      });
      return {
        status: 202,
        duplicate: false,
        applied: true,
        aggregateVersion: event.aggregate_version,
      };
    },

    getAggregateVersion(aggregateType, aggregateId) {
      const key = `${aggregateType}:${aggregateId}`;
      return authoritative.get(key)?.aggregateVersion ?? 0;
    },

    seenCount() {
      return seenEventIds.size;
    },
  };
}
