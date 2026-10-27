<!-- authored by senior-qa: journey cases for the 10 journeys in journey-flow/00-journey-flows.md -->
# TC · JRN · End-to-end journeys

Journeys: `deliverable/journey-flow/00-journey-flows.md` · broken hops are written as the intended behaviour with their OQ ids under Depends on (provisional until decided) · author senior-qa

### TC-JRN-WEB-001 · Journey 1 · Staff member signs in: Login to OTP to Dashboard

- **Traces:** JRN-sign-in, ST-SCR-00-01, ST-SCR-00-02, ST-SCR-02-01, ST-SCR-05-01
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Use case
- **Priority:** P1
- **Tier:** sanity
- **Role:** Administrator
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the prototype URL
  2. Type Username "ronald" and Password "any-password" and press LOGIN
  3. On the OTP screen type 1,2,3,4,5,6 into the six boxes and press Verify
- **Expected:**
  1. The "Welcome back" screen shows with empty Username and Password and the sidebar and header hidden
  2. The OTP screen reads "Enter the 6-digit code sent to ronald" and its back link reads "← Back to sign in"
  3. The Dashboard shows, a toast reads "Signed in successfully.", and the tiles read Violation reports 23, Pending review 23, Verified 0, Rejected 0, Categories 10, App users 3,123, Portal users 8, Messages 24
- **Notes:** All hops work (journey-flow 1). The credentials and the code are not checked by the prototype, see the next two cases.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-002 · Journey 1 · Sign-in refuses wrong credentials (intended behaviour, hop is broken as built)

- **Traces:** JRN-sign-in, SCR-00.VAL.credentials-must-match-an-account, SCR-00.STATE.error, ST-SCR-00-06
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Decision table
- **Priority:** P1
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-01
- **Decision:** —
- **Steps:**
  1. Open the prototype URL
  2. Leave Username empty, type any Password and press LOGIN
  3. Type Username "ronald" and a Password that is not ronald's and press LOGIN
- **Expected:**
  1. "Username is required." shows under the Username field and no navigation occurs (PROPOSED rule, ST-SCR-00-06)
  2. The OTP screen does not appear; the message "Incorrect username or password." shows and does not reveal which of the two was wrong (PROPOSED wording)
- **Notes:** As built the prototype never checks (ST-SCR-00-05: empty fields still reach OTP reading "sent to your email"). Expected result is the story's PROPOSED rule, so the case stays blocked until OQ-A-01 is decided. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-003 · Journey 1 · OTP step refuses a wrong, expired or over-tried code (intended behaviour)

- **Traces:** JRN-sign-in, SCR-02.VAL.code-correctness-must-equal-the-issued-c, SCR-02.STATE.wrong-code, SCR-02.STATE.expired-code
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** State transition
- **Priority:** P1
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-12, OQ-A-13, OQ-A-03
- **Decision:** —
- **Steps:**
  1. Reach the OTP screen in login mode
  2. Type a 6-digit code that was not issued and press Verify
  3. Wait until the code lifetime has passed, type the issued code and press Verify
  4. Enter 5 wrong codes in a row, then press Verify a sixth time
- **Expected:**
  1. "That code is incorrect." shows and the Dashboard does not appear (PROPOSED wording)
  2. "That code has expired. Request a new one." shows (PROPOSED wording; lifetime e.g. 10 minutes is PROPOSED)
  3. "Too many attempts. Request a new code." shows after the 5th wrong entry (PROPOSED)
- **Notes:** As built any 6 digits are accepted (ST-SCR-02-01). All three messages are PROPOSED in SCR-02. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-004 · Journey 2 · Forgot password: Login to email to code to "Identity verified" to Login

- **Traces:** JRN-forgot-password, ST-SCR-00-03, ST-SCR-01-03, ST-SCR-02-03, ST-SCR-01-05
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Use case
- **Priority:** P1
- **Tier:** sanity
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. On the login page press Forgot Password?
  2. Type "user@example.com" into Email address and press Send code
  3. Type 1,2,3,4,5,6 and press Verify
  4. Press Back to sign in on the done panel
