# @harmony/provisioning

Operator tenant directory and fixture provisioning service (Harmony W02). Maps each Harmony `tenant_id` to UFO workspace, QM deployment, GBrain endpoint/database, worker pool, and artifact prefix per handoff **03 §5** and **13 §4**.

## Data sources

- **Baseline directory:** `contracts/v1/fixtures/tenants.seed.json` (loaded on first start when no persistence file exists).
- **Runtime persistence:** optional JSON snapshot at `data/tenants.json` (override with `PROVISIONING_DATA_FILE`).

## HTTP (default port `7104`)

| Method | Route | Result |
| --- | --- | --- |
| `GET` | `/tenants/:id/bindings` | Tenant status, `allow_new_execution`, and bindings |
| `POST` | `/tenants` | Idempotent create; **202** `AsyncOperation` |
| `POST` | `/tenants/:id/provision` | Fixture workflow fills bindings; **202** operation; `ready` only when required bindings exist |
| `POST` | `/tenants/:id/degrade` | Sets `degraded` and `allow_new_execution: false` |

Required bindings before `ready`: `ufo_workspace_id`, `qm_deployment_id`, `gbrain_endpoint`, `worker_pool`, `artifact_prefix`.

## Library exports

```typescript
import { createProvisioningApp, getTenantBindings } from "@harmony/provisioning";

const app = createProvisioningApp();
app.listen(7104);

const bindings = getTenantBindings("33333333-3333-4333-8333-333333333333");
```

## Commands

```bash
cd services/provisioning
npm ci
npm test
npm start   # PROVISIONING_PORT, PROVISIONING_DATA_FILE
```

## Fixtures vs real cloud

W02 uses **fixture provisioning** (deterministic binding values, no AWS/Auth0). Real database/cell/worker provisioning is a later wave; the HTTP contract and idempotent operation receipts match handoff **06** / **13**.
