# Data dictionary

Every field the DriveSafe Admin Portal has, consolidated from the Validation section of the 15 screen stories. 83 field rows across 15 screens; 43 rows carry at least one **PROPOSED** rule (the prototype never declared it and nobody has ratified it). The prototype is the only source: no specification was supplied, so "declared" means declared in the prototype markup or script, and anything else is **PROPOSED**.

## How to read this

One row per field **per screen**. A field that appears on several screens has several rows, deliberately: that is how a disagreement becomes visible instead of being averaged away. Where two screens state different rules for the same concept both rows stand and the **Conflict** column names the other screen. Where one row names two screens (`SCR-06, SCR-07`) the stories state the identical rule on both. Entity names are the ones used in `00-project-index.md` and `02-data-model.md`. `(filter)`, `(list)`, `(UI)`, `(computed)` and `(system)` in the Entity column mean the field does not become a stored attribute. Messages and timing are in each story's Validation table; this file carries the rule, not the wording. Search boxes and page-size selects are listed because they are controls with bounds, not because they are stored.

## Fields

| Field | Screen | Entity | Type | Required | Constraint | Enum members | Status | Conflict |
|---|---|---|---|---|---|---|---|---|
| `username` | SCR-00 | Portal user | text | yes | 3-254 chars, trimmed; `<` `>` stripped (declared filter). Email or handle undecided (OQ-A-05) | - | **PROPOSED** (no rule declared; stripping declared) | SCR-01 asks for an email; SCR-20 has no username field |
| `password (login)` | SCR-00 | Portal user (credential) | password | yes | 1-128 chars, not trimmed | - | **PROPOSED** | Policy on SCR-20/SCR-22 is 12-128 + 4 classes; login applies none (correct for login) |
| `credential_match` | SCR-00 | Portal user | server rule | yes | must match an account; generic error that does not reveal which part failed | - | **PROPOSED** (server-side) | - |
| `recaptcha_score_threshold` | SCR-00, SCR-01, SCR-02 | (system) | decimal | n/a | prototype hard-codes 0.9 = human; production threshold undecided (OQ-A-06) | - | declared in source, value unratified | - |
| `email address (fp-email)` | SCR-01 | Portal user | email | yes | trimmed, regex `^\S+@\S+\.\S+$`, 5-254 chars | - | declared + **PROPOSED** (length) | SCR-20 same regex, max 254 only (no min 5); SCR-21 optional |
| `code digits 1-6` | SCR-02 | OTP challenge | 6 x numeric char | yes | each box 1 digit 0-9; whole value `^[0-9]{6}$` (min 6, max 6) | - | declared | - |
| `code_correct` | SCR-02 | OTP challenge | server rule | yes | must equal issued code (prototype accepts any 6 digits) | - | **PROPOSED** (server-side) | - |
| `code_lifetime` | SCR-02 | OTP challenge | duration | n/a | e.g. 10 minutes (min and max undecided, OQ-A-13) | - | **PROPOSED** | Resend 500 s and reset-link 30 min disagree (OQ-A-14) |
| `max_wrong_attempts` | SCR-02 | OTP challenge | integer | n/a | max 5 wrong entries per code (min 1) | - | **PROPOSED** | - |
| `resend_interval` | SCR-02 | OTP challenge | integer seconds | n/a | fixed 500 s as built (min 500, max 500); looks like a typo (OQ-A-14) | - | declared in source (suspect) | Code lifetime and link lifetime |
| `otp_mode` | SCR-02 | OTP challenge | enum | yes | internal; set by entry route | login, reset | declared | - |
| `reset_link_lifetime` | SCR-02 | OTP challenge (reset) | duration | n/a | 30 minutes (done-panel copy only) | - | declared (copy only) | Resend 500 s; code lifetime undecided |
| `name (fb-name)` | SCR-03 | Feedback submission | text | yes | trimmed; 2-100 chars; `<` `>` stripped | - | declared + **PROPOSED** (length) | SCR-20/21 first/last name 1-60 / optional |
| `email (fb-email)` | SCR-03 | Feedback submission | email | yes | regex `^\S+@\S+\.\S+$`; 5-254 | - | declared + **PROPOSED** (length) | SCR-21 email optional |
| `subject (fb-subject)` | SCR-03 | Feedback submission | enum | yes | closed set, default General feedback; NOT reset on reopen (defect, OQ-A-28) | General feedback, Report a problem, Feature request, Account / login issue | declared | Contact message (SCR-13) has no subject (OQ-A-20) |
| `message (fb-message)` | SCR-03 | Feedback submission | textarea | yes | trimmed; min 10; max 1000 (maxlength) | - | declared + **PROPOSED** (min 10) | SCR-13 reply 1-1000, no min 10 |
| `session idle timeout` | SCR-04 | Session | duration | n/a | 30 minutes of inactivity ends the session | - | **PROPOSED** (OQ-A-25) | - |
| `session identity (name, role)` | SCR-04 | Session / Portal user | text | n/a | hard-coded 'Admin Admin' / 'Administrator'; no id | - | hard-coded literal, not a declared rule | SCR-22 shows itdept@ta.org.jm, +1 876 555 0100: matches no SCR-20 row |
| `latest reports window` | SCR-05 | Violation report | integer | n/a | exactly 5 rows, newest created_at first | - | **PROPOSED** (prototype takes first 5 array items) | - |
| `dashboard counts` | SCR-05 | (computed) | integer | n/a | must come from server totals, not from the loaded page | - | **PROPOSED** | Tiles Categories 10, Portal users 8, Messages 24, App users 3,123 are hard-coded |
| `violation id (S No)` | SCR-06, SCR-07 | Violation report | integer | system | 1..n unique; shown as S No; page 1 = 1-10, total 23 | - | declared | - |
| `mobile` | SCR-06, SCR-07 | Violation report | text | undecided | display '+1 876 3125290'; masked in list, full in SCR-07 | - | declared (format); no rule | App user phone (SCR-21) is digits only, no spaces |
| `vehicle_type` | SCR-06 | Violation report | text | system | seen: Taxi, Truck; no closed list defined (DM-05) | - | undecided | - |
| `category` | SCR-06, SCR-10 | Violation report | text (category NAME) | system | name string equal to Category.name, not an id (OQ-V-18) | - | declared (as built; structurally unsafe) | - |
| `category owner (derived)` | SCR-06 | Violation report | text | system | derived by matching category name to Category.owner; '-' when none | - | declared | - |
| `other_description` | SCR-06 | Violation report | text | only when category = Other | free text, no length declared | - | undecided | - |
| `location` | SCR-06 | Violation report | text | system | address or plus-code, no length declared | - | undecided | - |
| `notes` | SCR-06 | Violation report | text | no | reporter notes, no length declared | - | undecided | - |
| `registration_no` | SCR-06 | Violation report | text | no | plate; often blank; no format declared | - | undecided | - |
| `created_at` | SCR-06, SCR-07 | Violation report | timestamp | system | 'YYYY-MM-DD HH:mm:ss', time zone unknown (OQ-V-17) | - | declared | - |
| `status` | SCR-06, SCR-07 | Violation report | enum | yes | default = current status; any change allowed as built | Pending, Under review, Verified, Rejected | declared | - |
| `status transitions` | SCR-07 | Violation report | rule | n/a | Pending to Under review to Verified or Rejected; reversal needs a reason | - | **PROPOSED** (prototype allows any change, OQ-V-22) | - |
| `level (severity)` | SCR-06, SCR-07 | Violation report | integer | yes | 0-3 (min 0, max 3), default = current; must be >= 1 when Verified | 0, 1, 2, 3 | declared + **PROPOSED** (>=1 when Verified) | SCR-20 Level is an optional string 1-3 (OQ-V-16) |
| `status_updated_by` | SCR-06, SCR-07 | Violation report | text | system | '-' when never actioned; stamped 'Admin Admin' on every save | - | hard-coded literal, not a declared rule | Should reference a Portal user |
| `reviewer note (review-note)` | SCR-07 | Reviewer note | textarea | only when Rejected | 0-500 chars, trimmed, `<` `>` stripped; required when status = Rejected; not persisted in prototype | - | **PROPOSED** (stripping declared) | - |
| `evidence photo/video` | SCR-07 | Evidence media | file | unknown | placeholder only; type, size, retention undecided (OQ-V-24) | - | undecided | - |
| `vf-owner (Category Owner filter)` | SCR-06 | (filter) | select | no | '' (All Category Owners) or an existing Owner name; refreshed from Owners | All Category Owners + every owner name (seed: Police) | declared | - |
| `vf-from (Created From)` | SCR-06 | (filter) | date | no | ISO yyyy-mm-dd; min 2020-01-01; max today | - | declared + **PROPOSED** (bounds) | - |
| `vf-to (Created To)` | SCR-06 | (filter) | date | no | min = Created From (else 2020-01-01); max today; From <= To | - | declared + **PROPOSED** (bounds) | - |
| `search violations` | SCR-06 | (filter) | search | no | 0-100 chars; `<>` stripped; the prototype does not trim (filterTable only lower-cases), so trimming would be PROPOSED | - | **PROPOSED** | - |
| `page size` | SCR-06 | (list) | select | no | one of 10, 25, 50, 100; default 10; no handler | 10, 25, 50, 100 | declared | SCR-10/11/13 offer 10/25/50; SCR-20 offers 10/25; SCR-21 offers 10/25/50/100 |
| `cat-name` | SCR-10 | Category | text | yes | trimmed, min 1, max 60 (maxlength 60); `<>` stripped; case-insensitive unique | - | required + max declared; uniqueness **PROPOSED** | Owner name also 60 |
| `cat-desc` | SCR-10 | Category | textarea | yes | trimmed, min 1, max 150 (maxlength 150) | - | declared | - |
| `cat-owner` | SCR-10 | Category | select (owner NAME) | no | '' (No owner) or an existing owner name at open time; stored as a name string | No owner + every owner name | declared | Should be owner_id (OQ-11-06) |
| `search categories` | SCR-10 | (list) | search | no | min 0, max 100 | - | **PROPOSED** | - |
| `page size` | SCR-10 | (list) | select | no | 10, 25, 50; default 10; dead | 10, 25, 50 | declared | see SCR-06 |
| `owner-name` | SCR-11 | Owner | text | yes | trimmed, min 1, max 60; `<>` stripped; case-insensitive unique | - | required + max declared; uniqueness **PROPOSED** | - |
| `owner-desc` | SCR-11 | Owner | textarea | yes | trimmed, min 1, max 150 | - | declared | - |
| `search owners` | SCR-11 | (list) | search | no | min 0, max 100 | - | **PROPOSED** | - |
| `page size` | SCR-11 | (list) | select | no | 10, 25, 50; default 10; dead | 10, 25, 50 | declared | see SCR-06 |
| `cfg-badge (Badge Name)` | SCR-12 | Badge setting | text | yes | trimmed, min 1, max 100; `<>` stripped; held in browser localStorage key drivesafe_badge_name | - | required declared; max 100 **PROPOSED** | Required message has no element, so never visible (OQ-12-02) |
| `contact name` | SCR-13 | Contact message | text | read-only | as sent by the citizen app; no portal rule | - | undecided | SCR-03 name 2-100 |
| `contact email` | SCR-13 | Contact message | email | read-only | as sent; shown unmasked (OQ-13-07) | - | undecided | SCR-03 email 5-254 |
| `contact message` | SCR-13 | Contact message | text | read-only | as sent; length unknown | - | undecided | SCR-03 message 10-1000 |
| `created_at` | SCR-13 | Contact message | timestamp | system | 'YYYY-MM-DD HH:mm:ss' | - | declared | - |
| `reply-text (Your response)` | SCR-13 | Contact message | textarea | yes | trimmed, min 1, max 1000 (no maxlength attr); `<>` stripped | - | required declared; max 1000 **PROPOSED** | SCR-03 message min 10 |
| `response / replied_at` | SCR-13 | Contact message | text / timestamp | system | '' when unanswered; replied_at from browser clock; replier not stored | - | declared | - |
| `search messages` | SCR-13 | (list) | search | no | min 0, max 100 | - | **PROPOSED** | - |
| `page size` | SCR-13 | (list) | select | no | 10, 25, 50; default 10; dead | 10, 25, 50 | declared | see SCR-06 |
| `u-first (First Name)` | SCR-20 | Portal user | text | yes | trimmed; min 1, max 60; Unicode letters, space, hyphen, apostrophe | - | required declared; length/charset **PROPOSED** | SCR-21 optional; SCR-03 name 2-100 |
| `u-last (Last Name)` | SCR-20 | Portal user | text | yes | trimmed; min 1, max 60 | - | required declared; length **PROPOSED** | SCR-21 optional |
| `u-email (Email)` | SCR-20 | Portal user | email | yes | trimmed; regex `^\S+@\S+\.\S+$`; max 254; lower-cased; unique case-insensitive | - | required + regex declared; max/unique **PROPOSED** | SCR-21 optional, blur only; seed row 4 '@mail.com' fails the regex (OQ-20-11) |
| `u-phone (Phone No)` | SCR-20 | Portal user | digit string | yes | digits only `^[0-9]+$`; min 7, max 15 | - | required + digits declared; 7-15 **PROPOSED** | SCR-06 mobile '+1 876 ...' with spaces; seeds mix 9 and 11 digits (OQ-20-05) |
| `u-addr (Address)` | SCR-20 | Portal user | text | no | trimmed; max 200 | - | optional declared; max 200 **PROPOSED** | SCR-21 Address column has no field |
| `u-role (Role)` | SCR-20 | Portal user | select | yes | exactly one; placeholder 'Select role' invalid | Administrator, Violation manager | declared | No screen enforces role (OQ-20-02) |
| `u-level (Level)` | SCR-20 | Portal user | select (string) | no | blank, 1, 2 or 3; meaning undecided | (blank), 1, 2, 3 | declared options; meaning **PROPOSED** | SCR-07 level is integer 0-3, required |
| `u-pass (Password)` | SCR-20 | Portal user (credential) | password | Add: yes; Edit: no (blank keeps) | min 12, max 128; at least one each of A-Z, a-z, 0-9 and a symbol from !@#$%^&*()_+-=[]{} (pipe) ;':",.<>?; never stored in prototype (hash only in production) | - | declared; history/breach/no-name rules **PROPOSED** | Identical constants on SCR-22 (owner SCR-20) |
| `password strength label` | SCR-20, SCR-22 | (UI) | enum | n/a | Very weak (text, 0 rules), Weak 1, Fair 2, Good 3, Strong 4 or 5; 4 meter segments | Very weak, Weak, Fair, Good, Strong | declared | Meter has 4 steps, rules 5 (OQ-20-09) |
| `search users` | SCR-20 | (list) | search | no | 0-100 chars; `<>` stripped (source states no limit) | - | **PROPOSED** | - |
| `page size` | SCR-20 | (list) | select | no | 10, 25; default 10; dead | 10, 25 | declared | see SCR-06 |
| `a-first (First Name)` | SCR-21 | App user | text | no | trimmed; max 60 | - | optional declared; max **PROPOSED** | SCR-20 required |
| `a-last (Last Name)` | SCR-21 | App user | text | no | trimmed; max 60 | - | optional declared; max **PROPOSED** | SCR-20 required |
| `a-email (Email)` | SCR-21 | App user | email | no | if present regex; max 254; unique; checked on blur NOT on save | - | optional + regex declared; max/unique **PROPOSED** | SCR-20 required and checked on save |
| `a-phone (Phone No)` | SCR-21 | App user | digit string | yes | digits only; min 7, max 15; unique (de facto identifier) | - | required + digits declared; 7-15, unique **PROPOSED** | SCR-06 mobile format |
| `a-earn (Earner Points)` | SCR-21 | App user | integer | no | min 0, max 1,000,000; default 0; empty saves as 0 | - | min 0 declared; max/integer **PROPOSED** | - |
| `a-red (Reedemed Points)` | SCR-21 | App user | integer | no | min 0, max 1,000,000; default 0; must be <= earner | - | min 0 declared; max/cross-field **PROPOSED** | - |
| `address (column)` | SCR-21 | App user | text | no | column exists, no field and no data (OQ-21-04) | - | undecided | SCR-20 has address |
| `search app users` | SCR-21 | (list) | search | no | 0-100 chars; matches masked text (source states no limit) | - | **PROPOSED** | - |
| `page size` | SCR-21 | (list) | select | no | 10, 25, 50, 100; default 10; dead | 10, 25, 50, 100 | declared | see SCR-06 |
| `cp-current` | SCR-22 | Portal user (credential) | password | yes | required, not trimmed; max 128; must equal existing password (server) | - | required declared; rest **PROPOSED** | - |
| `cp-new` | SCR-22 | Portal user (credential) | password | yes | min 12, max 128; 4 classes + symbol; must differ from current | - | declared; history/expiry/breach **PROPOSED** | Same constants as SCR-20 u-pass |
| `cp-confirm` | SCR-22 | Portal user (credential) | password | yes | required; equals New | - | declared | - |
| `profile details` | SCR-22 | Portal user | read-only text | n/a | Email itdept@ta.org.jm, Phone +1 876 555 0100, Role Administrator, Level -, Last login 2026-10-22 16:08, Status Active (all hard-coded) | Status: Active | hard-coded literal, not a declared rule | Matches no SCR-20 row (OQ-22-02) |

