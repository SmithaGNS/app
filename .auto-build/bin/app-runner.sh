#!/usr/bin/env bash
# app-runner.sh start|stop|status|links
# Starts every app in .auto-build/apps.json in the background on a free port, waits for its health URL,
# and writes .auto-build/runtime.json (ports, pids, links: localhost / lan / external / tunnel).
set -u
WS="$(cd "$(dirname "$0")/../.." && { pwd -W 2>/dev/null || pwd; })"
AB="$WS/.auto-build"; APPS="$AB/apps.json"; RT="$AB/runtime.json"
mkdir -p "$AB/pids" "$AB/logs"
cfg() { node -e "try{const c=require('$AB/config.json');const v=c['$1'];console.log(v===undefined?'':v)}catch{console.log('')}"; }

port_busy() { (exec 3<>/dev/tcp/127.0.0.1/"$1") 2>/dev/null && { exec 3>&- 3<&-; return 0; }; return 1; }
free_port() { local p=$1; while port_busy "$p"; do p=$((p+1)); done; echo "$p"; }
lan_ip() {
  local ip=""
  ip=$(hostname -I 2>/dev/null | awk '{print $1}')
  [ -z "$ip" ] && ip=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)
  [ -z "$ip" ] && ip=$(ip route get 1.1.1.1 2>/dev/null | awk '{for(i=1;i<=NF;i++) if($i=="src") print $(i+1)}')
  [ -z "$ip" ] && ip=$(ipconfig 2>/dev/null | grep -m1 "IPv4" | sed 's/.*: *//' | tr -d '[:space:]')
  echo "$ip"
}
ext_ip() { local ip; ip=$(curl -s -m 4 https://api.ipify.org 2>/dev/null); [[ "$ip" =~ ^[0-9]{1,3}(\.[0-9]{1,3}){3}$ ]] && echo "$ip" || echo ""; }
wait_health() { local url=$1 t=0; while [ $t -lt "${2:-120}" ]; do curl -s -o /dev/null -m 3 "$url" && return 0; sleep 2; t=$((t+2)); done; return 1; }

start() {
  [ -f "$APPS" ] || { echo "no $APPS"; exit 1; }
  stop >/dev/null 2>&1
  local LAN EXT TUNNEL_ON; LAN=$(lan_ip); EXT=$(ext_ip); TUNNEL_ON=$(cfg tunnel)
  local n; n=$(node -e "console.log(require('$APPS').length)")
  local out="{\"startedAt\":\"$(date -u +%FT%TZ)\",\"lanIp\":\"$LAN\",\"externalIp\":\"$EXT\",\"apps\":{"
  local first=1 backend_url=""
  for i in $(seq 0 $((n-1))); do
    local name dir startcmd defport health portenv hostenv envjson port url
    name=$(node -e "console.log(require('$APPS')[$i].name)")
    dir=$(node -e "console.log(require('$APPS')[$i].dir||'.')")
    startcmd=$(node -e "console.log(require('$APPS')[$i].start)")
    defport=$(node -e "console.log(require('$APPS')[$i].defaultPort)")
    health=$(node -e "console.log(require('$APPS')[$i].health||'/')")
    portenv=$(node -e "console.log(require('$APPS')[$i].portEnv||'PORT')")
    hostenv=$(node -e "console.log(require('$APPS')[$i].hostEnv||'HOST')")
    port=$(free_port "$defport")
    startcmd=${startcmd//\{PORT\}/$port}
    envjson=$(node -e "const e=require('$APPS')[$i].env||{};for(const[k,v] of Object.entries(e))console.log(k+'='+String(v).replace('{backend.url}','$backend_url'))")
    ( cd "$WS/$dir" && exec env $envjson "$portenv=$port" "$hostenv=0.0.0.0" bash -c "$startcmd" ) >"$AB/logs/$name.log" 2>&1 </dev/null &
    echo $! >"$AB/pids/$name.pid"
    url="http://localhost:$port"
    [ "$name" = "backend" ] && backend_url="http://127.0.0.1:$port"
    local healthy=false
    if wait_health "$url$health" 150; then healthy=true; echo "✓ $name healthy on $url"; else echo "✗ $name not healthy — see .auto-build/logs/$name.log"; fi
    local tunnel=""
    if [ "$TUNNEL_ON" = "true" ] && command -v cloudflared >/dev/null; then
      cloudflared tunnel --url "$url" >"$AB/logs/$name-tunnel.log" 2>&1 </dev/null & echo $! >"$AB/pids/$name-tunnel.pid"
      for _ in $(seq 1 15); do tunnel=$(grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' "$AB/logs/$name-tunnel.log" | head -1); [ -n "$tunnel" ] && break; sleep 2; done
    fi
    [ $first -eq 0 ] && out="$out,"; first=0
    out="$out\"$name\":{\"port\":$port,\"pid\":$(cat "$AB/pids/$name.pid"),\"healthy\":$healthy,\"health\":\"$health\",\"links\":{\"localhost\":\"$url\",\"lan\":\"${LAN:+http://$LAN:$port}\",\"external\":\"${EXT:+http://$EXT:$port}\",\"tunnel\":\"$tunnel\"}}"
  done
  echo "$out}}" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>require('fs').writeFileSync('$RT',JSON.stringify(JSON.parse(d),null,2)))"
  echo "runtime → $RT"
}
stop() {
  for f in "$AB"/pids/*.pid; do [ -f "$f" ] || continue; pid=$(cat "$f"); pkill -P "$pid" 2>/dev/null; kill "$pid" 2>/dev/null; taskkill //PID "$pid" //T //F >/dev/null 2>&1; rm -f "$f"; done
  echo "stopped"
}
status() { [ -f "$RT" ] && cat "$RT" || echo "not running"; }
case "${1:-status}" in start) start ;; stop) stop ;; status|links) status ;; *) echo "usage: app-runner.sh start|stop|status"; exit 1 ;; esac