- **Expected:**
  1. SCR-01 "Reset your password" shows with an empty Email address field
  2. The OTP screen reads "Enter the 6-digit code sent to user@example.com.", a green toast reads "A 6-digit code was sent to user@example.com." and the back link reads "← Change email"
  3. "Identity verified" shows with "A password reset link has been sent to user@example.com. The link expires in 30 minutes."
  4. The "Welcome back" login screen shows
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-005 · Journey 2 · Reset link lands on a set-new-password page (hop missing as built)

- **Traces:** JRN-forgot-password, SCR-02.COMM.sends-production-password-reset-link, SCR-02.STATE.done-reset-only
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-15, OQ-22-05
- **Decision:** —
- **Steps:**
  1. Complete Forgot password with user@example.com up to the "Identity verified" panel
  2. Follow the password reset link named by the panel
  3. Set a new password and submit
  4. Sign in with the new password
- **Expected:**
  1. The panel's only exit as built is "Back to sign in"; the intended flow has a page behind the reset link
  2. A page where the user sets a new password opens from the link
  3. The new password is accepted and the user returns to sign-in (screen content, fields and policy are not defined by any story)
  4. Sign-in succeeds with the new password
- **Notes:** Journey-flow 2 break: no screen exists after the done panel. The stories do not define the page, its fields or whether the 12-128 four-class policy applies (OQ-22-05), so only the existence of the hop is asserted. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-006 · Journey 2 · Forgot password does not reveal whether the email has an account

- **Traces:** JRN-forgot-password, SCR-01.ACT.send-code, SCR-01.VAL.email-address-shape-s-s-s
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Equivalence partitioning
- **Priority:** P2
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-11
- **Decision:** —
- **Steps:**
  1. On SCR-01 type an email that belongs to no portal user, "nobody@example.com", and press Send code
  2. Repeat with ronaldstephen@myambergroup.com (a seeded portal user)
- **Expected:**
  1. The visitor sees the same next screen and the same wording as for a known address
  2. The visitor sees the same next screen and the same wording as step 1
- **Notes:** SCR-01: the copy in the unreachable block implies the server must not disclose existence; the live flow does not say so. Provisional until OQ-A-11 is decided.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-007 · Journey 3 · Reviewer verifies report 1: Dashboard to list to modal to Save, counts follow

- **Traces:** JRN-violation-review, ST-SCR-05-05, ST-SCR-06-07, ST-SCR-07-02, ST-SCR-07-03, ST-SCR-05-06
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Use case
- **Priority:** P1
- **Tier:** sanity
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. On the Dashboard press View all
  2. Press the Option eye button of report 1 ("View / review report 1")
  3. Choose Status Verified and press Save review
  4. Press Dashboard in the sidebar
- **Expected:**
  1. The list "User uploaded Violations" shows with "Showing 1 to 10 of 23 entries"
  2. The modal "Violation #1 — Breaking One way/No Entry" shows with Status Pending and Level 0
  3. The modal closes, row 1 shows a green Verified chip and Status Updated By "Admin Admin", and a toast reads "Report 1 updated to Verified. Reporter awarded reward points."
  4. Pending reads 22, Verified reads 1, the funnel reads Submitted 23, Pending 22, Under review 0, Verified 1, Rejected 0 and the sidebar badge reads 22
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-008 · Journey 3 · Tiles and funnel are counted from every report, not from the 10 loaded rows

- **Traces:** JRN-violation-review, SCR-05.DATA.services-required, SCR-05.STATE.populated
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Data
- **Technique:** Boundary value analysis
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-05, OQ-V-07
- **Decision:** —
- **Steps:**
  1. Open a violation set in which a report outside the first 10 loaded rows is Verified (for example report 15)
  2. Open the Dashboard
