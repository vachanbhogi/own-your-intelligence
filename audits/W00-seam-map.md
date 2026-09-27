# W00 combined seam map

Pinned SHAs (see [release-lock.json](../release-lock.json)):

| Repo | SHA | Branch |
| --- | --- | --- |
| qm | `a5a36675041a85e30b9ff3632f678ba36837aabf` | harmony/main |
| ufo | `63ba388ed449ff46c9d70744119dffc85df0fbf8` | harmony/main |
| gbrain | `e78f1c38b947b053f3a46881340f74f316be855a` | harmony/main |

## QM — assignment / session / sandbox

| Seam | File | Symbol / notes |
| --- | --- | --- |
| Route registration | `src/api/routes/index.ts` | `rawRoutes` / exported route tables — add Harmony routes here or via new module imported into index |
| Router | `plugins/chassis/src/router.ts` | `compilePath`, `findRoute` |
| Route runner | `src/api/routes/route.ts` | `run()` |
| Existing swarm HTTP | `src/api/routes/swarms.ts` | Human/session swarm surface — **not** Harmony service admission |
| Swarm service | `src/swarms/swarm-service.ts` | `SwarmService.spawn`, `binding`, `inspect` — root manager + bounded workers |
| Swarm fence | `src/swarms/swarm-fence.ts` | `SwarmRunFence`, `assertSwarmRun` — lease/attempt fencing exists; map to Harmony generation |
| Session store | `src/sessions/session-store.ts` | Session persistence |
| Sandbox interface | `src/sandbox/sandbox.ts` | `Sandbox.provision/run/teardown`, file ops — **primary provider seam for Harmony runner adapter** |
| Sandbox routing | `src/sandbox/sandbox-routing.ts` | `createSandboxRouter` |
| Local sandbox | `src/sandbox/local-sandbox.ts` | Dev/local backend for first slice |
| Sandbox resources | `src/sandbox/sandbox-resources.ts` | `createSandboxResources` |
| Memory providers | `src/memory/provider-factory.ts`, `provider-config.ts`, `provider-router.ts` | MCP external memory; set `failOpen: false` for required company context |
| Idempotency | `src/idempotency/` | Reuse patterns for assignment Idempotency-Key |
| Auth capabilities | `src/auth/capability-token.ts` | Capability claims model |

**Harmony module target:** `src/harmony/` (new) with service-authenticated assignment endpoints under `/internal/harmony/v1/*`. Do not reuse portal cookie auth.

**Gaps to implement:** assignment admission API, durable launch outbox → Harmony callback URL, generation fencing across services, blank-child prepare of repo/artifacts (swarms start blank), Harmony runner provider with allocate/prepare/execute/inspect/stop/destroy + 15s/60s lease.

## UFO — extension / durable turn

| Seam | File | Symbol / notes |
| --- | --- | --- |
| Extension discovery | `core/src/ufo/host/ext/loader.py` | `EXTENSION_ENTRY_POINT_GROUP = "ufo.extension"`, `load_manifests` |
| Manifest contract | `core/src/ufo/runtime/ext/manifest.py` | `Manifest` dataclass — tools, routes, jobs, hooks |
| Extension context | `core/src/ufo/runtime/ext/context.py` | `ExtensionContext` |
| Sample extension | `extensions/sample/ufo_ext_sample/` | Pattern for `extensions/harmony` |
| Existing GBrain ext | `extensions/gbrain/ufo_ext_gbrain/` | Precedence for knowledge tool wiring |
| Entry points | `pyproject.toml` `[project.entry-points."ufo.extension"]` | Register `harmony` |
| Durable jobs/turns | `core/src/ufo/runtime/jobs.py`, `runtime/queue.py` | Long-running work; review wait must not hold a turn |
| Tool context | `core/src/ufo/runtime/tools/context.py` | Tool registry / grants |
| Packs | `packs/`, `ufo.pack` entry points | Harmony pack activation |

**Harmony target:** `extensions/harmony/` + pack; tools `start_assignment`, `get_assignment`, `cancel_assignment`, `revise_candidate` speaking contracts/v1.

## GBrain — engine / sources / MCP

| Seam | File | Symbol / notes |
| --- | --- | --- |
| Engine contract | `src/core/engine.ts` | `BrainEngine` interface, `putPage` |
| Postgres engine | `src/core/postgres-engine.ts` | Production `putPage` |
| Sources | `src/core/sources-load.ts`, `source-id.ts`, `source-resolver.ts` | Source config / federation |
| MCP server | `src/mcp/server.ts` | Authenticated remote tools |
| MCP instructions | `src/mcp/instructions.ts` | Capability posture |
| Source preflight | `src/mcp/source-preflight.ts` | `assertStdioSourceBindable` |

**Harmony gateway target:** thin adapter mapping company-published / company-observations / feature-\<uuid\>; fail-closed required reads; publication ledger outside GBrain.

## Unsupported assumptions (recorded)

1. No pre-existing UFO↔QM native delegation API.
2. QM swarm fence is run/lease oriented; Harmony generation fencing across UFO/QM/runner must be built.
3. Memory provider defaults **fail open** — Harmony must set `failOpen: false` for required context.
4. Baseline unit/integration tests not run in W00 (toolchains present; deps not installed). Install and record receipts in W01 local stack.
