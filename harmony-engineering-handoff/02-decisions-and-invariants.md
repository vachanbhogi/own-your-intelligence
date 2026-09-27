# 02 · Locked decisions and system invariants

## 1. Decision authority

This document records decisions made under the user's explicit delegation to lock implementation requirements. It supersedes earlier exploratory role assignments in the supplied transcripts. A later approved ADR may change a decision, but the team must update contracts, migration plans, and affected tests together. Implementation convenience does not silently alter product policy.

The latest uploaded ARCHITECTURE.md is an important input, not a claim that its illustrative CLI commands exist. The prior frontend-preview-before-full-build requirement remains active. The recent discussion narrows mandatory dependencies to UFO, QM, and GBrain. These rules resolve the main source conflicts.

## 2. Architecture decision register

| ADR | Decision | Reason and consequence |
| --- | --- | --- |
| ADR-001 | Use the working name Harmony | A stable identifier is required for paths, event names, and documentation; branding can change independently |
| ADR-002 | Fork all three upstream repositories and maintain a fourth integration repository | Agents may change core internals; preserve upstream history and reproducible source pins |
| ADR-003 | UFO is the company runtime and product-workflow host | Customer dialogue, recurring business work, and multi-day review have one owner |
| ADR-004 | QM is the bounded execution organization | The principal engineer manages specialist tasks; QM does not become a second business scheduler |
| ADR-005 | GBrain is the durable semantic knowledge service | Company facts and decisions are shared across runtimes; native session history remains local to each runtime |
| ADR-006 | Domain workflow authority is the harmony schema owned by the UFO extension | DBOS execution is useful but cannot replace explicit business revisions, approvals, and evidence records |
| ADR-007 | Use one tenant as the company boundary | Identity, credentials, repositories, brains, artifact grants, and job claims bind to it |
| ADR-008 | One physical GBrain database per tenant; separate sources per feature | Company-level separation is strong; feature scope does not require a separate database for every PR |
| ADR-009 | Customer chat defaults to configuration/research; external feedback defaults to evidence | A chat utterance does not accidentally create a feature; explicit authorized build requests use a typed action |
| ADR-010 | Automatically prepare bounded previews after owner opt-in | Continuous product behavior is meaningful while spending and parallelism remain controlled |
| ADR-011 | Frontend first, full implementation only after approval | Preserves the user's intended review boundary even for apparently simple full-stack tasks |
| ADR-012 | Review preference is both preview and video by default | Either can be selected; both refer to the same candidate build |
| ADR-013 | Human-only merge in GitHub for release 1 | The latest architecture explicitly requires it; earlier optional Slack merge is superseded |
| ADR-014 | No automatic production deployment by Harmony | Observe the customer's release pipeline; do not assume merge implies release |
| ADR-015 | Release 1 supports GitHub and Linux JS/TS web apps | A testable support envelope enables reliable existing-product previews |
| ADR-016 | All writes and external side effects use durable idempotency | Retries and crash recovery must not create duplicate work |
| ADR-017 | Leased attempts use fencing generations | A late worker cannot complete a newer task attempt or publish an obsolete branch |
| ADR-018 | A candidate revision and its review package are immutable | Any change in code/spec/mock boundaries creates a new revision or package and invalidates stale decisions |
| ADR-019 | Approved company knowledge is published deliberately | Draft worker reasoning and competitor claims do not become company policy automatically |
| ADR-020 | Source findings preserve provenance and coverage | Partial APIs and fixtures cannot imply complete live evidence |
| ADR-021 | Production execution uses a dedicated worker VM per tenant with separate job containers | Customer code runs away from control services; Git worktrees are not the security boundary |
| ADR-022 | Shared UFO control tier; tenant-specific QM/GBrain service cells | QM's organization-oriented model is not assumed to provide a proven shared-host SaaS boundary |
| ADR-023 | Postgres transactions plus outbox/inbox are the reliable transport foundation | No Kafka or generic workflow bus is required for the first release |
| ADR-024 | Agent proposals are validated by deterministic code | Agents cannot grant themselves permissions, accept their own artifacts, or change state arbitrarily |
| ADR-025 | Defer Superset, Memorable, and River | No unverifiable sponsor interfaces block the three-repository product |
| ADR-026 | No customer data is used for model training | Future training requires a separate explicit product decision and consent design |
| ADR-027 | Agent review and human approval are different records | Neither a model verdict nor a Slack reaction constitutes human authority |
| ADR-028 | No unrestricted dynamic DAG execution | Plans use registered task types and allowed edges; revision creates a new acyclic graph |
| ADR-029 | Provider uncertainty is represented as unknown/blocked | A timeout is never interpreted as proof of failure or success |
| ADR-030 | Integration fixtures are executable release contracts | The team must prove cross-runtime behavior rather than relying on documentation compatibility |
| ADR-031 | Auth0 Universal Login with OIDC code flow and PKCE is the web identity provider | Harmony owns tenant membership/roles; issuer/client identifiers are deployment configuration |
| ADR-032 | Canonical JSON hashes use RFC 8785 JCS plus SHA-256 | Python and TypeScript must produce identical content identities |

## 3. Ownership that must not be duplicated