- **Expected:**
  1. The set holds 23 reports; Verified, Rejected and Under review are counted across all 23 reports, not across rows 1-10
  2. Pending + Under review + Verified + Rejected equals Submitted 23, and Verified reads 1
- **Notes:** Journey-flow 3 break. As built, Verified, Rejected and Under review come from the 10 loaded rows and Pending adds the 13 unloaded ones, so a report beyond row 10 cannot be set or counted. Cannot be driven on the prototype; needs a build with the full set. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-009 · Journey 3 · Verifying a report credits the reporter's reward points (hop missing as built)

- **Traces:** JRN-violation-review, SCR-07.STATE.verified-no-points, SCR-07.COMM.sends-scr-21-05-users-scr-21-app-user-li
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-25, OQ-21-10, OQ-21-09
- **Decision:** —
- **Steps:**
  1. Open report 1 from the list and set Status Verified and press Save review
  2. Open the App user List and find the reporter's account
- **Expected:**
  1. The toast reads "Report 1 updated to Verified. Reporter awarded reward points."
  2. The reporter's Earner Points have increased by the number of points the owner decides (number not defined by any story); saving the same report again does not award them twice
- **Notes:** Journey-flow 3 break. As built the toast promises points and no points change anywhere; the report's phone (+1 876 3125290) and the app user phone (digits only) have no link (OQ-21-09). Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-010 · Journey 3 · A decision leaves a history (who, when, from, to) and keeps the reviewer note

- **Traces:** JRN-violation-review, SCR-07.VAL.reviewer-note-optional-free-text-trimmed, SCR-07.ACT.reviewer-note, ST-SCR-07-07
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-21, OQ-V-23
- **Decision:** —
- **Steps:**
  1. Open report 2, set Status Rejected, type "Duplicate of report 1" in Reviewer note and press Save review
  2. Reopen report 2
- **Expected:**
  1. A history record exists with the reviewer, the time, the old status Pending and the new status Rejected (shape not defined by any story)
  2. The decision's reason "Duplicate of report 1" is shown; as built the note is empty on reopening (ST-SCR-07-07)
- **Notes:** Journey-flow 3 break: only the latest "Admin Admin" is kept and the note is never saved. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-011 · Journey 3 · Pending and status tiles open the list narrowed to that status

- **Traces:** JRN-violation-review, SCR-05.ACT.tile-pending-review, SCR-05.ACT.tile-verified, SCR-05.ACT.tile-rejected
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-04
- **Decision:** —
- **Steps:**
  1. On the Dashboard press the "23 Pending review" tile
  2. Return to the Dashboard and press the "0 Verified" tile
- **Expected:**
  1. The list shows the 23 Pending reports (the number on the tile)
  2. The list shows only Verified reports (none at seed)
- **Notes:** As built every tile opens the same unfiltered list (ST-SCR-05-07) and SCR-06 has no status filter. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-012 · Journey 3 · Saved review keeps the active filter and search consistent with the count text

- **Traces:** JRN-violation-review, SCR-06.STATE.stale-count-after-a-re-render, SCR-07.COMM.sends-scr-06-scr-05
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-15
- **Decision:** —
- **Steps:**
  1. On the violations list set Created From 2026-09-01, Created To 2026-09-30 and press Filter (rows 1 and 2 remain)
  2. Open report 1, choose Under review and press Save review
- **Expected:**
  1. The count text reads "Showing 2 of 10 entries"
  2. After the table re-renders the rows shown and the count text agree (2 rows and "Showing 2 of 10 entries", or 10 rows and a count text that says so)
- **Notes:** As built the re-render shows all 10 rows while the count text keeps "Showing 2 of 10 entries" and the filter inputs keep their values. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-013 · Journey 4 · Administrator creates an owner, then a category under it, then filters reports by it

