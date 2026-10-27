# Dev stories - catalogue (frontend)

Tech-lead breakdown; branch `feature/catalogue` (frontend repo). Plan: `frontend/docs/plans/catalogue.md`.

| Story | Scope | Acceptance (TC) | Status |
|---|---|---|---|
| DS-CATF-01 | Shared components: ConfirmDialog, DataTable parts, FormField, styles, useDebouncedValue (reuse PagerBar) | TC-SCR-10-WEB-005, WEB-017..020 | done |
| DS-CATF-02 | Owners list: search, paging, add/edit modal, delete confirm, 409 owner_in_use / name_taken | TC-SCR-11-WEB-001..007, 009..011, 014..016, 019..023, 025..027 | done |
| DS-CATF-03 | Categories list: owner select, "Other" protection, 409 messages, paging | TC-SCR-10-WEB-001..008, 012..014, 017..020, 023..029, 030..033, 035 | done |
| DS-CATF-04 | Config: Badge Name load/save, visible validation, public config refresh | TC-SCR-12-WEB-001..012 | done |
| DS-CATF-05 | Role gating, forbidden state, no nav for Violation manager, unauthenticated redirect | TC-SCR-10-WEB-034/038, TC-SCR-11-WEB-028/031, TC-SCR-12-WEB-012/015 | done |
| DS-CATF-06 | a11y (axe, focus return, modal trap) and responsive 390-2560 | TC-SCR-10/11/12 WEB-037/030/014, RSP-001..005 | done |
| DS-CATF-07 | Tests: Vitest component tests, Playwright (stubbed + 1 real-backend spec) | all | done |

Not built (by decision): CSV / Excel / Print (TC-SCR-10-WEB-009..011, TC-SCR-11-WEB-008); UI layout pixel comparison (TC-*-WEB-036/029/013).
