import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";
import type { AssignmentBody, ErrorBody, QmCellConfig, QmCellStore } from "./types.js";
import { loadQmCellConfig } from "./config.js";
import { requestHash } from "./canonical-hash.js";
import { grantMatchesAssignment, parseHarmonyGrantHeader } from "./grant.js";
import { flushOutbox, type FetchLike } from "./outbox-publisher.js";
import { scheduleLaunchProcessing } from "./launch-worker.js";
import {
  admitAssignmentDurable,
  cancelAssignmentDurable,
  checkIdempotency,
  createQmCellStore,
  saveIdempotency,
} from "./store.js";
import { assertDeploymentTenant, validateAssignmentBody } from "./validation.js";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface CreateQmCellAppOptions {
  config?: Partial<QmCellConfig>;
  store?: QmCellStore;
  fetchImpl?: FetchLike;
  autoLaunch?: boolean;
}

export interface QmCellApp {
  store: QmCellStore;
  config: QmCellConfig;
  handler: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
  listen: (port?: number) => ReturnType<typeof createServer>;
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) {
    return null;
  }
  return JSON.parse(raw);
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function errorBody(
  code: string,
  message: string,
  requestId: string,
  retryable: boolean,
  extra?: Partial<ErrorBody>,
): ErrorBody {
  return { code, message, request_id: requestId, retryable, ...extra };
}

function requireHeaders(
  req: IncomingMessage,
  requestId: string,
): { idempotencyKey?: string; error?: ErrorBody } {
  const idempotencyKey = req.headers["idempotency-key"];
  const xRequestId = req.headers["x-request-id"];
  if (typeof idempotencyKey !== "string" || !idempotencyKey.trim()) {
    return {
      error: errorBody(
        "CONTRACT_INVALID",
        "Idempotency-Key header is required",
        requestId,
        false,
      ),
    };
  }
  if (typeof xRequestId !== "string" || !UUID_RE.test(xRequestId)) {
    return {
      error: errorBody(
        "CONTRACT_INVALID",
        "X-Request-ID must be a UUID",
        requestId,
        false,
      ),
    };
  }
  return { idempotencyKey };
}

