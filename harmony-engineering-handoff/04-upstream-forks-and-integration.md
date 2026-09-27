# 04 · Upstream forks and integration engineering

## 1. Repository strategy

Use one developer workspace with four independent repositories: harmony, ufo, qm, and gbrain. The harmony repository owns these documents, shared schemas, contract fixtures, local orchestration, infrastructure, integration tests, and the release lock. The other repositories preserve their own Git history and language/tooling. Cross-repository changes land under one integration change ID and are released only as a tested set.

Canonical upstreams are https://github.com/ufo-ai/ufo-core, https://github.com/yc-software/qm, and https://github.com/garrytan/gbrain. The relevant UFO is ufo-ai/ufo-core; neither Microsoft/UFO nor the earlier paired-machine product description is the implementation baseline.

Clone first, inspect the current repository instructions and manifests, record a baseline SHA, and then create our fork branch. Retain upstream as a read-only remote and use our organization repository as origin. Never push to an upstream organization unless explicitly contributing a reviewed change. A private fork may need a standalone repository rather than a GitHub fork; preserve license and attribution files.

### Example checkout commands

These commands use existing public Git interfaces. They create local checkouts only; organization repository creation is a separate authorized setup action.

~~~bash
mkdir harmony-workspace
cd harmony-workspace
git clone https://github.com/ufo-ai/ufo-core.git ufo
git clone https://github.com/yc-software/qm.git qm
git clone https://github.com/garrytan/gbrain.git gbrain
git -C ufo remote rename origin upstream
git -C qm remote rename origin upstream
git -C gbrain remote rename origin upstream
git -C ufo switch -c harmony/main
git -C qm switch -c harmony/main
git -C gbrain switch -c harmony/main
~~~

Record each SHA and resolved toolchain version. Do not invent a commit hash in advance or track a floating latest dependency in deployment. The source audit in work package W00 creates the release lock and records local instructions, build commands, database prerequisites, and baseline test results.

## 2. Evidence status

The handoff inspected public documentation and the supplied attachments, not a running source checkout. Existing path names below were observed in those documents. Proposed paths are locations we choose for new implementation and must be adjusted if the checkout's structure requires it. All behavioral compatibility must be proven by tests.

| Repository | Documented existing area | Intended use |
| --- | --- | --- |
| UFO | core/src/ufo/harness | Agent execution boundary; avoid unnecessary changes to model-loop internals |
| UFO | core/src/ufo/runtime and core/src/ufo/host | Durable runtime, authorization, prompt/tool assembly |
| UFO | extensions/ and packs/ | First-party Harmony extension and activation pack |
| QM | src/, plugins/, docs/swarms.md | API/runtime integration, surfaces, and bounded worker coordination |
| QM | docs/memory-providers.md | Scope-aware external knowledge retrieval/write mapping |
| GBrain | src/core/engine.ts and docs/mcp/ | Knowledge engine contract and authenticated MCP access |
| GBrain | docs/architecture/brains-and-sources.md | Tenant brain and feature-source mapping |

The documentation supports feasibility. It does not establish a pre-existing native UFO-to-QM integration, a production-ready Harmony runner, or a complete source-provisioning API.

## 3. UFO workstream

Create a reviewed first-party extension under a proposed extensions/harmony path and a proposed Harmony pack. The extension owns the domain API and uses dedicated Harmony migrations. It must not mutate UFO core rows through ad hoc SQL. Use supported object/member/turn interfaces where available; add a narrow first-party runtime seam where necessary.

Required extension modules are company provisioning, company-agent tools, workflow commands, due-work scanner, integration bindings, human-review ingress, result ingestion, and notifications. The company agent receives typed tools for inspecting evidence, proposing candidates, delegating approved work, reading task state, and requesting a human decision. Tools call domain services and cannot set arbitrary candidate status.

Add native delegation tools conceptually named start_assignment, get_assignment, cancel_assignment, and revise_candidate. These names are our design. Their implementation speaks the versioned internal contract in 06. Progress and completion events should appear in the owning company conversation without impersonating a human message.

Store long-running business state in Harmony tables. UFO's durable turn execution handles agent turns; a workflow reconciler handles stage transitions and external side effects. A product waiting for human review should have no active agent turn consuming tokens.

Replace company-semantic retrieval with the GBrain gateway tool in the Harmony pack. UFO may retain transcripts, compaction, and operational memory, but must not silently answer company-policy questions from an independent stale notebook. Tag retrieved company material with its source/revision and trust level. Grant research tools only to relevant assignments.

Acceptance: a real company agent can start a QM assignment, observe its progress, survive a UFO process restart, and retrieve its verified result. It must not create a second assignment when its durable turn is replayed.

## 4. QM workstream

Add a proposed src/harmony delegation module exposing service-authenticated assignment endpoints. This is deliberately separate from endpoints that require signed human portal identity. Do not forge a human session or reuse a browser cookie to make a server delegation work.

