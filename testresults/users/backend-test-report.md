# Test Report - users (backend) - Run 1

Date: 2026-10-27 · Runner: Tester (Vitest unit + e2e, supertest) · Branch: feature/users · Commit: see merge commit
App: backend only (NestJS, `http://localhost:3000`) · frontend: not built in this step

Databases: dev `drivesafe_new_users`, tests `drivesafe_new_test_users` (local MySQL 127.0.0.1; DB safety gate passed).

## Summary

| Total | ✅ Passed | ❌ Failed | ⚠️ Flaky | 📝 Manual | ⏭️ Skipped |
| ----- | -------- | -------- | ------- | -------- | --------- |
| 191 | 191 | 0 | 0 | 0 | 0 |

Unit: 60 (incl. auth/permissions carried over) · e2e: 131 (incl. auth/public carried over). New in this module: 17 unit + 82 e2e.
Provided test cases (129): 70 proven by backend tests, 59 UI-only deferred to the frontend step (listed below).

## Results by test case

| TC ID | Title | Role | Type | Origin | Result | Notes |
| ----- | ----- | ---- | ---- | ------ | ------ | ----- |
| TC-SCR-20-WEB-001 | ST-SCR-20-01 List renders the eight seed users | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-20-WEB-002 | ST-SCR-20-02 Search filters rows as I type | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-003 | ST-SCR-20-03 Add dialog starts invalid | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-004 | ST-SCR-20-04 Password checklist turns green rule by rule | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-005 | ST-SCR-20-05 Add a user | Violation manager | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-20-WEB-006 | ST-SCR-20-06 Field errors appear on blur | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-007 | ST-SCR-20-07 Edit keeps the password when left blank | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-20-WEB-008 | ST-SCR-20-08 Delete asks the browser to confirm | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-009 | ST-SCR-20-09 Reset password is a toast only | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-010 | ST-SCR-20-10 Escape and backdrop discard the dialog | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-011 | Search users: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-012 | CSV: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-013 | Excel: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-014 | Print: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-015 | ＋ Add User: outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-016 | ✎ (row) aria-label "Edit {firstName}": outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-017 | 🗑 (row) aria-label "Delete {firstName}": outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 3 test(s) |
| TC-SCR-20-WEB-018 | 🔒 (row) aria-label "Reset password for {firstName}": outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-20-WEB-019 | Show [10 ▾] entries: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-20-WEB-020 | Previous: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-021 | 1: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-022 | Next: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-023 | × (dialog) aria-label "Close dialog": outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-024 | Cancel (dialog): outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-025 | Save (dialog): outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 3 test(s) |
| TC-SCR-20-WEB-026 | 👁 / 🙈 (Password) aria-label "Show password" / "Hide password": outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-027 | Backdrop click: outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-028 | Esc: outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-029 | "Previous" disabled when: always (page 1) | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-030 | "Next" disabled when: always (single page) | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-031 | "Save (dialog)" disabled when: form invalid (see Validation); recomputed on ever | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-032 | Search users: boundaries of "Free text; substring match; empty shows all rows; m | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-033 | Show 10 25 entries: rule "Closed set: 10 or 25, default 10; currently wired to n | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-034 | First Name: boundaries of "Required (trimmed; whitespace-only is empty). Max 60  | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-035 | Last Name: boundaries of "Required (trimmed). Max 60, same character set" | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-036 | Email: boundaries of "Required (trimmed); must match `^\S+@\S+\.\S+$` (`type="em | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 3 test(s) |
| TC-SCR-20-WEB-037 | Phone No: boundaries of "Required (trimmed); digits only `^[0-9]+$` (no +, space | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 4 test(s) |
| TC-SCR-20-WEB-038 | Address: boundaries of "Optional free text, trimmed; max 200 characters" | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-039 | Role: option set | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-WEB-040 | Level: boundaries of "Optional; one of blank, 1, 2, 3 (the label carries a yello | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-20-WEB-041 | Password: boundaries of "Required on Add (`data-req` added in `openUser(-1)`; bl | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-20-WEB-042 | State · Populated | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-043 | State · Search no match | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-20-WEB-044 | State · Empty | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-045 | State · Loading | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-046 | State · Error | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-047 | State · Permission denied | Violation manager | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 12 test(s) |
| TC-SCR-20-WEB-048 | UI · layout matches the story screenshot (users.png) | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-049 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-20-WEB-050 | Security basics · direct route without a session goes to sign-in | Anonymous | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 15 test(s) |
| TC-SCR-20-RSP-001 | Responsive · iPhone 14 (390x844) | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-20-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-20-RSP-003 | Responsive · Desktop 1440 (1440x900) | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-001 | ST-SCR-21-01 List shows 10 of 3,123 | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 3 test(s) |
| TC-SCR-21-WEB-002 | ST-SCR-21-02 Reveal and re-mask a phone | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-003 | ST-SCR-21-03 Add dialog opens with Save disabled | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-004 | ST-SCR-21-04 Phone must be digits | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-005 | ST-SCR-21-05 Add an app user | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-21-WEB-006 | ST-SCR-21-06 Edit shows the unmasked phone | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-007 | ST-SCR-21-07 Edit points | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-008 | ST-SCR-21-08 Search matches on visible text only | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-009 | ST-SCR-21-09 Dead controls do nothing | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-010 | Search app users: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-011 | CSV / Excel / Print: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-012 | ＋ Add App User: outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-013 | 👁 (phone cell) aria-label "Show full phone number": outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-014 | ✎ (row) aria-label "Edit app user {full phone}": outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-015 | Show [10 ▾] entries: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-016 | Previous, 1, 2, 3, …, 313, Next: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-017 | × / Cancel / Esc / backdrop: outcome | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-018 | Save: outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-019 | Controls reserved to other roles are absent or refused for Administrator | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-020 | Controls reserved to other roles are absent or refused for Violation manager | Violation manager | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-021 | "Previous, 1, 2, 3, …, 313, Next" disabled when: never (should be Previous on pa | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-022 | "Save" disabled when: back to this list | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-023 | Search app users: boundaries of "Free text; substring match on the rendered (mas | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-024 | Show 10 25 50 100 entries: rule "Closed set: 10, 25, 50 or 100, default 10; curr | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-025 | First Name: boundaries of "Optional free text, trimmed; max 60 characters; Unico | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-026 | Last Name: boundaries of "Optional, trimmed; max 60, same set" | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-027 | Email: boundaries of "Optional; if present must match `^\S+@\S+\.\S+$` (`type="e | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-028 | Phone No: boundaries of "Required (trimmed); digits only `^[0-9]+$` (`inputmode= | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-029 | Earner Points: boundaries of "Whole number, minimum 0 (declared), default 0; max | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-21-WEB-030 | Reedemed Points: boundaries of "Whole number, minimum 0 (declared), default 0; m | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-WEB-031 | State · Populated | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-032 | State · After Add | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-033 | State · Search no match | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-034 | State · Empty | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-035 | State · Loading / Error | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-036 | State · Permission denied | Violation manager | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-RSP-001 | State · Phone revealed | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 3 test(s) |
| TC-SCR-21-WEB-037 | UI · layout matches the story screenshot (appusers.png) | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-038 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-WEB-039 | Security basics · direct route without a session goes to sign-in | Anonymous | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-RSP-002 | Responsive · iPhone 14 (390x844) | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-21-RSP-003 | Responsive · iPad (gen 7) (810x1080) | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-21-RSP-004 | Responsive · Desktop 1440 (1440x900) | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-001 | ST-SCR-22-01 Open Profile from the avatar menu | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 3 test(s) |
| TC-SCR-22-WEB-002 | ST-SCR-22-02 Checklist follows typing | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-003 | ST-SCR-22-03 Strong password lights everything | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-004 | ST-SCR-22-04 Submit with problems shows all errors | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-22-WEB-005 | ST-SCR-22-05 Weak new password rejected | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-006 | ST-SCR-22-06 New must differ from current | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-007 | ST-SCR-22-07 Successful change | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-008 | ST-SCR-22-08 Reveal toggle is per field | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-009 | ST-SCR-22-09 Cancel leaves without saving | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-010 | Avatar menu → Profile: outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-011 | Sidebar profile card: outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-012 | 👁 / 🙈 on Current, New, Confirm: outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-013 | Update password: outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-014 | Cancel: outcome | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-015 | "Update password" disabled when: never (always pressable). Exercised on the runn | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-016 | Current password (`cp-current`): required | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-017 | Current password: rule "Must equal the account's existing password; locked out a | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-018 | Current password: boundaries of "Max 128 characters (no point accepting more tha | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-019 | New password (`cp-new`): required | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-020 | New password: boundaries of "Min 12 characters" | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-021 | New password: boundaries of "Max 128 characters" | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-022 | New password: boundaries of "At least one of each: uppercase A–Z, lowercase a–z, | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 2 test(s) |
| TC-SCR-22-WEB-023 | New password: rule "Must differ from Current password (exact string compare)" | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-024 | New password: boundaries of "Must not contain the user's name or email; not in a | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-025 | Confirm new password (`cp-confirm`): required | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-026 | Confirm new password: rule "Must equal New password exactly" | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 1 test(s) |
| TC-SCR-22-WEB-027 | All three: boundaries of "Inputs are `type=password` with `autocomplete` `curren | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-028 | UI · layout matches the story screenshot (profile.png) | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-029 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-WEB-030 | Security basics · direct route without a session goes to sign-in | Anonymous | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-RSP-001 | Responsive · iPhone 14 (390x844) | Administrator | Backend + Frontend | provided | ✅ Pass | users.e2e/unit: 3 test(s) |
| TC-SCR-22-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |
| TC-SCR-22-RSP-003 | Responsive · Desktop 1440 (1440x900) | Administrator | Frontend | provided | ⏭️ Deferred (UI) | frontend step (UI-only, or covered by shared server rule noted in the plan) |

Generated cases (not in the provided set), all passing:

- `PERM-matrix Administrator holds portal-users:manage` - ✅
- `PERM-matrix Administrator holds app-users:manage` - ✅
- `PERM-matrix Violation manager is denied portal-users:manage` - ✅
- `PERM-matrix Violation manager is denied app-users:manage` - ✅
- `SEC-users public routes (no user) and users without the flag pass` - ✅
- `SEC-users a flagged user is refused except on allow-listed routes` - ✅
- `SEC-users two concurrent demotions cannot remove the last two Administrators (row-locked check)` - ✅
- `SEC-users reset requests are throttled per target (5 per 15 minutes)` - ✅
- `SEC-users repeated wrong current passwords lock the change (429) even for the right one, until the window passes` - ✅
- `PERM-users Violation manager may change own password (password:change)` - ✅
- `SEC-users the OTP dev code constant is the one used by the helpers` - ✅

## Permission tests

| Role | Target | Expected | Result |
| ---- | ------ | -------- | ------ |
| Violation manager | all 6 portal-users routes | 403 forbidden | ✅ (PERM-users, 6 tests) |
| Violation manager | all 6 app-users routes incl. reveal-phone | 403 forbidden | ✅ (PERM-users, 6 tests) |
| Anonymous | every users route + profile (3) | 401 | ✅ (15 tests) |
| Administrator | portal-users, app-users, reveal-phone | 200/201 | ✅ |
| Violation manager | GET/PUT profile, POST profile/change-password | 200 | ✅ |
| User with mustChangePassword | portal-users, app-users, PUT profile | 403 password_change_required | ✅ |
| User with mustChangePassword | auth/me, GET profile, change-password, logout | allowed | ✅ |

## Failures

None.

## Open issues carried from the development loop

None open after round 1 (see `backend/docs/reviews/users/dev-loop.md`). Accepted gaps: see "Gaps" below.

## Coverage

| Metric | Required | Actual | Status |
| ------ | -------- | ------ | ------ |
| Every endpoint: happy, no auth, wrong role, invalid input, not found, conflict | 100% of 17 operations | 17/17 | ✅ |
| Permission matrix / auth policies | 100% | 100% (matrix spec + PERM-users) | ✅ |
| Provided TCs with a backend half proven | all backend-testable | 70/129 (rest UI-only) | ✅ |

## Requirements coverage

Tested: 70/129 provided cases (backend half) · Untested here: UI-only cases (frontend step).

## Manual checklist (run these by hand)

1. **Reset password end-to-end** as `administrator@test.local` - press reset on a user, read `GET /v1/dev/mailbox?to=<email>` (dev), open the link, set a password, sign in.
2. **First login** - create a user, sign in as it, confirm only Profile/Change password are reachable.

## Gaps

- No load/perf test (search is a LIKE scan; fine for 3,123 app users, index review if it grows 100x).
- Audit rows are written after the data change (not in the same transaction); a failure there returns 500 after the write succeeded (reveal-phone is the exception: audit first).
- `npm audit` multer advisory inherited from auth (accepted).
