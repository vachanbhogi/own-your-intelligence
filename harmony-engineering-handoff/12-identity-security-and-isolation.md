# 12 · Identity, security, and tenant isolation

## 1. Security objectives

The product intentionally reads untrusted websites, feedback, and customer repositories and runs customer code. Tenant separation, bounded authority, and evidence integrity are core functional requirements. The controls here are implementation specifications and release gates, not claims of a completed security audit or certification.

Protected assets are customer source code, business knowledge, source credentials, repository access, human approval authority, artifacts, and workflow correctness. Threats include cross-tenant access, prompt injection, malicious dependency scripts, forged callbacks, stale worker writes, secret exfiltration, approval replay, and compromised integration credentials.

## 2. Human identity

Use Auth0 Universal Login with the OIDC authorization-code flow and PKCE for the web surface. Validate state and nonce, exact registered callbacks, issuer, audience, and token expiry. The exact production issuer/client IDs are deployment configuration supplied during W00; only one configured issuer is accepted in release 1. Harmony owns tenant membership and roles rather than deriving them from an email domain. Bind principals by issuer plus subject, not mutable email text. Email/domain confirmation does not itself grant access to an existing tenant. A deterministic local OIDC fixture may be used in tests, but production never enables it.

Membership invitations are one-time, expire after 48 hours, and specify tenant and roles. The last active owner cannot be removed. Sensitive actions—tenant deletion, integration replacement, and owner-role changes—require recent authentication within 15 minutes. Ordinary review actions do not require an additional confirmation beyond the explicit action itself.

Slack identities map verified workspace/user IDs to an active membership. A matching display name or email suggestion is not sufficient. The tenant owner establishes the binding; first-use account linking requires proof of both sessions or an approved invitation flow. User/channel IDs supplied in an unverified webhook are never trusted.

## 3. Authorization matrix

| Action | Owner | Admin | Product approver | Design reviewer | Engineer | Viewer |
| --- | --- | --- | --- | --- | --- | --- |
| Read tenant product/evidence | Yes | Yes | Yes | Yes | Yes | Yes |
| Manage connections/policy | Yes | Yes, except ownership/billing | No | No | No | No |
| Configure verified repo profile | Yes | Yes | No | No | Yes | No |
| Select/request candidate | Yes | Yes | Yes | No | No | No |
| Approve implementation | Yes | Yes | Yes | Only if also approver | No | No |
| Approve configured design gate | If assigned reviewer | If assigned reviewer | If assigned reviewer | Yes | No | No |
| Publish company policy | Yes | Yes | Propose only | Propose only | Propose only | No |
| Retry technical task | Yes | Yes | No | No | Yes | No |
| Cancel candidate | Yes | Yes | Yes | No | No | No |
| Export/delete tenant | Yes | No | No | No | No | No |
| Merge through Harmony | No | No | No | No | No | No |

Design reviewers may request changes at the design gate; product approvers may request changes at the implementation gate. A user with read access cannot gain mutation rights through a natural-language message. Tool admission uses the same policy as direct API calls.

## 4. Tenant routing and databases

Bind the active tenant in trusted request middleware, verify membership, and set the tenant transaction context. Database runtime roles are non-superuser and cannot bypass row-level policies or assume migration roles. Use transaction-local settings and reset connection context on pool return. Composite foreign keys prevent cross-tenant parent references even when IDs are valid.

QM and GBrain use tenant-specific service credentials and databases. Their endpoints are private and their deployment tenant binding is immutable during a request. No tenant can specify an arbitrary GBrain endpoint or database URL. Provisioning/admin credentials are only available to the operator provisioning service.

Support/operator access is a separate audited capability, time-limited to 60 minutes by default and scoped to a named incident/tenant. Ordinary operators inspect redacted health metadata; reading customer content requires explicit support authorization or a documented incident procedure.

## 5. Runner isolation

Production worker VMs are dedicated to one tenant and separated from shared control services. Each task uses a nonprivileged container, read-only base image, bounded writable workspace, dropped Linux capabilities, no host PID/network namespace, no Docker socket, resource quotas, and syscall restrictions. The runner supervisor is the only component that controls containers.

Workers cannot access cloud metadata, internal database networks, service-admin endpoints, another task's filesystem, or host credentials. Disable/deny metadata routes inside the sandbox and test both IPv4 and IPv6 paths. A per-tenant VM limits cross-company exposure if a container boundary fails; it does not remove the need to protect the same tenant's other tasks and broker credentials.

