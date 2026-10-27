<!-- authored by senior-qa -->
# TC · Usability per screen (C15) and decision-blocked usability cases

Ids belong to the screens named in the id · author senior-qa

### TC-SCR-00-WEB-026 · Usability · keyboard path through sign-in and visible labels

- **Traces:** SCR-00.ACT.username, SCR-00.ACT.password, SCR-00.ACT.login-aria-label-sign-in, ST-SCR-00-01
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the prototype URL and read the labels and placeholders
  2. Press Tab from the Password field until LOGIN has focus
  3. Press Space on LOGIN
- **Expected:**
  1. Visible labels "Username" and "Password" with placeholders "Enter your username" and "Enter your password"; the Password field has no show/hide eye
  2. Tab reaches Forgot Password? and then LOGIN in that order, each with a visible focus ring
  3. The OTP screen appears
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-01-WEB-020 · Usability · error recovery: message under the field, focus returned, message clears on typing

- **Traces:** ST-SCR-01-01, ST-SCR-01-04, ST-SCR-01-02
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Forgot Password? and press Send code with the field empty
  2. Type "a"
  3. Select all, type "abc" and press Send code
- **Expected:**
  1. "Email is required." shows under the field in red, the field is outlined, focus is in the field and the screen stays
  2. The message and the red outline disappear
  3. "Please enter a valid email address." shows
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-02-WEB-031 · Usability · code entry: auto-advance, backspace, arrows and paste

- **Traces:** ST-SCR-02-04, SCR-02.ACT.digit-boxes-1-6-aria-label-digit-1-6, SCR-02.VAL.each-box-one-digit-non-digits-removed-on
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Reach the OTP screen; read where focus is
  2. Type 1, then "a", then 2
  3. Press Backspace on an empty box, then ArrowLeft and ArrowRight
  4. Clear the boxes and paste "123 456"
- **Expected:**
  1. Focus is in box 1 ("Digit 1") and Resend code is disabled with the label "(500s)"
  2. Box 1 holds 1, the "a" is removed and 2 lands in box 2 (each digit moves focus to the next box)
  3. Backspace and ArrowLeft move focus back one box, ArrowRight moves it forward
  4. The boxes read 1,2,3,4,5,6 and focus is on box 6
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-03-WEB-034 · Usability · required fields are marked, errors show under each field and focus goes to the first

- **Traces:** ST-SCR-03-02, SCR-03.STATE.validation-error, SCR-03.VAL.message-minimum-10-characters
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Feedback and read the intro
  2. Press Send feedback with the form empty
  3. Fill Name "Ann Lee", Email "ann.lee@example.com", Message "Too short" and leave the Message field
- **Expected:**
  1. The intro reads "Share a question, issue, or suggestion. Fields marked * are required."
  2. "Name is required.", "Email is required." and "Message is required." show and focus is in Name
  3. "Message must be at least 10 characters." shows (PROPOSED rule)
- **Notes:** The 10-character minimum and its message are PROPOSED in SCR-03; steps 1-2 are declared behaviour.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-04-WEB-023 · Usability · account menu: trigger state, outside click and Escape

- **Traces:** ST-SCR-04-02, ST-SCR-04-06, SCR-04.ACT.aa-admin-admin-aria-haspopup-aria-expand
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Read the header trigger, press it and read aria-expanded
  2. Click elsewhere on the page
  3. Open the menu and Logout, then press Escape
- **Expected:**
  1. The trigger shows "AA" and "Admin Admin ▾"; aria-expanded flips to true and the card shows "Signed in as Admin Admin", Profile and Logout (red)
  2. The menu closes and aria-expanded is false
  3. The dialog closes and the user stays signed in
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-05-WEB-029 · Usability · phone reveal toggle changes label, icon and state

- **Traces:** ST-SCR-05-04, SCR-05.ACT.beside-a-mobile-number-aria-label-show-f
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Read the label of the eye beside row 1's phone
  2. Press it
  3. Press it again
- **Expected:**
  1. Accessible name "Show full phone number" and the number reads "+1 876 ····290"
  2. The number reads "+1 876 3125290", the icon is 🙈, the name is "Hide full phone number" and aria-pressed is true
  3. The number reads "+1 876 ····290" again
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-06-WEB-042 · Usability · the Owner filter acts only on Filter and the count text says what is shown

- **Traces:** ST-SCR-06-04, ST-SCR-06-05, SCR-06.ACT.category-owner
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Choose Category Owner "Police" without pressing Filter
  2. Press Filter
  3. Press Reset
- **Expected:**
  1. All 10 rows are still shown and the text reads "Showing 1 to 10 of 23 entries"
  2. No rows show and the text reads "Showing 0 of 10 entries"
  3. The inputs are empty, all 10 rows show and the text reads "Showing 1 to 10 of 23 entries"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-07-WEB-029 · Usability · the review form starts at the report's current values and Close discards without asking

