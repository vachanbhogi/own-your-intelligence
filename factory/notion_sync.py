#!/usr/bin/env python3
"""Push factory tickets into a Notion database (idempotent upsert by Ticket ID).

Requires in factory/.env (gitignored — never commit):
  NOTION_TOKEN=secret_…          # Internal Integration token
  NOTION_DATABASE_ID=…           # Features database id (32-hex, with/without dashes)

Optional:
  NOTION_PARENT_PAGE_ID=…        # If DATABASE_ID unset, create DB under this page

Examples:
  cd factory && uv run notion-sync --in data/tickets_acmepulse.json
  uv run notion-sync --in data/tickets_acmepulse.json --dry-run
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any

import httpx
from dotenv import load_dotenv

from schema import Ticket, TicketSet

NOTION_VERSION = "2022-06-28"
API_BASE = "https://api.notion.com/v1"
EVIDENCE_MAX_CHARS = 1800
RICH_TEXT_MAX = 2000


def _find_factory_root() -> Path:
    cwd = Path.cwd()
    for candidate in [cwd, *cwd.parents]:
        if (candidate / "factory" / "schema.py").exists():
            return candidate / "factory"
        if candidate.name == "factory" and (candidate / "schema.py").exists():
            return candidate
    here = Path(__file__).resolve().parent
    if (here / "schema.py").exists():
        return here
    return cwd if (cwd / "schema.py").exists() else here


def _mask_token(token: str) -> str:
    if len(token) <= 10:
        return "***"
    return f"{token[:6]}…{token[-4:]}"


def _normalize_id(raw: str) -> str:
    """Accept UUID with/without dashes or a Notion URL containing the id."""
    s = (raw or "").strip()
    if not s:
        return ""
    # URL: …/Title-<32hex> or …?p=<32hex> or bare 32hex / uuid
    m = re.search(
        r"([0-9a-fA-F]{32})|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-"
        r"[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
        s,
    )
    if not m:
        return s
    hex32 = m.group(0).replace("-", "")
    if len(hex32) != 32:
        return s
    return (
        f"{hex32[0:8]}-{hex32[8:12]}-{hex32[12:16]}-"
        f"{hex32[16:20]}-{hex32[20:32]}"
    )


def _rich_text(content: str, *, limit: int = RICH_TEXT_MAX) -> list[dict[str, Any]]:
    text = (content or "")[:limit]
    if not text:
        return []
    return [{"type": "text", "text": {"content": text}}]


def _database_url(database_id: str) -> str:
    compact = database_id.replace("-", "")
    return f"https://www.notion.so/{compact}"


class NotionClient:
    def __init__(self, token: str) -> None:
        self.token = token
        self._client = httpx.Client(
            base_url=API_BASE,
            headers={
                "Authorization": f"Bearer {token}",
                "Notion-Version": NOTION_VERSION,
                "Content-Type": "application/json",
            },
            timeout=60.0,
        )

    def close(self) -> None:
        self._client.close()

    def _request(self, method: str, path: str, **kwargs: Any) -> dict[str, Any]:
        resp = self._client.request(method, path, **kwargs)
        if resp.status_code >= 400:
            detail = resp.text[:800]
            raise RuntimeError(f"Notion HTTP {resp.status_code} {method} {path}: {detail}")
        if not resp.content:
            return {}
        return resp.json()

    def get_database(self, database_id: str) -> dict[str, Any]:
        return self._request("GET", f"/databases/{database_id}")

    def create_database(self, parent_page_id: str, title: str = "Factory features") -> dict[str, Any]:
        body = {
            "parent": {"type": "page_id", "page_id": parent_page_id},
            "title": [{"type": "text", "text": {"content": title}}],
            "properties": {
                "Name": {"title": {}},
                "Ticket ID": {"rich_text": {}},
                "Type": {
                    "select": {
                        "options": [
                            {"name": "problem", "color": "red"},
                            {"name": "feature", "color": "blue"},
                        ]
                    }
                },
                "Priority": {"number": {"format": "number"}},
                "Statement": {"rich_text": {}},
                "Why it matters": {"rich_text": {}},
                "Review count": {"number": {"format": "number"}},
                "Status": {
                    "select": {
                        "options": [
                            {"name": "backlog", "color": "gray"},
                            {"name": "in progress", "color": "yellow"},
                            {"name": "done", "color": "green"},
                        ]
                    }
                },
                "Source corpus": {"rich_text": {}},
                "Evidence": {"rich_text": {}},
            },
        }
        return self._request("POST", "/databases", json=body)

    def query_by_ticket_id(self, database_id: str, ticket_id: str) -> str | None:
        """Return existing page id for Ticket ID, or None."""
        body = {
            "filter": {
                "property": "Ticket ID",
                "rich_text": {"equals": ticket_id},
            },
            "page_size": 1,
        }
        data = self._request("POST", f"/databases/{database_id}/query", json=body)
        results = data.get("results") or []
        if not results:
            return None
        return results[0].get("id")

    def create_page(self, database_id: str, properties: dict[str, Any]) -> dict[str, Any]:
        return self._request(
            "POST",
            "/pages",
            json={
                "parent": {"database_id": database_id},
                "properties": properties,
            },
        )

    def update_page(self, page_id: str, properties: dict[str, Any]) -> dict[str, Any]:
        return self._request(
            "PATCH",
            f"/pages/{page_id}",
            json={"properties": properties},
        )


def load_ticket_set(path: Path) -> TicketSet:
    data = json.loads(path.read_text(encoding="utf-8"))
    return TicketSet.model_validate(data)


def format_evidence(ticket: Ticket) -> str:
    parts: list[str] = []
    for eq in ticket.evidence_quotes[:8]:
        quote = (eq.quote or "").strip()
        if not quote:
            continue
        parts.append(f'[{eq.review_id}] "{quote}"')
    joined = "\n".join(parts)
    if len(joined) > EVIDENCE_MAX_CHARS:
        return joined[: EVIDENCE_MAX_CHARS - 1] + "…"
    return joined


def ticket_properties(ticket: Ticket, source_corpus: str) -> dict[str, Any]:
    return {
        "Name": {"title": _rich_text(ticket.title)},
        "Ticket ID": {"rich_text": _rich_text(ticket.id)},
        "Type": {"select": {"name": ticket.type.value}},
        "Priority": {"number": ticket.priority},
        "Statement": {"rich_text": _rich_text(ticket.statement)},
        "Why it matters": {"rich_text": _rich_text(ticket.why_it_matters)},
        "Review count": {"number": ticket.review_count},
        "Status": {"select": {"name": "backlog"}},
        "Source corpus": {"rich_text": _rich_text(source_corpus)},
        "Evidence": {"rich_text": _rich_text(format_evidence(ticket))},
    }


def ensure_database(
    client: NotionClient,
    database_id: str | None,
    parent_page_id: str | None,
) -> str:
    if database_id:
        client.get_database(database_id)
        return database_id
    if not parent_page_id:
        raise RuntimeError(
            "Set NOTION_DATABASE_ID, or pass --database-id / --parent-page-id "
            "(or NOTION_PARENT_PAGE_ID) so a Factory features DB can be created."
        )
    print(f"Creating Notion database under page {parent_page_id}…")
    created = client.create_database(parent_page_id)
    new_id = created.get("id") or ""
    if not new_id:
        raise RuntimeError(f"Create database returned no id: {created}")
    print(f"Created database id={new_id}")
    print(f"Add to factory/.env: NOTION_DATABASE_ID={new_id.replace('-', '')}")
    return new_id


def sync_tickets(
    client: NotionClient,
    database_id: str,
    ticket_set: TicketSet,
    *,
    dry_run: bool = False,
) -> tuple[int, int]:
    source = ticket_set.meta.place_name or "unknown"
    created = 0
    updated = 0
    for ticket in ticket_set.tickets:
        props = ticket_properties(ticket, source)
        existing = client.query_by_ticket_id(database_id, ticket.id)
        if dry_run:
            action = "update" if existing else "create"
            print(f"  [dry-run] {action} {ticket.id!r} — {ticket.title}")
            if existing:
                updated += 1
            else:
                created += 1
            continue
        if existing:
            client.update_page(existing, props)
            print(f"  updated {ticket.id}")
            updated += 1
        else:
            page = client.create_page(database_id, props)
            url = page.get("url") or existing
            print(f"  created {ticket.id}" + (f" → {url}" if url else ""))
            created += 1
    return created, updated


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Upsert factory tickets into a Notion features database."
    )
    p.add_argument(
        "--in",
        dest="input_path",
        required=True,
        help="Path to tickets_*.json (TicketSet)",
    )
    p.add_argument(
        "--database-id",
        default=None,
        help="Override NOTION_DATABASE_ID",
    )
    p.add_argument(
        "--parent-page-id",
        default=None,
        help="If no database id, create Factory features DB under this page",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Query existing rows and print actions without writing",
    )
    return p


def main(argv: list[str] | None = None) -> int:
    factory_root = _find_factory_root()
    load_dotenv(factory_root / ".env")
    load_dotenv()
    args = build_parser().parse_args(argv)

    token = (os.getenv("NOTION_TOKEN") or "").strip()
    if not token:
        print(
            "NOTION_TOKEN unset.\n"
            "1. Notion → Settings → Integrations → New internal integration\n"
            "2. Copy the secret token into factory/.env as NOTION_TOKEN=\n"
            "3. Share the target page/database with that integration\n"
            "4. Set NOTION_DATABASE_ID= (or NOTION_PARENT_PAGE_ID= to create one)\n"
            "Never commit .env.",
            file=sys.stderr,
        )
        return 2

    database_id = _normalize_id(
        args.database_id or (os.getenv("NOTION_DATABASE_ID") or "")
    )
    parent_page_id = _normalize_id(
        args.parent_page_id or (os.getenv("NOTION_PARENT_PAGE_ID") or "")
    )

    in_path = Path(args.input_path)
    if not in_path.is_file():
        # Resolve relative to factory root
        alt = factory_root / args.input_path
        if alt.is_file():
            in_path = alt
        else:
            print(f"Tickets file not found: {args.input_path}", file=sys.stderr)
            return 1

    try:
        ticket_set = load_ticket_set(in_path)
    except Exception as exc:
        print(f"Invalid TicketSet: {exc}", file=sys.stderr)
        return 1

    print(
        f"Syncing {len(ticket_set.tickets)} ticket(s) from {in_path.name} "
        f"(token={_mask_token(token)})"
    )

    client = NotionClient(token)
    try:
        try:
            db_id = ensure_database(
                client,
                database_id or None,
                parent_page_id or None,
            )
        except Exception as exc:
            print(f"Database setup failed: {exc}", file=sys.stderr)
            return 1

        try:
            created, updated = sync_tickets(
                client, db_id, ticket_set, dry_run=args.dry_run
            )
        except Exception as exc:
            print(f"Sync failed: {exc}", file=sys.stderr)
            return 1

        url = _database_url(db_id)
        print(
            f"Done: {created} created, {updated} updated"
            + (" (dry-run)" if args.dry_run else "")
        )
        print(f"Notion database: {url}")
        return 0
    finally:
        client.close()


if __name__ == "__main__":
    raise SystemExit(main())
