# Requirements - users module (backend scope)

Sources: `stories/users/input/SCR-20..22`, `testcases/users/input/TC-SCR-20..22-*`, `stories/project/{roadmap,roles}.md`, `index/03-open-questions.md`. Priority: test cases > screen stories > prototype. PROPOSED rules are built and logged as `decision` rows in `open-questions.csv`.

## Functional requirements

| Id | Requirement | Screen | Decision / source |
|---|---|---|---|
| USR-01 | Portal users CRUD: first name, last name (required, max 60), e-mail (required, max 254, lower-cased, unique case-insensitive), phone (digits 7-15, unique) + optional country code (1-4 digits, `+1 876` display), address (max 200), role (Administrator / Violation manager), level (blank or 1-3, no behaviour), status | SCR-20 | OQ-20-01/02/05; TC-SCR-20-WEB-034..040 |
| USR-02 | Server-side paging and search on both lists: page size 10/25/50/100 (default 10), search max 100 chars, `meta {total, perPage, currentPage, lastPage}`; an empty result is a normal empty page | SCR-20, SCR-21 | OQ-20-04/06, OQ-21-06; TC-SCR-20-WEB-019/032/043 |
| USR-03 | Portal-user password: 12-128 chars with upper, lower, digit and symbol - ONE shared validator used by create/edit, change-password and auth reset; stored bcrypt only; never returned or logged | SCR-20, SCR-22 | OQ-20-08, OQ-22-04/05; TC-SCR-20-WEB-041 |
| USR-04 | A user created by an admin (or whose password an admin sets) has `mustChangePassword = true`; until changed every route except profile GET, change-password, `auth/me` and logout answers 403 `password_change_required`; a blank password on edit keeps the current one | SCR-20, SCR-22 | OQ-22-05 |
| USR-05 | Soft delete of portal users (row kept, sessions and open reset tokens revoked, cannot sign in); blocked for yourself (`cannot_delete_self`) and for the last active Administrator (`last_administrator`; also blocks demoting/deactivating them; race-safe under a row lock) | SCR-20 | OQ-20-08/10 |
| USR-06 | Reset-password action: issues a single-use 30 min reset token through the existing auth flow and mails the link via the MailProvider; the link/token is never in the response; throttled 5 per 15 min per target; a user without a valid e-mail gets 409 `email_missing` | SCR-20 | OQ-20-08 |
| USR-07 | Legacy invalid e-mail (`@mail.com`) is migrated/seeded as NULL; such a user cannot sign in until an e-mail is set; the edit form requires one | SCR-20 | OQ-20-11 |
| USR-08 | App users CRUD: first/last name optional (max 60), e-mail optional (unique), phone required digits 7-15 unique (+ country code), points earned/redeemed whole numbers 0..1,000,000, redeemed <= earned (also a CHECK in the DB); Address column dropped (no source); soft delete | SCR-21 | OQ-21-01/03/04/08/09/10 |
| USR-09 | App-user responses carry the phone only masked (every digit but the last 3 is a bullet, country code readable); search matches the UNMASKED phone server-side | SCR-21 | OQ-21-06; TC-SCR-21-WEB-008 |
| USR-10 | Reveal phone: `POST /app-users/{id}/reveal-phone`, Administrator only (`violations:reveal-phone`), writes an `audit_logs` row BEFORE the number is returned | SCR-21 | roles.md |
| USR-11 | Audit log (`audit_logs`): actor/action/subject/IP/time for portal-user create/update/delete/reset, app-user create/update/delete/reveal, profile update and password change; meta holds field names only | all | OQ-20-08, OQ-21-05 |
| USR-12 | Profile: `GET/PUT /profile` for the signed-in user only (name, phone, address; e-mail/role/level are read-only); the id always comes from the session | SCR-22 | OQ-22-01/02 |
| USR-13 | Change password: current password verified (400 on `currentPassword` when wrong; 5 wrong attempts in 15 min lock it, 429), new differs from current, confirm equals new, policy USR-03; success revokes every OTHER session, clears `mustChangePassword`, keeps the current session | SCR-22 | OQ-22-03/07; TC-SCR-22-WEB-016..026 |
| USR-14 | Access (roles.md): portal-users and app-users routes Administrator only (`portal-users:manage`, `app-users:manage`); profile routes any signed-in role; every route behind the JWT guard | all | OQ-20-02, OQ-21-02 |
| USR-15 | Out of scope: CSV/Excel/Print (no routes), real e-mail/SMS delivery, reward-point crediting, password history/expiry/breach list, app-user self-registration | - | OQ-20-03, OQ-21-05 |
| USR-16 | Seeds (dev/test only, refuse production): the 8 prototype portal users (password `Test@1234`, no forced change) and the 10 prototype app users | - | roadmap |

## Non-functional

bcrypt cost from `BCRYPT_ROUNDS`; envelope `{message,data,errors}`; validation errors `errors.fields.{field}[]`; business errors `errors.code`; DTO whitelist (unknown properties give 400, no mass assignment); `<` `>` stripped from text inputs; every query selects explicit columns and excludes soft-deleted rows; the rate limiter is the in-process one from auth (single instance, logged).
