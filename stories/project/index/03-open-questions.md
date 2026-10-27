# Open questions

All 121 distinct question ids found by grep in the 15 screen stories (ids kept, no renumbering; re-derived by grep after review round 2) plus 17 questions the data model raised (`DM-` ids). Total 138. The stories' own ids are `OQ-A-` (Auth, 29 ids, A-00 to A-28), `OQ-V-` (Violations, 27, V-00 to V-26), `OQ-10-` to `OQ-13-` (Catalogue and Contact, 10+8+5+9) and `OQ-20-` to `OQ-22-` (Users, 13+13+7).

## How it is triaged

| Severity | Meaning |
|---|---|
| **blocking** | The answer sets a contract more than one screen must obey, or its absence permits a security or evidence incident. Build should not start on the affected area without it. |
| **costly (should-resolve)** | Wrong guess is expensive to undo but contained to one screen or one entity. Resolve before that screen's build. |
| **noise (nice-to-know)** | Copy, polish, accessibility refinements. Do not spend a sprint on these. |

Owner is the role that must decide. "What happens meanwhile" is what the build assumes if nobody answers; it is a placeholder and is not a decision.

## Counts

| Severity | Story questions | DM questions | Total |
|---|---|---|---|
| blocking | 40 | 8 | 48 |
| costly (should-resolve) | 58 | 8 | 66 |
| noise (nice-to-know) | 23 | 1 | 24 |
| **all** | 121 | 17 | 138 |

## Clusters (one decision answers several ids)

| Cluster | Ids answered together | Severity | Owner |
|---|---|---|---|
| ROLES | OQ-A-27, OQ-V-00, OQ-V-03, OQ-10-03, OQ-11-03, OQ-12-04, OQ-13-03, OQ-20-02, OQ-21-02 | blocking | Product owner + Security lead |
| LEVEL | OQ-V-16 | blocking | Product owner |
| EXPORT-PII | OQ-V-12, OQ-20-03, OQ-21-05 | blocking | Data protection officer |
| LISTSCOPE | OQ-V-11, OQ-V-13, OQ-10-04, OQ-11-04, OQ-13-04, OQ-20-04, OQ-21-06 | costly (should-resolve) | Product owner + UX designer |
| STATES | OQ-A-02, OQ-V-01, OQ-V-02, OQ-V-09, OQ-V-10, OQ-10-02, OQ-11-02, OQ-13-02, OQ-20-06, OQ-20-07, OQ-21-07, OQ-22-03 | costly (should-resolve) | UX designer |
| REFINT | OQ-V-18, OQ-10-06, OQ-10-07, OQ-11-06, OQ-11-07 | blocking | Architect + Product owner |
| IDENTITY | OQ-A-23, OQ-20-10, OQ-22-02, OQ-V-23 | blocking | Architect + Security lead |
| PWPOLICY | OQ-22-04, OQ-22-05 | costly (should-resolve) | Security lead |
| PHONE | OQ-20-05, OQ-21-09 | blocking | Product owner + Architect |
| POINTS | OQ-V-25, OQ-21-10 | blocking | Business sponsor + Product owner |
| FEEDBACK-CONTACT | OQ-A-20, OQ-13-05 | blocking | Product owner |
| SEARCHMAX | OQ-V-26, OQ-10-10, OQ-11-08, OQ-13-09, OQ-20-12, OQ-21-12 | noise (nice-to-know) | UX designer |
| DELETE | OQ-10-05, OQ-11-05, OQ-20-08, OQ-21-03 | costly (should-resolve) | Product owner + UX designer |

## The questions that cost most, by module

| Module | Most expensive question |
|---|---|
| Authentication and entry | OQ-A-15: the reset link lands on a set-new-password page that does not exist; password reset cannot complete (blocking) |
| Violations | OQ-V-05 / DM-08: dashboard counts computed from one loaded page of 10 of 23 reports; OQ-V-25: reward points on Verified are undefined |
| Catalogue | OQ-10-06 / OQ-11-06: rename or delete silently orphans reports and categories because links are name strings |
| Contact | OQ-13-05: Reply sends nothing and records no replier; delivery channel undefined |
| Users | OQ-20-02 / OQ-21-02: no role is enforced anywhere, any signed-in user can edit admins; OQ-21-03: no erasure path for citizens |

## Full list

Blocking first, then costly, then noise.

