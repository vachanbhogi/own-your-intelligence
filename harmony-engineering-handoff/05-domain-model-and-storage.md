# 05 · Domain model and storage contracts

## 1. Common conventions

All internal entity IDs are UUIDv4. External IDs are opaque text and are never substituted for internal IDs. Tenant-owned tables have tenant_id UUID NOT NULL, id UUID NOT NULL, created_at and updated_at timestamptz, and a primary/unique key on (tenant_id, id). Parent relationships use (tenant_id, parent_id) foreign keys. Global tenant-directory and authentication lookup tables are the documented exceptions.

Timestamps are UTC and serialized as RFC 3339 with milliseconds and Z. Revisions are positive integers. Monetary values are integer micro-USD. JSON numbers must remain within the interoperable safe-integer range for integer fields. Hashes are lowercase SHA-256 hex strings over RFC 8785 JCS canonical UTF-8 JSON or exact file bytes as specified by the field. Git commits are opaque full SHA strings validated by Git, not assumed to be permanently 40 characters. Object keys are broker-generated, never directly concatenated from user filenames.

Mutable aggregate rows include lock_version, incremented on each state-changing transaction. Immutable records have no generic update endpoint. Operational append-only ledgers may redact/delete protected content under the retention workflow; immutable means no silent business-history rewrite, not exemption from deletion requirements.

## 2. Tenant and access entities

| Entity | Required fields beyond common columns | Constraints and meaning |
| --- | --- | --- |
| tenant | name, status, timezone, policy_revision, knowledge_epoch | status provisioning/active/suspended/deleting/deleted; timezone must be valid IANA |
| principal | auth_subject, display_name, status | Global authentication identity; no implicit cross-tenant rights |
| membership | principal_id, roles, status | Unique tenant/principal; at least one active owner until deletion |
| tenant_binding | ufo_workspace_id, qm_deployment_id, qm_scope_id, gbrain_binding_id, worker_pool_id | One active binding per tenant; changes operator-controlled and audited |
| tenant_policy | revision, policy_json, actor_id, policy_hash | Immutable revision; tenant points to current policy |
| integration | kind, external_account_id, status, credential_ref, granted_scopes, consent_actor_id | Credentials live outside DB; provider account identity verified |
| slack_binding | integration_id, workspace_id, channel_id, thread_policy | Unique active installation/workspace binding; channel selected by authorized owner |
| service_grant | subject, audience, resource_id, actions, expires_at, revoked_at, generation | Exact resource capability; no wildcard worker grants |

Roles may be stored as a normalized membership_role table rather than an array; the public contract is unchanged. Role edits are transactional and immediately revoke affected cached access. The last owner cannot be removed through ordinary membership operations.

## 3. Product and repository registry

| Entity | Fields | Constraints |
| --- | --- | --- |
| product | name, website_url, confirmed_identity, status, review_preference, selection_mode | One active product per tenant in release 1 |
| repository | integration_id, provider, external_repo_id, owner, name, default_branch, app_root, status | provider=github; external_repo_id globally bound to at most one active tenant |
| repository_profile | repository_id, version, manifest_json, manifest_hash, verified_base_sha, verified_at | Immutable; includes install/build/start/test commands and protected paths |
| product_repository | product_id, repository_id, profile_version | One active mapping in release 1 |
| source | product_id, kind, external_identity, access_mode, coverage, status, schedule_id, config_revision | Unique product/kind/external_identity; source ownership verified when required |
| source_cursor | source_id, cursor_json, checkpoint_at, last_success_at, lease_generation | Cursor update only after batch commit |

A repository rename changes display fields, not identity. A removed installation or changed repository access immediately marks the mapping blocked. Profiles are pinned into task assignments so a running task cannot silently adopt a changed start command.

## 4. Evidence and opportunity entities

feedback_item: source_id, external_item_id, current_revision, first_seen_at, source_deleted_at, duplicate_group_id. Unique (tenant_id, source_id, external_item_id). For sources without stable IDs, derive an external key from source identity, normalized author identifier where permitted, source timestamp, and content hash; mark identity_quality=derived.

feedback_revision: feedback_item_id, revision, provider_created_at, provider_updated_at, ingested_at, raw_artifact_id, sanitized_text, content_hash, language, rating, source_url, trust_labels, relevance_labels, fixture_flag, coverage_snapshot. Unique item/revision and item/content_hash/provider_updated_at. Preserve edits rather than overwriting quoted evidence.

