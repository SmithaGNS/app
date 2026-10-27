# Test Report - users (frontend) - Run 1

Date: 2026-10-27 · Runner: Tester (frontend) · Branch: feature/users (squash-merged to dev-release as 46659d9, after catalogue 54d4b49)
App: backend http://127.0.0.1:3100 (stable dev-release build, seeded `drivesafe_new`) · frontend http://127.0.0.1:5176 (Vite)

## Summary

| Total | Passed | Failed | Flaky | Manual | Skipped |
| ----- | ------ | ------ | ----- | ------ | ------- |
| 111 | 111 | 0 | 0 | 0 | 0 |

New users tests: 61 Vitest (`schemas.test.ts` 18, `PortalUsersPage.test.tsx` 16, `AppUsersPage.test.tsx` 11, `ProfilePage.test.tsx` 16) + 49 stubbed Playwright (`e2e/users.spec.ts`) + 1 real-backend Playwright (`e2e/users-real.spec.ts`) = 111, all passing in the final runs.
Full-suite regression after rebase on catalogue: Vitest 147/147 (14 files). Playwright (everything except the real-backend specs): 241 passed, 1 flaky (users axe on Profile, made deterministic afterwards; 3 further isolated runs green), 9 "did not run" are the serial real-backend specs. `users-real` re-run alone after the rate-limit window: pass.
Typecheck, build: green. Lint: 0 errors (warnings only; 1 new `set-state-in-effect` for clearing revealed phones).

Honest notes:
- The backend limits logins to 30 / 15 min **per IP**, shared by all parallel agents and suites. One full-suite run that included every real-backend spec ended with `real-backend`, `catalogue-real` and `users-real` failing on `rate_limited` at login (not a product failure); `users-real` passed before and after that run, `real-backend`/`catalogue-real` belong to other modules and were not re-verified by me (logged as Q-094).
- Two existing shell specs (`TC-SCR-04-NAV-04`, `TC-SCR-04-ROLE-02`) asserted the placeholder pages for Portal users / App users / Profile; they were updated (and stubbed so an unauthenticated mock-token call cannot end the session) because this module replaces the placeholders.
- Chromium only; no pixel baselines (TC-SCR-20-WEB-048 / TC-SCR-21-WEB-037 are checked structurally, not against the screenshots).

## Results by test case

