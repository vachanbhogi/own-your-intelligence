# Harmony runner supervisor (W06)

In-memory TypeScript supervisor for isolated worker containers. First slice models the QM `Sandbox.provision` / run / teardown lifecycle without Docker; records include egress deny-by-default and internal secrets that are never returned from inspect.

## Internal HTTP API

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/allocate` | Reserve container (`tenant_id`, `task_id`, `attempt_id`, `generation`, `limits`) |
| `POST` | `/prepare` | Mount declared inputs (`handle_id`, `input_manifest_id`, `artifact_refs[]`) |
| `POST` | `/execute` | Run registered task type (`handle_id`, `task_type`) |
| `GET` | `/inspect/:handle_id` | Process/container state (no secrets) |
| `POST` | `/stop/:handle_id` | Cooperative stop |
| `POST` | `/destroy/:handle_id` | Idempotent teardown |
| `POST` | `/heartbeat/:handle_id` | Refresh worker lease |

## Lease and heartbeat (handoff 06 §6, 07)

- **Heartbeat interval:** workers should call `POST /heartbeat/:handle_id` every **15 seconds**.
- **Lease duration:** each successful heartbeat (and initial allocate) extends the lease by **60 seconds**.
- **Fence:** if the lease expires without a refresh, the supervisor marks the container **fenced** and rejects further mutating calls (`prepare`, `execute`, `stop`, `heartbeat`) with error code **`FENCED`**. `GET /inspect` remains available; `POST /destroy` is idempotent cleanup and may run after fence.

## Usage

```typescript
import { createServer } from "node:http";
import { createRunnerApp } from "@harmony/runner-supervisor";

const { handle } = createRunnerApp();
createServer((req, res) => void handle(req, res)).listen(9100);
```

QM integration lives in `forks/qm/src/harmony-runner` (`HarmonyRunnerSandbox`).

## Development

```bash
npm ci
npm test
npm run typecheck
```
