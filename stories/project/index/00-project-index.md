# DriveSafe Admin Portal — screen stories index

**Source:** `C:\laragon\www\drivesafe-new\prototype` (Tailwind prototype, `js/app.js`, `js/data.js`, `index.html`) · **Captured:** 2026-10-26 · **Spec:** none supplied beyond the prototype README (OQ-A-00)
15 screens in 5 modules · 185 action rows · 100 validation rules · 104 acceptance criteria · 121 story open questions plus 17 model questions (138)

**Counting rule.** Every count below is the output of `PYTHONUTF8=1 python tools/scripts/verify_stories.py --stories ./screen-stories --capture ./capture/capture.json` run on 2026-10-26 after the round-2 corrections: actions = body rows of the Actions tables, header lines excluded (an earlier version of the gate overcounted by 21 header lines, giving 206; see `tools/CAPTURE-PATCHES.md`); rules = 100 body rows in the Validation sections (88 rule rows, 12 undecided-field rows from the "Unruled and undecided" tables, which state no rule); criteria = `ST-SCR-nn-nn` blocks; OQ = distinct `OQ-` ids found by grep. Re-run the command to reproduce them. Of the 100, 45 rows carry the word PROPOSED (grep of the table rows).

Gates (2026-10-26): verify_stories pass (exit 0) · coverage_check --strict pass (exit 0) · deliverables_check pass (exit 0) on the four-folder deliverable · journey_check: 9 of 9 captured screens have a story; the sign-in, forgot and logout hops report as breaks only because login, forgot and OTP are outside the 9-route capture manifest and are reached by data-action / go() calls, not links - each hop was verified in app.js (tool limit, not a story defect; see journey-flow/00-journey-flows.md)
Architect: Accepted in round 4 (22, 12, 1, 0 gaps) · Stakeholder: Approved with conditions - 48 blocking questions have role owners but no dates; 7 of 10 journeys fall short of the outcome the business needs (see journey-flow/00-journey-flows.md)

## What this product is

DriveSafe is the staff-side admin portal for a road-safety reporting service run by the Jamaican Traffic Authority (`ta.org.jm`). Citizens use a separate mobile app to report traffic violations (a photo or video, a category, a location, the vehicle) and to message the authority; staff use this portal to review those reports, decide them (Pending, Under review, Verified, Rejected), maintain the list of violation categories and the owners (agencies) responsible for them, answer citizen messages, and manage who may sign in. Two kinds of staff sign in, Administrator and Violation manager, with an email-style username, a password and a six-digit code; nothing in the prototype checks any of them. An outsider can reach only the sign-in screens, the forgot-password flow and the Feedback form (SCR-03), which is opened from the login page and nowhere else. The portal stores, or is meant to store: violation reports (with a status, a 0-3 level, and a reviewer), categories, owners, contact messages with an admin reply, portal users, app users with reward-point balances, and one setting, the Badge Name shown on the sign-in screens. The prototype stores none of it durably, uses no identifiers, and links entities by name strings.

## Modules

| # | Module | Screens | Folder |
|---|---|---|---|
| 01 | Authentication, entry and shell menu | SCR-00 … SCR-04 | `screen-stories/01-auth/` |
| 02 | Violations | SCR-05 … SCR-07 | `screen-stories/02-violations/` |
| 03 | Catalogue and settings | SCR-10 … SCR-12 | `screen-stories/03-catalogue/` |
| 04 | Contact | SCR-13 | `screen-stories/04-contact/` |
| 05 | Users and account | SCR-20 … SCR-22 | `screen-stories/05-users/` |

The ids skip 08-09 and 14-19 because the numbering is per module group (0x, 1x, 2x). Nothing was removed.

## Screens

Rules = Validation rules as counted by verify_stories.py (see the counting rule above). Criteria = acceptance criteria. OQ = open questions raised in the story.

