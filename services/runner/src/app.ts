import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import {
  DestroyedError,
  FenceError,
  InvalidPhaseError,
  NotFoundError,
  RunnerStore,
  validateLimits,
} from "./store.js";
import type { ErrorBody } from "./types.js";

export interface RunnerAppOptions {
  store?: RunnerStore;
}

export interface RunnerApp {
  handle: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
  store: RunnerStore;
}

export function createRunnerApp(options: RunnerAppOptions = {}): RunnerApp {
  const store = options.store ?? new RunnerStore();

  async function handle(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    const requestId = randomUUID();
    try {
      const url = new URL(req.url ?? "/", "http://runner.internal");
      const method = req.method ?? "GET";

      if (method === "POST" && url.pathname === "/allocate") {
        const body = await readJson(req);
        const field = requireFields(body, [
          "tenant_id",
          "task_id",
          "attempt_id",
          "generation",
          "limits",
        ]);
        if (field) {
          return sendError(res, 400, "INVALID_REQUEST", `missing ${field}`, requestId, false);
        }
        const limitsField = validateLimits(body.limits);
        if (limitsField) {
          return sendError(
            res,
            400,
            "INVALID_REQUEST",
            `invalid ${limitsField}`,
            requestId,
            false,
          );
        }
        if (!Number.isInteger(body.generation) || body.generation < 1) {
          return sendError(res, 400, "INVALID_REQUEST", "invalid generation", requestId, false);
        }
        const record = store.allocate({
          tenant_id: String(body.tenant_id),
          task_id: String(body.task_id),
          attempt_id: String(body.attempt_id),
          generation: body.generation,
          limits: body.limits,
        });
        return sendJson(res, 201, {
          handle_id: record.handle_id,
          lease_expires_at: record.lease_expires_at,
          egress_deny_default: record.egress_deny_default,
        });
      }

      if (method === "POST" && url.pathname === "/prepare") {
        const body = await readJson(req);
        const field = requireFields(body, [
          "handle_id",
          "input_manifest_id",
          "artifact_refs",
        ]);
        if (field) {
          return sendError(res, 400, "INVALID_REQUEST", `missing ${field}`, requestId, false);
        }
        if (!Array.isArray(body.artifact_refs)) {
          return sendError(res, 400, "INVALID_REQUEST", "artifact_refs must be array", requestId, false);
        }
        try {
          const record = store.prepare(
            String(body.handle_id),
            String(body.input_manifest_id),
            body.artifact_refs.map(String),
          );
          return sendJson(res, 200, { handle_id: record.handle_id, phase: record.phase });
        } catch (err) {
          return mapStoreError(res, err, requestId);
        }
      }

      if (method === "POST" && url.pathname === "/execute") {
        const body = await readJson(req);
        const field = requireFields(body, ["handle_id", "task_type"]);
        if (field) {
          return sendError(res, 400, "INVALID_REQUEST", `missing ${field}`, requestId, false);
        }
        try {
          const record = store.execute(String(body.handle_id), String(body.task_type));
          const payload: Record<string, unknown> = {
            handle_id: record.handle_id,
            phase: record.phase,
            task_type: record.task_type,
          };
          if (record.result_artifact_id) {
            payload.result_artifact_id = record.result_artifact_id;
          }
          return sendJson(res, 200, payload);
        } catch (err) {
          return mapStoreError(res, err, requestId);
        }
      }

      const inspectMatch = url.pathname.match(/^\/inspect\/([^/]+)$/);
      if (method === "GET" && inspectMatch) {
        const handleId = decodeURIComponent(inspectMatch[1]!);
        const record = store.get(handleId);
        if (!record) {
          return sendError(res, 404, "NOT_FOUND", "handle not found", requestId, false);
        }
        return sendJson(res, 200, store.toInspectView(record));
      }

      const stopMatch = url.pathname.match(/^\/stop\/([^/]+)$/);
      if (method === "POST" && stopMatch) {
        try {
          const record = store.stop(decodeURIComponent(stopMatch[1]!));
          return sendJson(res, 200, { handle_id: record.handle_id, phase: record.phase });
        } catch (err) {
          return mapStoreError(res, err, requestId);
        }
      }

      const destroyMatch = url.pathname.match(/^\/destroy\/([^/]+)$/);
      if (method === "POST" && destroyMatch) {
        try {
          const record = store.destroy(decodeURIComponent(destroyMatch[1]!));
          return sendJson(res, 200, {
            handle_id: record.handle_id,
            phase: record.phase,
            destroyed_at: record.destroyed_at ?? null,
          });
        } catch (err) {
          return mapStoreError(res, err, requestId);
        }
      }

      const heartbeatMatch = url.pathname.match(/^\/heartbeat\/([^/]+)$/);
      if (method === "POST" && heartbeatMatch) {
        try {
          const record = store.refreshHeartbeat(decodeURIComponent(heartbeatMatch[1]!));
          return sendJson(res, 200, {
            handle_id: record.handle_id,
            lease_expires_at: record.lease_expires_at,
            heartbeat_at: record.heartbeat_at,
            fenced: record.fenced,
          });
        } catch (err) {
          return mapStoreError(res, err, requestId);
        }
      }

      return sendError(res, 404, "NOT_FOUND", "route not found", requestId, false);
    } catch {
      return sendError(res, 500, "INTERNAL", "unexpected error", requestId, true);
    }
  }

  return { handle, store };
}

function mapStoreError(
  res: ServerResponse,
  err: unknown,
  requestId: string,
): void {
  if (err instanceof FenceError) {
    sendError(res, 409, "FENCED", "lease expired; container fenced", requestId, false);
    return;
  }
  if (err instanceof NotFoundError) {
    sendError(res, 404, "NOT_FOUND", "handle not found", requestId, false);
    return;
  }
  if (err instanceof DestroyedError) {
    sendError(res, 409, "DESTROYED", "container destroyed", requestId, false);
    return;
  }
  if (err instanceof InvalidPhaseError) {
    sendError(
      res,
      409,
      "INVALID_PHASE",
      err.message,
      requestId,
      false,
    );
    return;
  }
  sendError(res, 500, "INTERNAL", "unexpected error", requestId, true);
}

async function readJson(req: IncomingMessage): Promise<Record<string, any>> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  if (chunks.length === 0) {
    return {};
  }
  const text = Buffer.concat(chunks).toString("utf8");
  return JSON.parse(text) as Record<string, any>;
}

function requireFields(
  body: Record<string, unknown>,
  fields: string[],
): string | null {
  for (const field of fields) {
    if (body[field] === undefined || body[field] === null) {
      return field;
    }
  }
  return null;
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json",
    "content-length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function sendError(
  res: ServerResponse,
  status: number,
  code: string,
  message: string,
  requestId: string,
  retryable: boolean,
): void {
  const body: ErrorBody = {
    code,
    message,
    request_id: requestId,
    retryable,
  };
  sendJson(res, status, body);
}
