# API contract changelog

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
