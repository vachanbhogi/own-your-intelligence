# Feedback → Feature Factory — reviews → themes → tickets

Thin Python glue to pull Google Maps reviews via **SerpAPI**, load the
AcmePulse demo fixture, cluster corpora into ranked themes, and mint
problem/feature tickets for company memory. Syncs to **GBrain**; procedures
can be stored in **Memorable**. UFO is out of scope for now.

## Setup

```bash
cd factory
cp .env.example .env   # SERPAPI_API_KEY + GOOGLE_MAPS_PLACE_ID; OPENAI_API_KEY for cluster/tickets
uv sync                # or: pip install -e .
```

Deps are listed in `pyproject.toml` (`httpx`, `python-dotenv`, `pydantic`).

## CLI — ingest (Phase 1)

```bash
# Live fetch (SerpAPI google_maps_reviews, newest first, paginated)
uv run explore --place-id "$GOOGLE_MAPS_PLACE_ID" --max 1000

# Or without installing the console script:
python explore.py --place-id "$GOOGLE_MAPS_PLACE_ID" --max 1000

# Resolve place_id from a Maps query
uv run explore --query "Acme Coffee Seattle" --max 200

# Offline: print AcmePulse fake corpus
uv run explore --fixture acmepulse

# Merge real dump + AcmePulse → data/reviews_all.json
uv run explore --merge

uv run explore --help
```

Without `SERPAPI_API_KEY` (or on API errors), the fetch path falls back to
`fixtures/sample_real_reviews.json` and still writes `data/reviews_real.json`.

## CLI — cluster themes (Phase 2)

Groups reviews with non-empty text into up to `--top` ranked themes. Each theme
cites real `review_id`s and short quotes; hallucinated ids are dropped.

```bash
# AcmePulse fixture (demo gaps: dark mode, export, notifications, mobile filter, …)
uv run cluster --in fixtures/acmepulse_reviews.json --out data/themes_acmepulse.json --top 8

# Live dump from Phase 1
uv run cluster --in data/reviews_katzs.json --out data/themes_katzs.json --top 8

uv run cluster --help
```

Also writes human-readable notes to `../memory/company/reviews/themes.md` and a
per-run copy `../memory/company/reviews/<slug>.md` for GBrain seed.

Requires `OPENAI_API_KEY` (optional `OPENAI_MODEL`, `OPENAI_BASE_URL`).

## CLI — mint tickets (Phase 3)

Dedupes bug/feature themes, maps `bug`→`problem` / `feature`→`feature`, and
rewrites each into a **statement** (problem or feature idea only — no
implementation plan). Writes JSON + markdown for GBrain.

```bash
uv run tickets --in data/themes_acmepulse.json --out data/tickets_acmepulse.json
uv run tickets --in data/themes_katzs.json --out data/tickets_katzs.json
uv run tickets --help
```

Also writes `../memory/company/reviews/tickets.md` and `tickets_<slug>.md`.

Use `--no-llm` for heuristic statements without an API call.

## GBrain — company knowledge (remote MCP)

