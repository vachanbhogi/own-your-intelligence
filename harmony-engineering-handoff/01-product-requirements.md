# 01 · Product requirements

## 1. Product definition

Harmony is a continuously operating product-improvement service for companies with an existing web application and a GitHub repository. A company supplies its website, authorizes integrations, and defines product boundaries. The service learns the business, monitors configured feedback, investigates recurring problems and relevant competitors, and prepares bounded changes in the company's existing application. Humans inspect a preview or video and authorize full implementation. Agents finish the code and open a PR. A human reviews and merges through GitHub.

The product's unit of work is a change candidate with immutable revisions. Each revision connects evidence, requirements, company context, repository baseline, preview code, artifacts, approvals, and implementation outcomes. The product must answer what was requested, why it was selected, who changed it, what was approved, which code implements it, and whether it shipped.

This is a multi-company SaaS from the first implementation. A demonstration may use seeded companies, but tenant isolation and the core workflow are real. A fake application is a demonstration target, never a replacement for the connected-repository product model.

## 2. Target customers and release scope

Release 1 targets small software teams operating one browser-based product per company, with one connected GitHub repository and one Slack workspace. The schema supports multiple products and repositories, but release-1 admission enforces one active product and one active repository per tenant. A monorepo may be connected with one configured application root. A repository cannot be connected to two tenants in release 1; transfers require an explicit disconnect and ownership verification.

Supported application profiles are JavaScript/TypeScript web applications that can start in Linux with a documented command and synthetic data. Other stacks produce an unsupported-profile result during onboarding, not fabricated preview success. The architecture leaves the build profile extensible, but support is earned by a passing conformance fixture.

GitHub is the only release-1 Git provider. Slack and the authenticated product web surface are the review channels. The service may research public websites without connecting a code repository; code changes require a validated repository profile.

## 3. Roles

| Role | Authority |
| --- | --- |
| Tenant owner | Billing/admin authority, connections, membership, reviewer policy, source enablement, deletion, and all product-review actions |
| Tenant admin | Product configuration, integrations, membership except removing the last owner, and ordinary review authority when explicitly granted |
| Product approver | Approve or reject a candidate revision, request changes, defer, and nominate company decisions |
| Design reviewer | Approve the design gate when enabled; request design revisions; cannot authorize production work without the product-approver role |
| Engineer | Inspect evidence/artifacts, configure an authorized repository profile, request reruns, and submit technical review findings |
| Viewer | Read permitted product state and review history; no policy or execution changes |
| Service/agent | Narrow machine permissions derived from an authenticated assignment; never a human approver |

One human may hold several roles. GitHub merge rights are independently controlled by the customer's GitHub organization. Possessing a Harmony role does not imply a GitHub right, and possessing a GitHub right does not imply tenant-admin authority.

## 4. Primary journeys

### 4.1 Onboard a company

The owner authenticates, creates a company, supplies a domain and company name, and chooses a business timezone. The default timezone is America/Los_Angeles for an unconfigured demo and UTC for API-created tenants; the creation response states the selected value. Production onboarding requires the owner to confirm it. All storage timestamps remain UTC.

The company agent investigates the website and returns a sourced profile: product, audience, category, region, likely competitors, relevant feedback sources, and uncertainties. Website claims are observations, not verified ownership or permissions. The owner confirms the product identity and resolves source/repository ambiguity. The owner then connects GitHub and Slack, selects the exact repository and review channel, and authorizes a monitoring policy.

Provisioning is asynchronous. The product shows provisioning, ready, or blocked with an actionable reason. It cannot report readiness until the tenant brain, QM deployment binding, artifact namespace, and execution profile pass a health check. Research-only readiness is separate from code-execution readiness.

### 4.2 Monitor and understand

Enabled sources are collected on schedule or webhook delivery. New and edited records are retained with source timestamps, ingestion time, identity, and coverage. The explorer validates and groups evidence, consults company knowledge, and produces ranked opportunities. It can recommend a feature, bug fix, investigation, support response, or no action.

The company agent performs bounded competitor research when it resolves a concrete product question. Competitor behavior is not counted as customer demand. Findings include observation dates and sources. Expired or unavailable research is represented honestly.

### 4.3 Select and prepare a candidate

Release-1 default is automatic selection for preview within explicit onboarding limits: at most one new automatic candidate per product per local calendar day, two active candidates per product, and the budget limits in 08. An owner can switch to manual selection or pause monitoring without deleting history. An explicit authorized feature request bypasses the automatic ranking threshold but still needs preview and implementation approval.

A candidate describes one coherent behavior change. The PM worker creates acceptance criteria and the engineer manager identifies relevant repository areas. The frontend worker modifies the real connected application using its existing components. Before implementation approval, new server-side behavior is simulated even when writing it would be easy. Existing backend contracts can be consumed through synthetic test data. The preview must state all simulated dependencies.

### 4.4 Review a preview

The review package includes the problem, evidence, affected route, acceptance criteria, current revision, preview link and/or video according to preference, mocked behavior, limitations, and estimated remaining implementation scope. Default review preference is both. Video-only preference still requires a verified runnable build internally; preview-only preference skips video composition.

The reviewer may approve implementation, request changes, reject, or defer. If a design reviewer is configured, design approval precedes product approval. The same person may satisfy both roles, but both decisions must be explicit. Natural-language statements and emoji reactions do not constitute approval. The web review action and Slack action use the same server-side policy.

