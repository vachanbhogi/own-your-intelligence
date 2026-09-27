import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";
import type { AssignmentRecord, ErrorBody, EventEnvelope } from "./types.js";
import { requestHash } from "./canonical-hash.js";
import {
  admitAssignment,
  cancelAssignment,
  checkIdempotency,
  commitInboxEvent,
  createDomainStore,
  refreshLease,
  saveIdempotency,
  validateQmEventGeneration,
  type DomainStore,
} from "./store.js";
import { validateResearchAssignment } from "./validation.js";
import { postAssignmentToQm, type QmClientOptions } from "./qm-client.js";

const DEFAULT_ACTOR = "ufo-tools";
const QM_CONSUMER = "harmony-control";

export interface ControlAppOptions {
  store?: DomainStore;
  qmClient?: QmClientOptions;
  dispatchToQm?: boolean;
}

export interface ControlApp {
  server: Server;
  store: DomainStore;
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk as Buffer);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  if (!text.trim()) {
    return {};
  }
  return JSON.parse(text) as unknown;
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function errorResponse(
  code: string,
  message: string,
  requestId: string,
  retryable: boolean,
): ErrorBody {
  return { code, message, request_id: requestId, retryable };
}

function assignmentProjection(record: AssignmentRecord): Record<string, unknown> {
  return {
    assignment_id: record.assignment_id,
    tenant_id: record.tenant_id,
    task_id: record.task_id,
    attempt_id: record.attempt_id,
    generation: record.generation,
    state: record.state,
    accepted_at: record.accepted_at,
    input_hash: record.input_hash,
    task_type: record.body.task_type,
    result_contract: record.body.result_contract,
    lease_expires_at: record.lease_expires_at,
  };
}

