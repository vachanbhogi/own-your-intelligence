#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ -f "$root/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$root/.env"
  set +a
fi

if [[ -n "${GH_TOKEN:-}" ]]; then
  export GH_TOKEN
  export GITHUB_TOKEN="$GH_TOKEN"
fi

export PATH="${HOME}/.superset/bin:${PATH}"

if ! command -v superset >/dev/null 2>&1; then
  echo "superset CLI not found — install the Superset app or the standalone CLI" >&2
  exit 1
fi

superset start --daemon
superset status