- **Traces:** ST-SCR-07-05, ST-SCR-07-01, SCR-07.STATE.unsaved-changes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open report 1 and read Status, Level and the Reviewer note placeholder
  2. Change Status to Rejected and press Close
  3. Reopen report 1
- **Expected:**
  1. Status reads Pending, Level reads 0 (with the amber tag "severity 0–3") and the note placeholder reads "Why this decision?"
  2. The modal closes without a confirmation and the row still shows Pending
  3. Status reads Pending again
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-10-WEB-039 · Usability · invalid Add Category: both messages, red rings, focus on the first field, hint visible, clears on typing

- **Traces:** ST-SCR-10-03, SCR-10.VAL.category-name-cat-name-required-trimmed, SCR-10.VAL.description-cat-desc-required-trimmed-mi
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Add Category and read the Category name hint
  2. Press Save with both fields empty
  3. Type "T" in Category name
- **Expected:**
  1. The hint "Max 60 chars" is shown beside the name field
  2. "Category name is required." and "Description is required." show, both fields have a red ring, focus is on Category name and no row is added
  3. The Category name message and ring disappear while the Description message stays
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-11-WEB-032 · Usability · Add Owner placeholders and invalid-save recovery

- **Traces:** ST-SCR-11-03, SCR-11.ACT.add-owner
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open ＋ Add Owner and read the placeholders
  2. Press Save empty
- **Expected:**
  1. The placeholders read "e.g. Police" and "Short description"
  2. "Owner is required." and "Description is required." show and focus is on Owner
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-12-WEB-016 · Usability · Enter in the Badge Name field saves exactly as the Update button does

- **Traces:** ST-SCR-12-02, SCR-12.ACT.update
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Config, replace the text with "Jamaica Transport Authority" and press Enter in the field
  2. Sign out and read the login badge line
- **Expected:**
  1. A toast reads `Config updated. Badge Name set to "Jamaica Transport Authority".` and the page does not reload
  2. The login screen shows "Jamaica Transport Authority" under "Admin Portal"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-13-WEB-033 · Usability · reply modal gives context read-only and offers an earlier response for revision

- **Traces:** ST-SCR-13-02, ST-SCR-13-05
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Press ↩ on row 1 and read the modal
  2. Send "Thank you, we are looking into it."
  3. Press ↩ on row 1 again
- **Expected:**
  1. The modal shows From "testing <test@gmail.com>", Message "scripthsjdjend" and Received "2026-08-21 12:01:28" as read-only text and an empty response box
  2. Row 1 shows the response and a Replied At time
  3. The box contains "Thank you, we are looking into it." and sending new text replaces the response and the time
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-20-WEB-051 · Usability · Save is disabled until valid, errors appear on leaving a field and the checklist ticks live

- **Traces:** ST-SCR-20-03, ST-SCR-20-04, ST-SCR-20-06
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open ＋ Add User and read the state of Save
  2. Focus Email, type "abc" and tab away, then type "d"
  3. Type "abcdefghijkl" in Password
  4. Press the eye in Password
- **Expected:**
  1. Save is disabled (pale green), the five rules are unticked and the meter is grey
  2. "Please enter a valid email address." shows with a red ring; typing removes it immediately
  3. Only "At least 12 characters" and "A lowercase letter (a–z)" are ticked and Save stays disabled
  4. The password shows as plain text, the label reads "Hide password" and aria-pressed is true
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-21-WEB-040 · Usability · Phone No error on blur, Save enables once valid, points start at 0

- **Traces:** ST-SCR-21-03, ST-SCR-21-04
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open ＋ Add App User and read the points and Save
  2. Type "12ab" in Phone No and tab away
  3. Replace it with "8761234567"
- **Expected:**
  1. Earner Points and Reedemed Points read 0 and Save is disabled
  2. "Phone No must be digits only." shows and Save stays disabled
  3. The message clears and Save is enabled
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-22-WEB-031 · Usability · every error shows at once, focus goes to the first, Enter submits, eyes are per field

- **Traces:** ST-SCR-22-04, ST-SCR-22-08, SCR-22.ACT.update-password
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Leave Current empty, type New "Abcdefghijk1!" and Confirm "x", press Enter in Confirm
  2. Press the eye in New password
  3. Type in Current password
- **Expected:**
  1. "Current password is required." and "Passwords do not match." show together, focus is on Current password and no toast appears
  2. Only New password shows plain text and its label reads "Hide password"; the other two stay masked
  3. The Current password message clears
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-00-WEB-027 · Usability · Enter in Username or Password submits the sign-in form

