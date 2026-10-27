# Requirements - violations module (backend)

Sources: `input/SCR-05-dashboard.md`, `input/SCR-06-violations-list.md`, `input/SCR-07-review-modal.md`, test cases in `testcases/violations/input/`, `stories/project/roles.md`. Priority: test cases > stories > prototype. Answers marked PROPOSED are decisions taken in auto-build (see `open-questions.csv`).

| ID | Requirement | Source | Status |
|---|---|---|---|
| VIO-R01 | A paged list of all violation reports, newest first, server-side paging 10/25/50/100 (default 10), total count for "Showing x to y of N" | SCR-06, ST-SCR-06-01, OQ-V-13 | built |
| VIO-R02 | Filters AND-ed on the full set: category owner (derived through the category), created from/to (inclusive, UTC date part, 2020-01-01..today, from not after to), status, search (max 100, `<` `>` stripped) | SCR-06, ST-SCR-06-03..06, OQ-V-14/15/17 | built (status filter PROPOSED, OQ-V-04) |
| VIO-R03 | Phone numbers masked by default in every response (list, detail, dashboard, review result) | SCR-06 ST-02, SCR-05 ST-04, OQ-V-19 | built (detail masked too, PROPOSED) |
| VIO-R04 | Reveal the full number: Administrator only, audited before the number is returned | OQ-V-19, roles.md | built |
| VIO-R05 | One report with all detail fields, review history and evidence metadata | SCR-07 | built |
| VIO-R06 | Save a review: status, level 0-3, reviewer note; reviewer = signed-in user; both roles | SCR-07, ST-SCR-07-02/04 | built |
| VIO-R07 | Forward-only transitions: Pending to Under review/Verified/Rejected; Under review to Verified/Rejected; Verified and Rejected final; same status edits level/note | SCR-07 validation, OQ-V-22 | built (PROPOSED) |
| VIO-R08 | Verified requires level 1..3 ("Set a severity level before verifying."); Rejected requires a note ("Give a reason for rejecting this report."); note max 500 | SCR-07 validation, OQ-V-16/21 | built (PROPOSED) |
| VIO-R09 | Every review is recorded in an append-only history (from/to status and level, note, actor, time) and in the audit log | OQ-V-23 | built |
| VIO-R10 | Two reviewers cannot apply a transition from the same state: the loser gets 409 "This report was updated by someone else." | SCR-07 server-side | built |
| VIO-R11 | No reward points are credited on Verified; no reporter notification | OQ-V-25 | built (deferred) |
| VIO-R12 | Dashboard: tiles (violations per status, categories, portal users, app users, messages total and unanswered), funnel, 5 latest reports, all aggregated server-side from full tables | SCR-05, OQ-V-05/06/07 | built |
| VIO-R13 | Sidebar badge number = Pending count (same service count as the tile) | SCR-05/06 | built |
| VIO-R14 | Read-only lookups (categories with owner, owners, statuses) usable by both roles for the list filters | SCR-06 | built |
| VIO-R15 | A category referenced by a report cannot be deleted (409 `category_in_use`); renaming keeps reports attached (FK) | OQ-V-18, SCR-10 | built |
| VIO-R16 | Evidence is a metadata placeholder (count + list); no upload, storage or viewer | OQ-V-20/24 | built (placeholder) |
| VIO-R17 | Citizen-app intake stub, service-key authenticated, rate limited, creates Pending/level 0 | README flow | built (stub) |
| VIO-R18 | No CSV, Excel or Print export | OQ-V-12 | out of scope |
| VIO-R19 | Dev/test seed of the 23 reports linked to seeded app users and categories | data.js | built |

## Roles

| Capability | Administrator | Violation manager |
|---|---|---|
| List, detail, dashboard, badge, lookups | yes | yes |
| Review (status, level, note) | yes | yes |
| Reveal full phone | yes | no (403) |

## Notes

Not carried over from the prototype: the full unmasked mobile in the review modal (now masked, reveal is explicit), the stale count text, sorting (default newest first, OQ-V-11), per-level report scoping (OQ-V-03).