## Conflicts left standing

Not reconciled here; each needs a decision (see `03-open-questions.md`).

| Concept | Screen A says | Screen B says | Question |
|---|---|---|---|
| Phone number | SCR-20 and SCR-21: digits only, 7-15 (**PROPOSED**), no spaces or plus sign | SCR-06/SCR-07: `+1 876 3125290` with spaces and a country code | OQ-21-09, OQ-20-05 |
| Email required? | SCR-20, SCR-01, SCR-03: required | SCR-21: optional, checked on blur and not on save | OQ-21-08 |
| Email minimum length | SCR-01, SCR-03: 5-254 (**PROPOSED**) | SCR-20, SCR-21: max 254 only | DM-06 |
| Person name length | SCR-03: 2-100 | SCR-20: 1-60 required; SCR-21: 0-60 optional | DM-06 |
| Level | SCR-20: optional string "1", "2", "3" | SCR-07: required integer 0-3 | OQ-V-16 |
| Page-size options | SCR-06 and SCR-21: 10/25/50/100 | SCR-10/11/13: 10/25/50; SCR-20: 10/25 | OQ-V-13, OQ-20-04 |
| Search box maximum | none: the source states no limit; every list story now proposes 100 (**PROPOSED**), stated once on SCR-06 | (agreement; kept here until a value and an owner are decided) | OQ-V-26 and its cluster, DM-17 |
| Identity of the signed-in user | SCR-04, SCR-05, SCR-07: "Admin Admin" / Administrator | SCR-22: itdept@ta.org.jm, +1 876 555 0100; SCR-20 has no such row | OQ-A-23, OQ-20-10, OQ-22-02 |
| Timer values | SCR-02: resend 500 s | SCR-02 done panel: link 30 min; code lifetime undecided | OQ-A-14 |
| Password policy | SCR-20 and SCR-22 share one set of constants (12-128, four classes); owner SCR-20 | SCR-00 login and SCR-01/02 reset flow apply none; reset sets no password | OQ-22-05, OQ-A-15 |

