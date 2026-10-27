# Requirements - catalogue module (backend scope)

Sources: `stories/catalogue/input/SCR-10..12`, `testcases/catalogue/input/TC-SCR-1*`, `stories/project/{roadmap,roles}.md`, `index/02-data-model.md`, `index/03-open-questions.md`. Priority: test cases > screen stories > prototype. PROPOSED rules are built and logged as decisions in `open-questions.csv` (module `catalogue`).

## Functional requirements

| Id | Requirement | Screen | Decision / source |
|---|---|---|---|
| CAT-01 | List categories in insertion order with search (name, description, owner name; case-insensitive, max 100 chars, `% _` literal) and paging (page, pageSize 1-100, default 10) | SCR-10 | ST-SCR-10-01/06, OQ-10-04, OQ-10-10 |
| CAT-02 | Create category: name (required, trimmed, `<>` stripped, max 60), description (required, max 150), optional owner | SCR-10 | ST-SCR-10-02/03, TC-SCR-10-WEB-023/026 |
| CAT-03 | Edit category (PUT replaces; absent owner clears it) | SCR-10 | ST-SCR-10-04 |
| CAT-04 | Category name unique case-insensitively (409 `category_name_taken`) | SCR-10 | PROPOSED, OQ-10-07 |
| CAT-05 | Category owner stored as FK `owner_id` (not a name string); unknown owner is a 400 on `ownerId` | SCR-10, DM | PROPOSED, OQ-11-06 |
| CAT-06 | Category "Other" is protected: cannot be deleted or renamed (409 `category_protected`) | SCR-10 | PROPOSED, OQ-10-07 |
| CAT-07 | Delete category blocked while violations reference it (409 `category_in_use`, message names the count); the violations module supplies the counter | SCR-10 | PROPOSED, OQ-10-06 |
| CAT-08 | Owners: list/search/page, create, edit, delete; name required max 60, description required max 150, unique case-insensitive (409 `owner_name_taken`) | SCR-11 | ST-SCR-11-01..05, OQ-11-06 |
| CAT-09 | Owner delete blocked while categories reference it (409 `owner_in_use`); owner rename propagates (FK) | SCR-11 | PROPOSED, OQ-11-06 |
| CAT-10 | Badge Name stored server-side (settings row), required, trimmed, max 100; admin `GET/PUT /v1/config`; public read via existing `GET /v1/public/config` | SCR-12 | OQ-12-03, OQ-12-05 |
| CAT-11 | Success messages as in the prototype toasts, returned in the envelope `message` | all | ST-SCR-10-02, ST-SCR-12-02 |
| CAT-12 | Single `can(role, permission)` check: `categories:manage`, `owners:manage`, `config:manage` = Administrator only (403 for Violation manager) | all | roles.md, OQ-10-03, OQ-11-03, OQ-12-04 |
| CAT-13 | Seed: owner Police ("Polices") and the 10 prototype categories (row 1 owned by Police), idempotent | all | ST-SCR-10-01, ST-SCR-11-01, ST-SCR-12-01 |

## Non-functional

Envelope `{message,data,errors}` with `errors.fields.{field}[]` and `errors.code`; parameterised Prisma only; explicit `select`; unknown body fields rejected; every route behind JWT + permission guards.

## Out of scope

CSV/Excel/Print export (OQ-10-04, dead in prototype), reorder / display order (OQ-10-09), violations table (violations module; the counter hook is in place), read-only category/owner lookups for Violation managers (violations module will decide), soft delete of reference data.