- **Traces:** JRN-owner-category-setup, ST-SCR-11-02, ST-SCR-10-02, SCR-11.COMM.sends-violations-list
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Use case
- **Priority:** P1
- **Tier:** sanity
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Category Management > Owners, press ＋ Add Owner, enter "Transport Authority" / "Licensing body" and press Save
  2. Open Category Management > Category, press ＋ Add Category, enter "Tailgating" / "Following too closely", choose Owner "Transport Authority" and press Save
  3. Open Manage Violation Uploads and open the Category Owner filter
- **Expected:**
  1. Row 2 appears in Owners, the toast reads `Owner "Transport Authority" added successfully.` and the info line reads "Showing 1 to 2 of 2 entries"
  2. The Owner select of the modal offered "Transport Authority"; row 11 "Tailgating" appears last, the info line reads "Showing 1 to 11 of 11 entries" and the toast reads `Category "Tailgating" added successfully.`
  3. The Category Owner select lists "All Category Owners", "Police" and "Transport Authority"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-014 · Journey 4 · Report's Category Owner is derived live from the category

- **Traces:** JRN-owner-category-setup, SCR-06.COMM.receives-category-screen, SCR-10.COMM.sends-violations-list-screen-module-with
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Integration
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Edit category "Wrong parking" and set Owner Police, then press Save
  2. Open Manage Violation Uploads
  3. Choose Category Owner Police and press Filter
- **Expected:**
  1. The toast reads `Category "Wrong parking" updated successfully.`
  2. The Category Owner column reads Police for reports 3, 6, 7, 8 and 9 and "-" for the others
  3. Only reports 3, 6, 7, 8 and 9 remain and the count text reads "Showing 5 of 10 entries"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-015 · Journey 4 · Renaming or deleting a category does not orphan the reports that use it

- **Traces:** JRN-owner-category-setup, SCR-10.COMM.breaks-if-changed-violations-list-dashbo, SCR-06.COMM.receives-category-screen
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative · Integration
- **Technique:** State transition
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-10-06, OQ-V-18
- **Decision:** —
- **Steps:**
  1. Edit category "Wrong parking" (owner Police), rename it to "Illegal parking" and press Save
  2. Open Manage Violation Uploads and read the Category and Category Owner of report 3
  3. Delete category "Illegal parking" and confirm
  4. Read report 3 again
- **Expected:**
  1. The category list shows "Illegal parking"
  2. Report 3 follows the rename (Category "Illegal parking", Category Owner Police), or the rename was refused with a message
  3. The delete is blocked or handled so that no report is left pointing at a name that is not in the category list
  4. Report 3 still has a category and a Category Owner that exist in the lists
- **Notes:** Journey-flow 4 break. As built report 3 keeps the text "Wrong parking" and its Category Owner becomes "-". The rule (block, cascade or id link) is undecided. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-016 · Journey 4 · Deleting or renaming an owner leaves no category pointing at a missing owner

- **Traces:** JRN-owner-category-setup, ST-SCR-11-06, SCR-11.COMM.breaks-if-changed-scr-10-and-violations
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative · Integration
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-11-06
- **Decision:** —
- **Steps:**
  1. On Owners delete "Police" and confirm `Delete owner "Police"?`
  2. Open Category and read row 1 "Over-charging fares"
  3. Press ✎ on row 1 and then Save without changing anything
- **Expected:**
  1. The Owners table is empty
  2. Row 1 does not show an owner name that is missing from Owners (blocked, cascaded to blank, or the delete refused with a warning)
  3. Saving does not silently blank the owner of a category without telling the user
- **Notes:** As built (ST-SCR-11-06) row 1 still shows Police, the Edit select renders empty with no option selected and Save writes owner "". Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-017 · Journey 4 · The Other category is protected because reports use it for free text

- **Traces:** JRN-owner-category-setup, SCR-10.ACT.delete-name-row-aria-label-delete-name
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-10-07
- **Decision:** —
- **Steps:**
  1. On Category press 🗑 on row 3 "Other" and confirm `Delete category "Other"?`
  2. Open a report whose category is Other and read Other Description
