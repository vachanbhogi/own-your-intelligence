# 09 · GBrain knowledge, provenance, and publication

## 1. Knowledge goals

GBrain must change what agents decide and build. Its value is demonstrated when a support observation, product decision, or engineering constraint affects a later task, including a task run by a fresh agent. Retrieving a note for display alone does not satisfy the integration requirement.

The company brain contains accumulated business understanding; feature knowledge holds work-in-progress evidence and decisions for one candidate. Session transcripts and workflow state are separate. A candidate can query approved company knowledge without receiving every other candidate's drafts.

## 2. Physical and logical layout

One tenant owns one GBrain database and service binding. Inside it:

| Source | Content | Writers | Readers |
| --- | --- | --- | --- |
| company-published | Approved product facts, constraints, decisions, shipping norms, outcomes | Publication service after authority checks | Company agent and authorized task roles |
| company-observations | Sourced website/market findings and unapproved themes | Explorer/analysis through gateway | Company agent; tasks explicitly granted relevant observations |
| feature-<candidate-uuid> | Evidence, spec, alternatives, code/review notes, decisions for one candidate | Assigned feature workers through scoped tools | Assigned workers; company agent; authorized reviewer |

Source naming is an organizational convention. Authorization is enforced by remote client grants and the gateway. A prefix is not a substitute for a permission boundary. Workers never receive direct database credentials or a trusted local CLI path that bypasses remote source restrictions.

The earlier term PR brain maps to feature source. The feature exists before a PR; the PR becomes a linked entity later. Separate physical databases per feature are unnecessary for release 1 and would complicate context sharing and lifecycle management.

## 3. Knowledge record types

Use a product-specific schema pack or gateway-enforced page schema. Required kinds are product, audience, source, competitor, observation, problem, feature, requirement, constraint, decision, experiment, code_change, review, release, and outcome. Each record carries title, body, kind, status, provenance, effective date, and optional expiry/supersession.

Status is draft, observed, proposed, approved, rejected, superseded, or withdrawn. An approved decision may refer to an uncertain observation while preserving that uncertainty. A rejected proposal is retained as a rejected option, never returned as current policy.

Mandatory provenance includes originating tenant/resource IDs, human or service author, source evidence references, model/run reference when generated, observed_at, recorded_at, and revision hash. For externally researched facts, preserve the exact source page artifact or permitted excerpt and retrieval date. For a human decision, preserve the authenticated instruction or review event.

## 4. Relationship vocabulary

| Relation | Example | Rule |
| --- | --- | --- |
| supports | Review evidence supports a customer problem | Evidence revision must exist and be accessible |
| contradicts | A recent support note contradicts an older assumption | Preserve both; do not average into false certainty |
| affects | Problem affects a product area/customer segment | Agent inference must be marked as such |
| constrained_by | Feature constrained by an export-permissions rule | Only current approved constraints drive mandatory checks |
| decided_by | Design choice decided by an authenticated reviewer | Do not infer author from nearby conversation text |
| supersedes | New decision replaces an earlier scoped decision | Explicit scope and effective date required |
| implemented_by | Requirement implemented by a code change | Link exact commit/PR and verification receipt |
| verified_by | Requirement verified by a test/scenario | Result must be a receipt, not a proposed test |
| observed_after | Outcome observed after a release | Does not imply causal proof |

Relations are explicit writes with provenance. Where upstream automatic linking is unavailable for remote writes, the gateway or an authorized maintenance job creates the edges. Do not claim graph completeness until relationship conformance tests pass.

## 5. Retrieval policy

Retrieval starts from approved company constraints applicable to the product and feature, then feature-local evidence and decisions, then specifically authorized observations. Prefer precise product/repository/scope matches and current effective records. Return contradictory or superseded information when it explains a conflict, but label it.

Every response includes incomplete, stale, and unavailable flags. A search returning no results is distinct from a source outage or rebuilding index. The gateway checks source health before allowing an empty result to mean no known constraint. Required decisions are fetched by ID as well as searched when the spec references them.