export function createQmCellApp(options: CreateQmCellAppOptions = {}): QmCellApp {
  const config = loadQmCellConfig(options.config ?? {});
  const store = options.store ?? createQmCellStore();
  const fetchImpl = options.fetchImpl;
  const autoLaunch = options.autoLaunch ?? true;

  async function handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = new URL(req.url ?? "/", "http://localhost");
    const path = url.pathname;
    const method = req.method ?? "GET";
    const requestId =
      typeof req.headers["x-request-id"] === "string" &&
      UUID_RE.test(req.headers["x-request-id"])
        ? req.headers["x-request-id"]
        : randomUUID();

    try {
      if (method === "GET" && path === "/internal/harmony/v1/capabilities") {
        sendJson(res, 200, {
          contract_majors: [config.contractMajor],
          contract_versions: [config.contractVersion],
          build_sha: config.buildSha,
          healthy: true,
          adapters: {
            harmony_events: config.harmonyEventsUrl,
            runner: config.runnerBaseUrl,
            deployment_tenant_id: config.tenantId,
          },
        });
        return;
      }

      const assignmentGet = path.match(
        /^\/internal\/harmony\/v1\/assignments\/([0-9a-f-]+)$/i,
      );
      if (method === "GET" && assignmentGet) {
        const assignmentId = assignmentGet[1]!;
        const record = store.assignments.get(assignmentId);
        if (!record) {
          sendJson(
            res,
            404,
            errorBody("NOT_FOUND", "Assignment not found", requestId, false),
          );
          return;
        }
        sendJson(res, 200, {
          assignment_id: record.assignment_id,
          tenant_id: record.tenant_id,
          task_id: record.task_id,
          attempt_id: record.attempt_id,
          generation: record.generation,
          state: record.state,
          accepted_at: record.accepted_at,
          input_hash: record.input_hash,
          provider_run_id: record.provider_run_id,
          lock_version: record.lock_version,
          body: record.body,
        });
        return;
      }

      const cancelMatch = path.match(
        /^\/internal\/harmony\/v1\/assignments\/([0-9a-f-]+)\/cancel$/i,
      );
      if (method === "POST" && cancelMatch) {
        const headers = requireHeaders(req, requestId);
        if (headers.error) {
          sendJson(res, 422, headers.error);
          return;
        }
        const assignmentId = cancelMatch[1]!;
        const routeKey = `POST /internal/harmony/v1/assignments/${assignmentId}/cancel`;
        const hash = requestHash(method, routeKey, { assignment_id: assignmentId });
        const idem = checkIdempotency(store, routeKey, headers.idempotencyKey!, hash);
        if (idem.type === "conflict") {
          sendJson(
            res,
            409,
            errorBody("IDEMPOTENCY_CONFLICT", "Idempotency key reused with different body", requestId, false),
          );
          return;
        }
        if (idem.type === "replay") {
          sendJson(res, idem.record.response_status, idem.record.response_json);
          return;
        }

        const grant = parseHarmonyGrantHeader(
          typeof req.headers["x-harmony-grant"] === "string"
            ? req.headers["x-harmony-grant"]
            : undefined,
        );
        if (!grant) {
          sendJson(
            res,
            403,
            errorBody("FORBIDDEN", "X-Harmony-Grant is required and must be valid JSON", requestId, false),
          );
          return;
        }

        const record = store.assignments.get(assignmentId);
        if (
          record &&
          (grant.task_id !== record.task_id ||
            grant.attempt_id !== record.attempt_id ||
            grant.generation !== record.generation ||
            grant.tenant_id !== record.tenant_id)
        ) {
          sendJson(
            res,
            409,
            errorBody("STALE_ATTEMPT", "Grant does not match assignment attempt", requestId, false),
          );
          return;
        }

        const cancelled = cancelAssignmentDurable(store, assignmentId, requestId);
        if (!cancelled) {
          sendJson(
            res,
            404,
            errorBody("NOT_FOUND", "Assignment not found", requestId, false),
          );
          return;
        }

        const response = {
          assignment_id: cancelled.assignment_id,
          state: cancelled.state,
        };
        saveIdempotency(store, {
          route_key: routeKey,
          idempotency_key: headers.idempotencyKey!,
          request_hash: hash,
          response_status: 202,
          response_json: response,
        });
        await flushOutbox(store, {
          harmonyEventsUrl: config.harmonyEventsUrl,
          fetchImpl,
          serviceIdentity: config.tenantId,
        });
        sendJson(res, 202, response);
        return;
      }

      if (method === "POST" && path === "/internal/harmony/v1/assignments") {
        const headers = requireHeaders(req, requestId);
        if (headers.error) {
          sendJson(res, 422, headers.error);
          return;
        }

        const grantRaw =
          typeof req.headers["x-harmony-grant"] === "string"
            ? req.headers["x-harmony-grant"]
            : undefined;
        const grant = parseHarmonyGrantHeader(grantRaw);
        if (!grant) {
          sendJson(
            res,
            403,
            errorBody("FORBIDDEN", "X-Harmony-Grant is required and must be valid JSON", requestId, false),
          );
          return;
        }

        let body: unknown;
        try {
          body = await readJsonBody(req);
        } catch {
          sendJson(
            res,
            422,
            errorBody("CONTRACT_INVALID", "Invalid JSON body", requestId, false),
          );
          return;
        }

        const routeKey = "POST /internal/harmony/v1/assignments";
        const hash = requestHash(method, routeKey, body);
        const idem = checkIdempotency(store, routeKey, headers.idempotencyKey!, hash);
        if (idem.type === "conflict") {
          sendJson(
            res,
            409,
            errorBody("IDEMPOTENCY_CONFLICT", "Idempotency key reused with different body", requestId, false),
          );
          return;
        }
        if (idem.type === "replay") {
          sendJson(res, idem.record.response_status, idem.record.response_json);
          return;
        }

        const validated = validateAssignmentBody(body);
        if (!validated.ok) {
          const status = validated.code === "TENANT_MISMATCH" ? 403 : 422;
          sendJson(
            res,
            status,
            errorBody(validated.code, validated.message, requestId, false),
          );
          return;
        }
        const assignment = validated.assignment;

        const tenantCheck = assertDeploymentTenant(assignment.tenant_id, config.tenantId);
        if (!tenantCheck.ok) {
          sendJson(
            res,
            403,
            errorBody(tenantCheck.code, tenantCheck.message, requestId, false),
          );
          return;
        }

        if (!grantMatchesAssignment(grant, assignment)) {
          sendJson(
            res,
            409,
            errorBody(
              "STALE_ATTEMPT",
              "X-Harmony-Grant does not match assignment tenant/task/attempt/generation",
              requestId,
              false,
            ),
          );
          return;
        }

        let admitResult;
        try {
          admitResult = admitAssignmentDurable(store, assignment, requestId);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Admission failed";
          if (message === "STALE_ATTEMPT") {
            sendJson(
              res,
              409,
              errorBody("STALE_ATTEMPT", "Attempt generation is stale for this task", requestId, false),
            );
            return;
          }
          if (message === "IDEMPOTENCY_CONFLICT") {
            sendJson(
              res,
              409,
              errorBody("IDEMPOTENCY_CONFLICT", "Assignment body conflict", requestId, false),
            );
            return;
          }
          throw err;
        }

        const response = {
          assignment_id: admitResult.assignment.assignment_id,
          state: "accepted" as const,
          accepted_at: admitResult.assignment.accepted_at,
          input_hash: admitResult.assignment.input_hash,
          provider_run_id: admitResult.assignment.provider_run_id,
        };

        saveIdempotency(store, {
          route_key: routeKey,
          idempotency_key: headers.idempotencyKey!,
          request_hash: hash,
          response_status: 202,
          response_json: response,
        });

        scheduleLaunchProcessing({
          config,
          store,
          fetchImpl,
          autoLaunch,
        });

        sendJson(res, 202, response);
        return;
      }

      sendJson(
        res,
        404,
        errorBody("NOT_FOUND", "Route not found", requestId, false),
      );
    } catch (err) {
      sendJson(
        res,
        500,
        errorBody(
          "INTERNAL",
          err instanceof Error ? err.message : "Internal error",
          requestId,
          true,
        ),
      );
    }
  }

  function listen(port = Number(process.env.PORT ?? 7101)) {
    const server = createServer((req, res) => {
      void handleRequest(req, res);
    });
    server.listen(port);
    return server;
  }

  return { store, config, handler: handleRequest, listen };
}