| ID | Screen | Route | Module | Actions | Rules | Criteria | OQ |
|---|---|---|---|---|---|---|---|
| [SCR-00](../screen-stories/01-auth/SCR-00-login.md) | Login | `#login` | Authentication | 5 | 7 | 6 | 9 |
| [SCR-01](../screen-stories/01-auth/SCR-01-forgot-password.md) | Forgot password | `#forgot` | Authentication | 3 | 4 | 5 | 3 |
| [SCR-02](../screen-stories/01-auth/SCR-02-otp-verification.md) | OTP verification (login and reset modes) | `#otp` | Authentication | 6 | 7 | 6 | 6 |
| [SCR-03](../screen-stories/01-auth/SCR-03-feedback-modal.md) | Feedback modal | modal over `#login` | Authentication | 9 | 11 | 6 | 6 |
| [SCR-04](../screen-stories/01-auth/SCR-04-account-menu-logout.md) | Account menu and logout confirmation | shell header menu and modal | Authentication | 7 | 2 | 6 | 5 |
| [SCR-05](../screen-stories/02-violations/SCR-05-dashboard.md) | Dashboard | `#dashboard` | Violations | 12 | 2 | 7 | 9 |
| [SCR-06](../screen-stories/02-violations/SCR-06-violations-list.md) | User uploaded Violations (list) | `#violations` | Violations | 17 | 7 | 8 | 13 |
| [SCR-07](../screen-stories/02-violations/SCR-07-review-modal.md) | Violation review modal | modal over `#violations` or `#dashboard` | Violations | 8 | 5 | 7 | 5 |
| [SCR-10](../screen-stories/03-catalogue/SCR-10-category-list.md) | Category management | `#category` | Catalogue | 26 | 7 | 7 | 10 |
| [SCR-11](../screen-stories/03-catalogue/SCR-11-owners-list.md) | Owner management | `#owners` | Catalogue | 10 | 6 | 6 | 8 |
| [SCR-12](../screen-stories/03-catalogue/SCR-12-config.md) | Config (Badge Name) | `#config` | Catalogue | 1 | 2 | 5 | 5 |
| [SCR-13](../screen-stories/04-contact/SCR-13-contact-us.md) | Manage Contact Us | `#contact` | Contact | 10 | 4 | 7 | 9 |
| [SCR-20](../screen-stories/05-users/SCR-20-admin-user-list.md) | Admin user list with Add/Edit dialog | `#users` | Users | 45 | 12 | 10 | 13 |
| [SCR-21](../screen-stories/05-users/SCR-21-app-user-list.md) | App user list with Add/Edit dialog | `#appusers` | Users | 21 | 10 | 9 | 13 |
| [SCR-22](../screen-stories/05-users/SCR-22-profile-change-password.md) | My Profile and Change password | `#profile` | Users | 5 | 14 | 9 | 7 |

Dialogs, drawers and confirmations are documented inside their parent story, not as separate screens (only SCR-03, SCR-04 and SCR-07 are modal-only stories because they have no page of their own).

## Screens and states

Every state the capture photographed, with the story that shows it. All pictures live in `screen-stories/screenshots/`. The three `*--fold` files are crops of the same render and are not separate states.

