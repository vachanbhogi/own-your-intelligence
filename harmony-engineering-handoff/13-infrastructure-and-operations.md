# 13 · Infrastructure, deployment, and operations

## 1. Reference deployment decision

The pilot production reference is AWS us-west-2 with a shared UFO/Harmony control tier, managed Postgres, private S3-compatible object storage, tenant-specific QM/GBrain service cells, and dedicated EC2 worker VMs per tenant. Shared and tenant service containers run in ECS; service cells may use Fargate because they do not execute customer shell code. Customer code runs only on the dedicated worker VM under the runner supervisor.

This is our chosen deployment design, not a claim that upstream repositories already ship matching infrastructure. Terraform and container build/deployment definitions are W01/W02 deliverables. Equivalent providers are future deployments of the same contracts; the first engineering team should implement this reference rather than maintain several cloud variants.

## 2. Development topology

Local development uses Linux or a Linux VM with Docker, the three source checkouts, Postgres, and a local S3-compatible service. Native language/toolchain versions come from the pinned upstream manifests and are recorded in the release lock. Do not hardcode an assumed Node/Bun/Python version without the W00 audit.

The integration repository must provide a proposed ./dev up command to build/start the stack, ./dev seed to create two fixture tenants, ./dev doctor to check readiness, ./dev test-contracts, and ./dev down. These commands do not exist in this handoff; implementing them is part of W01. The README must state exactly which services use real providers and which use fixtures.

Local secrets use an ignored file or local secret store. Demo data has no real customer credentials. Model access can use a test provider for unit tests, but the real-agent integration gate uses a configured model and records usage. A local single-host setup cannot qualify production tenant isolation.

## 3. Environments and promotion

Use development, staging, and production with separate cloud accounts or equivalently strong account/project boundaries. Production credentials and customer data are not copied into staging. Each release includes source SHAs, container digests, contract major/minor, migration versions, prompt/policy versions, and qualification report.

Deploy database expansion migrations before compatible service changes. Deploy tenant cells to a canary tenant, run synthetic contract checks, then roll through remaining tenants in bounded batches. Shrinking schema or removing contract fields occurs only after all consumers have upgraded. Rollback pins previous service images and uses compatible data schemas; an irreversible migration requires a forward-fix or tested restore plan.

## 4. Tenant provisioning

Provisioning is a durable workflow: reserve tenant ID -> create databases/roles -> create secret references -> start QM/GBrain service cells -> register UFO workspace and tenant bindings -> create knowledge sources/grants -> provision worker-pool metadata -> health check -> mark ready.

Every step is idempotent and has a reconciliation key. A crash after a database is created but before the workflow receipt is recorded must discover and reuse it. Failed provisioning enters blocked with cleanup/resume metadata. Tenant cells have no public ingress. The worker VM can be created on first code task to reduce idle cost; readiness reports distinguish control-ready from execution-warming.

Provisioning/deletion roles are separate from routine application roles. A request-serving process cannot create arbitrary cloud resources or databases from user text.

## 5. Runner capacity and resources

Default job container resources are 2 vCPU, 4 GiB memory, and 10 GiB writable disk. Build profiles may request up to 4 vCPU, 8 GiB, and 20 GiB after operator capacity configuration. Container memory/CPU/disk limits are enforced. A tenant worker VM must have capacity for its configured slots plus supervisor overhead; exact instance type is selected from benchmarked compatible images during W02 and recorded, rather than guessed in this document.

Initial global concurrency is 20 worker attempts with round-robin tenant fairness. Per-tenant default is four; per-candidate maximum is three. Admission reserves a global slot, tenant slot, and budget before allocation. Queue position and warming state are visible. A large tenant cannot consume every global slot while others have queued work.

Worker images are immutable and signed/pinned by digest. They contain only the approved runtime/tooling. Dependency installation occurs in the job workspace. Image upgrades invalidate caches and rerun repository-profile verification where relevant. Idle VMs stop after 30 minutes with no running preview/task and no unsettled cleanup. Durable inputs/results must be uploaded first.

## 6. Health and readiness

Liveness checks only process health. Readiness checks database access, schema/contract compatibility, identity keys, outbox operation, and required dependencies. Tenant readiness includes its QM/GBrain cell, source grants, repository profile, and runner availability class. A healthy HTTP process with an unavailable brain is degraded, not fully ready for knowledge-dependent work.

