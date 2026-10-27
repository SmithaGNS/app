# Requirements - auth module (backend scope)

Sources: `stories/auth/input/SCR-00..04`, `testcases/auth/input/TC-SCR-0*`, `stories/project/{roadmap,roles}.md`, `index/03-open-questions.md`. Priority: test cases > screen stories > prototype. PROPOSED rules are built and logged as decisions in `open-questions.csv`.

## Functional requirements

| Id | Requirement | Screen | Decision / source |
|---|---|---|---|
| AUTH-01 | Two-step sign-in: username + password (step 1) returns an OTP challenge; a 6-digit code (step 2) returns access + refresh tokens | SCR-00, SCR-02 | OQ-A-01, OQ-A-12 |
| AUTH-02 | Username is the account e-mail (case-insensitive), 3-254 chars, `<>` stripped; password 1-128, not trimmed | SCR-00 | OQ-A-05; TC-SCR-00-WEB-013/015 |
| AUTH-03 | Wrong credentials, unknown, inactive or deleted account all give the same error "Incorrect username or password." | SCR-00 | OQ-A-01; TC-SCR-00-WEB-017 |
| AUTH-04 | Throttle: 5 failed password attempts per account per 15 min lock sign-in (429); per-IP limits on login, forgot, OTP, reset, feedback | SCR-00 | OQ-A-03, OQ-A-19 |
| AUTH-05 | OTP: 6 digits, valid 10 min, max 5 wrong entries per code, resend after 60 s (new code, attempts reset) | SCR-02 | OQ-A-13, OQ-A-14 (500 s treated as typo) |
| AUTH-06 | OTP delivery goes through a `MailProvider`; default is a mock that logs to console. Dev/test only: `OTP_DEV_CODE` fixes the code and `GET /v1/dev/mailbox` exposes mock messages (both refused when NODE_ENV=production) | SCR-02 | OQ-A-16 (code sent to registered e-mail) |
| AUTH-07 | Forgot password: always the same response whether or not the e-mail exists; code verified -> single-use reset link (30 min) delivered via MailProvider | SCR-01, SCR-02 | OQ-A-11, OQ-A-09 |
| AUTH-08 | `POST /v1/auth/reset-password` sets a new password (12-128, upper+lower+digit+symbol), revokes all sessions | (none in prototype) | OQ-A-15 |
| AUTH-09 | Access JWT 15 min + opaque rotating refresh token 7 days; session revoked on logout; 30 min idle timeout | SCR-04 | OQ-A-25 |
| AUTH-10 | `GET /v1/auth/me` returns the signed-in identity (name, e-mail, role, level, last login, must-change-password) | SCR-04 | OQ-A-23 |
| AUTH-11 | Single `can(role, permission)` check with the roles.md matrix as configuration; global guards: rate limit -> JWT -> permission | all | OQ-A-27, ROLES cluster |
| AUTH-12 | `GET /v1/public/config` returns the Badge Name (server-side, no sign-in) | SCR-00..02 | OQ-12-03 |
| AUTH-13 | `POST /v1/public/feedback` stores name, e-mail, subject (4 values, default General feedback), message 10-1000; rate limited; own table (not Contact) | SCR-03 | OQ-A-20, DM-12, OQ-A-28 |
| AUTH-14 | `GET /health` stays unauthenticated | - | rules/security.md |

## Non-functional

Passwords bcrypt (cost 12); OTP codes, refresh tokens and reset tokens stored as keyed HMAC-SHA256; no secrets in logs/responses (outside the dev mock); envelope `{message,data,errors}` on every response; validation errors carry `errors.fields.{field}[]`; machine codes in `errors.code`.

## Out of scope (this step)

Real e-mail/SMS provider, reCAPTCHA verification (stubbed by the frontend; OQ-A-06 logged), set-new-password page UI, portal-user CRUD / change-password while signed in (users module), Contact list (contact module).
