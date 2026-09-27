# 11 · Repository execution, previews, video, and delivery

## 1. Existing-product requirement

Every candidate preview modifies the customer's connected application at a recorded baseline. A separate mock website that merely resembles the product does not satisfy this requirement. Workers reuse existing routes, components, styles, navigation, and data contracts where possible. The review package explains exactly where the proposed change lives.

Before implementation approval, workers build the frontend experience and use explicit synthetic/mock behavior for new backend functionality. They must not quietly complete or deploy the full backend because it appears simple. After approval, implementation continues from the approved code lineage and replaces the documented mocks.

## 2. Repository connection and profile

Use a GitHub App installation selected by the tenant owner. Persist the installation ID and exact repository ID; resolve permissions server-side for every broker operation. The platform holds installation credentials in the broker and never places a long-lived GitHub token in the application container. GitHub's documented installation authentication is the underlying mechanism; Harmony narrows access further through repository and operation allowlists.

Repository onboarding produces a versioned profile with app root, target branch, runtime versions, lockfile, package manager, install/build/start/test commands, internal port, readiness path, seed/reset command, required nonproduction environment references, design-system paths, protected paths, and allowed frontend write roots. Commands are argv arrays or reviewed script references, not string interpolation from customer feedback.

Run the profile in a disposable sandbox with synthetic data. Record baseline build/test results and startup health. Existing failures are explicit, and a missing runnable baseline blocks automatic preview generation. A human may approve a scoped baseline repair candidate, but the system must not conceal repairs inside an unrelated feature.

## 3. Workspace preparation

Each attempt gets an isolated container and writable volume on the tenant worker VM. The repository broker supplies an exact commit snapshot or authenticated clone through a temporary scoped credential helper. The container does not inherit the supervisor's environment. Installation scripts execute inside the sandbox with the same network and resource controls as other untrusted code.

Workers may use Git worktrees for efficient editing inside the tenant execution boundary. A worktree is not the security boundary. A worker starts with only the declared repository/input artifacts; QM's blank-child behavior is handled explicitly by preparation. Cache keys include tenant, repository, lockfile digest, runtime image digest, and package-manager version. Private source/build caches are never shared across tenants.

A candidate uses a stable branch name such as harmony/candidate-<uuid>. Intermediate local commits can be collected as a patch bundle before external publication. Preview generation does not require pushing an unapproved branch. The repository broker publishes only after the corresponding domain operation allows it.

## 4. Preview build contract

The frontend task returns a patch, preview commit, changed-file list, acceptance mapping, and mock manifest. A path-policy verifier rejects protected or out-of-scope changes. Build commands run against the exact resulting commit. A successful build alone is insufficient: the specified browser journey must complete.

The mock manifest records each simulated service or state, where implemented, expected production contract, limitations, and removal verification. Examples include fake persistence, fixed export data, simulated permission outcomes, and delayed network responses. Mocks are deterministic and use labeled synthetic fixtures. Existing authentication may be simulated in a dedicated preview-only entry path, never by weakening production authentication code without an explicit task.

## 5. Scenario specification

Each acceptance scenario defines stable scenario ID, viewport, locale/timezone, fixture version, starting route, actor permissions, actions, expected visible state, and assertions. Include the main successful path and at least one relevant empty/error/permission case. The scenario must verify an observable behavior, not simply capture a screenshot of a button.

For CSV export: seed a table with visible and hidden columns, apply a filter, export, inspect the downloaded file, and assert the correct rows and permitted visible columns. The browser recording shows the action; a machine assertion proves the file content. A visually attractive video cannot substitute for the actual output check.

Store command/browser receipts with exit status, timestamps, exact build digest, scenario version, and sanitized output. Screenshots, recordings, and downloads are artifacts of that run. Never reuse a pass receipt from a different code head.

## 6. Preview hosting and access

Preview code runs on the tenant worker infrastructure behind a dedicated preview gateway and a separate origin from the main SaaS. Customer application JavaScript must not receive Harmony session cookies or control-plane tokens. Access begins with a short-lived single-use viewer grant that establishes a preview-only session after checking tenant membership and package access.

The hostname/path identifies an immutable build/package, not a mutable latest deployment. A stopped preview may restart the identical build with the same fixture/config hashes; it must not silently substitute newer code. Idle runtime expires after 30 minutes, while review artifacts remain under retention. Signed media URLs expire after 5 minutes and can be renewed through authorization.

