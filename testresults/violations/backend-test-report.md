# Test Report - violations - Run 1

Date: 2026-10-27 · Runner: Tester (auto-build) · Branch: feature/violations · Commit: squash-merged into dev-release
App: backend http://localhost:3000 (e2e in-process against MySQL `drivesafe_new_test_violations`) · frontend n/a

## Summary

| Total | Passed | Failed | Flaky | Manual | Skipped |
| ----- | ------ | ------ | ----- | ------ | ------- |
| 49 violations tests (8 unit, 41 e2e) | 49 | 0 | 0 | 0 | 0 |

Whole backend: 91 unit + 241 e2e = 332 passed, 0 failed. typecheck, lint, build clean.

## Results by test case

| TC ID | Title | Role | Type | Origin | Result | Notes |
| ----- | ----- | ---- | ---- | ------ | ------ | ----- |
| TC-SCR-05-WEB-001 | Tiles computed server-side | Administrator | e2e | provided | Pass | |
| TC-SCR-05-WEB-002 | Funnel mirrors tiles | Administrator | e2e | provided | Pass | |
| TC-SCR-05-WEB-018 | Navigation Pending badge | Violation manager | e2e | provided | Pass | |
| TC-SCR-05-WEB-020 | Latest 5, newest first, masked | Violation manager | e2e | provided | Pass | |
| TC-SCR-05-WEB-025 / 028 | Both roles read; 401 without session | both | e2e | provided | Pass | |
| TC-SCR-06-WEB-001 | First page 10 rows, total 23 | Administrator | e2e | provided | Pass | |
| TC-SCR-06-WEB-002 | Date filter inclusive | Administrator | e2e | provided | Pass | |
| TC-SCR-06-WEB-003 / 008 | Owner filter empty / derived | Administrator | e2e | provided | Pass | |
| TC-SCR-06-WEB-005 / 035 | Search, AND with filters, wildcards | Administrator | e2e | provided | Pass | |
| TC-SCR-06-WEB-019 | Page sizes and paging | Administrator | e2e | provided | Pass | |
| TC-SCR-06-WEB-025 | Lookups for both roles | both | e2e | provided | Pass | |
| TC-SCR-06-WEB-026 | Date bounds and order | Administrator | e2e | provided | Pass | PROPOSED rule |
| TC-SCR-06-WEB-028 | Search 100 / 101 | Administrator | e2e | provided | Pass | |
| TC-SCR-06-WEB-031 | Status filter | Administrator | e2e | added | Pass | |
| TC-SCR-06-WEB-014 | No export route | Administrator | e2e | provided | Pass | out of scope |
| TC-SCR-06-WEB-036 | Phone masked everywhere | Administrator | e2e | provided | Pass | |
| TC-SCR-06-WEB-017 / 037 | Reveal audited; manager 403 | Administrator / manager | e2e | provided | Pass | |
| TC-SCR-06-WEB-041 | List needs a session | none | e2e | provided | Pass | |
| TC-SCR-07-WEB-001 | Verify with level, session reviewer, no points | Administrator | e2e | provided | Pass | |
| TC-SCR-07-WEB-002 | Counts follow a review | Administrator / manager | e2e | provided | Pass | |
| TC-SCR-07-WEB-003 | Set level only | manager | e2e | provided | Pass | |
| TC-SCR-07-WEB-008 | Status validation, whitelist | Administrator | e2e | provided | Pass | |
| TC-SCR-07-WEB-012 | Unknown 404, no session 401 | both | e2e | provided | Pass | |
| TC-SCR-07-WEB-015 / 016 / 017 | Status map, transitions, review DTO | none | unit + e2e | provided | Pass | PROPOSED rule |
| TC-SCR-07-WEB-018 | Verified needs level 1..3 | Administrator | e2e | provided | Pass | PROPOSED rule |
| TC-SCR-07-WEB-019 | Note 0/500/501, Rejected needs note | Administrator | e2e | provided | Pass | PROPOSED rule |
| TC-SCR-07-WEB-020 / 025 | Detail, evidence placeholder | Administrator | e2e | provided | Pass | |
| TC-SCR-07-WEB-021 | Concurrent reviewers 200 + 409 | both | e2e | provided | Pass | |
| TC-SCR-10-WEB-REFINT | Category in use 409 `category_in_use`, FK, rename keeps reports | Administrator | e2e | added | Pass | |
| TC-INTAKE-001..004 | Intake key, validation, rate limit | public | e2e | added | Pass | |
| SEED | 23 linked reports | none | e2e | added | Pass | |
| Unit | Reveal audits before return, counter, paging shape, env key | none | unit | added | Pass | |

## Permission tests

| Role | Target | Expected | Result |
| ---- | ------ | -------- | ------ |
| Administrator | GET /violations, /dashboard, /lookups/*, PUT review, POST reveal-phone | 200 | Pass |
| Violation manager | GET /violations, /dashboard, /lookups/*, PUT review | 200 | Pass |
| Violation manager | POST /violations/:id/reveal-phone | 403, no audit row | Pass |
| none | every route except POST /public/violations | 401 | Pass |

## Failures

None.

## Open issues carried from the development loop

None. Gaps accepted: evidence upload/viewer (OQ-V-24), reward points (OQ-V-25), per-level scoping (OQ-V-03), 92-case UI-only subset deferred to the frontend.

## Coverage

| Metric | Required | Actual | Status |
| ------ | -------- | ------ | ------ |
| Endpoints with happy + 401 + 403/404 + invalid input | all | all 12 | met |
| Auth/permission paths | 100% | covered by e2e | met |

## Requirements coverage

Tested: 18/19 (VIO-R01..R17, R19) · Untested: none · VIO-R18 (export) intentionally absent and asserted as 404.

## Manual checklist (run these by hand)

1. **TC-SCR-06-WEB-017** as `administrator@test.local` - open Violations, press the eye on a row, check the full number appears and an `audit_logs` row `violation.reveal_phone` exists (needs the frontend).

## Drift (integration runs only)

n/a (backend only).