Freshness defaults: company website profile 30 days, competitor pricing/capability observations 7 days, repository assessment exact current baseline, and product decisions until explicitly superseded. Age alone does not delete a decision. New work must flag stale research and refresh it when consequential to selection.

## 6. Context snapshots

Before task admission, create a context manifest containing the exact authorized excerpts used, their page/source revisions, trust kinds, knowledge epoch, and selection rationale. Store the manifest and excerpt artifacts under the candidate revision. This allows later explanation of what the system knew when it acted.

The company knowledge epoch increments on publication, correction, or withdrawal. An admitted task may finish with its snapshot if the change does not affect its constraints. A workflow scan maps changed records to active context manifests. An affected candidate is paused for reassessment; safety/authorization changes immediately revoke relevant grants.

Historical snapshots are subject to evidence deletion and retention. If source text must be removed, keep a minimal redacted tombstone and hashes where permitted, and mark historical explanations as partially unavailable. Never retain forbidden text merely because an artifact was once called immutable.

## 7. Publication procedure

1. A worker or human creates a knowledge proposal with scope, kind, text, rationale, source references, and intended target.
2. The gateway checks that all sources are tenant-owned, permitted, and not withdrawn.
3. A human with publication authority approves a new company constraint/decision. A verified factual outcome may be published by a narrowly configured service policy; it must remain explicitly observational.
4. The publication service writes the expected page revision idempotently and retrieves it to confirm content/hash and source placement.
5. It records the receipt, increments the knowledge epoch, and emits knowledge.published.
6. Active contexts are checked for affected assumptions.

A successful code task is not automatically a successful product decision. Passing tests cannot create a universal product rule. Review feedback such as 'exports should contain visible columns on all reporting screens' becomes company policy only when the human explicitly states that scope and has authority. A single-screen correction remains local unless promoted.

## 8. Corrections and conflicts

Corrections name the record being changed, proposed replacement, scope, rationale, and effective date. If two authorized humans disagree, preserve both proposals and request a decision from the configured owner/approver. Do not apply last-message-wins to conflicting policy without an explicit supersession action.

GBrain write conflicts preserve the expected and observed revisions. The publication service retries only after re-reading and resolving the conflict; it never overwrites an unknown newer decision. A transient failure after write but before receipt commit is reconciled by publication ID and content hash.

Withdrawn knowledge is excluded from normal retrieval immediately through the gateway even if a search index is still rebuilding. Index and cache invalidation jobs must subsequently remove it. Old tasks that relied on the withdrawn record are located by context manifest references.

## 9. Attribution and design lineage

Every material design choice records alternatives considered, the selected option, decision-maker type and identity, evidence, rationale, affected acceptance criteria, and candidate revision. An agent can propose a choice; the record distinguishes that proposal from human acceptance.

If a founder later asks why a designer chose a layout or behavior, the company agent retrieves the decision record, review action, corresponding revision, and implementation link. It answers with the record's scope and uncertainty. It must not invent motive or assign fault. If no decision was recorded, it says the rationale is missing and identifies the observable code/review history.

## 10. Learning demonstration and acceptance

Use a product with Orders and Invoices screens. Seed a company rule that exports respect current filters. The first candidate adds Orders export. A human requests visible columns only and explicitly publishes that rule for all reporting screens. End the original agent sessions. Start a fresh Invoices candidate with different fields. It must retrieve the new rule, include it in AC, implement it, and verify it without a repeated user instruction.

Run the same test under a second tenant with a different export policy. Neither tenant can retrieve or apply the other's rule. Repeat with a withdrawn rule and a stale observation to prove that memory changes are operationally meaningful, not just appended notes.

## 11. Export and portability

Tenant export includes authorized knowledge pages, relationship records, publication history, and provenance references plus the domain export. The export must identify unavailable/deleted artifacts and include a manifest of hashes. Raw provider credentials, other tenants' records, and model-provider internal data are excluded. Export is an owner operation with a short-lived download grant.
