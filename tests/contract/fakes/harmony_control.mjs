import { createIdempotencyStore } from "./idempotency.mjs";
import { createAssignmentOutbox } from "./outbox.mjs";
import { createAdmissionService } from "./admission.mjs";
import { canonicalRequestHash } from "../helpers/canonical.mjs";

/**
 * UFO / Harmony control plane fake: start_assignment, cancel, review wait (T15, T38, T42).
 */
export function createHarmonyControlFake() {
  const idempotency = createIdempotencyStore();
  const outbox = createAssignmentOutbox();
  const admission = createAdmissionService();

  /** @type {Map<string, { reviewPending: boolean, workersAlive: number }>} */
  const reviewState = new Map();

  return {
    idempotency,
    outbox,
    admission,

    startAssignment({
      idempotencyKey,
      requestId = crypto.randomUUID(),
      body,
      grantTenantId,
    }) {
      const hash = canonicalRequestHash({
        method: "POST",
        route: "/internal/harmony/v1/assignments",
        body,
      });

      return idempotency.run(idempotencyKey, hash, () => {
        const admitResult = admission.admit(body, { grantTenantId });
        if (admitResult.status !== 202) {
          return admitResult;
        }
        outbox.commit(body);
        return {
          status: 202,
          body: {
            ...admitResult.body,
            operation_id: requestId,
          },
        };
      });
    },

    dispatchOutboxAfterRestart(onDispatch = () => {}) {
      return outbox.resumeDispatch(onDispatch);
    },

    cancelAssignment({ idempotencyKey, assignmentId, requestId = crypto.randomUUID() }) {
      const hash = canonicalRequestHash({
        method: "POST",
        route: "/internal/harmony/v1/assignments/{id}/cancel",
        pathParams: { id: assignmentId },
        body: {},
      });

      return idempotency.run(idempotencyKey, hash, () => ({
        status: 202,
        body: {
          assignment_id: assignmentId,
          state: "cancelled",
          operation_id: requestId,
        },
      }));
    },

    /** Multi-day review wait without keeping workers alive (T42). */
    enterReviewWait(candidateId) {
      reviewState.set(candidateId, { reviewPending: true, workersAlive: 0 });
    },

    restartDuringReviewWait(candidateId) {
      const state = reviewState.get(candidateId);
      if (!state) return { found: false };
      state.workersAlive = 0;
      return { found: true, reviewPending: state.reviewPending, workersAlive: 0 };
    },

    isReviewPending(candidateId) {
      return reviewState.get(candidateId)?.reviewPending ?? false;
    },

    workerCount(candidateId) {
      return reviewState.get(candidateId)?.workersAlive ?? 0;
    },
  };
}
