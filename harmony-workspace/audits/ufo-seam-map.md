# UFO source seam map (Harmony W00)

**Repository:** `/workspace/harmony-workspace/ufo`  
**Branch:** `harmony/main`  
**Baseline SHA:** `63ba388ed449ff46c9d70744119dffc85df0fbf8` (`63ba388` — "Big bang")  
**Upstream remote:** `upstream` → ufo-ai/ufo-core (local checkout renamed per handoff 04)

Handoff references: [04-upstream-forks-and-integration.md](../../harmony-engineering-handoff/04-upstream-forks-and-integration.md), [06-api-and-event-contracts.md](../../harmony-engineering-handoff/06-api-and-event-contracts.md), [08-agent-roles-and-execution.md](../../harmony-engineering-handoff/08-agent-roles-and-execution.md), [15-implementation-backlog-and-runbook.md](../../harmony-engineering-handoff/15-implementation-backlog-and-runbook.md).

---

## 1. Project layout (expected vs observed)

| Area | Path | Role |
| --- | --- | --- |
| Harness | `core/src/ufo/harness/` | Model loop, tool protocol, sandbox, compaction — product-neutral execution |
| Runtime | `core/src/ufo/runtime/` | Durable host: DBOS turns, admission, grants, objects, jobs, surfaces |
| Host | `core/src/ufo/host/` | Extension discovery, builtins, per-turn prompt/tool assembly |
| SDK | `core/src/ufo/sdk/` | Public surface extensions import (`ufo.sdk` only in extensions) |
| Extensions | `extensions/` | Shipped first-party extensions (37 top-level dirs) |
| Packs | `packs/` | Activation bundles (`assistant`, `sample_pack`) |
| Serve entry | `core/src/ufo/serve.py` | `ufoctl serve` composition root |
| Spec | `spec.md`, `AGENTS.md` | Design and contributor rules |

**Harmony-specific paths:** none. No `extensions/harmony/` or Harmony pack in tree at this SHA.

---

## 2. Toolchain and build

| Component | Version / command |
| --- | --- |
| Python | 3.12 (`.python-version`; `requires-python >=3.12`) |
| Package manager | uv 0.12.19 (installed for audit; not in base image PATH) |
| Core package | `ufo` 0.1.0 (`pyproject.toml`) |
| DBOS | 3.0.0 (`dbos>=3.0,<4`) |
| Rust client | cargo 1.83.0 — `make build` → `cargo build --manifest-path client/Cargo.toml --locked` |
| Static gates | `make check` → pre-commit (ruff, gates.py, mypy, actionlint, cargo fmt/clippy) |
| Parallel tests | `make test` → pytest `-n auto`, `-m "not serial and not integration and not docker"` |
| Serial / Docker | `make test-integration` |
| DB for matrix | `make db` → Postgres :5541, Redis :5543 |

Entry points for extensions and packs are declared in root `pyproject.toml` under `[project.entry-points."ufo.extension"]` and `[project.entry-points."ufo.pack"]`.

---

## 3. Extension registration and pack activation

**Model:** Declarative only — extensions do not call a runtime registration API. Each installed distribution exposes a zero-arg entry point returning a `Manifest`; packs expose a `Pack` listing extension names.

### Discovery and activation

| Function / symbol | File | Purpose |
| --- | --- | --- |
| `discovered()` | `core/src/ufo/host/ext/loader.py` | Scan `ufo.extension` entry points; validate first-party privileged caps; reject duplicate names |
| `discovered_packs()` | same | Scan `ufo.pack` entry points |
| `load_manifests(pack: str \| None)` | same | Active set: lockfile pins + digest verify, or all discovered (dev); optional pack narrows bundle |
| `_pack_manifests(pack, active)` | same | Merge pack's extension list + pack-level manifest (skills/onboarding) |
| `migration_locations(pack)` | same | Alembic `migrations/` dirs per active extension |
| `first_party_distributions()` | same | `UFO_FIRST_PARTY_DISTRIBUTIONS` + `ufo` — required for privileged manifest fields |
| `read_lockfile` / `write_lockfile` | same | `ufo.lock` / `UFO_LOCKFILE` |
| `ExtensionStore` (`search`, install pins) | `core/src/ufo/host/ext/store.py` | `ufoctl ext` catalog ↔ lockfile |

### Boot wiring (manifests → runtime)