- **Expected:**
  1. Deleting "Other" is refused or warns that reports use it (decision pending)
  2. The Other Description text of the report is still shown against a category named Other
- **Notes:** Journey-flow 4. Whether Other is a protected system category is the question; no story gives the outcome. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-018 · Journey 5 · Administrator adds a colleague on the Admin user list

- **Traces:** JRN-admin-user-mgmt, ST-SCR-20-05, ST-SCR-20-03, ST-SCR-20-04
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Use case
- **Priority:** P1
- **Tier:** sanity
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open User Management > Admin user List and press ＋ Add User
  2. Enter First "Test", Last "User", Email "test.user@ta.org.jm", Phone "8761234567", Role Violation manager, Level 2 and Password "Abcdefghijk1!"
  3. Press Save
- **Expected:**
  1. Title "Add User", Role reads Administrator, Save is disabled and the five password rules are unticked
  2. All five rules are ticked, the label reads "Strong" and Save is enabled
  3. The dialog closes, a 9th row "Test User" appears, the footer reads "Showing 1 to 9 of 9 entries" and a toast reads `User "Test User" added successfully.`
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-019 · Journey 5 · The new user can sign in (hop broken as built: the typed password is discarded)

- **Traces:** JRN-admin-user-mgmt, SCR-20.DATA.services-required, SCR-20.VAL.password-required-on-add-data-req-added
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-20-05, OQ-22-05
- **Decision:** —
- **Steps:**
  1. Add the user from the previous journey case with Password "Abcdefghijk1!"
  2. Sign out, then sign in as "test.user@ta.org.jm" with the password set in the dialog and complete the code step
- **Expected:**
  1. The row is saved
  2. The sign-in is accepted for that account and the Dashboard shows (how a first password is set, or forced to change, is not defined)
- **Notes:** Journey-flow 5 break, DM-10: the Password is validated and thrown away; the user object has no password field. The mechanism for a first password is undecided. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-020 · Journey 5 · Reset password (lock icon) delivers a reset link to that user

- **Traces:** JRN-admin-user-mgmt, ST-SCR-20-09, SCR-20.ACT.row-aria-label-reset-password-for-firstn
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-20-08
- **Decision:** —
- **Steps:**
  1. On the Admin user list press 🔒 "Reset password for Ronald"
- **Expected:**
  1. The toast reads "Password reset link sent (concept)." as built; in the finished product a reset link is delivered to Ronald's email address and the toast names the user (recipient, expiry, audit and confirmation are not defined)
- **Notes:** Journey-flow 5 break. As built it is a toast only with no data change. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-021 · Journey 5 · The signed-in user appears in the Admin user list and cannot delete themselves

- **Traces:** JRN-admin-user-mgmt, SCR-20.COMM.receives-login-auth, SCR-20.COMM.shares-scr-22-profile
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-20-10, OQ-20-08
- **Decision:** —
- **Steps:**
  1. Sign in and open Admin user List
  2. Look for the account "Admin Admin" shown in the header
  3. Press 🗑 on the signed-in user's own row and confirm
- **Expected:**
  1. The list holds 8 users; as built none of them is "Admin Admin" and Profile shows itdept@ta.org.jm, which is in no row
  2. The signed-in account is one row of the list (or the story states where its identity comes from)
  3. Deleting your own account, or the last Administrator, is refused
- **Notes:** Journey-flow 5 break. No story defines the source of the signed-in identity or the delete protections. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-022 · Journey 6 · Staff open App users from the Dashboard, edit points, phones re-mask

- **Traces:** JRN-app-user-mgmt, ST-SCR-21-01, ST-SCR-21-02, ST-SCR-21-07
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Use case
- **Priority:** P1
- **Tier:** sanity
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. On the Dashboard press the "3,123 App users" tile
  2. Press the eye icon on row 1 (phone ····567)
  3. Press ✎ on row 1, set Earner Points 50 and press Save