| TC ID | Title | Role | Type | Origin | Result | Notes |
| ----- | ----- | ---- | ---- | ------ | ------ | ----- |
| TC-SCR-20-WEB-001 / 042 / 048 | List renders users, columns, role label, phone display, pinned Option | Administrator | Functional | Vitest + PW stub + PW real | Pass | Real: seeded users listed |
| TC-SCR-20-WEB-002 / 011 / 032 / 043 | Server search (max 100, brackets stripped), no-match message | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-20-WEB-003 / 015 / 031 | Add dialog opens, Save disabled until valid, Role preset | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-20-WEB-004 / 026 | Checklist and strength meter follow typing; per-field eye toggle | Administrator | Functional | Vitest + PW | Pass | Label by rules met |
| TC-SCR-20-WEB-005 / 025 | Add a user (body, toast, row, focus return) | Administrator | Functional | Vitest + PW + PW real | Pass | Real: created and later deleted |
| TC-SCR-20-WEB-006 | Field errors on blur | Administrator | Negative | Vitest + PW | Pass | |
| TC-SCR-20-WEB-007 / 016 | Edit keeps password when blank, focus returns | Administrator | Functional | Vitest + PW + PW real | Pass | |
| TC-SCR-20-WEB-008 / 017 | Delete via accessible confirm; self / last-Administrator blocks shown | Administrator | Functional | Vitest + PW + PW real | Pass | Real: self-delete block verified; last-admin block verified against stub only |
| TC-SCR-20-WEB-009 / 018 | Reset password toast; email_missing error | Administrator | Functional | Vitest + PW + PW real | Pass | |
| TC-SCR-20-WEB-010 / 023 / 024 / 027 / 028 | Cancel, x, Esc, backdrop discard; focus returns to the row action | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-20-WEB-012 / 013 / 014 | CSV / Excel / Print | Administrator | Functional | Vitest + PW | Pass (deviation) | Intentionally not built: assert absence |
| TC-SCR-20-WEB-019 / 020 / 021 / 022 / 029 / 030 / 033 | Page size 10/25/50/100, Previous/Next/numbers, disabled ends | Administrator | Functional | Vitest + PW | Pass | Server paging |
| TC-SCR-20-WEB-034..041 | Field boundaries (names, e-mail, phone, address, role, level, password 12/128) | Administrator | Boundary | Vitest | Pass | Server duplicate e-mail: PW + PW real |
| TC-SCR-20-WEB-044 / 045 / 046 | Empty, loading, error with retry | Administrator | State | Vitest + PW | Pass | |
| TC-SCR-20-WEB-047 | Violation manager gets forbidden state | Violation manager | Permission | PW | Pass | |
| TC-SCR-20-WEB-049 | axe (list, dialog with checklist, confirm) + Tab trap | Administrator | A11y | PW | Pass | 0 serious/critical |
| TC-SCR-20-WEB-050 | Direct route without session goes to sign-in | Anonymous | Security | PW | Pass | |
| TC-SCR-20-RSP-001..004 | 390 / 810 / 1440 / 2560 (Option visible, no page-level scroll, axe) | Administrator | Responsive | PW | Pass | Table scrolls inside `.table-wrap` below ~1100 px |
| TC-SCR-21-WEB-001 / 031 | List: masked phones, points, total from server (3123) | Administrator | Functional | Vitest + PW + PW real | Pass | |
| TC-SCR-21-WEB-002 / 013 / RSP-001 | Reveal and re-mask a phone (audited POST) | Administrator | Functional | Vitest + PW + PW real | Pass | |
| TC-SCR-21-WEB-003 / 004 / 012 | Add dialog, Save disabled, phone digits only | Administrator | Negative | Vitest + PW | Pass | |
| TC-SCR-21-WEB-005 / 018 | Add an app user | Administrator | Functional | Vitest + PW + PW real | Pass | |
| TC-SCR-21-WEB-006 / 007 / 014 | Edit: masked phone, Reveal fills the real number, edit points, focus return | Administrator | Functional | Vitest + PW + PW real | Pass | Decision Q-088 |
| TC-SCR-21-WEB-008 / 010 / 023 | Search on the unmasked phone, server side | Administrator | Functional | Vitest + PW + PW real | Pass | |
| TC-SCR-21-WEB-009 / 011 | Dead controls, CSV/Excel/Print | Administrator | Functional | PW | Pass (deviation) | Controls absent by decision |
| TC-SCR-21-WEB-015 / 016 / 021 / 024 | Page sizes, paging window (313 pages) | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-21-WEB-017 / 022 | Esc / Cancel / x / backdrop | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-21-WEB-025..030 | Names, e-mail, phone, points 0..1,000,000, redeemed <= earned | Administrator | Boundary | Vitest + PW | Pass | Duplicate phone from server: Vitest + PW |
| TC-SCR-21-WEB-032..035 | After add, no-match, empty, loading / error | Administrator | State | Vitest + PW | Pass | |
| TC-SCR-21-WEB-019 / 020 / 036 | Reveal control only for Administrator; Violation manager forbidden | Both | Permission | Vitest + PW | Pass | |
| TC-SCR-21-WEB-037 / 038 | Layout (structural) and axe | Administrator | A11y | PW | Pass | No pixel baseline |
| TC-SCR-21-WEB-039 | No session goes to sign-in | Anonymous | Security | PW | Pass | |
| TC-SCR-21-RSP-002..005 | 390 / 810 / 1440 / 2560 | Administrator | Responsive | PW | Pass | |
| TC-SCR-22-WEB-001 / 010 / 011 / 028 | Profile from avatar menu and sidebar card, own details, any role | Both | Functional | Vitest + PW | Pass | |
| TC-SCR-22-WEB-002 / 003 | Checklist follows typing; strong password lights all | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-22-WEB-004 | Submit empty shows all errors | Administrator | Negative | Vitest + PW | Pass | |
| TC-SCR-22-WEB-005 / 006 / 023 / 026 | Weak, equal-to-current, mismatch rejected before any request | Administrator | Negative | Vitest + PW | Pass | Order of messages as the story |
| TC-SCR-22-WEB-007 / 013 | Successful change: toast, success state, fields cleared | Administrator | Functional | Vitest + PW + PW real | Pass | Real: done with a freshly created user, not the seeded accounts |
| TC-SCR-22-WEB-008 / 012 | Reveal toggle is per field | Administrator | Functional | Vitest + PW | Pass | |
| TC-SCR-22-WEB-009 / 014 / 015 | Cancel clears without saving | Administrator | Functional | Vitest + PW | Pass | Button is always pressable (as built) |
| TC-SCR-22-WEB-016..022 / 025 | Required and policy boundaries (12 / 128, classes) | Administrator | Boundary | Vitest | Pass | |
| TC-SCR-22-WEB-017 | Wrong current password (400 field error) and lock-out (429) | Administrator | Negative | Vitest + PW + PW real | Pass | Real: wrong current password message verified |
| TC-SCR-22-WEB-024 | Name / e-mail / common-password rule | Administrator | Negative | - | Not covered | PROPOSED rule not implemented by backend (OQ-22-04) |
| TC-SCR-22-WEB-027 | `autocomplete` attributes on the three inputs | Administrator | Functional | code review | Pass | Set in the component; not asserted by a test |
| TC-SCR-22-WEB-029 | axe on Profile | Administrator | A11y | PW | Pass | |
| TC-SCR-22-WEB-030 | No session goes to sign-in | Anonymous | Security | PW | Pass | |
| TC-SCR-22-RSP-001..004 | 390 / 810 / 1440 / 2560 | Administrator | Responsive | PW | Pass | |
| (extra) First-login gate | `mustChangePassword` and 403 `password_change_required` redirect to Profile, released after the change | New user | Functional | Vitest + PW + PW real | Pass | |

