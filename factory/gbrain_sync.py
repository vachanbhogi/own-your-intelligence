#!/usr/bin/env python3
"""Sync company memory into remote GBrain over HTTPS MCP (preferred).

Remote (default — gbrain.io):
  Set in factory/.env (gitignored):
    GBRAIN_MCP_URL=https://gbrain.io/mcp
    GBRAIN_TOKEN=gbu_…   # never commit

  cd factory && uv run gbrain-sync --put reviews/tickets
  uv run gbrain-sync --source company          # put all *.md under memory/company
  uv run gbrain-sync --remember "fact…" --provenance "factory tickets"

Optional local CLI (fallback when MCP env unset):
  bun install -g github:garrytan/gbrain#latest-stable
  gbrain connect https://gbrain.io/mcp --token "$GBRAIN_TOKEN"
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

from dotenv import load_dotenv

DEFAULT_MCP_URL = "https://gbrain.io/mcp"


def _find_factory_root() -> Path:
    """Prefer the checkout factory/ over an installed site-packages copy."""
    cwd = Path.cwd()
    for candidate in [cwd, *cwd.parents]:
        if (candidate / "factory" / "schema.py").exists() and (
            candidate / "memory" / "company"
        ).is_dir():
            return candidate / "factory"
        if (
            candidate.name == "factory"
            and (candidate / "schema.py").exists()
            and (candidate.parent / "memory" / "company").is_dir()
        ):
            return candidate
    here = Path(__file__).resolve().parent
    if (here / "schema.py").exists():
        return here
    return cwd if (cwd / "schema.py").exists() else here


def _repo_root(factory_root: Path) -> Path:
    if factory_root.name == "factory":
        return factory_root.parent
    # Installed wheel: walk up for memory/company
    for candidate in [factory_root, *factory_root.parents]:
        if (candidate / "memory" / "company").is_dir():
            return candidate
    return factory_root.parent if factory_root.name == "factory" else factory_root


def _mask_token(token: str) -> str:
    if len(token) <= 10:
        return "***"
    return f"{token[:6]}…{token[-4:]}"


class McpClient:
    """Minimal JSON-RPC client for GBrain streamable-HTTP MCP."""

    def __init__(self, url: str, token: str) -> None:
        self.url = url.rstrip("/")
        self.token = token
        self.session_id: str | None = None
        self._req_id = 0

    def _headers(self) -> dict[str, str]:
        h = {
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
            "Authorization": f"Bearer {self.token}",
        }
        if self.session_id:
            h["Mcp-Session-Id"] = self.session_id
        return h

    def _parse_body(self, raw: str) -> dict[str, Any]:
        text = raw.strip()
        if not text:
            return {}
        if text.startswith("event:") or text.startswith("data:"):
            chunks: list[str] = []
            for line in text.splitlines():
                if line.startswith("data:"):
                    chunks.append(line[5:].strip())
            text = "\n".join(c for c in chunks if c)
        if not text:
            return {}
        return json.loads(text)

    def _post(self, payload: dict[str, Any], *, expect_json: bool = True) -> dict[str, Any]:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            self.url, data=data, headers=self._headers(), method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                sid = resp.headers.get("mcp-session-id") or resp.headers.get(
                    "Mcp-Session-Id"
                )
                if sid:
                    self.session_id = sid
                raw = resp.read().decode("utf-8", errors="replace")
                if not expect_json:
                    return {"_raw": raw, "_status": resp.status}
                return self._parse_body(raw)
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")[:800]
            raise RuntimeError(f"MCP HTTP {exc.code}: {detail}") from exc

    def initialize(self) -> dict[str, Any]:
        self._req_id += 1
        result = self._post(
            {
                "jsonrpc": "2.0",
                "id": self._req_id,
                "method": "initialize",
                "params": {
                    "protocolVersion": "2024-11-05",
                    "capabilities": {},
                    "clientInfo": {"name": "factory-gbrain-sync", "version": "0.1.0"},
                },
            }
        )
        # Best-effort initialized notification (may return empty / 202).
        try:
            self._post(
                {"jsonrpc": "2.0", "method": "notifications/initialized"},
                expect_json=False,
            )
        except Exception:
            pass
        return result

    def call_tool(self, name: str, arguments: dict[str, Any]) -> Any:
        self._req_id += 1
        envelope = self._post(
            {
                "jsonrpc": "2.0",
                "id": self._req_id,
                "method": "tools/call",
                "params": {"name": name, "arguments": arguments},
            }
        )
        if "error" in envelope:
            raise RuntimeError(f"MCP error for {name}: {envelope['error']}")
        result = envelope.get("result") or {}
        if result.get("isError"):
            raise RuntimeError(f"Tool {name} returned error: {result}")
        content = result.get("content") or []
        if not content:
            return result
        first = content[0]
        if isinstance(first, dict) and first.get("type") == "text":
            text = first.get("text") or ""
            try:
                return json.loads(text)
            except json.JSONDecodeError:
                return text
        return result


def _slug_from_rel(rel: Path) -> str:
    """memory/company/reviews/tickets.md → reviews/tickets"""
    parts = list(rel.with_suffix("").parts)
    return "/".join(parts)


def put_markdown_via_mcp(client: McpClient, slug: str, markdown_path: Path) -> Any:
    content = markdown_path.read_text(encoding="utf-8")
    print(f"+ mcp put_page slug={slug} file={markdown_path.name} ({len(content)} chars)")
    return client.call_tool(
        "put_page",
        {
            "slug": slug,
            "content": content,
            "ingested_via": "factory-gbrain-sync",
            "source_kind": "factory",
            "source_uri": str(markdown_path),
        },
    )


def remember_via_mcp(
    client: McpClient, fact: str, provenance: str, entity: str | None = None
) -> Any:
    args: dict[str, Any] = {"fact": fact, "provenance": provenance}
    if entity:
        args["entity"] = entity
    print(f"+ mcp remember provenance={provenance!r} fact_len={len(fact)}")
    return client.call_tool("remember", args)


def put_tree_via_mcp(client: McpClient, memory_company: Path) -> int:
    """Put every *.md under memory/company; slug is path relative to that root."""
    md_files = sorted(memory_company.rglob("*.md"))
    if not md_files:
        print(f"No markdown files under {memory_company}", file=sys.stderr)
        return 1
    ok = 0
    for path in md_files:
        rel = path.relative_to(memory_company)
        slug = _slug_from_rel(rel)
        try:
            put_markdown_via_mcp(client, slug, path)
            ok += 1
        except Exception as exc:
            print(f"put_page failed for {slug}: {exc}", file=sys.stderr)
            return 1
    print(f"Put {ok} page(s) from {memory_company}")
    return 0


# --- Optional local CLI fallback (when MCP env unset) -------------------------


def _require_gbrain_cli() -> str:
    path = shutil.which("gbrain")
    if not path:
        print(
            "Neither remote MCP env nor gbrain CLI found.\n"
            "Set GBRAIN_MCP_URL + GBRAIN_TOKEN in factory/.env, or install:\n"
            "  bun install -g github:garrytan/gbrain#latest-stable\n"
            "  gbrain connect https://gbrain.io/mcp --token \"$GBRAIN_TOKEN\"",
            file=sys.stderr,
        )
        raise SystemExit(1)
    return path


def _run(cmd: list[str], *, cwd: Path | None = None) -> int:
    # Redact token-looking args for display
    shown = []
    for i, part in enumerate(cmd):
        if i > 0 and cmd[i - 1] in ("--token", "-t") and len(part) > 8:
            shown.append(_mask_token(part))
        else:
            shown.append(part)
    print("+", " ".join(shown))
    return int(subprocess.run(cmd, cwd=str(cwd) if cwd else None).returncode)


def put_page_cli(gbrain: str, page: str, markdown_path: Path) -> int:
    if not markdown_path.is_file():
        print(f"Markdown not found for put: {markdown_path}", file=sys.stderr)
        return 1
    cmd = [gbrain, "put", page]
    print("+", " ".join(cmd), f"< {markdown_path}")
    with markdown_path.open("rb") as fh:
        return int(subprocess.run(cmd, stdin=fh).returncode)


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Sync memory/company into remote GBrain MCP (or local CLI fallback)."
    )
    p.add_argument(
        "--source",
        default=None,
        metavar="ID",
        help="Put all markdown under memory/company (id recorded in logs; use 'company')",
    )
    p.add_argument(
        "--put",
        default=None,
        metavar="PAGE",
        help="Put one page (e.g. reviews/tickets → reviews/tickets.md)",
    )
    p.add_argument(
        "--remember",
        default=None,
        metavar="FACT",
        help="Call MCP remember with this fact string",
    )
    p.add_argument(
        "--provenance",
        default="factory-gbrain-sync",
        help="Provenance for --remember (required by GBrain memory verbs)",
    )
    p.add_argument(
        "--entity",
        default=None,
        help="Optional entity slug for --remember",
    )
    p.add_argument(
        "--search",
        default=None,
        metavar="QUERY",
        help="Smoke-test: MCP search query after writes",
    )
    p.add_argument(
        "--memory-root",
        default=None,
        help="Override path to memory/company (default: ../memory/company)",
    )
    p.add_argument(
        "--mcp-url",
        default=None,
        help=f"Override GBRAIN_MCP_URL (default {DEFAULT_MCP_URL})",
    )
    p.add_argument(
        "--connect-hint",
        action="store_true",
        help="Print Cursor MCP + gbrain connect setup (no secrets)",
    )
    return p


def print_connect_hint(mcp_url: str) -> None:
    print(
        f"""
