# Dev stories - violations (backend)

Written by the tech lead; all done in round 1.

| Story | Description | Acceptance | Status |
|---|---|---|---|
| VIO-B1 | Schema, migration, rollback, seed | Three tables, CHECKs, FKs (category RESTRICT), `down.sql`, 23 seeded reports; applied to `drivesafe_new` and the test DB | done |
| VIO-B2 | Shared paging contract | `{ items, meta: { page, pageSize, total, totalPages } }` and `page`/`pageSize` for users, catalogue, contact, violations; tests/docs/openapi updated | done |
| VIO-B3 | List + detail | Filters owner/date/status/search, sizes 10/25/50/100, masked phone, history and evidence on detail | done |
| VIO-B4 | Review | Forward-only transitions, level/note rules, session reviewer, history + audit, no points, race returns 409 | done |
| VIO-B5 | Reveal phone | Administrator only, audit before return | done |
| VIO-B6 | Dashboard, badge, lookups | Server-side aggregates, latest 5, lookups for both roles | done |
| VIO-B7 | Category reference counter | Real implementation, catalogue delete returns 409 `category_in_use`, e2e | done |
| VIO-B8 | Intake stub | `x-service-key`, rate limit, Pending/level 0 | done |
| VIO-B9 | Docs and contract | openapi, CHANGELOGs, `docs/api/violations.md`, schema docs, ADR | done |