| Story | State | Image |
|---|---|---|
| SCR-00 | Default (only state captured) | `auth-login.png` |
| SCR-01 | Default; submitted empty (error) | `auth-forgot.png`, `auth-forgot-error.png` |
| SCR-02 | Reset mode awaiting code; error under 6 digits; reset verified (done panel); login mode awaiting code | `auth-otp-reset.png`, `auth-otp-error.png`, `auth-otp-reset-done.png`, `auth-otp-login.png` |
| SCR-03 | Feedback modal form (error and sent states not photographed, OQ-A-18) | `modal-feedback.png` |
| SCR-04 | Account menu open; Logout confirmation; shell at 390 px with the navigation drawer closed and open | `menu-account.png`, `modal-logout.png`, `shell-mobile-390-closed.png`, `shell-mobile-390-drawer.png` |
| SCR-05 | Populated | `dashboard.png` |
| SCR-06 | Populated, first page, filters empty | `violations.png` |
| SCR-07 | Review modal opened for report 1 | `modal-review.png` |
| SCR-10 | Populated; Add Category modal empty; submitted empty; Edit Category; native delete confirm (not photographable) | `category.png`, `modal-cat-add.png`, `modal-cat-add-invalid.png`, `modal-cat-edit.png` |
| SCR-11 | Populated; Add Owner empty; submitted empty; Edit Owner; native delete confirm | `owners.png`, `modal-owner-add.png`, `modal-owner-add-invalid.png`, `modal-owner-edit.png` |
| SCR-12 | Default | `config.png` |
| SCR-13 | Populated, none replied; Reply modal | `contact.png`, `modal-reply.png` |
| SCR-20 | Populated; Add User pristine (Save disabled); Add User "invalid" capture; Edit User; native delete confirm; password reset toast | `users.png`, `modal-user-add.png`, `modal-user-add-invalid.png`, `modal-user-edit.png` |
| SCR-21 | Populated; Add App User; "invalid" capture; Edit App User | `appusers.png`, `modal-app-add.png`, `modal-app-add-invalid.png`, `modal-app-edit.png` |
| SCR-22 | Default; partial password; validation errors; success; entry menu | `profile.png`, `profile--partial-password.png`, `profile--errors.png`, `profile--success.png`, `menu-account.png` |

Supplementary captures **outside `capture.json`**: the `profile--partial-password`, `profile--errors` and `profile--success` renders (OQ-22-06) and the two 390 px shell images `shell-mobile-390-closed.png` and `shell-mobile-390-drawer.png`. All were driven by the analyst on the running prototype with Playwright. No other mobile state was photographed. The profile render was re-captured after the first pass; SCR-22 embeds the real Profile render, not the App-users render the original manifest capture duplicated.

## State axes

| Screen | Axis | Variants |
|---|---|---|
| SCR-02 | mode | login (to Dashboard) · reset (to done panel and back to login) |
| SCR-02 | input | 6 digits · fewer than 6 (error) |
| SCR-01 | input | valid email · empty or invalid (error) |
| SCR-20 | dialog mode | Add (password required) · Edit (password optional, blank keeps) |
| SCR-21 | dialog mode | Add · Edit |
| SCR-10, SCR-11 | dialog mode | Add · Edit · native delete confirm |
| SCR-13 | row state | unanswered (Reply) · answered (Edit reply, not photographed, OQ-13-08) |
| SCR-06 | filter | Category Owner · Created From/To · search; all in-page, none in the URL |
| SCR-07 | status | Pending · Under review · Verified · Rejected |
| All screens | role | **None in the prototype.** Administrator and Violation manager exist as data and gate nothing (OQ-A-27) |

No state is carried in the URL beyond the hash route. Scope selectors, tabs and a language switch do not exist.

## Entities the product handles

One row per thing the product stores, named as the product names it. "(not named)" means no screen uses a word for it. An entity with no writer or no reader says so.

