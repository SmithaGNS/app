# Test cases - auth (consolidated)

Source: `testcases/auth/input/TC-SCR-00..04-*.md` (144 cases, ids kept). UI-only cases (layout, accessibility, responsive, focus) belong to the frontend step. The last column names the backend test that proves the server-side half.

Priority: test cases > screen stories > prototype. Where a TC describes a flagged prototype defect (TC-SCR-00-WEB-005 empty submit proceeds), the server follows the PROPOSED rule (TC-SCR-00-WEB-006); decision logged.

| TC id | Title | Layer | Backend coverage |
|---|---|---|---|
| TC-SCR-00-WEB-001 | ST-SCR-00-01 Login page renders | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-002 | ST-SCR-00-02 LOGIN proceeds to code entry | Backend + Frontend | auth.e2e: login valid (OTP challenge) |
| TC-SCR-00-WEB-003 | ST-SCR-00-03 Forgot password link | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-004 | ST-SCR-00-04 Feedback link | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-005 | ST-SCR-00-05 Empty submit (as built, flagged) | Backend + Frontend | auth.e2e: empty username refused (server follows PROPOSED rule, not the as-built defect) |
| TC-SCR-00-WEB-006 | ST-SCR-00-06 Proposed required-field behaviour | Backend + Frontend | auth.e2e: empty username refused (server follows PROPOSED rule, not the as-built defect) |
| TC-SCR-00-WEB-007 | Username: outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-008 | Password: outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-009 | Forgot Password?: goes to SCR-01 | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-010 | LOGIN (`aria-label="Sign in"`): goes to SCR-02 | Backend + Frontend | auth.e2e: login valid (OTP challenge) |
| TC-SCR-00-WEB-011 | Feedback: goes to SCR-03 | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-012 | "LOGIN (`aria-label="Sign in"`)" disabled when: never, even with both fields empty | Backend + Frontend | auth.e2e: server validates, never blocks LOGIN |
| TC-SCR-00-WEB-013 | Username: boundaries of "Required, trimmed, 3-254 chars (email or username accepted: " | Backend + Frontend | auth.e2e: username boundaries 2/3/254/255 |
| TC-SCR-00-WEB-014 | Username: boundaries of "Characters `<` and `>` are stripped as typed" | Backend + Frontend | auth.e2e: angle brackets stripped |
| TC-SCR-00-WEB-015 | Password: boundaries of "Required, 1-128 chars (128 mirrors PASSWORD_MAX in the passw" | Backend + Frontend | auth.e2e: password boundaries 0/1/128/129 |
| TC-SCR-00-WEB-016 | Password: rule "Not trimmed, not stripped; `type=password`" | Backend + Frontend | auth.e2e: password not trimmed |
| TC-SCR-00-WEB-017 | Credentials: rule "Must match an account" | Backend + Frontend | auth.e2e: generic credential error; 5xx never leaks |
| TC-SCR-00-WEB-018 | State · Default | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-019 | State · Error | Backend + Frontend | auth.e2e: generic credential error; 5xx never leaks |
| TC-SCR-00-WEB-020 | State · Loading | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-021 | State · Locked / throttled | Backend + Frontend | auth.e2e: throttle after 5 failures |
| TC-SCR-00-WEB-022 | State · Empty-submit | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-023 | UI · layout matches the story screenshot (auth-login.png) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-024 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-WEB-025 | Security basics · direct route without a session goes to sign-in | Backend + Frontend | auth.e2e: protected route without token is 401 |
| TC-SCR-00-RSP-001 | Responsive · iPhone 14 (390x844) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-00-RSP-003 | Responsive · Desktop 1440 (1440x900) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-WEB-001 | ST-SCR-01-01 Required email | Backend + Frontend | auth.e2e: forgot required |
| TC-SCR-01-WEB-002 | ST-SCR-01-02 Malformed email | Backend + Frontend | auth.e2e: forgot shape and length 5-254 |
| TC-SCR-01-WEB-003 | ST-SCR-01-03 Valid email | Backend + Frontend | auth.e2e: forgot valid and unknown email |
| TC-SCR-01-WEB-004 | ST-SCR-01-04 Error clears while typing | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-WEB-005 | ST-SCR-01-05 Back | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-WEB-006 | Email address: outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-WEB-007 | Send code: goes to SCR-02 | Backend + Frontend | auth.e2e: forgot valid and unknown email |
| TC-SCR-01-WEB-008 | ← Back to sign in: goes to SCR-00 | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-WEB-009 | Email address: required | Backend + Frontend | auth.e2e: forgot required |
| TC-SCR-01-WEB-010 | Email address: format "Shape `^\S+@\S+\.\S+$`" | Backend + Frontend | auth.e2e: forgot shape and length 5-254 |
| TC-SCR-01-WEB-011 | Email address: boundaries of "Length 5-254 characters" | Backend + Frontend | auth.e2e: forgot shape and length 5-254 |
| TC-SCR-01-WEB-012 | Email address: boundaries of "`<` `>` stripped as typed" | Backend + Frontend | auth.e2e: angle brackets stripped |
| TC-SCR-01-WEB-013 | State · Default | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-WEB-014 | State · Error | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-WEB-015 | State · Sent | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-WEB-016 | State · Loading | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-WEB-017 | UI · layout matches the story screenshot (auth-forgot.png) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-WEB-018 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-WEB-019 | Security basics · direct route without a session goes to sign-in | Backend + Frontend | auth.e2e: protected route without token is 401 |
| TC-SCR-01-RSP-001 | Responsive · iPhone 14 (390x844) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-01-RSP-003 | Responsive · Desktop 1440 (1440x900) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-001 | ST-SCR-02-01 Login mode completes sign-in | Backend + Frontend | auth.e2e: verify completes sign-in |
| TC-SCR-02-WEB-002 | ST-SCR-02-02 Incomplete code | Backend + Frontend | auth.e2e: incomplete code |
| TC-SCR-02-WEB-003 | ST-SCR-02-03 Reset mode done state | Backend + Frontend | auth.e2e: reset flow |
| TC-SCR-02-WEB-004 | ST-SCR-02-04 Paste fills the boxes | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-005 | ST-SCR-02-05 Resend lock | Backend + Frontend | auth.e2e: resend lock / interval |
| TC-SCR-02-WEB-006 | ST-SCR-02-06 Back link depends on mode | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-007 | Digit boxes 1-6 (`aria-label` Digit 1..6): outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-008 | Verify: goes to SCR-05 | Backend + Frontend | auth.e2e: verify completes sign-in |
| TC-SCR-02-WEB-009 | Resend code: outcome | Backend + Frontend | auth.e2e: resend issues new code |
| TC-SCR-02-WEB-010 | ← Change email (reset): goes to SCR-01 | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-011 | ← Back to sign in (login): goes to SCR-00 | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-012 | Back to sign in (done panel): goes to SCR-00 | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-013 | "Resend code" disabled when: during the countdown | Backend + Frontend | auth.e2e: resend lock / interval |
| TC-SCR-02-WEB-014 | Code (6 boxes): boundaries of "Exactly 6 characters, each 0-9 (min 6, max 6)" | Backend + Frontend | auth.e2e: incomplete code |
| TC-SCR-02-WEB-015 | Each box: rule "One digit, non-digits removed on input" | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-016 | Code correctness: rule "Must equal the issued code" | Backend + Frontend | auth.e2e: wrong code |
| TC-SCR-02-WEB-017 | Code lifetime: boundaries of "Valid for a limited time, e.g. 10 minutes" | Backend + Frontend | auth.e2e: code expiry |
| TC-SCR-02-WEB-018 | Attempts: boundaries of "Maximum 5 wrong entries per code" | Backend + Frontend | auth.e2e: 5 wrong attempts then locked |
| TC-SCR-02-WEB-019 | Resend interval: boundaries of "Minimum wait before resend: 500 s as built (min 500, max 5 | Backend + Frontend | auth.e2e: resend lock / interval |
| TC-SCR-02-WEB-020 | State · Awaiting code (reset) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-021 | State · Awaiting code (login) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-022 | State · Error | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-023 | State · Done (reset only) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-024 | State · Signed in (login only) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-025 | State · Wrong code | Backend + Frontend | auth.e2e: wrong code |
| TC-SCR-02-WEB-026 | State · Expired code | Backend + Frontend | auth.e2e: code expiry |
| TC-SCR-02-WEB-027 | State · Resend available | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-028 | UI · layout matches the story screenshot (auth-otp-reset.png) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-029 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-WEB-030 | Security basics · direct route without a session goes to sign-in | Backend + Frontend | auth.e2e: protected route without token is 401 |
| TC-SCR-02-RSP-001 | Responsive · iPhone 14 (390x844) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-02-RSP-003 | Responsive · Desktop 1440 (1440x900) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-001 | ST-SCR-03-01 Opens clean | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-002 | ST-SCR-03-02 Required fields | Backend + Frontend | public.e2e: required fields |
| TC-SCR-03-WEB-003 | ST-SCR-03-03 Bad email | Backend + Frontend | public.e2e: email shape and length |
| TC-SCR-03-WEB-004 | ST-SCR-03-04 Successful send | Backend + Frontend | public.e2e: feedback stored |
| TC-SCR-03-WEB-005 | ST-SCR-03-05 Escape discards | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-006 | ST-SCR-03-06 Message cap | Backend + Frontend | public.e2e: message cap 1000 |
| TC-SCR-03-WEB-007 | ×: goes to SCR-00 | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-008 | Name: outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-009 | Email: outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-010 | Subject: outcome | Backend + Frontend | public.e2e: subject enum/default |
| TC-SCR-03-WEB-011 | Message: outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-012 | Cancel: goes to SCR-00 | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-013 | Send feedback: outcome | Backend + Frontend | public.e2e: feedback stored |
| TC-SCR-03-WEB-014 | Escape key: goes to SCR-00 | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-015 | Backdrop: goes to SCR-00 | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-016 | "Send feedback" disabled when: never (validates on press; unlike Save buttons elsewhere it | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-017 | Name: required | Backend + Frontend | public.e2e: required fields |
| TC-SCR-03-WEB-018 | Name: boundaries of "Length 2-100 characters, any letters including accents and a" | Backend + Frontend | public.e2e: name 2-100 |
| TC-SCR-03-WEB-019 | Email: required | Backend + Frontend | public.e2e: required fields |
| TC-SCR-03-WEB-020 | Email: format "Shape `^\S+@\S+\.\S+$`" | Backend + Frontend | public.e2e: email shape and length |
| TC-SCR-03-WEB-021 | Email: boundaries of "Length 5-254" | Backend + Frontend | public.e2e: email shape and length |
| TC-SCR-03-WEB-022 | Subject: option set | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-023 | Message: required | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-024 | Message: boundaries of "Max 1000 characters" | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-025 | Message: boundaries of "Minimum 10 characters" | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-026 | All text: boundaries of "`<` `>` stripped as typed" | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-027 | State · Form | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-028 | State · Validation error | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-029 | State · Sent | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-030 | State · Loading / failure | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-031 | UI · layout matches the story screenshot (modal-feedback.png) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-032 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-WEB-033 | Security basics · direct route without a session goes to sign-in | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-RSP-001 | Responsive · iPhone 14 (390x844) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-03-RSP-003 | Responsive · Desktop 1440 (1440x900) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-001 | ST-SCR-04-01 Menu contents | Backend + Frontend | auth.e2e: GET /me |
| TC-SCR-04-WEB-002 | ST-SCR-04-02 Outside click closes | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-003 | ST-SCR-04-03 Logout asks first | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-004 | ST-SCR-04-04 Cancel | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-005 | ST-SCR-04-05 Sign out | Backend + Frontend | auth.e2e: logout revokes session |
| TC-SCR-04-WEB-006 | ST-SCR-04-06 Escape | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-007 | AA Admin Admin ▾ (`aria-haspopup`, `aria-expanded`): outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-008 | Profile: goes to SCR-22 | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-009 | Logout: outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-010 | Cancel: outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-011 | Sign out: goes to SCR-00 | Backend + Frontend | auth.e2e: logout revokes session |
| TC-SCR-04-WEB-012 | Click outside / Escape: outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-013 | Escape / backdrop mouse-down (dialog): outcome | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-014 | (none): rule "No input fields on the menu or dialog" | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-015 | Session (not a field): boundaries of "Idle timeout of 30 minutes ends the session and retu | Backend + Frontend | auth.e2e: 30 min idle timeout |
| TC-SCR-04-WEB-016 | State · Menu closed | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-017 | State · Menu open | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-018 | State · Confirm | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-019 | State · Signed out | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-020 | UI · layout matches the story screenshot (menu-account.png) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-021 | Accessibility · WCAG 2.2 AA scan, keyboard and story-specific checks | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-WEB-022 | Security basics · direct route without a session goes to sign-in | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-RSP-001 | Responsive · iPhone 14 (390x844) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-RSP-002 | Responsive · iPad (gen 7) (810x1080) | Frontend | frontend / Playwright (frontend step) |
| TC-SCR-04-RSP-003 | Responsive · Desktop 1440 (1440x900) | Frontend | frontend / Playwright (frontend step) |