## Identifiers

No entity in the prototype has a real identifier. Rows are addressed by array position or by a name string. A schema needs surrogate keys; the table says what the prototype uses and what a real model should.

| Entity | Identifier | Format in the prototype | Real format |
|---|---|---|---|
| Violation report | `id` shown as "S No" | integer 1..n; page 1 holds 1-10; total 23 (`VIOLATIONS_TOTAL`) | **PROPOSED** surrogate id plus a business reference number; "S No" stays a display row number |
| Category | none | array index + 1 ("S No", renumbers on delete); referenced from reports by `name` | **PROPOSED** surrogate id; `name` unique; reports and owner link by id |
| Owner | none | array index + 1; referenced from categories by `owner` name | **PROPOSED** surrogate id; `name` unique |
| Contact message | none | array index + 1; 10 rows loaded, `CONTACTS_TOTAL` 24 | **PROPOSED** surrogate id |
| Portal user | none | array index + 1; edit and delete address rows by index; email is the natural key | **PROPOSED** surrogate id; email unique (OQ-20-05) |
| App user | none | array index + 1; phone number is the de facto identifier (aria-label, toast) | **PROPOSED** surrogate id; phone unique (OQ-21-09) |
| Feedback submission | none | not stored | **PROPOSED** surrogate id |
| Badge setting | key `drivesafe_badge_name` | browser localStorage, per device | **PROPOSED** single server-side settings record (OQ-12-03) |
| Session | none | hard-coded "Admin Admin", no id | **PROPOSED** opaque session id, server-side (inferred) |
| OTP challenge | none | six boxes, accepts any 6 digits | **PROPOSED** challenge id plus hashed code (inferred) |

