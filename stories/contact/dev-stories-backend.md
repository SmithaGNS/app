# Dev stories - contact (backend)

Tech-lead breakdown. Tests carry the TC ids.

| Story | Title | Acceptance criteria | TC ids |
|---|---|---|---|
| CON-B-01 | Schema, migration, seed | `contact_messages` table (FK to portal_users, SET NULL), migration `20261027120000_contact_messages` with `down.sql`; seed 24 messages idempotently, never in production | WEB-001 |
| CON-B-02 | Paged list + search | Newest first, pageSize 10/25/50, page >= 1, search max 100 over name/email/message/response, `meta` | WEB-001/006/008/013/016/023/024/027 |
| CON-B-03 | Detail | Returns modal fields, 404 for unknown/deleted/malformed id | WEB-002/012 |
| CON-B-04 | Reply | 1-1000 trimmed, `<>` stripped, stores text + server time + replying user, replaces earlier reply, message `Reply sent to {name}.`, nothing sent | WEB-003/004/005/010/021/022 |
| CON-B-05 | Permissions | `contact:read` / `contact:reply` via `@RequirePermission`; 401 without token | WEB-029/032 |
| CON-B-06 | Citizen intake stub | Public POST, validated, rate limited | (extra) |
| CON-B-07 | Contract + docs | openapi paths + changelog, `docs/api/contact.md`, schema docs | n/a |

Definition of done: typecheck, lint, build, unit and e2e green; no High/Critical in the security review.
