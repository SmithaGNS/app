# Dev stories - users (backend)

Tech-lead breakdown. Tests carry the TC ids listed.

| Story | Title | Acceptance criteria | TC ids |
|---|---|---|---|
| USR-B-01 | Schema + migration | `portal_users` gains first/last name, country code, phone key, nullable e-mail; `app_users` and `audit_logs` created; CHECK on points; backfill; `down.sql` | db-review |
| USR-B-02 | Shared helpers | Phone digits/country-code validators, `formatPhone`/`maskPhone`/`phoneKey`, `ClientIp`; shared password validator reused | TC-SCR-20-WEB-037, TC-SCR-21-WEB-001 |
| USR-B-03 | Portal user list | Paged (10/25/50/100) + search (name, e-mail, phone, address, role, level), empty page ok, no secrets | TC-SCR-20-WEB-001/002/011/019/020/021/022/032/033/043 |
| USR-B-04 | Portal user create/edit | Field rules and messages of SCR-20, unique e-mail/phone (409 with field errors), hashed password, forced change, blank password keeps | TC-SCR-20-WEB-005/006/007/034..041 |
| USR-B-05 | Delete + guards | Soft delete, self and last-Administrator protection (race-safe), sessions revoked | TC-SCR-20-WEB-008/017 |
| USR-B-06 | Reset password action | Reset link via auth flow, no token in response, throttled, NULL e-mail refused, audited | TC-SCR-20-WEB-009/018 |
| USR-B-07 | First-login password change | `PasswordChangeGuard` + `@AllowWhilePasswordChangeRequired` | TC-SCR-22-WEB-001 (guard), unit |
| USR-B-08 | App users | CRUD, masked phone, server-side search on unmasked phone, points rules, soft delete | TC-SCR-21-WEB-001/004..008/010/015/016/024/027..030 |
| USR-B-09 | Reveal phone + audit | Administrator only, audit row first | TC-SCR-21-WEB-002/013 |
| USR-B-10 | Profile | Own details get/update (no e-mail/role/level), id from session | TC-SCR-22-WEB-001 |
| USR-B-11 | Change password | Messages and order of SCR-22, lock-out, other sessions revoked | TC-SCR-22-WEB-004..007/016..026 |
| USR-B-12 | Permissions | Violation manager 403 / anonymous 401 on every route | TC-SCR-20-WEB-047/050, TC-SCR-21-WEB-019/020/039, TC-SCR-22-WEB-030 |
| USR-B-13 | Seeds, contract, docs | `seedUsersModule`, openapi paths, `docs/api/users.md`, schema docs | n/a |

Definition of done: typecheck, lint, build, unit and e2e green; security review has no High/Critical.