- **Traces:** SCR-00.ACT.username, SCR-00.ACT.password
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-08
- **Decision:** —
- **Steps:**
  1. Type a Username and Password and press Enter in the Password field
- **Expected:**
  1. The sign-in is submitted as LOGIN does
- **Notes:** As built Enter does not submit (onsubmit="return false" and the button is type=button). Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-01-WEB-021 · Usability · Form errors are announced to a screen reader (role=alert)

- **Traces:** SCR-01.STATE.error
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-10
- **Decision:** —
- **Steps:**
  1. Press Send code with an empty Email address with a screen reader on
- **Expected:**
  1. The message "Email is required." is announced without moving focus
- **Notes:** As built only the OTP error line has role=alert. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-05-WEB-030 · Usability · The KPI tiles are reachable and operable from the keyboard

- **Traces:** SCR-05.ACT.tile-violation-reports, SCR-05.ACT.tile-categories
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-08
- **Decision:** —
- **Steps:**
  1. Press Tab from the page head and try to reach "23 Violation reports"
  2. Press Enter on the focused tile
- **Expected:**
  1. Each tile receives focus in order with a visible ring
  2. The violations list opens
- **Notes:** As built the tiles are <a> elements without href: Tab does not reach them. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-06-WEB-043 · Usability · An empty search or filter result shows a message

- **Traces:** SCR-06.STATE.filtered-to-nothing
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-09
- **Decision:** —
- **Steps:**
  1. Filter by Category Owner Police
- **Expected:**
  1. No rows show and a visible message states that nothing matches
- **Notes:** As built the body is blank and the text reads "Showing 0 of 10 entries". Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-12-WEB-017 · Usability · The "Badge Name is required." message is visible

- **Traces:** ST-SCR-12-03, SCR-12.STATE.invalid
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-12-02
- **Decision:** —
- **Steps:**
  1. Clear the Badge Name and press Update
- **Expected:**
  1. The field is outlined red and "Badge Name is required." is visible below it and announced
- **Notes:** As built the markup has no error element; only the red ring shows. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-10-WEB-040 · Usability · Delete asks with a designed dialog that names the reports affected

- **Traces:** SCR-10.ACT.delete-name-row-aria-label-delete-name
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-10-05
- **Decision:** —
- **Steps:**
  1. Press 🗑 on "Wrong parking"
- **Expected:**
  1. A designed dialog (not a native confirm) names the category and the 5 reports that use it
- **Notes:** As built a native confirm reads `Delete category "Wrong parking"?`. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-11-WEB-033 · Usability · Delete asks with a designed dialog that names the categories affected

- **Traces:** SCR-11.ACT.delete-owner-aria-label-delete-police
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-11-05
- **Decision:** —
- **Steps:**
  1. Press 🗑 on Police
- **Expected:**
  1. A designed dialog names the owner and the 1 category that uses it
- **Notes:** As built a native confirm reads `Delete owner "Police"?`. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-13-WEB-034 · Usability · Unanswered messages are signalled to the staff member

- **Traces:** SCR-13.COMM.shares-sidebar
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-13-06
- **Decision:** —
- **Steps:**
  1. Look at the sidebar item Manage Contact Us and the list
- **Expected:**
  1. A counter or marker shows the unanswered messages (24 at seed)
- **Notes:** As built no counter exists, unlike the Pending badge on Manage Violation Uploads. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-20-WEB-052 · Usability · The Option column (Edit, Delete, Reset password) is visible without scrolling at 1440x900

- **Traces:** SCR-20.STATE.populated, SCR-20.ACT.row-aria-label-edit-firstname
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-20-13
- **Decision:** —
- **Steps:**
  1. Open Admin user List at 1440x900
- **Expected:**
  1. The Option column is visible without horizontal scrolling
- **Notes:** As built the table is 1,139 px wide and scrolls up to about 1,570 px; Option is off-screen. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-21-WEB-041 · Usability · Previous is disabled on page 1 and the pager works

- **Traces:** SCR-21.ACT.previous-1-2-3-313-next
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-21-06, OQ-V-13
- **Decision:** —
- **Steps:**
  1. Look at Previous on page 1
  2. Press page 2
- **Expected:**
  1. Previous is disabled
  2. Users 11 to 20 show
- **Notes:** As built Previous looks enabled and nothing is wired. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-04-WEB-024 · Usability · Signing out with unsaved input in a form warns first

- **Traces:** SCR-04.ACT.sign-out
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Usability · Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-24
- **Decision:** —
- **Steps:**
  1. Type a value in New password on Profile
  2. Choose Logout and press Sign out
- **Expected:**
  1. A warning offers to keep the typed input
  2. The sign-out proceeds only after the warning is answered
- **Notes:** As built the typed value is lost silently. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —
