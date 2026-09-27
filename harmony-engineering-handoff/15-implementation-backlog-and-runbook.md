# 15 · Implementation backlog and team runbook

## 1. Delivery strategy

Build a real vertical slice first, then add the feature-factory stages. Avoid spending the first week polishing a dashboard while delegation and isolation remain unproven. Conversely, do not postpone domain integrity until after a demo: IDs, tenant binding, revisions, and idempotency are foundational and difficult to retrofit.

The work packages below are ordered by dependency, not promised calendar duration. Estimates should be produced after W00 inspects the current checkouts. Public documentation was verified, but no runtime benchmark or source integration has yet been executed for this project.

Suggested team roles are integration lead, UFO/backend engineer, QM/runner engineer, knowledge engineer, product/repository engineer, and QA/platform engineer. One person or coding agent may cover several roles. Every package has one accountable owner even when implementation is delegated.

## 2. Work packages

| ID | Package / owner | Depends on | Definition of done |
| --- | --- | --- | --- |
| W00 | Source and environment audit / integration lead | None | Three checkouts, repository instructions read, baseline SHAs/toolchains/build commands recorded, existing tests attempted with results, exact seams mapped |
| W01 | Integration repository and local stack / platform | W00 | Shared contracts, release lock, dev launcher, two-tenant seed, health checks, repeatable reset |
| W02 | Tenant identity and provisioning / UFO/platform | W01 | Auth0 login, tenant roles/bindings, database/secret/cell provisioning, idempotent recovery, dedicated worker-pool interface |
| W03 | Domain schema and workflow engine / backend | W01 | Tables/constraints, phase machine, plan registry, outbox/inbox, leases, fencing, budgets, migrations |
| W04 | GBrain gateway and scoped sources / knowledge | W02, W03 | Company/observation/feature sources, read/write grants, context snapshots, fail-closed required retrieval |
| W05 | Native UFO-to-QM delegation / UFO + QM | W02, W03 | Versioned assignment API, service auth, root session, progress/results, cancel/reconcile; T15/T37–T42 |
| W06 | Runner supervisor/provider / QM/platform | W02, W05 | Container prepare/execute/stop, egress, resource limits, heartbeat/fence, artifact inputs; T40/T47–T48 |
| W07 | First real agent vertical slice / integration | W04, W05, W06 | Two tenants, real QM task, GBrain rule used, restart recovery, result shown in UFO; G1 |
| W08 | Feedback connectors and evidence ledger / backend | W03, W07 | Owned webhook, JSON import, Google adapter, cursors/edits/coverage/auth health; T07–T12/T59 |
| W09 | Company enrichment and opportunity analysis / agent | W04, W08 | Sourced profile, competitor fit, clustering/ranking, bounded automatic selection; T03/T13–T14 |
| W10 | Repository broker and profile / repository/platform | W03, W06 | GitHub installation, safe clone/read, baseline verification, protected paths, branch compare-and-swap |
| W11 | PM/manager/worker roles / agent | W05, W09, W10 | Versioned role configs, valid specs/plans, schemas and escalation evals |
| W12 | Frontend preview and scenario pipeline / repository | W10, W11 | Real app patch, deterministic mocks, build and browser assertions, revision lineage; T17–T18 |
| W13 | Artifact hosting and video / repository/platform | W12 | Private immutable preview, verified recording/MP4, package hashes/access; T19–T20/T49 |
| W14 | Human review in Slack/web / UFO/backend | W03, W13 | Signature verification, roles, design/product gates, stale/duplicate decisions, revision loop; T21–T23/T50–T52 |
| W15 | Full implementation, QA, and PR / QM/repository | W14 | Mock removal, production checks, independent review, idempotent PR publication, no merge path; G4 |
| W16 | Knowledge publication and continuity / knowledge | W04, W14, W15 | Scoped correction, publication receipts, withdrawal, decision lineage, fresh-session reuse; G5 |
| W17 | Release/outcome observation / backend | W15, W16 | Merge vs deployment distinction, outcome windows, qualified reporting |
| W18 | Production hardening and release qualification / QA/platform | W07–W17 | Dedicated tenant execution, load/fairness, recovery, retention/deletion, alerting and G6 report |

## 3. Detailed first implementation slice

W00 must produce a seam map naming exact source files/functions at the checked-out SHAs for UFO extension registration, QM assignment/session admission, QM sandbox provider, GBrain remote tool schemas, and each project's migrations. Existing docs are useful clues, not a substitute for tracing those call paths. Record unsupported assumptions immediately and implement the planned adapter rather than pretending an endpoint exists.

W01 creates a minimal shared Assignment/TaskResult/Event schema and two fixture tenants. W03 persists one bounded research task. W04 provisions one company rule for each tenant. W05 sends the task from UFO to a real QM session. W06 provides a constrained worker execution environment. W07 demonstrates context retrieval, one task result, cancellation, and restart recovery.