| Function / step | File | Purpose |
| --- | --- | --- |
| `serve` / runtime build | `core/src/ufo/serve.py` | `manifests = load_manifests(config.pack.name)` then derive subsystems |
| `validate_ext_tools(manifests, credentials)` | `core/src/ufo/host/ext/loader.py` | Boot-time tool/kind/action collision checks; returns action registry |
| `turn_tools(...)` | same | Merge builtins + extension + connector tools; build `ExtensionContext` per tool |
| `turn_subagents(manifests)` | same | Extension `SubagentProfile` list |
| `turn_subagent_grants(manifests)` | same | `subagent_tool_grants` union |
| `turn_hooks(manifests, ...)` | same | Turn-lifecycle `HookChain` |
| `skill_registry(manifests, ...)` | same | Bundled + extension skills |
| `bindings_from(manifests, core_jobs, ...)` | `core/src/ufo/runtime/jobs.py` | Extension `JobSpec` → DBOS job namespace `{extension}:{job}` |

### Reference implementations

| Artifact | Entry point | Notes |
| --- | --- | --- |
| Conformance extension | `extensions/sample/ufo_ext_sample/manifest.py` → `manifest()` | Exercises every manifest point; migrations under `migrations/` |
| GBrain (knowledge sources) | `extensions/gbrain/ufo_ext_gbrain/manifest.py` | Objects + source backends + credential slot — closest analog for gateway wiring |
| Assistant pack | `packs/assistant_dev/ufo_pack_assistant.py` → `pack()` | Default product bundle; registered as `assistant` in pyproject |
| Sample pack | `packs/sample_pack/ufo_pack_sample.py` → `pack()` | Pack-level skills/onboarding |

### Harmony plug-in (proposed, not present)

1. Add `extensions/harmony/` with `ufo_ext_harmony.manifest:manifest` entry in `pyproject.toml` hatch wheel packages.
2. Add `packs/harmony/` (or extend `assistant`) listing Harmony extension + dependencies (e.g. GBrain gateway tools).
3. Set `UFO_FIRST_PARTY_DISTRIBUTIONS` (or ship as part of `ufo` distribution) if Harmony needs privileged manifest fields (`deploy_routes`, `commands`, `workspace_founded`, etc.).
4. Ship Alembic branch under `extensions/harmony/migrations/` — **do not** mutate core UFO tables from Harmony SQL.

---

## 4. Durable turn and agent runtime execution

**Workflow name:** `TURN_WORKFLOW_NAME = "turn"` (`core/src/ufo/schema/records.py`).

### DBOS workflow path

| Function | File | Purpose |
| --- | --- | --- |
| `turn_workflow(workspace_id, turn_id)` | `core/src/ufo/runtime/queue.py` | `@DBOS.workflow(name="turn")` entry |
| `_execute_turn(workspace_id, turn_id)` | same | Loads runtime, gates, calls `_run_turn` |
| `TurnEngine.run()` | `core/src/ufo/runtime/engine.py` | Model rounds + tool steps; side effects in `@DBOS.step` |
| `_dispatch_step(...)` | `core/src/ufo/runtime/engine.py` | Tool dispatch step (preemptible) |
| `_preflight_member_authorizations` | same | Batch authorization before side-effecting tools |

### Queue, dispatch, recovery

| Function | File | Purpose |
| --- | --- | --- |
| `dispatch_next_turn(client, conversation_id)` | `core/src/ufo/runtime/turns/dispatch.py` | Offer next queued turn; enqueue DBOS with workflow id |
| `TurnDispatcher.run()` | `core/src/ufo/runtime/jobs.py` | Sweep QUEUED/PARKED outbox; stale dispatch stamp recovery |
| `cancel_one_turn(client, turn_id)` | `core/src/ufo/runtime/turns/cancellation.py` | Cancel workflow + terminal row |
| `init_runtime` / `_runtime` | `core/src/ufo/runtime/queue.py` | Process-global runtime installed by `serve` |

### Admission (founding turns)

| Type / function | File | Purpose |
| --- | --- | --- |
| `Admission.invoke(...)` | `core/src/ufo/runtime/surfaces/admission.py` | Admit member/system turns; idempotency |
| `AdmissionInvoker` | same | Workspace-scoped `TurnInvoker` for jobs/extensions |
| `invoker_for(workspace_id)` | `core/src/ufo/serve.py` | Factory passed into `HostEnvironment`, jobs, delivery sweep |

