# API contract changelog

## 2026-10-27 - violations module (additive) and list-paging unification (BREAKING for users and catalogue lists)

**Breaking (frontend migration):** every list now returns `data: { items, meta: { page, pageSize, total, totalPages } }` and takes `page` and `pageSize`.
- Users lists (`GET /v1/portal-users`, `GET /v1/app-users`): query `perPage` becomes `pageSize`; `meta { total, perPage, currentPage, lastPage }` becomes `meta { page, pageSize, total, totalPages }`.
- Catalogue lists (`GET /v1/categories`, `GET /v1/owners`): `page, pageSize, total, totalPages` move from `data` into `data.meta`.
- Contact list unchanged except an empty list now reports `totalPages: 1` (was 0). `totalPages` is always at least 1.

**New (Bearer, Administrator and ViolationManager unless noted):**
- `GET /v1/violations` (page, pageSize 10/25/50/100, ownerId, createdFrom, createdTo, status, search), `GET /v1/violations/{id}`, `PUT /v1/violations/{id}/review` (body status, level 0-3, note), `POST /v1/violations/{id}/reveal-phone` (Administrator only, audited)
- `GET /v1/dashboard`, `GET /v1/navigation/counts`, `GET /v1/lookups/categories|owners|statuses`
- `POST /v1/public/violations` (intake stub, header `x-service-key`)

Frontend notes: `mobile` is always masked; call reveal-phone for the full number (403 for the manager role, hide the eye icon). Status values are the display strings "Pending", "Under review", "Verified", "Rejected". Review errors: 409 `status_transition_not_allowed` / `violation_modified`, 400 field errors on `level` and `note`. Dates are ISO-8601 UTC; format `YYYY-MM-DD HH:mm:ss` in the UI. Deleting a category used by a report now returns 409 `category_in_use`. No reward points are credited on Verified, so do not promise them in the toast.

## 2026-10-27 - auth module (0.1.0) - initial contract

`api-contract/` was re-created (folder had been deleted). New, non-breaking (nothing existed before):

- `POST /v1/auth/login`, `/v1/auth/otp/verify`, `/v1/auth/otp/resend`, `/v1/auth/forgot`, `/v1/auth/reset-password`, `/v1/auth/refresh`, `/v1/auth/logout`, `GET /v1/auth/me`
- `GET /v1/public/config`, `POST /v1/public/feedback`
- `GET /v1/dev/mailbox` (dev/test only)
- `GET /health` unauthenticated, outside `/v1`

Frontend notes: keep tokens in memory; send `Authorization: Bearer`; on 401 `session_expired` clear state and go to login; validation errors expose `errors.fields.{field}[]`; the sign-in code step needs the `challengeId` returned by login/forgot.

## 2026-10-27 - contact module - additive (non-breaking)

- `GET /v1/contact-messages?page&pageSize(10|25|50)&search`, `GET /v1/contact-messages/{id}`, `PUT /v1/contact-messages/{id}/reply` (roles Administrator and ViolationManager)
- `POST /v1/public/contact-messages` (citizen app intake stub)
- List responses use `data: { items, meta: { page, pageSize, total, totalPages } }`. Reply is single and editable; nothing is sent to the citizen. Dates are ISO-8601 UTC; frontend formats `YYYY-MM-DD HH:mm:ss`.

## 2026-10-27 - catalogue module (non-breaking, additive)

New (Administrator only, Bearer):

- `GET|POST /v1/categories`, `GET|PUT|DELETE /v1/categories/{id}` (SCR-10). List = `data: { items, page, pageSize, total, totalPages }`, query `search` (max 100), `page`, `pageSize` (1-100, default 10). Category carries `ownerId` + `owner {id,name}` (owner is now a reference, not a name string) and `isProtected`.
- `GET|POST /v1/owners`, `GET|PUT|DELETE /v1/owners/{id}` (SCR-11), `categoryCount` per owner.
- `GET|PUT /v1/config` (SCR-12). The public Badge Name read is unchanged: `GET /v1/public/config`.
- New `errors.code` values: `category_name_taken`, `category_protected`, `category_in_use`, `owner_name_taken`, `owner_in_use` (all HTTP 409; `message` is user-presentable).

Frontend notes: success/toast text is returned in `message`; PUT replaces (omit `ownerId` or send `null` for "No owner"); the category "Other" cannot be deleted or renamed; deleting an owner that categories use is refused with 409 (reassign first).

## 2026-10-27 - users module - SCR-20 portal users, SCR-21 app users, SCR-22 profile

Additive (no breaking change). New operations (all `Bearer`):

- `GET|POST /v1/portal-users`, `GET|PUT|DELETE /v1/portal-users/{id}`, `POST /v1/portal-users/{id}/reset-password` (Administrator)
- `GET|POST /v1/app-users`, `GET|PUT|DELETE /v1/app-users/{id}`, `POST /v1/app-users/{id}/reveal-phone` (Administrator; reveal is audited)
- `GET|PUT /v1/profile`, `POST /v1/profile/change-password` (any signed-in role)

Frontend notes:
- Lists return `data: { items, meta: { total, perPage, currentPage, lastPage } }`; query `page`, `perPage` (10/25/50/100, default 10) and `search` (max 100). Search is server-side (app users: also on the unmasked phone). (Catalogue lists use `page`/`pageSize`/`totalPages` - the two modules differ; see open-questions.)
- Phone = digits (7-15) in `phone` + optional `phoneCountryCode` (digits, a leading `+` is accepted); use `phoneDisplay` for "+1 876 ..." text. App-user lists only carry `phoneMasked`; call `reveal-phone` for the number (the Edit dialog may omit `phone` to keep it).
- Duplicate e-mail/phone: HTTP 409 with `errors.fields.email|phone`. Business rules: 409 with `errors.code` = `cannot_delete_self` | `last_administrator` | `email_missing`. Change-password failures are 400 with `errors.fields.currentPassword|newPassword|confirmPassword`; repeated wrong current passwords give 429 `change_password_locked`.
- New error code `password_change_required` (403): a user created/reset by an administrator (`mustChangePassword: true`, also returned by sign-in) can only call `/v1/profile`, `/v1/profile/change-password`, `/v1/auth/me` and `/v1/auth/logout` until the password is changed; the UI must route them to Change password.
- `PortalUser.email` can be `null` for migrated legacy rows (such a user cannot sign in); the admin edit form must require an e-mail.
- No CSV/Excel/Print endpoints exist (out of scope).
