#!/usr/bin/env python3
"""Mint problem/feature tickets from clustered review themes (Phase 3).

Examples:
  cd factory && uv run tickets --in data/themes_acmepulse.json --out data/tickets_acmepulse.json
  uv run tickets --in data/themes_katzs.json --out data/tickets_katzs.json
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
    Theme,
    ThemeKind,
    ThemeSet,
    Ticket,
    TicketSet,
    TicketSetMeta,
    TicketType,
    utc_now_iso,
)

DEFAULT_MODEL = "gpt-4o-mini"
DEFAULT_BASE_URL = "https://api.openai.com/v1"

SYSTEM_PROMPT = """You rewrite review themes into product tickets.

Rules:
- Return ONLY valid JSON matching the schema (no markdown fences).
- Each ticket is a PROBLEM or FEATURE IDEA only — never an implementation plan,
  tech stack, API design, or "how to build it".
- statement: one clear sentence describing the customer problem or desired capability.
- why_it_matters: one short sentence on impact (pain, churn, workflow block).
- Keep title short and product-facing. Preserve priority and evidence as given.
- Do not invent new evidence quotes or review ids.
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
    if factory_root.name == "factory":
        return factory_root.parent
    return factory_root


def _slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or "ticket"


def _token_set(text: str) -> set[str]:
    return {w for w in re.split(r"[^a-z0-9]+", text.lower()) if len(w) > 2}


def _similar(a: str, b: str) -> bool:
    """True when titles share substantial token overlap (dedupe near-duplicates)."""
    ta, tb = _token_set(a), _token_set(b)
    if not ta or not tb:
        return _slugify(a) == _slugify(b)
    overlap = len(ta & tb) / max(1, min(len(ta), len(tb)))
    if overlap >= 0.6:
        return True
    sa, sb = _slugify(a), _slugify(b)
    if sa == sb or sa in sb or sb in sa:
        return True
    return False


def load_theme_set(path: Path) -> ThemeSet:
    data = json.loads(path.read_text(encoding="utf-8"))
    return ThemeSet.model_validate(data)


def actionable_themes(themes: list[Theme]) -> list[Theme]:
    """Keep bug/feature themes; drop praise/other noise."""
    return [t for t in themes if t.kind in (ThemeKind.BUG, ThemeKind.FEATURE)]


def dedupe_themes(themes: list[Theme]) -> list[Theme]:
    """Merge near-duplicate themes; keep higher priority / more evidence."""
    ranked = sorted(
        themes,
        key=lambda t: (t.severity, t.review_count, len(t.evidence_quotes)),
        reverse=True,
    )
    merged: list[Theme] = []
    for theme in ranked:
        match_idx: int | None = None
        for i, existing in enumerate(merged):
            if _similar(existing.title, theme.title) or _similar(existing.id, theme.id):
                match_idx = i
                break
        if match_idx is None:
            merged.append(theme)
            continue
        existing = merged[match_idx]
        quotes = {(q.review_id, q.quote): q for q in existing.evidence_quotes}
        for q in theme.evidence_quotes:
            quotes[(q.review_id, q.quote)] = q
        combined = list(quotes.values())[:8]
        severity = max(existing.severity, theme.severity)
        review_count = max(existing.review_count, theme.review_count)
        # Prefer the richer summary / action text.
        summary = (
            existing.summary
            if len(existing.summary) >= len(theme.summary)
            else theme.summary
        )
        action = (
            existing.candidate_action
            if len(existing.candidate_action) >= len(theme.candidate_action)
            else theme.candidate_action
        )
        # Prefer bug over feature when merging mixed kinds (problem first).
        kind = existing.kind
        if existing.kind != ThemeKind.BUG and theme.kind == ThemeKind.BUG:
            kind = ThemeKind.BUG
        merged[match_idx] = Theme(
            id=existing.id,
            title=existing.title if len(existing.title) >= len(theme.title) else theme.title,
            kind=kind,
            severity=severity,
            review_count=review_count,
            summary=summary,
            evidence_quotes=combined,
            candidate_action=action,
        )
    return merged


def theme_to_ticket_type(kind: ThemeKind) -> TicketType:
    if kind == ThemeKind.BUG:
        return TicketType.PROBLEM
    return TicketType.FEATURE


def _fallback_statement(theme: Theme, ticket_type: TicketType) -> str:
    """Heuristic statement when LLM rewrite is unavailable."""
    base = (theme.summary or theme.title).strip()
    # Strip implementation-y leading verbs from candidate_action if summary is thin.
    if len(base) < 40 and theme.candidate_action:
        action = theme.candidate_action.strip()
        action = re.sub(
            r"^(prioritize|implement|fix|add|address|audit|build)\s+",
            "",
            action,
            flags=re.I,
        )
        base = action or base
    if ticket_type == TicketType.PROBLEM:
        if not base.lower().startswith(("customers", "users", "the ")):
            return f"Customers experience: {base.rstrip('.')}."
        return base if base.endswith(".") else base + "."
    if not re.match(r"^(add|support|enable|provide|allow)\b", base, re.I):
        return f"Customers want: {base.rstrip('.')}."
    return base if base.endswith(".") else base + "."


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
        "max_tokens": 1200,
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