collection_batch: source_id, operation_id, state, cursor_before, cursor_after, page_receipts, item_count, started_at, completed_at, failure_code. Pages can commit independently with an internal checkpoint, but the advertised successful source cursor advances only through committed pages. Failed partial batches retain their checkpoints.

opportunity: product_id, title, problem_statement, disposition, confidence, score_components, score, model_run_id, analysis_version. Disposition is investigating/proposed/selected/deferred/rejected/support_only/no_action. Score is a reproducible display projection, not authority.

opportunity_evidence: opportunity_id, feedback_item_id, feedback_revision, quote_start, quote_end, evidence_role, attribution_quality. Evidence role is demand/contradiction/context. Unique opportunity/item/revision/role. Quotes must match stored sanitized text offsets or an approved redaction map.

market_observation: product_id, subject_entity_id, claim, observed_at, expires_at, source_artifact_id, source_url, confidence, status. Competitor observations are not feedback items and do not inflate demand counts.

## 5. Candidate and revision entities

candidate: product_id, opportunity_id nullable for explicit requests, request_origin, current_revision, phase, execution_status, blocked_reason, lock_version, active_plan_id, owner_principal_id. Request origin is feedback/direct_human/demo. Phase vocabulary is defined only in 07. execution_status is active/paused/blocked/terminal. Failure does not erase the phase.

candidate_revision: candidate_id, revision, spec_artifact_id, spec_hash, acceptance_artifact_id, context_manifest_id, baseline_sha, preview_sha nullable, mock_manifest_id nullable, created_by, supersedes_revision nullable. Unique candidate/revision. A row is sealed before a review package is created; later changes require a new revision.

context_manifest: candidate_id, revision, knowledge_epoch, entries_json, retrieval_policy_version, digest. Entries identify brain binding, source, page identity, revision/hash, excerpt artifact, trust type, observed freshness, and selection rationale. Snapshots hold the authorized text actually supplied to workers.

workflow_plan: candidate_id, revision, plan_version, template_version, nodes_json, edges_json, graph_hash, status. Immutable once admitted. Changes create a new plan version and explicitly supersede affected nodes. Active plan IDs cannot point to another revision.

task: candidate_id nullable for onboarding/collection, revision nullable, plan_id nullable, node_key, task_type, status, input_hash, assignment_artifact_id, budget_reservation_id, attempt_generation, current_attempt_id, deadline_at, not_before, result_manifest_id. Unique (tenant_id, plan_id, node_key), plus a stable logical operation key for non-plan tasks.

task_attempt: task_id, assignment_id, generation, provider_run_id, qm_session_id, swarm_id, worker_container_id, lease_expires_at, heartbeat_at, state, started_at, finished_at, result_hash, error_code. Unique task/generation and tenant/assignment_id. assignment_id is stable for retries of one attempt and changes for a new generation. Only the current leased generation may publish accepted results.

## 6. Artifacts, reviews, and delivery

artifact: kind, tenant_id, candidate_id nullable, revision nullable, task_id, attempt_generation, object_key, sha256, byte_size, media_type, status, retention_until, fixture_flag. Status expected/uploaded/verified/quarantined/expired/deleted. The worker cannot set verified. Required kinds include raw_evidence, sanitized_evidence, spec, context, patch, build_bundle, scenario, recording, video, verification, and result_manifest.

review_package: candidate_id, revision, package_version, spec_hash, preview_sha, build_digest, mock_manifest_hash, artifact_manifest_hash, manifest_json, package_hash, expires_at. Unique candidate/revision/package_version. All required artifact IDs must be verified and tenant-matching before publication.

review_request: package_id, gate, state, required_role, delivery_ref, created_at, expires_at. Gate is design or implementation. State pending/approved/changes_requested/rejected/deferred/expired/superseded. A unique active request exists for package/gate.

review_decision: review_request_id, actor_principal_id, action, comment_artifact_id nullable, authenticated_event_id, observed_package_hash, authorization_snapshot, created_at. Unique authenticated_event_id per provider binding. Decisions are append-only; the winning state transition is governed by lock_version. Replayed identical actions return the prior decision.

pull_request: candidate_id, repository_id, external_number, external_id, url, branch_name, baseline_sha, head_sha, reviewed_head_sha nullable, state, last_verified_at. Unique candidate and unique repository/external_id. state draft/open/closed/merged. PR branch is stable for the candidate and updated through compare-and-swap publication.

