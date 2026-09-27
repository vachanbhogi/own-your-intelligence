import { randomUUID } from "node:crypto";
import type {
  AssignmentBody,
  AssignmentRecord,
  EventEnvelope,
  IdempotencyRecord,
  LaunchOutboxRow,
  OutboxRow,
  QmCellStore,
  TaskFence,
} from "./types.js";

export interface AdmitResult {
  assignment: AssignmentRecord;
  acceptedEvent: OutboxRow;
  launchRow: LaunchOutboxRow;
  replay: boolean;
}

export function createQmCellStore(): QmCellStore {
  return {
    assignments: new Map(),
    tasks: new Map(),
    outbox: [],
    launchOutbox: [],
    idempotency: new Map(),
    aggregateVersions: new Map(),
  };
}

function taskKey(tenantId: string, taskId: string): string {
  return `${tenantId}:${taskId}`;
}

function idempotencyKey(routeKey: string, idempotencyKey: string): string {
  return `${routeKey}:${idempotencyKey}`;
}

function nextAggregateVersion(store: QmCellStore, aggregateType: string, aggregateId: string): number {
  const key = `${aggregateType}:${aggregateId}`;
  const current = store.aggregateVersions.get(key) ?? 1;
  const next = current + 1;
  store.aggregateVersions.set(key, next);
  return next;
}

export function checkIdempotency(
  store: QmCellStore,
  routeKey: string,
  key: string,
  requestHash: string,
):
  | { type: "new" }
  | { type: "replay"; record: IdempotencyRecord }
  | { type: "conflict" } {
  const existing = store.idempotency.get(idempotencyKey(routeKey, key));
  if (!existing) {
    return { type: "new" };
  }
  if (existing.request_hash === requestHash) {
    return { type: "replay", record: existing };
  }
  return { type: "conflict" };
}

export function saveIdempotency(store: QmCellStore, record: IdempotencyRecord): void {
  store.idempotency.set(
    idempotencyKey(record.route_key, record.idempotency_key),
    record,
  );
}

function buildAcceptedEnvelope(
  assignment: AssignmentRecord,
  aggregateVersion: number,
  correlationId: string,
  causationId: string,
): EventEnvelope {
  return {
    schema_version: "1.0",
    event_id: randomUUID(),
    event_type: "task.accepted",
    tenant_id: assignment.tenant_id,
    aggregate_type: "task",
    aggregate_id: assignment.task_id,
    aggregate_version: aggregateVersion,
    occurred_at: assignment.accepted_at,
    correlation_id: correlationId,
    causation_id: causationId,
    payload: {
      assignment_id: assignment.assignment_id,
      attempt_id: assignment.attempt_id,
      generation: assignment.generation,
      input_hash: assignment.input_hash,
    },
  };
}

export function admitAssignmentDurable(
  store: QmCellStore,
  body: AssignmentBody,
  correlationId: string,
): AdmitResult {
  const existing = store.assignments.get(body.assignment_id);
  if (existing) {
    if (JSON.stringify(existing.body) !== JSON.stringify(body)) {
      throw new Error("IDEMPOTENCY_CONFLICT");
    }
    const launch = store.launchOutbox.find((l) => l.assignment_id === body.assignment_id);
    const event = store.outbox.find(
      (o) => o.envelope.payload.assignment_id === body.assignment_id,
    );
    if (!launch || !event) {
      throw new Error("INVARIANT_BROKEN");
    }
    return {
      assignment: existing,
      acceptedEvent: event,
      launchRow: launch,
      replay: true,
    };
  }

  const tk = taskKey(body.tenant_id, body.task_id);
  const fence = store.tasks.get(tk);
  if (fence && body.generation < fence.attempt_generation) {
    throw new Error("STALE_ATTEMPT");
  }
  if (fence && body.generation > fence.attempt_generation) {
    // new attempt supersedes
  } else if (fence && body.generation === fence.attempt_generation && fence.current_assignment_id !== body.assignment_id) {
    throw new Error("STALE_ATTEMPT");
  }

  const acceptedAt = new Date().toISOString();
  const assignment: AssignmentRecord = {
    assignment_id: body.assignment_id,
    tenant_id: body.tenant_id,
    task_id: body.task_id,
    attempt_id: body.attempt_id,
    generation: body.generation,
    body,
    state: "accepted",
    accepted_at: acceptedAt,
    input_hash: body.input_hash,
    provider_run_id: null,
    lock_version: 1,
  };

  const taskFence: TaskFence = {
    tenant_id: body.tenant_id,
    task_id: body.task_id,
    attempt_generation: body.generation,
    current_assignment_id: body.assignment_id,
    current_attempt_id: body.attempt_id,
  };
  store.tasks.set(tk, taskFence);
  store.assignments.set(body.assignment_id, assignment);

  const aggregateVersion = nextAggregateVersion(store, "task", body.task_id);
  const envelope = buildAcceptedEnvelope(
    assignment,
    aggregateVersion,
    correlationId,
    body.assignment_id,
  );
  const acceptedEvent: OutboxRow = {
    event_id: envelope.event_id,
    envelope,
    delivered_at: null,
    attempts: 0,
  };
  store.outbox.push(acceptedEvent);

  const launchRow: LaunchOutboxRow = {
    launch_id: randomUUID(),
    assignment_id: body.assignment_id,
    tenant_id: body.tenant_id,
    task_id: body.task_id,
    attempt_id: body.attempt_id,
    generation: body.generation,
    task_type: body.task_type,
    enqueued_at: acceptedAt,
    started_at: null,
  };
  store.launchOutbox.push(launchRow);

  return { assignment, acceptedEvent, launchRow, replay: false };
}

export function markAssignmentRunning(
  store: QmCellStore,
  assignmentId: string,
  providerRunId: string,
): void {
  const assignment = store.assignments.get(assignmentId);
  if (!assignment) {
    return;
  }
  assignment.state = "running";
  assignment.provider_run_id = providerRunId;
  assignment.lock_version += 1;
}

export function appendOutboxEvent(store: QmCellStore, envelope: EventEnvelope): OutboxRow {
  const row: OutboxRow = {
    event_id: envelope.event_id,
    envelope,
    delivered_at: null,
    attempts: 0,
  };
  store.outbox.push(row);
  return row;
}

export function cancelAssignmentDurable(
  store: QmCellStore,
  assignmentId: string,
  correlationId: string,
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

  const aggregateVersion = nextAggregateVersion(store, "task", assignment.task_id);
  appendOutboxEvent(store, {
    schema_version: "1.0",
    event_id: randomUUID(),
    event_type: "task.cancelled",
    tenant_id: assignment.tenant_id,
    aggregate_type: "task",
    aggregate_id: assignment.task_id,
    aggregate_version: aggregateVersion,
    occurred_at: new Date().toISOString(),
    correlation_id: correlationId,
    causation_id: assignment.assignment_id,
    payload: {
      assignment_id: assignment.assignment_id,
      attempt_id: assignment.attempt_id,
      generation: assignment.generation,
    },
  });

  return assignment;
}
