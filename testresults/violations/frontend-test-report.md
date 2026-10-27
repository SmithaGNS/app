# Test Report - violations (frontend) - Run 1

Date: 2026-10-27 · Runner: Tester (frontend) · Branch: feature/violations (from dev-release 16a08c0, includes contact) · Commit: see merge commit on dev-release
App: backend http://127.0.0.1:3100 (stable dev-release build, 23 seeded violations, OTP_DEV_CODE=123456) · frontend http://127.0.0.1:5177 (Vite)

## Summary

| Total | Passed | Failed | Flaky | Manual | Skipped |
| ----- | ------ | ------ | ----- | ------ | ------- |
| 36 unit + 55 new e2e = 91 new | 91 | 0 | 0 | 0 | 0 |

New: 36 Vitest (ViolationsPage 13, ReviewModal 11, DashboardPage 8, schemas 4) + 47 stubbed Playwright (`e2e/violations.spec.ts`) + 8 real-backend Playwright (`e2e/violations-real.spec.ts`, serial, 2 sign-ins).
Full regression of the frontend after rebasing onto dev-release (contact, catalogue and users merged): Vitest 183/183 passed (18 files); Playwright 319 tests: 318 passed first time + 1 flaky that passed on retry (catalogue axe test, `net::ERR_NO_BUFFER_SPACE` from the host under parallel load, not violations code), 0 failed. Before the rebase two other pre-existing tests were flaky under CPU load (`a11y-responsive` iPhone 14, `forgot-otp` WEB-004). Typecheck, lint (0 errors) and build: green.

Existing specs adjusted (the Dashboard is no longer a placeholder): `mockAuthApi` now also stubs the violations API (the landing screen and sidebar badge call it), shell/a11y specs expect `dashboard-page` / `violations-page` instead of `coming-soon`, `shell.spec.ts` stubs the Contact list it navigates to.

## Results by test case

