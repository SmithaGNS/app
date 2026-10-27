# Test Report - catalogue (frontend) - Run 1

Date: 2026-10-27 · Runner: Tester (frontend) · Branch: feature/catalogue (rebased on dev-release 16a08c0) · Commit: see merge commit on dev-release
App: http://127.0.0.1:3100 (stable backend, dev-release build) · http://127.0.0.1:5174 (Vite)

## Summary

| Total | Passed | Failed | Flaky | Manual | Skipped |
| ----- | ------ | ------ | ----- | ------ | ------- |
| 89 catalogue tests (24 Vitest + 55 Playwright stubbed + 10 Playwright real backend) | 89 | 0 | 0 on final run (a few first-attempt sign-in timeouts under 2-3 workers, passed on retry/serial; see notes) | 0 | 0 |

Whole frontend suite on the final tree: Vitest 86/86, Playwright 211 + 25 shell re-run passed, typecheck / oxlint (0 errors) / build green.

## Results by test case (covered TC ids)

| TC ID | Title | Role | Type | Origin | Result | Notes |
| ----- | ----- | ---- | ---- | ------ | ------ | ----- |
| TC-SCR-10-WEB-001..008, 012..014, 017..020, 023..029, 031..035, 037, 038 | Categories: list, add, empty submit, edit (+focus return), delete confirm, "Other" protected, in_use 409, search, caps, duplicate, paging, empty/loading/error/forbidden, axe, unauth redirect | Administrator / Violation manager | Functional, a11y | provided | Pass | stubbed API; add/edit/delete/duplicate/"Other" also against the real backend |
| TC-SCR-10-RSP-001..005 | Responsive 390 / 810 / 1440 / 2560 (RSP-005 added) | Administrator | Responsive | provided | Pass | no page-level horizontal scroll, table scrolls in .table-wrap at 390, modal fits |
| TC-SCR-11-WEB-001..007, 009..011, 014..016, 019..023, 025..028, 030, 031 | Owners equivalents; owner_in_use / owner_name_taken | Administrator / Violation manager | Functional, a11y | provided | Pass | owner_in_use verified against the real backend |
| TC-SCR-11-RSP-001..004 | Responsive | Administrator | Responsive | provided | Pass | |
| TC-SCR-12-WEB-001..012, 014, 015 | Config: seed, update + toast, persistence (real PUT/GET and public config), blank / spaces / 100 / 101 / < >, states, axe | Administrator / Violation manager | Functional | provided | Pass | Badge Name restored after the real run |
| TC-SCR-12-RSP-001..003 | Responsive | Administrator | Responsive | provided | Pass | |

## Permission tests

| Role | Target | Expected | Result |
| ---- | ------ | -------- | ------ |
| Administrator | /categories /owners /config | page renders | Pass (real backend) |
| Violation manager | nav entries Category Management / Settings | not shown | Pass (real backend) |
| Violation manager | /categories /owners /config | forbidden page, no catalogue request | Pass (real backend + stub asserting zero calls) |
| Anonymous | /categories /owners /config | redirect to /login | Pass |

## Failures

None on the final run.

## Not covered / deviations (honest list)

- TC-SCR-10-WEB-009..011, TC-SCR-11-WEB-008 (CSV / Excel / Print "wired to nothing"): controls intentionally not rendered (decision, OQ-10-04). Reported as not applicable, not as pass.
- TC-SCR-10-WEB-036 / TC-SCR-11-WEB-029 / TC-SCR-12-WEB-013 (pixel layout vs. story screenshots): not automated; layout follows the prototype markup, checked only by responsive assertions.
- Story expectations that contradict the real API: info line is recomputed by search (server-side search; prototype did not), dangling owner (ST-SCR-11-06) cannot happen, delete of an owner in use is refused (409) instead.
- Real-backend runs consume only 2 sign-ins; rate limit untouched. Violation manager is covered with real login once.
- Console warning seen once in a stub run: "Received NaN for children" from the unmocked fallback route (not reproduced with the real backend).
- Early runs had sign-in timeouts when 3 workers started the Vite dev server cold; no product defect; tests that opened extra pages were split.
- Existing shell spec adjusted: stubs catalogue/contact APIs (screens are real now) and scopes aria-current checks to the sidebar (PagerBar legitimately uses aria-current).

## Coverage

| Metric | Required | Actual | Status |
| ------ | -------- | ------ | ------ |
| Every screen: loading / error / empty / forbidden | yes | yes (all 3 screens) | OK |
| axe serious/critical | 0 | 0 (lists, modals, confirm dialog, config incl. invalid state) | OK |
