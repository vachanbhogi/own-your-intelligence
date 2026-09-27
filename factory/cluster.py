#!/usr/bin/env python3
"""Group review corpora into ranked themes with quote evidence (Phase 2).

Examples:
  cd factory && uv run cluster --in fixtures/acmepulse_reviews.json --out data/themes_acmepulse.json --top 8
  uv run cluster --in data/reviews_katzs.json --out data/themes_katzs.json --top 8
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path
from typing import Any

import httpx
from dotenv import load_dotenv

from schema import (
    EvidenceQuote,
    Review,
    ReviewCorpus,
    Theme,
    ThemeKind,
    ThemeSet,
    ThemeSetMeta,
    utc_now_iso,
)

DEFAULT_MODEL = "gpt-4o-mini"
DEFAULT_BASE_URL = "https://api.openai.com/v1"
DEFAULT_TOP = 8
# Soft cap: keep prompts manageable; batch when corpus is large.
BATCH_SIZE = 35

SYSTEM_PROMPT = """You are the company agent for a Feedback → Feature Factory.
Given customer reviews, group them into ranked pain themes / candidate features or bugs.

Rules:
- Return ONLY valid JSON matching the schema (no markdown fences).
- Produce at most `top_n` themes, ranked by pain × frequency (worst/most common first).
- Each theme needs: id (slug), title, kind (feature|bug|praise|other), severity (1-5),
  review_count (approx how many reviews support it), summary, evidence_quotes
  (2–5 items with real review_id + short verbatim quote + rating), candidate_action.