Do not add every agent role in the first slice. One company agent, one QM worker, and two isolated brains are enough to prove the integration seam. Once that path is reliable, specialize roles without changing the identity/result contract.

## 4. Workstream parallelism

After W01 contracts are agreed, separate coding agents can implement UFO domain APIs, QM delegation/runner changes, and GBrain gateway work in separate branches/worktrees. Shared schema changes go through the integration lead. Each agent receives the contract fixtures and must run them before claiming compatibility.

Do not let several agents concurrently edit the same schema or migration chain without coordination. Assign repository/module ownership, use integration branches for cross-cutting changes, and name dependencies explicitly. Parallel coding reduces implementation labor; it does not remove integration order or verification requirements.

## 5. Coding-agent work-order template

The engineering lead should issue tasks in this form:

~~~text
Implement work package Wxx against the pinned release-lock repositories.
Read the local repository instructions and relevant numbered specifications.
Objective: <one observable behavior>.
Allowed repositories/modules: <explicit paths>.
Inputs/contracts: <schema versions and fixture IDs>.
Required invariants: <INV IDs>.
Do not alter product scope, tenant policy, or approval semantics.
Missing upstream behavior may be implemented in our fork.
Deliver code, migrations, meaningful tests, and a short change report.
Report actual commands/results and any blocked verification.
Do not claim success from a stubbed adapter where a live gate is required.
Do not publish, merge, or deploy outside the task's explicit authority.
~~~

This is an instruction template for future implementation, not a request that this documentation task has run code agents or changed repositories.

## 6. Branch and integration procedure

Create a task branch in every affected fork and a corresponding integration branch in harmony. Record an integration change ID in commits/PRs. Update schemas first or in a backward-compatible coordinated change. Run local unit/contract tests, then the shared staging fixture. The integration PR updates release pins only after all affected fork commits are available and the cross-repository tests pass.

Prefer small behavior-complete changes over an enormous unreviewable merge. A large refactor is allowed when necessary, but separate behavior changes from mechanical movement where possible. Preserve public license/notice files and upstream history. Do not include secrets, customer datasets, generated caches, or sandbox artifacts in Git.

## 7. Bootstrap inputs

The following are configuration/access inputs, not unanswered architecture decisions: our GitHub organization and repository destinations; cloud account and DNS domains; Auth0 issuer/client/callback configuration; Slack app credentials and test workspace; GitHub App installation and test repository; model-provider account; Google Business Profile authorization if available; and named pilot humans with reviewer roles.

Actual source SHAs, runtime versions, machine image digests, and compatible model IDs are recorded during W00 from available code/provider access. Choosing a compatible model route is constrained by the role evaluation gate, spend caps, and supported harness. There is no floating production 'latest' model or image. The team may begin schemas, fixture tests, and local integration before every external account is available.

No secret belongs in this handoff or in chat. Use the configured secret store and private setup channels. A missing Google account blocks that connector's live qualification, not the owned-webhook vertical slice.

## 8. Hackathon demonstration plan

Use two seeded tenants and AcmePulse. Show one live owned-feedback submission, the retrieved company constraint, the resulting PM spec, a real frontend patch, a working preview/video, a human revision request, current-revision approval, actual implementation, and a real PR. End the agent session and show the next task applying the published correction.

A concise demonstration can focus on one primary tenant while a second tenant isolation probe runs in the acceptance evidence. Precomputed footage may supplement the presentation if clearly labeled and tied to a recorded run. The human merge can be demonstrated manually or left as an open PR with the policy explained. Do not auto-merge for presentation speed.

If time is short, reduce source breadth, agent-role count, visual polish, and automatic prioritization complexity. Preserve real tenant binding, the native delegation path, GBrain use, the actual code patch, revision-specific approval, and PR lineage. Those are the product proof.

## 9. Pilot cut and production cut

Pilot/demo completion requires G0–G5 from 14 and a known-limitations report. Production requires W18/G6. A provider fixture or local shared-host runner is acceptable only in the labeled demo qualification. It is not quietly promoted into a customer-facing multi-tenant deployment.

Before the pilot, assign owners for integration failures, review latency, source authorization, model spend, and tenant support. Before production, add on-call escalation, restore/deletion drill ownership, and a release rollback decision-maker. An unowned operational failure is a release risk even when code tests pass.

## 10. Definition of done for every package

Code implements the documented behavior; tests cover the concrete failure modes; logs/audit events permit diagnosis; schema/config changes are versioned; docs reflect actual names and commands; all executed checks have receipts; unexecuted checks are called out; no unrelated user work is overwritten; and the integration lead can reproduce the result from the release lock.

A package is not done because an agent says it finished or because its branch compiles. The outcome must be observable through the specified contract and acceptance test. A blocked package records the exact dependency, attempted evidence, and next implementable step.
