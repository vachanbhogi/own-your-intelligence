# Harmony engineering handoff

Version 1.0 · 27 September 2026 · Status: approved design baseline for implementation

Harmony is the working product name. This package defines a multi-company SaaS that learns about a business, continuously collects customer and market evidence, proposes changes to its connected software, prepares a working frontend preview, and completes an approved implementation through a reviewable pull request.

The user delegated product and technical decisions for this handoff. Decisions below are therefore normative for the first release. They are not claims that the software, forks, integrations, or infrastructure have already been implemented or tested. Actual account identifiers, credentials, repository commit pins, and domains must be supplied during bootstrap; their absence does not leave the product architecture undecided.

## Read this first

The product combines three modified open-source systems:

- UFO hosts the company agent, authenticated customer conversation, and our durable product workflow extension.
- QM hosts the principal engineering manager and bounded specialist worker groups.
- GBrain provides company knowledge and isolated feature knowledge with provenance and explicit publication.

Our own code adds the domain model, tenant provisioning, feedback connectors, delegation contract, approval policy, repository execution, artifacts, and operational controls. Missing upstream APIs are implementation tasks. Core changes are permitted when extension points cannot express the required behavior.

The full feedback-to-PR lifecycle is in scope. Detailed visual styling of the SaaS is not specified here. Screens and interactions are defined only to the extent required to implement behavior and permissions. Superset, Memorable, and River are deferred and are not dependencies of release 1.

## Reading paths

| Reader | Start with | Then read |
| --- | --- | --- |
| Engineering lead | 01, 02, 03 | 04, 13, 15, 16 |
| Backend and platform engineer | 03, 05, 06 | 07, 12, 13 |
| Agent engineer | 07, 08, 09 | 04, 10, 14 |
| Repository/preview engineer | 11 | 06, 07, 12, 14 |
| QA and release engineer | 14 | 02, 07, 13, 15 |
| Product/review owner | 01, 02 | 09, 10, 11 |

## Document index

1. [Product requirements](01-product-requirements.md): user journeys, scope, acceptance, roles, and defaults.
2. [Decisions and invariants](02-decisions-and-invariants.md): authoritative decisions and conflict resolution.
3. [System architecture](03-system-architecture.md): component ownership, topology, and request paths.
4. [Upstream forks and integration](04-upstream-forks-and-integration.md): source strategy and required changes in each repository.
5. [Domain model and storage](05-domain-model-and-storage.md): entities, integrity constraints, retention, and migrations.
6. [API and event contracts](06-api-and-event-contracts.md): versioned operations, schemas, authentication, and delivery rules.
7. [Workflows and state machines](07-workflows-and-state-machines.md): transitions, DAG execution, approvals, retries, and cancellation.
8. [Agent roles and execution](08-agent-roles-and-execution.md): task contracts, grants, context, budgets, and completion checks.
9. [GBrain knowledge and provenance](09-gbrain-knowledge-and-provenance.md): memory boundaries, publication, corrections, and decision lineage.
10. [Feedback and market intelligence](10-feedback-and-market-intelligence.md): discovery, collection, validation, clustering, and ranking.
11. [Repository, preview, and delivery](11-repository-preview-and-delivery.md): existing-codebase changes, videos, implementation, and PRs.
12. [Identity, security, and isolation](12-identity-security-and-isolation.md): authorization, credentials, untrusted execution, and threat controls.
13. [Infrastructure and operations](13-infrastructure-and-operations.md): development and production topology, capacity, recovery, and observability.
14. [Testing and acceptance](14-testing-and-acceptance.md): release gates and concrete adversarial and functional scenarios.
15. [Implementation backlog and runbook](15-implementation-backlog-and-runbook.md): ordered work packages, team ownership, and coding-agent instructions.
16. [Sources, assumptions, and coverage](16-sources-assumptions-and-coverage.md): evidence register, known limitations, and requirements traceability.

[ALL-SPECIFICATIONS.md](ALL-SPECIFICATIONS.md) is a concatenated reading copy. The individual numbered documents are authoritative editing units; regenerate the combined copy after edits. [harmony-engineering-handoff.zip](harmony-engineering-handoff.zip) contains the complete handoff for importing into an engineering repository. [VALIDATION.md](VALIDATION.md) records the documentation checks and their limits.

## Interpretation rules

MUST denotes a release requirement. SHOULD permits a documented implementation exception approved by the engineering lead. MAY is optional. Product defaults are explicit policy and may be changed only through the versioned configuration operations specified here. A worker prompt cannot change policy.

When documents disagree, 02 governs architectural policy, 05 governs data identity, 06 governs wire formats, and 07 governs legal state transitions. File a specification defect and reconcile the documents before coding around the conflict. A documented upstream capability is not an integration test. Existing paths and proposed paths are explicitly distinguished in 04 and 16.

## Baseline that must survive every implementation shortcut

1. Customer data, credentials, code execution, and knowledge are isolated by company.
2. Feedback is evidence, never execution authority.
3. A frontend preview uses the customer's actual connected application and discloses simulated behavior.
4. Implementation approval binds a precise revision and review package.
5. Human-only GitHub merge is release-1 policy; agents cannot merge, including when asked in Slack.
6. Restart, retry, and duplicate delivery cannot silently create duplicate jobs, PRs, or approvals.
7. A fresh agent can retrieve a verified company correction without inheriting the previous session.

## What is intentionally not delivered

This package is the engineering specification. It does not contain deployed services, production credentials, a verified source checkout, or generated client libraries. Proposed commands for our own future tooling are labeled as deliverables. The backlog establishes the tests that convert these specifications into demonstrated behavior.