Requested changes produce a new revision and regenerate affected artifacts. The prior revision remains inspectable. Approval of revision 2 never approves revision 3. If an artifact expires, regenerate the review package and collect a new approval before new implementation work begins.

### 4.5 Complete implementation and open a PR

Implementation starts from the approved preview lineage, replaces mocks, implements validation/persistence/authorization, and verifies the accepted behavior. The review agent compares the diff and tests with both company knowledge and feature-specific evidence. Passing agent review is a necessary engineering gate, not merge authority.

The service opens or updates one PR for the candidate. It reports CI state and requested changes. A human merges in GitHub. A Slack command to merge returns the PR link and states that GitHub human merge is required under the current product policy. Merged does not imply deployed; deployment status changes only on trusted deployment evidence.

### 4.6 Retain learning

Accepted product rules and measured results are promoted from feature knowledge into company knowledge. A human's scoped correction must influence a new agent session and a related future candidate. Draft claims, failed experiments, and rejected ideas remain distinguishable from approved policy. The system explains a designer or engineer decision using recorded provenance rather than inferred blame.

## 5. Functional requirements

| ID | Requirement | Acceptance summary |
| --- | --- | --- |
| FR-001 | Create and provision isolated company environments | Two tenants complete onboarding without shared private data |
| FR-002 | Connect a website and establish a sourced company profile | Every consequential extracted claim has a source or uncertainty |
| FR-003 | Authenticate people and enforce roles | Denied actions fail at the API as well as the user surface |
| FR-004 | Connect GitHub and validate a repository profile | Exact repo, root, branch, commands, and baseline are persisted |
| FR-005 | Connect Slack and bind its installation/channel | Cross-workspace or stale bindings cannot authorize actions |
| FR-006 | Discover and enable feedback sources | Discovery alone cannot start private ingestion |
| FR-007 | Collect, edit, deduplicate, and tombstone feedback | Replayed batches do not inflate opportunity counts |
| FR-008 | Validate trust and product relevance separately | Angry actionable criticism remains available |
| FR-009 | Cluster and rank opportunities | Ranking factors and evidence are inspectable |
| FR-010 | Research competitors for relevant business questions | Competitor observations remain distinct from demand evidence |
| FR-011 | Run a company agent and a QM engineering organization | Tasks and results cross the native delegation contract |
| FR-012 | Create feature knowledge scoped to each candidate | A worker cannot retrieve another candidate's private drafts |
| FR-013 | Build a real frontend preview in the existing app | Actual changed route is interactive with disclosed mocks |
| FR-014 | Produce revision-bound preview/video artifacts | Every artifact resolves to a verified build and scenario |
| FR-015 | Enforce design/product approval and revision | Duplicate and stale decisions cannot launch unauthorized work |
| FR-016 | Complete the approved implementation | Production behavior passes AC and mock-removal checks |
| FR-017 | Review and publish a PR | Review references exact head SHA; only one PR per candidate |
| FR-018 | Preserve human-only merge | No service path or worker credential permits merge |
| FR-019 | Observe merge, deployment, and outcomes separately | Release claims follow trusted evidence |
| FR-020 | Promote knowledge and apply corrections | A fresh task uses a scoped approved correction |
| FR-021 | Pause, cancel, retry, resume, and explain work | Restart recovers work without duplicating side effects |
| FR-022 | Enforce per-company budgets and fairness | One noisy company cannot exhaust all execution capacity |
| FR-023 | Support export, retention, deletion, and audit | Derived memory and artifacts follow deletion lineage |
| FR-024 | Label demo fixtures and simulated integrations | A fixture run is visibly distinct from a live run |

## 6. Nonfunctional targets

NFR-001: tenant confidentiality is a correctness requirement. NFR-002: durable transitions and side effects use idempotency and reconciliation. NFR-003: accepted webhook persistence has p95 under 1 second under the qualification load; Slack acknowledgement target is under 2 seconds. NFR-004: a ready execution slot starts an accepted task within 60 seconds p95, excluding provider outage and deliberate budget queues. NFR-005: ordinary API reads have p95 under 500 ms at 20 active tenants, excluding artifact streaming and model calls. NFR-006: no model-latency or preview-generation SLA is advertised until measured; report stage progress and timeout instead. NFR-007: monthly control-plane availability target is 99.5% for the pilot, with model/source availability reported separately. NFR-008: pilot recovery objectives are database RPO 15 minutes and RTO 4 hours, demonstrated in a recovery drill.

These are targets to verify, not achieved performance claims. Accessibility requirements for the service's review controls include keyboard operation, visible focus, meaningful names, and text alternatives to video-only information.

## 7. Release boundaries

Release 1 excludes native mobile application builds, multiple Git providers, automatic merge/deploy, arbitrary production database access, training a company model, marketplace plugins, billing-provider integration, and the deferred sponsor integrations. A manual pilot subscription record and hard usage caps are sufficient; usage accounting must still be correct.

Research, planning, previews, and real PRs are mandatory. A hackathon demo may seed tenant setup, prepopulate a company brain, and use labeled feedback fixtures. It may not stub tenant isolation, revision binding, the actual code patch, the approval transition, or the fresh-session learning proof and describe the resulting system as end-to-end verified.