GBrain remote MCP setup
=======================

factory/.env (gitignored):
  GBRAIN_MCP_URL={mcp_url}
  GBRAIN_TOKEN=gbu_…   # from gbrain.io connection page — never commit

CLI (optional):
  gbrain connect {mcp_url} --token \"$GBRAIN_TOKEN\"

Cursor → Settings → MCP → Add server (HTTP):
  URL:     {mcp_url}
  Header:  Authorization: Bearer <GBRAIN_TOKEN>

Factory:
  uv run gbrain-sync --put reviews/tickets
  uv run gbrain-sync --source company
""".strip()
    )


def main(argv: list[str] | None = None) -> int:
    factory_root = _find_factory_root()
    load_dotenv(factory_root / ".env")
    load_dotenv()
    repo = _repo_root(factory_root)
    args = build_parser().parse_args(argv)

    mcp_url = (
        args.mcp_url
        or (os.getenv("GBRAIN_MCP_URL") or "").strip()
        or DEFAULT_MCP_URL
    )
    token = (os.getenv("GBRAIN_TOKEN") or os.getenv("GBRAIN_REMOTE_TOKEN") or "").strip()

    if args.connect_hint:
        print_connect_hint(mcp_url)
        return 0

    if not args.source and not args.put and not args.remember and not args.search:
        build_parser().print_help()
        print(
            "\nProvide --source company and/or --put reviews/tickets "
            "(or --remember / --search). See --connect-hint.",
            file=sys.stderr,
        )
        return 2

    memory_company = (
        Path(args.memory_root).resolve()
        if args.memory_root
        else (repo / "memory" / "company").resolve()
    )

    use_mcp = bool(token)
    if not use_mcp:
        print(
            "GBRAIN_TOKEN unset — falling back to local `gbrain` CLI "
            "(set GBRAIN_MCP_URL + GBRAIN_TOKEN for remote MCP).",
            file=sys.stderr,
        )

    rc = 0
    client: McpClient | None = None
    if use_mcp:
        print(f"Using remote MCP {mcp_url} token={_mask_token(token)}")
        client = McpClient(mcp_url, token)
        try:
            init = client.initialize()
            server = (init.get("result") or {}).get("serverInfo") or {}
            print(
                f"MCP ok: {server.get('name', 'gbrain')} "
                f"v{server.get('version', '?')}"
            )
        except Exception as exc:
            print(f"MCP initialize failed: {exc}", file=sys.stderr)
            return 1

    if args.source:
        if client:
            rc = put_tree_via_mcp(client, memory_company) or rc
        else:
            gbrain = _require_gbrain_cli()
            rc = _run(
                [
                    gbrain,
                    "sources",
                    "add",
                    args.source,
                    "--path",
                    str(memory_company),
                    "--force",
                ]
            ) or rc
            if rc == 0:
                rc = _run([gbrain, "sync", "--source", args.source]) or rc

    if args.put:
        page = args.put.strip().strip("/")
        md_path = memory_company / Path(*page.split("/")).with_suffix(".md")
        if not md_path.is_file():
            print(f"Markdown not found for put: {md_path}", file=sys.stderr)
            return 1
        if client:
            try:
                put_markdown_via_mcp(client, page, md_path)
            except Exception as exc:
                print(f"put_page failed: {exc}", file=sys.stderr)
                return 1
        else:
            rc = put_page_cli(_require_gbrain_cli(), page, md_path) or rc

    if args.remember:
        if not client:
            print("--remember requires GBRAIN_TOKEN (remote MCP).", file=sys.stderr)
            return 1
        try:
            remember_via_mcp(
                client, args.remember, args.provenance, entity=args.entity
            )
        except Exception as exc:
            print(f"remember failed: {exc}", file=sys.stderr)
            return 1

    if args.search:
        if not client:
            print("--search requires GBRAIN_TOKEN (remote MCP).", file=sys.stderr)
            return 1
        try:
            print(f"+ mcp search query={args.search!r}")
            result = client.call_tool("search", {"query": args.search, "limit": 5})
            # Compact summary — no secrets
            if isinstance(result, dict):
                hits = result.get("results") or result.get("hits") or result.get("pages")
                if isinstance(hits, list):
                    print(f"search hits: {len(hits)}")
                    for h in hits[:5]:
                        if isinstance(h, dict):
                            print(
                                " -",
                                h.get("slug") or h.get("id") or h.get("title") or h,
                            )
                        else:
                            print(" -", h)
                else:
                    print(json.dumps(result, indent=2)[:1200])
            else:
                print(str(result)[:1200])
        except Exception as exc:
            print(f"search failed: {exc}", file=sys.stderr)
            return 1

    return rc


if __name__ == "__main__":
    raise SystemExit(main())