- **Expected:**
  1. 10 rows show with phones ····567, ····979, ····990, ····346, ····075, ····702, ····359, ····758, ····580, ····052 and the footer reads "Showing 1 to 10 of 3,123 entries"
  2. The cell reads 1234567 and the icon's label becomes "Hide full phone number"
  3. Row 1 shows Earner Points 50, the toast reads "App user 1234567 updated successfully." and every row's phone is masked again
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-023 · Journey 6 · A citizen can be erased or deactivated from the App user list

- **Traces:** JRN-app-user-mgmt, SCR-21.COMM.receives-mobile-app-violation-reports-no, SCR-21.ACT.row-aria-label-edit-app-user-full-phone
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-21-03
- **Decision:** —
- **Steps:**
  1. On the App user list look at the Option controls of row 1
  2. Use the control that erases or deactivates an app user
- **Expected:**
  1. As built row 1 has one control, "Edit app user 1234567"; there is no delete, block or deactivate
  2. A way to erase or deactivate the citizen's record exists (what it does is not defined)
- **Notes:** Journey-flow 6 break, DM-02: data-subject erasure has no path. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-024 · Journey 6 · Users beyond page 1 can be reached and the Dashboard tile follows an Add

- **Traces:** JRN-app-user-mgmt, SCR-21.ACT.previous-1-2-3-313-next, SCR-21.COMM.shares-scr-05-dashboard-tile-app-users
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-21-06, OQ-V-07
- **Decision:** —
- **Steps:**
  1. On the App user list press page "2"
  2. Add an app user with Phone "8761234567" and open the Dashboard
- **Expected:**
  1. A second page of users shows (S No 11 to 20); as built nothing happens and 3,113 of 3,123 users are unreachable
  2. The App users tile reads one more than before; as built it still reads 3,123
- **Notes:** Journey-flow 6 breaks. Paging and counts are server work. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-025 · Journey 7 · Staff answer a citizen message from the Dashboard Messages tile

- **Traces:** JRN-contact-reply, ST-SCR-13-01, ST-SCR-13-02, ST-SCR-13-04
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Use case
- **Priority:** P1
- **Tier:** sanity
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. On the Dashboard press the "24 Messages" tile
  2. Press ↩ "Reply to testing" on row 1
  3. Type "Thank you, we are looking into it." and press Send reply
- **Expected:**
  1. Row 1 reads "testing · test@gmail.com · scripthsjdjend · 2026-08-21 12:01:28" and the info line reads "Showing 1 to 10 of 24 entries"
  2. The modal "Reply to message" shows From "testing <test@gmail.com>", Message "scripthsjdjend", Received "2026-08-21 12:01:28" and an empty response box
  3. The modal closes, row 1 Response shows the text, Replied At shows the current time and a toast reads "Reply sent to testing."
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-026 · Journey 7 · The reply reaches the citizen and records who replied (hop missing as built)

- **Traces:** JRN-contact-reply, SCR-13.COMM.sends-citizen-email-address-on-the-messa, SCR-13.DATA.writes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-13-05
- **Decision:** —
- **Steps:**
  1. Reply to row 1 with "Thank you, we are looking into it."
  2. Check the citizen's channel (email, push or in-app) for test@gmail.com
  3. Reopen the row
- **Expected:**
  1. The toast reads "Reply sent to testing."
  2. The citizen receives the reply text through the chosen channel
  3. The row records the replying administrator as well as the time
- **Notes:** Journey-flow 7 break. As built the reply is stored on the row only; nothing is emailed and no replier is recorded. Channel undecided. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-027 · Journey 7 · All 24 messages can be reached and answered

