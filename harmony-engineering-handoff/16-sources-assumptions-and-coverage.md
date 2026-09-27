# 16 · Sources, assumptions, and requirements coverage

## 1. Evidence and status

Prepared 27 September 2026 from the attached transcripts, two architecture documents, two sketches, the visible planning discussion, and primary upstream/provider documentation. The user authorized the assistant to make and lock the implementation decisions in this package.

This is a design and implementation handoff. No upstream repository was cloned, built, deployed, or integration-tested in preparing it. Public documentation establishes available concepts and likely seams; W00 verifies exact code at pinned commits. Proposed paths, endpoints, contracts, policies, infrastructure, and product schemas are our design unless explicitly labeled documented upstream behavior.

## 2. Supplied context and precedence

| Input | Role in the handoff | Resolution |
| --- | --- | --- |
| Pasted text(2)(2).txt | Original feedback-to-preview-to-implementation product intent | Continuous multi-company SaaS and real-codebase preview retained |
| feedback-to-product-architecture(1)(2).md | Earlier component, evidence, artifact, and approval design | Revision binding, preview-first, provenance, and durable workflow retained |
| Pasted text(3).txt | UFO research and company-enrichment exploration; narrowing sponsor scope | Mandatory core is UFO/QM/GBrain; prior unsupported product conflations corrected |
| image(1).png | Early whiteboard workflow | Discovery, memory, coding, validation, preview/video flow retained conceptually |
| ARCHITECTURE.md | Latest company-agent, per-feature knowledge, review, human merge design | UFO company agent and QM workforce adopted; feature source replaces literal per-PR DB |
| image(2).png | Principal engineering manager with design/engineering swarms and DAG | Registered role hierarchy and validated task DAG adopted |
| Latest explicit user request | Authority to decide and prepare long engineering docs | Decisions locked; account secrets and source pins remain setup inputs |

The latest human-only merge requirement supersedes earlier discussion of an optional Slack-triggered merge. The older Superset/Memorable/River ideas are deferred rather than silently assumed integrated. Frontend preview before full implementation remains required even though the latest simplified pipeline sketch omitted that detail.

## 3. Primary source register

The links below were consulted in this conversation. They are moving upstream documentation, so record the actual commit/version at implementation bootstrap. Short descriptions identify the supported claim; they do not mean the whole Harmony design is provided upstream.