Local development may use a single Docker host with synthetic tenants and no production secrets. That topology is explicitly not a production isolation proof. Production qualification runs on the dedicated-tenant topology.

## 6. Network and fetch policy

All worker egress goes through an enforced proxy/firewall policy, not merely proxy environment variables that untrusted programs can ignore. Public research fetch resolves and validates destinations, blocks loopback/private/link-local/metadata ranges, rechecks redirects, rejects credential-bearing URLs, and protects against DNS rebinding by validating the connected address. Allow only HTTP/HTTPS and bounded response sizes/timeouts.

Code installation may access approved package registries and repository hosts. Broader application network access requires an explicit profile allowlist. There is no route to production customer services by default. Browser tasks use the same network policy as command tasks. DNS and direct IP access must not bypass it.

Outbound email/Slack messages to customers or third parties are not generic worker tools. Customer notifications use the registered product channel and deterministic dispatcher. A website instruction cannot cause an external message or credential upload.

## 7. Secrets and broker design

Store secrets in a managed secret store with per-service IAM/access policy and encrypted transport. Database rows hold credential references and metadata only. Rotate provider credentials according to provider support and immediately on suspected compromise. Redact authorization headers, private keys, cookies, signed URLs, and token-like values from logs/artifacts.

The GitHub broker mints short-lived installation access only for the selected repository and permitted operation. Prefer proxy/credential-helper use over embedding tokens in clone URLs or shell history. Workers receive no reusable GitHub write token. Branch and PR publication are broker operations with current state/fence checks.

GBrain owner credentials stay in provisioning. Worker memory calls use read/write clients with source restrictions. Object storage uses expected uploads and short-lived access grants rather than bucket credentials. Model-provider keys remain in the accounting/model gateway, not in the repo sandbox environment.

## 8. Prompt injection and untrusted input

Treat source content as data at both prompt and tool boundaries. Extracted claims can influence analysis only through typed evidence fields. Repository AGENTS.md or build scripts may describe project conventions but cannot authorize tenant changes, disable product approval, reveal secrets, or escape the assigned stage.

Do not rely on a model classifier as the sole control. Deterministic grants, egress policy, protected paths, artifact checks, and broker allowlists constrain harmful effects even if an agent follows malicious text. Screening labels support triage and explanation, not execution authority.

The injection test corpus includes reviews, HTML comments, source files, package scripts, tool errors, and uploaded documents that request data exfiltration or policy changes. The correct result is an ignored/quarantined instruction and continued safe work where possible, not a blanket deletion of useful criticism.

## 9. Webhooks, callbacks, and replay

Slack verification uses the raw request body, signing secret, timestamp freshness, and constant-time signature comparison. Persist valid ingress with provider identity before asynchronous processing. GitHub uses its webhook signature and delivery ID, then checks installation/repository binding. Do not trust a webhook merely because it names a known repository.

Internal callbacks require mTLS and audience-bound service tokens. Compare task/generation to the current lease. Inbox deduplication rejects duplicate event IDs with altered payloads. Unknown event types or schema majors are quarantined for compatibility handling rather than interpreted as free-form commands.

## 10. Approval and artifact integrity

Approval buttons identify stored review requests. The server checks human role, active membership, current revision, package hash, expiry, and gate ordering. A service account cannot submit a human decision. A replayed old approval cannot authorize a new revision or a changed build.

Artifact digests are verified after upload. Media and HTML previews are served on separate origins with restrictive headers and no control-plane cookies. File names are sanitized for display and never used as arbitrary host paths. Archive extraction rejects traversal, absolute paths, symlink escapes, and decompression bombs.

## 11. Data minimization, retention, and deletion

Only data needed for the product is collected. Avoid storing reviewer email/phone details when an opaque source identifier is sufficient. Redact unnecessary personal data before model calls and semantic publication. Configure provider usage so no cross-tenant training or sharing occurs; the product does not train on customer data in release 1.

Deletion revokes access immediately, cancels active tasks, removes primary data/artifacts/knowledge within seven days, and records tombstones for backup restores. Backups expire within 35 days. A deletion inventory includes search indexes, embeddings, caches, worker volumes, exported files, and derived GBrain pages. Minimal audit records must not retain removed source content.

## 12. Release security gate

Before production, prove two-tenant isolation across APIs, SQL, GBrain, artifacts, runner files, cache keys, and callbacks. Prove revoked grants and stale generations fail. Prove worker egress cannot reach metadata/control databases. Prove an agent cannot merge or publish company policy. Prove a preview cannot steal the main application session. These are blocking integration tests, not a checklist accepted on assertion.
