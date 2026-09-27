# @harmony/control

In-memory Harmony control plane for the first slice (research assignments only). Simulates durable commands, outbox/inbox, idempotency, and QM delegation for UFO tools and integration tests.

## Run

```bash
cd services/control
npm install
npm run build
npm start          # PORT default 7100
npm test
```

Environment:

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `7100` | HTTP listen port |
| `QM_BASE_URL` | `http://127.0.0.1:7101` | Tenant QM cell for assignment dispatch |

## Tools API (UFO extension)

| Method | Path | Notes |
| --- | --- | --- |
| `POST` | `/tools/start_assignment` | Body: contracts/v1 assignment; requires `Idempotency-Key` |
| `GET` | `/tools/assignments/:id` | Assignment projection |
| `POST` | `/tools/assignments/:id/cancel` | Requires `Idempotency-Key` |

`start_assignment` validates research task types (`source_discovery`, `company_profile`) with `research_report.v1`, seeds tenants from `contracts/v1/fixtures/tenants.seed.json`, writes task + outbox (`task.accepted`), and optionally POSTs to QM with `X-Harmony-Grant`.

## Internal ingress

| Method | Path | Notes |
| --- | --- | --- |
| `POST` | `/internal/harmony/v1/events/qm` | Commits inbox before `202`; rejects unknown tenant or stale generation |

## Integration

```typescript
import { createControlApp } from "@harmony/control";

const { server, store } = createControlApp({ dispatchToQm: false });
```

Use `dispatchToQm: false` in tests to avoid calling a live QM cell.
