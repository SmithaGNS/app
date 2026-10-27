# Test Report - auth (frontend) - Run 1

Date: 2026-10-27 13:35 · Runner: Tester (autonomous) · Branch: feature/auth · Commit: the squash commit on dev-release (`feat(auth): ...`)
App: http://127.0.0.1:3000 (real NestJS backend, dev DB drivesafe_new, OTP_DEV_CODE=123456, DEV_MAILBOX_ENABLED=true, NODE_ENV=development) · http://127.0.0.1:5173 (Vite dev server, /v1 proxied)

## Summary

| Suite | Total | Passed | Failed | Flaky (passed on retry) | Skipped |
| --- | --- | --- | --- | --- | --- |
| Vitest (component / unit) | 49 | 49 | 0 | 0 | 0 |
| Playwright chromium (E2E, a11y, responsive, layout) | 125 | 122 | 0 | 3 | 0 |
| Provided TCs referenced by at least one passing test | 144 of 144 | 144 | 0 | - | - |

typecheck clean · lint 0 errors (5 warnings: react-refresh export style, one set-state-in-effect on drawer reset) · build OK · npm audit (prod) 0 vulnerabilities.

Flaky (all passed on the automatic single retry, none failed twice): TC-SCR-02-WEB-004 (paste), TC-SCR-00-WEB-003 (forgot link), TC-SCR-04-NAV-07 (skip link), plus TC-SCR-04-WEB-006 in an earlier run. All occurred right after a cold page load on the Vite dev server with 2 parallel workers; no product defect was identified. Not investigated further.

## How the suites are split

- Real backend (serial, about 10 sign-ins; restart the backend before a full run because login/OTP/feedback are rate limited per IP: 30 / 15 min, feedback 5 / 15 min): `e2e/real-backend.spec.ts` covers Administrator and Violation manager sign-in (login, OTP 123456, /me, nav), logout revoking the token (old token returns 401), wrong password and unknown account (same generic message), wrong OTP, dev mailbox, forgot, OTP, "Identity verified" (and the unknown e-mail path), feedback stored (201), Badge Name from /v1/public/config, and 401 then refresh rotation then retry.
- Stubbed API (`page.route`, contract-shaped envelopes): all other UI states (validation, loading, 429 lockout, expired / exhausted OTP, resend timing with the Playwright clock, idle timeout with the clock, roles).
- The 5-failures account lockout and OTP expiry / attempt limits are proven by the backend suite; the UI shows the server message (stubbed here). The real lockout was deliberately not triggered because it would lock the shared seed account for 15 minutes.

## Results by test case

Every provided TC id appears in the title of at least one passing test. Deviations are listed after the table.

