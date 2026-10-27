# Build order

Derived from the seams in `index/00-project-index.md` and the relationships in `index/02-data-model.md`, not from module numbering. **Every phase below is a plan against guesses**: 48 open questions are blocking (`index/03-open-questions.md`) and no specification exists beyond the prototype. Each answer marked PROPOSED is an assumption, not a decision. Price accordingly.

## Phase 1 - Shell and navigation (SCR-04, section "Shell navigation")

Sidebar groups with auto-expand, Pending badge, active-item rule, off-canvas drawer below 1024 px, account menu, toast and live region, modal open and close.
- **Unblocks:** every post-login screen, which all mount inside it.
- **Not safe to start:** anything that depends on the Pending badge number (owned by Phase 4, OQ-V-05).
- **Ratify first:** OQ-A-21 (focus contract) so the shared modal component is built once.

## Phase 2 - Identity, roles and scope (SCR-00, 01, 02, 22; Portal user, OTP challenge, Session)

Sign-in, one-time code, forgot-password, session, change password, and the single permission check every later screen sits behind.
- **Unblocks:** all role-dependent behaviour; replaces the hard-coded "Admin Admin" (OQ-A-23, IDENTITY).
- **Cannot begin until answered:** the ROLES cluster (OQ-A-27 and 8 others: who may do what) and OQ-A-15 (the set-new-password page does not exist, so reset cannot complete). Also OQ-A-05 (username versus email), OQ-A-12 and OQ-A-13 (code rules), OQ-A-03 (lockout). Without ROLES, build the single permission check with an empty matrix and do not hard-code either role's rights (the index's own meanwhile answer).
- **Not safe to start:** SCR-20 password handling (the prototype discards passwords, DM-10).

## Phase 3 - Entities that others point at (SCR-11 Owner, then SCR-10 Category)

Owner first, because Category references it; keys, not name strings.
- **Unblocks:** the Owner filter and derived Category Owner column on SCR-06; the Category select on reports.
- **Cannot begin until answered:** the REFINT cluster (OQ-10-06, OQ-10-07, OQ-11-06, OQ-11-07, OQ-V-18): rename and delete behaviour, uniqueness, protection of "Other". The model PROPOSES ids and block-delete-while-referenced; confirm before any schema is cut.
- **Not safe to start:** delete flows on either screen.

## Phase 4 - The report pipeline (SCR-06 list, SCR-07 review; Violation report, status event, reviewer note, evidence)

Reports are created outside the portal (mobile app), so this phase needs the intake contract.
- **Unblocks:** SCR-05 counts, SCR-21 points.
- **Cannot begin until answered:** DM-04 and PHONE (is the reporter a foreign key to an App user), OQ-V-22 (allowed status transitions), OQ-V-23 (audit trail), LEVEL (OQ-V-16), OQ-V-24 (evidence storage), OQ-V-19 (who may reveal a phone). EXPORT-PII (OQ-V-12): CSV, Excel and Print stay unbuilt until answered.
- **Not safe to start:** the Verified side effect (points) until POINTS is answered.

## Phase 5 - People the portal manages (SCR-20 Portal users, SCR-21 App users)

Needs Phase 2 (credentials, roles) and, for App users, the Phase 4 reporter link.
- **Cannot begin until answered:** OQ-20-02 (what Role and Level grant), OQ-20-05 and OQ-21-09 (phone format and uniqueness), OQ-21-10 (points edit rules), DM-02 (soft versus hard delete).

## Phase 6 - Messages and settings (SCR-13 Contact, SCR-12 Config, SCR-03 Feedback)

- **Cannot begin until answered:** FEEDBACK-CONTACT (OQ-A-20, OQ-13-05, DM-12: one entity or two; how a reply reaches the citizen), OQ-12-03 (Badge Name must be server-side and readable before sign-in; the prototype keeps it in localStorage).

## Phase 7 - Reporting (SCR-05 Dashboard)

Built last because it reads from everything. Every tile is computed server-side from the same query as the list it links to (OQ-V-05, OQ-V-07, DM-08); the four hard-coded tiles (Categories 10, Portal users 8, Messages 24, App users 3,123) must not be reproduced as constants. Tiles currently open the list without a status filter (OQ-V-04).
- **Not safe to start** before Phases 3, 4, 5 and 6 expose counts.

## Cross-phase rule

A screen is not started while a blocking question on it is unanswered and its meanwhile answer is not accepted in writing. Where a PROPOSED answer is accepted, record who accepted it in `index/03-open-questions.md`.
