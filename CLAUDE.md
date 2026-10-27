# CLAUDE.md — drivesafe (Workspace)

## What This Is

TODO: add description

This workspace holds 2 repos built by the setup-project plugin's AI development pipeline.

## Repos

| Repo | Side | Stack | Build order |
| ---- | ---- | ----- | ----------- |
| backend | backend | NestJS · MySQL · Prisma · JWT | 1 |
| frontend | frontend | React · Vite · Tailwind + shadcn/ui | 2 |

## Workspace Folders

| Folder / file | Purpose |
| --- | --- |
| `stories/` | **Input** — BRS, FRS, stories, screens, HTML prototypes (+ generated requirements, roadmap, roles, traceability) |
| `testcases/` | **Input** — test cases per module (+ consolidated `test-cases.md`) |
| `testresults/` | **Output** — every test report (Tester, Integration Tester, testing plugin) |
| `api-contract/` | OpenAPI contract between backend and frontend |
| `output/` | App links, test logins, `app-manifest.json` for the testing plugin |
| `open-questions.csv` | Every open question and automatic decision — answer here |
| `summary.md` | Live status |
| `.auto-build/` | Autonomous run state, scripts and templates |

## Cross-Repo Rules

- The backend is always built first; the frontend builds against `api-contract/openapi.yaml`
- A contract change lands in the backend first, with a `api-contract/CHANGELOG.md` entry, before any frontend change uses it
- Shared requirements live only in `stories/` — never copied into a repo
- The Integration Tester (`.claude/agents/integration-tester.md`) runs here after a module is merged on both sides

## Test Accounts

Every application role in `stories/project/roles.md` has one account: `{role-slug}@test.local` / `Test@1234` (development and test only).
