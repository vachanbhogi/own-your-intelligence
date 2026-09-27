/**
 * Runner lease / fence token (handoff 06 §6, T40).
 */
export function createLeaseFence() {
  /** @type {Map<string, { fenceToken: number, candidateRevision: number }>} */
  const leases = new Map();

  function key(taskId, attemptId) {
    return `${taskId}:${attemptId}`;
  }

  return {
    grant(taskId, attemptId, generation, candidateRevision = 0) {
      const fenceToken = generation;
      leases.set(key(taskId, attemptId), { fenceToken, candidateRevision });
      return { fenceToken, leaseSeconds: 60 };
    },

    loseLease(taskId, attemptId) {
      const entry = leases.get(key(taskId, attemptId));
      if (!entry) return { hadLease: false };
      entry.fenceToken += 1000;
      return { hadLease: true, newFenceToken: entry.fenceToken };
    },

    submitCompletion(taskId, attemptId, { fenceToken, candidateRevision }) {
      const entry = leases.get(key(taskId, attemptId));
      if (!entry) {
        return {
          status: 409,
          body: {
            code: "STALE_ATTEMPT",
            message: "No active lease for attempt",
            request_id: crypto.randomUUID(),
            retryable: false,
          },
        };
      }
      if (fenceToken !== entry.fenceToken) {
        return {
          status: 409,
          body: {
            code: "STALE_ATTEMPT",
            message: "Completion rejected: stale fence token after lease loss",
            request_id: crypto.randomUUID(),
            retryable: false,
          },
          candidateAdvanced: false,
        };
      }
      if (candidateRevision > entry.candidateRevision) {
        entry.candidateRevision = candidateRevision;
        return {
          status: 202,
          body: { accepted: true, candidateRevision: entry.candidateRevision },
          candidateAdvanced: true,
        };
      }
      return {
        status: 202,
        body: { accepted: true, candidateRevision: entry.candidateRevision },
        candidateAdvanced: false,
      };
    },

    currentCandidateRevision(taskId, attemptId) {
      return leases.get(key(taskId, attemptId))?.candidateRevision ?? 0;
    },
  };
}
