#!/usr/bin/env node
// Renders <ws>/output/index.html from <ws>/output/app-manifest.json, checking every link's health live.
const fs = require('fs'); const path = require('path');
const WS = process.env.WS || path.resolve(__dirname, '..', '..');
const M = JSON.parse(fs.readFileSync(path.join(WS, 'output', 'app-manifest.json'), 'utf8'));
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
async function up(url) { if (!url) return null; try { const r = await fetch(url, { signal: AbortSignal.timeout(4000) }); return r.status < 500; } catch { return false; } }
(async () => {
  let exposed = false; const appRows = [];
  for (const a of M.apps || []) {
    for (const [kind, url] of Object.entries(a.links || {})) {
      if (!url) continue;
      const ok = await up(url.replace(/\/$/, '') + (a.health || '/'));
      if (ok && (kind === 'external' || kind === 'tunnel')) exposed = true;
      appRows.push(`<tr><td>${esc(a.name)}</td><td>${esc(kind)}</td><td><a href="${esc(url)}" target="_blank">${esc(url)}</a></td><td>${ok ? '✅ reachable' : '❌ not reachable'}</td></tr>`);
    }
  }
  const acc = (M.testAccounts || []).map(t => `<tr><td>${esc(t.role)}</td><td><code>${esc(t.username)}</code></td><td><code>${esc(t.password)}</code></td><td>${esc(t.landing || '')}</td><td>${esc((t.access || []).join(', '))}</td></tr>`).join('');
  const mods = (M.modules || []).map(m => `<section><h3>${esc(m.id)} <small>${esc(m.status || '')}</small></h3>
    ${(m.screens || []).length ? `<p><b>Screens</b></p><ul>${m.screens.map(s => `<li><a href="${esc(s.url)}" target="_blank">${esc(s.name)}</a> <small>${esc((s.roles || []).join(', '))}</small></li>`).join('')}</ul>` : ''}
    ${(m.endpoints || []).length ? `<p><b>API</b></p><ul>${m.endpoints.map(e => `<li><code>${esc(e.method)} ${esc(e.url || e.path)}</code> <small>${esc((e.roles || []).join(', '))}</small></li>`).join('')}</ul>` : ''}
    <p>Test cases: <code>${esc(m.testCases || '')}</code> · Results: <code>${esc((M.resultsDir || 'testresults/{module}/').replace('{module}', m.id))}</code>${m.latestReport ? ` · Latest: <code>${esc(m.latestReport)}</code>` : ''}</p>
    ${(m.manualChecklist || []).length ? `<details><summary>Manual checklist (${m.manualChecklist.length})</summary><ol>${m.manualChecklist.map(x => `<li>${esc(x)}</li>`).join('')}</ol></details>` : ''}</section>`).join('');
  const run = (M.apps || []).map(a => `<li><b>${esc(a.name)}</b>: <code>cd ${esc(a.dir || '.')} && ${esc(a.start)}</code>${(a.envVars || []).length ? ` — env: ${a.envVars.map(v => `<code>${esc(v)}</code>`).join(' ')}` : ''}</li>`).join('');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(M.project)} — Test the app</title><style>
:root{--bg:#fff;--fg:#1d1d1f;--mut:#6b7280;--line:#e5e7eb;--warn:#fff4e5;--warnb:#f59e0b}
@media (prefers-color-scheme:dark){:root{--bg:#111827;--fg:#f3f4f6;--mut:#9ca3af;--line:#374151;--warn:#3b2a10}}
body{font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--fg);max-width:1000px;margin:0 auto;padding:24px}
table{border-collapse:collapse;width:100%;margin:8px 0 20px}td,th{border-bottom:1px solid var(--line);padding:6px 8px;text-align:left;vertical-align:top}
.wrap{overflow-x:auto}small{color:var(--mut)}a{color:#2563eb}.warn{background:var(--warn);border-left:4px solid var(--warnb);padding:10px 14px;margin:12px 0}
section{border:1px solid var(--line);border-radius:8px;padding:8px 16px;margin:12px 0}code{font-size:13px}</style></head><body>
<h1>${esc(M.project)}</h1><p><small>Generated ${esc(M.generatedAt)} · status: see summary.md · questions: open-questions.csv</small></p>
${exposed ? '<div class="warn"><b>⚠️ This app is reachable from outside your network.</b> Anyone with the link can log in with the test accounts below.</div>' : ''}
<h2>Open the app</h2><div class="wrap"><table><tr><th>App</th><th>Link type</th><th>URL</th><th>Status</th></tr>${appRows.join('')}</table></div>
${M.apps?.find(a => a.swagger) ? `<p>API docs (Swagger): <a href="${esc(M.apps.find(a => a.swagger).swagger)}" target="_blank">${esc(M.apps.find(a => a.swagger).swagger)}</a></p>` : ''}
<h2>Test logins (one per role)</h2><div class="wrap"><table><tr><th>Role</th><th>Username</th><th>Password</th><th>Landing</th><th>Can access</th></tr>${acc}</table></div>
<h2>How to run</h2><ul>${run}</ul>
<h2>Modules</h2>${mods}
<p><small>Machine-readable version for the testing plugin: <code>output/app-manifest.json</code></small></p></body></html>`;
  fs.writeFileSync(path.join(WS, 'output', 'index.html'), html);
  console.log('output/index.html written' + (exposed ? ' (external exposure warning shown)' : ''));
})();