Stores **what** customers want (themes, tickets, product/brand stubs) on the
hosted brain at [gbrain.io/mcp](https://gbrain.io/mcp). Local PGLite is not used.

```bash
# factory/.env (gitignored) — placeholders in .env.example
GBRAIN_MCP_URL=https://gbrain.io/mcp
GBRAIN_TOKEN=gbu_…   # from the gbrain.io connection page; never commit

# Put ticket backlog (and/or all memory/company markdown)
uv run gbrain-sync --put reviews/tickets
uv run gbrain-sync --source company
uv run gbrain-sync --search "export dark mode tickets"

# Optional CLI wire-up (same remote brain)
# bun install -g github:garrytan/gbrain#latest-stable
# gbrain connect https://gbrain.io/mcp --token "$GBRAIN_TOKEN"

uv run gbrain-sync --connect-hint   # prints Cursor MCP block (no secrets)
```

### Cursor MCP

Settings → MCP → Add HTTP server:

| Field | Value |
| --- | --- |
| URL | `https://gbrain.io/mcp` |
| Header | `Authorization: Bearer <GBRAIN_TOKEN>` |

Do not paste the token into committed files or chat logs.

## Notion — features backlog page

GBrain does **not** push outbound to Notion. Use `notion-sync` to upsert
`tickets_*.json` into a Notion database (idempotent by **Ticket ID**).

```bash
# factory/.env (gitignored)
NOTION_TOKEN=secret_…           # Internal Integration token
NOTION_DATABASE_ID=…            # Features DB id (or URL)
# NOTION_PARENT_PAGE_ID=…       # optional: create "Factory features" under this page

# Share the DB/page with the integration, then:
uv run notion-sync --in data/tickets_acmepulse.json
uv run notion-sync --in data/tickets_acmepulse.json   # re-run updates, no dupes
```

Rows: Name, Type, Priority, Statement, Why it matters, Review count, Status
(`backlog`), Source corpus, Evidence, Ticket ID.

## Memorable — procedural “how”

Stores **how** we mint tickets (`cluster` → `tickets` → `gbrain-sync` →
`notion-sync`), not review dumps. Cursor has no native hooks — use `agents-md`
+ `ingest` after runs. UFO is out of scope.

```bash
npm i -g memorable-cli
memorable install-hooks          # names Claude Code here; Cursor needs agents-md
memorable agents-md >> AGENTS.md # from repo root (Cursor)
memorable enable
echo '<mk_…>' | memorable login --paste
memorable init gbrain            # procedures in local gbrain DB when available

# After a good factory run:
memorable ingest scripts/memorable_ingest_tickets.json
```

Template: [`scripts/memorable_ingest_tickets.json`](scripts/memorable_ingest_tickets.json).

## Env vars

| Variable | Required | Meaning |
| --- | --- | --- |
| `SERPAPI_API_KEY` | for live fetch | [SerpAPI](https://serpapi.com/) key |
| `GOOGLE_MAPS_PLACE_ID` | or `--place-id` / `--query` | Google Maps `place_id` |
| `DATA_ID` | optional | SerpAPI `data_id` instead of place_id |
| `MAX_REVIEWS` | optional | Cap (default 1000) |
| `OPENAI_API_KEY` | for `cluster` / `tickets` | OpenAI-compatible API key |
| `OPENAI_MODEL` | optional | Default `gpt-4o-mini` |
| `OPENAI_BASE_URL` | optional | Default `https://api.openai.com/v1` |
| `GBRAIN_MCP_URL` | for `gbrain-sync` | Default `https://gbrain.io/mcp` |
| `GBRAIN_TOKEN` | for `gbrain-sync` | Bearer from gbrain.io (never commit) |
| `NOTION_TOKEN` | for `notion-sync` | Notion Internal Integration secret |
| `NOTION_DATABASE_ID` | for `notion-sync` | Features database id (or URL) |
| `NOTION_PARENT_PAGE_ID` | optional | Create DB under this page if no DB id |

### Finding a `place_id`

1. Open the place in [Google Maps](https://maps.google.com).
2. Copy the URL — it often contains `!1s0x…:0x…` (CID) or a `place_id` in
   share / embed links. Easiest: use SerpAPI’s Google Maps engine:
   `uv run explore --query "Business Name City"` and read the resolved id.
3. Or look up the place in the [SerpAPI Google Maps Playground](https://serpapi.com/google-maps-api)
   and copy `place_id` from the JSON.

## Outputs

| Path | Role |
| --- | --- |
| `data/reviews_real.json` | Full SerpAPI (or sample fallback) dump `{ meta, reviews }` |
| `data/raw/*.json` | Cached raw SerpAPI pages (avoids re-spending credits) |
| `fixtures/acmepulse_reviews.json` | Committed fake SaaS corpus (100+) |
| `fixtures/sample_real_reviews.json` | Small real-shaped offline sample |
| `data/reviews_all.json` | `--merge` concat of real + AcmePulse |
| `data/themes_*.json` | Clustered themes + evidence quotes |
| `data/tickets_*.json` | Deduped problem/feature tickets |
| `../memory/company/reviews/*.md` | Theme + ticket notes for GBrain |

Normalized review fields: `id`, `corpus`, `source`, `place_name`, `rating`,
`text`, `date`, `author`, `likes`, `raw`.

Theme fields: `id`, `title`, `kind`, `severity`, `review_count`, `summary`,
`evidence_quotes`, `candidate_action`.

Ticket fields: `id`, `type`, `title`, `statement`, `why_it_matters`, `priority`,
`review_count`, `evidence_quotes`.

## Notes

- **SerpAPI is the primary ingest path.** A browser Maps scraper is *not*
  implemented (optional future fallback only).
- Raw dumps under `data/` are gitignored except `.gitkeep`.
- Do not commit `.env` or API keys.
- Company-agent contract: `../agents/company/SYSTEM.md`.
- **UFO is out of scope** for this phase.
