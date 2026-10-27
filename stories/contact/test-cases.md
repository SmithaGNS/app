# Test cases - contact (consolidated)

Source: `testcases/contact/input/TC-SCR-13-contact-us.md` (36 cases, ids kept). UI-only cases (layout, accessibility, responsive, modal, focus, dead controls) belong to the frontend step. Backend tests are named with the TC id (`contact.e2e-spec.ts`, `contact.service.spec.ts`).

| TC id | Title | Layer | Backend coverage |
|---|---|---|---|
| TC-SCR-13-WEB-001 | ST-01 List loads | Backend + Frontend | e2e: first page 10 rows newest first, total 24 |
| TC-SCR-13-WEB-002 | ST-02 Open reply | Backend + Frontend | e2e: detail returns the modal fields |
| TC-SCR-13-WEB-003 | ST-03 Empty reply blocked | Backend + Frontend | e2e: 400 "Response is required." and nothing changes |
| TC-SCR-13-WEB-004 | ST-04 Send | Backend + Frontend | e2e: reply stored with text, time, user; message "Reply sent to testing." |
| TC-SCR-13-WEB-005 | ST-05 Revise | Backend + Frontend | e2e: second reply replaces text, time and author |
| TC-SCR-13-WEB-006 | ST-06 Search | Backend + Frontend | e2e: search yicitc gives one row |
| TC-SCR-13-WEB-007 | ST-07 Cancel | Frontend | frontend (nothing is sent) |
| TC-SCR-13-WEB-008 | Search messages: outcome | Backend + Frontend | e2e: all columns incl. response |
| TC-SCR-13-WEB-009 | CSV / Excel / Print | n/a | no export (decision); frontend hides the buttons |
| TC-SCR-13-WEB-010 | Reply button: outcome | Backend + Frontend | e2e: detail 404 / no mail sent; unit: 404 |
| TC-SCR-13-WEB-011 | Modal x / Cancel | Frontend | frontend |
| TC-SCR-13-WEB-012 | Send reply: outcome | Backend + Frontend | e2e + unit: 404 for unknown/deleted/malformed id |
| TC-SCR-13-WEB-013 | Show entries select | Backend + Frontend | e2e + unit: pageSize 10/25/50 honoured, others 400 |
| TC-SCR-13-WEB-014/015/020 | Previous / 1 / Previous disabled | Frontend | frontend (server returns page and totalPages) |
| TC-SCR-13-WEB-016 | Pager 2, 3, Next | Backend + Frontend | e2e: all 24 reachable over 3 pages |
| TC-SCR-13-WEB-017/018/019 | Esc, disabled states | Frontend | frontend |
| TC-SCR-13-WEB-021 | Response boundaries | Backend + Frontend | e2e + unit: 0/1/1000/1001 |
| TC-SCR-13-WEB-022 | `<` `>` stripped | Backend + Frontend | e2e + unit |
| TC-SCR-13-WEB-023 | Search boundaries | Backend + Frontend | e2e + unit: 100/101 |
| TC-SCR-13-WEB-024 | Page-size options | Backend + Frontend | unit: 10/25/50 only |
| TC-SCR-13-WEB-025 | State Populated | Backend + Frontend | e2e WEB-001 |
| TC-SCR-13-WEB-026 | State Replied row | Backend + Frontend | e2e WEB-004 |
| TC-SCR-13-WEB-027 | State Empty | Backend + Frontend | e2e: empty page |
| TC-SCR-13-WEB-028 | Loading / Error | Frontend | frontend |
| TC-SCR-13-WEB-029 | Permission (Violation manager) | Backend + Frontend | e2e PERM-contact: allowed per roles.md (TC expected "denied" conflicts with roles.md; roles.md wins, decision logged) |
| TC-SCR-13-WEB-030/031 | UI layout, accessibility | Frontend | frontend |
| TC-SCR-13-WEB-032 | Direct route without session | Backend + Frontend | e2e PERM-contact: 401 on every route |
| TC-SCR-13-RSP-001..004 | Narrow viewport, responsive | Frontend | frontend |
