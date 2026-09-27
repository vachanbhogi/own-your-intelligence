import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import type {
  AssignmentRecord,
  IdempotencyRecord,
  InboxRow,
  OutboxRow,
  TaskRecord,
  Tenant,
} from "./types.js";
import { payloadHash } from "./canonical-hash.js";

const LEASE_SECONDS = 60;

export interface DomainStore {
  tenants: Map<string, Tenant>;
  tasks: Map<string, TaskRecord>;
  assignments: Map<string, AssignmentRecord>;
  outbox: OutboxRow[];
  inbox: Map<string, InboxRow>;
  idempotency: Map<string, IdempotencyRecord>;
}

function idempotencyMapKey(
  tenantId: string,
  actorId: string,
  routeKey: string,
  idempotencyKey: string,
): string {
  return `${tenantId}:${actorId}:${routeKey}:${idempotencyKey}`;
}

export function loadSeedTenants(): Tenant[] {
  const here = dirname(fileURLToPath(import.meta.url));
  const fixturePath = join(here, "../../../../contracts/v1/fixtures/tenants.seed.json");
  const raw = JSON.parse(readFileSync(fixturePath, "utf8")) as {
    tenants: Array<Tenant & { status: string }>;
  };
  return raw.tenants.map((t) => ({
    ...t,
    status: t.status === "ready" ? "ready" : "provisioning",
  }));
}

export function createDomainStore(seedTenants?: Tenant[]): DomainStore {
  const tenants = new Map<string, Tenant>();
  for (const t of seedTenants ?? loadSeedTenants()) {
    tenants.set(t.tenant_id, t);
  }
  return {
    tenants,
    tasks: new Map(),
    assignments: new Map(),
    outbox: [],
    inbox: new Map(),
    idempotency: new Map(),
  };
}

export function taskKey(tenantId: string, taskId: string): string {
  return `${tenantId}:${taskId}`;
}

export function checkIdempotency(
  store: DomainStore,
  params: {
    tenant_id: string;
    actor_id: string;
    route_key: string;
    idempotency_key: string;
    request_hash: string;
  },
):
  | { type: "new" }
  | { type: "replay"; record: IdempotencyRecord }
  | { type: "conflict" } {
  const key = idempotencyMapKey(
    params.tenant_id,
    params.actor_id,
    params.route_key,
    params.idempotency_key,
  );
  const existing = store.idempotency.get(key);
  if (!existing) {
    return { type: "new" };
  }
  if (existing.request_hash === params.request_hash) {
    return { type: "replay", record: existing };
  }
  return { type: "conflict" };
}

export function saveIdempotency(
  store: DomainStore,
  record: IdempotencyRecord,
): void {
  const key = idempotencyMapKey(
    record.tenant_id,
    record.actor_id,
    record.route_key,
    record.idempotency_key,
  );
  store.idempotency.set(key, record);
}

export function admitAssignment(
  store: DomainStore,
  assignment: AssignmentRecord,
  operationId: string,
): { outboxEventId: string } {
  const tk = taskKey(assignment.tenant_id, assignment.task_id);
  let task = store.tasks.get(tk);
  if (!task) {
    task = {
      tenant_id: assignment.tenant_id,
      task_id: assignment.task_id,
      task_type: assignment.body.task_type,
      status: "admitting",
      attempt_generation: assignment.generation,
      current_attempt_id: assignment.attempt_id,
      current_assignment_id: assignment.assignment_id,
      input_hash: assignment.input_hash,
      lock_version: 1,
    };
    store.tasks.set(tk, task);
  } else {
    if (task.attempt_generation !== assignment.generation) {
      throw new Error("STALE_ATTEMPT");
    }
    task.current_attempt_id = assignment.attempt_id;
    task.current_assignment_id = assignment.assignment_id;
    task.status = "admitting";
    task.lock_version += 1;
  }

  store.assignments.set(assignment.assignment_id, assignment);

  const eventId = randomUUID();
  const occurredAt = new Date().toISOString();
  const outboxRow: OutboxRow = {
    event_id: eventId,
    aggregate_type: "task",
    aggregate_id: assignment.task_id,
    aggregate_version: task.lock_version,
    event_type: "task.accepted",
    schema_version: "1.0",
    payload: {
      assignment_id: assignment.assignment_id,
      attempt_id: assignment.attempt_id,
      generation: assignment.generation,
      input_hash: assignment.input_hash,
      operation_id: operationId,
    },
    occurred_at: occurredAt,
    delivered_at: null,
    attempts: 0,
  };
  store.outbox.push(outboxRow);
  return { outboxEventId: eventId };
}

