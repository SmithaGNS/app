#!/usr/bin/env node
// open-questions.csv helper — add / list / set / stats. No dependencies.
// Usage:
//   oq.js add --module booking --type question|decision --by "Node Architect" --category "conflict"
//             --text "…" --source "FRS §4.2" --assumption "…" --impact low|medium|high
//   oq.js list [--status open|answered|decided|closed] [--module m] [--json]
//   oq.js set --id Q-007 [--status closed] [--action "…"]      (never touches "Your answer")
//   oq.js stats
const fs = require('fs');
const path = require('path');

const WS = process.env.WS || path.resolve(__dirname, '..', '..');
const FILE = path.join(WS, 'open-questions.csv');
const PENDING = path.join(WS, 'open-questions.pending.csv');
const COLS = ['ID', 'Date', 'Module', 'Type', 'Raised by', 'Category', 'Question / Decision', 'Source',
  'Assumption taken', 'Impact', 'Status', 'Your answer', 'Action taken'];
const BOM = '\uFEFF';

function parse(text) {
  text = text.replace(/^\uFEFF/, '');
  const rows = []; let row = []; let f = ''; let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; }
      else f += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(f); f = ''; if (row.some(x => x !== '')) rows.push(row); row = [];
    } else f += c;
  }
  if (f !== '' || row.length) { row.push(f); if (row.some(x => x !== '')) rows.push(row); }
  return rows;
}
const esc = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
const line = r => r.map(esc).join(',') + '\r\n';

function load() {
  if (!fs.existsSync(FILE)) return [];
  const rows = parse(fs.readFileSync(FILE, 'utf8'));
  return rows.slice(1).map(r => Object.fromEntries(COLS.map((c, i) => [c, r[i] ?? ''])));
}
function save(records) {
  const out = BOM + line(COLS) + records.map(r => line(COLS.map(c => r[c]))).join('');
  try { fs.writeFileSync(FILE, out); return true; }
  catch (e) { return false; }
}
function mergePending(records) {
  if (!fs.existsSync(PENDING)) return records;
  const extra = parse(fs.readFileSync(PENDING, 'utf8')).slice(1)
    .map(r => Object.fromEntries(COLS.map((c, i) => [c, r[i] ?? ''])));
  return records.concat(extra);
}
function args() {
  const a = {}; const v = process.argv.slice(3);
  for (let i = 0; i < v.length; i++) {
    if (v[i].startsWith('--')) { const k = v[i].slice(2); const n = v[i + 1];
      if (n === undefined || n.startsWith('--')) a[k] = true; else { a[k] = n; i++; } }
  }
  return a;
}
function nextId(records) {
  const n = records.map(r => parseInt(String(r.ID).replace(/\D/g, ''), 10)).filter(Number.isFinite);
  return 'Q-' + String((n.length ? Math.max(...n) : 0) + 1).padStart(3, '0');
}

const cmd = process.argv[2]; const a = args();
let records = mergePending(load());

if (cmd === 'add') {
  const type = a.type === 'decision' ? 'decision' : 'question';
  const rec = {
    'ID': nextId(records), 'Date': new Date().toISOString().slice(0, 10), 'Module': a.module || 'project',
    'Type': type, 'Raised by': a.by || '', 'Category': a.category || '', 'Question / Decision': a.text || '',
    'Source': a.source || '', 'Assumption taken': a.assumption || '', 'Impact': a.impact || 'medium',
    'Status': type === 'decision' ? 'decided' : 'open', 'Your answer': '', 'Action taken': ''
  };
  // de-duplicate: same module + text still open/decided → do not add again
  const dup = records.find(r => r.Module === rec.Module && r['Question / Decision'] === rec['Question / Decision'] && r.Status !== 'closed');
  if (dup) { console.log(dup.ID + ' (existing)'); process.exit(0); }
  records.push(rec);
  if (save(records)) { if (fs.existsSync(PENDING)) fs.unlinkSync(PENDING); console.log(rec.ID); }
  else {
    const exists = fs.existsSync(PENDING);
    fs.appendFileSync(PENDING, (exists ? '' : BOM + line(COLS)) + line(COLS.map(c => rec[c])));
    console.log(rec.ID + ' (written to open-questions.pending.csv — main file locked)');
  }
} else if (cmd === 'list') {
  let r = records;
  if (a.status) r = r.filter(x => x.Status === a.status);
  if (a.module) r = r.filter(x => x.Module === a.module);
  if (a.json) console.log(JSON.stringify(r, null, 2));
  else r.forEach(x => console.log(`${x.ID}\t${x.Status}\t${x.Impact}\t${x.Module}\t${x['Question / Decision']}${x['Your answer'] ? '\n\tANSWER: ' + x['Your answer'] : ''}`));
} else if (cmd === 'set') {
  const r = records.find(x => x.ID === a.id);
  if (!r) { console.error('No row ' + a.id); process.exit(1); }
  if (a.status) r.Status = a.status;
  if (a.action) r['Action taken'] = a.action;
  if (!save(records)) { console.error('open-questions.csv is locked — retry later'); process.exit(2); }
  if (fs.existsSync(PENDING)) fs.unlinkSync(PENDING);
  console.log('updated ' + a.id);
} else if (cmd === 'stats') {
  const c = s => records.filter(x => x.Status === s).length;
  const hi = records.filter(x => x.Status === 'open' && x.Impact === 'high').length;
  console.log(JSON.stringify({ open: c('open'), highImpactOpen: hi, answered: c('answered'),
    decided: c('decided'), closed: c('closed'), total: records.length }));
} else if (cmd === 'init') {
  if (!fs.existsSync(FILE)) save([]); console.log(FILE);
} else {
  console.log('usage: oq.js add|list|set|stats|init …'); process.exit(1);
}
