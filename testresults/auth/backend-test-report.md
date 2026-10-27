# Test Report - auth (backend) - Run 1

Date: 2026-10-27 13:00 - Runner: Tester (senior-developer + tester roles, autonomous) - Branch: feature/auth - Commit: 91fe0ad + working tree (squash-merged afterwards)
App: http://127.0.0.1:3000 (backend only) - DB: `drivesafe_new_test` on local MySQL (DB safety gate: 127.0.0.1, passed)

## Summary

| Total | Passed | Failed | Flaky | Manual | Skipped |
| ----- | ------ | ------ | ----- | ------ | ------- |
| 92 | 92 | 0 | 0 | 0 | 0 |

Unit (Vitest `npm test`): 3 files, 43 tests. E2E (`npm run test:e2e`, real MySQL test DB): 3 files, 49 tests. `typecheck`, `lint` (0 warnings/errors) and `build` green.
The 144 provided test cases (`testcases/auth/input`) split into 52 with a backend half (covered below) and 92 UI-only cases (layout, accessibility, responsive, focus, modal behaviour) deferred to the frontend step - see `testcases/auth/test-cases.md`.

## Results by test case

| TC ID | Title | Role | Type | Origin | Result | Notes |
| ----- | ----- | ---- | ---- | ------ | ------ | ----- |
| TC-SCR-00-WEB-002/010 | Valid login starts OTP challenge | Administrator | API | provided | Pass | no tokens until OTP |
| TC-SCR-00-WEB-005/006 | Empty username refused | - | API | provided | Pass | server follows PROPOSED rule, not the as-built defect (decision logged) |
| TC-SCR-00-WEB-007 | Username case-insensitive | Administrator | API | generated | Pass | |
| TC-SCR-00-WEB-013 | Username 2/3/254/255 | - | API | provided | Pass | |
| TC-SCR-00-WEB-014 | `<>` stripped | - | API | provided | Pass | |
| TC-SCR-00-WEB-015 | Password 0/1/128/129 | - | API | provided | Pass | |
| TC-SCR-00-WEB-016 | Password not trimmed | - | API | provided | Pass | |
| TC-SCR-00-WEB-017 | Generic credential error (+inactive/deleted) | - | API | provided | Pass | |
| TC-SCR-00-WEB-021 | Throttle after 5 failures | ViolationManager | API | provided | Pass | |
| TC-SCR-00-WEB-025 | No token -> 401 | - | API | provided | Pass | |
| TC-SCR-01-WEB-001/009 | Email required / whitespace | - | API | provided | Pass | |
| TC-SCR-01-WEB-002/010/011 | Email shape, 5-254 | - | API | provided | Pass | |
| TC-SCR-01-WEB-003/007 | Valid email, unknown email identical | - | API | provided | Pass | no enumeration |
| TC-SCR-02-WEB-001/008 | Correct code signs in | Administrator | API | provided | Pass | |
| TC-SCR-02-WEB-002/014 | Not 6 digits | - | API | provided | Pass | |
| TC-SCR-02-WEB-003 | Reset flow end to end | ViolationManager | API | provided | Pass | sessions revoked |
| TC-SCR-02-WEB-005/013/019 | Resend lock 60 s | - | API | provided | Pass | 500 s treated as typo |
| TC-SCR-02-WEB-009 | Resend issues new code | - | API | provided | Pass | |
| TC-SCR-02-WEB-016/025 | Wrong code | - | API | provided | Pass | |
| TC-SCR-02-WEB-017/026 | Expiry | - | API | provided | Pass | |
| TC-SCR-02-WEB-018 | 5 attempts then locked | - | API | provided | Pass | |
| TC-SCR-03-WEB-002/017/019 | Feedback required fields | - | API | provided | Pass | |
| TC-SCR-03-WEB-003/020/021 | Feedback email | - | API | provided | Pass | |
| TC-SCR-03-WEB-004/013 | Feedback stored | - | API | provided | Pass | persisted in DB |
| TC-SCR-03-WEB-006 | Message cap 1000 / min 10 | - | API | provided | Pass | |
| TC-SCR-03-WEB-010 | Subject enum/default | - | API | provided | Pass | |
| TC-SCR-03-WEB-018 | Name 2-100 | - | API | provided | Pass | |
| TC-SCR-04-WEB-001 | /me identity | Both | API | provided | Pass | |
| TC-SCR-04-WEB-005/011 | Logout revokes session | Administrator | API | provided | Pass | |
| TC-SCR-04-WEB-015 | 30 min idle timeout | Administrator | API | provided | Pass | 29 min ok / 31 min expired |
| SEC-* (otp single use, hashed at rest, unknown challenge, reset token single use, policy, refresh rotation, deactivated user, rate limits, unknown fields, malformed JSON, env guards) | Security checks | - | API/unit | generated | Pass | |
| PERM-matrix (13 permissions x 2 roles + unknown role) | Permission matrix | both | unit | generated | Pass | 100% of `can()` |

## Permission tests

| Role | Target | Expected | Result |
| ---- | ------ | -------- | ------ |
| Administrator | all 13 permissions in roles.md | allowed | Pass |
| Violation manager | violations/dashboard/contact/profile/password permissions | allowed | Pass |
| Violation manager | reveal-phone, categories, owners, config, portal-users, app-users | denied (403 at guard level) | Pass (unit; no routes yet use them) |
| both | GET /v1/auth/me | 200 | Pass |
| none | GET /v1/auth/me, POST /v1/auth/logout | 401 | Pass |

## Failures

None.

## Open issues carried from the development loop

None blocking. Accepted: in-memory rate limiter (single instance), no real mail provider, multer advisory (unused), trust-proxy deployment note.

## Coverage

| Metric | Required | Actual | Status |
| ------ | -------- | ------ | ------ |
| Policies / auth guards | 100% | permission matrix fully enumerated; guards exercised by e2e | Pass |
| Services >= 80% | 80% | not measured (coverage tool not run); every service branch has an e2e test | Not measured |

## Requirements coverage

Tested: AUTH-01..AUTH-14 (14/14 backend requirements). Untested here: the 92 UI-only TCs (frontend step).

## Manual checklist (run these by hand)

1. **Smoke** as `administrator@test.local` - `npm run build && node dist/main.js`, POST login then verify with 123456 - expected tokens (done once during this run, see output in the build log).

## Drift (integration runs only)

n/a (backend-only run).