| TC ID | Title | Role | Type | Origin | Result | Notes |
| ----- | ----- | ---- | ---- | ------ | ------ | ----- |
| TC-SCR-05-WEB-001 / 002 | Tiles and funnel from server figures | Administrator | Functional | Vitest + PW stub + PW real | Pass | Real: compared with GET /v1/dashboard, no hard-coded numbers |
| TC-SCR-05-RSP-001 / WEB-020 | Latest five, newest first, 7 columns, caption | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-05-WEB-003 / 016 | Phone toggle, label and icon flip, press again masks | Administrator | Functional | Vitest + PW | Pass | Reveal is an audited POST (differs from prototype) |
| TC-SCR-05-WEB-004 / 017 | Option opens the modal; focus returns | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-05-WEB-005 | Counts follow a review | Administrator | Functional | PW stub | Pass | see TC-JRN-WEB-007 |
| TC-SCR-05-WEB-006..015 | Tiles / View all navigate; sidebar item highlighted | Administrator | Functional | Vitest + PW | Pass | Status tiles carry ?status= (Q-079); Categories/App users/Portal users/Messages link to their routes |
| TC-SCR-05-WEB-018 | Sidebar Pending badge = Pending tile, hidden at 0 | Administrator | Functional | PW stub + PW real | Pass | |
| TC-SCR-05-WEB-019 | No input fields | Administrator | Functional | n/a | Pass | Nothing to enter |
| TC-SCR-05-WEB-021 | Populated state | Administrator | State | PW | Pass | Toast "Signed in successfully." comes from the shell/login |
| TC-SCR-05-WEB-022 / 023 / 024 | Empty, loading, error + retry, 403 forbidden | Administrator | State | Vitest + PW | Pass | Decided behaviours (story left undefined) |
| TC-SCR-05-WEB-025 | Violation manager on the dashboard | Violation manager | Permission | Vitest + PW stub + PW real | Pass (deviation) | Case text expects denial; roles.md and VIO requirements allow both roles (Q-081) |
| TC-SCR-05-WEB-026 | Layout regions | Administrator | UI | PW | Pass (Chromium only) | Firefox/Edge/Safari and pixel comparison with the screenshot not run |
| TC-SCR-05-WEB-027 | axe, keyboard, caption | Administrator | A11y | PW | Pass | Tiles are real links, reachable by Tab |
| TC-SCR-05-WEB-028 / TC-SCR-06-WEB-041 / TC-SCR-07-WEB-028 | Anonymous goes to sign-in, no data requested | Anonymous | Security | PW stub + PW real (API 401) | Pass | |
| TC-SCR-05-RSP-002..004 (+2560) | 390 / 810 / 1440 / 2560 no page scroll, tile columns 2/4/4/8 | Administrator | Responsive | PW | Pass | |
| TC-SCR-06-WEB-001 / 030 | Page load: 10 rows, S No 1-10, Pending, "Showing 1 to 10 of 23 entries", 14 columns | Administrator | Functional | Vitest + PW + PW real | Pass | Real: meta from the server |
| TC-SCR-06-RSP-001 / WEB-036 / 037 | Masked phone, per-row reveal, page change re-masks | Administrator | Functional | Vitest + PW + PW real | Pass | Mask text is the server's ("+1 •••••••290"), not the prototype's |
| TC-SCR-06-WEB-017 | Manager: no reveal control; API 403 | Violation manager | Permission | Vitest + PW + PW real | Pass | Real: POST reveal-phone with manager token = 403 |
| TC-SCR-06-WEB-002 / 009 / 010 / 011 | Date filter inclusive, applied only on Filter | Administrator | Functional | Vitest + PW | Pass | "Showing 1 to 2 of 2 entries" (server count, Q-080) |
| TC-SCR-06-WEB-003 / 008 / 025 / 032 | Owner filter, no match shows explicit empty message | Administrator | Functional | PW | Pass | Owner list from /v1/lookups/owners |
| TC-SCR-06-WEB-004 / 012 / 034 | Reset clears filters, keeps search text | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-06-WEB-005 / 013 / 035 | Search "parking" = rows 3,6,7,8,9; server side; AND with filters | Administrator | Functional | Vitest + PW + PW real | Pass | |
| TC-SCR-06-WEB-006 / 018 | Review button opens "Violation #3 — Wrong parking" | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-06-WEB-007 / 014 / 015 / 016 | CSV / Excel / Print | Administrator | Functional | PW | Pass (deviation) | Not built, VIO-R18; absence asserted |
| TC-SCR-06-WEB-019..024 / 029 | Page size 10/25/50/100, Previous disabled on page 1, pages, Next | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-06-WEB-026 / 027 | Date bounds (2019, 2020, future, reversed): message, no request | Administrator | Boundary | Vitest + PW + schemas | Pass | Non-numeric input cannot be typed in a date control; covered by the schema test |
| TC-SCR-06-WEB-028 | Search 0 / 100 / 101 chars, < > stripped | Administrator | Boundary | Vitest + PW + schemas | Pass | |
| TC-SCR-06-WEB-031 / 033 | Filtered state; no stale count after a review | Administrator | State | PW (TC-JRN-WEB-012) | Pass | Count text always from the server |
| TC-SCR-06-WEB-038 | Loading, error + retry | Administrator | State | Vitest + PW | Pass | |
| TC-SCR-06-RSP-002 | 72rem table scrolls inside its wrapper at 390 px | Administrator | Responsive | PW | Pass | Wrapper scrolls, page does not |
| TC-SCR-06-RSP-003..005 (+2560) | iPhone / iPad / 1440 / 2560 | Administrator | Responsive | PW | Pass | |
| TC-SCR-06-WEB-039 | Layout regions vs screenshot | Administrator | UI | PW (partial) | Not fully run | Filter bar / table / pager asserted; no pixel diff, one browser |
| TC-SCR-06-WEB-040 | axe, caption, scope=col, labelled search/pager, icon buttons | Administrator | A11y | PW | Pass | |
| TC-SCR-07-RSP-001 / WEB-020 / 025 | Modal content, presets, evidence placeholder, reviewer footnote | Administrator | Functional | Vitest + PW | Pass | Mobile is masked in the modal (VIO-R03); id shown as serial No |
| TC-SCR-07-WEB-001 / 012 / 021 / 022 | Verify with level: toast, close, row chip + reviewer; refetch persists | Administrator | Functional | Vitest + PW stub + PW real | Pass (deviation) | Toast is the server message; no reward-points sentence (Q-078). Real run edits level only and restores it (no status change on seed data) |
| TC-SCR-07-WEB-002 / TC-JRN-WEB-007 | Counts follow: Pending 22, Verified 1, funnel, badge 22 | Administrator | Journey | PW stub | Pass | Not run against the real backend to keep seed Pending at 23 |
| TC-SCR-07-WEB-003 | Level 2 saved, cell reads 2, reopen fresh | Administrator | Functional | PW stub + PW real | Pass | |
| TC-SCR-07-WEB-004 / 005 / 007 / 011 / 013 / 014 / 023 | Close, x, Escape, backdrop discard; focus returns to opener | Administrator | Functional | Vitest + PW | Pass | Focus also returns after Save (OQ-A-21) |
| TC-SCR-07-WEB-006 / TC-JRN-WEB-010 | Reopen is fresh; history lists actor, transition, note | Administrator | Functional | Vitest + PW stub + PW real | Pass | Deviation: the note is now stored and shown in the history, the field itself is empty on reopen |
| TC-SCR-07-WEB-008 / 015 / 017 | Status and level option sets and presets | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-07-WEB-016 | Backwards move: server 409 "That status change is not allowed." inline | Administrator | Negative | Vitest + PW stub | Pass | Real backend not driven: needs a Verified/Rejected seed report (none) |
| TC-SCR-07-WEB-018 | Verified needs level >= 1 | Administrator | Boundary | Vitest + PW + PW real + schemas | Pass | |
| TC-SCR-07-WEB-019 | Note 0 / 500 / 501, Rejected needs reason | Administrator | Boundary | Vitest + PW + schemas | Pass | |
| TC-SCR-07-WEB-021 | Concurrent edit 409 "This report was updated by someone else." | Administrator | Negative | Vitest + PW stub | Pass | Real race not driven |
| TC-SCR-07-WEB-024 | Loading / error / 404 in the modal | Administrator | State | Vitest + PW | Pass | |
| TC-SCR-07-WEB-026 | Layout regions vs screenshot | Administrator | UI | PW (partial) | Not fully run | See WEB-039 |
| TC-SCR-07-WEB-027 | axe on the modal, aria-modal/labelled, Tab trapped | Administrator | A11y | PW | Pass | Initial focus goes to the first control (Close dialog) |
| TC-SCR-07-RSP-002..004 | Modal at 390 px stays inside the viewport, Save reachable | Administrator | Responsive | PW (390 only) | Pass | 810 and 1440 covered by the list/modal tests, not separately |
| TC-JRN-WEB-007 | Dashboard -> View all -> review report 1 -> counts follow | Administrator | Journey | PW stub | Pass | |
| TC-JRN-WEB-008 | Counts across all reports, not the loaded page | Administrator | Journey | PW stub | Pass | Report 15 Verified is counted |
| TC-JRN-WEB-009 | Reward points credited | Administrator | Journey | n/a | Not applicable | Deferred by VIO-R11 / Q-078; no points UI |
| TC-JRN-WEB-011 | Status tiles open the narrowed list | Administrator | Journey | Vitest + PW | Pass | |
| TC-JRN-WEB-012 | Saved review keeps filter, rows and count text consistent | Administrator | Journey | PW stub | Pass | |
| TC-SEAM-WEB-017 / 019 / 020 / 021 / 026 / 029 | Review updates rows, tiles, funnel, badge; ids pass to the modal | Administrator | Seam | PW stub | Pass | |
| TC-SEAM-WEB-023 / 031 | List row updated with reviewer name from the session | Administrator | Seam | PW stub + PW real | Pass | Real history shows "Test Administrator" |
| TC-SEAM-WEB-024 / 025 / 036 / 037 | Owner list / category owner column from other modules | Administrator | Seam | Not run | Not run | Needs catalogue changes against the real backend plus the catalogue UI; backend e2e covers derivation |
| TC-SEAM-WEB-027 / 030 / 055 | Reward points / app user link | Administrator | Seam | n/a | Not applicable | VIO-R11 |