def _parse_tickets_json(raw: str) -> list[dict[str, Any]]:
    data = json.loads(raw)
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        for key in ("tickets", "items", "results"):
            if isinstance(data.get(key), list):
                return data[key]
        if "title" in data and ("statement" in data or "type" in data):
            return [data]
    raise ValueError(f"Could not find tickets array in model JSON: {raw[:400]!r}")


def rewrite_tickets_llm(
    themes: list[Theme],
    *,
    api_key: str,
    base_url: str,
    model: str,
    place_name: str,
) -> list[Ticket]:
    payload_themes = []
    for t in themes:
        payload_themes.append(
            {
                "id": t.id,
                "title": t.title,
                "type": theme_to_ticket_type(t.kind).value,
                "priority": t.severity,
                "review_count": t.review_count,
                "summary": t.summary,
                "candidate_action": t.candidate_action,
                "evidence_quotes": [
                    {
                        "review_id": q.review_id,
                        "quote": q.quote,
                        "rating": q.rating,
                    }
                    for q in t.evidence_quotes
                ],
            }
        )
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {
            "role": "user",
            "content": (
                f"Rewrite these {place_name} themes into tickets. JSON shape:\n"
                '{"tickets":[{"id":"...","type":"problem|feature","title":"...",'
                '"statement":"...","why_it_matters":"...","priority":1-5,'
                '"review_count":N,"evidence_quotes":[{"review_id":"...","quote":"...",'
                '"rating":1-5}]}]}\n\n'
                f"{json.dumps({'place_name': place_name, 'themes': payload_themes}, ensure_ascii=False)}"
            ),
        },
    ]
    content = _chat_completion(
        api_key=api_key, base_url=base_url, model=model, messages=messages
    )
    raw_tickets = _parse_tickets_json(content)
    by_id = {t.id: t for t in themes}
    rewritten: dict[str, Ticket] = {}
    for i, raw in enumerate(raw_tickets):
        if not isinstance(raw, dict):
            continue
        tid = str(raw.get("id") or "").strip()
        source = by_id.get(tid)
        if source is None and i < len(themes):
            source = themes[i]
            tid = source.id
        if source is None:
            continue

        type_raw = str(raw.get("type") or theme_to_ticket_type(source.kind).value).lower()
        try:
            ticket_type = TicketType(type_raw)
        except ValueError:
            ticket_type = theme_to_ticket_type(source.kind)

        # Always keep original evidence (model must not invent).
        quotes = list(source.evidence_quotes)
        title = str(raw.get("title") or source.title).strip()
        statement = str(raw.get("statement") or "").strip()
        if not statement:
            statement = _fallback_statement(source, ticket_type)
        why = str(raw.get("why_it_matters") or "").strip()
        if not why:
            why = source.summary.strip() or title

        priority_raw = raw.get("priority", source.severity)
        try:
            priority = int(priority_raw)
        except (TypeError, ValueError):
            priority = source.severity
        priority = max(1, min(5, priority))

        ticket_id = source.id
        rewritten[ticket_id] = Ticket(
            id=ticket_id,
            type=ticket_type,
            title=title,
            statement=statement,
            why_it_matters=why,
            priority=priority,
            review_count=source.review_count,
            evidence_quotes=quotes,
        )

    # Guarantee one ticket per deduped theme (model may drop some).
    tickets: list[Ticket] = []
    for theme in themes:
        if theme.id in rewritten:
            tickets.append(rewritten[theme.id])
        else:
            tickets.extend(themes_to_tickets_fallback([theme]))
    return tickets


def themes_to_tickets_fallback(themes: list[Theme]) -> list[Ticket]:
    tickets: list[Ticket] = []
    for t in themes:
        ticket_type = theme_to_ticket_type(t.kind)
        tickets.append(
            Ticket(
                id=t.id,
                type=ticket_type,
                title=t.title,
                statement=_fallback_statement(t, ticket_type),
                why_it_matters=t.summary.strip() or t.title,
                priority=t.severity,
                review_count=t.review_count,
                evidence_quotes=list(t.evidence_quotes),
            )
        )
    return tickets


