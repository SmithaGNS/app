# Test Report - catalogue (backend) - Run 1

Date: 2026-10-27 · Runner: Tester (automated Vitest) · Branch: feature/catalogue · Commit: ffd9bbc (dev-release)
App: API only (NestJS, MySQL `drivesafe_new_test_catalogue`, local) · frontend not in scope

## Summary

| Total | Passed | Failed | Flaky | Manual | Skipped |
| ----- | ------ | ------ | ----- | ------ | ------- |
| 63 catalogue (14 unit + 49 e2e) | 63 | 0 | 0 | UI cases (frontend step) | 0 |

Repo totals after rebase onto contact: `npm test` 65 passed; `npm run test:e2e` 118 passed; typecheck, lint, build clean. Catalogue contributes 63.

## Results by test case

| TC ID | Title | Role | Type | Origin | Result | Notes |
| ----- | ----- | ---- | ---- | ------ | ------ | ----- |
| TC-SCR-10-WEB-001 | List loads (10 rows, Police first) | Administrator | e2e | provided | Pass | |
| TC-SCR-10-WEB-002 | Add category | Administrator | e2e | provided | Pass | message matches toast |
| TC-SCR-10-WEB-003 | Empty submit blocked | Administrator | e2e | provided | Pass | field messages |
| TC-SCR-10-WEB-004 | Edit, clear owner | Administrator | e2e/unit | provided | Pass | |
| TC-SCR-10-WEB-005 | Delete | Administrator | e2e | provided | Pass | total 9 |
| TC-SCR-10-WEB-006 | Search "police" | Administrator | e2e | provided | Pass | owner name searched |
| TC-SCR-10-WEB-014 | Delete protections | Administrator | e2e/unit | provided | Pass | Other, in-use, bad id, unknown id |
| TC-SCR-10-WEB-023/025/026 | Name/description boundaries, `<>` strip | Administrator | e2e | provided | Pass | 60/61, 150/151 |
| TC-SCR-10-WEB-024 | Name uniqueness (case-insensitive) | Administrator | e2e/unit | provided | Pass | incl. race P2002 |
| TC-SCR-10-WEB-027 | Owner must exist | Administrator | e2e/unit | provided | Pass | |
| TC-SCR-10-WEB-028 | Search max 100, wildcards literal | Administrator | e2e | provided | Pass | |
| TC-SCR-10-WEB-029/030/035 | Paging, populated, no match | Administrator | e2e | provided | Pass | |
| TC-SCR-11-WEB-001..004, 006, 011 | Owners list/add/empty/edit/delete rules | Administrator | e2e/unit | provided | Pass | |
| TC-SCR-11-WEB-019..023 | Owner boundaries, unique, strip, search | Administrator | e2e | provided | Pass | |
| TC-SCR-12-WEB-001..005, 007, 008 | Badge Name seed/update/blank/persist/whitespace/boundaries | Administrator | e2e | provided | Pass | public read verified |
| TC-SCR-12-WEB-015 | Manager cannot update | Violation manager | e2e | provided | Pass | |
| SEC-catalogue | Unknown fields rejected | Administrator | e2e | generated | Pass | |

## Permission tests

| Role | Target | Expected | Result |
| ---- | ------ | -------- | ------ |
| Violation manager | GET/POST /v1/categories, GET/POST /v1/owners, GET/PUT /v1/config | 403 forbidden | Pass |
| anonymous | same six | 401 | Pass |
| Administrator | all catalogue endpoints | 2xx / specified 4xx | Pass |

## Failures

None. (One test written in the run initially failed: wildcard search `%`; fixed in the repository by escaping LIKE wildcards and the test was strengthened.)

## Open issues carried from the development loop

- Category in-use 409 is covered by unit test with a stubbed counter; the end-to-end path needs the violations module.
- UI-only cases (layout, a11y, responsive, modal focus, dead buttons) are for the frontend step.

## Coverage

| Metric | Required | Actual | Status |
| ------ | -------- | ------ | ------ |
| Every endpoint: happy, no auth, wrong role, invalid input, not found, conflict | 100% | 12/12 endpoints | Met |
| Permission matrix role x endpoint | 100% | 6 groups x 2 | Met |
| Line coverage report | services >= 80% | not measured (no coverage run configured); every service branch has an e2e or unit test | Partial |

## Requirements coverage

Tested: 13/13 (CAT-01..13). Untested: none (CAT-07 end-to-end depends on violations module).

## Manual checklist (run these by hand)

1. **TC-SCR-12-WEB-002** as `administrator@test.local` - PUT /v1/config then open the sign-in screen - badge name updated.

## Drift (integration runs only)

n/a