export function createControlApp(options: ControlAppOptions = {}): ControlApp {
  const store = options.store ?? createDomainStore();
  const dispatchToQm = options.dispatchToQm ?? true;

  const server = createServer(async (req, res) => {
    const requestId =
      (req.headers["x-request-id"] as string | undefined) ?? randomUUID();
    const method = req.method ?? "GET";
    const url = new URL(req.url ?? "/", "http://localhost");

    try {
      if (method === "POST" && url.pathname === "/tools/start_assignment") {
        const idempotencyKey = req.headers["idempotency-key"];
        if (typeof idempotencyKey !== "string" || !idempotencyKey) {
          sendJson(
            res,
            422,
            errorResponse(
              "CONTRACT_INVALID",
              "Idempotency-Key header is required",
              requestId,
              false,
            ),
          );
          return;
        }

        const body = await readJson(req);
        const tenantId =
          typeof body === "object" && body !== null && "tenant_id" in body
            ? String((body as { tenant_id: string }).tenant_id)
            : "";
        const tenant = store.tenants.get(tenantId);
        const validation = validateResearchAssignment(body, tenant);
        if (!validation.ok) {
          const status = validation.code === "TENANT_MISMATCH" ? 403 : 422;
          sendJson(
            res,
            status,
            errorResponse(validation.code, validation.message, requestId, false),
          );
          return;
        }

        const assignmentBody = validation.assignment;
        const routeKey = "POST /tools/start_assignment";
        const hash = requestHash(method, routeKey, assignmentBody);
        const idem = checkIdempotency(store, {
          tenant_id: assignmentBody.tenant_id,
          actor_id: DEFAULT_ACTOR,
          route_key: routeKey,
          idempotency_key: idempotencyKey,
          request_hash: hash,
        });

        if (idem.type === "conflict") {
          sendJson(
            res,
            409,
            errorResponse(
              "IDEMPOTENCY_CONFLICT",
              "Idempotency-Key reused with a different request body",
              requestId,
              false,
            ),
          );
          return;
        }

        if (idem.type === "replay") {
          sendJson(res, idem.record.response_status, idem.record.response_json);
          return;
        }

        const existing = store.assignments.get(assignmentBody.assignment_id);
        if (existing) {
          if (existing.input_hash !== assignmentBody.input_hash) {
            sendJson(
              res,
              409,
              errorResponse(
                "RESULT_CONFLICT",
                "assignment_id already admitted with different input",
                requestId,
                false,
              ),
            );
            return;
          }
          const response = {
            assignment_id: existing.assignment_id,
            state: existing.state,
            accepted_at: existing.accepted_at,
          };
          saveIdempotency(store, {
            tenant_id: assignmentBody.tenant_id,
            actor_id: DEFAULT_ACTOR,
            route_key: routeKey,
            idempotency_key: idempotencyKey,
            request_hash: hash,
            operation_id: randomUUID(),
            response_status: 202,
            response_json: response,
            expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
          });
          sendJson(res, 202, response);
          return;
        }

        const operationId = randomUUID();
        const acceptedAt = new Date().toISOString();
        const record: AssignmentRecord = {
          assignment_id: assignmentBody.assignment_id,
          tenant_id: assignmentBody.tenant_id,
          task_id: assignmentBody.task_id,
          attempt_id: assignmentBody.attempt_id,
          generation: assignmentBody.generation,
          body: assignmentBody,
          state: "accepted",
          accepted_at: acceptedAt,
          input_hash: assignmentBody.input_hash,
          lease_expires_at: null,
          lock_version: 1,
        };
        refreshLease(record);
        admitAssignment(store, record, operationId);

        const response = {
          assignment_id: record.assignment_id,
          state: record.state,
          accepted_at: record.accepted_at,
          operation_id: operationId,
        };

        saveIdempotency(store, {
          tenant_id: assignmentBody.tenant_id,
          actor_id: DEFAULT_ACTOR,
          route_key: routeKey,
          idempotency_key: idempotencyKey,
          request_hash: hash,
          operation_id: operationId,
          response_status: 202,
          response_json: response,
          expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
        });

        sendJson(res, 202, response);

        if (dispatchToQm) {
          void postAssignmentToQm(
            assignmentBody,
            { idempotencyKey, requestId },
            options.qmClient,
          ).catch(() => {
            /* reconciliation handles undelivered dispatch */
          });
        }
        return;
      }

      if (method === "GET" && url.pathname.startsWith("/tools/assignments/")) {
        const id = url.pathname.slice("/tools/assignments/".length);
        const record = store.assignments.get(id);
        if (!record) {
          sendJson(
            res,
            404,
            errorResponse("NOT_FOUND", "Assignment not found", requestId, false),
          );
          return;
        }
        sendJson(res, 200, assignmentProjection(record));
        return;
      }

      if (method === "POST" && url.pathname.match(/^\/tools\/assignments\/[^/]+\/cancel$/)) {
        const id = url.pathname.split("/")[3] ?? "";
        const idempotencyKey = req.headers["idempotency-key"];
        if (typeof idempotencyKey !== "string" || !idempotencyKey) {
          sendJson(
            res,
            422,
            errorResponse(
              "CONTRACT_INVALID",
              "Idempotency-Key header is required",
              requestId,
              false,
            ),
          );
          return;
        }

        const record = store.assignments.get(id);
        if (!record) {
          sendJson(
            res,
            404,
            errorResponse("NOT_FOUND", "Assignment not found", requestId, false),
          );
          return;
        }

        const routeKey = `POST /tools/assignments/${id}/cancel`;
        const hash = requestHash(method, routeKey, {});
        const idem = checkIdempotency(store, {
          tenant_id: record.tenant_id,
          actor_id: DEFAULT_ACTOR,
          route_key: routeKey,
          idempotency_key: idempotencyKey,
          request_hash: hash,
        });

        if (idem.type === "conflict") {
          sendJson(
            res,
            409,
            errorResponse(
              "IDEMPOTENCY_CONFLICT",
              "Idempotency-Key reused with a different request body",
              requestId,
              false,
            ),
          );
          return;
        }

        if (idem.type === "replay") {
          sendJson(res, idem.record.response_status, idem.record.response_json);
          return;
        }

        const cancelled = cancelAssignment(store, id)!;
        const response = {
          assignment_id: cancelled.assignment_id,
          state: cancelled.state,
        };

        saveIdempotency(store, {
          tenant_id: record.tenant_id,
          actor_id: DEFAULT_ACTOR,
          route_key: routeKey,
          idempotency_key: idempotencyKey,
          request_hash: hash,
          operation_id: randomUUID(),
          response_status: 202,
          response_json: response,
          expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
        });

        sendJson(res, 202, response);
        return;
      }

      if (method === "POST" && url.pathname === "/internal/harmony/v1/events/qm") {
        const body = (await readJson(req)) as EventEnvelope;
        if (
          !body ||
          typeof body !== "object" ||
          body.schema_version !== "1.0" ||
          !body.event_id ||
          !body.tenant_id
        ) {
          sendJson(
            res,
            422,
            errorResponse("CONTRACT_INVALID", "Invalid event envelope", requestId, false),
          );
          return;
        }

        const inboxResult = commitInboxEvent(store, QM_CONSUMER, body.event_id, body);
        if (!inboxResult.ok) {
          sendJson(
            res,
            409,
            errorResponse(inboxResult.code, inboxResult.message, requestId, false),
          );
          return;
        }

        const generation =
          typeof body.payload?.generation === "number" ? body.payload.generation : undefined;
        const genCheck = validateQmEventGeneration(
          store,
          body.tenant_id,
          body.aggregate_id,
          generation,
        );
        if (!genCheck.ok) {
          const status = genCheck.code === "TENANT_MISMATCH" ? 403 : 409;
          sendJson(
            res,
            status,
            errorResponse(genCheck.code, genCheck.message, requestId, false),
          );
          return;
        }

        sendJson(res, 202, { event_id: body.event_id, ingested: true });
        return;
      }

      sendJson(res, 404, errorResponse("NOT_FOUND", "Route not found", requestId, false));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Internal error";
      sendJson(
        res,
        500,
        errorResponse("INTERNAL", message, requestId, true),
      );
    }
  });

  return { server, store };
}
