/**
 * Route surface for QM Harmony admission (mirror of services/qm-cell/src/app.ts handlers).
 * Wire into src/api/routes/index.ts in the upstream qm repository.
 */
export const HARMONY_INTERNAL_PREFIX = "/internal/harmony/v1";

export const HARMONY_ROUTES = {
  createAssignment: `${HARMONY_INTERNAL_PREFIX}/assignments`,
  getAssignment: `${HARMONY_INTERNAL_PREFIX}/assignments/:id`,
  cancelAssignment: `${HARMONY_INTERNAL_PREFIX}/assignments/:id/cancel`,
  capabilities: `${HARMONY_INTERNAL_PREFIX}/capabilities`,
} as const;
