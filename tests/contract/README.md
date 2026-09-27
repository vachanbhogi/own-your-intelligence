# Contract tests (Wave 2 / W01+W05 gates)

These tests validate Harmony v1 fixtures and exercise UFO↔QM delegation invariants (T15, T37–T42) against **in-process fakes** under `fakes/`.

## Running

```bash
cd tests && npm install && npm test
```

## Live services (Wave 3)

By default, tests use fakes so they pass before `services/*` implementations exist. When real adapters are wired, set:

```bash
LIVE=1 cd tests && npm test
```

Wave 3 will point `LIVE=1` at HTTP clients for Harmony control and QM cells (URLs via env). Until then, `LIVE=1` falls back to fakes with a console warning.
