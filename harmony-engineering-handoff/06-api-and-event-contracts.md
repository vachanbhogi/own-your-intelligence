# 06 · API, delegation, and event contracts

## 1. Contract status and conventions

Every Harmony endpoint and event in this document is a new interface to implement. These are not asserted to be existing UFO, QM, or GBrain APIs. Upstream calls sit behind adapters. Contract major 1 is the release baseline.

Public routes use HTTPS under /api/v1. Internal routes use TLS under /internal/harmony/v1. JSON is UTF-8, Content-Type application/json, with unknown top-level fields rejected on command payloads. Limit ordinary command bodies to 256 KiB; large evidence, context, logs, and artifacts use expected-upload operations. Lists use opaque cursor pagination with limit 50 by default and 200 maximum. All list queries are tenant-bound before filtering.

IDs are UUID strings; examples use syntactically valid sample UUIDs with no relation to a real tenant. Dates are RFC 3339 UTC. Error responses carry a stable code, safe message, request_id, retryable boolean, and optional field errors. Stack traces and secrets never appear in public errors.

Human requests derive tenant from the authenticated active membership. A tenant assertion in a selected-resource URL must match. Internal requests derive tenant from the verified service grant and deployment binding. A payload tenant_id is an assertion to compare, not an authority to adopt.

## 2. Authentication and headers

Human browser requests use a secure HttpOnly SameSite session cookie plus CSRF protection on mutations. API clients use scoped bearer tokens minted by the service. Slack and GitHub ingress use provider-specific verification and map the verified installation to tenant context.

Internal transport uses mTLS between services plus an audience-bound signed JWT. Required claims are iss, sub, aud, tenant_id, task_id when task-bound, generation when attempt-bound, actions, iat, exp, and jti. Tokens expire after 5 minutes; a live lease permits refresh. Revocation, tenant status, and attempt generation are checked server-side on every mutation. JWT verification pins issuer and allowed algorithms, validates audience and expiry, and uses a rotated trusted key set. A role string in the body cannot expand actions.

Required mutation headers are Idempotency-Key and X-Request-ID. Use W3C traceparent when available. A request's canonical hash excludes transport timestamps and includes method, route identity, resource identifiers, and body. Reuse of a key with a different hash returns 409 IDEMPOTENCY_CONFLICT. The original accepted operation/result is returned for identical retries.

## 3. Public API catalogue

| Method and route | Purpose | Authority / result |
| --- | --- | --- |
| POST /tenants | Create company and provisioning operation | Authenticated human; 202 operation |
| GET /tenant | Current company, policy and readiness | Member; 200 |
| PATCH /tenant/policy | Versioned policy update with expected version | Owner/admin within role bounds; 200 or 409 |
| POST /memberships | Invite or bind approved member | Owner/admin; 202 |
| PATCH /memberships/{id} | Roles/status change | Owner/admin; last-owner guard |
| POST /products | Register product website and identity | Owner/admin; 201 |
| PATCH /products/{id} | Update confirmed product configuration | Owner/admin; expected lock_version |
| POST /connections/{provider}/begin | Start authorized OAuth/install flow | Owner/admin; one-time flow reference |
| POST /repositories/{id}/verify | Validate repository profile | Engineer/admin; 202 |
| POST /sources/discover | Investigate possible feedback sources | Authorized member; 202 |
| POST /sources | Enable exact source with access/coverage config | Owner/admin; 201 |
| POST /sources/{id}/poll | Queue one authorized poll | Engineer/admin; 202, rate/budget guarded |
| POST /feedback/imports | Import labeled review dataset | Owner/admin; expected upload reference |
| GET /opportunities | Paginated ranked opportunities | Member |
| POST /opportunities/{id}/select | Create candidate | Approver/admin; 202 |
| POST /candidates | Explicit feature request | Approver/admin; 202 |
| GET /candidates/{id} | Phase, status, active revision, lineage | Member |
| GET /candidates/{id}/events | Durable event history / SSE resume | Member; last-event cursor |
| POST /candidates/{id}/revisions | Request a material change | Approver/design reviewer in scope; 202 |
| POST /candidates/{id}/pause | Pause admission and request safe stop | Approver/admin; 202 |
| POST /candidates/{id}/resume | Resume after current policy checks | Approver/admin; 202 |
| POST /candidates/{id}/cancel | Terminal cancellation | Approver/admin; 202 |
| POST /review-requests/{id}/decisions | Approve/change/reject/defer | Required human role; 200/409 |
| GET /artifacts/{id}/access | Create short-lived authorized viewing grant | Member with resource access |
| GET /tasks/{id} | Safe progress and result projection | Member |
| POST /tasks/{id}/retry | Retry a failed/blocked task after reconciliation | Engineer/admin; 202 |
| POST /knowledge/decisions | Propose or explicitly publish scoped decision | Publication role enforced |
| POST /knowledge/decisions/{id}/withdraw | Withdraw/supersede and propagate | Owner/admin or authorized publisher |
| POST /tenant/export | Generate tenant-owned export | Owner; 202 |
| GET /operations/{id} | Inspect a durable asynchronous operation | Authorized resource owner/member |
| DELETE /tenant | Begin verified deletion process | Owner with recent reauthentication; 202 |

