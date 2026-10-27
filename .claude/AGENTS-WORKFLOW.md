# AGENTS-WORKFLOW.md — Development Pipeline

## Paths

| Token | Meaning in this repo |
| --- | --- |
| `<ws>` | Workspace root: `.` (relative to this repo) |
| `<repo>` | This repo's root |
| Side | `workspace` |
| Dev stories file | `<ws>/stories/{module}/dev-stories.md` |
| Platform Architect | `.claude/agents/node-architect.md · react-architect.md` |
| Dev branch | `dev-release` (never push to `main`) |
| Build order | `all-backend-first` |

Workspace folders (shared by every repo in the workspace):

```
<ws>/stories/project/      BRS, FRS, spec, roadmap.md, roles.md, traceability.md   (inputs + generated)
<ws>/stories/{module}/     input/ (your files), requirements.md, dev-stories*.md
<ws>/stories/bugs/         bug reports + Debugger analysis
<ws>/testcases/{module}/   input/ (your test cases), test-cases.md (consolidated)
<ws>/testresults/{module}/ one report per run (Tester, Integration Tester, testing plugin)
<ws>/api-contract/         openapi.yaml, CHANGELOG.md
<ws>/output/               index.html (app links, logins), app-manifest.json
<ws>/open-questions.csv    every question and automatic decision
<ws>/summary.md            live status
<ws>/.auto-build/          state.json, runtime.json, bin/ (scripts), templates/
```

## Run Modes

- **Interactive** (default): every phase ends with a clearly delimited output and waits for the human's approval. Questions are asked; the answer is also recorded in `<ws>/open-questions.csv`.
- **Autonomous** (`/auto-build`, or `<ws>/.auto-build/state.json` has `"mode": "auto"`): **never ask, never wait.** Decide, record the assumption in `<ws>/open-questions.csv`, and continue. Approvals are implicit. See "Autonomy Rules".

## Pipeline — every module

Integration testing runs here after a module is merged in both backend and frontend repos.
See each repo's `.claude/AGENTS-WORKFLOW.md` for the per-repo phases.

## Development Loop — Senior Developer ⇄ Tech Lead ⇄ Tech Architect

```
Tech Lead writes dev stories (once)
round = 1
loop:
  Senior Developer implements / fixes            → docs/reviews/{module}/dev-loop.md
  Tech Lead reviews (code, stories, test cases)   → approved | changes requested
  Tech Architect (Platform Architect) reviews     → approved | changes requested
  both approved → exit
  round == 3   → exit with OPEN ISSUES
  round += 1
```

Open issues after round 3 are (a) handed to the Tester, who writes tests for them first, (b) logged in `<ws>/open-questions.csv`, and (c) listed in `summary.md`. At merge every open issue must be **fixed** or **accepted** — interactive: by the human; auto: accepted automatically and logged as a `decision` row.

Failures found later (tests, security, architecture review) re-enter this loop for the remaining rounds of the same module (rounds are counted per module, max 3 in total).

## DB Loop — db-designer ⇄ DB Reviewer (if a database)

Max 3 rounds, same rules. Unresolved critical/major findings after round 3 → `<ws>/open-questions.csv`, pipeline continues.

## /verify

Runs between the development loop and the Tester: typecheck, lint, unit tests, build, endpoint/screen audit. Interactive: the human runs it. Auto: the orchestrator runs it; failures go back into the loop if rounds remain.

## Significant Modules (Architecture Reviewer runs)

A module is significant when the plan marks it so, or it has any of: new tables with cross-module relationships · new event/queue patterns · auth/security architecture changes · crypto · a breaking contract change. Otherwise the phase is skipped.

## Merge Checklist

