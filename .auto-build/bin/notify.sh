#!/usr/bin/env bash
# notify.sh "message" — posts {"text": message} to the webhook in .auto-build/config.json (Slack / Teams / Google Chat).
WS="$(cd "$(dirname "$0")/../.." && pwd)"
URL=$(node -e "try{const c=require('$WS/.auto-build/config.json');console.log(c.notifyWebhook||'')}catch{console.log('')}")
[ -z "$URL" ] && exit 0
MSG=$(node -e 'console.log(JSON.stringify({text: process.argv[1]}))' "$1")
curl -s -m 10 -X POST -H 'Content-Type: application/json' -d "$MSG" "$URL" >/dev/null || true