| ID | Question | Affects | Severity | Owner | Cluster | What happens meanwhile | Story |
|---|---|---|---|---|---|---|---|
| OQ-10-03 | Do Violation managers (role in User Management) get this screen? | permissions | blocking | Product owner + Security lead | ROLES | Build every screen behind one permission check with no matrix filled in; do not hard-code either role's rights | SCR-10 |
| OQ-10-06 | What happens to reports that reference a category on rename or delete? Reports hold a name string, not an id | data model | blocking | Architect + Product owner | REFINT | Model Category.owner_id and Violation.category_id as keys; block delete while referenced (the safest reading) | SCR-10 |
| OQ-10-07 | Should names be unique (case-insensitive)? Is "Other" a protected system category (reports use `otherDescription` when category is Other)? | validation, delete | blocking | Architect + Product owner | REFINT | Enforce case-insensitive unique category names; protect 'Other' from rename and delete (PROPOSED) | SCR-10 |
| OQ-11-03 | Which roles may manage owners? | permissions | blocking | Product owner + Security lead | ROLES | Build every screen behind one permission check with no matrix filled in; do not hard-code either role's rights | SCR-11 |
| OQ-11-06 | Owner delete/rename: block, cascade to categories, or leave dangling? Owner is stored as a name string in categories | data model | blocking | Architect + Product owner | REFINT | Model Category.owner_id and Violation.category_id as keys; block delete while referenced (the safest reading) | SCR-11 |
| OQ-11-07 | Unique owner names? | validation | blocking | Architect + Product owner | REFINT | Enforce case-insensitive unique owner names (PROPOSED) | SCR-11 |
| OQ-12-03 | Where is the value stored: localStorage means per browser; production needs a server value visible to unauthenticated users | data | blocking | Architect | - | Store the badge name server-side, readable before sign-in | SCR-12 |
| OQ-12-04 | Which roles may change it? | permissions | blocking | Product owner + Security lead | ROLES | Build every screen behind one permission check with no matrix filled in; do not hard-code either role's rights | SCR-12 |
| OQ-13-03 | Which roles see this? | permissions | blocking | Product owner + Security lead | ROLES | Build every screen behind one permission check with no matrix filled in; do not hard-code either role's rights | SCR-13 |
| OQ-13-05 | How does the reply reach the citizen (email, push, in-app)? One reply or a thread? Is the replying admin recorded? | reply, data model | blocking | Product owner | FEEDBACK-CONTACT | Store the reply and its author; send nothing until a channel is chosen | SCR-13 |
| OQ-20-02 | What does Role grant, and what does Level (1–3) mean? Is Level only for Violation managers? Does Level relate to the violation Level 0–3 on the review modal? Can a Violation manager open this screen at all? | Role, Level, access control | blocking | Product owner + Security lead | ROLES | Build every screen behind one permission check with no matrix filled in; do not hard-code either role's rights | SCR-20 |
| OQ-20-03 | Are CSV, Excel and Print wanted on a list of staff personal data? If so: what columns, who may export, and is it audited? | toolbar | blocking | Data protection officer | EXPORT-PII | Do not build CSV, Excel or Print; leave the buttons out rather than ship a PII export | SCR-20 |
| OQ-20-05 | Email and Phone uniqueness, case rule, international phone format (seed mixes `123456789` and `18763831676`) | Email, Phone | blocking | Product owner + Architect | PHONE | Store phone as digits plus a separate country code; display the +1 876 form | SCR-20 |
| OQ-20-10 | The signed-in "Admin Admin" (header, Profile: itdept@ta.org.jm) is not a row in this list. Where does the signed-in identity come from, and may a user edit or delete their own row? | Profile, header | blocking | Architect + Security lead | IDENTITY | Treat the signed-in user as a Portal user row; stamp status_updated_by from the session | SCR-20 |
| OQ-21-02 | Which roles may view or edit app users (Violation manager too)? | access | blocking | Product owner + Security lead | ROLES | Build every screen behind one permission check with no matrix filled in; do not hard-code either role's rights | SCR-21 |
| OQ-21-05 | Are CSV/Excel/Print wanted for citizen phone numbers, and who may unmask? | toolbar | blocking | Data protection officer | EXPORT-PII | Do not build CSV, Excel or Print; leave the buttons out rather than ship a PII export | SCR-21 |
| OQ-21-09 | Phone format: digits only here, `+1 876 …` on Violations. Country code rule, uniqueness, and is phone the identifier? | Phone, SCR Violations | blocking | Product owner + Architect | PHONE | Store phone as digits plus a separate country code; display the +1 876 form | SCR-21 |
| OQ-21-10 | May admins edit points? Max points? Must redeemed be ≤ earned? How are points awarded when a report is Verified (and how many)? | points fields | blocking | Business sponsor + Product owner | POINTS | Do not credit points on Verified; keep both counters editable only on SCR-21 within 0-1,000,000 | SCR-21 |
| OQ-22-02 | Where do the displayed values come from? The details are hard-coded and match no row in SCR-20 (the person "Admin Admin" is not in the 8 seed users). What are the real source, the "Active" states, and what is "Last login" (UTC or local)? | details card, header, sidebar | blocking | Architect + Security lead | IDENTITY | Treat the signed-in user as a Portal user row; stamp status_updated_by from the session | SCR-22 |
| OQ-A-01 | What are the credential and empty-field behaviours? Prototype never validates | LOGIN | blocking | Product owner + Security lead | - | Credential check is server-side only; show one generic error | SCR-00 |
| OQ-A-03 | Lockout/throttle policy after failed attempts? | LOGIN | blocking | Security lead | - | Throttle per account and IP at the server; numbers undecided | SCR-00 |
| OQ-A-05 | Is Username an email address or free handle? | Username, SCR-01 | blocking | Product owner + Architect | - | Accept either, look up by email; one unique login column | SCR-00 |
| OQ-A-11 | Email unknown to the system: does the user still advance to SCR-02? | SCR-01, SCR-02 | blocking | Security lead | - | Always advance to the code screen and reveal nothing | SCR-01 |
| OQ-A-12 | What happens on a wrong code? Prototype accepts any 6 digits | Verify | blocking | Security lead | - | Reject wrong codes with the PROPOSED message | SCR-02 |
| OQ-A-13 | Code lifetime, expiry message, attempt limit | Verify | blocking | Security lead | - | 10 minutes and 5 attempts as PROPOSED | SCR-02 |
| OQ-A-15 | Where does the reset link land, and what does the set-new-password page look like? The password policy (12-128 chars, upper, lower, digit, symbol) exists on the Profile screen only | Reset flow | blocking | Product owner + UX designer | - | Reset-link landing page is unbuilt scope; the flow cannot complete without it | SCR-02 |
| OQ-A-20 | Where does feedback go, and is Subject stored? Contact Us list has no Subject | Data model | blocking | Product owner | FEEDBACK-CONTACT | Build Feedback submission as its own entity with a subject; merge later if answered 'same' | SCR-03 |
| OQ-A-23 | Signed-in name and role are hard-coded "Admin Admin"/"Administrator"; source of truth? Also every review is stamped "Admin Admin" | header, sidebar, SCR-07 | blocking | Architect + Security lead | IDENTITY | Treat the signed-in user as a Portal user row; stamp status_updated_by from the session | SCR-04 |
| OQ-A-27 | Role differences: README names Administrator and Violation manager (data.js) but the shell shows the same menu and nav for both | Shell | blocking | Product owner + Security lead | ROLES | Build every screen behind one permission check with no matrix filled in; do not hard-code either role's rights | SCR-04 |
| OQ-V-00 | No spec beyond README; what are the intended roles and what does each see? | Whole module | blocking | Product owner + Security lead | ROLES | Build every screen behind one permission check with no matrix filled in; do not hard-code either role's rights | SCR-05 |
| OQ-V-03 | Does a Violation manager at level 1/2/3 see all reports or only theirs? Level exists on users and reports | Dashboard, SCR-06 | blocking | Product owner + Security lead | ROLES | Every signed-in user sees every report; level scoping not built | SCR-05 |
| OQ-V-05 | Verified/Rejected/Under review counts cover only the loaded page, while Pending adds the unloaded 13. Real counts must be server-side | Tiles, funnel | blocking | Architect | - | Compute every count server-side from all rows | SCR-05 |
| OQ-V-12 | CSV, Excel, Print: should they export filtered rows, current columns, full phone numbers or masked? Exporting unmasked numbers defeats masking | Toolbar | blocking | Data protection officer | EXPORT-PII | Do not build CSV, Excel or Print; leave the buttons out rather than ship a PII export | SCR-06 |
| OQ-V-16 | Level 0-3: meaning, who sets it, relation to admin-user level 1-3 | Level column | blocking | Product owner | LEVEL | Store violation level as integer 0-3 and portal-user level as nullable; attach no behaviour to either | SCR-06 |
| OQ-V-18 | Category is stored as a name string on the report: rename/delete orphans reports. Use an id? | Category column, data model | blocking | Architect + Product owner | REFINT | Store category_id on the report; keep the name as display only | SCR-06 |
| OQ-V-19 | Who may reveal full phone numbers, and is each reveal audited? Prototype lets anyone, unlogged | Mask toggle | blocking | Data protection officer + Security lead | - | Reveal permitted for Administrator only and every reveal audit-logged (PROPOSED) | SCR-06 |
| OQ-V-22 | Allowed status transitions and who may reverse a decision | Status | blocking | Product owner | - | Enforce PROPOSED forward-only transitions | SCR-07 |
| OQ-V-23 | Audit: record who/when/old-value/new-value; prototype only keeps latest "Admin Admin" | Data model | blocking | Architect + Security lead | IDENTITY | Append-only status event table (who, when, from, to) | SCR-07 |
| OQ-V-24 | Evidence photo/video: type, size, viewer, retention | Evidence box | blocking | Security lead + Data protection officer | - | Placeholder only; media storage is not designed | SCR-07 |
| OQ-V-25 | Verified credits points (toast says so, footnote says "concept"): how many, to which App user, once or on each re-save? Full mobile shown unmasked here | Save, Mobile row | blocking | Business sponsor + Product owner | POINTS | Do not credit points on Verified; keep both counters editable only on SCR-21 within 0-1,000,000 | SCR-07 |
| OQ-10-02 | Empty, loading and error states are absent; what should an empty list show? | list | costly (should-resolve) | UX designer | STATES | Use one shared empty, loading and error pattern; confirm copy later | SCR-10 |
| OQ-10-04 | Are CSV, Excel, Print, page-size select and pagination in scope? What do they export (filtered rows? columns)? | toolbar, footer | costly (should-resolve) | Product owner + UX designer | LISTSCOPE | Build server paging with the page size the owner picks first; keep the select out until decided | SCR-10 |
| OQ-10-05 | Replace native `confirm()` with a designed dialog? Should it warn about N linked reports? | delete | costly (should-resolve) | Product owner + UX designer | DELETE | Designed confirm dialog naming the number of linked reports (PROPOSED) | SCR-10 |
| OQ-10-09 | Is category order meaningful (display order in the mobile app)? | list | costly (should-resolve) | Product owner | - | Order categories by name | SCR-10 |
| OQ-11-01 | No spec beyond README: are owners meant to be only a name and description (no contact email, no users)? | model | costly (should-resolve) | Product owner | - | Owner is name plus description only | SCR-11 |
| OQ-11-02 | Empty/loading/error states undefined | list | costly (should-resolve) | UX designer | STATES | Use one shared empty, loading and error pattern; confirm copy later | SCR-11 |
| OQ-11-04 | CSV, Excel, Print, page size, pagination in scope? | toolbar | costly (should-resolve) | Product owner + UX designer | LISTSCOPE | Build server paging with the page size the owner picks first; keep the select out until decided | SCR-11 |
| OQ-11-05 | Replace native confirm with a designed dialog; warn when categories use the owner? | delete | costly (should-resolve) | Product owner + UX designer | DELETE | Designed confirm dialog naming the number of linked categories (PROPOSED) | SCR-11 |
| OQ-12-02 | The required message is never displayed (no error element); fix in build? (Enter already submits via the default button.) | validation | costly (should-resolve) | UX designer | - | Show the required message | SCR-12 |
| OQ-13-01 | No spec: is replying by the admin the whole function, or are status, assignment and deletion needed? | scope | costly (should-resolve) | Product owner | - | Reply-only scope as built | SCR-13 |
| OQ-13-02 | Empty/loading/error states? | list | costly (should-resolve) | UX designer | STATES | Use one shared empty, loading and error pattern; confirm copy later | SCR-13 |
| OQ-13-04 | CSV/Excel/Print, page size and pagination (24 messages over 3 pages)? | list | costly (should-resolve) | Product owner + UX designer | LISTSCOPE | Build server paging with the page size the owner picks first; keep the select out until decided | SCR-13 |
| OQ-13-07 | Is the sender email PII to mask like the violations Mobile column? | list | costly (should-resolve) | Data protection officer | - | Show the email unmasked, as built | SCR-13 |
| OQ-20-01 | No specification was supplied. Is the portal-user model (name, email, phone, address, role, level) the intended one, and are these the only two roles? | whole screen | costly (should-resolve) | Product owner | - | Use the six listed fields | SCR-20 |
| OQ-20-04 | Server-side paging and the "Show entries" select (10, 25 here; 10/25/50/100 on app users): why do they differ, and what is the real page size? | footer | costly (should-resolve) | Product owner + UX designer | LISTSCOPE | Build server paging with the page size the owner picks first; keep the select out until decided | SCR-20 |
| OQ-20-06 | Empty and no-match states: what message, and should the footer count follow the search? | table | costly (should-resolve) | UX designer | STATES | Use one shared empty, loading and error pattern; confirm copy later | SCR-20 |
| OQ-20-07 | Loading and error states for list and save (network failure, server validation rejection)? | all | costly (should-resolve) | UX designer | STATES | Use one shared empty, loading and error pattern; confirm copy later | SCR-20 |
| OQ-20-08 | Reset password: who receives the link, what expiry, is it audited, is confirmation required? And should Delete be a soft delete, with an audit entry and protection against deleting yourself or the last Administrator? | 🔒 and 🗑 | costly (should-resolve) | Product owner + UX designer | DELETE | Soft delete; block deleting yourself or the last Administrator (PROPOSED); reset stays a toast | SCR-20 |
| OQ-20-11 | Seed row 4 has email `@mail.com`, which the declared regex rejects. Is invalid legacy data to be migrated, or is the regex too strict? | Email, Edit | costly (should-resolve) | Architect | - | Migrate invalid legacy email as null and require a fix on next edit | SCR-20 |
| OQ-20-13 | Option column is off-screen below ~1,570 px and focus is lost to BODY after Edit-Save. Pin the Option column / return focus to the row's ✎? | Table, dialog | costly (should-resolve) | UX designer | - | Pin the Option column and return focus to the row edit button | SCR-20 |
| OQ-21-01 | No spec: what is an app user's full record (the live portal shows name, email, phone, address, points)? Which fields come from the app and which may admins edit? | whole screen | costly (should-resolve) | Product owner | - | Model the fields in the dialog plus nullable address | SCR-21 |
| OQ-21-03 | Why is there no Delete, block or deactivate? Are admin-created app users meant to exist? Data-subject erasure requests need a path | actions | costly (should-resolve) | Product owner + UX designer | DELETE | No delete or deactivate; erasure handled outside the portal until decided | SCR-21 |
| OQ-21-04 | The Address column has no field and no data. Remove it, or add the field to the dialog and the record? | table, dialog | costly (should-resolve) | UX designer | - | Drop the empty Address column | SCR-21 |
| OQ-21-06 | Real paging, page-size options and search over 3,123 users (search currently covers 10 rows and cannot match masked phones). Empty/no-match messages? | footer, search | costly (should-resolve) | Product owner + UX designer | LISTSCOPE | Build server paging with the page size the owner picks first; keep the select out until decided | SCR-21 |
| OQ-21-07 | Loading and error states for list and save? | all | costly (should-resolve) | UX designer | STATES | Use one shared empty, loading and error pattern; confirm copy later | SCR-21 |
| OQ-21-08 | Email is validated on blur but not on Save. Intended? Should Email be required? | Email | costly (should-resolve) | Product owner | - | Validate email on save too | SCR-21 |
| OQ-21-11 | The ✎ aria-label and the success toast reveal the full phone number although the table masks it. Intentional? | privacy | costly (should-resolve) | Data protection officer | - | Mask the phone in aria-label and toast | SCR-21 |
| OQ-21-13 | Focus is lost to BODY after Edit-Save. Return focus to the row's ✎ (or the row)? | Dialog | costly (should-resolve) | UX designer | - | Return focus to the row edit button after Save | SCR-21 |
| OQ-22-01 | No spec: is Profile intended to be read-only plus password change only, or should users edit name, phone and email? | whole screen | costly (should-resolve) | Product owner | - | Read-only plus password change | SCR-22 |
| OQ-22-03 | Failure states: wrong current password, lockout after repeated failures, network error, session expiry mid-submit | Update password | costly (should-resolve) | UX designer | STATES | Use one shared empty, loading and error pattern; confirm copy later | SCR-22 |
| OQ-22-04 | Password policy: confirm 12–128 and five classes; add history, expiry, breached-list, no-name rules? Is the symbol set the stated one, and should non-ASCII letters count? | New password, SCR-20 | costly (should-resolve) | Security lead | PWPOLICY | Apply the SCR-20 constants (12-128, four classes) to every password path | SCR-22 |
| OQ-22-05 | Forgot-password and login set no password in the prototype. Does the same policy apply to reset? Is a new password forced on first login for accounts created in SCR-20? | auth flow, SCR-20 | costly (should-resolve) | Security lead | PWPOLICY | Apply the SCR-20 constants (12-128, four classes) to every password path | SCR-22 |
| OQ-22-07 | Should success sign other sessions out and send a notification email? Enter submits the form (verified); confirm that is intended | Update password | costly (should-resolve) | Security lead | - | Sign out other sessions and send a notice | SCR-22 |
| OQ-A-00 | Is there a spec or an existing production portal (drivesafe.ta.org.jm per data.js) whose login is the reference? | whole module | costly (should-resolve) | Product owner | - | Treat the prototype as the specification | SCR-00 |
| OQ-A-02 | Is there a loading state while credentials and reCAPTCHA are verified? | LOGIN | costly (should-resolve) | UX designer | STATES | Use one shared empty, loading and error pattern; confirm copy later | SCR-00 |
| OQ-A-06 | reCAPTCHA v3 score threshold and failure UX? | LOGIN, SCR-01, SCR-02 | costly (should-resolve) | Security lead | - | Use the vendor default score; show a generic retry message | SCR-00 |
| OQ-A-07 | Should logout clear the entered Username/Password and OTP state? | SCR-04 | costly (should-resolve) | Security lead | - | Clear fields and OTP state on sign-out | SCR-00 |
| OQ-A-09 | Is the "Check your email" block (never shown) wanted? It describes a link-only flow, contradicting the code flow | SCR-01 | costly (should-resolve) | Product owner | - | Build the code flow; drop the unreachable link-only block | SCR-01 |
| OQ-A-14 | Is the 500 s resend countdown intended? Code lifetime vs 30 min link lifetime | Resend, done panel | costly (should-resolve) | Product owner | - | Use 60 s resend until answered; 500 s treated as a typo | SCR-02 |
| OQ-A-16 | Should login send the code to the account's registered email rather than echo the typed Username? | Login mode | costly (should-resolve) | Security lead | - | Send the code to the registered email, not the typed text | SCR-02 |
| OQ-A-19 | Abuse protection for an anonymous form | Send | costly (should-resolve) | Security lead | - | Add rate limit and reCAPTCHA on the anonymous form | SCR-03 |
| OQ-A-22 | Is feedback only for pre-login users, or also inside the shell? Prototype has no entry inside | SCR-03 | costly (should-resolve) | Product owner | - | Feedback stays pre-login only | SCR-03 |
| OQ-A-25 | Idle timeout and session lifetime? | Whole portal | costly (should-resolve) | Security lead | - | 30-minute idle timeout as PROPOSED | SCR-04 |
| OQ-A-26 | Should Sign out clear login fields and pending OTP data? | SCR-00 | costly (should-resolve) | Security lead | - | Clear fields and OTP state on sign-out | SCR-04 |
| OQ-A-28 | **Defect:** Subject is not reset on reopen because `openFeedback()` tests `#feedback-subject` but the select is `#fb-subject`. Builder should reset Subject to "General feedback" each time | Subject | costly (should-resolve) | UX designer + Product owner | - | Reset Subject to General feedback on every open | SCR-03 |
| OQ-V-01 | Empty dashboard (no violations)? | Table | costly (should-resolve) | UX designer | STATES | Use one shared empty, loading and error pattern; confirm copy later | SCR-05 |
| OQ-V-02 | Loading and error states for counts? | Tiles | costly (should-resolve) | UX designer | STATES | Use one shared empty, loading and error pattern; confirm copy later | SCR-05 |
| OQ-V-04 | Should Pending/Verified/Rejected tiles pre-filter the list by status? SCR-06 has no status filter | Tiles | costly (should-resolve) | UX designer | - | Tiles open the list unfiltered, as built | SCR-05 |
| OQ-V-06 | Which five are "Latest" and by which field? | Table | costly (should-resolve) | Product owner | - | Newest five by created_at | SCR-05 |
| OQ-V-07 | Four tiles are hard-coded numbers | Tiles | costly (should-resolve) | Architect | - | Compute the hard-coded tiles | SCR-05 |
| OQ-V-09 | Empty-result message for filters/search | Table | costly (should-resolve) | UX designer | STATES | Use one shared empty, loading and error pattern; confirm copy later | SCR-06 |
| OQ-V-10 | Mobile layout: horizontal scroll at 72 rem table width or a card layout? | Table | costly (should-resolve) | UX designer | STATES | Table scrolls horizontally inside its wrapper, as built | SCR-06 |
| OQ-V-11 | Which columns sort and what is the default order? Headers look sortable | Headers | costly (should-resolve) | Product owner + UX designer | LISTSCOPE | Newest first by created_at; headers not sortable | SCR-06 |
| OQ-V-13 | Server paging and page size (10/25/50/100); is "Previous" disabled on page 1? | Footer | costly (should-resolve) | Product owner + UX designer | LISTSCOPE | Build server paging with the page size the owner picks first; keep the select out until decided | SCR-06 |
| OQ-V-15 | Search and Filter should combine; as built they overwrite each other | Filter, Search | costly (should-resolve) | UX designer | - | Combine search and filter with AND | SCR-06 |
| OQ-V-17 | Time zone of Created At | Date filter | costly (should-resolve) | Architect | - | Store UTC, display in a zone to be named | SCR-06 |
| OQ-V-20 | Evidence (photo/video) is mentioned in the README and SCR-07 placeholder but the list has no media indicator | Table | costly (should-resolve) | UX designer | - | Add a media icon column | SCR-06 |
| OQ-V-21 | Reviewer note: store, show, make mandatory on Rejected? | Note | costly (should-resolve) | Product owner | - | Store the reviewer note, required on Rejected (PROPOSED) | SCR-07 |
| OQ-10-01 | No spec beyond README: is this the complete requirement for categories? | whole screen | noise (nice-to-know) | Product owner | - | As OQ-A-00 | SCR-10 |
| OQ-10-08 | Should Save be disabled until valid, as on the user modals, or validate on click? | modal | noise (nice-to-know) | UX designer | - | Validate on click and blur as built | SCR-10 |
| OQ-10-10 | List-search max length: 100 on every list screen (SCR-06, 11, 13, 20, 21 too) and PROPOSED, since the prototype states none. Confirm the value, and who owns the shared rule? | validation | noise (nice-to-know) | UX designer | SEARCHMAX | 100 characters on every list search (PROPOSED); the source states none | SCR-10 |
| OQ-11-08 | List-search max: 100 here and on every list screen, PROPOSED; the rule is stated once on SCR-10 (OQ-10-10) | validation | noise (nice-to-know) | UX designer | SEARCHMAX | 100 characters on every list search (PROPOSED); the source states none | SCR-11 |
| OQ-12-01 | No spec: are there other settings planned beyond Badge Name (Settings group suggests more)? | module | noise (nice-to-know) | Product owner | - | One setting only | SCR-12 |
| OQ-12-05 | Max length and allowed characters? | validation | noise (nice-to-know) | UX designer | - | 100 characters as PROPOSED | SCR-12 |
| OQ-13-06 | Pending/unanswered counter in the sidebar? | nav | noise (nice-to-know) | UX designer | - | No counter | SCR-13 |
| OQ-13-08 | Captures for the empty-submit and replied-row states were not taken; re-run the capture | story | noise (nice-to-know) | UX designer | - | Re-capture the two states | SCR-13 |
| OQ-13-09 | List-search max: 100 here and on every list screen, PROPOSED (see OQ-10-10) | validation | noise (nice-to-know) | UX designer | SEARCHMAX | 100 characters on every list search (PROPOSED); the source states none | SCR-13 |
| OQ-20-09 | Strength label disagrees with the rules (4 of 5 rules = "Strong" but Save disabled). Should the meter have five steps or only be "Strong" when all rules are met? | password meter | noise (nice-to-know) | UX designer | - | Show Strong only when all five rules are met | SCR-20 |
| OQ-20-12 | Maximum length of the list Search box: SCR-06/10/11/13 propose 100 and this story uses the same 100 (the source states none). Who owns one product-wide value? | Search | noise (nice-to-know) | UX designer | SEARCHMAX | 100 characters on every list search (PROPOSED); the source states none | SCR-20 |
| OQ-21-12 | Maximum length of the list Search box: SCR-06/10/11/13 propose 100 and this story uses the same 100 (the source states none). Who owns one product-wide value? | Search | noise (nice-to-know) | UX designer | SEARCHMAX | 100 characters on every list search (PROPOSED); the source states none | SCR-21 |
| OQ-22-06 | The extra states (partial password, errors, success) are analyst re-captures not listed in `capture.json`; add them to the manifest or accept them as supplementary | capture set | noise (nice-to-know) | Architect | - | Treat the re-captures as supplementary | SCR-22 |
| OQ-A-04 | Should "Privacy · Terms" link somewhere? | badge | noise (nice-to-know) | UX designer | - | Leave Privacy and Terms unlinked | SCR-00 |
| OQ-A-08 | Should Enter submit the form? | LOGIN | noise (nice-to-know) | UX designer | - | Enter submits | SCR-00 |
| OQ-A-10 | Should the error line be announced (`role=alert`)? | SCR-01 | noise (nice-to-know) | UX designer | - | Announce the error line | SCR-01 |
| OQ-A-17 | Toast "A 6-digit code was sent" shows only for reset, not login | Login mode | noise (nice-to-know) | UX designer | - | Same toast for both modes | SCR-02 |
| OQ-A-18 | Capture the error and sent states of this modal; none was photographed | SCR-03 | noise (nice-to-know) | UX designer | - | Described from source only | SCR-03 |
| OQ-A-21 | Builder requirement for every modal: trap Tab inside the dialog; on any dismissal (Close, ×, Cancel, Escape, backdrop, Save) return focus to the control that opened it, or its replacement if that control was re-rendered or hidden. As built: Escape and backdrop never restore; SCR-04 Cancel loses focus (the recorded element is the hidden Logout item); SCR-05/07 Save review loses focus (the table is rebuilt before the modal closes, so the recorded button is detached); the same loss occurs on Save of an Edit dialog on SCR-10, SCR-11, SCR-13, SCR-20 and SCR-21 (the row is rebuilt first; measured on SCR-10: focus lands on body), whereas Add-Save returns to the static Add button | all modals | noise (nice-to-know) | UX designer | - | Add focus trap and restore | SCR-03 |
| OQ-A-24 | Warn before sign-out when a form has unsaved input? | Sign out | noise (nice-to-know) | UX designer | - | No warning | SCR-04 |
| OQ-V-08 | Make tiles keyboard-operable | Tiles | noise (nice-to-know) | UX designer | - | Make tiles real links | SCR-05 |
| OQ-V-14 | Reversed date range behaviour | Filter | noise (nice-to-know) | UX designer | - | Block the filter and show the PROPOSED message | SCR-06 |
| OQ-V-26 | Search box: confirm one maximum (100, PROPOSED) and whether to trim, for all six list screens; the prototype does neither | Search boxes on all lists | noise (nice-to-know) | UX designer | SEARCHMAX | 100 characters on every list search (PROPOSED); the source states none | SCR-06 |
| DM-01 | Tenancy and scope: does one deployment serve one organisation (the Traffic Authority) or several? Do Violation manager levels 1-3 scope which reports a user may see? | Every entity; Violation report visibility | blocking | Architect + Product owner | model | Single tenant, no organisation key; revisit if answered several | index/02-data-model.md |
| DM-02 | Soft versus hard delete for Category, Owner, Portal user, App user. What does an erased or anonymised row keep (reports reference App users and categories)? | Category, Owner, Portal user, App user | blocking | Data protection officer + Architect | model | Soft delete with a deleted_at on every referenced entity | index/02-data-model.md |
| DM-03 | History: does a Violation report need a status history (who, when, from, to) and for how long is it kept? The prototype keeps only the latest status_updated_by. | Violation status event (inferred) | blocking | Product owner + Security lead | model | Append-only status event table, no retention limit | index/02-data-model.md |
| DM-04 | Link between Violation report and App user: reports carry `mobile` as a formatted string, app users carry `phone` as digits. Is the reporter a foreign key to App user? What happens to a report whose reporter is not in the list? | Violation report.reporter, App user | blocking | Architect | model | Nullable reporter_id plus the raw mobile string kept as received | index/02-data-model.md |
| DM-05 | Is `vehicle_type` a closed list (Taxi, Truck seen) or free text? Who maintains it? | Violation report.vehicle_type | costly (should-resolve) | Product owner | model | Free text with no constraint | index/02-data-model.md |
| DM-06 | Person-field lengths disagree across screens: name 2-100 (SCR-03), 1-60 (SCR-20), 0-60 (SCR-21); email min 5 (SCR-01/03) versus none. Pick one standard. | Portal user, App user, Feedback submission | costly (should-resolve) | Architect | model | Store the widest (100 and 254); validate per screen as written | index/02-data-model.md |
| DM-07 | Time zone of every timestamp (`created_at`, `replied_at`, last login). Jamaica is UTC-5 with no daylight saving; the prototype shows none. | Violation report, Contact message, Session | costly (should-resolve) | Architect | model | timestamp with time zone, stored UTC | index/02-data-model.md |
| DM-08 | Counters: store or compute the dashboard tiles, the sidebar badge and the App user points balances? Hard-coded tiles disagree with their rows. | Dashboard, App user, Reward ledger entry | blocking | Architect | model | Compute all; earner and redeemed points derived from a ledger | index/02-data-model.md |
| DM-09 | Are Role and Level reference tables (rows an admin could add) or fixed enums? The prototype hard-codes two roles. | Portal user.role, Portal user.level | costly (should-resolve) | Product owner | model | Fixed enum | index/02-data-model.md |
| DM-10 | Where is the credential kept and how does a new Portal user first set a password? SCR-20 asks the admin to type one, which the prototype discards. Forced change on first login? | Portal user (credential), OTP challenge | blocking | Security lead | model | Hash only, never the plaintext; forced change at first login (PROPOSED) | index/02-data-model.md |
| DM-11 | Badge Name is the only setting and is held in browser localStorage. Single settings record, or a key-value table for future settings (OQ-12-01)? | Badge setting | costly (should-resolve) | Architect | model | One row | index/02-data-model.md |
| DM-12 | Are Feedback submission (SCR-03, pre-login, has Subject) and Contact message (SCR-13, citizen app, no Subject) one entity with a source column? | Feedback submission, Contact message | blocking | Product owner | model | Two entities; see OQ-A-20 | index/02-data-model.md |
| DM-13 | Surrogate keys and display numbers: 'S No' is array index + 1 and renumbers on delete. Confirm it is a display row number and never an identifier. | All list entities | costly (should-resolve) | Architect | model | Surrogate keys; S No computed per page | index/02-data-model.md |
| DM-14 | Does an Owner need contacts or users so that reports routed to it reach someone (OQ-11-01)? The model has Owner as name and description only. | Owner | costly (should-resolve) | Product owner | model | No contacts; owner is a label | index/02-data-model.md |
| DM-15 | Lengths for `other_description`, `location`, `notes`, `registration_no`: none declared anywhere. | Violation report | costly (should-resolve) | Architect | model | Nullable text, no length limit, flagged unconstrained | index/02-data-model.md |
| DM-16 | Evidence media storage: separate entity with per-report count, type and size limits, and retention (OQ-V-24). | Evidence media (inferred) | blocking | Security lead + Data protection officer | model | Entity modelled, constraints left empty | index/02-data-model.md |
| DM-17 | Page-size options differ (four different sets). The search maximum is now 100 on every screen, PROPOSED (the source states none): see OQ-V-26 and its cluster. | Lists | noise (nice-to-know) | UX designer | model | 10/25/50 and 100-character search | index/02-data-model.md |