## Enums

Full membership, every time.

| Enum | Members | Declared where |
|---|---|---|
| violation.status | `Pending` · `Under review` · `Verified` · `Rejected` (chips amber, sky, green, red) | SCR-07 select; SCR-06 chips; `STATUSES` in data.js |
| violation.level | `0` · `1` · `2` · `3` (data.js: "severity 0-3 PROPOSED") | SCR-07 |
| portal_user.role | `Administrator` · `Violation manager` | SCR-20 |
| portal_user.level | blank · `1` · `2` · `3` (strings) | SCR-20 |
| profile.status | `Active` (the only value ever shown) | SCR-22 |
| feedback.subject | `General feedback` · `Report a problem` · `Feature request` · `Account / login issue` | SCR-03 |
| otp.mode | `login` · `reset` (internal) | SCR-02 |
| toast.type | `success` · `error` · `info` (only success used on these screens) | shell |
| password strength label | `Very weak` · `Weak` · `Fair` · `Good` · `Strong` (meter colours red, red, amber, lime, green) | SCR-20, SCR-22 |
| page size | `10` · `25` · `50` · `100` on SCR-06 and SCR-21; `10` · `25` · `50` on SCR-10/11/13; `10` · `25` on SCR-20 | each list screen (dead select everywhere) |
| violation filter owner | "All Category Owners" (empty) plus every Owner name; today only `Police` | SCR-06, refreshed from SCR-11 |
| category owner select | "No owner" (empty) plus every Owner name | SCR-10 |
| vehicle_type | seen `Taxi`, `Truck`; **no closed list defined** | SCR-06 data (DM-05) |
| category (seed names, 10) | Over-charging fares · Over Crowding · Other · Stunt riding · Breaking traffic signal · Wrong parking · Using mobile phone while driving · Breaking One way/No Entry · Speeding · Improper Over taking | SCR-10 (data, not an enum; "Other" is special-cased by reports, OQ-10-07) |