- **Traces:** JRN-contact-reply, SCR-13.ACT.2-3-next, SCR-13.ACT.show-10-25-50-entries
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-13-04
- **Decision:** —
- **Steps:**
  1. On Manage Contact Us press page "2"
  2. Press "Next" and then page "3"
- **Expected:**
  1. Messages 11 to 20 are listed and can be replied to; as built nothing happens
  2. Messages 21 to 24 are listed; all 24 messages are reachable (14 of 24 are unreachable as built)
- **Notes:** Journey-flow 7 break. Only 10 rows exist in the data. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-028 · Journey 8 · Staff change their own password from the account menu

- **Traces:** JRN-profile-password, ST-SCR-22-01, ST-SCR-22-07, ST-SCR-04-01
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Use case
- **Priority:** P1
- **Tier:** sanity
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Press the header "Admin Admin" button and choose Profile
  2. Type Current "OldPassw0rd!x", New "Abcdefghijk1!" and Confirm "Abcdefghijk1!"
  3. Press Update password
- **Expected:**
  1. My Profile shows Email itdept@ta.org.jm, Phone +1 876 555 0100, Role Administrator, Level —, Last login 2026-10-22 16:08 and three empty masked password fields
  2. All five rules are ticked, four segments are green and the label reads "Strong"
  3. All three fields are empty, the checklist is unticked, a toast reads "Password updated successfully." and the user stays on My Profile, still signed in
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-029 · Journey 8 · Wrong current password is refused and the new password works at next sign-in

- **Traces:** JRN-profile-password, SCR-22.VAL.current-password-must-equal-the-account, SCR-22.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Decision table
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-22-03, OQ-A-01
- **Decision:** —
- **Steps:**
  1. On Profile enter a Current password that is not the account's, a policy-compliant New and matching Confirm, then press Update password
  2. Repeat with the right Current password, sign out and sign in with the new password
- **Expected:**
  1. "Current password is incorrect." shows (PROPOSED, server-side) and no toast appears
  2. The change is accepted and sign-in succeeds with the new password and fails with the old one
- **Notes:** Journey-flow 8 caveat: the current password is never checked and no stored password is changed. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-030 · Journey 8 · Changing the password signs other sessions out and notifies the user

- **Traces:** JRN-profile-password, SCR-22.ACT.update-password
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Integration
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-22-07
- **Decision:** —
- **Steps:**
  1. Sign in on browser A and browser B as the same account
  2. Change the password on browser A
  3. Use browser B
- **Expected:**
  1. Both sessions are signed in
  2. The success toast shows on browser A; a notification email is sent (PROPOSED)
  3. Browser B is signed out and asks for sign-in
- **Notes:** Journey-flow 8 caveat; the story asks the question and gives no answer. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-031 · Journey 9 · Visitor sends feedback from the login page

- **Traces:** JRN-feedback, ST-SCR-00-04, ST-SCR-03-04, ST-SCR-03-05
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Use case
- **Priority:** P1
- **Tier:** sanity
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. On the login page press Feedback
  2. Type Name "Ann Lee", Email "ann.lee@example.com", leave Subject at General feedback and type Message "The sign-in page is clear."
  3. Press Send feedback
  4. Press Escape and press Feedback again
- **Expected:**
  1. The Feedback modal shows and focus is on its × button
  2. No error shows
  3. "Thanks for your feedback!" shows, the form and footer buttons are gone and a toast reads "Feedback sent. Thank you!"
  4. The modal closes and the reopened form has empty Name, Email and Message
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-032 · Journey 9 · Sent feedback reaches a staff reader and the form resists abuse

- **Traces:** JRN-feedback, SCR-03.COMM.sends-production-contact-us-list-manage, SCR-03.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative · Integration
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-20, OQ-A-19
- **Decision:** —
- **Steps:**
  1. Send feedback as in the previous case
  2. Sign in and open Manage Contact Us (or the inbox the decision names)
  3. Submit the anonymous form repeatedly in a short time
