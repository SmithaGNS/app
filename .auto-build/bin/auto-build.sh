#!/usr/bin/env bash
# auto-build.sh — runs /auto-build one step at a time until done, out of budget, or stopped.
# Each step is a fresh Claude Code session (claude -p), so context never fills up. Safe to re-run: resumes from state.json.
# Usage: .auto-build/bin/auto-build.sh            (from anywhere)
#        STOP: touch .auto-build/STOP
set -u
WS="$(cd "$(dirname "$0")/../.." && pwd)"; AB="$WS/.auto-build"; BIN="$AB/bin"
export WS
st() { node "$BIN/state.js" "$@"; }
cfg() { node -e "try{const c=require('$AB/config.json');const v=c$1;console.log(v===undefined?'':v)}catch{console.log('')}"; }
MAX_HOURS=$(cfg ".budget.maxHours"); MAX_HOURS=${MAX_HOURS:-8}
MAX_CALLS=$(cfg ".budget.maxCalls"); MAX_CALLS=${MAX_CALLS:-500}
LIMIT_WAIT=$(cfg ".budget.limitWaitSeconds"); LIMIT_WAIT=${LIMIT_WAIT:-900}
mkdir -p "$AB/logs"; rm -f "$AB/STOP"
[ -f "$AB/state.json" ] || { echo "No state.json — run /auto-build once in Claude Code first (it initialises the run)."; exit 1; }

st set run.startedAt "\"$(date -u +%FT%TZ)\"" ; st set run.calls 0 ; st set status '"running"'
START=$(date +%s); FAILS=0
"$BIN/notify.sh" "▶️ auto-build started in $(basename "$WS")"

while true; do
  status=$(st get status)
  case "$status" in
    done)   "$BIN/notify.sh" "✅ auto-build finished — $(basename "$WS"). See summary.md and open-questions.csv"; echo "DONE"; exit 0 ;;
    budget|stopped) echo "stopped: $status"; exit 0 ;;
  esac
  [ -f "$AB/STOP" ] && { st set status '"stopped"'; "$BIN/notify.sh" "⏸️ auto-build stopped by STOP file"; exit 0; }
  elapsed=$(( ($(date +%s) - START) / 3600 )); calls=$(st get run.calls)
  if [ "$elapsed" -ge "$MAX_HOURS" ] || [ "${calls:-0}" -ge "$MAX_CALLS" ]; then
    (cd "$WS" && claude -p "/auto-build --budget-stop" >>"$AB/logs/runner.log" 2>&1)
    st set status '"budget"'; "$BIN/notify.sh" "⏳ auto-build hit its budget (${elapsed}h, ${calls} calls). Re-run to continue."; exit 0
  fi
  step=$(st get next.step); module=$(st get next.module)
  n=$(st inc run.calls); log="$AB/logs/$(date +%Y%m%d-%H%M%S)-${n}-${module:-project}-${step}.log"
  echo "[$(date +%H:%M)] step $n: ${module:-project} / $step"
  (cd "$WS" && claude -p "/auto-build --step" --output-format text >"$log" 2>&1); rc=$?
  if [ $rc -ne 0 ]; then
    if grep -qiE "usage limit|rate limit|limit reached|overloaded|429" "$log"; then
      echo "  limit reached — waiting ${LIMIT_WAIT}s"; sleep "$LIMIT_WAIT"; continue
    fi
    FAILS=$((FAILS+1)); echo "  step failed (rc=$rc, attempt $FAILS) — see $log"
    if [ $FAILS -ge 3 ]; then
      node "$BIN/oq.js" add --module "${module:-project}" --type question --by "auto-build runner" --category environment \
        --text "Step '$step' crashed 3 times in a row (see $(basename "$log"))" --assumption "Step skipped" --impact high >/dev/null
      (cd "$WS" && claude -p "/auto-build --skip-step" >>"$AB/logs/runner.log" 2>&1); FAILS=0
    else sleep 30; fi
    continue
  fi
  FAILS=0
done