Preview servers have no production network route or production secrets. External network access is minimized to declared dependencies. Generated preview links are private by default; release 1 has no anonymous public-sharing toggle. Logs must not print access tokens or signed storage URLs.

## 7. Video production

Use Playwright to drive and record the exact verified preview journey. Use FFmpeg for standard encoding, clipping, and captions. Remotion is optional presentation tooling after the capture path works; it is not required to produce the first valid video and does not render invented product behavior.

Default video target is 45–90 seconds, 1280×720, H.264 video with AAC audio only if narration is enabled, MP4 container, and captions or an adjacent text summary. Show the existing problem briefly, the changed interaction, its result, and one important limitation/edge case. Use actual footage for product behavior. Title cards can explain what is mocked.

Video QA checks playback, duration, readable scale, absence of secrets/personal data, alignment with the scenario, and matching build identity. A failed capture stage is retried or reported blocked. A precomputed recording is acceptable only when labeled with its original run/revision and never presented as a new live result.

## 8. Review package sealing

The package contains candidate/revision, spec and AC hashes, baseline/preview SHAs, build digest, fixture/scenario versions, mock-manifest hash, verified artifact IDs and hashes, known limitations, reviewer gates, and expiry. The package hash is computed from canonical immutable fields. Short-lived URLs and notification timestamps are excluded because they are access/delivery metadata.

All required artifacts must be verified and accessible before the request becomes reviewable. For preference=preview, video may be omitted. For preference=video, the internally verified runnable build remains mandatory. For preference=both, both must be ready. A changed required artifact creates a new package version and supersedes pending approvals.

## 9. Full implementation

Implementation admission checks current human approval, package identity, repository access, baseline drift, context changes, and remaining budget. It starts from the approved preview commit or a recorded equivalent patch lineage. New backend work includes persistence, input validation, authorization, error states, performance considerations, and migrations where required by the accepted feature.

Mocks are removed or confined to test/preview fixtures. The production mock gate checks every mock-manifest entry, build-mode imports, hardcoded sample results, and unauthorized bypasses. Run integration tests against synthetic services/data. Production secrets remain unavailable. Required migrations receive forward/rollback or forward-fix notes and are not executed against production by Harmony.

If implementation reveals a different user experience, scope, or permission model, return to planning with a new revision. Internal hardening that preserves accepted behavior is allowed after independent review. The reviewer checks exact code and acceptance evidence, not only the author's prose.

## 10. PR publication and revision

The broker compares the expected remote branch head before updating it. It never force-pushes over an unknown human change. A conflict blocks publication with a reconciliation task. One candidate has one stable PR; subsequent fixes update it. An unknown PR-create response is reconciled by repository, branch, and embedded operation marker before retry.

PR content includes the customer problem, evidence references, accepted spec, review package, approved preview lineage, implementation head, tests, mock-removal report, migration/release notes, limitations, and human decision history. Private evidence is linked through authorized views, not copied into a public repository. Repository visibility is checked before writing the body.

Required checks include baseline-relative tests, AC scenarios, permission/negative tests, protected-path review, mock-removal check, independent review, and exact-head consistency. Check runs and agent verdicts are invalidated on head changes. An agent-created review does not satisfy the human merge rule.

## 11. Merge and release observation

Harmony has no merge operation. The broker allowlist excludes REST and GraphQL merge actions. Workers have no GitHub write token. Configure repository rules to require a human review and prevent the app from bypassing protected-branch rules. GitHub permission scopes alone are not assumed to distinguish PR creation from merging; enforcement also lives in the broker and repository policy.

Observe trusted GitHub webhook events and reconcile with API reads. Record the merged SHA and actor evidence. Deployments are observed separately through configured trusted events. If the customer has no deployment integration, report merged with deployment unknown. Do not manufacture a released status from elapsed time or a green unit test.

## 12. Outcomes

An outcome plan identifies a metric/source, pre-change window, post-release window, coverage, and expected direction. Default observation window is 14 days. Examples include task completion, export usage, and related support volume. Report observations and uncertainty; correlation after release does not establish causation. Without metrics, record a qualitative outcome request rather than claiming the problem is solved.