def tickets_to_markdown(ticket_set: TicketSet) -> str:
    m = ticket_set.meta
    lines = [
        f"# Review tickets — {m.place_name}",
        "",
        f"- Themes: `{m.themes_path}`",
        f"- Model: `{m.model}`",
        f"- Minted at: {m.minted_at}",
        f"- Input themes: {m.input_theme_count} → tickets: {m.ticket_count}",
        "",
    ]
    for i, t in enumerate(ticket_set.tickets, start=1):
        lines.extend(
            [
                f"## {i}. {t.title}",
                "",
                f"- **id:** `{t.id}`",
                f"- **type:** {t.type.value}",
                f"- **priority:** {t.priority}/5",
                f"- **review_count:** {t.review_count}",
                "",
                f"**Statement:** {t.statement}",
                "",
                f"**Why it matters:** {t.why_it_matters}",
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
    ticket_set: TicketSet,
    *,
    out_json: Path,
    memory_dir: Path,
    slug: str,
) -> tuple[Path, Path, Path]:
    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(
        json.dumps(ticket_set.model_dump_json_ready(), indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    memory_dir.mkdir(parents=True, exist_ok=True)
    md = tickets_to_markdown(ticket_set)
    latest = memory_dir / "tickets.md"
    per_run = memory_dir / f"tickets_{slug}.md"
    latest.write_text(md, encoding="utf-8")
    per_run.write_text(md, encoding="utf-8")
    return out_json, latest, per_run


def run_tickets(
    *,
    in_path: Path,
    out_path: Path,
    model: str,
    base_url: str,
    api_key: str | None,
    memory_dir: Path,
    no_llm: bool = False,
) -> TicketSet:
    theme_set = load_theme_set(in_path)
    place_name = theme_set.meta.place_name
    input_count = len(theme_set.themes)

    themes = dedupe_themes(actionable_themes(theme_set.themes))
    if not themes:
        raise SystemExit("No bug/feature themes to mint into tickets.")

    used_model = model
    if no_llm or not api_key:
        tickets = themes_to_tickets_fallback(themes)
        used_model = "fallback-heuristic" if no_llm or not api_key else model
    else:
        tickets = rewrite_tickets_llm(
            themes,
            api_key=api_key,
            base_url=base_url,
            model=model,
            place_name=place_name,
        )
        if not tickets:
            tickets = themes_to_tickets_fallback(themes)
            used_model = f"{model}+fallback"

    # Rank: priority then review_count.
    tickets = sorted(
        tickets,
        key=lambda t: (t.priority, t.review_count, len(t.evidence_quotes)),
        reverse=True,
    )

    ticket_set = TicketSet(
        meta=TicketSetMeta(
            themes_path=str(in_path),
            place_name=place_name,
            model=used_model,
            minted_at=utc_now_iso(),
            input_theme_count=input_count,
            ticket_count=len(tickets),
        ),
        tickets=tickets,
    )
    slug = _slugify(place_name)
    write_outputs(ticket_set, out_json=out_path, memory_dir=memory_dir, slug=slug)
    return ticket_set


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Mint problem/feature tickets from clustered themes."
    )
    p.add_argument(
        "--in",
        dest="in_path",
        required=True,
        help="Input themes JSON ({ meta, themes })",
    )
    p.add_argument(
        "--out",
        dest="out_path",
        required=True,
        help="Output tickets JSON path (e.g. data/tickets_acmepulse.json)",
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
    p.add_argument(
        "--no-llm",
        action="store_true",
        help="Skip LLM rewrite; heuristic statements only",
    )
    return p


def main(argv: list[str] | None = None) -> int:
    factory_root = _find_root()
    load_dotenv(factory_root / ".env")
    load_dotenv()

    args = build_parser().parse_args(argv)
    api_key = (os.getenv("OPENAI_API_KEY") or "").strip() or None
    if not args.no_llm and not api_key:
        print(
            "OPENAI_API_KEY is required (or pass --no-llm). "
            "Set it in factory/.env (see .env.example).",
            file=sys.stderr,
        )
        return 1

    model = (args.model or os.getenv("OPENAI_MODEL") or DEFAULT_MODEL).strip()
    base_url = (args.base_url or os.getenv("OPENAI_BASE_URL") or DEFAULT_BASE_URL).strip()

    in_path = Path(args.in_path)
    if not in_path.is_absolute():
        cand = factory_root / in_path
        in_path = cand if cand.exists() else Path.cwd() / args.in_path
    if not in_path.exists():
        print(f"Input not found: {in_path}", file=sys.stderr)
        return 1

    out_path = Path(args.out_path)
    if not out_path.is_absolute():
        out_path = factory_root / out_path

    memory_dir = _repo_root(factory_root) / "memory" / "company" / "reviews"

    ticket_set = run_tickets(
        in_path=in_path.resolve(),
        out_path=out_path,
        model=model,
        base_url=base_url,
        api_key=api_key,
        memory_dir=memory_dir,
        no_llm=bool(args.no_llm),
    )

    print(f"Wrote {out_path} ({len(ticket_set.tickets)} tickets)")
    print(f"Wrote {memory_dir / 'tickets.md'} and per-run slug under {memory_dir}/")
    for i, t in enumerate(ticket_set.tickets, start=1):
        print(
            f"  {i}. [{t.type.value}] {t.title} "
            f"(priority={t.priority}, n≈{t.review_count})"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
