import { createHarmonyControlFake } from "./harmony_control.mjs";
import { createQmRunRegistry } from "./qm_reconcile.mjs";
import { createLeaseFence } from "./lease_fence.mjs";
import { createEventInbox } from "./inbox.mjs";
import { createIdempotencyStore } from "./idempotency.mjs";

let liveWarned = false;

/**
 * Returns fakes by default. Wave 3: LIVE=1 will use HTTP adapters when implemented.
 */
export function createContractFakes() {
  if (process.env.LIVE === "1" && !liveWarned) {
    liveWarned = true;
    console.warn(
      "[contract-tests] LIVE=1 set but live HTTP adapters are not wired yet; using in-process fakes.",
    );
  }

  return {
    harmony: createHarmonyControlFake(),
    qmRuns: createQmRunRegistry(),
    leaseFence: createLeaseFence(),
    inbox: createEventInbox(),
    idempotency: createIdempotencyStore(),
  };
}

export {
  createHarmonyControlFake,
  createQmRunRegistry,
  createLeaseFence,
  createEventInbox,
  createIdempotencyStore,
  createAdmissionService,
};