| Entity | Named in the UI as | Created by | Read by | Updated by | Deleted by |
|---|---|---|---|---|---|
| Violation report | "violation", "report", "User uploaded Violations" | citizen mobile app (outside the portal) | SCR-05, SCR-06, SCR-07 | SCR-07 (status, level) | none |
| Category | "Category" | SCR-10 | SCR-10, SCR-06 (Category column), SCR-11 (indirect) | SCR-10 | SCR-10 (native confirm) |
| Owner | "Owner", "Category Owner" | SCR-11 | SCR-11, SCR-10 (select), SCR-06 (filter and derived column) | SCR-11 | SCR-11 (native confirm) |
| Contact message | "Contact Us", "message" | citizen mobile app (outside the portal) | SCR-13 | SCR-13 (reply) | none |
| Portal user | "Admin user", "Portal users" | SCR-20 | SCR-20, SCR-22 (hard-coded, not read), SCR-04 header | SCR-20 | SCR-20 (native confirm) |
| App user | "App user" | SCR-21; the citizen app | SCR-21, SCR-05 (count) | SCR-21 | none (OQ-21-03) |
| Feedback submission | "Feedback" | SCR-03 (writes nothing) | none (no reader exists) | none | none |
| Badge setting | "Badge Name", "Config" | SCR-12 | SCR-00, SCR-01, SCR-02 | SCR-12 | none |
| Violation status event | (not named) inferred | SCR-07 save (implied) | none today | none | none |
| Reward ledger entry | "reward points" (toast and footnote) inferred | SCR-07 on Verified (promised, not built) | SCR-21 (balances) | SCR-21 (manual edit) | none |
| Evidence media | "photo/video" placeholder inferred | citizen mobile app | SCR-07 (placeholder only) | none | none |
| Reviewer note | "Reviewer note" inferred | SCR-07 (field exists, not saved) | none | none | none |
| OTP challenge | "6-digit code" inferred | SCR-00 and SCR-01 (implied) | SCR-02 | none | none |
| Session | "Signed in as Admin Admin" inferred | SCR-00 (implied) | SCR-04 (hard-coded) | none | SCR-04 Logout |

Ownership and structure, in prose. A category belongs to at most one owner; a violation report belongs to one category; the owner of a report is derived through its category and is never stored. Today all three links are name strings, so renaming or deleting an owner or a category silently orphans what points at it. Reports and contact messages are created outside the portal, so SCR-06 and SCR-13 are the only places the portal is the reader of record. App users are both created by the citizen app and by an admin on SCR-21; the portal has no way to delete one. The Feedback form has a writer and no reader, and is probably the same thing as a Contact message with a subject (OQ-A-20, DM-12). Nothing is stored polymorphically. The one rule enforced in a single place is the password policy, defined once in code and owned by SCR-20; SCR-22 reuses it.

## Seams between modules

