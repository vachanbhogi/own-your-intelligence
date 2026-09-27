# GBrain seam map (W00)

Checkout: `/workspace/harmony-workspace/gbrain` @ `e78f1c38b947b053f3a46881340f74f316be855a`

Engine: `BrainEngine` in `src/core/engine.ts`. Remote access: `src/mcp/`. Sources: `sources-load.ts` / `source-resolver.ts`.

Harmony implements a gateway that provisions sources `company-published`, `company-observations`, and `feature-<candidate-uuid>`, enforces grants, and fail-closes required company-context reads.
