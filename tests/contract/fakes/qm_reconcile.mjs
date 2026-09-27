/**
 * QM provider acceptance + restart reconcile (T39): one writer per assignment.
 */
export function createQmRunRegistry() {
  /** @type {Map<string, { providerRunId: string, generation: number, writerActive: boolean }>} */
  const runs = new Map();

  return {
    onProviderAccepted(assignmentId, generation) {
      const existing = runs.get(assignmentId);
      if (existing && existing.generation === generation) {
        return { providerRunId: existing.providerRunId, duplicate: true };
      }
      if (existing && existing.generation !== generation) {
        return {
          error: {
            status: 409,
            body: {
              code: "STALE_ATTEMPT",
              message: "Generation mismatch on provider acceptance",
              request_id: crypto.randomUUID(),
              retryable: false,
            },
          },
        };
      }
      const providerRunId = crypto.randomUUID();
      runs.set(assignmentId, {
        providerRunId,
        generation,
        writerActive: true,
      });
      return { providerRunId, duplicate: false };
    },

    /** After QM kill: reconcile reattaches to original run, no second writer. */
    reconcileAfterRestart(assignmentId) {
      const run = runs.get(assignmentId);
      if (!run) {
        return { found: false };
      }
      if (run.writerActive) {
        return {
          found: true,
          providerRunId: run.providerRunId,
          parallelWriterCreated: false,
        };
      }
      run.writerActive = true;
      return {
        found: true,
        providerRunId: run.providerRunId,
        parallelWriterCreated: false,
      };
    },

    simulateKill() {
      for (const run of runs.values()) {
        run.writerActive = false;
      }
    },

    activeWriterCount(assignmentId) {
      const run = runs.get(assignmentId);
      return run?.writerActive ? 1 : 0;
    },

    getProviderRunId(assignmentId) {
      return runs.get(assignmentId)?.providerRunId ?? null;
    },
  };
}
