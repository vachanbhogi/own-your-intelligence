import { createHash } from "node:crypto";

export function requestHash(method: string, routeKey: string, body: unknown): string {
  const canonical = JSON.stringify({ method, route: routeKey, body });
  return createHash("sha256").update(canonical, "utf8").digest("hex");
}
