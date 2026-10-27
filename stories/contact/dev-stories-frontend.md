# Dev stories - contact (frontend)

Role: Tech Lead. Plan: `frontend/docs/plans/contact.md`. Backend contract: `api-contract/openapi.yaml` (contact-messages). Every story lists the test cases (`TC-SCR-13-*`) that verify it.

| Story | Description | Acceptance | TC ids |
|---|---|---|---|
| FE-CON-01 | Route `/contact` guarded by `contact:read`; page head "User ContactUs Management", card "List of User ContactUs" | Anonymous goes to sign-in with no data; both roles see the list | WEB-030, WEB-029 (deviation), WEB-032 |
| FE-CON-02 | Table with S No, Name, Email, Message, Created At, Response, Replied At, Option; newest first; positional S No across pages | 10 rows, first row `testing / test@gmail.com / scripthsjdjend / 2026-08-21 12:01:28`; blank response columns | WEB-001, WEB-025 |
| FE-CON-03 | Search (max 100, `<` `>` stripped, debounced, server-side, resets page) | `yicitc` yields 1 row even though it is not on page 1; 101st char refused; no match shows empty state | WEB-006, WEB-008, WEB-023 |
| FE-CON-04 | Pager: info line, page-size select 10/25/50 (default 10), Previous/pages/Next | All 24 reachable over 3 pages; Previous disabled on page 1; 25/50 show all | WEB-013..016, WEB-020, WEB-024 |
| FE-CON-05 | Reply modal: read-only From / Message / Received, Your response, Cancel, Send reply | Opens empty for unanswered; empty or blank blocked with "Response is required." and focus in the box; no request sent | WEB-002, WEB-003, WEB-010, WEB-019 |
| FE-CON-06 | Send: trim, 1..1000, strip `<` `>`, PUT reply, toast = server message, row updated in place, modal closes, focus returns to row action | 1000 accepted, 1001 refused; toast "Reply sent to testing." | WEB-004, WEB-012, WEB-021, WEB-022, WEB-026 |
| FE-CON-07 | Edit reply for answered rows (prefilled; replaces text and time; shows last replier) | Box holds earlier response; resend replaces | WEB-005 |
| FE-CON-08 | Cancel / x / Esc / backdrop discard the draft | Nothing sent; focus on the opener | WEB-007, WEB-011, WEB-017 |
| FE-CON-09 | States: loading, error with retry, empty (with and without search), 404 on reply, 400 field error | Each state visible and axe clean | WEB-027, WEB-028, WEB-012 |
| FE-CON-10 | No CSV / Excel / Print controls | Not present | WEB-009 |
| FE-CON-11 | A11y and responsive: labelled dialog, focus trap, unique row labels, table scrolls inside `.table-wrap` 390-2560 px | axe 0 serious/critical; no page-level horizontal scroll | WEB-031, RSP-001..004 |

Expected deviation: TC-SCR-13-WEB-029 expects the Violation manager to be denied; roles.md and the backend allow both roles (decision logged).
