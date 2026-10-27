<!-- authored by senior-qa -->
# TC · Data reads, writes and services per screen

Prototype-side observable behaviour; API-level cases are out of qa-scope platforms · author senior-qa

### TC-SCR-00-WEB-028 · Data · Badge Name is read from localStorage on boot and falls back to the default

- **Traces:** SCR-00.DATA.reads, SCR-00.COMM.receives-config-screen-scr-12-03-catalog
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the prototype with no `drivesafe_badge_name` key and read the badge line
  2. Set localStorage `drivesafe_badge_name` to "Test Org" and reload
- **Expected:**
  1. The badge line under "Admin Portal" reads "Ministry of Transport and Mining"
  2. The badge line reads "Test Org" on the login screen
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-00-WEB-029 · Data · LOGIN writes nothing and sends no request

- **Traces:** SCR-00.DATA.writes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the browser network panel and storage panel
  2. Type Username "ronald", Password "x" and press LOGIN
- **Expected:**
  1. The OTP screen appears reading "Enter the 6-digit code sent to ronald"
  2. No HTTP request is made and no localStorage key other than `drivesafe_badge_name` exists (writes: none in the prototype)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-00-WEB-030 · Data · authentication, OTP issuance and reCAPTCHA are stubs on this screen

- **Traces:** SCR-00.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the console and press LOGIN
- **Expected:**
  1. The console logs a reCAPTCHA action `login` with the fixed score 0.9; no credential check, OTP issue or delivery occurs (OTP mode is set to login and the typed Username is kept as the address)
- **Notes:** Covers the observable prototype side only. The service itself (an API) is outside qa-scope platforms (WEB, RSP), so the API-level case the derivation rules ask for is not written; it needs a build with an API.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-01-WEB-022 · Data · the forgot-password form reads nothing and starts empty every time

- **Traces:** SCR-01.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Forgot Password?, type "user@example.com", press ← Back to sign in
  2. Open Forgot Password? again
- **Expected:**
  1. The typed email is shown
  2. The Email address field is empty and no error shows (the field is cleared on every entry)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-01-WEB-023 · Data · Send code writes nothing and does not check that the account exists

- **Traces:** SCR-01.DATA.writes, SCR-01.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the console and network panels
  2. Send code with "nobody@example.com"
- **Expected:**
  1. The OTP screen reads "Enter the 6-digit code sent to nobody@example.com." and a toast reads "A 6-digit code was sent to nobody@example.com."
  2. No HTTP request is made, nothing is stored and the console logs reCAPTCHA action `forgot_password` score 0.9
- **Notes:** Covers the observable prototype side only. The service itself (an API) is outside qa-scope platforms (WEB, RSP), so the API-level case the derivation rules ask for is not written; it needs a build with an API.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-02-WEB-032 · Data · the OTP screen reads the pending address and the mode set by the previous screen

- **Traces:** SCR-02.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Type Username "ronald" and press LOGIN
  2. Go back, leave Username empty and press LOGIN
  3. Go to Forgot Password?, send a code to "user@example.com"
- **Expected:**
  1. Echo reads "ronald", mode is login and the back link reads "← Back to sign in"
  2. Echo reads "your email"
  3. Echo reads "user@example.com", mode is reset and the back link reads "← Change email"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-02-WEB-033 · Data · Verify writes nothing and Resend and Verify call only the reCAPTCHA stub

- **Traces:** SCR-02.DATA.writes, SCR-02.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the console and network panels at the OTP screen
  2. Press Verify with 123456, return and press Resend code once the countdown ends
- **Expected:**
  1. The Dashboard shows (no session object is created; only the screen switches)
  2. The console logs actions `verify_otp` and `resend_otp`, no HTTP request is made and no storage key is written
- **Notes:** Covers the observable prototype side only. The service itself (an API) is outside qa-scope platforms (WEB, RSP), so the API-level case the derivation rules ask for is not written; it needs a build with an API.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-03-WEB-035 · Data · the Feedback form reads nothing and opens empty

- **Traces:** SCR-03.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Feedback
  2. Type in Name, press ×, open Feedback
