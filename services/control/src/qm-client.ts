import type { AssignmentBody } from "./types.js";
import { grantHeaderValue, mintHarmonyGrant } from "./grant.js";

export interface QmClientOptions {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
}

export async function postAssignmentToQm(
  assignment: AssignmentBody,
  headers: { idempotencyKey: string; requestId: string },
  options: QmClientOptions = {},
): Promise<Response> {
  const baseUrl = (options.baseUrl ?? process.env.QM_BASE_URL ?? "http://127.0.0.1:7101").replace(
    /\/$/,
    "",
  );
  const grant = mintHarmonyGrant(assignment);
  const fetchFn = options.fetchImpl ?? fetch;

  return fetchFn(`${baseUrl}/internal/harmony/v1/assignments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": headers.idempotencyKey,
      "X-Request-ID": headers.requestId,
      "X-Harmony-Grant": grantHeaderValue(grant),
    },
    body: JSON.stringify(assignment),
  });
}
