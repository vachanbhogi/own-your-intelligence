# Harmony runner Sandbox adapter

Wraps the runner supervisor HTTP API as a QM-compatible `Sandbox` provider (`provision` → `prepare` → `run` → `stop` / `destroy`, plus `heartbeat`).

Point `supervisorBaseUrl` at the service from `services/runner`. Workers must heartbeat every **15s**; the supervisor holds a **60s** lease (see runner README).
