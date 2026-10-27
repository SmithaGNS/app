#!/usr/bin/env bash
# preflight.sh [--fix] — checks prerequisites for setup-project / auto-build.
# Writes <ws>/.auto-build/preflight.json; prints a table. --fix installs what can be installed locally.
WS="${WS:-$(cd "$(dirname "$0")/../.." && pwd)}"
FIX=0; [ "${1:-}" = "--fix" ] && FIX=1
mkdir -p "$WS/.auto-build"
results=()
add() { results+=("{\"tool\":\"$1\",\"required\":$2,\"ok\":$3,\"version\":\"$4\",\"hint\":\"$5\"}"); printf "%-14s %-9s %-4s %s\n" "$1" "$([ "$2" = true ] && echo required || echo optional)" "$([ "$3" = true ] && echo ✓ || echo ✗)" "${4:-$5}"; }
has() { command -v "$1" >/dev/null 2>&1; }

printf "%-14s %-9s %-4s %s\n" TOOL NEED OK "VERSION / HINT"
# Node >= 20
if has node; then v=$(node -v); major=${v#v}; major=${major%%.*}
  if [ "$major" -ge 20 ]; then add node true true "$v" ""; else add node true false "$v" "Node 20+ required (AdonisJS 6)"; fi
else add node true false "" "install Node.js 20+ (https://nodejs.org)"; fi
has npm && add npm true true "$(npm -v)" "" || add npm true false "" "comes with Node.js"
has git && add git true true "$(git --version | awk '{print $3}')" "" || add git true false "" "install git"
has claude && add claude true true "$(claude --version 2>/dev/null | head -1)" "" || add claude true false "" "npm install -g @anthropic-ai/claude-code"
# Database: docker compose OR local postgres
if has docker && docker compose version >/dev/null 2>&1; then add docker true true "$(docker --version | awk '{print $3}' | tr -d ,)" ""; dockerok=1
else add docker false false "" "Docker Desktop — or a local PostgreSQL 14+"; dockerok=0; fi
if has psql; then add postgres false true "$(psql --version | awk '{print $3}')" ""
elif [ $dockerok -eq 0 ]; then add postgres true false "" "need Docker or a local PostgreSQL"; else add postgres false true "via docker" ""; fi
# Playwright browsers
if [ -d "$HOME/.cache/ms-playwright" ] || [ -d "$HOME/Library/Caches/ms-playwright" ]; then add playwright true true "browsers installed" ""
else
  if [ $FIX -eq 1 ] && has npx; then npx -y playwright install chromium >/dev/null 2>&1 && add playwright true true "installed now" "" || add playwright true false "" "npx playwright install chromium"
  else add playwright true false "" "npx playwright install chromium"; fi
fi
# Document converters
if has markitdown; then add markitdown false true "" ""; elif has pandoc; then add pandoc false true "$(pandoc -v | head -1 | awk '{print $2}')" ""
else
  if [ $FIX -eq 1 ] && has pip; then pip install -q markitdown >/dev/null 2>&1 && add markitdown false true "installed now" "" || add converter false false "" "pip install markitdown (or install pandoc) — needed for .docx/.xlsx"
  else add converter false false "" "pip install markitdown (or install pandoc) — needed for .docx/.xlsx"; fi
fi
has curl && add curl true true "" "" || add curl true false "" "install curl"
has cloudflared && add cloudflared false true "" "" || add cloudflared false false "" "optional — only for tunnel links"

json="[$(IFS=,; echo "${results[*]}")]"
echo "{\"checkedAt\":\"$(date -u +%FT%TZ)\",\"results\":$json}" > "$WS/.auto-build/preflight.json"
echo "$json" | grep -q '"required":true,"ok":false' && { echo "PREFLIGHT: missing required tools"; exit 2; } || echo "PREFLIGHT: ok"
