# API contract changelog

## 2026-10-27 - auth module (0.1.0) - initial contract

`api-contract/` was re-created (folder had been deleted). New, non-breaking (nothing existed before):

- `POST /v1/auth/login`, `/v1/auth/otp/verify`, `/v1/auth/otp/resend`, `/v1/auth/forgot`, `/v1/auth/reset-password`, `/v1/auth/refresh`, `/v1/auth/logout`, `GET /v1/auth/me`
- `GET /v1/public/config`, `POST /v1/public/feedback`
- `GET /v1/dev/mailbox` (dev/test only)
- `GET /health` unauthenticated, outside `/v1`

Frontend notes: keep tokens in memory; send `Authorization: Bearer`; on 401 `session_expired` clear state and go to login; validation errors expose `errors.fields.{field}[]`; the sign-in code step needs the `challengeId` returned by login/forgot.
