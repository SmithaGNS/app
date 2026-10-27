# Definition of done (per screen)

A development agent runs this list before claiming a screen finished. The source for each item is `build/screens/SCR-NN.json`, generated from the story. The story wins when they disagree, and the JSON is regenerated, never hand-edited.

1. **Controls.** Every row of the story's Actions table (`actions[]`) has a control that exists and does what the outcome column says, for the roles in the row's "who" column. Dead controls the story lists (CSV, Excel, Print, page-size select, pagers) are built to the story's disposition or deliberately omitted, with the omission recorded against the story's open question.
2. **Validation.** Every row of `validation[]` is enforced on client and server, including its minimum and its maximum, with the exact message. A rule marked PROPOSED is built as stated and flagged in the PR as unratified. A field the story calls unruled and undecided is not given a constraint.
3. **States.** Every entry in `states[]` is reachable and compared with its reference render in `parity.json`. For states the story says were never photographed, say so in the PR.
4. **Roles.** The screen renders for every actor in `actors[]` and refuses the rest as `01-non-functional.md` (Permission denial) says. Until the ROLES questions are answered, the single permission check exists with an empty matrix.
5. **Non-functional contract.** Loading, error, empty (both shapes), focus (trap, restore on every dismissal including Save), Enter, time zone and pagination follow `01-non-functional.md`.
6. **Tests.** Every test in `build/tests/SCR-NN.spec.ts` passes and none is still `fixme`. No test is deleted or loosened; a wrong test means the story is wrong, so edit the story and regenerate. A test that passes against an empty page is a defect.
7. **Parity.** A diff against `parity.json` for this route at its recorded viewport has been inspected. Zero is not required; every difference is listed and explained in the PR.
8. **Seams.** Each seam in `index/00-project-index.md` that names this screen is honoured at the other end: identifier carried, status vocabulary identical on writer and reader, counts from the same query as the list. Counts shown on screen are computed, never constants.
9. **Open questions.** Every blocking question on this screen is either answered in `index/03-open-questions.md` or its "what happens meanwhile" answer is accepted in writing. No prototype defect ships as a feature: hard-coded identity, discarded passwords, name-string links, unmasked phone numbers in labels or toasts.
10. **Regeneration.** `python tools/scripts/build_pack.py --root . --capture ./capture/capture.json` and `deliverables_check.py` run clean after any story change.