## Permission tests

| Role | Target | Expected | Result |
| ---- | ------ | -------- | ------ |
| Administrator | Dashboard, list, review, reveal | allowed | Pass |
| Violation manager | Dashboard, list, review | allowed | Pass (real backend) |
| Violation manager | Reveal phone (UI) | control absent | Pass |
| Violation manager | POST reveal-phone (API) | 403 | Pass (real backend) |
| Violation manager | Tiles to Categories / App users / Portal users | figure, no link | Pass |
| Anonymous | /dashboard, /violations, API | sign-in page; 401 | Pass |

## Failures

None in the new tests. Initial issues found and fixed during the run: (1) existing shell/a11y specs broke because the landing Dashboard now calls the API with a mock token (401 -> session ended): fixed by stubbing in `mockAuthApi`; (2) strict-mode locator clashes ("report 1" vs "report 10") in my specs.

## Open issues carried from the development loop

- Q-084 (contract): counts / lookups 200 bodies have no schema.
- Occasional flaky pre-existing tests under CPU load (other agents run Playwright concurrently): see Summary.
- Vite dev warning "outside of Vite serving allow list" for fonts (node_modules junction), environment only.
- Real-backend e2e leaves two extra append-only history rows on one Pending report per run; Pending count and levels are restored.

## Coverage

| Metric | Required | Actual | Status |
| ------ | -------- | ------ | ------ |
| Screens with loading / error / empty / forbidden | 3 of 3 | 3 of 3 | Met |
| axe serious/critical | 0 | 0 on dashboard, list, modal, list at 390 | Met |
| Viewports | 390 - 2560 | 390, 810, 1440, 2560 (Chromium) | Met (one browser) |
| Line coverage tool | not configured | not measured | n/a |

## Requirements coverage

Tested: VIO-R01, R02, R03, R04, R05, R06, R07, R08, R10, R12, R13, R14 (UI side) · Untested in UI: R09 (history shown, audit log is backend), R11 (nothing to show), R15-R17, R19 (backend only), R18 (absence asserted).

## Manual checklist (run these by hand)

1. **TC-SCR-05-WEB-026 / TC-SCR-06-WEB-039 / TC-SCR-07-WEB-026** as `administrator@test.local`: compare each screen with the story screenshot in Firefox, Edge and Safari.
2. **TC-SEAM-WEB-024/025** as `administrator@test.local`: rename a category / change its owner in the catalogue UI, then check the Category Owner column and the owner filter on the list.
3. **TC-SCR-07-WEB-016/021 on the real backend** as two browsers: review the same Pending report in both; the second save should show "This report was updated by someone else." (changes seed data, do it on a copy).

## Drift (integration runs only)

None observed: every UI figure equalled the corresponding API response in the real-backend run. Contract gaps: see Q-084.