| Seam | Screens | Owner | Status |
|---|---|---|---|
| Violation.category is a name string; renaming or deleting a Category orphans reports and loses the derived owner | SCR-10 → SCR-06, SCR-07 | **unowned** | blocking (OQ-V-18, OQ-10-06) |
| Category.owner is a name string; renaming or deleting an Owner leaves a dangling name | SCR-11 → SCR-10, SCR-06 | **unowned** | blocking (OQ-11-06) |
| Category "Other" drives the free-text `otherDescription` path; deleting it breaks reports | SCR-10 → SCR-06 | **unowned** | blocking (OQ-10-07) |
| Owner names feed the SCR-06 filter and the SCR-10 select (`refreshOwnerSelects`) | SCR-11 → SCR-10, SCR-06 | SCR-11 | built, works |
| Verified credits reward points to the reporter; nothing is credited | SCR-07 → SCR-21 | **unowned** | blocking (OQ-V-25, OQ-21-10) |
| A report's mobile is formatted `+1 876 …`; an app user's phone is digits only; no link between the two | SCR-06, SCR-07 ↔ SCR-21 | **unowned** | blocking (OQ-21-09, DM-04) |
| Mask-and-reveal of phone numbers (`maskMobile`); SCR-07 shows the full number; SCR-21's ✎ label and toast expose it | SCR-06, SCR-07, SCR-21 | **unowned** (code shared; no rule on who may reveal) | blocking (OQ-V-19, OQ-21-11) |
| Password policy constants: 12-128 and four classes, shared | SCR-20 ↔ SCR-22 | SCR-20 | built; reset flow (SCR-02) applies none and sets no password: unowned (OQ-22-05, OQ-A-15) |
| Signed-in identity "Admin Admin" appears in header, sidebar, SCR-22 and SCR-07's stamp; it matches no SCR-20 row | SCR-04, SCR-22, SCR-20, SCR-07 | **unowned** | blocking (OQ-A-23, OQ-20-10, OQ-22-02) |
| Role (Administrator, Violation manager) is never enforced; Level 0-3 (SCR-07) versus Level 1-3 (SCR-20) undefined | all screens; SCR-07 ↔ SCR-20 | **unowned** | blocking (OQ-A-27, OQ-V-16) |
| Dashboard tiles and sidebar badge count other screens' data and are hard-coded or page-limited | SCR-05 ↔ SCR-06, 10, 13, 20, 21 | **unowned** | blocking (OQ-V-05, OQ-V-07) |
| Tiles open the list without carrying a status filter | SCR-05 → SCR-06 | SCR-05 | costly (OQ-V-04) |
| Badge Name: saved in browser localStorage, shown on the sign-in screens | SCR-12 → SCR-00, SCR-01, SCR-02 | SCR-12 | blocking: cannot be per device (OQ-12-03) |
| Feedback form (pre-login) versus Contact Us (citizen app); same entity? | SCR-03 ↔ SCR-13 | **unowned** | blocking (OQ-A-20, DM-12) |
| Profile reachable only through the account menu or sidebar profile card; not in the navigation map | SCR-04 → SCR-22 | SCR-04 (shell) | works, by design or accident (OQ-22-01) |
| Feedback reachable only from Login | SCR-00 → SCR-03 | SCR-00 | undecided scope (OQ-A-22) |
| Dashboard tiles Categories 10, Portal users 8, Messages 24 and App users 3,123 are hard-coded numbers; they go stale after Add or Delete on the screen they link to | SCR-05 → SCR-10, SCR-20, SCR-13, SCR-21 | SCR-05 (the tiles are its numbers; no source feeds them) | blocking (OQ-V-07) |
| The App users tile equals `APP_USERS_TOTAL` and is not incremented by Add on SCR-21; SCR-05 reads App user count, SCR-21 writes it | SCR-05 ↔ SCR-21 | SCR-05 | costly (OQ-V-07, OQ-21-06) |
| Page-size options differ per list; the list-search maximum is 100 everywhere as PROPOSED (the source states none), stated once on SCR-06 | SCR-06, 10, 11, 13, 20, 21 | SCR-06 (search rule) / **unowned** (page size) | noise (OQ-V-26, DM-17, OQ-V-13) |
| Shell: the sidebar (groups Category Management, User Management, Settings with auto-expand, the Pending badge, the active-item rule, the off-canvas drawer below 1024 px), the header menu, toast and live region, modal open and close | all post-login screens | SCR-04, section "Shell navigation" | works; no focus trap and focus is lost after several Saves (OQ-A-21) |

Seams are linked by names, not ids, everywhere. That is the root of five of the unowned rows.

## Findings that most change what gets built