### Subagent delegation (in-process, not QM)

| Function | File | Purpose |
| --- | --- | --- |
| `Subagents.spawn(...)` | `core/src/ufo/runtime/subagents.py` | Child turn via DBOS; `dedup_key` for idempotent replay |
| `spawn` builtin | `core/src/ufo/host/tools/builtins.py` | Model-facing delegation to profiles |
| `DeliverySweep` | `core/src/ufo/runtime/delivery.py` | Deliver subagent results to parent conversation |

### Per-turn assembly (before engine)

| Function | File | Purpose |
| --- | --- | --- |
| `HostEnvironment.assemble(request)` | `core/src/ufo/host/assemble.py` | Prompt, tools, skills, hooks from manifests + agent grants |
| `_agent_tools` / `_subagent_tools` | `core/src/ufo/runtime/queue.py` | Filter tool offer by agent.tools / profile |

**Harmony implication:** Company agent turns use the same durable turn machinery. QM assignment lifecycle must be **idempotent** at tool handlers (`side_effecting=True` + `idempotency_key` on `ToolContext`) and/or Harmony-owned rows, so DBOS replay after crash does not create duplicate assignments (handoff 04 acceptance).

---

## 5. Authorization and tool assembly

### Grant narrowing (what the model may call)

| Function | File | Purpose |
| --- | --- | --- |
| `_agent_tools(all_tools, allowed, admission, speaker_member_id)` | `core/src/ufo/runtime/queue.py` | Agent `tools` column ∩ manifest tools; intent admission exception |
| `_agent_actions(...)` | same | Object actions from bound registry |
| `_subagent_tools` / `_subagent_actions` | same | Profile tool_names + `turn_subagent_grants` |
| `with_implied_grants(names)` | same | Expand implied tool names |
| `HostEnvironment.assemble` | `core/src/ufo/host/assemble.py` | Applies environment document (narrow-only overrides) |
| `ToolBridge._allowed(parent, tool)` | `core/src/ufo/runtime/tool_bridge.py` | Sandbox bridge respects same grants |

### Member authorization (connector / sensitive effects)

| Symbol | File | Purpose |
| --- | --- | --- |
| `ToolDef.binds_member_authority`, `standing_authorization` | `core/src/ufo/runtime/tools/registry.py` | Declaration contract |
| `MemberAuthorization.preflight` / `has_pending` | `core/src/ufo/runtime/access/member_authorization.py` | LLM gate + standing scopes |
| `_preflight_member_authorization` | `core/src/ufo/runtime/engine.py` | Per tool call before dispatch |
| `GrantStore`, connector grants | `core/src/ufo/runtime/access/grants.py` | OAuth/connect flows (sdk: `ufo.sdk.grants`) |

### Tool context seam for extensions

| Symbol | File | Purpose |
| --- | --- | --- |
| `ToolContext` | `core/src/ufo/runtime/tools/context.py` | `spawn`, credentials, store, invoker, spend, etc. |
| `TurnInvoker` protocol | `core/src/ufo/runtime/ext/context.py` | `invoke`, `redispatch`, `member_reach` for background/domain workflows |

**Harmony implication:** `start_assignment` / `get_assignment` / `cancel_assignment` should be extension `ToolDef`s with explicit grants on the company agent (agent.tools or subagent profile), `side_effecting=True`, and idempotency keys tied to assignment/admission contract (06). Service-to-QM auth is **out of band** (HTTP + mTLS/JWT per 06) inside tool handlers or Harmony jobs — not present in UFO today.

---

## 6. External delegation hooks (existing)

There is **no** native UFO→QM assignment API at this SHA. Existing external patterns:

| Mechanism | Location | Use |
| --- | --- | --- |
| `spawn` / subagent profiles | `runtime/subagents.py`, `host/tools/builtins.py` | Typed **internal** child turns (e.g. `extensions/coding`, `extensions/research`) |
| `ctx.spawn` in tools | e.g. `extensions/research/ufo_ext_research/delegation.py` | Fan-out pattern with `dedup_key` |
| `call_external_tool`, MCP | Connector/MCP extensions; bridge names in `runtime/tools/bridge.py` | Third-party APIs via Composio/Pipedream/MCP — not structured assignment lifecycle |
| `TurnInvoker.invoke` | `surfaces/admission.py` | Inject agent turns from jobs (scheduled tasks, monitors) |
| Extension `JobSpec` | `manifest.jobs` → `bindings_from` | Periodic reconcilers, sync, delivery sweeps |
| Turn hooks | `turn_hooks` | React to turn lifecycle (not a substitute for outbox) |
| GBrain extension | `extensions/gbrain/` | Source sync + objects — not Harmony tenant brain gateway |

