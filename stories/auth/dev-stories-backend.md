# Dev stories - auth (backend)

Tech-lead breakdown. Each story lists acceptance criteria with the test-case ids that prove it (tests are named with the same ids).

| Story | Title | Acceptance criteria | TC ids |
|---|---|---|---|
| AUTH-B-01 | Foundation: schema, migration, seed, config | Tables created with rollback; seed creates settings + 2 test accounts (never in production); env validated at start; production refuses OTP_DEV_CODE / dev mailbox / placeholder secrets | env.spec (SEC-env) |
| AUTH-B-02 | Login step 1 | Valid credentials return a challenge, never tokens; username 3-254 case-insensitive, `<>` stripped; password 1-128 not trimmed; generic error for wrong/unknown/inactive/deleted; 5 failures lock the account (429) | TC-SCR-00-WEB-002/005/006/007/013/014/015/016/017/021 |
| AUTH-B-03 | OTP verify + resend | 6 digits only; wrong code "That code is incorrect."; expired "That code has expired. Request a new one."; 5 wrong entries then "Too many attempts. Request a new code."; single use; resend only after 60 s, resets attempts; code stored as HMAC | TC-SCR-02-WEB-001/002/005/009/013/014/016/017/018/019 |
| AUTH-B-04 | Forgot + reset | Same answer for unknown e-mail; e-mail 5-254 shape; code -> single-use 30 min link; `POST /auth/reset-password` enforces 12-128 four-class policy and revokes all sessions | TC-SCR-01-WEB-001/002/003/009/010/011/012; TC-SCR-02-WEB-003 |
| AUTH-B-05 | Session lifecycle | Access JWT 15 min; refresh rotation; logout revokes; 30 min idle timeout; deactivated user loses session at once; `/auth/me` | TC-SCR-04-WEB-001/005/011/015; TC-SCR-00-WEB-025 |
| AUTH-B-06 | Permission module | One `can(role, permission)` with matrix in config; global guards order rate-limit, JWT, permission; every route needs a token unless `@Public()`; `/health` public | PERM-matrix-*, PERM-auth-me |
| AUTH-B-07 | Public config + feedback | Badge name readable without sign-in; feedback validated (name 2-100, e-mail 5-254, subject enum default General feedback, message 10-1000), stored, rate limited 5/15 min | TC-SCR-03-WEB-002/003/004/006/010/013/017-021 |
| AUTH-B-08 | Dev/test OTP access | `OTP_DEV_CODE` fixed code and `GET /v1/dev/mailbox` exist only when enabled and never in production; mock provider logs to console | e2e helpers; SEC-env |
| AUTH-B-09 | Contract + docs | `api-contract/openapi.yaml` matches code; `docs/api/auth.md`; schema docs | n/a |

Definition of done: typecheck, lint, build, unit and e2e green; security review has no High/Critical.