1. **No role is enforced.** Any signed-in person can add, edit or delete portal users, categories, owners and settings, and review any report (OQ-A-27, OQ-20-02). A build that copies the prototype ships a privilege-escalation hole.
2. **Authentication is theatre.** Login accepts any input, the OTP accepts any six digits, forgot-password advances for any email, and the reset link lands on a set-new-password page that does not exist (OQ-A-01, OQ-A-12, OQ-A-15). Passwords are validated and discarded: Add/Edit never stores one, Change password never checks the current one, Reset (lock icon) is a toast.
3. **Counts are not trustworthy.** Dashboard Verified, Rejected and Under review are computed from the 10 loaded rows, and Pending adds the 13 unloaded ones; Categories, Portal users, Messages and App users are hard-coded; Contact shows 24 messages over 3 pages with 10 rows, so 14 cannot be reached; App users shows 3,123 with 10 loaded (OQ-V-05, OQ-V-07, OQ-13-04).
4. **Links are name strings.** Category on a report and Owner on a category are text; rename or delete orphans silently (OQ-V-18, OQ-10-06, OQ-11-06).
5. **A decision leaves no record.** Review stamps "Admin Admin" every time, the reviewer note is not saved, there is no history, and Verified promises reward points that are not credited (OQ-V-21, OQ-V-23, OQ-V-25).
6. **Personal data leaks around the mask.** SCR-07 shows the full phone; SCR-21's edit icon and toast reveal it; CSV, Excel and Print would export it; nothing audits a reveal (OQ-V-19, OQ-V-12, OQ-21-11).
7. **The signed-in identity is hard-coded** and matches no stored user (OQ-A-23, OQ-22-02).
8. **Dead controls on every list:** CSV, Excel, Print, the page-size select and the pagers are wired to nothing (SCR-06, 10, 11, 13, 20, 21). Row actions, eye toggles and Show full phone number that the capture flags as dead are wired by delegated listeners and are false positives. Disposition per control is in each story.
9. **Phone and Level mean different things on different screens** (digits-only versus `+1 876 …`; Level 0-3 required versus 1-3 optional; OQ-21-09, OQ-V-16).
10. **Save-disabled-until-valid is inconsistent:** user and app-user dialogs disable Save until valid; category, owner and reply dialogs validate on click (OQ-10-08).
11. **The Badge Name is per browser** (localStorage), yet is shown to unauthenticated visitors; its "required" message has no element and is never visible (OQ-12-02, OQ-12-03).
12. **Timers disagree:** resend countdown 500 s, reset link 30 min, code lifetime unstated (OQ-A-14).
13. **Delete is a native confirm with no protections** (self, last Administrator, categories in use, no toast); all modals open focus on the close button with no focus trap (OQ-10-05, OQ-20-08, OQ-A-21).

## Open questions

138 in total (121 from the stories, 17 raised by the model): **48 blocking, 66 costly, 24 noise**. New since the first pass: OQ-A-28 (Feedback Subject is not reset on reopen), OQ-V-26 and its copies OQ-10-10, OQ-11-08, OQ-13-09, OQ-20-12, OQ-21-12 (one search-box maximum); OQ-20-13 and OQ-21-13 (focus lost after Edit-Save; Option column off-screen on SCR-20). Every id found by grep in the stories is in `03-open-questions.md`, and each cluster-pasted answer was checked against its own question in round 2. The full triaged list with owners and the clusters is [03-open-questions.md](03-open-questions.md).

| Module | Story questions | Costliest |
|---|---|---|
| Authentication | 29 (OQ-A-00 … OQ-A-28) | OQ-A-15 missing set-new-password screen; OQ-A-27 roles |
| Violations | 27 (OQ-V-00 … OQ-V-26) | OQ-V-05 counts from one page; OQ-V-25 reward points |
| Catalogue | 23 (OQ-10-01 … OQ-12-05) | OQ-10-06 / OQ-11-06 name-string integrity |
| Contact | 9 (OQ-13-01 … OQ-13-09) | OQ-13-05 reply delivers nothing, replier not recorded |
| Users | 33 (OQ-20-01 … OQ-22-07) | OQ-20-02 / OQ-21-02 roles and Level; OQ-21-03 erasure path |

## Capture tooling changes

The plugin's capture scripts assumed a hash-routed prototype and were patched for this one; the full record is `tools/CAPTURE-PATCHES.md`.

- `capture_screens.js` launches the local Chromium, accepts an http URL (the ES-module app must be served over HTTP), signs in through the prototype's own login and OTP, and reaches each screen by clicking its `data-go` or `data-action` element.
- `wiringOf` now uses an **allow-list** of the delegated attributes that `bind()` in `app.js` listens for: `data-go`, `data-review`, `data-cat-edit`/`-del`, `data-owner-edit`/`-del`, `data-user-edit`/`-del`/`-lock`, `data-reply`, `data-app-edit`, `data-pw-toggle`, `data-mobile-toggle`, `data-close`. An earlier version accepted any `data-*` attribute, which the round-2 review called too blunt; the first, unpatched capture reported 180 "dead" controls because it did not see delegated listeners.
- New scripts: `capture_extra.js` (3 auth screens, 8 dialogs, empty-submit states, account menu), `capture_profile.js` (Profile, which the first capture saved as the App-users render) and `merge_modals.js` (writes the dialogs and extra captures into `capture.json` and fixes `source` to the served URL). `coverage_check.py` now also requires every dialog button and field label to appear in a story.
- Dead controls in the current `capture.json`: dashboard 0, violations 8, category 6, owners 6, contact 8, **SCR-20 6** (CSV, Excel, Print, Previous, 1, Next), **SCR-21 10** (CSV, Excel, Print, Previous, 1, 2, 3, ..., 313, Next), total **44**. Each was checked against `app.js`: CSV, Excel, Print, the page-size select and the pagers are genuinely unwired; row actions, eye toggles, review buttons and phone reveal toggles are wired by delegated listeners.
- Outside the manifest: the three `profile--*` states and the two 390 px shell images (see Screens and states).