Provider callbacks are under /webhooks/slack, /webhooks/github, and registered source-specific paths. Their routing is not chosen by an arbitrary URL in a worker result. There is no merge endpoint in release 1.

## 4. Candidate creation

~~~json
{
  "product_id": "11111111-1111-4111-8111-111111111111",
  "request_origin": "direct_human",
  "problem": "Users need to export the filtered orders they can currently see.",
  "desired_outcome": "Download permitted visible columns as CSV.",
  "evidence_revision_ids": [],
  "review_preference": "both"
}
~~~

The server supplies tenant, actor, repository binding, policy, candidate ID, revision, and workflow plan. A user cannot supply a privileged task type or arbitrary shell command in this endpoint. Direct requests are preserved as human instructions, not counted as independent customer reviews.

202 returns operation_id, candidate_id, phase=proposed, execution_status=active, and a status URL. Validation errors return 422. Capacity/budget refusal returns 409 with a stable reason and no partial candidate side effect unless the response explicitly identifies a created paused candidate.

## 5. UFO-to-QM assignment API

New QM endpoints are POST /internal/harmony/v1/assignments, GET /assignments/{id}, POST /assignments/{id}/cancel, and GET /capabilities. Assignment admission returns 202 only after the assignment and launch outbox are durable.

~~~json
{
  "schema_version": "1.0",
  "assignment_id": "22222222-2222-4222-8222-222222222222",
  "tenant_id": "33333333-3333-4333-8333-333333333333",
  "task_id": "44444444-4444-4444-8444-444444444444",
  "attempt_id": "55555555-5555-4555-8555-555555555555",
  "generation": 1,
  "task_type": "pm_spec",
  "candidate_id": "66666666-6666-4666-8666-666666666666",
  "candidate_revision": 1,
  "input_manifest_id": "77777777-7777-4777-8777-777777777777",
  "context_manifest_id": "88888888-8888-4888-8888-888888888888",
  "policy_revision": 1,
  "deadline_at": "2026-09-28T18:30:00.000Z",
  "budget": {
    "max_model_micro_usd": 2000000,
    "max_wall_seconds": 900,
    "max_tool_calls": 120
  },
  "result_contract": "pm_spec.v1",
  "input_hash": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
~~~

The assignment body contains references and bounded metadata; content is fetched through granted artifact operations. The hash is illustrative and must be computed from real canonical inputs. For onboarding/research tasks without a candidate, candidate_id and candidate_revision are null; both must be null together. The task type must allow this. Generation starts at 1 and increases only on a new attempt.

The signed grant contains the same assignment/task/attempt/generation and permits only the named task type. QM compares each assertion. A mismatched tenant, stale generation, inactive tenant, unregistered type, invalid result contract, or missing budget reservation is rejected before a session is created.

Admission response fields are assignment_id, state=accepted, provider_run_id if already reserved, accepted_at, and input_hash. Identical retries return the same assignment. Changed requests require a new attempt or revision rather than mutation of an accepted body.

## 6. Runner API

The QM runner adapter uses an internal supervisor API for allocate, prepare, execute, inspect, stop, and destroy. All calls bind tenant, task, attempt, and generation. Allocate reserves an isolated container and resource limits. Prepare mounts only declared inputs. Execute accepts the registered sandbox command/file protocol, not privileged host shell access. Inspect reports actual process/container state. Stop sends cooperative termination and then bounded forced termination. Destroy is idempotent and verifies artifact/checkpoint persistence rules.

Heartbeats arrive every 15 seconds; lease duration is 60 seconds. A missed lease fences mutation immediately at the supervisor and brokers. The reconciler first confirms the old container is stopped or fenced before allocating a replacement attempt. Heartbeat failure alone does not authorize two concurrent writers.

## 7. Artifact upload and task result

POST /internal/harmony/v1/artifacts/expected creates a bounded upload with kind, task, generation, expected media type, maximum bytes, and permitted candidate revision. The broker returns one expected artifact ID and a short-lived upload capability. Completion triggers size/hash verification and content-specific checks. Storage paths and signed URLs are omitted from normal agent transcripts.

~~~json
{
  "schema_version": "1.0",
  "task_id": "44444444-4444-4444-8444-444444444444",
  "attempt_id": "55555555-5555-4555-8555-555555555555",
  "generation": 1,
  "outcome": "succeeded",
  "input_hash": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "result_contract": "pm_spec.v1",
  "result_artifact_id": "99999999-9999-4999-8999-999999999999",
  "artifact_ids": ["99999999-9999-4999-8999-999999999999"],
  "usage": {
    "model_micro_usd": 350000,
    "wall_seconds": 84,
    "tool_calls": 12
  },
  "completed_at": "2026-09-28T18:17:24.000Z"
}
~~~

Result ingress verifies credentials, generation, active revision, artifact ownership/status, and the named output schema. Usage is a worker report until reconciled with model/proxy receipts. A successful worker statement with missing artifacts becomes verification_failed. If outcome=blocked or failed, the payload includes a stable error code, retryability, safe explanation, and checkpoint references. Model-generated text cannot set outcome=succeeded without verifier acceptance.

## 8. Event envelope and catalogue

~~~json
{
  "schema_version": "1.0",
  "event_id": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  "event_type": "task.result_received",
  "tenant_id": "33333333-3333-4333-8333-333333333333",
  "aggregate_type": "task",
  "aggregate_id": "44444444-4444-4444-8444-444444444444",
  "aggregate_version": 4,
  "occurred_at": "2026-09-28T18:17:24.000Z",
  "correlation_id": "66666666-6666-4666-8666-666666666666",
  "causation_id": "22222222-2222-4222-8222-222222222222",
  "payload": {
    "attempt_id": "55555555-5555-4555-8555-555555555555",
    "generation": 1
  }
}
~~~

Event types are tenant.provisioned, integration.revoked, source.collection_completed, feedback.revision_created, opportunity.analyzed, candidate.created, candidate.revised, task.accepted, task.started, task.progressed, task.result_received, task.verified, task.failed, task.cancelled, preview.package_ready, review.decided, review.expired, implementation.verified, pr.synchronized, merge.observed, deployment.observed, knowledge.published, knowledge.withdrawn, and budget.exhausted.

The aggregate_version is monotonic within its aggregate. Consumers deduplicate by event_id, detect version gaps, and query authoritative state rather than inventing missing events. Progress may be coalesced; terminal domain transitions may not. An event is a statement that something happened, not a permission to perform any action named in free-form text.

QM callbacks go to a configured /internal/harmony/v1/events/qm endpoint. Requests carry a QM service identity bound to its tenant cell and the task generation. The inbox is committed before acknowledgement. Processing then validates the current state machine. A callback that cannot be authenticated is never persisted as trusted progress.

## 9. Review decision contract

~~~json
{
  "action": "approve",
  "expected_candidate_revision": 2,
  "expected_package_hash": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "expected_lock_version": 7,
  "comment": "Approved for full implementation."
}
~~~

Allowed actions are approve, request_changes, reject, and defer. request_changes requires a nonempty change request; defer requires an optional resume date or explicit manual-resume flag. The request route determines the gate. The server resolves actor from authentication and persists a provider event ID where applicable. Clients cannot submit actor_id or an arbitrary decision timestamp.

Slack actions carry an opaque review-request reference and nonce, not an unsigned JSON approval record. Verify the raw signed Slack payload, map workspace/user identity, acknowledge promptly after durable ingress, and process the same domain command used by the web surface. The human receives a clear stale/unauthorized/already-decided response when appropriate.

## 10. Knowledge gateway contract

Expose read_context, propose_knowledge, publish_decision, and withdraw_decision as separate capabilities. read_context takes a query, feature/candidate assertion, allowed record kinds, freshness requirements, and maximum returned bytes. The gateway computes actual source grants from the task, calls GBrain, and returns source/revision-tagged entries plus incomplete/stale flags.

Workers can propose or write feature-local knowledge. publish_decision requires explicit publication authority and a reviewed publication record. A separate read-only and write-only client may be used when upstream authentication schemas require it. The gateway must not pass unsupported actor/query fields blindly; inspect the pinned GBrain tool schema and record the tested mapping.

## 11. Error catalogue and retry semantics

| Code | HTTP | Behavior |
| --- | --- | --- |
| AUTH_REQUIRED / FORBIDDEN | 401 / 403 | Do not retry without changed credentials/authority |
| TENANT_MISMATCH | 403 | Reject and audit; never route to asserted tenant |
| STALE_REVISION / STALE_ATTEMPT | 409 | Fetch current state; old command cannot advance it |
| IDEMPOTENCY_CONFLICT / RESULT_CONFLICT | 409 | Human/operator investigation; do not mint a new key automatically |
| BUDGET_EXHAUSTED / CAPACITY_LIMIT | 409 | Queue or pause according to policy; no silent cap increase |
| CONTEXT_UNAVAILABLE | 503 | Retry boundedly; no empty-context fallback |
| SOURCE_AUTH_EXPIRED | 409 | Pause source and request reconnection |
| UNSUPPORTED_PROFILE | 422 | Explain failed repository support check |
| UPSTREAM_UNKNOWN | 202 | Reconciliation pending; no duplicate side effect |
| RATE_LIMITED | 429 | Honor Retry-After and source-specific budget |
| CONTRACT_INVALID | 422 | Fix producer/schema; no model retry loop |

Transport retries use exponential backoff with full jitter, starting at 1 second and capped at 60 seconds, five attempts before reconciliation/escalation. Domain retries have their own limits in 07 and cannot reset by changing the transport idempotency key.

## 12. Precise schema rules

Generate JSON Schema documents from these normative definitions and keep the examples above as conformance fixtures. Commands reject duplicate JSON keys, invalid Unicode, NaN/Infinity, and unknown fields. IDs are UUIDv4. Positive integers are 1 through 2,147,483,647 unless a narrower policy applies. Money/usage integers are nonnegative and no larger than 9,007,199,254,740,991. Hash is exactly 64 lowercase hexadecimal characters. No string is unbounded.

| Type | Required fields | Optional/nullable fields and bounds |
| --- | --- | --- |
| CandidateCreate | product_id UUID, request_origin enum, problem string, desired_outcome string, evidence_revision_ids UUID array, review_preference enum | opportunity_id UUID or null; problem/outcome each 1–8,000 chars; evidence <= 100; direct_human/feedback/demo origin; preview/video/both preference |
| Assignment | Every field shown in section 5 | candidate_id and candidate_revision both null only for allowed noncandidate types; no other omission; schema_version exact negotiated version; task_type/result_contract registered strings <= 64 chars |
| Budget | max_model_micro_usd integer, max_wall_seconds integer, max_tool_calls integer | All positive and bounded by policy/role cap |
| TaskResult | Every field shown in section 7 | error object required for failed/blocked; checkpoint_artifact_ids optional UUID array <= 20; success result_artifact_id nonnull; failed/blocked may use null; artifact_ids <= 100 |
| TaskError | code registered string, retryable boolean, message string | details_artifact_id UUID or null; message <= 2,000 chars |
| ReviewDecision | action enum, expected_candidate_revision positive int, expected_package_hash Hash, expected_lock_version positive int | comment <= 8,000 chars; requested_changes required 1–8,000 chars for request_changes; defer_until timestamp or null and manual_resume boolean for defer |
| EventEnvelope | Every field shown in section 8 | causation_id UUID or null; payload validates against event_type-specific schema |
| AsyncOperation | operation_id UUID, state enum, resource_type string, resource_id UUID or null, created_at timestamp, updated_at timestamp | result object or null, error TaskError or null, status_url string; state accepted/running/blocked/succeeded/failed/cancelled |
| ErrorResponse | code string, message string, request_id UUID, retryable boolean | field_errors array <= 50, current_version integer, operation_id UUID; no stack trace |

ReviewDecision validation: approve/reject omit requested_changes and defer fields. request_changes requires requested_changes and may include comment. defer requires exactly one of a future defer_until or manual_resume=true. CandidateCreate request_origin is checked against authenticated route/tool context; a human cannot spoof imported/live provenance by setting it.

Assignment input_hash is SHA-256 over RFC 8785 JCS bytes of the immutable input manifest. The manifest includes task type, stage, spec/context hashes, repository/profile/baseline references where relevant, policy revision, and allowed scope. The transport request hash separately covers the whole command. Results echo the admitted input_hash. Example hashes are illustrative, not asserted hashes of unavailable artifacts.

Review-package hash covers JCS bytes of its immutable manifest including tenant/candidate/revision, spec, preview/build, mock/scenario/fixture hashes, artifact IDs/digests, gates, and expiry. It excludes its own hash and temporary URLs. Artifact hash covers exact bytes. A package cannot be sealed while a required artifact is unverified.

## 13. Task registry and effect classification

| Task type | Execution class | Result contract | Candidate required |
| --- | --- | --- | --- |
| company_profile | Bounded UFO company-agent turn | research_report.v1 | No |
| source_discovery | QM explorer task | research_report.v1 | No |
| source_poll | Deterministic collector | collection_batch.v1 | No |
| opportunity_analysis | QM model task | opportunity_analysis.v1 | No |
| repo_assessment | QM model task plus verifier | repository_assessment.v1 | Yes |
| pm_spec | QM model task | pm_spec.v1 | Yes |
| design | QM model task | design_spec.v1 | Yes |
| frontend_preview | QM model task | code_change.v1 | Yes |
| build_preview | Deterministic runner job | build_receipt.v1 | Yes |
| verify_preview | Browser job plus optional bounded diagnosis | verification_report.v1 | Yes |
| compose_video | Deterministic media job | video_receipt.v1 | Yes |
| implement | QM model task | code_change.v1 | Yes |
| verify_implementation | Tests plus QA task | verification_report.v1 | Yes |
| review_code | Independent QM model task | review_report.v1 | Yes |
| publish_pr | Deterministic broker operation | pr_receipt.v1 | Yes |
| observe_release | Deterministic provider reconciliation | release_observation.v1 | Yes |
| observe_outcome | Collection plus bounded analysis | outcome_report.v1 | Yes |
| publish_knowledge | Deterministic publication service | knowledge_receipt.v1 | Optional |

UFO's own bounded research turns still have the same task ledger, grants, budget, and result verification. Runtime binding is fixed in role configuration; an agent cannot choose another runtime to escape limits. Engineering tasks use QM. Only QM-bound task types are accepted by the assignment endpoint in section 5; deterministic jobs have their own trusted adapters.

Deterministic task types have no model authority to change effects. Every result contract includes schema_version, task/input identity, status, evidence/artifact references, and safe errors. Additional required content is: collection cursor/coverage/counts; opportunity components/evidence/disposition; repository baseline/profile/relevant paths/support status; design interaction states/rationale/AC; build commit/image/command/exit/digest; verification exact head/scenarios/assertions/receipts; video build/scenario/media/hash; PR repository/branch/head/external ID; release source/commit/environment; outcome metric/window/coverage/uncertainty; knowledge publication/source/page/revision/hash.

## 14. Owned feedback webhook

POST /ingest/v1/{source_public_id} accepts external_item_id, created_at, updated_at, text, optional rating/language/source_url, and optional event_kind=upsert or delete. Text is at most 32,000 characters; body at most 128 KiB. Delete events identify the prior item and omit text. Unknown fields are rejected. The server derives tenant/product/source from the opaque source binding.

Authenticate using a source-specific HMAC-SHA256 secret over version, timestamp, request ID, and exact body bytes; validate a five-minute freshness window and constant-time comparison. Deduplicate request ID and item revision separately. Return 202 only after durable ingress. Secret rotation permits the prior key for at most 24 hours unless immediately revoked. Browser contact forms post through the customer's backend so the secret is not exposed in public JavaScript.

## 15. Compatibility and notification semantics

Capabilities list exact supported schema versions as well as majors. Producers negotiate a common version. New optional fields are sent only to consumers advertising that minor version; strict 1.0 consumers do not silently ignore them. A major mismatch blocks admission with CONTRACT_INCOMPATIBLE. Schema migration never happens by prompt instruction.

Notifications have stable logical delivery keys and stored provider message references. If a send response is lost, reconcile through the authorized channel and operation marker before resending. If provider APIs cannot determine whether delivery occurred, show unknown and permit a clearly labeled replacement. Multiple visible messages still resolve to the same review-request ID and cannot create duplicate authority. The guarantee is idempotent decisions, not exactly-once third-party message delivery.