export function refreshLease(assignment: AssignmentRecord): void {
  const expires = new Date(Date.now() + LEASE_SECONDS * 1000).toISOString();
  assignment.lease_expires_at = expires;
}

export function commitInboxEvent(
  store: DomainStore,
  consumerId: string,
  eventId: string,
  payload: unknown,
): { ok: true } | { ok: false; code: string; message: string } {
  const inboxKey = `${consumerId}:${eventId}`;
  const hash = payloadHash(payload);
  const existing = store.inbox.get(inboxKey);
  if (existing) {
    if (existing.payload_hash !== hash) {
      return {
        ok: false,
        code: "RESULT_CONFLICT",
        message: "Duplicate event_id with different payload",
      };
    }
    return { ok: true };
  }
  store.inbox.set(inboxKey, {
    consumer_id: consumerId,
    event_id: eventId,
    payload_hash: hash,
    processed_at: new Date().toISOString(),
    outcome: "accepted",
  });
  return { ok: true };
}

export function validateQmEventGeneration(
  store: DomainStore,
  tenantId: string,
  aggregateId: string,
  generation: number | undefined,
): { ok: true; task: TaskRecord } | { ok: false; code: string; message: string } {
  const tenant = store.tenants.get(tenantId);
  if (!tenant) {
    return { ok: false, code: "TENANT_MISMATCH", message: "Unknown tenant" };
  }
  const tk = taskKey(tenantId, aggregateId);
  const task = store.tasks.get(tk);
  if (!task) {
    return { ok: false, code: "CONTRACT_INVALID", message: "Task not found for event aggregate" };
  }
  if (task.tenant_id !== tenantId) {
    return { ok: false, code: "TENANT_MISMATCH", message: "Event tenant does not match task" };
  }
  if (generation !== undefined && generation !== task.attempt_generation) {
    return {
      ok: false,
      code: "STALE_ATTEMPT",
      message: `Event generation ${generation} does not match current ${task.attempt_generation}`,
    };
  }
  return { ok: true, task };
}

export function cancelAssignment(
  store: DomainStore,
  assignmentId: string,
): AssignmentRecord | null {
  const assignment = store.assignments.get(assignmentId);
  if (!assignment) {
    return null;
  }
  if (assignment.state === "cancelled") {
    return assignment;
  }
  assignment.state = "cancelled";
  assignment.lock_version += 1;

  const tk = taskKey(assignment.tenant_id, assignment.task_id);
  const task = store.tasks.get(tk);
  if (task && task.current_assignment_id === assignmentId) {
    task.status = "cancelled";
    task.lock_version += 1;
  }

  const eventId = randomUUID();
  store.outbox.push({
    event_id: eventId,
    aggregate_type: "task",
    aggregate_id: assignment.task_id,
    aggregate_version: task?.lock_version ?? assignment.lock_version,
    event_type: "task.cancelled",
    schema_version: "1.0",
    payload: {
      assignment_id: assignmentId,
      attempt_id: assignment.attempt_id,
      generation: assignment.generation,
    },
    occurred_at: new Date().toISOString(),
    delivered_at: null,
    attempts: 0,
  });

  return assignment;
}
