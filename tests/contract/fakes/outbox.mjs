/**
 * Durable assignment outbox: commit before dispatch (T38).
 */
export function createAssignmentOutbox() {
  /** @type {Array<{ assignmentId: string, payload: object, dispatched: boolean }>} */
  const entries = [];

  return {
    commit(payload) {
      const assignmentId = payload.assignment_id;
      const existing = entries.find((e) => e.assignmentId === assignmentId);
      if (existing) {
        return { duplicate: true, entry: existing };
      }
      const entry = { assignmentId, payload, dispatched: false };
      entries.push(entry);
      return { duplicate: false, entry };
    },

    /** Simulate process crash after commit, before dispatch. */
    killBeforeDispatch() {
      return { pending: entries.filter((e) => !e.dispatched).length };
    },

    /** Resume outbox after restart; each logical assignment dispatches once. */
    resumeDispatch(onDispatch) {
      let dispatchedNow = 0;
      for (const entry of entries) {
        if (!entry.dispatched) {
          entry.dispatched = true;
          onDispatch(entry.payload);
          dispatchedNow++;
        }
      }
      return { dispatchedNow, total: entries.length };
    },

    dispatchCount(assignmentId) {
      return entries.filter((e) => e.assignmentId === assignmentId && e.dispatched)
        .length;
    },

    logicalAssignmentCount() {
      return entries.length;
    },
  };
}