release_observation: candidate_id, repository_id, merged_sha nullable, deployed_sha nullable, environment, provider_delivery_id, status, evidence_artifact_id, observed_at. A merge observation and a deployment observation are separate rows/types. Outcome measurements reference a verified deployed revision when available.

## 7. Knowledge and audit entities

knowledge_publication: tenant_id, candidate_id nullable, publication_id, target_source, target_slug, expected_revision nullable, new_revision nullable, content_hash, evidence_refs, decision_actor_id, status, receipt_artifact_id. status pending/writing/verified/conflict/failed/withdrawn. publication_id is idempotent and globally unique within tenant.

knowledge_decision: kind, scope_json, author_principal_id, rationale, source_refs, effective_at, supersedes_id nullable, publication_id. Kind fact/hypothesis/constraint/decision/outcome/rejected_option. Only approved fact/constraint/decision/outcome entries are eligible for company-published. An observation can be published as a dated observation without pretending it is a universal fact.

audit_event: actor_type, actor_id, action, resource_type, resource_id, request_id, trace_id, before_hash, after_hash, decision_reason, occurred_at. Sensitive bodies are referenced through separately governed artifacts. Audit visibility is tenant-scoped; operators see redacted metadata unless support access is explicitly granted.

## 8. Reliability and accounting entities

outbox: event_id, aggregate_type, aggregate_id, aggregate_version, event_type, schema_version, payload, occurred_at, next_attempt_at, attempts, delivered_at. Written in the same transaction as the aggregate change. Unique event_id.

inbox: consumer_id, event_id, payload_hash, processed_at, outcome. Unique consumer/event_id. Duplicate event with a different hash is a protocol/security error, not a harmless retry.

idempotency_record: tenant_id, actor_id, route_key, idempotency_key, request_hash, operation_id, response_status, response_json, expires_at. Unique tenant/actor/route/key. Retain for 30 days; stable operation keys remain for the lifetime of the logical operation even after transport caches expire.

external_operation: kind, logical_key, request_hash, status, provider_reference, receipt_artifact_id, next_reconcile_at. status prepared/sent/unknown/succeeded/failed/compensating/compensated. Never repeat an unknown non-idempotent side effect without reconciliation.

budget_account: tenant_id, period_start, period_end, cap_micro_usd, reserved_micro_usd, settled_micro_usd, runtime_seconds_reserved, runtime_seconds_used. budget_reservation: account_id, candidate_id nullable, task_id, maximum_micro_usd, settled_micro_usd, status. Row locking prevents concurrent overspend at admission.

## 9. Transaction examples

### Approval transaction

1. Bind tenant context, select candidate and review request FOR UPDATE.
2. Verify current revision, package digest, unexpired artifacts, current approver role, active membership, and policy.
3. Insert or retrieve the idempotent review decision.
4. Change the gate state and, if all gates pass, advance the candidate phase.
5. Insert an outbox event and audit event.
6. Commit before acknowledging success. Worker launch happens afterward.

### Task completion transaction

1. Verify the signed assignment capability and current attempt generation.
2. Check task/candidate status, result schema, and verified artifact ownership.
3. Compare immutable input/spec/revision identifiers with admission values.
4. Commit the result manifest reference, success/failure state, settled usage, and outbox event.
5. Duplicate identical completion returns the existing result; a different completion hash returns RESULT_CONFLICT.

## 10. Indexing, deletion, and migration

Create indexes for due outbox rows, due schedules, task status/lease expiry, candidate product/phase, source/item identity, evidence cluster membership, current review requests, artifact expiry, and publication reconciliation. Avoid unbounded JSON scans on hot paths. Persist ranking components in typed columns or indexed projections if they become query predicates.

Default retention: raw source payload 30 days; sanitized feedback and opportunity history 365 days; preview runtime 30 minutes idle; review artifacts 90 days; task logs 30 days; PR lineage and minimal audit metadata 365 days. Tenant deletion revokes access immediately, stops work, and completes primary-store deletion within 7 days; encrypted backup expiry is at most 35 days. Restore procedures reapply deletion tombstones before serving traffic.

Use Alembic for Harmony Python-domain migrations. Upstream services retain their own migration systems. All cross-repository migrations are expand/contract: add nullable/new fields, deploy dual-compatible readers, backfill under tenant bounds, verify, then remove old fields in a later release. Rollback cannot pretend to undo an irreversible data transformation; retain forward-fix and restore instructions.
