import { createHash } from "node:crypto";

/** Stable hash for idempotency comparison (method + route + body JSON). */
export function requestHash(method: string, routeKey: string, body: unknown): string {
  const canonical = JSON.stringify({ method, route: routeKey, body });
  return createHash("sha256").update(canonical, "utf8").digest("hex");
}

export function payloadHash(payload: unknown): string {
  return createHash("sha256").update(JSON.stringify(payload), "utf8").digest("hex");
}
