# Requirements - contact module (backend scope)

Sources: `stories/contact/input/SCR-13-contact-us.md`, `testcases/contact/input/TC-SCR-13-contact-us.md`, `stories/project/{roadmap,roles}.md`, `index/03-open-questions.md`. Priority: test cases > screen stories > prototype. PROPOSED rules are built and logged as decisions in `open-questions.csv`. Feedback submission storage already exists (auth module, `feedback_submissions`); Contact is a separate entity.

## Functional requirements

| Id | Requirement | Screen | Decision / source |
|---|---|---|---|
| CON-01 | `ContactMessage` entity (name, email, message, createdAt, response, repliedAt, repliedBy) fed by the citizen app; seeded with 24 messages in dev/test (the 10 of the prototype plus 14 older) | SCR-13 | OQ-13-01 (scope = list + reply only) |
| CON-02 | `GET /v1/contact-messages`: newest first, server paging (page, pageSize 10/25/50, default 10), `meta` with total and totalPages; every one of the 24 messages reachable | SCR-13 | OQ-13-04; TC-SCR-13-WEB-013/016 |
| CON-03 | Search `search` (max 100) matches name, email, message, response, case-insensitive, over all messages (not only the loaded page) | SCR-13 | OQ-13-09; TC-SCR-13-WEB-006/008/023 |
| CON-04 | `GET /v1/contact-messages/:id` returns the fields of the reply modal (From, Message, Received, existing response) | SCR-13 | TC-SCR-13-WEB-002/005 |
| CON-05 | `PUT /v1/contact-messages/:id/reply`: response required, trimmed, `<` `>` stripped, 1-1000; stores response, server time and the replying portal user; a later reply replaces the earlier one (single editable reply, no history); success message `Reply sent to {name}.` | SCR-13 | OQ-13-05; TC-SCR-13-WEB-003/004/005/021/022 |
| CON-06 | Nothing is sent to the citizen (no e-mail/push); the reply is stored only | SCR-13 | OQ-13-05 |
| CON-07 | Permissions `contact:read` (list, detail) and `contact:reply` (reply): Administrator and Violation manager; everyone else 403, no token 401 | SCR-13 | OQ-13-03; roles.md; TC-SCR-13-WEB-029/032 |
| CON-08 | Sender e-mail is returned in full (not masked) | SCR-13 | OQ-13-07 |
| CON-09 | Unknown, soft-deleted or malformed id gives 404 `Message not found.` | SCR-13 | server-side rule in story |
| CON-10 | Empty list is a valid 200 with `items: []`, `total: 0` | SCR-13 | OQ-13-02; TC-SCR-13-WEB-027 |
| CON-11 | `POST /v1/public/contact-messages` intake stub for the citizen app: name 2-100, email 5-254, message 10-1000, rate limited 10 per 15 min per IP | (citizen app) | PROPOSED, same limits as feedback |
| CON-12 | Export (CSV/Excel/Print) is not built | SCR-13 | OQ-13-04: no export |

Out of scope (frontend): layout, accessibility, responsive, focus handling, toast, modal.