The module validates the tenant deployment binding, contract version, assignment schema, parent authorization, idempotency key, budget reservation, and context manifest. It starts an appropriately scoped root manager session and bounded workers. QM's documented swarms begin with blank worker computers; our adapter must explicitly prepare the repository and required artifacts. It must not assume parent files appear in a child.

Manager roles are principal_engineer, explorer, pm, designer, frontend_engineer, backend_engineer, qa, and reviewer. Registered policies determine tool grants. Role/context JSON is descriptive metadata and never changes underlying authorization. Parent command approvals do not automatically become child permissions.

Implement our runner provider adapter rather than assuming the documented default swarm backend has our isolation and lease semantics. The adapter creates a job container on the tenant worker VM, stages a repository snapshot or artifact inputs, attaches the sandbox command/file tools, and returns structured lifecycle receipts. Integrate the adapter at QM's actual sandbox/provider interface discovered in W00. A core patch is allowed if the existing interface cannot express immutable inputs, cancellation, or fence checking.

QM publishes progress/results through an outbox. It does not send customer Slack messages directly in this product. Documented agent-only swarm delivery constraints are one reason to centralize customer notification in UFO/Harmony. Result publication carries task ID, attempt ID, generation, artifact references, and observed usage.

Configure company and feature retrieval through the external-memory provider path where possible. The GBrain gateway translates schemas and enforces grants. Required company-context reads fail closed rather than inheriting any upstream fail-open default. Explicit memory writes go to the assignment's feature source; publication is a separate capability.

Acceptance: a worker cannot access a second feature's private source, cannot reuse a replaced attempt credential, and cannot publish a branch from a cancelled task. Root/worker restart and outbox replay produce one logical result.

## 5. GBrain workstream

Use GBrain's engine and authenticated remote tool surface, with a thin Harmony gateway for domain mapping and provenance. Add engine features only where the required behavior cannot be expressed with existing operations. Do not fork a second semantic search implementation inside Harmony.

Provision one tenant brain database with sources company-published, company-observations, and feature-<candidate-uuid>. Company-published contains authoritative human decisions and accepted facts; observations contain sourced but unapproved research; feature sources contain drafts and stage outputs. Default agent retrieval does not search all sources indiscriminately.

Implement admin provisioning as an operator-only path that creates database bindings, sources, and machine client grants. Per-feature clients get the exact read/write grants required by role. A tenant-wide owner credential is never embedded in a worker. If upstream permissions cannot express read-company/write-feature independently, the gateway exposes separate authenticated read and write clients and checks both operations itself.

Add a publication transaction in Harmony: pending publication, GBrain write receipt, read verification, publication ledger commit, company-knowledge epoch increment. A retry uses the same publication ID and expected page revision. If upstream does not expose revision compare-and-swap, serialize writes per knowledge record and implement an application revision check before and after the write; unresolved concurrent conflict blocks publication rather than overwriting silently.

Add explicit correction, supersession, withdrawal, and evidence-deletion propagation. Implement relationship writes through supported authorized operations or a reviewed administrative maintenance job. Do not assume an HTTP page write automatically creates every graph edge.

Acceptance: a correction changes retrieval in a fresh UFO and QM session, its earlier version remains in historical snapshots where retention permits, and withdrawn evidence no longer appears through normal search or generated context.

## 6. Shared contract implementation

The harmony repository owns schema files under proposed contracts/v1, generated Python/TypeScript bindings, and canonical fixture payloads. JSON Schema is the payload authority; OpenAPI describes transport. A change to a contract major requires a migration and a compatibility window. Generated files must not be hand-edited independently in forks.

Build an adapter contract test suite that executes against all three services. It includes assignment admission, duplicate retry, result validation, source grants, cancellation, stale attempt rejection, company correction, and tenant mismatch. An in-memory fake may support unit tests but cannot satisfy the integration gate.

## 7. Fork maintenance and delivery

Each change names its upstream base SHA, our branch SHA, contract version, migration version, container digest, and integration test run. The release lock pins the tested set. Avoid unrelated formatter churn or broad rewrites during an integration change. A code agent can make large changes, but each commit must describe behavior and a verification path.

Upstream upgrades occur in dedicated branches. Run baseline tests, reconcile API changes, migrate test databases, and execute cross-repository acceptance before changing release pins. Do not auto-merge upstream on deployment. Preserve merge ancestry when integrating upstream changes; avoid squashing away the history needed for future updates.

No team member is required to wait for an upstream maintainer to accept a needed feature. Our fork can carry it. Generic patches may be contributed later under each repository's current contribution instructions.

## 8. First runnable milestone

The first milestone uses two seeded tenants, one GBrain decision in each, and a real QM worker for a bounded research assignment. UFO starts the assignment through our API, the worker reads only its tenant's knowledge, writes a feature result, and returns evidence. Kill and restart the control service during the run. The same assignment must finish once, and neither tenant can read the other's result. This is the foundation before adding repository mutation.
