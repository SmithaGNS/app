# Dev stories - catalogue (backend)

Tech-lead breakdown; all done on branch `feature/catalogue`, reviewed in the dev loop (senior-developer -> tester -> security-auditor).

| Story | Scope | Acceptance (TC) | Status |
|---|---|---|---|
| DS-CAT-01 | Prisma models Owner, Category; migration + down.sql; seeder (Police + 10 categories) | TC-SCR-10-WEB-001, TC-SCR-11-WEB-001, TC-SCR-12-WEB-001 | done |
| DS-CAT-02 | Categories: list/search/page, get, create, update, delete with unique-name, owner-exists, protected "Other", in-use hook | TC-SCR-10-WEB-001..006, 014, 023..029 | done |
| DS-CAT-03 | Owners: list/search/page, get, create, update, delete blocked while referenced | TC-SCR-11-WEB-001..006, 011, 019..023 | done |
| DS-CAT-04 | Config: admin GET/PUT Badge Name, public read via existing endpoint | TC-SCR-12-WEB-001..008 | done |
| DS-CAT-05 | Permissions: Administrator-only via `can()` on all routes | TC-SCR-10-WEB-034/038, TC-SCR-12-WEB-015 | done |
| DS-CAT-06 | Tests (unit + e2e, own test DB via `TEST_DB_NAME`), contract, docs | all | done |
