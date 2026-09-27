# Feedback → Feature Factory — review ingest + clustering

Thin Python glue to pull Google Maps reviews via **SerpAPI**, load the
AcmePulse demo fixture, and cluster corpora into ranked themes with quote
evidence. GBrain, UFO, and Superset come later.

## Setup

```bash
cd factory
cp .env.example .env   # add SERPAPI_API_KEY + GOOGLE_MAPS_PLACE_ID; OPENAI_API_KEY for cluster
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
per-run copy `../memory/company/reviews/<slug>.md` for later GBrain seed.

Requires `OPENAI_API_KEY` (optional `OPENAI_MODEL`, `OPENAI_BASE_URL`).

## Env vars

| Variable | Required | Meaning |
| --- | --- | --- |
| `SERPAPI_API_KEY` | for live fetch | [SerpAPI](https://serpapi.com/) key |
| `GOOGLE_MAPS_PLACE_ID` | or `--place-id` / `--query` | Google Maps `place_id` |
| `DATA_ID` | optional | SerpAPI `data_id` instead of place_id |
| `MAX_REVIEWS` | optional | Cap (default 1000) |
| `OPENAI_API_KEY` | for `cluster` | OpenAI-compatible API key |
| `OPENAI_MODEL` | optional | Default `gpt-4o-mini` |
| `OPENAI_BASE_URL` | optional | Default `https://api.openai.com/v1` |

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
| `../memory/company/reviews/*.md` | Human-readable theme notes |

Normalized review fields: `id`, `corpus`, `source`, `place_name`, `rating`,
`text`, `date`, `author`, `likes`, `raw`.

Theme fields: `id`, `title`, `kind`, `severity`, `review_count`, `summary`,
`evidence_quotes`, `candidate_action`.

## Notes

- **SerpAPI is the primary ingest path.** A browser Maps scraper is *not*
  implemented (optional future fallback only).
- Raw dumps under `data/` are gitignored except `.gitkeep`.
- Do not commit `.env` or API keys.
- Company-agent contract stub: `../agents/company/SYSTEM.md`.