- Quotes MUST be short substrings of the cited review's text. review_id MUST appear in the input.
- Skip empty/rating-only noise; focus on actionable product or place feedback.
- Prefer concrete themes over vague buckets.
"""


def _find_root() -> Path:
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
    return here if (here / "schema.py").exists() else cwd


def _repo_root(factory_root: Path) -> Path:
    """Repo root is parent of factory/ when layout is intel/factory."""
    if factory_root.name == "factory":
        return factory_root.parent
    return factory_root


def _slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or "themes"


def load_corpus(path: Path) -> ReviewCorpus:
    data = json.loads(path.read_text(encoding="utf-8"))
    return ReviewCorpus.model_validate(data)


def reviews_with_text(reviews: list[Review]) -> list[Review]:
    return [r for r in reviews if (r.text or "").strip()]


def _reviews_payload(reviews: list[Review]) -> list[dict[str, Any]]:
    return [
        {
            "id": r.id,
            "rating": r.rating,
            "text": r.text.strip(),
            "author": r.author,
            "date": r.date,
        }
        for r in reviews
    ]


def _chat_completion(
    *,
    api_key: str,
    base_url: str,
    model: str,
    messages: list[dict[str, str]],
    timeout: float = 120.0,
    max_retries: int = 5,
) -> str:
    url = base_url.rstrip("/") + "/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    body = {
        "model": model,
        "messages": messages,
        "temperature": 0.2,
        "max_tokens": 900,
        "response_format": {"type": "json_object"},
    }
    with httpx.Client(timeout=timeout) as client:
        last_exc: Exception | None = None
        for attempt in range(max_retries):
            resp = client.post(url, headers=headers, json=body)
            if resp.status_code == 429 and attempt < max_retries - 1:
                wait = 20.0 * (attempt + 1)
                try:
                    msg = resp.json().get("error", {}).get("message", "")
                    m = re.search(r"try again in ([\d.]+)s", msg, re.I)
                    if m:
                        wait = float(m.group(1)) + 1.0
                except Exception:
                    pass
                time.sleep(wait)
                last_exc = httpx.HTTPStatusError(
                    f"429 rate limited; retried after {wait:.1f}s",
                    request=resp.request,
                    response=resp,
                )
                continue
            if resp.status_code >= 400:
                detail = resp.text[:800]
                raise httpx.HTTPStatusError(
                    f"{resp.status_code} from {url}: {detail}",
                    request=resp.request,
                    response=resp,
                )
            payload = resp.json()
            break
        else:
            assert last_exc is not None
            raise last_exc
    try:
        return payload["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError) as exc:
        raise RuntimeError(f"Unexpected OpenAI response shape: {payload!r}") from exc


def _parse_themes_json(raw: str) -> list[dict[str, Any]]:
    data = json.loads(raw)
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        for key in ("themes", "items", "results"):
            if isinstance(data.get(key), list):
                return data[key]
        # Single theme object?
        if "title" in data and "kind" in data:
            return [data]
    raise ValueError(f"Could not find themes array in model JSON: {raw[:400]!r}")


def _validate_and_clean_theme(
    raw: dict[str, Any],
    *,
    by_id: dict[str, Review],
    index: int,
) -> Theme | None:
    quotes_in = raw.get("evidence_quotes") or raw.get("quotes") or []
    cleaned_quotes: list[EvidenceQuote] = []
    if isinstance(quotes_in, list):
        for q in quotes_in:
            if not isinstance(q, dict):
                continue
            rid = str(q.get("review_id") or q.get("id") or "").strip()
            if rid not in by_id:
                continue
            review = by_id[rid]
            quote = str(q.get("quote") or q.get("text") or "").strip()
            if not quote:
                continue
            # Prefer a substring of the review when the model paraphrases.
            if quote.lower() not in review.text.lower():
                # Keep short quote if review text contains substantial overlap; else skip.
                words = [w for w in re.split(r"\W+", quote.lower()) if len(w) > 3]
                hits = sum(1 for w in words if w in review.text.lower())
                if not words or hits / len(words) < 0.5:
                    continue
            rating_raw = q.get("rating", review.rating)
            try:
                rating = int(rating_raw)
            except (TypeError, ValueError):
                rating = review.rating
            rating = max(1, min(5, rating))
            cleaned_quotes.append(
                EvidenceQuote(review_id=rid, quote=quote[:280], rating=rating)
            )

    if not cleaned_quotes:
        return None

    kind_raw = str(raw.get("kind") or "other").lower().strip()
    try:
        kind = ThemeKind(kind_raw)
    except ValueError:
        kind = ThemeKind.OTHER

    severity_raw = raw.get("severity", raw.get("priority", 3))
    try:
        severity = int(severity_raw)
    except (TypeError, ValueError):
        severity = 3
    severity = max(1, min(5, severity))

    title = str(raw.get("title") or f"Theme {index + 1}").strip()
    theme_id = str(raw.get("id") or _slugify(title) or f"theme-{index + 1}").strip()
    summary = str(raw.get("summary") or "").strip() or title
    action = str(raw.get("candidate_action") or raw.get("action") or "").strip()
    if not action:
        action = f"Address: {title}"

    review_count_raw = raw.get("review_count")
    try:
        review_count = int(review_count_raw) if review_count_raw is not None else len(cleaned_quotes)
    except (TypeError, ValueError):
        review_count = len(cleaned_quotes)
    # Bound by unique cited reviews at minimum.
    unique_ids = {eq.review_id for eq in cleaned_quotes}
    review_count = max(len(unique_ids), review_count)

    return Theme(
        id=theme_id,
        title=title,
        kind=kind,
        severity=severity,
        review_count=review_count,
        summary=summary,
        evidence_quotes=cleaned_quotes,
        candidate_action=action,
    )


def cluster_batch(
    reviews: list[Review],
    *,
    top_n: int,
    api_key: str,
    base_url: str,
    model: str,
    place_name: str,
) -> list[Theme]:
    by_id = {r.id: r for r in reviews}
    user_payload = {
        "place_name": place_name,
        "top_n": top_n,
        "reviews": _reviews_payload(reviews),
    }
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {
            "role": "user",
            "content": (
                "Cluster these reviews into up to "
                f"{top_n} themes. JSON shape:\n"
                '{"themes":[{"id":"...","title":"...","kind":"feature|bug|praise|other",'
                '"severity":1-5,"review_count":N,"summary":"...","evidence_quotes":'
                '[{"review_id":"...","quote":"...","rating":1-5}],'
                '"candidate_action":"..."}]}\n\n'
                f"{json.dumps(user_payload, ensure_ascii=False)}"
            ),
        },
    ]
    content = _chat_completion(
        api_key=api_key, base_url=base_url, model=model, messages=messages
    )
    raw_themes = _parse_themes_json(content)
    themes: list[Theme] = []
    for i, raw in enumerate(raw_themes[: top_n * 2]):  # allow extras then trim
        if not isinstance(raw, dict):
            continue
        theme = _validate_and_clean_theme(raw, by_id=by_id, index=i)
        if theme:
            themes.append(theme)
    return themes[:top_n]


def merge_theme_lists(batches: list[list[Theme]], top_n: int) -> list[Theme]:
    """Merge batch themes by similar title slug; keep highest severity / more quotes."""
    if len(batches) == 1:
        return batches[0][:top_n]
    merged: dict[str, Theme] = {}
    for batch in batches:
        for theme in batch:
            key = _slugify(theme.title)
            existing = merged.get(key)
            if existing is None:
                merged[key] = theme
                continue
            # Prefer more evidence / higher severity.
            quotes = { (q.review_id, q.quote): q for q in existing.evidence_quotes }
            for q in theme.evidence_quotes:
                quotes[(q.review_id, q.quote)] = q
            combined = list(quotes.values())[:8]
            severity = max(existing.severity, theme.severity)
            review_count = max(existing.review_count, theme.review_count) + min(
                existing.review_count, theme.review_count
            ) // 2
            summary = existing.summary if len(existing.summary) >= len(theme.summary) else theme.summary
            action = existing.candidate_action or theme.candidate_action
            merged[key] = Theme(
                id=existing.id,
                title=existing.title,
                kind=existing.kind,
                severity=severity,
                review_count=review_count,
                summary=summary,
                evidence_quotes=combined,
                candidate_action=action,
            )

    ranked = sorted(
        merged.values(),
        key=lambda t: (t.severity, t.review_count, len(t.evidence_quotes)),
        reverse=True,
    )
    return ranked[:top_n]


def themes_to_markdown(theme_set: ThemeSet) -> str:
    m = theme_set.meta
    lines = [
        f"# Review themes — {m.place_name}",
        "",
        f"- Corpus: `{m.corpus_path}`",
        f"- Model: `{m.model}`",
        f"- Clustered at: {m.clustered_at}",
        f"- Input reviews: {m.input_count} (used with text: {m.used_count})",
        "",
    ]
    for i, t in enumerate(theme_set.themes, start=1):
        lines.extend(
            [
                f"## {i}. {t.title}",
                "",
                f"- **id:** `{t.id}`",
                f"- **kind:** {t.kind.value}",
                f"- **severity:** {t.severity}/5",
                f"- **review_count:** {t.review_count}",
                f"- **candidate_action:** {t.candidate_action}",
                "",
                t.summary,
                "",
                "### Evidence",
                "",
            ]
        )
        for q in t.evidence_quotes:
            lines.append(f'- ({q.rating}/5, `{q.review_id}`) "{q.quote}"')
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def write_outputs(
    theme_set: ThemeSet,
    *,
    out_json: Path,
    memory_dir: Path,
    slug: str,
) -> tuple[Path, Path, Path]:
    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(
        json.dumps(theme_set.model_dump_json_ready(), indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    memory_dir.mkdir(parents=True, exist_ok=True)
    md = themes_to_markdown(theme_set)
    latest = memory_dir / "themes.md"
    per_run = memory_dir / f"{slug}.md"
    latest.write_text(md, encoding="utf-8")
    per_run.write_text(md, encoding="utf-8")
    return out_json, latest, per_run


def run_cluster(
    *,
    in_path: Path,
    out_path: Path,
    top: int,
    model: str,
    base_url: str,
    api_key: str,
    memory_dir: Path,
) -> ThemeSet:
    corpus = load_corpus(in_path)
    all_reviews = corpus.reviews
    usable = reviews_with_text(all_reviews)
    place_name = corpus.meta.place_name

    if not usable:
        raise SystemExit("No reviews with non-empty text to cluster.")

    batches: list[list[Theme]] = []
    if len(usable) <= BATCH_SIZE:
        batches.append(
            cluster_batch(
                usable,
                top_n=top,
                api_key=api_key,
                base_url=base_url,
                model=model,
                place_name=place_name,
            )
        )
    else:
        for i in range(0, len(usable), BATCH_SIZE):
            chunk = usable[i : i + BATCH_SIZE]
            batches.append(
                cluster_batch(
                    chunk,
                    top_n=top,
                    api_key=api_key,
                    base_url=base_url,
                    model=model,
                    place_name=place_name,
                )
            )

    themes = merge_theme_lists(batches, top)
    if not themes:
        raise SystemExit("Model returned no themes with valid evidence quotes.")

    theme_set = ThemeSet(
        meta=ThemeSetMeta(
            corpus_path=str(in_path),
            place_name=place_name,
            model=model,
            clustered_at=utc_now_iso(),
            input_count=len(all_reviews),
            used_count=len(usable),
        ),
        themes=themes,
    )
    slug = _slugify(place_name)
    write_outputs(theme_set, out_json=out_path, memory_dir=memory_dir, slug=slug)
    return theme_set


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Cluster reviews into ranked themes with quote evidence."
    )
    p.add_argument(
        "--in",
        dest="in_path",
        required=True,
        help="Input corpus JSON ({ meta, reviews })",
    )
    p.add_argument(
        "--out",
        dest="out_path",
        required=True,
        help="Output themes JSON path (e.g. data/themes_acmepulse.json)",
    )
    p.add_argument(
        "--top",
        type=int,
        default=DEFAULT_TOP,
        help=f"Max themes to return (default {DEFAULT_TOP})",
    )
    p.add_argument(
        "--model",
        default=None,
        help=f"OpenAI model (default env OPENAI_MODEL or {DEFAULT_MODEL})",
    )
    p.add_argument(
        "--base-url",
        default=None,
        help=f"OpenAI-compatible base URL (default env OPENAI_BASE_URL or {DEFAULT_BASE_URL})",
    )
    return p


def main(argv: list[str] | None = None) -> int:
    factory_root = _find_root()
    load_dotenv(factory_root / ".env")
    load_dotenv()  # also allow cwd / parent

    args = build_parser().parse_args(argv)
    api_key = (os.getenv("OPENAI_API_KEY") or "").strip()
    if not api_key:
        print(
            "OPENAI_API_KEY is required. Set it in factory/.env (see .env.example).",
            file=sys.stderr,
        )
        return 1

    model = (args.model or os.getenv("OPENAI_MODEL") or DEFAULT_MODEL).strip()
    base_url = (args.base_url or os.getenv("OPENAI_BASE_URL") or DEFAULT_BASE_URL).strip()

    in_path = Path(args.in_path)
    if not in_path.is_absolute():
        # Prefer factory-relative, then cwd
        cand = factory_root / in_path
        in_path = cand if cand.exists() else Path.cwd() / args.in_path
    if not in_path.exists():
        print(f"Input not found: {in_path}", file=sys.stderr)
        return 1

    out_path = Path(args.out_path)
    if not out_path.is_absolute():
        out_path = factory_root / out_path

    memory_dir = _repo_root(factory_root) / "memory" / "company" / "reviews"

    theme_set = run_cluster(
        in_path=in_path.resolve(),
        out_path=out_path,
        top=max(1, args.top),
        model=model,
        base_url=base_url,
        api_key=api_key,
        memory_dir=memory_dir,
    )

    print(f"Wrote {out_path} ({len(theme_set.themes)} themes)")
    print(f"Wrote {memory_dir / 'themes.md'} and per-run slug under {memory_dir}/")
    for i, t in enumerate(theme_set.themes, start=1):
        print(f"  {i}. [{t.kind.value}] {t.title} (severity={t.severity}, n≈{t.review_count})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
