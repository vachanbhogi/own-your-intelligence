import { randomUUID } from "node:crypto";
import {
  type AllocateRequest,
  type ContainerPhase,
  type ContainerRecord,
  LEASE_DURATION_MS,
  type ResourceLimits,
} from "./types.js";

export class RunnerStore {
  private readonly records = new Map<string, ContainerRecord>();

  allocate(req: AllocateRequest, now = Date.now()): ContainerRecord {
    const handle_id = randomUUID();
    const record: ContainerRecord = {
      handle_id,
      tenant_id: req.tenant_id,
      task_id: req.task_id,
      attempt_id: req.attempt_id,
      generation: req.generation,
      limits: req.limits,
      phase: "provisioned",
      fenced: false,
      lease_expires_at: new Date(now + LEASE_DURATION_MS).toISOString(),
      heartbeat_at: null,
      egress_deny_default: true,
      secrets: {
        workspace_token: randomUUID(),
        internal_grant: randomUUID(),
      },
    };
    this.records.set(handle_id, record);
    return record;
  }

  get(handle_id: string): ContainerRecord | undefined {
    const record = this.records.get(handle_id);
    if (!record) {
      return undefined;
    }
    this.refreshFenceState(record);
    return record;
  }

  /** Test hook: force lease expiry without waiting. */
  setLeaseExpiresAt(handle_id: string, iso: string): void {
    const record = this.records.get(handle_id);
    if (!record) {
      throw new Error("NOT_FOUND");
    }
    record.lease_expires_at = iso;
    this.refreshFenceState(record);
  }

  refreshHeartbeat(handle_id: string, now = Date.now()): ContainerRecord {
    const record = this.require(handle_id);
    this.refreshFenceState(record, now);
    if (record.fenced) {
      throw new FenceError();
    }
    if (record.phase === "destroyed") {
      throw new DestroyedError();
    }
    record.heartbeat_at = new Date(now).toISOString();
    record.lease_expires_at = new Date(now + LEASE_DURATION_MS).toISOString();
    return record;
  }

  prepare(
    handle_id: string,
    input_manifest_id: string,
    artifact_refs: string[],
    now = Date.now(),
  ): ContainerRecord {
    const record = this.requireMutable(handle_id, now);
    if (record.phase !== "provisioned" && record.phase !== "prepared") {
      throw new InvalidPhaseError(record.phase, "provisioned");
    }
    record.input_manifest_id = input_manifest_id;
    record.artifact_refs = [...artifact_refs];
    record.phase = "prepared";
    return record;
  }

  execute(handle_id: string, task_type: string, now = Date.now()): ContainerRecord {
    const record = this.requireMutable(handle_id, now);
    if (record.phase !== "prepared") {
      throw new InvalidPhaseError(record.phase, "prepared");
    }
    record.task_type = task_type;
    record.phase = "running";
    if (task_type === "source_discovery") {
      record.result_artifact_id = syntheticResearchArtifactId(record);
    }
    return record;
  }

  stop(handle_id: string, now = Date.now()): ContainerRecord {
    const record = this.requireMutable(handle_id, now);
    if (record.phase === "destroyed") {
      throw new DestroyedError();
    }
    if (record.phase === "running" || record.phase === "prepared") {
      record.phase = "stopped";
      record.stopped_at = new Date(now).toISOString();
    }
    return record;
  }

  destroy(handle_id: string, now = Date.now()): ContainerRecord {
    const record = this.require(handle_id);
    this.refreshFenceState(record, now);
    if (record.phase === "destroyed") {
      return record;
    }
    // Cleanup teardown is allowed even when fenced (handoff 07: reads/cleanup after fence).
    record.phase = "destroyed";
    record.destroyed_at = new Date(now).toISOString();
    return record;
  }

  toInspectView(record: ContainerRecord): Omit<ContainerRecord, "secrets"> {
    const { secrets: _secrets, ...view } = record;
    return view;
  }

  private require(handle_id: string): ContainerRecord {
    const record = this.records.get(handle_id);
    if (!record) {
      throw new NotFoundError();
    }
    return record;
  }

  private requireMutable(handle_id: string, now: number): ContainerRecord {
    const record = this.require(handle_id);
    this.refreshFenceState(record, now);
    if (record.fenced) {
      throw new FenceError();
    }
    if (record.phase === "destroyed") {
      throw new DestroyedError();
    }
    return record;
  }

  private refreshFenceState(record: ContainerRecord, now = Date.now()): void {
    if (record.phase === "destroyed") {
      return;
    }
    const expires = Date.parse(record.lease_expires_at);
    if (Number.isFinite(expires) && now > expires) {
      record.fenced = true;
      if (record.phase === "running") {
        record.phase = "stopped";
        record.stopped_at = new Date(now).toISOString();
      }
    }
  }
}

export class NotFoundError extends Error {
  readonly code = "NOT_FOUND";
}

export class FenceError extends Error {
  readonly code = "FENCED";
}

export class DestroyedError extends Error {
  readonly code = "DESTROYED";
}

export class InvalidPhaseError extends Error {
  readonly code = "INVALID_PHASE";
  constructor(
    readonly actual: ContainerPhase,
    readonly expected: ContainerPhase,
  ) {
    super(`expected phase ${expected}, got ${actual}`);
  }
}

/** Deterministic synthetic artifact for first-slice source_discovery runs. */
function syntheticResearchArtifactId(record: ContainerRecord): string {
  const seed = `${record.tenant_id}:${record.task_id}:${record.attempt_id}:${record.generation}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const hex = hash.toString(16).padStart(8, "0");
  return `99999999-9999-4999-8999-${hex.padStart(12, "0").slice(0, 12)}`;
}

export function validateLimits(limits: ResourceLimits): string | null {
  if (
    !Number.isInteger(limits.max_model_micro_usd) ||
    limits.max_model_micro_usd < 1
  ) {
    return "limits.max_model_micro_usd";
  }
  if (
    !Number.isInteger(limits.max_wall_seconds) ||
    limits.max_wall_seconds < 1
  ) {
    return "limits.max_wall_seconds";
  }
  if (!Number.isInteger(limits.max_tool_calls) || limits.max_tool_calls < 1) {
    return "limits.max_tool_calls";
  }
  return null;
}