## Responsive behaviour (measured)

Measured by the architect with Playwright from 390 to 2560 px; the sidebar is permanent from 1024 px. Every list table scrolls inside its `.table-wrap` whenever the content area is narrower than the table's minimum width: SCR-06 (72 rem) scrolls at every width up to about 2200 px and fits only at 2560; SCR-10 and SCR-11 (40 rem) scroll below about 768 px and again from 1024 to about 1053 px; SCR-13 (54 rem) scrolls at 768-900 px and 1024-about 1250 px; SCR-20 and SCR-21 (60 rem) scroll up to about 1500 px, so SCR-20's Option column is off-screen on a 1440 px laptop (OQ-20-13). The login brand panel is hidden below 1024 px; the dashboard grid is 2, 4 and 8 columns at narrow, lg and 2560 px; Profile is 1 column at 390 px and 3 at lg; the review modal is at most 90% of the viewport height. Below 1024 px the sidebar is an off-canvas drawer (SCR-04, "Shell navigation").

## Review rounds

| Round | Date | Reviewer | Items raised | Items closed | Verdict |
|---|---|---|---|---|---|
| 0 | 2026-10-26 | none | 0 | 0 | 15 stories written and gate-clean; index folder built |
| 1 | 2026-10-26 | Architect | 22 gaps: 2 blocking (journey-flow/ and build/ not yet produced), 10 major, 10 minor | story corrections (items 3-9, 11-16, 18-21) made by the story authors and gate-clean again (verify_stories, coverage_check --strict); index items 10, 17, 22 and the capture paragraph (item 7) closed in this pass: counts regenerated from verify_stories output with the counting rule stated, data model and dictionary corrected, seams added, this table updated. Items 1, 2 (journey-flow, build) and 8 (manifest and coverage tooling, reported above) are open or tool-side | Return; round 2 pending |
| 2 | 2026-10-26 | Architect | 12 gaps: 0 blocking, 3 major, 8 minor, 1 tooling; #1 and #2 carried open by design | story fixes (stale 120 and trim claims, responsive thresholds, owner-deleted select state, Dashboard rows, focus after Edit-Save, new Shell navigation section in SCR-04 with two 390 px images, working notes moved out of screen-stories); index: counting rule restated (100 body rows, 88 rule and 12 undecided), SCR-20 and SCR-21 dead-control figures and the allow-list added, OQ-10-07 and OQ-11-07 given their own meanwhile text with the other cluster answers re-checked, OQ-20-13 and OQ-21-13 added, shell seam repointed, round-2 row recorded; tooling: `wiringOf` allow-list | Accept with conditions; build/ and journey-flow/ pending |
| 3 | 2026-10-26 | Architect | 1 gap (minor, R3-1: stale clause in SCR-11); #1 and #2 open by design | SCR-11 Delete row corrected to "renders empty with no option selected" | Accept with conditions |
| 4 | 2026-10-26 | Architect | 0 gaps | R3-1 verified closed; verify_stories and coverage_check --strict exit 0 | **Accept**; build/ generated and authored, journey-flow/ still to be produced |

Rounds so far: 4 (22, 12, 1, 0 gaps). The architect's gap lists are recorded here as `review/gaps-round-N.md` is closed.