---

## 7. Baseline test attempts (audit run)

| Command | Result |
| --- | --- |
| `make install` | **pass** |
| `make test-one FILE=core/tests/test_gates.py` | **2 passed**, 1 skipped |
| `make test-one FILE=core/tests/access/test_member_authorization.py` | **58 passed**, 61 skipped |
| `make test T=core/tests/test_bundle.py core/tests/test_config.py core/tests/harness/test_agent.py` | **56 passed** |
| `make test T=core/tests/test_integration_requirements.py` | **1 passed** |
| `make test-one FILE=core/tests/loop/test_turn_lifecycle.py` | **61 passed**, 1 failed (timeout sqlite git workspace scan), 52 skipped |
| `make test-one FILE=core/tests/test_objects.py` | **89 passed**, **11 failed** (missing built `ufo` client binary) |
| Full `make test` | **not run** (large parallel suite; client not built) |
| `make check` | **not run** (full pre-push gate) |

Failures are environmental (no `client/target/debug/ufo`, one slow/flaky lifecycle test), not source edits.

---

## 8. Gaps vs Harmony handoff (04 / 06 / 08 / 15)

| Need | Status at SHA |
| --- | --- |
| `extensions/harmony` domain API + migrations | **Missing** — implement per sample/gbrain patterns |
| Harmony pack activation | **Missing** — mirror `packs/assistant_dev` + pyproject entry-points |
| Tools: `start_assignment`, `get_assignment`, `cancel_assignment`, `revise_candidate` | **Missing** — no symbols in tree; design names only in handoff 06 |
| QM `/internal/harmony/v1/assignments` client + service auth | **Missing** — no HTTP client or routes |
| Result ingestion from QM outbox | **Missing** — UFO has turn/subagent delivery and job sweeps, not Harmony task result contract |
| Harmony domain outbox/inbox/reconciler | **Missing** — use extension jobs + Harmony tables (W03), not core turn outbox alone |
| GBrain gateway tool in Harmony pack | Partial upstream: `extensions/gbrain` syncs sources; handoff wants scoped gateway + fail-closed retrieval |
| Company agent role config | **Partial** — UFO agents are workspace rows + prompts; versioned Harmony role registry not present |
| Idempotent assignment on DBOS turn replay | **Requires new** tool + storage design (06 idempotency keys) |
| `UFO_FIRST_PARTY_DISTRIBUTIONS` for Harmony-only routes/commands | Plan if Harmony extension declares privileged manifest fields |

### Unsupported assumptions (do not treat as implemented)

- Any `/api/v1` or `/internal/harmony/v1` route in UFO core.
- Pre-existing UFO↔QM integration or assignment tables in core schema.
- `start_assignment` as a builtin or connector tool name today.
- QM outbox consumption by core `TurnDispatcher` (core outbox is **turn queue** semantics only).
- Harmony tenant/worker isolation — UFO workspace scope ≠ Harmony tenant (mapping layer required).

---

## 9. Recommended seam usage for W01+ (summary)

1. **Domain state:** Harmony extension objects + migrations; object kinds for candidates/tasks if exposed to agents.
2. **Agent tools:** Declare in `Manifest.tools`; handlers call Harmony services; set `side_effecting=True` and use ctx idempotency for QM admission.
3. **Background reconciliation:** `JobSpec` in Harmony manifest (result polling, outbox publish to company conversation via `TurnInvoker`).
4. **Progress in chat:** `AdmissionInvoker.invoke` / durable surfaces — not forged human messages (handoff 06).
5. **Knowledge:** Extend or wrap GBrain extension; replace ad-hoc company retrieval with gateway tool in Harmony pack.
6. **Pack:** Bundle `harmony`, GBrain gateway extension, and existing assistant deps as needed for vertical slice W07.

---

*Audit agent: audit-ufo. UFO application source not modified.*