## Counters the UI displays

| Counter | Shown on | Agrees with its rows? | Evidence |
|---|---|---|---|
| Violation reports 23 | SCR-05 tile | Yes in count, but only 10 rows are loaded: equals `VIOLATIONS_TOTAL` | OQ-V-05, OQ-V-07 |
| Pending review 23 | SCR-05 tile, SCR-05 funnel, sidebar badge | **Coincidence.** Counts Pending on the loaded page (10) plus the 13 unloaded rows assumed Pending | SCR-05, OQ-V-05 |
| Verified 0, Rejected 0, Under review 0 | SCR-05 tiles and funnel | **Not trustworthy.** Computed from the loaded page only | OQ-V-05 |
| Categories 10 | SCR-05 tile | Hard-coded. Agrees with the 10 seed rows today; will not move when SCR-10 adds or deletes | OQ-V-07 |
| App users 3,123 | SCR-05 tile; SCR-21 footer | Hard-coded constant `APP_USERS_TOTAL`; not incremented when SCR-21 adds a user; 10 rows loaded | OQ-21-06 |
| Portal users 8 | SCR-05 tile | Hard-coded. SCR-20 footer is computed from the array and changes on add or delete; the tile does not | OQ-V-07, SCR-20 |
| Messages 24 | SCR-05 tile; SCR-13 info line | Hard-coded `CONTACTS_TOTAL`; only 10 rows exist, pager shows pages 1-3, pages 2-3 unreachable | OQ-13-04 |
| Showing 1 to 10 of 23 entries | SCR-06 | Static for the loaded page; after Filter reads "Showing N of 10 entries" | OQ-V-13 |
| Showing 1 to N of N entries | SCR-10, SCR-11, SCR-20 | Yes, computed from the array; stale after a search | OQ-20-06 |
| Showing 1 to 10 of 24 entries | SCR-13 | **No.** Hard-coded text over 10 rows | OQ-13-04 |
| Showing 1 to {loaded} of 3,123 entries; 313 pages | SCR-21 | **No.** Total and page count are static | OQ-21-06 |
| Sidebar badge on Manage Violation Uploads | shell | Equals Pending count (hidden at 0); recomputed after SCR-07 save | OQ-V-05 |
| OTP countdown "(500s)" | SCR-02 | Timer, not a stored value; value is suspect | OQ-A-14 |
| Toast dwell 3,500 ms | shell | Constant | - |
| Earner Points / Reedemed Points | SCR-21 | Stored directly on the app user; should be derived from a ledger (DM-08, OQ-21-10) | OQ-21-10 |

## Fields the stories could not settle

These get a nullable attribute in the model and no guessed constraint.

| Field | What is missing | Question |
|---|---|---|
| `vehicle_type` | closed list or free text | DM-05 |
| `other_description`, `location`, `notes`, `registration_no` | lengths and formats | DM-15 |
| violation `level` | meaning of 0-3 and who sets it | OQ-V-16 |
| portal user `level` | meaning of 1-3, relation to role | OQ-20-02 |
| Evidence media | file type, size, viewer, retention | OQ-V-24 |
| App user `address` | column with no field | OQ-21-04 |
| Contact reply recipient | how the reply reaches the citizen; one reply or thread; who replied | OQ-13-05 |
| Feedback destination | where it goes and whether Subject is stored | OQ-A-20 |
| Reward points | points per Verified report, once or per save | OQ-V-25 |
| Time zone of every timestamp | zone of `created_at`, `replied_at`, Last login | OQ-V-17, DM-07 |
| Username format | email or handle | OQ-A-05 |
