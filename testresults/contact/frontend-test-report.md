# Test Report - contact (frontend) - Run 1

Date: 2026-10-27 · Runner: Tester (frontend) · Branch: feature/contact (from dev-release f971a72)
App: backend http://127.0.0.1:3100 (stable dev-release build, 24 seeded messages) · frontend http://127.0.0.1:5175 (Vite)

## Summary

| Total | Passed | Failed | Flaky | Manual | Skipped |
| ----- | ------ | ------ | ----- | ------ | ------- |
| 37 | 37 | 0 | 0 | 0 | 0 |

New contact tests: 13 Vitest (`ContactPage.test.tsx`) + 23 stubbed Playwright (`e2e/contact.spec.ts`) + 1 real-backend Playwright (`e2e/contact-real.spec.ts`) = 37, all passing. Full-suite regression: Vitest 62/62, Playwright 149/149. An earlier full run showed 2 failing and 6 flaky pre-existing shell specs: the 2 failures asserted /contact was still a "coming soon" placeholder (updated, since this module replaces it); the flaky ones passed on retry and everything passed in the final run.

Typecheck, lint (0 errors; 1 new warning `set-state-in-effect` for the clamp-to-last-page effect), build: green.

## Results by test case

| TC ID | Title | Role | Type | Origin | Result | Notes |
| ----- | ----- | ---- | ---- | ------ | ------ | ----- |
| TC-SCR-13-WEB-001 / 025 / 030 | List loads, 10 rows newest first, layout regions | Administrator | Functional | Vitest + PW stub + PW real | Pass | Real backend: 24 in total |
| TC-SCR-13-WEB-002 / 010 | Open reply shows From / Message / Received | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-13-WEB-003 | Empty/blank reply blocked, no request | Administrator | Negative | Vitest + PW | Pass | |
| TC-SCR-13-WEB-004 / 012 / 019 / 026 | Send: trimmed, toast, row updated in place, focus returns | Administrator | Functional | Vitest + PW stub + PW real | Pass | Real run persists the reply (visible after navigating away and back) |
| TC-SCR-13-WEB-005 | Revise answered row | Administrator | Functional | Vitest + PW stub + PW real | Pass | |
| TC-SCR-13-WEB-006 / 008 | Search over all pages | Administrator | Functional | Vitest + PW stub + PW real | Pass | `yicitc` found server side |
| TC-SCR-13-WEB-007 / 011 / 017 | Cancel, x, Esc, backdrop discard; focus returns | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-13-WEB-009 | No CSV/Excel/Print | Administrator | Functional | PW | Pass | Expected deviation: controls intentionally omitted |
| TC-SCR-13-WEB-013 / 016 / 024 | Page size 10/25/50; all 24 reachable | Administrator | Functional | Vitest + PW stub + PW real | Pass | |
| TC-SCR-13-WEB-014 / 015 / 020 | Previous disabled, current page marker | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-13-WEB-021 / 022 | Response boundaries 0/1000/1001, angle brackets stripped | Administrator | Boundary | Vitest + PW | Pass | |
| TC-SCR-13-WEB-023 | Search max 100 | Administrator | Boundary | Vitest + PW | Pass | |
| TC-SCR-13-WEB-027 | Empty state | Administrator | State | Vitest + PW | Pass | |
| TC-SCR-13-WEB-028 | Loading, error with retry | Administrator | State | Vitest + PW | Pass | |
| TC-SCR-13-WEB-029 | Violation manager | Violation manager | Permission | Vitest + PW | Pass (deviation) | TC expects denied; roles.md and backend allow read+reply. Built per roles.md |
| TC-SCR-13-WEB-031 | axe (list, empty, error, modal, modal error) + keyboard | Administrator | A11y | PW | Pass | 0 serious/critical |
| TC-SCR-13-WEB-032 | No session: sign-in, no data, no API call | none | Security | PW | Pass | |
| TC-SCR-13-RSP-001..004 | 390 / 810 / 1440 / 2560 | Administrator | Responsive | PW | Pass | No page-level sideways scroll; table scrolls in `.table-wrap` at 390 and 810 |

## Permission tests

| Role | Target | Expected | Result |
| ---- | ------ | -------- | ------ |
| Administrator | /contact list + reply | allowed | Pass |
| Violation manager | /contact list + reply | allowed (roles.md) | Pass |
| anonymous | /contact | sign-in | Pass |

## Failures
None in the final run.

## Open issues carried from the development loop
- Reply 200 body is untyped in the contract (prose only).
- TC-SCR-13-WEB-030 cross-browser (Edge/Firefox/Safari) not run: Chromium only.
- Real-backend spec writes a reply to message 1 on the seeded DB (leaves it answered).

## Coverage

| Metric | Required | Actual | Status |
| ------ | -------- | ------ | ------ |
| Every SCR-13 TC id with a frontend layer has a named test | all | all (WEB-001..032, RSP-001..004) | Met |
| Line coverage | not measured | n/a | Not measured |

## Requirements coverage
Tested: SCR-13 stories ST-01..07 and all frontend-layer TCs. Not covered: cross-browser, WEB-030 pixel comparison with the screenshot (structure checked, not pixels), slow-3G throttling (stubbed delay used), RSP at 985-1024/1292 px boundaries.

## Manual checklist
1. **TC-SCR-13-WEB-030** as `administrator@test.local` - open /contact in Edge, Firefox, Safari at 1440x900 - expected no console errors and same regions.