## Permission tests

| Role | Target | Expected | Result |
| ---- | ------ | -------- | ------ |
| Administrator | /portal-users, /app-users, /profile | allowed | Pass |
| Violation manager | /portal-users, /app-users | forbidden state | Pass |
| Violation manager | /profile | allowed | Pass |
| New user (real) after change | /portal-users | forbidden state (Violation manager) | Pass |
| anonymous | /portal-users, /app-users, /profile | sign-in | Pass |

## Failures
None in the final runs (see the rate-limit note above).

## Open issues carried from the development loop
- TC-SCR-22-WEB-024 (name/e-mail/common-password) is not enforced by the backend, so there is nothing to show; left as Not covered.
- Sidebar links stay visible during the first-login gate (clicks return to Profile).
- Real-backend specs depend on the per-IP login limit (Q-094).

## Coverage

| Metric | Required | Actual | Status |
| ------ | -------- | ------ | ------ |
| Provided UI TCs deferred to frontend (59) addressed | 100% | 58 / 59 (1 not covered, WEB-024) | OK |
| axe serious/critical | 0 | 0 | OK |

## Requirements coverage

Tested: all USR frontend stories USR-F-01..15 · Untested: pixel comparison to screenshots, WEB-024.

## Manual checklist (run these by hand)

1. **TC-SCR-21-WEB-002** as `administrator@test.local` — open App users, press the eye on a row — expected: full number shown, an audit row exists in `audit_logs`.
2. **TC-SCR-22-WEB-007** as a freshly created user — change the password, then sign in again with the new password in another browser — expected: old sessions revoked.
