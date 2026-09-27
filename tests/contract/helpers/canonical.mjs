import { createHash } from "node:crypto";

/**
 * Stable request fingerprint for idempotency (method, route, resource ids, body).
 * Transport timestamps are excluded per handoff 06 §2.
 */
function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  const keys = Object.keys(value).sort();
  return `{${keys
    .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
    .join(",")}}`;
}

export function canonicalRequestHash({ method, route, pathParams = {}, body }) {
  const payload = {
    body,
    method: method.toUpperCase(),
    pathParams,
    route,
  };
  return createHash("sha256").update(stableStringify(payload), "utf8").digest("hex");
}