- **Expected:**
  1. Name, Email and Message are empty
  2. Name, Email and Message are empty again
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-03-WEB-036 · Data · Send feedback stores nothing and adds nothing to Contact Us

- **Traces:** SCR-03.DATA.writes, SCR-03.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Send feedback with Name "Ann Lee", Email "ann.lee@example.com", Message "The sign-in page is clear."
  2. Sign in and open Manage Contact Us
- **Expected:**
  1. "Thanks for your feedback!" shows and no HTTP request is made
  2. The list still has 10 rows starting with "testing", the info line reads "Showing 1 to 10 of 24 entries" and Ann Lee is not listed
- **Notes:** Covers the observable prototype side only. The service itself (an API) is outside qa-scope platforms (WEB, RSP), so the API-level case the derivation rules ask for is not written; it needs a build with an API. Feedback has a writer and no reader (OQ-A-20).
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-04-WEB-025 · Data · the signed-in name and role are hard-coded and ignore the typed Username

- **Traces:** SCR-04.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Sign in with Username "ronald"
  2. Read the header, the menu caption and the sidebar profile card
- **Expected:**
  1. The Dashboard shows
  2. They read "Admin Admin", "Signed in as Admin Admin" and "Administrator" (the same strings whatever was typed)
- **Notes:** Records the as-built read the story documents (hard-coded). Where the identity should come from is OQ-A-23 and may change this result.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-04-WEB-026 · Data · Sign out writes and clears nothing in browser storage

- **Traces:** SCR-04.DATA.writes, SCR-04.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Save Badge Name "Test Org" on Config
  2. Sign out and open the storage panel and network panel
- **Expected:**
  1. The toast reads `Config updated. Badge Name set to "Test Org".`
  2. `drivesafe_badge_name` still holds "Test Org", no request is made and the login screen shows (a screen switch only; no session service exists)
- **Notes:** Covers the observable prototype side only. The service itself (an API) is outside qa-scope platforms (WEB, RSP), so the API-level case the derivation rules ask for is not written; it needs a build with an API.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-05-WEB-031 · Data · the Dashboard reads the counts and the five latest reports

- **Traces:** SCR-05.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the Dashboard and read the tiles, the funnel and the table
- **Expected:**
  1. Tiles 23, 23, 0, 0, 10, 3,123, 8, 24; funnel Submitted 23, Pending 23, Under review 0, Verified 0, Rejected 0
  2. Five rows: 1 Breaking One way/No Entry 2026-09-08 05:45:32; 2 Using mobile phone while driving 2026-09-01 07:18:44; 3 Wrong parking 2026-08-19 08:44:55; 4 Using mobile phone while driving 2026-08-19 06:45:31; 5 Using mobile phone while driving 2026-08-19 06:44:37, all Pending with mobile "+1 876 ····290"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-05-WEB-032 · Data · the Dashboard writes nothing

- **Traces:** SCR-05.DATA.writes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Press the eye on row 1 twice, open a review modal and press Close, press every tile and return
- **Expected:**
  1. Counts, chips and rows are unchanged (23, 23, 0, 0 and rows 1 to 5 Pending)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-05-WEB-033 · Data · counts come from an aggregation over the whole table, not from one loaded page

- **Traces:** SCR-05.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-05
- **Decision:** —
- **Steps:**
  1. Use a data set larger than the 10 loaded rows with reports in each status outside the first page
  2. Open the Dashboard
- **Expected:**
  1. Pending, Under review, Verified and Rejected are the true counts across all reports and sum to Submitted
- **Notes:** Provisional. As built the figures come from the 10 loaded rows plus the assumption that 13 are Pending.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-06-WEB-044 · Data · the violations list reads every field of the first page

- **Traces:** SCR-06.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Manage Violation Uploads and read rows 1 and 10
- **Expected:**
  1. Row 1: S No 1, Mobile "+1 876 ····290", Vehicle Type Taxi, Category Breaking One way/No Entry, Category Owner "-", Created At 2026-09-08 05:45:32, Status Pending, Level 0, Status Updated By "-"
  2. Row 10: Vehicle Type Truck, Category Breaking traffic signal, Status Pending; the count text reads "Showing 1 to 10 of 23 entries"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-06-WEB-045 · Data · Filter, Search and Reveal never change a report