Expose versioned capability endpoints privately. Include build SHA, supported contract majors, enabled role/result schemas, sandbox provider, and health summary. Do not expose secrets, cloud account details, or customer identifiers to unauthenticated probes.

## 7. Observability

Every request/task/event carries request_id, trace_id, tenant_id, candidate_id where relevant, revision, task_id, attempt_id, and generation. Structured logs include stage, outcome, duration, safe error code, and receipt references. Log bodies are redacted and bounded. Tenant IDs are high-cardinality trace/log fields, not unbounded metric labels.

Required metrics include API latency/error rate, outbox age, inbox failures, due-source lag, worker queue age, active/fenced attempts, provisioning duration, source auth failures, model spend/reservations, preview success rate, approval age, PR publication conflicts, GBrain retrieval/publication failures, and deletion backlog.

Audit events record authority and decision provenance. Operational logs are not a substitute for audit. Model transcripts are tenant-private artifacts with short retention and redaction; they do not include hidden reasoning or provider secrets.

## 8. Alerts and runbooks

| Alert | Threshold | First response |
| --- | --- | --- |
| Oldest outbox event | > 2 minutes for 5 minutes | Check dispatcher/database; avoid manual duplicate sends |
| Stale active lease | > 2 minutes beyond expiry | Fence/inspect runner before replacing attempt |
| Tenant context unavailable | Three consecutive required-read failures | Pause tenant knowledge-dependent admission; inspect GBrain health |
| Webhook verification spike | > 20 failures in 5 minutes | Inspect routing/signing configuration; never disable verification |
| Unknown PR operations | Any older than 5 minutes | Reconcile by branch/operation marker |
| Budget accounting mismatch | Any negative balance or missing receipt > 1 hour | Freeze new paid work for affected account and reconcile |
| Deletion deadline risk | Primary deletion pending > 5 days | Escalate owner of each remaining store |
| Source lag | > 3 scheduled intervals | Check provider auth/quota/coverage and notify tenant once |

Runbooks must preserve evidence before remediation. A stuck worker is stopped/fenced before retry. An outage is not repaired by raising privileges or removing approval checks. A reconciliation failure stays visible until resolved.

## 9. Backup and recovery

Managed Postgres backups and point-in-time recovery target RPO 15 minutes. Object storage versioning and lifecycle rules protect recent artifacts while enforcing retention. GBrain knowledge needs both its database and any canonical content files used by the pinned deployment; index-only backups are insufficient. Secrets are recoverable through the managed store and account recovery procedure, not copied into artifact backups.

RTO target is four hours for the pilot. The recovery drill restores databases, tenant bindings, object manifests, and service pins into an isolated environment, reapplies deletion tombstones, reconciles unknown external operations, and verifies two-tenant access before opening ingress. Restored outbox rows cannot blindly replay PR creation or customer notifications without idempotency checks.

Perform a restore drill before production and monthly during the pilot. Record measured RPO/RTO and gaps; do not advertise targets as achieved until the drill demonstrates them.

## 10. Operational controls

Global emergency stop blocks new paid work and external publication while allowing read access and cleanup. Tenant pause stops only the affected company. Integration revocation stops dependent work. Operators can inspect and retry reconciliation with an audit reason; they cannot fabricate a human approval or change a candidate directly with undocumented SQL.

Daily spend reports distinguish model, worker runtime, storage, and external research costs. A hard cap blocks admission before the next paid operation. Usage uncertainty retains a conservative reservation. Customer-visible cost is labeled estimated until settled.

## 11. Configuration inventory

Required nonsecret config includes environment, region, contract version, tenant-cell image digests, model-role routes, policy defaults, storage bucket identifiers, allowed public callback origin, preview origin, OIDC issuer, schedule intervals, and global capacity. Required secret references include database roles, signing keys, OIDC client secret where needed, Slack signing/OAuth secrets, GitHub App private key/webhook secret, model-provider keys, and source OAuth credentials.

Configuration is validated at startup and versioned in deployments. Agent prompts cannot alter it. A change to egress allowlists, reviewer policy, or model routing creates an audit/config revision and runs the relevant conformance checks.

## 12. Production admission gate

Production requires a passing release report, verified cloud/network isolation, working revocation and deletion, a restore drill, monitored budget enforcement, source-coverage labeling, and an actual two-tenant end-to-end run. The hackathon path may use local infrastructure and labeled fixtures, but it cannot be promoted merely by changing an environment variable.