| Concern | Sole authority | Permitted secondary representation |
| --- | --- | --- |
| Tenant membership and human roles | Harmony identity tables | Mapped UFO member / QM principal identities |
| Business schedule | Harmony workflow extension | Runtime timer that wakes the due-work scanner |
| Candidate state and approval | Harmony Postgres | Read-only presentation in Slack and agent context |
| Code revision | Git commit and stored digest references | Artifact manifest and GBrain explanatory note |
| Worker lifecycle | QM adapter, reconciled into domain tasks | UFO progress projection |
| Accepted company knowledge | GBrain published source plus publication ledger | Immutable context snapshots attached to candidate revisions |
| Raw evidence identity and deletion | Harmony evidence ledger | Redacted GBrain summaries that reference evidence IDs |
| Merge state | GitHub verified event/read | Domain projection |
| Deployment state | Verified deployment event/read | Domain projection distinct from merge |

No service writes another service's internal tables. Cross-service changes use versioned APIs. GBrain must not be asked to answer whether a task is legally approved; the domain database owns that fact.

## 4. Non-negotiable invariants

INV-001: Every tenant-owned row, artifact, task, credential reference, event, and memory request is bound to one tenant. Indirect relationships use composite tenant foreign keys or an equivalently checked transactional constraint.

INV-002: Tenant identity comes from authenticated context and server-owned bindings, never from natural language, a URL alone, or an unverified event field.

INV-003: A worker receives an expiring capability for one task attempt. It cannot mint grants, impersonate humans, or access an owner secret.

INV-004: External reviews, web pages, repositories, and tool output are untrusted content. Their instructions cannot override assignment policy.

INV-005: Task success requires a valid result manifest, required artifacts, and server verification. Silence, a zero-error chat response, or a launch acknowledgement is insufficient.

INV-006: One logical side effect has one stable operation ID. Network retries reuse it. A substantive revision uses a new operation ID.

INV-007: Old attempt generations are rejected for writes after lease loss, cancellation, or supersession. Late artifacts may be retained as orphaned diagnostics but cannot advance the candidate.

INV-008: Review approval binds tenant, candidate, revision, spec hash, review-package hash, and artifact/code identity. Human authorization is checked when the decision is accepted and again before new implementation admission.

INV-009: A changed preview code SHA, specification, acceptance scenario, mock boundary, or artifact manifest invalidates previous package approval. Copy edits to notification delivery metadata alone do not change the package.

INV-010: Full implementation must descend from or preserve a verifiable patch lineage to the approved preview. Material behavior divergence requires a new review cycle.

INV-011: Production credentials and production customer data are absent from untrusted preview/build environments. The service can operate with synthetic datasets and scoped repository access.

INV-012: A permission revocation or tenant suspension blocks new work immediately and causes active work to be cancelled at the next enforced lease/tool boundary.

INV-013: Customer knowledge can be corrected without erasing the historical context used by an earlier decision. New work sees the correction; prior artifacts retain their original rationale with a supersession pointer.

INV-014: Claims of live feedback, real PR creation, verified tests, merge, or deployment require receipts from the relevant source. Fixtures and simulations are labeled throughout lineage.

INV-015: Cancellation stops future effects but does not pretend to undo effects already committed. The audit record states what completed, what was stopped, and what needs cleanup.

## 5. Default policy values

Defaults are versioned in TenantPolicy version 1. Human-authorized changes create a new policy revision and audit event. Agent context may read policy but cannot mutate it.

| Parameter | Default | Maximum admitted in release 1 |
| --- | --- | --- |
| Active products / repositories per tenant | 1 / 1 | 1 / 1 |
| Concurrent candidates per product | 2 | 2 |
| Active worker containers per tenant | 4 | 8 after operator capacity approval |
| Concurrent worker attempts per candidate | 3 | 3 |
| Automatic candidates per product/local day | 1 | 3 with owner opt-in |
| Feedback polling interval | 60 minutes | Minimum interval 15 minutes, subject to source quota |
| Competitor refresh | 7 days | Minimum interval 24 hours |
| Revision cycles before human escalation | 3 | 3 |
| Review expiry | 7 days | 14 days |
| Preview runtime idle timeout | 30 minutes | 60 minutes |
| Tenant daily model spend cap | USD 25 | USD 100 with owner opt-in |
| Candidate model spend cap | USD 10 | USD 25 with owner opt-in |
| Review artifact retention | 90 days | Owner-configured longer retention after pricing support |

Money caps use integer micro-USD, not floating point. Infrastructure runtime caps are separate and cannot be bypassed because model cost is low. Pricing inputs are pinned in an operator-maintained catalog; estimates reserve capacity and final receipts reconcile it.

## 6. Change-control procedure

An ADR change states the problem, replacement decision, affected requirement IDs, API/schema implications, migration strategy, security impact, and acceptance tests. The engineering lead and product owner approve behavior-changing ADRs. A correction to an inaccurate upstream capability claim requires evidence and may use an implementation patch without reopening the product decision.

If an upstream capability is absent, the team implements the documented Harmony adapter or fork change. It does not silently shrink the product to fit the unmodified repository. If an integration cannot be made reliable within the release gate, mark that capability blocked and keep its demo mode explicit.