- **Traces:** SCR-06.DATA.writes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Filter to Created From 2026-09-01 / To 2026-09-30, type "parking", reveal a phone, press Reset
  2. Open the review modal for report 3
- **Expected:**
  1. Rows show and hide only
  2. The modal reads "Violation #3 — Wrong parking" with Status Pending and Level 0 (no field was written)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-06-WEB-046 · Data · filtering, searching and sorting run on all 23 reports

- **Traces:** SCR-06.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-13, OQ-V-11, OQ-V-12
- **Decision:** —
- **Steps:**
  1. Use a set where the matching report is on page 2
  2. Filter by Created From / To that matches only a page 2 report
  3. Search for text found only on page 2
- **Expected:**
  1. The report on page 2 is returned
  2. The report on page 2 is returned
- **Notes:** Server-side only (SCR-06). As built Filter and Search act on the 10 loaded rows. Export and sort order are undecided. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-07-WEB-030 · Data · the review modal reads one report with its nine detail rows

- **Traces:** SCR-07.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the modal for report 1 and for report 3
- **Expected:**
  1. Report 1: Mobile "+1 876 3125290", Vehicle Type Taxi, Created At 2026-09-08 05:45:32, Status Updated By "-", Status Pending, Level 0, nine rows in order Mobile, Vehicle Type, Category, Other Description, Location, Notes, Registration No, Created At, Status Updated By
  2. Report 3: Registration No ABC123; empty values show "—"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-07-WEB-031 · Data · Save review writes status, level and reviewer; the note is not written

- **Traces:** SCR-07.DATA.writes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open report 2, choose Under review and Level 2, type "Check the plate" in Reviewer note and press Save review
  2. Reopen report 2
  3. Read the list row
- **Expected:**
  1. The modal closes and the toast reads "Report 2 updated to Under review."
  2. Status reads Under review, Level reads 2 and the note is empty
  3. The row shows a sky-blue Under review chip, Level 2 and Status Updated By "Admin Admin"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-07-WEB-032 · Data · a status change is audited, rewarded and guarded against concurrent edits

- **Traces:** SCR-07.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-22, OQ-V-23, OQ-V-25
- **Decision:** —
- **Steps:**
  1. Two reviewers open report 1; reviewer A saves Verified; reviewer B saves Rejected from the stale copy
  2. Read the audit trail and the reporter's balance
- **Expected:**
  1. Reviewer B is refused with "This report was updated by someone else." (PROPOSED)
  2. The audit trail holds who, when, old status and new status, and the reporter was credited once (number of points not defined)
- **Notes:** PROPOSED: optimistic concurrency, audit log, reward points and notification. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-10-WEB-041 · Data · Category reads the 10 categories and the owners for the select

- **Traces:** SCR-10.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Category and read the table
  2. Open ＋ Add Category and read the Owner options
- **Expected:**
  1. 10 rows in order: Over-charging fares, Over Crowding, Other, Stunt riding, Breaking traffic signal, Wrong parking, Using mobile phone while driving, Breaking One way/No Entry, Speeding, Improper Over taking; row 1 Owner Police
  2. The Owner select offers "No owner" and "Police"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-10-WEB-042 · Data · Add, Edit and Delete change the category list and the violations list, in memory only

- **Traces:** SCR-10.DATA.writes, SCR-10.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Add "Tailgating" / "Following too closely"
  2. Edit it to Owner Police
  3. Delete it and confirm
  4. Reload the page
- **Expected:**
  1. Row 11 appears and the info line reads "Showing 1 to 11 of 11 entries"
  2. The Owner cell reads Police and the toast reads `Category "Tailgating" updated successfully.`
  3. 10 rows remain with no toast
  4. 10 seeded rows show (nothing is persisted)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-10-WEB-043 · Data · category CRUD, owner lookup and a referential check against reports