| Source | Primary reference | What it supports |
| --- | --- | --- |
| S01 | [UFO repository](https://github.com/ufo-ai/ufo-core) | Self-hostable runtime, remote execution, repository components, and documented sandbox caveats |
| S02 | [UFO specification](https://github.com/ufo-ai/ufo-core/blob/main/spec.md) | Runtime/extension seams, workspace concepts, durable turns, research provider interfaces |
| S03 | [QM repository](https://github.com/yc-software/qm) | Organization/scoped harness, Slack/web surfaces, backgrounds and sandbox architecture |
| S04 | [QM swarms](https://github.com/yc-software/qm/blob/main/docs/swarms.md) | Bounded swarms, worker identity/computers, messages, lifetime and delivery constraints |
| S05 | [QM memory providers](https://github.com/yc-software/qm/blob/main/docs/memory-providers.md) | Scope-aware external-memory routing, explicit writes, machine credentials and fail-open configuration caveat |
| S06 | [GBrain README](https://github.com/garrytan/gbrain/blob/master/README.md) | Sourced memory, corrections, remote access, retrieval and knowledge relationships |
| S07 | [GBrain brains and sources](https://github.com/garrytan/gbrain/blob/master/docs/architecture/brains-and-sources.md) | Database/source distinction and documented remote grant boundaries |
| S08 | [GBrain MCP administration](https://github.com/garrytan/gbrain/blob/master/docs/mcp/ADMIN.md) | Machine-client registration/access patterns and permission administration |
| S09 | [GBrain product site](https://gbrain.io/) | Team knowledge positioning; not proof of a SaaS provisioning API |
| S10 | [Slack request verification](https://docs.slack.dev/authentication/verifying-requests-from-slack/) | Signed raw-request verification and replay-time checks |
| S11 | [Slack interactions](https://docs.slack.dev/interactivity/handling-user-interaction/) | Interaction ingress and prompt acknowledgement requirements |
| S12 | [GitHub App installation authentication](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation) | Installation-scoped access and token-based repository operations |
| S13 | [Google review list API](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list) | Authorized Business Profile review collection endpoint; access must be configured |
| S14 | [Playwright video](https://playwright.dev/docs/videos) | Browser-session video capture capability |
| S15 | [Auth0 Universal Login](https://auth0.com/docs/authenticate/login/auth0-universal-login) | Hosted identity/login mechanism chosen for web authentication |
| S16 | [RFC 8785 JSON Canonicalization Scheme](https://www.rfc-editor.org/rfc/rfc8785) | Canonical JSON representation used for cross-language hashes |

## 4. Important fact/design distinctions

Documented: UFO has a self-hostable agent runtime and extension mechanisms. Designed here: the Harmony company workflow, tenant provisioning extension, native QM delegation tools, and domain API.

Documented: QM offers swarm coordination and external memory configuration. Designed here: task-generation fencing across services, our runner provider, company-scoped service admission, and the product-specific manager roles. Existing scope behavior is not treated as a proven SaaS boundary without tests.

Documented: GBrain exposes knowledge and remote grant concepts. Designed here: the three source classes, publication ledger, knowledge epoch, feature schemas, and deletion propagation. Automatic cross-source linking or a complete provisioning API is not assumed.

The prior transcript claimed a particular UFO competitive-intelligence skill and discussed a hosted enrichment precursor. This package does not rely on that unverified file path or assume the hosted onboarding implementation is public. Our website/profile/competitor workflow is specified independently using verified research/runtime building blocks.

Our AWS topology, resource limits, ranking formula, budgets, role policies, and retention periods are deliberate product/engineering defaults. They are not vendor recommendations, measured costs, or legal retention conclusions. Deployment must honor the actual source-provider access and data-handling permissions configured for the account.

## 5. Remaining setup facts, not unresolved product decisions

Exact organization/repository destinations, source commit pins, compatible toolchain/model versions, cloud account, DNS, Auth0 application identifiers, Slack/GitHub app identifiers, provider credentials, Google authorization, and named pilot reviewers are supplied during implementation. These values cannot be invented in a design document.

W00 records real source pins and adapter seams. W02 provisions the chosen topology. A required unsupported upstream capability becomes a fork/adapter implementation task. A missing external authorization becomes a clearly reported blocked connector. Neither permits silent removal of tenant isolation, approval binding, or evidence provenance.

## 6. Functional requirement traceability

| Requirement | Primary specification | Implementation packages | Acceptance tests |
| --- | --- | --- | --- |
| FR-001 Company isolation/provisioning | 03, 05, 12, 13 | W02, W18 | T01, T02, T43–T48 |
| FR-002 Sourced company profile | 09, 10 | W09 | T03, T14 |
| FR-003 Identity/roles | 06, 12 | W02, W14 | T43, T50–T52 |
| FR-004 GitHub/repository profile | 05, 11 | W10 | T05, T06 |
| FR-005 Slack binding | 06, 12 | W02, W14 | T21–T23, T50–T52 |
| FR-006 Source discovery/enablement | 10 | W08, W09 | T03, T04 |
| FR-007 Collection/edit/dedup/delete | 05, 10 | W08 | T07–T09, T12 |
| FR-008 Trust/relevance validation | 10, 12 | W08, W09 | T10, T11 |
| FR-009 Opportunity analysis | 10 | W09 | T13 |
| FR-010 Competitor research | 08, 10 | W09 | T14 |
| FR-011 Agent organization | 03, 04, 08 | W05–W07, W11 | T15, T38–T42 |
| FR-012 Feature knowledge | 05, 09, 12 | W04 | T16, T45, T46 |
| FR-013 Existing-app preview | 07, 11 | W10–W12 | T17, T18 |
| FR-014 Artifact integrity | 06, 11 | W13 | T19, T20, T49 |
| FR-015 Human revision/approval | 06, 07, 12 | W14 | T21–T23, T51, T52 |
| FR-016 Full implementation | 08, 11 | W15 | T24, T27 |
| FR-017 Review and PR | 07, 11 | W15 | T25, T26 |
| FR-018 Human-only merge | 02, 11, 12 | W15 | T28, T53 |
| FR-019 Release/outcomes | 07, 11 | W17 | T29, T30 |
| FR-020 Corrections/learning | 09 | W16 | T31–T34 |
| FR-021 Durable control/recovery | 06, 07, 13 | W03, W05, W18 | T35–T42 |
| FR-022 Budgets/fairness | 02, 08, 13 | W03, W06, W18 | T54, T55 |
| FR-023 Export/retention/deletion/audit | 05, 09, 12, 13 | W02, W16, W18 | T58, T60, T61 |
| FR-024 Honest demo provenance | 10, 14, 15 | W08, W18 | T59 |

## 7. Nonfunctional and invariant coverage

| Requirement/invariant group | Tests / evidence |
| --- | --- |
| NFR-001 confidentiality; INV-001–INV-004 authority/input | T11, T43–T52 and production network probes |
| NFR-002 durability; INV-005–INV-007 result/idempotency/fence | T15, T37–T42 and contract property tests |
| NFR-003 webhook timing; NFR-005 API latency | T50, T60 load report with p95 measurements |
| NFR-004 queue start; FR-022 fairness | T54, T55, T60 under specified concurrency |
| NFR-006 measured model/preview latency | Agent eval report and stage timings; no invented SLA |
| NFR-007 availability | Monitoring/SLO report over pilot observation window |
| NFR-008 recovery | T60 restore drill with measured RPO/RTO |
| INV-008–INV-010 approval and code lineage | T19, T21–T27, T52 |
| INV-011–INV-012 secrets/revocation | T47, T48, T50–T53 |
| INV-013 knowledge correction | T31–T34, T56, T57 |
| INV-014 claims and provenance | T19, T24, T28–T30, T59 |
| INV-015 cancellation semantics | T35, T36, T40 |

## 8. Decision implementation coverage

ADR-001–ADR-006 are implemented by W00–W05. ADR-007–ADR-009 by W02/W04/W09. ADR-010–ADR-014 by W09/W12–W15/W17. ADR-015 by W10. ADR-016–ADR-018 by W03/W05/W13/W14. ADR-019–ADR-020 by W08/W09/W16. ADR-021–ADR-024 by W02/W03/W06/W18. ADR-025–ADR-026 are release-scope constraints verified in dependency/config review. ADR-027–ADR-030 are verified by W03/W14/W18 and the acceptance report. ADR-031 is implemented by W02 and ADR-032 by W01/W03 contract hashing tests.

## 9. Document quality checks and revision policy

Before delivery, check that every numbered document is linked from README, all local Markdown links resolve, JSON examples parse, fenced blocks are balanced, requirements have coverage, and state/policy terms agree. These checks validate the specification package, not the unimplemented product.

After implementation begins, update documents with exact code paths and commands while retaining the decisions and rationale. A material policy change uses the ADR process in 02. Regenerate ALL-SPECIFICATIONS.md and the archive from the authoritative numbered files. Keep the source register's verification date and distinguish fresh code evidence from older public documentation.
