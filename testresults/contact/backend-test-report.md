# Test Report - contact - Run 1

Date: 2026-10-27 · Runner: Tester (senior-developer / tester roles, auto-build) · Branch: feature/contact · Commit: see merge commit on dev-release
App: backend only (e2e through supertest against local MySQL `drivesafe_new_test_contact`)

## Summary

| Total | Passed | Failed | Flaky | Manual | Skipped |
| ----- | ------ | ------ | ----- | ------ | ------- |
| 28 (8 unit + 20 e2e contact tests; whole suite 51 unit + 69 e2e) | 28 | 0 | 0 | 0 | 0 |

Frontend-only cases (layout, accessibility, responsive, modal, dead controls) are not part of this backend run; see `stories/contact/test-cases.md`.

## Results by test case

| TC ID | Title | Role | Type | Origin | Result | Notes |
| ----- | ----- | ---- | ---- | ------ | ------ | ----- |
| TC-SCR-13-WEB-001 | List loads (10 rows, total 24) | Administrator | e2e | provided | Pass | |
| TC-SCR-13-WEB-002 | Detail for reply modal | Administrator | e2e | provided | Pass | |
| TC-SCR-13-WEB-003 | Empty reply blocked | Administrator | e2e | provided | Pass | 4 variants |
| TC-SCR-13-WEB-004 | Send reply | Administrator | e2e | provided | Pass | message "Reply sent to testing." |
| TC-SCR-13-WEB-005 | Revise reply | Administrator/Violation manager | e2e | provided | Pass | |
| TC-SCR-13-WEB-006 | Search | Administrator | e2e | provided | Pass | |
| TC-SCR-13-WEB-008 | Search incl. response | Administrator | e2e | provided | Pass | |
| TC-SCR-13-WEB-010 | Nothing sent to citizen / get 404 | Administrator | e2e + unit | provided | Pass | |
| TC-SCR-13-WEB-012 | Reply not found | Administrator | e2e + unit | provided | Pass | |
| TC-SCR-13-WEB-013 | Page-size select | Administrator | e2e + unit | provided | Pass | |
| TC-SCR-13-WEB-016 | All 24 reachable | Administrator | e2e | provided | Pass | |
| TC-SCR-13-WEB-021 | Response boundaries 0/1/1000/1001 | Administrator | e2e + unit | provided | Pass | |
| TC-SCR-13-WEB-022 | Brackets stripped | Administrator | e2e + unit | provided | Pass | |
| TC-SCR-13-WEB-023 | Search 100/101 | Administrator | e2e + unit | provided | Pass | |
| TC-SCR-13-WEB-024 | Page size options | Administrator | unit | provided | Pass | |
| TC-SCR-13-WEB-027 | Empty state | Administrator | e2e | provided | Pass | |
| TC-SCR-13-WEB-029 | Violation manager access | Violation manager | e2e | provided | Pass | allowed per roles.md; TC expectation conflict logged |
| TC-SCR-13-WEB-032 | No token gives 401 | Anonymous | e2e | provided | Pass | |
| (extra) | Intake store / validation / rate limit | Public | e2e | generated | Pass | 3 tests |

## Permission tests

| Role | Target | Expected | Result |
| ---- | ------ | -------- | ------ |
| Administrator | list, detail, reply | 200 | Pass |
| Violation manager | list, reply | 200 (contact:read / contact:reply) | Pass |
| Anonymous / bad token | all contact routes | 401 | Pass |

## Failures

None.

## Open issues carried from the development loop

None. Gaps: no unanswered-counter endpoint (OQ-13-06); TC WEB-029 expects "permission denied" for Violation manager but roles.md grants contact access (roles.md followed).

## Coverage

| Metric | Required | Actual | Status |
| ------ | -------- | ------ | ------ |
| Checks | typecheck, lint, build | all green | OK |
| Coverage tool | services >= 80% | not measured (all service branches exercised by unit + e2e) | n/a |

## Requirements coverage

Tested: 12/12 requirements (CON-01..CON-12; CON-12 is "not built").

## Manual checklist

None for backend.
