# Test cases - violations (backend view)

The authoritative cases are `testcases/violations/input/TC-SCR-05|06|07-*.md` (IDs unchanged). This file maps the API-testable ones to backend tests (`test/violations.e2e-spec.ts`, `src/modules/violations/violations.spec.ts`). UI-only cases (layout, accessibility, toast text, modal focus, Escape/backdrop, unwired buttons, responsive) are deferred to the frontend.

| TC ID | Requirement | Backend test |
|---|---|---|
| TC-SCR-05-WEB-001, 002 | VIO-R12 | tiles and funnel from full tables |
| TC-SCR-05-WEB-018 | VIO-R13 | navigation counts |
| TC-SCR-05-WEB-020 | VIO-R12 | latest 5 newest first, masked |
| TC-SCR-05-WEB-025, 028 | roles / auth | both roles read; 401 without a session |
| TC-SCR-06-WEB-001 | VIO-R01 | page load: 10 rows, meta total 23 |
| TC-SCR-06-WEB-002, 009, 010, 026, 027 | VIO-R02 | date filter inclusive and bounds, order check |
| TC-SCR-06-WEB-003, 008, 025 | VIO-R02, R14 | owner filter (empty and derived), lookups for both roles |
| TC-SCR-06-WEB-005, 013, 028, 035 | VIO-R02 | search, AND with filters, 100/101 chars, wildcards literal |
| TC-SCR-06-WEB-019, 020-024 | VIO-R01 | page sizes, last page, invalid page |
| TC-SCR-06-WEB-031 | VIO-R02 | status filter |
| TC-SCR-06-WEB-014-016 | VIO-R18 | no export route |
| TC-SCR-06-WEB-017, 036, 037 | VIO-R03, R04 | masked everywhere, reveal audited, manager 403 |
| TC-SCR-06-WEB-041 | auth | 401 |
| TC-SCR-07-WEB-001 | VIO-R06, R09, R11 | verify with level, reviewer from session, history, no points |
| TC-SCR-07-WEB-002 | VIO-R12, R13 | counts follow a review |
| TC-SCR-07-WEB-003 | VIO-R06 | level without status change |
| TC-SCR-07-WEB-008, 015, 017 | VIO-R06 | status/level validation, whitelist |
| TC-SCR-07-WEB-016 | VIO-R07 | forward-only transitions |
| TC-SCR-07-WEB-018 | VIO-R08 | Verified needs level >= 1; level 0..3 |
| TC-SCR-07-WEB-019 | VIO-R08 | note 0/500/501, Rejected needs note |
| TC-SCR-07-WEB-020, 025 | VIO-R05, R16 | detail, evidence placeholder |
| TC-SCR-07-WEB-021 | VIO-R10 | concurrent reviewers |
| TC-SCR-07-WEB-012, 028 | auth | 404 unknown, 401 |
| TC-SCR-10-WEB-REFINT (added) | VIO-R15 | category in use 409, FK restrict, rename keeps reports |
| TC-INTAKE-001..004 (added) | VIO-R17 | intake key, validation, rate limit |
| SEED (added) | VIO-R19 | 23 linked reports |

Deferred to frontend: TC-SCR-05-WEB-003..017, 019, 021-024, 026, 027; TC-SCR-06-WEB-004, 006, 007, 011, 012, 018, 029-030, 032-034, 038-040; TC-SCR-07-WEB-004-007, 009-011, 013, 014, 022-024, 026-027; all RSP cases.