- **Traces:** SCR-10.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-10-06, OQ-V-18
- **Decision:** —
- **Steps:**
  1. Delete a category that reports use
  2. Rename a category that reports use
- **Expected:**
  1. The delete is blocked or handled so no report points at a missing category
  2. Reports follow the new name
- **Notes:** Covers the observable prototype side only. The service itself (an API) is outside qa-scope platforms (WEB, RSP), so the API-level case the derivation rules ask for is not written; it needs a build with an API. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-11-WEB-034 · Data · Owners reads the one seeded owner

- **Traces:** SCR-11.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Category Management > Owners
- **Expected:**
  1. One row reads "1 Police Polices" and the info line reads "Showing 1 to 1 of 1 entries"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-11-WEB-035 · Data · Add, Edit and Delete of owners refresh every Owner select, in memory only

- **Traces:** SCR-11.DATA.writes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Add "Transport Authority" / "Licensing body"
  2. Edit it to "Transport Authority Jamaica"
  3. Delete it and confirm
  4. Reload the page
- **Expected:**
  1. Row 2 appears and the toast reads `Owner "Transport Authority" added successfully.`
  2. The toast reads `Owner "Transport Authority Jamaica" updated successfully.` and the Category modal Owner select and the violations Category Owner filter offer the new name
  3. One row remains, no toast shows and both selects offer only Police
  4. Only Police is listed
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-12-WEB-018 · Data · Config reads the Badge Name from localStorage

- **Traces:** SCR-12.DATA.reads, ST-SCR-12-01
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Settings > Config with no saved value
  2. Set localStorage `drivesafe_badge_name` to "Test Org", reload, sign in and open Config
- **Expected:**
  1. Badge Name reads "Ministry of Transport and Mining"
  2. Badge Name reads "Test Org"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-12-WEB-019 · Data · Update writes the localStorage key and every badge line

- **Traces:** SCR-12.DATA.writes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Save "Jamaica Transport Authority" and open the storage panel
  2. Sign out and open Forgot Password? and the OTP screen
- **Expected:**
  1. `drivesafe_badge_name` holds "Jamaica Transport Authority" and the toast reads `Config updated. Badge Name set to "Jamaica Transport Authority".`
  2. The login, forgot-password and OTP screens each show "Jamaica Transport Authority" under "Admin Portal"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-13-WEB-035 · Data · Contact Us reads ten messages and the fixed total of 24

- **Traces:** SCR-13.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Manage Contact Us and read rows 1, 2 and 10
- **Expected:**
  1. Row 1 reads "testing · test@gmail.com · scripthsjdjend · 2026-08-21 12:01:28", row 2 name "bestt", row 10 name "yicitc"; the info line reads "Showing 1 to 10 of 24 entries" and Response and Replied At are blank
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-13-WEB-036 · Data · Send reply writes the response and time of one message only, in memory

- **Traces:** SCR-13.DATA.writes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Reply to row 2 "bestt" with "Noted, thank you."
  2. Read rows 1 and 2
  3. Reload the page
- **Expected:**
  1. The toast reads "Reply sent to bestt."
  2. Row 2 shows "Noted, thank you." and a Replied At time; row 1 Response and Replied At stay blank
  3. All Response and Replied At cells are blank again
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-20-WEB-053 · Data · Admin user list reads the eight seeded portal users

- **Traces:** SCR-20.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open User Management > Admin user List and read Role and Level
- **Expected:**
  1. Rows: Ronald Stephen (Administrator, no level), HANIF WALKER (Administrator), Shannay Ferguson (Administrator, 1), Level2 Admin (Violation manager, 2), Level1 Admin (Violation manager, 1), Vernon Walters (Administrator), Sharlene Hamilton (Administrator), Petra-Kene Williams (Administrator, 2)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-20-WEB-054 · Data · Add appends, Edit replaces, Delete removes by position, nothing persists

- **Traces:** SCR-20.DATA.writes, SCR-20.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Add "Test User" (ST-SCR-20-05 values)
  2. Edit Ronald's Address to "Kingston"
  3. Delete Vernon and confirm
  4. Reload the page
