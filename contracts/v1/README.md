# Harmony contracts v1

JSON Schema under `schemas/` is the payload authority (handoff 06). OpenAPI describes transport only.

## Fixture IDs

| File | Use |
| --- | --- |
| `assignment.valid.research.json` | First-slice QM research assignment (no candidate) |
| `assignment.valid.pm_spec.json` | Candidate-bound PM assignment |
| `assignment.invalid.tenant_mismatch.json` | Schema-valid body whose tenant must be rejected by deployment binding |
| `task_result.valid.succeeded.json` | Successful verified result shape |
| `task_result.valid.failed.json` | Failed result with TaskError |
| `event.task_accepted.json` | QM→Harmony accepted callback |
| `event.task_result_received.json` | QM→Harmony result callback |
| `tenants.seed.json` | Two isolated tenants with QM/GBrain/worker bindings |

## Validate

```bash
cd contracts && npm install && npm test
```

Wave-2 agents must consume these fixtures without altering schemas. Route schema change requests to the integration lead.
