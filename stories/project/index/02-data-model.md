# Logical data model

Derived from `index/00-project-index.md` and `index/01-data-dictionary.md` on 2026-10-26. 14 entities (8 shown by the UI, 6 inferred) from 15 screen stories. No DDL: physical design belongs to the delivery team.

## How to read this

- The model was built from the project index's **Entities** table and the data dictionary, then checked against individual stories only where those two could not carry a lifecycle rule. Each attribute row names the story (`SCR-nn`) or the open question it came from.
- **Status** is `declared` where the prototype declared the rule, `PROPOSED` where a story proposed it. Nothing marked `PROPOSED` has been ratified. Where a field is `undecided` it is a nullable attribute with no constraint and an open question, never a guess.
- **Inferred** means no screen shows the entity but a screen's behaviour requires it. Each inferred entity names the story that requires it.
- Types are logical: `uuid`, `text`, `integer`, `boolean`, `timestamp with time zone`, `enum(...)`. A native enum where the database has one, a constrained string where it does not.
- The prototype has **no identifiers at all** (rows are addressed by array index or by name string). Every entity below therefore carries a PROPOSED surrogate `id`.
- Four facts the prototype gives that no schema can ignore: Violation.category and Category.owner are name strings, not keys (OQ-V-18, OQ-11-06); counters shown on screens are hard-coded (see the dictionary's Counters table); no screen enforces a role; the signed-in user is a hard-coded literal that matches no stored row.

## Entity overview

| Entity | What it is | Screens | Basis |
|---|---|---|---|
| Violation report | A traffic violation reported by a citizen through the mobile app; the portal reads and reviews it | SCR-05, SCR-06, SCR-07 | shown |
| Category | A kind of violation (10 seeded), optionally assigned to an owner | SCR-10, SCR-06 | shown |
| Owner | An enforcement agency responsible for categories (seed: Police) | SCR-11, SCR-10, SCR-06 | shown |
| Contact message | A message from a citizen with an optional admin reply | SCR-13 | shown |
| Portal user | A staff member who signs in (Administrator or Violation manager) | SCR-20, SCR-22, SCR-00 | shown |
| App user | A citizen registered in the mobile app, with a points balance | SCR-21, SCR-05 | shown |
| Feedback submission | An anonymous pre-login message with a subject | SCR-03 | shown, never stored |
| Badge setting | The one portal setting, the badge name on sign-in screens | SCR-12, SCR-00, SCR-01, SCR-02 | shown |
| Violation status event | One row per status or level change | SCR-07 | inferred |
| Reward ledger entry | A points credit or redemption for an app user | SCR-07, SCR-21 | inferred |
| Evidence media | Photo or video attached to a report | SCR-07 | inferred |
| Reviewer note | The free-text reason a reviewer gives with a decision | SCR-07 | inferred |
| OTP challenge | A one-time code issued for sign-in or password reset | SCR-02, SCR-01, SCR-00 | inferred |
| Session | A signed-in period for one Portal user | SCR-04, SCR-22 | inferred |

## Relationship overview

> A category may be assigned to at most one owner. An owner has zero or more categories. Deleting or renaming an owner must not leave a category pointing at a name that no longer exists. As built, the link is a name string and it does. (SCR-10, SCR-11, OQ-11-06)

> A violation report belongs to exactly one category. A category has zero or more reports. The prototype stores the category name on the report, so a rename or delete orphans the report and loses its derived owner. (SCR-06, SCR-10, OQ-V-18)

> A violation report's owner is not stored; it is derived through its category. (SCR-06)

> A violation report is raised by one app user, identified in the prototype only by a formatted mobile string that does not match the app user's phone format. The link is a proposal, not a built fact. (SCR-06, SCR-21, DM-04)

> A violation report has zero or more status events, zero or more evidence files, and at most one current reviewer note per decision. A status event is made by one portal user. None of this is stored in the prototype; it keeps only the latest status and a hard-coded `status_updated_by`. (SCR-07, inferred, DM-03)

> Verifying a report credits reward points to its reporter. The credit is a ledger entry tied to one app user and one report. The prototype toasts the promise and credits nothing. (SCR-07, SCR-21, OQ-V-25)

> A contact message has at most one reply as built, written by one portal user whom the prototype does not record. (SCR-13, OQ-13-05)

> A portal user has zero or more sessions and zero or more OTP challenges. (SCR-04, SCR-02, inferred)

| Parent | Child | Cardinality | Optionality | On delete | Made visible by |
|---|---|---|---|---|---|
| Owner | Category | 1 to 0..n | Category.owner_id nullable | **PROPOSED** block while referenced; as built, dangles | SCR-11, SCR-10 |
| Category | Violation report | 1 to 0..n | Violation report.category_id required | **PROPOSED** block while referenced; as built, orphans | SCR-10, SCR-06 |
| App user | Violation report | 1 to 0..n | reporter_id nullable (reporter link unproven) | undecided (DM-02, DM-04) | SCR-06, SCR-21 |
| Violation report | Violation status event | 1 to 0..n | inferred | cascade with report (inferred) | SCR-07 |
| Violation report | Evidence media | 1 to 0..n | inferred | undecided (OQ-V-24) | SCR-07 |
| Violation status event | Reviewer note | 1 to 0..1 | note required when status = Rejected (**PROPOSED**) | cascade | SCR-07 |
| Portal user | Violation status event | 1 to 0..n | actor_id required (inferred) | never hard-deleted (**PROPOSED**) | SCR-07, SCR-20 |
| App user | Reward ledger entry | 1 to 0..n | inferred | undecided | SCR-21, SCR-07 |
| Violation report | Reward ledger entry | 1 to 0..1 | entry optional; one credit per Verified report (**PROPOSED**) | restrict | SCR-07 |
| Portal user | Contact message reply | 1 to 0..n | replied_by nullable (not recorded as built) | restrict | SCR-13 |
| Portal user | Session | 1 to 0..n | inferred | cascade | SCR-04 |
| Portal user | OTP challenge | 1 to 0..n | inferred; reset challenge keyed by email | cascade | SCR-02, SCR-01 |

## Entities

### Violation report

Source: SCR-06 (list columns), SCR-07 (detail, edit), SCR-05 (counts and latest five). Lifecycle: `Pending` to `Under review` to `Verified` or `Rejected` (**PROPOSED** forward-only; the prototype allows any change, OQ-V-22). Created by the citizen app, outside the portal.

| Attribute | Type | Required | Constraint | Source | Status |
|---|---|---|---|---|---|
| id | uuid | yes | primary key; displayed as "S No" 1..n | SCR-06 | PROPOSED (surrogate; prototype uses integer 1..n) |
| reporter_mobile | text | undecided (no source states a rule) | `+1 876 3125290` form as received; masked in lists, shown full on SCR-07 | SCR-06, SCR-07 | format shown only, no rule declared |
| reporter_id | uuid | no | FK to App user; link unproven | DM-04 | PROPOSED |
| vehicle_type | text | yes | seen Taxi, Truck; no list | SCR-06, DM-05 | undecided |
| category_id | uuid | yes | FK to Category; prototype stores the name | SCR-06, OQ-V-18 | PROPOSED |
| other_description | text | only when category is Other | no length | SCR-06, DM-15 | undecided |
| location | text | yes | address or plus-code, no length | SCR-06, DM-15 | undecided |
| notes | text | no | no length | SCR-06, DM-15 | undecided |
| registration_no | text | no | plate; often blank | SCR-06, DM-15 | undecided |
| created_at | timestamp with time zone | yes | `YYYY-MM-DD HH:mm:ss` in the prototype, zone unknown | SCR-06, OQ-V-17, DM-07 | declared (format) |
| status | enum(Pending, Under review, Verified, Rejected) | yes | default Pending | SCR-07 | declared |
| level | integer | yes | min 0, max 3; at least 1 when Verified | SCR-07, OQ-V-16 | declared range; Verified rule PROPOSED |
| status_updated_by | uuid | no | FK to Portal user; prototype stores the text "-" or "Admin Admin" | SCR-06, SCR-07, OQ-A-23 | PROPOSED (reference); text declared |

Keys: primary `id`. Derived, not stored: owner (through category), S No. Constraints: status transition rules and level >= 1 on Verified are **PROPOSED**. Roughly half the table is undecided free text.

### Category

Source: SCR-10. Created, edited and deleted on SCR-10; read by SCR-06 and by the Owner column derivation.

| Attribute | Type | Required | Constraint | Source | Status |
|---|---|---|---|---|---|
| id | uuid | yes | primary key | SCR-10 | PROPOSED |
| name | text | yes | trimmed, 1-60; `<>` stripped; case-insensitive unique | SCR-10 | required and max 60 declared; uniqueness PROPOSED |
| description | text | yes | trimmed, 1-150 | SCR-10 | declared |
| owner_id | uuid | no | FK to Owner; prototype stores the owner name or "" | SCR-10, OQ-11-06 | PROPOSED (reference) |

Special case: the category named `Other` makes reports use `other_description`; protecting it from rename and delete is undecided (OQ-10-07). Ordering is undecided (OQ-10-09).

### Owner

Source: SCR-11. Created, edited and deleted on SCR-11; read by SCR-10 and the SCR-06 filter.

| Attribute | Type | Required | Constraint | Source | Status |
|---|---|---|---|---|---|
| id | uuid | yes | primary key | SCR-11 | PROPOSED |
| name | text | yes | trimmed, 1-60; case-insensitive unique | SCR-11 | required and max declared; uniqueness PROPOSED |
| description | text | yes | trimmed, 1-150 | SCR-11 | declared |

Owner has no contact details or users, so nothing can route a report to anyone (OQ-11-01, DM-14).

### Contact message

Source: SCR-13. Created by the citizen app; replied to on SCR-13.

| Attribute | Type | Required | Constraint | Source | Status |
|---|---|---|---|---|---|
| id | uuid | yes | primary key | SCR-13 | PROPOSED |
| sender_name | text | yes | as sent, no portal rule | SCR-13 | undecided |
| sender_email | text | yes | as sent; shown unmasked | SCR-13, OQ-13-07 | undecided |
| message | text | yes | as sent | SCR-13 | undecided |
| created_at | timestamp with time zone | yes | system generated | SCR-13 | declared (format) |
| response | text | no | trimmed, 1-1000 when present; empty when unanswered | SCR-13 | required on reply declared; max 1000 PROPOSED |
| replied_at | timestamp with time zone | no | set when a reply is saved; prototype uses browser clock | SCR-13 | declared |
| replied_by | uuid | no | FK to Portal user; not recorded as built | SCR-13, OQ-13-05 | PROPOSED |

A reply overwrites the previous one with no history; thread versus single reply is undecided (OQ-13-05). The reply sends nothing. Constraints on the sender fields come from the citizen app, which is outside this set.

### Portal user

Source: SCR-20 (admin list and dialog), SCR-22 (own profile), SCR-00 (sign-in). Created, edited and deleted on SCR-20.

| Attribute | Type | Required | Constraint | Source | Status |
|---|---|---|---|---|---|
| id | uuid | yes | primary key | SCR-20 | PROPOSED |
| username | text | undecided | sign-in identifier typed on Login; 3-254 chars, trimmed; may be the same value as email (the Forgot-password screen asks for an email); unique if kept | SCR-00, OQ-A-05 | PROPOSED (no rule declared); existence undecided |
| first_name | text | yes | trimmed, 1-60; Unicode letters, space, hyphen, apostrophe | SCR-20 | required declared; length and charset PROPOSED |
| last_name | text | yes | trimmed, 1-60 | SCR-20 | required declared; length PROPOSED |
| email | text | yes | regex `^\S+@\S+\.\S+$`; max 254; lower-cased; unique case-insensitive | SCR-20 | regex declared; max and unique PROPOSED |
| phone | text | yes | digits only; 7-15 | SCR-20, OQ-20-05 | digits declared; 7-15 PROPOSED |
| address | text | no | max 200 | SCR-20 | optional declared; max PROPOSED |
| role | enum(Administrator, Violation manager) | yes | exactly one | SCR-20 | declared |
| level | enum('1','2','3') | no | blank, 1, 2 or 3; meaning undecided (OQ-20-02) | SCR-20 | options declared; semantics PROPOSED |
| password_hash | text | yes | policy applies to the plaintext: length 12-128 plus at least one of each of four classes (upper, lower, digit, symbol), five rules in all; never stored in plaintext | SCR-20, SCR-22, DM-10 | policy declared; hash inferred |
| status | enum(Active) | yes | only Active is ever shown; no screen sets or changes it | SCR-22 | hard-coded literal, not a declared rule (OQ-22-02) |
| last_login_at | timestamp with time zone | no | shown on profile as the literal `2026-10-22 16:08`; nothing writes it | SCR-22, OQ-22-02 | hard-coded literal, not a declared rule |
| deleted_at | timestamp with time zone | no | soft delete | DM-02, SCR-20 | PROPOSED |

Constraints: cannot delete yourself or the last Administrator (**PROPOSED**, server-side, OQ-20-08). The signed-in "Admin Admin" with email itdept@ta.org.jm exists in no row of SCR-20 (OQ-20-10, OQ-22-02). Seed row 4's email `@mail.com` fails the regex (OQ-20-11). Password plaintext never persists.

### App user

Source: SCR-21. Created and edited on SCR-21, no delete; counted on SCR-05.

| Attribute | Type | Required | Constraint | Source | Status |
|---|---|---|---|---|---|
| id | uuid | yes | primary key | SCR-21 | PROPOSED |
| first_name | text | no | trimmed, max 60 | SCR-21 | optional declared; max PROPOSED |
| last_name | text | no | trimmed, max 60 | SCR-21 | optional declared; max PROPOSED |
| email | text | no | regex if present; max 254; unique; the prototype does not check it on save | SCR-21, OQ-21-08 | regex declared; max and unique PROPOSED |
| phone | text | yes | digits only; 7-15; unique; de facto identifier | SCR-21, OQ-21-09 | digits declared; 7-15 and unique PROPOSED |
| earner_points | integer | no | min 0, max 1,000,000; default 0 | SCR-21, OQ-21-10 | min declared; max PROPOSED; derived from ledger (DM-08) |
| redeemed_points | integer | no | min 0, max 1,000,000; default 0; not above earner_points | SCR-21 | min declared; max and cross-field PROPOSED |
| address | text | no | column with no field and no data | SCR-21, OQ-21-04 | undecided |

Counter: the UI shows 3,123 users while 10 rows are loaded, a hard-coded constant. No delete or deactivate exists (OQ-21-03).

### Feedback submission

Source: SCR-03. The form posts nothing in the prototype and no screen reads it; an entity with a writer and no reader (OQ-A-20, DM-12).

| Attribute | Type | Required | Constraint | Source | Status |
|---|---|---|---|---|---|
| id | uuid | yes | primary key | SCR-03 | PROPOSED |
| name | text | yes | trimmed, 2-100 | SCR-03 | required declared; length PROPOSED |
| email | text | yes | regex; 5-254 | SCR-03 | regex declared; length PROPOSED |
| subject | enum(General feedback, Report a problem, Feature request, Account / login issue) | yes | default General feedback | SCR-03 | declared |
| message | text | yes | trimmed, 10-1000 | SCR-03 | required and max 1000 declared; min 10 PROPOSED |
| created_at | timestamp with time zone | yes | system | SCR-03 | inferred |

### Badge setting

Source: SCR-12, read by SCR-00, SCR-01, SCR-02. One record; held in browser localStorage in the prototype (OQ-12-03).

| Attribute | Type | Required | Constraint | Source | Status |
|---|---|---|---|---|---|
| badge_name | text | yes | trimmed, 1-100; `<>` stripped | SCR-12 | required declared; max 100 PROPOSED |
| updated_at | timestamp with time zone | no | system | SCR-12 | inferred |
| updated_by | uuid | no | FK to Portal user | SCR-12, OQ-12-04 | PROPOSED |

## Inferred entities

Each is real, has no screen, and is required by the story named. All attributes are **PROPOSED** unless a story declares them.

| Attribute | Type | Required | Constraint | Source | Status |
|---|---|---|---|---|---|
| **Violation status event** | | | | | |
| id | uuid | yes | primary key | inferred (SCR-07) | PROPOSED |
| violation_id | uuid | yes | FK to Violation report | SCR-07, OQ-V-23 | PROPOSED |
| from_status, to_status | enum(Pending, Under review, Verified, Rejected) | yes | to_status must be a legal transition | SCR-07, OQ-V-22 | PROPOSED |
| from_level, to_level | integer | yes | min 0, max 3 | SCR-07 | PROPOSED |
| actor_id | uuid | yes | FK to Portal user | SCR-07, OQ-A-23 | PROPOSED |
| occurred_at | timestamp with time zone | yes | system | SCR-07, DM-03 | PROPOSED |
| **Reviewer note** | | | | | |
| id | uuid | yes | primary key | inferred (SCR-07) | PROPOSED |
| status_event_id | uuid | yes | FK to Violation status event | SCR-07, OQ-V-21 | PROPOSED |
| body | text | yes when to_status is Rejected | 0-500, trimmed, `<>` stripped | SCR-07 | PROPOSED (stripping declared) |
| **Evidence media** | | | | | |
| id | uuid | yes | primary key | inferred (SCR-07) | PROPOSED |
| violation_id | uuid | yes | FK to Violation report | SCR-07, OQ-V-24 | PROPOSED |
| kind | enum(photo, video) | yes | from README text | SCR-07 | PROPOSED |
| storage_ref, size_bytes, content_type | text, integer, text | yes | no limits decided | OQ-V-24, DM-16 | undecided |
| **Reward ledger entry** | | | | | |
| id | uuid | yes | primary key | inferred (SCR-07, SCR-21) | PROPOSED |
| app_user_id | uuid | yes | FK to App user | SCR-21 | PROPOSED |
| violation_id | uuid | no | FK to Violation report; one credit per Verified report | SCR-07, OQ-V-25 | PROPOSED |
| points | integer | yes | positive credit or redemption; amount undecided | OQ-V-25, OQ-21-10 | undecided |
| kind | enum(earned, redeemed, manual adjustment) | yes | manual adjustments come from SCR-21 edits | SCR-21 | PROPOSED |
| **OTP challenge** | | | | | |
| id | uuid | yes | primary key | inferred (SCR-02) | PROPOSED |
| purpose | enum(login, reset) | yes | the otp mode | SCR-02 | declared |
| portal_user_id | uuid | no | FK to Portal user; null when the email is unknown (OQ-A-11) | SCR-01, SCR-02 | PROPOSED |
| code_hash | text | yes | 6 digits when issued, never stored in clear | SCR-02 | PROPOSED |
| issued_at, expires_at | timestamp with time zone | yes | lifetime e.g. 10 minutes (undecided); reset link 30 minutes | SCR-02, OQ-A-13, OQ-A-14 | PROPOSED |
| attempts | integer | yes | min 0, max 5 | SCR-02, OQ-A-13 | PROPOSED |
| **Session** | | | | | |
| id | uuid | yes | primary key; opaque | inferred (SCR-04) | PROPOSED |
| portal_user_id | uuid | yes | FK to Portal user | SCR-04, OQ-A-23 | PROPOSED |
| started_at, last_seen_at | timestamp with time zone | yes | idle timeout 30 minutes | SCR-04, OQ-A-25 | PROPOSED |
| revoked_at | timestamp with time zone | no | set by Logout or by password change | SCR-04, SCR-22, OQ-22-07 | PROPOSED |

Entities the prototype implies and the product named in no UI word: an audit log (every OQ-V-23, OQ-V-19 reveal, OQ-20-03 export) is not modelled separately; the status event table is its only member until the answer to OQ-V-19 says reveals are logged too.

## Constraints that span entities

- Redeemed points must not exceed earned points (**PROPOSED**, SCR-21). If points move to a ledger (DM-08) this becomes a sum rule.
- Category name and Owner name unique, case-insensitive (**PROPOSED**, SCR-10, SCR-11).
- Status Verified requires level >= 1 (**PROPOSED**, SCR-07) and credits one ledger entry (OQ-V-25).
- A Rejected status requires a reviewer note (**PROPOSED**, SCR-07).
- A portal user cannot delete itself nor the last Administrator (**PROPOSED**, SCR-20).
- Timestamps: every `timestamp with time zone` above is stored UTC and displayed in a zone to be named (DM-07, OQ-V-17); the prototype shows none.
- Tenancy: single organisation assumed, no organisation key (DM-01).
- Soft versus hard delete: soft delete assumed for every referenced entity (DM-02).

A note on how provisional this is: about half of the constrained attributes above are PROPOSED, because the prototype declares very few rules and the stories had to propose the rest. Treat the PROPOSED rows as the stakeholder review list.

## Open questions

The full triaged list is `index/03-open-questions.md`. The ones that change the model most: DM-04 (reporter link), DM-03 (history), DM-08 (stored versus computed counters, points ledger), DM-01 (tenancy), DM-02 (deletion), DM-12 (Feedback and Contact as one entity), OQ-V-18 and OQ-11-06 (name strings versus keys), OQ-A-05 (what Portal user is signed in by), OQ-20-05 and OQ-21-09 (phone format), OQ-V-16 (level), OQ-V-24 (evidence).