| TC ID | Title | Result | Test file(s) |
| ----- | ----- | ------ | ------------ |
| TC-SCR-00-WEB-001 | ST-SCR-00-01 Login page renders | Pass | login.spec.ts, LoginPage.test.tsx |
| TC-SCR-00-WEB-002 | ST-SCR-00-02 LOGIN proceeds to code entry | Pass | login.spec.ts, real-backend.spec.ts, LoginPage.test.tsx |
| TC-SCR-00-WEB-003 | ST-SCR-00-03 Forgot password link | Pass | login.spec.ts, LoginPage.test.tsx |
| TC-SCR-00-WEB-004 | ST-SCR-00-04 Feedback link | Pass | login.spec.ts |
| TC-SCR-00-WEB-005 | ST-SCR-00-05 Empty submit (as built, flagged) | Pass | login.spec.ts |
| TC-SCR-00-WEB-006 | ST-SCR-00-06 Proposed required-field behaviour | Pass | login.spec.ts, LoginPage.test.tsx |
| TC-SCR-00-WEB-007 | Username: outcome | Pass | login.spec.ts |
| TC-SCR-00-WEB-008 | Password: outcome | Pass | login.spec.ts |
| TC-SCR-00-WEB-009 | Forgot Password?: goes to SCR-01 | Pass | login.spec.ts |
| TC-SCR-00-WEB-010 | LOGIN (`aria-label="Sign in"`): goes to SCR-02 | Pass | login.spec.ts |
| TC-SCR-00-WEB-011 | Feedback: goes to SCR-03 | Pass | login.spec.ts |
| TC-SCR-00-WEB-012 | "LOGIN (`aria-label="Sign in"`)" disabled when: never, even with both fields empty | Pass | login.spec.ts |
| TC-SCR-00-WEB-013 | Username: boundaries of "Required, trimmed, 3-254 chars (email or username accepted: " | Pass | login.spec.ts, schemas.test.ts |
| TC-SCR-00-WEB-014 | Username: boundaries of "Characters `<` and `>` are stripped as typed" | Pass | login.spec.ts, LoginPage.test.tsx, schemas.test.ts |
| TC-SCR-00-WEB-015 | Password: boundaries of "Required, 1-128 chars (128 mirrors PASSWORD_MAX in the passw" | Pass | login.spec.ts, schemas.test.ts |
| TC-SCR-00-WEB-016 | Password: rule "Not trimmed, not stripped; `type=password`" | Pass | login.spec.ts |
| TC-SCR-00-WEB-017 | Credentials: rule "Must match an account" | Pass | login.spec.ts, real-backend.spec.ts, LoginPage.test.tsx |
| TC-SCR-00-WEB-018 | State · Default | Pass | login.spec.ts |
| TC-SCR-00-WEB-019 | State · Error | Pass | login.spec.ts, real-backend.spec.ts |
| TC-SCR-00-WEB-020 | State · Loading | Pass | login.spec.ts |
| TC-SCR-00-WEB-021 | State · Locked / throttled | Pass | login.spec.ts |
| TC-SCR-00-WEB-022 | State · Empty-submit | Pass | login.spec.ts |
| TC-SCR-00-WEB-023 | UI · layout matches the story screenshot (auth-login.png) | Pass | login.spec.ts, real-backend.spec.ts |
| TC-SCR-00-WEB-024 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Pass | a11y-responsive.spec.ts |
| TC-SCR-00-WEB-025 | Security basics · direct route without a session goes to sign-in | Pass | login.spec.ts |
| TC-SCR-00-RSP-001 | Responsive · iPhone 14 (390x844) | Pass | a11y-responsive.spec.ts |
| TC-SCR-00-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Pass | a11y-responsive.spec.ts |
| TC-SCR-00-RSP-003 | Responsive · Desktop 1440 (1440x900) | Pass | a11y-responsive.spec.ts |
| TC-SCR-01-WEB-001 | ST-SCR-01-01 Required email | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-002 | ST-SCR-01-02 Malformed email | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-003 | ST-SCR-01-03 Valid email | Pass | forgot-otp.spec.ts, real-backend.spec.ts |
| TC-SCR-01-WEB-004 | ST-SCR-01-04 Error clears while typing | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-005 | ST-SCR-01-05 Back | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-006 | Email address: outcome | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-007 | Send code: goes to SCR-02 | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-008 | ← Back to sign in: goes to SCR-00 | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-009 | Email address: required | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-010 | Email address: format "Shape `^\S+@\S+\.\S+$`" | Pass | forgot-otp.spec.ts, schemas.test.ts |
| TC-SCR-01-WEB-011 | Email address: boundaries of "Length 5-254 characters" | Pass | forgot-otp.spec.ts, schemas.test.ts |
| TC-SCR-01-WEB-012 | Email address: boundaries of "`<` `>` stripped as typed" | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-013 | State · Default | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-014 | State · Error | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-015 | State · Sent | Pass | layout.spec.ts |
| TC-SCR-01-WEB-016 | State · Loading | Pass | forgot-otp.spec.ts |
| TC-SCR-01-WEB-017 | UI · layout matches the story screenshot (auth-forgot.png) | Pass | layout.spec.ts |
| TC-SCR-01-WEB-018 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Pass | a11y-responsive.spec.ts |
| TC-SCR-01-WEB-019 | Security basics · direct route without a session goes to sign-in | Pass | forgot-otp.spec.ts |
| TC-SCR-01-RSP-001 | Responsive · iPhone 14 (390x844) | Pass | a11y-responsive.spec.ts |
| TC-SCR-01-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Pass | a11y-responsive.spec.ts |
| TC-SCR-01-RSP-003 | Responsive · Desktop 1440 (1440x900) | Pass | a11y-responsive.spec.ts |
| TC-SCR-02-WEB-001 | ST-SCR-02-01 Login mode completes sign-in | Pass | forgot-otp.spec.ts, real-backend.spec.ts |
| TC-SCR-02-WEB-002 | ST-SCR-02-02 Incomplete code | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-003 | ST-SCR-02-03 Reset mode done state | Pass | forgot-otp.spec.ts, real-backend.spec.ts |
| TC-SCR-02-WEB-004 | ST-SCR-02-04 Paste fills the boxes | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-005 | ST-SCR-02-05 Resend lock | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-006 | ST-SCR-02-06 Back link depends on mode | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-007 | Digit boxes 1-6 (`aria-label` Digit 1..6): outcome | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-008 | Verify: goes to SCR-05 | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-009 | Resend code: outcome | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-010 | ← Change email (reset): goes to SCR-01 | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-011 | ← Back to sign in (login): goes to SCR-00 | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-012 | Back to sign in (done panel): goes to SCR-00 | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-013 | "Resend code" disabled when: during the countdown | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-014 | Code (6 boxes): boundaries of "Exactly 6 characters, each 0-9 (min 6, max 6)" | Pass | forgot-otp.spec.ts, schemas.test.ts |
| TC-SCR-02-WEB-015 | Each box: rule "One digit, non-digits removed on input" | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-016 | Code correctness: rule "Must equal the issued code" | Pass | forgot-otp.spec.ts, real-backend.spec.ts |
| TC-SCR-02-WEB-017 | Code lifetime: boundaries of "Valid for a limited time, e.g. 10 minutes" | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-018 | Attempts: boundaries of "Maximum 5 wrong entries per code" | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-019 | Resend interval: boundaries of "Minimum wait before resend: 500 s as built (min 500, max 5 | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-020 | State · Awaiting code (reset) | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-021 | State · Awaiting code (login) | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-022 | State · Error | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-023 | State · Done (reset only) | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-024 | State · Signed in (login only) | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-025 | State · Wrong code | Pass | forgot-otp.spec.ts, real-backend.spec.ts |
| TC-SCR-02-WEB-026 | State · Expired code | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-027 | State · Resend available | Pass | forgot-otp.spec.ts |
| TC-SCR-02-WEB-028 | UI · layout matches the story screenshot (auth-otp-reset.png) | Pass | layout.spec.ts |
| TC-SCR-02-WEB-029 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Pass | a11y-responsive.spec.ts |
| TC-SCR-02-WEB-030 | Security basics · direct route without a session goes to sign-in | Pass | forgot-otp.spec.ts |
| TC-SCR-02-RSP-001 | Responsive · iPhone 14 (390x844) | Pass | a11y-responsive.spec.ts |
| TC-SCR-02-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Pass | a11y-responsive.spec.ts |
| TC-SCR-02-RSP-003 | Responsive · Desktop 1440 (1440x900) | Pass | a11y-responsive.spec.ts |
| TC-SCR-03-WEB-001 | ST-SCR-03-01 Opens clean | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-002 | ST-SCR-03-02 Required fields | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-003 | ST-SCR-03-03 Bad email | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-004 | ST-SCR-03-04 Successful send | Pass | feedback.spec.ts, real-backend.spec.ts |
| TC-SCR-03-WEB-005 | ST-SCR-03-05 Escape discards | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-006 | ST-SCR-03-06 Message cap | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-007 | ×: goes to SCR-00 | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-008 | Name: outcome | Pass | layout.spec.ts |
| TC-SCR-03-WEB-009 | Email: outcome | Pass | layout.spec.ts |
| TC-SCR-03-WEB-010 | Subject: outcome | Pass | layout.spec.ts |
| TC-SCR-03-WEB-011 | Message: outcome | Pass | layout.spec.ts |
| TC-SCR-03-WEB-012 | Cancel: goes to SCR-00 | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-013 | Send feedback: outcome | Pass | feedback.spec.ts, real-backend.spec.ts |
| TC-SCR-03-WEB-014 | Escape key: goes to SCR-00 | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-015 | Backdrop: goes to SCR-00 | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-016 | "Send feedback" disabled when: never (validates on press; unlike Save buttons elsewhere it | Pass | layout.spec.ts |
| TC-SCR-03-WEB-017 | Name: required | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-018 | Name: boundaries of "Length 2-100 characters, any letters including accents and a" | Pass | feedback.spec.ts, schemas.test.ts |
| TC-SCR-03-WEB-019 | Email: required | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-020 | Email: format "Shape `^\S+@\S+\.\S+$`" | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-021 | Email: boundaries of "Length 5-254" | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-022 | Subject: option set | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-023 | Message: required | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-024 | Message: boundaries of "Max 1000 characters" | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-025 | Message: boundaries of "Minimum 10 characters" | Pass | feedback.spec.ts, schemas.test.ts |
| TC-SCR-03-WEB-026 | All text: boundaries of "`<` `>` stripped as typed" | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-027 | State · Form | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-028 | State · Validation error | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-029 | State · Sent | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-030 | State · Loading / failure | Pass | feedback.spec.ts |
| TC-SCR-03-WEB-031 | UI · layout matches the story screenshot (modal-feedback.png) | Pass | layout.spec.ts |
| TC-SCR-03-WEB-032 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Pass | a11y-responsive.spec.ts, feedback.spec.ts |
| TC-SCR-03-WEB-033 | Security basics · direct route without a session goes to sign-in | Pass | feedback.spec.ts |
| TC-SCR-03-RSP-001 | Responsive · iPhone 14 (390x844) | Pass | a11y-responsive.spec.ts |
| TC-SCR-03-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Pass | a11y-responsive.spec.ts |
| TC-SCR-03-RSP-003 | Responsive · Desktop 1440 (1440x900) | Pass | a11y-responsive.spec.ts |
| TC-SCR-04-WEB-001 | ST-SCR-04-01 Menu contents | Pass | real-backend.spec.ts, shell.spec.ts |
| TC-SCR-04-WEB-002 | ST-SCR-04-02 Outside click closes | Pass | shell.spec.ts |
| TC-SCR-04-WEB-003 | ST-SCR-04-03 Logout asks first | Pass | shell.spec.ts |
| TC-SCR-04-WEB-004 | ST-SCR-04-04 Cancel | Pass | shell.spec.ts |
| TC-SCR-04-WEB-005 | ST-SCR-04-05 Sign out | Pass | real-backend.spec.ts, shell.spec.ts |
| TC-SCR-04-WEB-006 | ST-SCR-04-06 Escape | Pass | shell.spec.ts |
| TC-SCR-04-WEB-007 | AA Admin Admin ▾ (`aria-haspopup`, `aria-expanded`): outcome | Pass | shell.spec.ts |
| TC-SCR-04-WEB-008 | Profile: goes to SCR-22 | Pass | shell.spec.ts |
| TC-SCR-04-WEB-009 | Logout: outcome | Pass | shell.spec.ts |
| TC-SCR-04-WEB-010 | Cancel: outcome | Pass | shell.spec.ts |
| TC-SCR-04-WEB-011 | Sign out: goes to SCR-00 | Pass | real-backend.spec.ts, shell.spec.ts |
| TC-SCR-04-WEB-012 | Click outside / Escape: outcome | Pass | shell.spec.ts |
| TC-SCR-04-WEB-013 | Escape / backdrop mouse-down (dialog): outcome | Pass | shell.spec.ts |
| TC-SCR-04-WEB-014 | (none): rule "No input fields on the menu or dialog" | Pass | shell.spec.ts |
| TC-SCR-04-WEB-015 | Session (not a field): boundaries of "Idle timeout of 30 minutes ends the session and retu | Pass | real-backend.spec.ts, shell.spec.ts, client.test.ts |
| TC-SCR-04-WEB-016 | State · Menu closed | Pass | shell.spec.ts |
| TC-SCR-04-WEB-017 | State · Menu open | Pass | shell.spec.ts |
| TC-SCR-04-WEB-018 | State · Confirm | Pass | shell.spec.ts |
| TC-SCR-04-WEB-019 | State · Signed out | Pass | shell.spec.ts |
| TC-SCR-04-WEB-020 | UI · layout matches the story screenshot (menu-account.png) | Pass | layout.spec.ts |
| TC-SCR-04-WEB-021 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Pass | a11y-responsive.spec.ts, shell.spec.ts |
| TC-SCR-04-WEB-022 | Security basics · direct route without a session goes to sign-in | Pass | shell.spec.ts |
| TC-SCR-04-RSP-001 | Responsive · iPhone 14 (390x844) | Pass | shell.spec.ts |
| TC-SCR-04-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Pass | shell.spec.ts |
| TC-SCR-04-RSP-003 | Responsive · Desktop 1440 (1440x900) | Pass | shell.spec.ts |

Additional generated cases (not in the provided list, all passing): TC-SCR-04-NAV-01..07 (sidebar order, groups, auto-expand, one aria-current, placeholder routes, profile card, skip link), TC-SCR-04-ROLE-01/02 (role-aware nav and forbidden state), TC-SCR-04-RSP-001..003 drawer behaviours and TC-SCR-04-RSP-004/005 (permanent sidebar at 1440 / 1024, drawer at 1023), plus Vitest suites (can matrix, schemas, Modal, Sidebar, API client refresh, idle, Toast, LoginPage).

## Permission tests

| Role | Target | Expected | Result |
| ---- | ------ | -------- | ------ |
| Administrator | nav groups Category Management / User Management / Settings and all 9 shell routes | visible / reachable (placeholders) | Pass |
| Violation manager | nav | only Dashboard, Manage Violation Uploads, Manage Contact Us | Pass |
| Violation manager | /categories /owners /config /portal-users /app-users (client-side navigation) | forbidden state | Pass |
| Violation manager | /dashboard /violations /contact /profile | reachable | Pass |
| Anonymous | every protected route | redirect to /login, nothing rendered | Pass |
| Anonymous | /login /forgot /verify, Feedback modal | public | Pass |
| can() matrix | roles.md permissions x 2 roles | mirrors roles.md | Pass (Vitest) |

## Failures

None open.

## Deviations from the provided test cases

| TC | Provided expectation | Built / tested | Why |
| --- | --- | --- | --- |
| TC-SCR-00-WEB-005 | empty LOGIN proceeds to OTP (as-built prototype defect) | empty LOGIN shows required messages and stays | PROPOSED rule ST-SCR-00-06 / TC-SCR-00-WEB-006 and the backend agree; decision logged |
| TC-SCR-00-WEB-024 / TC-SCR-02-WEB-029 | Enter does not submit | Enter submits | OQ-A-08 decision (accessibility, expected behaviour) |
| TC-SCR-02-WEB-005 / WEB-013 / WEB-019 | countdown 500 s | countdown starts at the server value (60 s) | OQ-A-14 decision; backend resend interval is 60 s |
| TC-SCR-01-WEB-015 | State Sent | not built | the prototype block is unreachable dead markup (OQ-A-09); the test asserts the flow goes straight to OTP |
| TC-SCR-03-WEB-001 | Subject keeps last choice (as built) | Subject resets to General feedback | OQ-A-28 intended behaviour |
| TC-SCR-00-WEB-023, 01-017, 02-028, 03-031, 04-020 | layout matches the screenshot | structural checks (region order, sizes, brand colours, 260 px sidebar, 208 px menu) | no pixel baselines stored |
| RSP cases | iPhone 14 / iPad / desktop | Chromium viewports 390x844, 810x1080, 1440x900 | no touch / UA device emulation |
| TC-SCR-00-WEB-010 etc. | button `aria-label="Sign in"` | `aria-label="Login (sign in)"` | WCAG 2.5.3 label-in-name (visible text is LOGIN); accessible name still contains "sign in" |

## Not covered / limits

- Cross-browser: the TCs ask for Chrome, Edge, Firefox and Safari; only Chromium was run (the only browser installed).
- Pixel-level comparison with the story screenshots (structural checks only).
- Real code expiry (10 min), the 5-wrong-attempt lock and the 5-failure account lockout through the UI (backend-tested; the UI is tested with stubbed server responses).
- Real touch devices; real screen-reader output (live region content is asserted, not a real assistive technology).
- Slow-3G throttling for the loading states (a delayed route is used instead).
- A page reload ends the session by design (tokens in memory only); logged as a decision.
- The set-new-password page for the reset link does not exist in the prototype (OQ-A-15) and was not built.
- Performance / Core Web Vitals not measured (the build emits a >500 kB chunk warning; code splitting is a follow-up).

## Open issues carried from the development loop

None blocking. Follow-ups: code-split routes; hosting CSP header; Pending count source once the violations API exists.

## Coverage

| Metric | Required | Actual | Status |
| ------ | -------- | ------ | ------ |
| Provided TCs referenced by passing tests | 144 | 144 | Pass (see deviations) |
| axe serious/critical on SCR-00, 01 (+error), 02 (+error), 03 (+error), shell, open menu, logout dialog, expanded sidebar | 0 | 0 | Pass |

## Requirements coverage

Tested: AUTH-F-01..09 (all dev stories). Untested by omission: none; see "Not covered".

## Manual checklist (run these by hand)

1. **TC-SCR-00-WEB-023** as anonymous in Firefox / Edge / Safari at 1440x900 - open /login - compare with auth-login.png.
2. **TC-SCR-04-WEB-015** as administrator@test.local - stay idle 30 minutes - expect the login screen with the session notice.
3. **TC-SCR-00-WEB-021** - five wrong passwords for one throwaway account - expect the server lockout message.

## Drift (integration runs only)

n/a (frontend run). The contract file had two YAML syntax errors (unquoted flow-mapping descriptions at lines 126 and 269) that stopped `npm run api:generate`; they were quoted without changing meaning (decision logged).