- [ ] Build passes; test suite passes or every failure is an accepted open issue
- [ ] Security Auditor PASSED (a FAILED module is never merged — it stays on its branch)
- [ ] `docs/plans/{module}.md` reflects what was built
- [ ] Backend: `<ws>/api-contract/openapi.yaml` regenerated/verified from code; breaking changes in `<ws>/api-contract/CHANGELOG.md`; `docs/api/{module}.md` updated
- [ ] Frontend: typed client regenerated from the contract; build passes against it
- [ ] `dbschema/schema.md`, `docs/schema/index.md` updated (if DB)
- [ ] ADR(s) written if the Architecture Reviewer ran
- [ ] `<ws>/stories/project/traceability.md` rows complete (requirement → story → TC → result)
- [ ] `CHANGELOG.md` entry for the module
- [ ] Every open issue fixed or accepted
- [ ] Squash-merge `feature/{module}` into `dev-release` with a Conventional Commit; push `dev-release` if a remote exists — **never push to `main`**
- [ ] `codebase-map.md` updated; `<ws>/output/` regenerated (`/output`)

## Bug Flow (/fix-bug)

Debugger (reproduce → root cause → failing regression test) → development loop on `fix/{bug-id}` (Architect reviews **every** fix; done when the regression test passes) → /verify → Tester (full suite) → Integration Tester (if the bug crosses frontend/backend) → Security Auditor (if the fix touches auth, input handling or sensitive data) → merge.

## Git Conventions

Branches `feature/{module}`, `fix/{bug-id}` off `dev-release` · Conventional Commits (`feat(booking): …`, `fix(payments): BUG-04 …`) · squash merge into `dev-release` · push only `dev-release` and only when a remote exists.

## Autonomy Rules (auto mode)

| Situation | Action |
| --- | --- |
| Unclear setup answer | Take it from the documents, else the default; `decision` row |
| Requirement gap / ambiguity | Most reasonable reading of the documents; `question` row with the assumption |
| Conflicting documents | Priority order (FRS → test cases → stories → BRS → prototype → screens → notes); `decision` row |
| Issues after 3 loop rounds | Continue; open issues to Tester; accepted at merge; rows logged |
| Failing tests after the loop | Record in `<ws>/testresults/`; continue; rows logged |
| Destructive DB change needed | Use the safe additive alternative; `decision` row |
| Security audit failing after the loop | Do **not** merge; mark `🔒 Blocked (security)`; rows logged; continue with the next module |
| Missing tool / service / key | Mock or skip that part; `environment` row; continue |

## Finish Protocol — every agent, every run

1. **Files** — write your outputs to the files named in your agent file (chat output alone is never enough).
2. **Open questions & decisions** — for each one, append a row:
   ```bash
   <ws>/.auto-build/bin/oq-add.sh --module "{module}" --type question|decision \
     --by "{Role}" --category "{category}" --text "{question or decision}" \
     --source "{file §section}" --assumption "{what you assumed}" --impact low|medium|high
   ```
   Categories: `requirement gap`, `conflict`, `database`, `security`, `test failure`, `architecture`, `setup`, `environment`, `bug`.
3. **summary.md** — update this module's row (Status, Current role, Notes) and add one line at the top of "Recent activity" (`HH:MM {Role} {what happened}`); keep only the latest 20 activity lines. Also refresh the counts line (modules done, open questions, decisions).
4. **Agent memory** — add any reusable project-specific gotcha to `.claude/agent-memory/{role}.md`.
5. **Result line** — the last line of your output must be exactly one of:
   `STEP RESULT: pass` · `STEP RESULT: changes-requested` · `STEP RESULT: fail` · `STEP RESULT: blocked`
   Interactive mode: follow it with `Awaiting your approval to proceed to {next phase}.`

## Module Completion

After merge: regenerate `<ws>/output/`, update `summary.md`, start the next module in a **fresh context** (new chat, or the next `/auto-build` step).

## Context Loading Order

1. CLAUDE.md 2. AGENTS-WORKFLOW.md 3. Relevant `.claude/rules/` 4. `.claude/agent-memory/MEMORY.md` 5. Module files
