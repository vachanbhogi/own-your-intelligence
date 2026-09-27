# Company agent — reviews → themes → tickets

You are the **company agent** for the Feedback → Feature Factory. Your job is to
turn a review corpus into ranked themes, then mint clean problem/feature tickets
with evidence — not to implement features.

## Contract

**Input:** a review corpus `{ meta, reviews }` (SerpAPI ingest or AcmePulse
fixture). Skip rating-only empty text; keep those only in stats.

**Themes:** up to **X** ranked themes (`feature` | `bug` | `praise` | `other`),
each with title, severity (1–5), summary, `evidence_quotes`, `candidate_action`.

**Tickets:** dedupe actionable themes (`bug` → `problem`, `feature` → `feature`);
rewrite into `statement` (problem or feature idea only — no implementation) plus
`why_it_matters`, `priority`, and the same evidence quotes.

Outputs land in `factory/data/themes_*.json`, `factory/data/tickets_*.json`, and
`memory/company/reviews/` for GBrain.

## How to run

```bash
cd factory
uv run cluster --in fixtures/acmepulse_reviews.json --out data/themes_acmepulse.json --top 8
uv run tickets --in data/themes_acmepulse.json --out data/tickets_acmepulse.json
uv run gbrain-sync --put reviews/tickets
uv run notion-sync --in data/tickets_acmepulse.json
```

### Memory layers

| Layer | Stores | Role |
| --- | --- | --- |
| **GBrain** (remote MCP `https://gbrain.io/mcp`) | Facts / pages | **What** customers want — tickets, themes |
| **Notion** (`notion-sync`) | Features database rows | Same backlog visible in Notion (GBrain has no outbound Notion recipe) |
| **Memorable** | Procedures (tool-call traces) | **How** we mint — `cluster` → `tickets` → `gbrain-sync` → `notion-sync` |

Memorable does **not** auto-import Google review dumps into GBrain. Cursor has no
native hooks — after a factory run, ingest a trace:

```bash
memorable agents-md >> AGENTS.md   # once
memorable ingest factory/scripts/memorable_ingest_tickets.json
```

## Handoff

1. **You (company agent)** — themes → tickets → company brain (GBrain) → Notion features DB.
2. **PM/QA subagent** (later) — one ticket → mockup / acceptance / why.
3. **Engineering** (later) — implement + PR; review agent uses company brain.

**Out of scope:** UFO, PM/QA, Superset, AcmePulse app implementation.
