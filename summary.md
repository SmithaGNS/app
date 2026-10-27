# Project Summary — drivesafe

Updated: 2026-10-27 13:50

## Run report (2026-10-27)

**Status: done.** All 5 modules x 2 sides merged into the dev-release branch of each repo (backend + frontend). Nothing pushed; main untouched.

| Check | Result |
| --- | --- |
| Backend unit (Vitest) | 91/91 pass |
| Backend e2e vs MySQL test DB | 241/241 pass |
| Frontend unit (Vitest) | 183/183 pass |
| Frontend Playwright (Chromium, incl. real-backend specs) | 319/319 pass in one combined run |
| Typecheck / build | pass (lint: 0 errors, warnings only) |
| Live smoke (login -> OTP -> dashboard -> violations) | pass |

**Not built / out of scope (PROPOSED answers):** CSV/Excel/Print export, reward-point crediting, delivery of contact replies and real OTP e-mail/SMS (mock provider), evidence upload/storage (metadata table only), citizen-app intake beyond documented stubs.
**Not covered by tests:** Edge/Firefox/Safari, pixel comparison with story screenshots, coverage percentage, several UI-only seam TCs (see per-module test reports in testresults/).
**Known deviations from test cases:** TC-SCR-13-WEB-029 and TC-SCR-05-WEB-025 expect the Violation manager to be denied; roles.md (PROPOSED matrix) allows both roles, so those assert the opposite. Reward-points toast text (TC-SCR-07-WEB-001/021/022) omitted.
**Open questions:** 94 rows (88 decisions, 6 open, 0 high impact) in open-questions.csv. 48 requirement questions marked blocking by the BA pack were built with their PROPOSED answers; ratify them, then run /resolve-questions.
**Test logins:** administrator@test.local / violation-manager@test.local, Test@1234 (dev/test only). Dev OTP: 123456 (OTP_DEV_CODE; blocked in production).
**Links page:** output/index.html (apps are stopped; start commands are on the page).

## Progress

2 of 10 module-sides developed (auth backend, auth frontend) · 0 in progress · 0 blocked
Open questions: 0 (0 high impact) · Decisions: 0 → see `open-questions.csv`

| Module | Side | Status | Current role | Round | Notes |
| ------ | ---- | ------ | ------------ | ----- | ----- |
| auth | backend | ✅ Merged | - | 1/3 | 92 tests green (43 unit, 49 e2e); security PASSED; 92 UI-only TCs deferred to frontend |
| auth | frontend | ✅ Merged | - | 1/3 | 49 Vitest + 125 Playwright green (3 flaky-on-retry); all 144 provided TCs mapped; axe clean; security PASSED; Chromium only, no pixel baselines |
| contact | backend | ✅ Merged | - | 1/3 | 120 tests green in repo (51 unit, 69 e2e; 28 contact); security PASSED; UI-only TCs deferred to frontend |
| contact | frontend | ✅ Merged | - | 1/3 | SCR-13 list/search/paging/reply/edit; 37 new tests (13 Vitest + 24 Playwright incl. 1 real-backend) green, full suite 62 Vitest + 149 Playwright; axe clean; security PASSED; TC-WEB-029 expected deviation (roles.md); Chromium only |
| catalogue | backend | ✅ Merged | - | 1/3 | 63 catalogue tests green (14 unit, 49 e2e; repo 65/118); security PASSED; UI-only TCs deferred to frontend |
| catalogue | frontend | ✅ Merged | - | 1/3 | SCR-10/11/12; 24 Vitest + 65 Playwright (10 against real backend) green, full suite 86 Vitest + 236 Playwright; axe clean; security PASSED; CSV/Excel/Print not built, no pixel baselines |
| users | backend | ✅ Merged | - | 1/3 | 99 users tests green (17 unit, 82 e2e; repo 82/200); security PASSED; 59 UI-only TCs deferred to frontend |
| users | frontend | ✅ Merged | - | 1/3 | SCR-20/21/22 + first-login gate; 61 Vitest + 50 Playwright (1 against real backend) green, full suite 147 Vitest + 241 Playwright (real specs partly rate-limited, see report); axe clean; security PASSED; CSV/Excel/Print not built, TC-SCR-22-WEB-024 not covered, Chromium only, no pixel baselines |
| violations | backend | ✅ Merged | - | 1/3 | 49 violations tests green (8 unit, 41 e2e; repo 91 unit + 241 e2e = 332); security PASSED; architecture approved (ADR 0001); list paging unified; UI-only TCs deferred to frontend |
| violations | frontend | ✅ Merged | - | 1/3 | SCR-05/06/07 + sidebar badge; 91 new tests (36 Vitest + 47 stubbed + 8 real-backend Playwright) green, full suite 183 Vitest + 319 Playwright (1 infra flaky); axe clean; security PASSED; architecture approved; deviations logged Q-078..Q-086 (no reward points, manager may open dashboard); Chromium only |

<!-- Status values: ⏳ Not started · 📋 Planning · 🗄️ DB design · ✍️ Stories · 👩‍💻 Developing (round n/3) · ✅ Verified · 🧪 Testing (run n) · 🔗 Integration testing · 🛡️ Security audit · 🏛️ Architecture review · ✅ Merged · 🐞 Bug fixing · 🔒 Blocked (security) · ⚠️ Merged with open issues -->

## Active bugs

## Latest test reports

- auth backend: `testresults/auth/backend-test-report.md` (92/92 pass)
- contact backend: `testresults/contact/backend-test-report.md` (all pass)
- contact frontend: `testresults/contact/frontend-test-report.md` (37 new tests pass; full suite green)
- catalogue backend: `testresults/catalogue/backend-test-report.md` (all pass)
- users backend: `testresults/users/backend-test-report.md` (all pass)
- users frontend: `testresults/users/frontend-test-report.md` (111 new tests pass; full suite green apart from rate-limited real-backend runs)
- violations backend: `testresults/violations/backend-test-report.md` (49/49 pass)
- violations frontend: `testresults/violations/frontend-test-report.md` (91 new tests pass; full suite green)
- auth frontend: `testresults/auth/frontend-test-report.md` (49 Vitest + 125 Playwright pass, 144/144 TCs mapped)

## Links

- App & test logins: `output/index.html`
- Questions & decisions: `open-questions.csv`
- Roadmap: `stories/project/roadmap.md` · Traceability: `stories/project/traceability.md`

## Recent activity

<!-- newest first, keep the latest 20 lines: HH:MM Role — what happened -->
13:50 Frontend team - auth frontend merged to dev-release (login, forgot, OTP, feedback, shell; security PASSED)
