# Harmony delegation module (integration mirror)

This directory mirrors the Wave 2 QM cell Harmony implementation that will land in upstream **`yc-software/qm`** at **`src/harmony/`** on branch `harmony/main`.

| Mirror file (`forks/qm/src/harmony/`) | Canonical service source (`services/qm-cell/src/`) | Upstream target (`qm/src/harmony/`) |
| --- | --- | --- |
| `types.ts` | `types.ts` | Shared assignment/grant/event types |
| `grant.ts` | `grant.ts` | `X-Harmony-Grant` parsing and admission checks |
| `validation.ts` | `validation.ts` | Contract + deployment tenant validation |
| `schema.ts` | `schema.ts` | JSON Schema (contracts/v1) validation |
| `store.ts` | `store.ts` | Durable assignment, outbox, launch queue |
| `routes.ts` | `app.ts` | HTTP route handlers for `/internal/harmony/v1/*` |
| `index.ts` | `index.ts` | Module exports |

Register routes from QM `src/api/routes/index.ts` (see `audits/qm-seam-map.md`). Service-authenticated admission must not reuse portal cookie auth.

Release pin: `release-lock.json` → `repositories.qm.sha`.