- **Expected:**
  1. A 9th row appears at the end and the footer reads "Showing 1 to 9 of 9 entries"
  2. The toast reads `User "Ronald Stephen" updated successfully.` and the row shows Kingston
  3. No toast shows and rows renumber 1 to 8; the footer reads "Showing 1 to 8 of 8 entries"
  4. The 8 seeded rows with Address Bangalore for Ronald
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-20-WEB-055 · Data · user CRUD service enforces unique email, hashes passwords and audits

- **Traces:** SCR-20.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-20-05, OQ-20-08
- **Decision:** —
- **Steps:**
  1. Add a user with Email "ronaldstephen@myambergroup.com" (already used)
  2. Add a user with a compliant password and read what is stored
- **Expected:**
  1. "A user with this email already exists." shows (PROPOSED) and no row is added
  2. The password is stored only as a hash and an audit entry records the creation (neither defined by a story beyond this)
- **Notes:** As built the typed password is read for validation and thrown away. Uniqueness, hashing, reset delivery, export and audit are server work. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-21-WEB-042 · Data · App user list reads ten of 3,123 users

- **Traces:** SCR-21.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open User Management > App user List
- **Expected:**
  1. 10 rows with phones ····567, ····979, ····990, ····346, ····075, ····702, ····359, ····758, ····580, ····052, Earner and Reedemed 0 and the footer "Showing 1 to 10 of 3,123 entries"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-21-WEB-043 · Data · Add and Edit write to the in-memory page and never change the total

- **Traces:** SCR-21.DATA.writes, SCR-21.STATE.after-add
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Add "8761234567" with First "Ann" and Last "Lee"
  2. Edit row 1 Earner Points to 50
  3. Reload the page
- **Expected:**
  1. An 11th row appears, phone masked as •••••••567, toast "App user 8761234567 added successfully." and the footer reads "Showing 1 to 11 of 3,123 entries"
  2. Row 1 shows 50 and the toast reads "App user 1234567 updated successfully."
  3. 10 seeded rows with 0 points show
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-21-WEB-044 · Data · a paged, searchable app-user service finds users by unmasked phone

- **Traces:** SCR-21.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-21-06, OQ-21-05, OQ-21-11
- **Decision:** —
- **Steps:**
  1. Search for a full phone number that is not among the first 10 users
- **Expected:**
  1. The matching user is listed (as built only the 10 loaded rows, masked, are searched)
- **Notes:** Covers the observable prototype side only. The service itself (an API) is outside qa-scope platforms (WEB, RSP), so the API-level case the derivation rules ask for is not written; it needs a build with an API. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-22-WEB-032 · Data · the profile card shows literals that match no stored user

- **Traces:** SCR-22.DATA.reads
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Profile and read the card
  2. Look for itdept@ta.org.jm on Admin user List
- **Expected:**
  1. Email itdept@ta.org.jm, Phone +1 876 555 0100, Role Administrator, Level —, Last login 2026-10-22 16:08, name Admin Admin, status Active
  2. No row of the 8 users has that email or phone
- **Notes:** Records the as-built literals the story documents (same values as ST-SCR-22-01). Their real source is OQ-22-02 and may change this result.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-22-WEB-033 · Data · a successful password change resets the form and writes nothing

- **Traces:** SCR-22.DATA.writes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Complete a valid change (ST-SCR-22-07)
  2. Open the storage and network panels
- **Expected:**
  1. A toast reads "Password updated successfully." and all three fields are empty
  2. No request is made and nothing is stored
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-22-WEB-034 · Data · change-own-password verifies the current password, hashes the new one and ends other sessions

- **Traces:** SCR-22.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-22-03, OQ-22-07
- **Decision:** —
- **Steps:**
  1. Submit a wrong Current password
  2. Submit the right one
- **Expected:**
  1. "Current password is incorrect." shows (PROPOSED)
  2. The password is changed, other sessions are signed out and the user is notified by email (PROPOSED)
- **Notes:** Covers the observable prototype side only. The service itself (an API) is outside qa-scope platforms (WEB, RSP), so the API-level case the derivation rules ask for is not written; it needs a build with an API. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —
