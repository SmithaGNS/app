#!/usr/bin/env node
// .auto-build/state.json helper.  state.js get <key> | set <key> <json-or-string> | inc <key> | show
const fs = require('fs'); const path = require('path');
const WS = process.env.WS || path.resolve(__dirname, '..', '..');
const F = path.join(WS, '.auto-build', 'state.json');
const s = fs.existsSync(F) ? JSON.parse(fs.readFileSync(F, 'utf8')) : {};
const [cmd, key, val] = process.argv.slice(2);
const getp = (o, k) => k.split('.').reduce((x, p) => (x == null ? undefined : x[p]), o);
const setp = (o, k, v) => { const ps = k.split('.'); let x = o; ps.slice(0, -1).forEach(p => { x[p] = x[p] ?? {}; x = x[p]; }); x[ps.at(-1)] = v; };
const write = () => { s.updatedAt = new Date().toISOString(); fs.writeFileSync(F, JSON.stringify(s, null, 2)); };
if (cmd === 'get') { const v = getp(s, key); console.log(v === undefined ? '' : (typeof v === 'object' ? JSON.stringify(v) : v)); }
else if (cmd === 'set') { let v = val; try { v = JSON.parse(val); } catch {} setp(s, key, v); write(); }
else if (cmd === 'inc') { setp(s, key, (Number(getp(s, key)) || 0) + 1); write(); console.log(getp(s, key)); }
else console.log(JSON.stringify(s, null, 2));
