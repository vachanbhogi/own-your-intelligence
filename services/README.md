# Harmony services (Wave 2 parallel slice)

Each directory is owned by one agent. Do not cross-edit.

| Path | Owner agent | Port (default) |
| --- | --- | --- |
| `control/` | ufo-domain | 7100 |
| `qm-cell/` | qm-delegation | 7101 |
| `runner/` | qm-runner | 7102 |
| `gbrain-gateway/` | gbrain-gateway | 7103 |
| `provisioning/` | provisioning | 7104 |

Integration entrypoint (Wave 3): `../scripts/w07-vertical-slice.mjs`
