# QM source seam map (Harmony W00)

**Repository:** `/workspace/harmony-workspace/qm`  
**Branch:** `harmony/main`  
**Upstream SHA:** `a5a36675041a85e30b9ff3632f678ba36837aabf` (`a5a3667` — Keep the model picker in sync with runtime default changes #1669)  
**Audit date:** 2026-09-27  

Handoff references: `04-upstream-forks-and-integration.md`, `06-api-and-event-contracts.md`, `08-agent-roles-and-execution.md`, `15-implementation-backlog-and-runbook.md`.

---

## 1. Language and toolchain

| Item | Value |
| --- | --- |
| Language | TypeScript (ES modules), Node runtime |
| Package manager | npm (lockfile present) |
| Declared engines | Node `>=24.15.0`, npm `>=11.10.0` (`package.json`) |
| HTTP stack | Fastify 5 (`src/api/server.ts`), raw `node:http` for some routes |
| Persistence | Postgres optional (`DATABASE_URL`, `SESSION_STORE=postgres`, `RUN_STORE=postgres`); in-memory fallbacks |
| Test runner | Node built-in test runner with `--experimental-test-module-mocks`; tests are `.ts` executed natively on Node 24+ |

### Build and verification commands (from manifests)

| Command | Purpose |
| --- | --- |
| `npm ci` | Install dependencies (root) |
| `npm run build:connector-sdk` | Pre-step for start/dev/test (`deploy/connector-sdk`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run typecheck:contract` | Contract TS project |
| `npm test` | `node --experimental-test-module-mocks --test test/*.test.ts` |
| `npm run test:all` | All tests under `test/**` |
| `npm run test:pg` | Postgres-focused integration subset |
| `npm run worker` | Run queue worker process (`src/runs/worker-main.ts`) |
| `npm start` / `npm run dev` | Core API + in-process surfaces |

Plugin workloads (separate packages): `plugins/web-ui`, `plugins/portal`, `plugins/admin`, `plugins/auth` — each has own `npm ci` / `typecheck` / `test` per `docs/combined-services.md`.

### Baseline test results (this audit environment)

| Check | Node version | Result |
| --- | --- | --- |
| `npm run typecheck` | 22.14.0 (VM default) | **Pass** |
| `npm test` | 22.14.0 | **Fail** — 668/668 files: `ERR_UNKNOWN_FILE_EXTENSION` for `.ts` (requires Node 24 native TS) |
| `npm test` (equivalent) | 24.15.0 (`~/.nvm/versions/node/v24.15.0/bin/node`) | **7542 pass, 2 fail** (~15 min); failures: `test/skill-packs-routes.test.ts` (network `fetch failed` / `ECONNRESET` against external git fetch) |
| Targeted | 24.15.0 | `test/util-crypto.test.ts` + `test/swarms.test.ts`: **42/42 pass** |

**Note:** Production/tooling baseline should pin Node 24.15+ per `package.json` engines; CI likely uses Node 24.

---

## 2. Architecture snapshot

QM **core** is a headless TypeScript service (`src/index.ts`) that:

1. Loads config (`src/config.ts`), builds the app graph (`src/wiring.ts` → `buildApp`).
2. Exposes HTTP API (`src/api/server.ts`, routes in `src/api/routes/`).
3. Runs durable **runs** via workers (`src/runs/worker.ts`, `worker-main.ts`) calling `orchestrator.handleTurn`.
4. Optionally supervises an in-process **Slack plugin** (`src/slack/index.ts` → `startSlackPlugin`).
5. **Web UI / portal / admin / auth** are separate deployable plugins under `plugins/*` that call core over HTTP with signed portal identity / source auth.

**Swarms** (multi-agent coordination) are a first-class subsystem documented in `docs/swarms.md`, implemented under `src/swarms/`, exposed at `/v1/swarm` and `/v1/sessions/:id/swarm`.

There is **no** existing `/internal/harmony/v1/*` surface in this SHA.

---

## 3. Session, swarm, and organization admission / launch

### 3.1 Run queue admission (all turns, including swarm notifications)

| File | Symbol | Role |
| --- | --- | --- |
| `src/wiring.ts` | `runs.enqueue` wrapper (~1463–1487) | Serializes admission under advisory lock `"session-run-admission"`; enforces subagent tree run cap before enqueue |
| `src/runs/run-store.ts` | `RunStore.enqueue`, `claim`, `heartbeat`, `complete`, `fail` | Durable run lifecycle contract |
| `src/runs/postgres-run-store.ts` | `enqueue`, `claim*`, `reapExpired` | Postgres implementation; **lease fencing** on reap (new `lease_token`, `FENCE_HOLD_MS`) |
| `src/runs/memory-run-store.ts` | same | In-memory parity for tests |
| `src/runs/worker.ts` | `processRun`, `createWorker` | Worker claims run, heartbeats lease, invokes orchestrator; cancels turn after consecutive heartbeat loss |
| `src/runs/worker-main.ts` | top-level | Separate worker process entry |
| `src/util/admitted-work.ts` | `createAdmittedWork` | Deployment-level gate for synchronous work (pause/drain); used by `app.turn`, loop ingress, cron, monitors |
| `src/api/app.ts` | `createApp` → `methods.turn` | Wraps turn in `admittedWork.run` unless async |

### 3.2 Human / portal turn ingress

| File | Symbol | Role |
| --- | --- | --- |
| `src/api/routes/turns.ts` | turn routes | `POST /v1/turns`, session-scoped turn APIs; validates `TurnRequest` |
| `src/api/app-turn.ts` | turn methods | Business logic for accepting turns, idempotency, enqueue |
| `src/core/orchestrator.ts` | `handleTurn` (~537) | Single turn execution: harness, tools, sandbox, memory, swarm binding |

### 3.3 Subagent sessions (non-swarm tree; “open” delegation)

| File | Symbol | Role |
| --- | --- | --- |
| `src/sessions/session-syscalls.ts` | `createSessionSyscalls` → `open` (~530–636) | Lock `"session-tree-admission"`; creates child session via `getOrCreateByThread`, `setSpawnMeta`, `runs.enqueue` with dedup `subagent-open:*` |
| `src/sessions/session-store.ts` | `getOrCreateByThread`, participants, spawn meta | Session durability API |
| `src/sessions/postgres-session-store.ts` | `getOrCreateByThread` | Postgres session creation |

Swarm workers **cannot** use session `open`; they must use swarm API (`session-syscalls.ts` guard ~533–534).

### 3.4 Swarm admission, launch, and outbox

| File | Symbol | Role |
| --- | --- | --- |
| `docs/swarms.md` | — | Product contract: blank worker computers, outbox provisioning, lease-bound agent API |
| `src/api/routes/swarms.ts` | `swarmRequest`, `swarmRoutes` | HTTP: `GET/POST /v1/swarm`, `GET/POST /v1/sessions/:id/swarm` |
| `src/swarms/swarm-service.ts` | `createSwarmService` | **Core orchestration:** `authority`, `prepareInitialSwarm`, `spawn`, `send`, `reconcile`, `deliver`, `sweep` |
| `src/swarms/swarm-service.ts` | `prepareInitialSwarm` (~246–320) | Validates run belongs to session; picks sandbox backend; builds swarm template from parent run |
| `src/swarms/swarm-service.ts` | `spawn` (~551–642) | Reserves members (`state: "reserved"`), idempotent `requestId`, persists swarm |
| `src/swarms/swarm-service.ts` | `reconcile` (~368–477) | **Outbox worker:** provisions sandbox (`sandboxes.create`), creates session (`getOrCreateByThread`), marks `ready` |
| `src/swarms/swarm-service.ts` | `deliver` (~333–366) | Enqueues worker turns via `runs.enqueue` with dedup `swarm:{messageId}:{recipientId}` |
| `src/swarms/swarm-store.ts` | `createSwarmStore`, `SWARM_LIMITS` | Durable map / Postgres storage; `pending()` for sweeper |
| `src/swarms/swarm-fence.ts` | `assertSwarmRun`, `SwarmRunFence` | Agent swarm mutations require active run lease matching capability |
| `src/wiring.ts` | `createSwarmService` wiring (~1490–1511) | Enables swarms when session store and run store kinds match; internal-only swarm authorize hook |

**Launch sequence (worker member):** `spawn` → durable `reserved` member → sweeper `reconcile(resources)` → `SandboxResources.create(..., reservationId=member.id)` → `sessions.getOrCreateByThread(swarm threadRef)` → `state: ready` → `deliver` → `runs.enqueue` → worker `processRun` → `orchestrator.handleTurn`.

### 3.5 Organization / scope admission (QM org model, not Harmony tenant)

QM “organization” is a deployment-scoped `orgId` and scope graph (`org:*`, `personal:*`, channels, etc.), not Harmony multi-tenant provisioning.

| File | Symbol | Role |
| --- | --- | --- |
| `src/resolution/scope-membership.ts` | `canReadScope`, `canManageScope`, `canUseSandboxScope` | Scope authorization wired in `wiring.ts` (~1670+) |
| `src/wiring.ts` | swarm `authorize` callback | Requires internal principals + `app.authorizesCapabilityScope` |
| `src/auth/capability-token.ts` | `CapabilityClaims`, `verifyCapabilityToken` | Per-turn and tool capabilities (incl. `runLeaseToken`, `runAttempt`) |
| `src/auth/portal-identity.ts` | `verifyPortalIdentity` | Human admin / web UI identity to core |
| `src/auth/source-auth.ts` | source-signed requests | Portal → core request signing |

There is **no** org-provisioning API comparable to Harmony `POST /tenants`; deployment init is CLI/deployment repo (`README.md`, `deployment.md`).

### 3.6 Background / automation admission

| File | Symbol | Role |
| --- | --- | --- |
| `src/loops/loop-fire.ts` | `createLoopFireService`, `fire` | Project/loop automation turns via `runTrigger` |
| `src/triggers/run-trigger.ts` | `runTrigger` | Enqueues runs for crons, webhooks, etc. |
| `src/cron/scheduler.ts` | scheduler | Cron firing with `admittedWork` |
| `src/runs/background-controller.ts` | `admit` | Multi-instance background work ownership (`background-ownership.ts`) |

---

## 4. Sandbox, provider, and runner interfaces

### 4.1 Sandbox interface (where commands execute)

| File | Symbol | Role |
| --- | --- | --- |
| `src/sandbox/sandbox.ts` | `Sandbox` interface (~187–221) | **Canonical provider contract:** `provision`, `run`, file IO, optional `stageIn`/`stageOut`/`importFiles`, process sessions, `teardown` |
| `src/sandbox/sandbox.ts` | `AgentComputerProfile`, `supportsBlobStaging`, `supportsProcessSessions` | Capability flags per backend |
| `src/sandbox/sandbox-routing.ts` | `createSandboxRouter`, `SandboxBackendName` | Routes scope → backend; refuses silent fallback |
| `src/sandbox/sandbox-resources.ts` | `createSandboxResources`, `SandboxResources` | Inventory CRUD: `create`, `access`, `retire`, `resolve`, per-turn `forTurn` |
| `src/core/orchestrator/sandboxes.ts` | `createTurnSandboxes` | Turn-scoped sandbox selection (incl. swarm worker sandbox id) |
| `src/harness/agent-tools.ts` | execute tool | Agent-facing command/file execution against selected sandbox |

### 4.2 Backend implementations (worker computers)

Constructed in `src/wiring.ts` `buildBackend` (~844–1076):

| Backend key | Factory module |
| --- | --- |
| `local` | `src/sandbox/local-sandbox.ts` |
| `sprites` | `src/sandbox/sprites-sandbox.ts` |
| `smolmachines` | `src/sandbox/smolmachines-sandbox.ts` |
| `e2b` | `src/sandbox/e2b-sandbox.ts` |
| `modal` | `src/sandbox/modal-sandbox.ts` |
| `aws` | `src/sandbox/aws-sandbox.ts` |
| `porter` | `src/sandbox/porter-sandbox.ts` |
| `agent37` | `src/sandbox/agent37-sandbox.ts` |
| `superserve` | `src/sandbox/superserve-sandbox.ts` |

Config/env selection: `src/config.ts` (`SANDBOX_BACKEND`, `SANDBOX_RESOURCES_ENABLED`, per-backend env blocks).

### 4.3 Runner / worker process (QM native, not Harmony supervisor)

Harmony spec §6 describes allocate/prepare/execute/stop/destroy with tenant/task/attempt/generation. QM instead uses:

| Layer | Mechanism |
| --- | --- |
| Process isolation | External sandbox providers (containers/VMs) via `Sandbox.provision` |
| Work scheduling | `RunStore.claim` + worker pool in core/worker process |
| Liveness | Run `leaseToken` + `leaseExpiresAt`; heartbeat in `processRun` |
| Fencing | `reapExpired` rotates lease token; swarm/agent APIs check fence via `assertSwarmRun` |
| Cancellation | Run withdraw/fail paths; abort signal in worker |

There is **no** separate Harmony-style runner supervisor API in-tree.

---

## 5. API and routing surfaces (Harmony extension points)

### 5.1 Route registration

| File | Symbol | Notes |
| --- | --- | --- |
| `src/api/routes/index.ts` | `rawRoutes`, `apiRoutes` | **Central route tables** — add new routes here |
| `src/api/routes/route.ts` | `Route`, `RouteAuth`, `run` | Auth modes: `public`, `source`, `either`, `{ aud: string }` |
| `src/api/server.ts` | `createServer`, `gate` | Fastify registration; capability header, portal identity, source auth |
| `plugins/chassis/src/router.ts` | `compilePath`, `findRoute` | Path matching helper shared with plugins |

### 5.2 Existing auth patterns relevant to Harmony

| Mechanism | Files | Harmony mapping |
| --- | --- | --- |
| Service-ish capability JWT | `src/auth/capability-token.ts`, header `x-agent-capability` (`src/api/contract.ts`) | Different claims model than Harmony mTLS+JWT; extensible via new `aud` |
| Portal human identity | `src/auth/portal-identity.ts`, routes with `auth: "source"` | Not for UFO server delegation |
| Public health | `/healthz`, `/readyz` in `routes/index.ts` | Unauthenticated |

### 5.3 Recommended Harmony hook locations (proposed — not present today)

1. **New module** `src/harmony/` (or `src/internal/harmony/`): assignment admission, idempotency store, launch outbox, result outbox, cancel/reconcile.
2. **Register routes** in `src/api/routes/index.ts` under `rawRoutes` or dedicated `harmonyRoutes` with `auth: { aud: "harmony-delegation" }` (new audience constant alongside `CONTROL_PLANE_AUD`).
3. **Reuse launch pipeline** by calling into:
   - `sessions.getOrCreateByThread` + `runs.enqueue` for manager/worker sessions, **or**
   - `swarm-service` patterns if Harmony maps assignments to swarm-shaped workers (would still need repo prepare — see gaps).
4. **Worker execution** via existing `SandboxResources` + `orchestrator.handleTurn`, or new thin wrapper that sets `OrchestratorInput` from assignment manifest.
5. **Callbacks** — no generic outbound event outbox; swarm uses in-process sweeper only. Harmony needs new durable outbox + HTTP client to UFO `/internal/harmony/v1/events/qm`.

### 5.4 Related agent/session APIs (for context)

| Path | File |
| --- | --- |
| `/v1/swarm` | `src/api/routes/swarms.ts` |
| `/v1/turns`, session turns | `src/api/routes/turns.ts` |
| `/v1/loop-ingress/*` | `src/api/routes/loop-ingress.ts` |
| `/v1/admin/*` | `src/api/routes/admin.ts` (large admin surface) |
| Agent API catalog | `src/api/agent-api-catalog.ts` |

---

## 6. Plugins system

| Component | Location | Integration |
| --- | --- | --- |
| In-process Slack | `src/slack/index.ts` `startSlackPlugin` | Started from `src/index.ts` via `createSlackRuntimeReconciler` (`src/surfaces/slack-runtime.ts`); uses `SlackCoreClient` HTTP to core |
| Web UI + embedded admin | `plugins/web-ui/` | Vite/Lit; proxies to core; see `plugins/web-ui/README.md` |
| Portal + auth broker | `plugins/portal/`, `plugins/auth/` | Public entry, OIDC/broker loopback |
| Admin module | `plugins/admin/` | Thin UI over `/v1/admin/*` |
| Shared chassis | `plugins/chassis/` | Router, timing, error reporting imported by core (`src/api/server.ts`, routes) |
| Plugin skills | `src/config.ts` `defaultPluginSkillDirs()` | Auto-discovers `plugins/*/skills` |

Plugins are **not** a dynamic loadable extension SDK inside core; Slack is compiled-in, other surfaces are separate Node services/images.

---

## 7. Memory provider hooks (GBrain integration)

| File | Symbol | Role |
| --- | --- | --- |
| `docs/memory-providers.md` | — | Operator doc: `MEMORY_PROVIDER_CONFIG` JSON routes |
| `src/config.ts` | `parseMemoryProviderConfig` | Loads config at startup |
| `src/memory/provider-config.ts` | `parseMemoryProviderConfig` | Validates providers (`mcp`, `memorable`) and routes |
| `src/memory/provider-factory.ts` | `createConfiguredMemoryService` | Wires default notebook + external providers |
| `src/memory/provider-router.ts` | `createRoutedMemoryService` | Scope-aware recall/capture/query; **`failOpen` default true** |
| `src/memory/mcp-memory-provider.ts` | `createMcpMemoryProvider` | MCP tool calls for read/write (GBrain gateway maps here) |
| `src/memory/memorable/provider.ts` | `createMemorableMemoryProvider` | Procedural memory via CLI |
| `src/wiring.ts` | `baseMemory` (~822–834) | Injects `createConfiguredMemoryService` into app |

Orchestrator/memory tool path uses `MemoryService` from wiring; harness tools expose remember/recall/search per policy.

**GBrain mapping (Harmony):** configure an `mcp` provider pointing at Harmony GBrain gateway URL with separate RO/RW OAuth clients; use route `failOpen: false` for required company context; scope routes to `org` or feature-specific scope IDs as Harmony provisions QM scopes.

---

## 8. Gaps vs Harmony requirements

| Harmony need (handoff 04/06/08/15) | QM baseline at this SHA |
| --- | --- |
| `POST /internal/harmony/v1/assignments` (+ GET/cancel/capabilities) | **Missing** — no `/internal/harmony` routes |
| Service auth (mTLS + audience JWT, task/generation claims) | **Partial** — capability tokens + source auth; not Harmony contract |
| Assignment idempotency / stale generation / budget reservation | **Partial** — run dedup keys and swarm `requestId` patterns exist; no assignment aggregate |
| Launch outbox durable before 202 | **Partial analog** — swarm `pending` + sweeper; not unified outbox for Harmony |
| Result/progress outbox → UFO callbacks | **Missing** — terminal run results stay in QM; Slack delivery explicitly refused for swarm |
| Runner supervisor (allocate/prepare/execute/stop/destroy) | **Missing** — sandbox `provision` + run worker only |
| Lease 60s / heartbeat 15s / fence on mutation | **Different** — run lease TTL config-driven; swarm fences agent writes; not task-generation scoped |
| Blank-child **prepare** (repo snapshot, immutable inputs) | **Gap** — swarms document blank disks, no parent file copy; `stageIn`/`importFiles` exist but are not invoked in swarm reconcile |
| Role registry (principal_engineer, pm, qa, …) | **Missing** — swarm `context` JSON is untrusted metadata only |
| Harmony manager orchestration without human portal session | **Gap** — swarm agent API requires session-bound capability from an active run |
| Centralized customer notification (UFO/Harmony) | **Aligned gap** — swarm docs: no Slack delivery for agent-only swarm results |
| Memory fail-closed for mandatory company context | **Gap** — default `failOpen: true` on external routes (`provider-router.ts`) |
| Multi-tenant cells in one QM deployment | **Unsupported assumption** — single `orgId` per deployment |

---

## 9. Unsupported assumptions (do not rely on without adapter)

1. QM deployment equals one Harmony tenant cell (single org config).
2. Swarm spawn from a UFO service account without an active human/agent run lease.
3. Parent repository files appear in worker sandboxes after swarm provisioning.
4. Existing run dedup replaces Harmony assignment idempotency across services.
5. Any `/internal/*` Harmony route exists upstream.
6. Outbound trusted event delivery to UFO is implemented.
7. Node 22 can run the test suite (requires Node 24+ for native TS tests).

---

## 10. Suggested implementation seams (W05/W06 backlog)

Priority order aligned with handoff §4:

1. Add `src/harmony/assignment-service.ts` — validate contract, persist assignment row, enqueue launch outbox (mirror `swarm-store` + sweeper pattern).
2. Add `src/api/routes/harmony-assignments.ts` — register under `rawRoutes` with new JWT/`aud` verification (extend `gate` in `server.ts` or dedicated preHandler).
3. Implement `prepareAssignmentWorkspace` calling `SandboxResources.create` + `Sandbox.stageIn` / `importFiles` with manifest artifact IDs from Harmony broker.
4. Map roles to `OrchestratorInput` + tool grants via config/registry (not swarm `context` alone).
5. Add `src/harmony/result-outbox.ts` — on run terminal, emit Harmony `task.result_received` payloads to configured UFO URL.
6. Wire GBrain via `MEMORY_PROVIDER_CONFIG` MCP provider; set `failOpen: false` on company routes.

---

*End of seam map.*
