#!/usr/bin/env python3
"""Google review ingest CLI (Phase 1).

Fetch real Google Maps reviews via SerpAPI, load the AcmePulse fixture corpus,
or merge corpora into data/reviews_all.json.

Examples:
  cd factory && uv run explore --place-id "$GOOGLE_MAPS_PLACE_ID" --max 1000
  uv run explore --fixture acmepulse
  uv run explore --merge
  python explore.py --help
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Any

import httpx
from dotenv import load_dotenv

from schema import (
    Corpus,
    Review,
    ReviewCorpus,
    Source,
    normalize_serpapi_review,
    utc_now_iso,
    wrap_corpus,
)

SERPAPI_SEARCH = "https://serpapi.com/search.json"
DEFAULT_MAX = 1000


def _find_root() -> Path:
    """Locate factory/ whether run as a script or via an installed console entry."""
    here = Path(__file__).resolve().parent
    if (here / "fixtures" / "acmepulse_reviews.json").exists():
        return here
    cwd = Path.cwd()
    for candidate in [cwd, *cwd.parents]:
        if (candidate / "fixtures" / "acmepulse_reviews.json").exists():
            return candidate
        factory = candidate / "factory"
        if (factory / "fixtures" / "acmepulse_reviews.json").exists():
            return factory
    # Fallback: script dir (dev) or cwd
    return here if (here / "schema.py").exists() else cwd


# Populated in main() so console-script installs still resolve the repo tree.
ROOT: Path
DATA_DIR: Path
RAW_DIR: Path
FIXTURES_DIR: Path
REVIEWS_REAL: Path
REVIEWS_ALL: Path
SAMPLE_REAL: Path
ACMEPULSE_FIXTURE: Path


def _bind_paths(root: Path | None = None) -> Path:
    global ROOT, DATA_DIR, RAW_DIR, FIXTURES_DIR
    global REVIEWS_REAL, REVIEWS_ALL, SAMPLE_REAL, ACMEPULSE_FIXTURE
    ROOT = root or _find_root()
    DATA_DIR = ROOT / "data"
    RAW_DIR = DATA_DIR / "raw"
    FIXTURES_DIR = ROOT / "fixtures"
    REVIEWS_REAL = DATA_DIR / "reviews_real.json"
    REVIEWS_ALL = DATA_DIR / "reviews_all.json"
    SAMPLE_REAL = FIXTURES_DIR / "sample_real_reviews.json"
    ACMEPULSE_FIXTURE = FIXTURES_DIR / "acmepulse_reviews.json"
    return ROOT


def _ensure_dirs() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)


def _load_env() -> None:
    load_dotenv(ROOT / ".env")
    load_dotenv()


def _write_json(path: Path, payload: dict[str, Any] | list[Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def _read_corpus(path: Path) -> ReviewCorpus:
    data = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(data, list):
        reviews = [Review.model_validate(item) for item in data]
        place = reviews[0].place_name if reviews else "unknown"
        return wrap_corpus(reviews, place_name=place)
    return ReviewCorpus.model_validate(data)


def _cache_path(key: str, page: int) -> Path:
    safe = "".join(c if c.isalnum() or c in "-_" else "_" for c in key)[:80]
    return RAW_DIR / f"{safe}_page{page:03d}.json"


def _load_cached_page(cache_file: Path) -> dict[str, Any] | None:
    if not cache_file.exists():
        return None
    try:
        return json.loads(cache_file.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return None


def lookup_place_id(api_key: str, query: str) -> tuple[str, str]:
    """Resolve a Google Maps place_id (and title) from a free-text query."""
    params = {
        "engine": "google_maps",
        "q": query,
        "type": "search",
        "api_key": api_key,
    }
    with httpx.Client(timeout=60.0) as client:
        resp = client.get(SERPAPI_SEARCH, params=params)
        resp.raise_for_status()
        payload = resp.json()

    if payload.get("error"):
        raise RuntimeError(f"SerpAPI place lookup error: {payload['error']}")

    local = payload.get("place_results") or {}
    if local.get("place_id"):
        return str(local["place_id"]), str(local.get("title") or query)

    results = payload.get("local_results") or []
    if results and results[0].get("place_id"):
        first = results[0]
        return str(first["place_id"]), str(first.get("title") or query)

    raise RuntimeError(f"No place_id found for query: {query!r}")


def fetch_reviews_serpapi(
    *,
    api_key: str,
    place_id: str | None,
    data_id: str | None,
    max_reviews: int,
    place_name_hint: str | None = None,
) -> ReviewCorpus:
    """Paginate google_maps_reviews until exhausted or max_reviews reached."""
    if not place_id and not data_id:
        raise ValueError("place_id or data_id is required")

    cache_key = place_id or data_id or "unknown"
    reviews: list[Review] = []
    place_name = place_name_hint or "Unknown place"
    place_rating: float | None = None
    next_token: str | None = None
    page = 0

    with httpx.Client(timeout=60.0) as client:
        while len(reviews) < max_reviews:
            page += 1
            cache_file = _cache_path(str(cache_key), page)
            payload = _load_cached_page(cache_file)

            if payload is None:
                params: dict[str, Any] = {
                    "engine": "google_maps_reviews",
                    "api_key": api_key,
                    "sort_by": "newestFirst",
                    "hl": "en",
                }
                if place_id:
                    params["place_id"] = place_id
                if data_id:
                    params["data_id"] = data_id
                if next_token:
                    params["next_page_token"] = next_token

                resp = client.get(SERPAPI_SEARCH, params=params)
                resp.raise_for_status()
                payload = resp.json()
                _write_json(cache_file, payload)
            else:
                print(f"  cache hit: {cache_file.name}", file=sys.stderr)

            if payload.get("error"):
                raise RuntimeError(f"SerpAPI error: {payload['error']}")

            place_info = payload.get("place_info") or {}
            if place_info.get("title"):
                place_name = str(place_info["title"])
            if place_info.get("rating") is not None:
                try:
                    place_rating = float(place_info["rating"])
                except (TypeError, ValueError):
                    pass

            page_reviews = payload.get("reviews") or []
            if not page_reviews:
                break

            for item in page_reviews:
                if len(reviews) >= max_reviews:
                    break
                if not isinstance(item, dict):
                    continue
                reviews.append(
                    normalize_serpapi_review(
                        item,
                        place_name=place_name,
                        place_id=place_id,
                    )
                )

            next_token = payload.get("serpapi_pagination", {}).get("next_page_token")
            if not next_token:
                # Some responses put token at top level
                next_token = payload.get("next_page_token")
            if not next_token:
                break

    return wrap_corpus(
        reviews,
        place_name=place_name,
        place_id=place_id,
        rating=place_rating,
    )


def write_fallback_real() -> ReviewCorpus:
    """Copy sample fixture into data/reviews_real.json when live fetch fails."""
    if not SAMPLE_REAL.exists():
        raise FileNotFoundError(f"Missing offline fixture: {SAMPLE_REAL}")
    corpus = _read_corpus(SAMPLE_REAL)
    # Ensure corpus/source labels stay coherent for the real dump path
    fixed: list[Review] = []
    for r in corpus.reviews:
        fixed.append(
            r.model_copy(
                update={
                    "corpus": Corpus.REAL_PLACE,
                    "source": Source.FIXTURE,
                }
            )
        )
    out = wrap_corpus(
        fixed,
        place_name=corpus.meta.place_name,
        place_id=corpus.meta.place_id,
        rating=corpus.meta.rating,
    )
    _write_json(REVIEWS_REAL, out.model_dump_json_ready())
    return out


def _resolve_out_path(args: argparse.Namespace) -> Path:
    """Default: data/reviews_real.json. With --out, write a per-business dump."""
    if getattr(args, "out", None):
        out = Path(args.out)
        if not out.is_absolute():
            out = ROOT / out
        return out
    return REVIEWS_REAL


def cmd_fetch(args: argparse.Namespace) -> int:
    _ensure_dirs()
    api_key = args.api_key or os.getenv("SERPAPI_API_KEY") or ""
    place_id = args.place_id or os.getenv("GOOGLE_MAPS_PLACE_ID") or None
    data_id = args.data_id or os.getenv("DATA_ID") or None
    max_reviews = args.max
    if max_reviews is None:
        env_max = os.getenv("MAX_REVIEWS")
        max_reviews = int(env_max) if env_max else DEFAULT_MAX
    out_path = _resolve_out_path(args)

    place_name_hint: str | None = None

    if not api_key:
        print(
            "No SERPAPI_API_KEY set — falling back to fixtures/sample_real_reviews.json",
            file=sys.stderr,
        )
        corpus = write_fallback_real()
        if out_path != REVIEWS_REAL:
            _write_json(out_path, corpus.model_dump_json_ready())
            print(f"Wrote {len(corpus.reviews)} reviews → {out_path}")
        else:
            print(f"Wrote {len(corpus.reviews)} reviews → {REVIEWS_REAL}")
        return 0

    try:
        if args.query and not place_id and not data_id:
            print(f"Looking up place_id for query={args.query!r}…", file=sys.stderr)
            place_id, place_name_hint = lookup_place_id(api_key, args.query)
            print(f"  resolved place_id={place_id} ({place_name_hint})", file=sys.stderr)

        if not place_id and not data_id:
            print(
                "Need --place-id / GOOGLE_MAPS_PLACE_ID, --data-id / DATA_ID, or --query.\n"
                "Falling back to fixtures/sample_real_reviews.json",
                file=sys.stderr,
            )
            corpus = write_fallback_real()
            if out_path != REVIEWS_REAL:
                _write_json(out_path, corpus.model_dump_json_ready())
            print(f"Wrote {len(corpus.reviews)} reviews → {out_path}")
            return 0

        print(
            f"Fetching reviews (max={max_reviews}, place_id={place_id}, data_id={data_id})…",
            file=sys.stderr,
        )
        corpus = fetch_reviews_serpapi(
            api_key=api_key,
            place_id=place_id,
            data_id=data_id,
            max_reviews=max_reviews,
            place_name_hint=place_name_hint,
        )
        _write_json(out_path, corpus.model_dump_json_ready())
        if out_path != REVIEWS_REAL:
            # Also refresh the canonical real dump for --merge
            _write_json(REVIEWS_REAL, corpus.model_dump_json_ready())
        print(f"Wrote {len(corpus.reviews)} reviews → {out_path}")
        return 0
    except Exception as exc:  # noqa: BLE001 — surface + offline fallback
        print(f"SerpAPI fetch failed: {exc}", file=sys.stderr)
        print("Falling back to fixtures/sample_real_reviews.json", file=sys.stderr)
        corpus = write_fallback_real()
        if out_path != REVIEWS_REAL:
            _write_json(out_path, corpus.model_dump_json_ready())
        print(f"Wrote {len(corpus.reviews)} reviews → {out_path}")
        return 0


def cmd_fixture(args: argparse.Namespace) -> int:
    name = (args.fixture or "acmepulse").strip().lower()
    if name in {"acmepulse", "acme"}:
        path = ACMEPULSE_FIXTURE
    else:
        path = FIXTURES_DIR / name
        if not path.exists() and not path.suffix:
            path = FIXTURES_DIR / f"{name}.json"
        if not path.exists():
            print(f"Unknown fixture: {args.fixture}", file=sys.stderr)
            return 1

    corpus = _read_corpus(path)
    print(f"{path} — {len(corpus.reviews)} reviews ({corpus.meta.place_name})")
    return 0


def cmd_merge(_args: argparse.Namespace) -> int:
    _ensure_dirs()
    parts: list[Review] = []
    sources: list[str] = []

    # Prefer live/fallback real dump; else sample fixture
    real_path = REVIEWS_REAL if REVIEWS_REAL.exists() else SAMPLE_REAL
    if real_path.exists():
        real = _read_corpus(real_path)
        parts.extend(real.reviews)
        sources.append(f"{real_path.name} ({len(real.reviews)})")
    else:
        print(f"Warning: no real reviews at {REVIEWS_REAL} or {SAMPLE_REAL}", file=sys.stderr)

    if ACMEPULSE_FIXTURE.exists():
        acme = _read_corpus(ACMEPULSE_FIXTURE)
        parts.extend(acme.reviews)
        sources.append(f"{ACMEPULSE_FIXTURE.name} ({len(acme.reviews)})")
    else:
        print(f"Warning: missing {ACMEPULSE_FIXTURE}", file=sys.stderr)

    if not parts:
        print("Nothing to merge.", file=sys.stderr)
        return 1

    merged = wrap_corpus(parts, place_name="merged", place_id=None, rating=None)
    payload = merged.model_dump_json_ready()
    payload["meta"]["sources"] = sources
    _write_json(REVIEWS_ALL, payload)
    print(f"Merged {len(parts)} reviews from [{', '.join(sources)}] → {REVIEWS_ALL}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="explore",
        description="Ingest Google Maps reviews (SerpAPI) and AcmePulse fixtures.",
    )
    p.add_argument(
        "--place-id",
        dest="place_id",
        help="Google Maps place_id (or set GOOGLE_MAPS_PLACE_ID)",
    )
    p.add_argument(
        "--data-id",
        dest="data_id",
        help="SerpAPI data_id (or set DATA_ID)",
    )
    p.add_argument(
        "--query",
        help="Free-text Google Maps search to resolve a place_id via SerpAPI",
    )
    p.add_argument(
        "--max",
        type=int,
        default=None,
        help=f"Max reviews to fetch (default {DEFAULT_MAX} or MAX_REVIEWS)",
    )
    p.add_argument(
        "--api-key",
        dest="api_key",
        help="SerpAPI key (or set SERPAPI_API_KEY)",
    )
    p.add_argument(
        "--out",
        help="Output JSON path (default: data/reviews_real.json). Use for per-business dumps.",
    )
    p.add_argument(
        "--fixture",
        nargs="?",
        const="acmepulse",
        metavar="NAME",
        help="Load/print a fixture corpus (default: acmepulse)",
    )
    p.add_argument(
        "--merge",
        action="store_true",
        help="Concatenate real + acmepulse into data/reviews_all.json",
    )
    return p


def main(argv: list[str] | None = None) -> None:
    _bind_paths()
    _load_env()
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.merge:
        code = cmd_merge(args)
    elif args.fixture is not None:
        code = cmd_fixture(args)
    else:
        # Default path: fetch real reviews (with offline fallback)
        code = cmd_fetch(args)

    raise SystemExit(code)


if __name__ == "__main__":
    main()