- **Expected:**
  1. The sent panel shows
  2. A record with Name "Ann Lee", Email "ann.lee@example.com" and the message is visible to staff; as built the Contact Us list still starts with "testing" and holds no feedback
  3. The form is throttled or protected (mechanism not defined)
- **Notes:** Journey-flow 9 break: feedback is thanked and discarded; whether it is the same entity as a Contact Us message (DM-12) is undecided. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-033 · Journey 10 · Staff member signs out: menu to confirmation to Login

- **Traces:** JRN-logout, ST-SCR-04-03, ST-SCR-04-05, ST-SCR-04-04
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Use case
- **Priority:** P1
- **Tier:** sanity
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Press the header "Admin Admin" button and choose Logout
  2. Press Cancel
  3. Choose Logout again and press Sign out
- **Expected:**
  1. The dialog "Are you sure you want to sign out?" shows with the body "You'll be returned to the login screen and will need to sign in again.", the menu is closed and the user is still signed in
  2. The dialog closes and the page is unchanged
  3. The "Welcome back" login screen shows and the sidebar and header are hidden
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-WEB-034 · Journey 10 · After Sign out the login form and pending code are cleared

- **Traces:** JRN-logout, SCR-00.COMM.receives-scr-04-logout
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-07, OQ-A-26
- **Decision:** —
- **Steps:**
  1. Sign in with Username "ronald" and Password "secret-1"; on the OTP screen type 1,2,3
  2. Sign out through the account menu
  3. Read the Username and Password fields; press LOGIN and read the OTP echo
- **Expected:**
  1. The Dashboard shows after completing the code
  2. The login screen shows
  3. Username and Password are empty and no pending OTP data from the previous user remains (PROPOSED)
- **Notes:** Journey-flow 10 caveat: as built the typed fields keep their text and SCR-02 state is unchanged. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-RSP-001 · Journey 1 on a phone · Sign in at 390x844 and open the Dashboard through the navigation drawer

- **Traces:** JRN-sign-in, ST-SCR-00-01, ST-SCR-02-01, SCR-04.STATE.signed-out
- **Platform:** Responsive
- **Environment:** 390x844 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** Functional · Compatibility
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 390x844 open the prototype URL, type any Username and Password and press LOGIN
  2. Verify with 123456
  3. Press ☰ "Open navigation menu"
  4. Press Manage Violation Uploads
- **Expected:**
  1. The login form shows without the brand panel and without horizontal page scroll
  2. The Dashboard shows with the header "AA" initials and the account name hidden (below 640 px)
  3. The drawer slides in over a dimmed page and focus stays on ☰
  4. The drawer closes and "User uploaded Violations" shows; its table scrolls inside its own wrapper
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-RSP-002 · Journey 3 on a phone · Review a report at 390x844

- **Traces:** JRN-violation-review, SCR-07.STATE.open-unchanged, SCR-06.STATE.narrow-and-mid-width-viewports
- **Platform:** Responsive
- **Environment:** 390x844 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** Functional · Compatibility
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 390x844 open Manage Violation Uploads from the drawer
  2. Scroll the table sideways and press "View / review report 3"
  3. Choose Under review and press Save review
- **Expected:**
  1. The page itself does not scroll sideways; the table scrolls inside its wrapper
  2. The modal "Violation #3 — Wrong parking" shows and is at most 90% of the viewport height (760 px), its body scrolling inside
  3. The modal closes and a toast reads "Report 3 updated to Under review."
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-JRN-RSP-003 · Journey 8 on a tablet · Change password at 768x1024 with the details card stacked above the form

- **Traces:** JRN-profile-password, ST-SCR-22-01, ST-SCR-22-07
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** Functional · Compatibility
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open the account menu and choose Profile
  2. Complete a valid password change and press Update password
- **Expected:**
  1. The details card is stacked above the Change password form (one column below 1024 px)
  2. A toast reads "Password updated successfully." and the three fields are empty
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —
