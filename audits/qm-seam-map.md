# QM seam map (W00)

Checkout: `/workspace/harmony-workspace/qm` @ `a5a36675041a85e30b9ff3632f678ba36837aabf`

See [W00-seam-map.md](W00-seam-map.md) for the combined map. Key docs: `docs/swarms.md`, `docs/memory-providers.md`.

Implement Harmony under `src/harmony/` and register routes from `src/api/routes/index.ts`. Runner adapter implements `Sandbox` (or wraps local/porter backends) plus supervisor allocate/prepare/execute/inspect/stop/destroy semantics from handoff 06 §6.
