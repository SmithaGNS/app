# Test cases - catalogue module (backend)

Authoritative UI cases: `testcases/catalogue/input/TC-SCR-10..12` (Web/Responsive). UI-only cases (layout, a11y, responsive, modal focus, Esc, dead buttons) belong to the frontend step. Backend-verifiable cases keep their IDs and are automated in `test/catalogue.e2e-spec.ts` and `src/modules/catalogue/catalogue.service.spec.ts`.

| TC ID | Backend check | Role | Type |
|---|---|---|---|
| TC-SCR-10-WEB-001 | list: 10 seeded rows in order, row 1 owner Police | Administrator | e2e |
| TC-SCR-10-WEB-002 | create appends last, success message | Administrator | e2e |
| TC-SCR-10-WEB-003 | empty submit: both required messages | Administrator | e2e |
| TC-SCR-10-WEB-004 | edit clears owner, update message | Administrator | e2e + unit |
| TC-SCR-10-WEB-005 | delete removes row, total 9 | Administrator | e2e |
| TC-SCR-10-WEB-006 | search "police" -> row 1 only | Administrator | e2e |
| TC-SCR-10-WEB-014 | delete protections: Other (409), in-use (409), bad id (400), unknown (404) | Administrator | e2e + unit |
| TC-SCR-10-WEB-023/025/026 | name 60/61, blank, `<>` strip; description 150/151 | Administrator | e2e |
| TC-SCR-10-WEB-024 | name unique case-insensitive (create, edit, race P2002) | Administrator | e2e + unit |
| TC-SCR-10-WEB-027 | owner must exist / valid uuid | Administrator | e2e + unit |
| TC-SCR-10-WEB-028 | search max 100, wildcards literal | Administrator | e2e + unit |
| TC-SCR-10-WEB-029 | page size/page bounds | Administrator | e2e |
| TC-SCR-10-WEB-030/035 | populated (idempotent seed) / search no match | Administrator | e2e |
| TC-SCR-10-WEB-034/038 | permission: Violation manager 403; no token 401 | VM / anonymous | e2e (PERM) |
| TC-SCR-11-WEB-001..004 | list, add, empty submit, edit (+ rename propagates) | Administrator | e2e |
| TC-SCR-11-WEB-006 | delete blocked while categories reference owner (409) | Administrator | e2e + unit |
| TC-SCR-11-WEB-011 | delete succeeds once unreferenced; 404 afterwards | Administrator | e2e |
| TC-SCR-11-WEB-019/021/022/023 | owner/description boundaries, `<>` strip, search | Administrator | e2e |
| TC-SCR-11-WEB-020 | owner name unique case-insensitive | Administrator | e2e + unit |
| TC-SCR-12-WEB-001..005 | seed value, update (+public read), blank, persistence, whitespace | Administrator | e2e |
| TC-SCR-12-WEB-007/008 | badge 100/101, `<>` strip | Administrator | e2e |
| TC-SCR-12-WEB-015 | manager cannot update; public value unchanged | Violation manager | e2e |
| PERM-catalogue-* | role x endpoint matrix (6 endpoint groups x 2 sets) | VM / anonymous | e2e |
| SEC-catalogue | unknown body fields rejected | Administrator | e2e |
