<!-- authored by senior-qa: cross-cutting requirements the stories surface -->
# TC · X · Cross-cutting requirements

Auth, roles, PII, referential integrity, counts, search/filter, focus, XSS, password policy · author senior-qa

### TC-X-WEB-001 · Auth · any credentials are accepted: empty Username and Password reach the OTP screen (as built, defect)

- **Traces:** ST-SCR-00-05, SCR-00.STATE.empty-submit, SCR-00.DIS.login-aria-label-sign-in
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Regression
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the prototype URL with both fields empty
  2. Press LOGIN
- **Expected:**
  1. LOGIN is enabled (never disabled, even with both fields empty)
  2. The OTP screen appears reading "Enter the 6-digit code sent to your email" (as built, flagged OQ-A-01)
- **Notes:** Characterises the defect the story records (ST-SCR-00-05). The intended behaviour is the next case.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-002 · Auth · empty or whitespace Username / Password is refused (PROPOSED rules)

- **Traces:** ST-SCR-00-06, SCR-00.VAL.username-required-trimmed-3-254-chars-em, SCR-00.VAL.password-required-1-128-chars-128-mirror
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Boundary value analysis
- **Priority:** P1
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-01, OQ-A-05
- **Decision:** —
- **Steps:**
  1. Leave Username empty, type Password "x" and press LOGIN
  2. Type Username "   " (spaces) and Password "x" and press LOGIN
  3. Type Username "ronald", leave Password empty and press LOGIN
  4. Type a 2-character Username "ab" and Password "x" and press LOGIN
- **Expected:**
  1. "Username is required." shows under the field and no navigation occurs
  2. "Username is required." shows (the value is trimmed)
  3. "Password is required." shows and no navigation occurs
  4. The 2-character Username is refused (minimum is 3 characters, PROPOSED); the OTP screen does not appear
- **Notes:** All rules and messages here are PROPOSED in SCR-00 (the prototype has no rule at all). Username format (email or handle) is OQ-A-05. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-003 · Auth · wrong username or password shows one generic message that does not say which was wrong

- **Traces:** SCR-00.VAL.credentials-must-match-an-account, SCR-00.STATE.error
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Equivalence partitioning
- **Priority:** P1
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-01
- **Decision:** —
- **Steps:**
  1. Type a Username that does not exist and any Password and press LOGIN
  2. Type an existing Username (ronaldstephen@myambergroup.com) with a wrong Password and press LOGIN
- **Expected:**
  1. "Incorrect username or password." shows; the OTP screen does not appear
  2. The same text "Incorrect username or password." shows, identical to step 1
- **Notes:** Server-side, PROPOSED. The prototype accepts both. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-004 · Auth · lockout or throttle after repeated failed sign-ins, and a loading state while verifying

- **Traces:** SCR-00.STATE.locked-throttled, SCR-00.STATE.loading
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** State transition
- **Priority:** P1
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-03, OQ-A-02
- **Decision:** —
- **Steps:**
  1. Press LOGIN with wrong credentials repeatedly beyond the attempt limit
  2. Press LOGIN with correct credentials once locked
  3. Press LOGIN once and watch the button while verification is in flight
- **Expected:**
  1. After the limit the sign-in is refused (limit and wording not defined by any story)
  2. Sign-in is still refused during the lock period
  3. The button shows an in-flight state and a second press does not send a second request (not defined)
- **Notes:** SCR-00 lists both states as Undefined. The expected values are to be filled when the questions are decided. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-005 · Auth · the code step accepts only the issued code, once, within its lifetime

- **Traces:** SCR-02.VAL.code-correctness-must-equal-the-issued-c, SCR-02.VAL.code-lifetime-valid-for-a-limited-time-e, SCR-02.VAL.attempts-maximum-5-wrong-entries-per-cod, SCR-02.STATE.wrong-code, SCR-02.STATE.expired-code
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
  1. Reach the OTP screen and type 000000 (not the issued code) then Verify
  2. Request a new code with Resend code, wait past the code lifetime and verify the issued code
  3. Enter five wrong codes then press Verify again
- **Expected:**
  1. "That code is incorrect." shows and the Dashboard does not appear
  2. "That code has expired. Request a new one." shows
  3. "Too many attempts. Request a new code." shows
- **Notes:** The three messages are PROPOSED. The lifetime (e.g. 10 minutes) is PROPOSED. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-006 · Auth · the prototype has no session: a reload always returns to the login screen

- **Traces:** SCR-04.STATE.signed-out, SCR-00.STATE.default
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Regression
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Sign in and open the Dashboard
  2. Reload the page (F5)
- **Expected:**
  1. The Dashboard shows with the shell visible
  2. The "Welcome back" login screen shows with empty Username and Password and the sidebar and header hidden (the boot screen is go("login"))
- **Notes:** Characterises the as-built boot; whether a real session survives a reload is OQ-A-23 / OQ-A-25.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-007 · Auth · idle session ends after 30 minutes with the expiry message

- **Traces:** SCR-04.VAL.session-not-a-field-idle-timeout-of-30-m
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Boundary value analysis
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-25
- **Decision:** —
- **Steps:**
  1. Sign in and leave the page idle for 30 minutes
  2. Press any control
- **Expected:**
  1. The session stays valid until the limit
  2. The login screen shows with "Your session has expired. Please sign in again."
- **Notes:** PROPOSED rule, no idle timer exists in the prototype. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-008 · Auth · the reCAPTCHA stub is a fixed 0.9 score logged to the console, never a real check

- **Traces:** SCR-00.DATA.services-required, SCR-01.DATA.services-required, SCR-02.DATA.services-required
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Regression
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-06
- **Decision:** —
- **Steps:**
  1. Open the browser console, press LOGIN, then Send code on SCR-01, then Verify and Resend code on SCR-02
- **Expected:**
  1. The console logs actions login, forgot_password, verify_otp and resend_otp each with score 0.9 and no network request is made for any of them ("console log only")
- **Notes:** Observable prototype side only. The real score threshold and failure UX are OQ-A-06; a production service needs an API-level case (API is not in qa-scope platforms). Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-009 · Role · Violation manager cannot open the Admin user list or add, edit, delete or reset a portal user

- **Traces:** SCR-20.STATE.permission-denied, SCR-20.ACT.add-user, SCR-20.ACT.row-aria-label-delete-firstname
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Decision table (role × screen)
- **Priority:** P1
- **Tier:** regression
- **Role:** Violation manager
- **Preconditions:** A Violation manager account exists in a build that checks roles
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-20-02, OQ-A-27
- **Decision:** —
- **Steps:**
  1. Sign in as a Violation manager
  2. Try to open User Management > Admin user List
  3. Try ＋ Add User, ✎, 🗑 and 🔒 if the list is reachable
- **Expected:**
  1. Sign-in succeeds and the Dashboard shows
  2. Access is refused or the item is absent (Administrator-only, PROPOSED)
  3. No portal user can be created, changed, deleted or reset; the list of 8 users is unchanged
- **Notes:** The prototype never checks the role: the signed-in user is hard-coded as "Admin Admin / Administrator" and Administrator-only is PROPOSED (OQ-A-27). There is no way to sign in as a Violation manager on the prototype, so the case needs a build with real accounts; the expected refusal is the story's PROPOSED rule. Hiding a control is presentation: the refusal must also hold on the server (API cases are outside qa-scope platforms). Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-010 · Role · Violation manager cannot edit App users or reveal their phone numbers

- **Traces:** SCR-21.ROLE.save, SCR-21.STATE.permission-denied
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Decision table (role × screen)
- **Priority:** P1
- **Tier:** regression
- **Role:** Violation manager
- **Preconditions:** A Violation manager account exists in a build that checks roles
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-21-02, OQ-V-19
- **Decision:** —
- **Steps:**
  1. Sign in as a Violation manager
  2. Open App user List and press ✎ on row 1
  3. Press the eye icon on row 1
- **Expected:**
  1. Sign-in succeeds
  2. Edit and Save are refused or absent (Administrator-only is PROPOSED)
  3. The phone stays masked as ····567
- **Notes:** The prototype never checks the role: the signed-in user is hard-coded as "Admin Admin / Administrator" and Administrator-only is PROPOSED (OQ-A-27). There is no way to sign in as a Violation manager on the prototype, so the case needs a build with real accounts; the expected refusal is the story's PROPOSED rule. Hiding a control is presentation: the refusal must also hold on the server (API cases are outside qa-scope platforms). Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-011 · Role · Violation manager cannot manage categories, owners or the Badge Name

- **Traces:** SCR-10.STATE.permission-denied, SCR-11.STATE.permission-denied, SCR-12.STATE.empty-loading-error-permission
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Decision table (role × screen)
- **Priority:** P1
- **Tier:** regression
- **Role:** Violation manager
- **Preconditions:** A Violation manager account exists in a build that checks roles
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-10-03, OQ-11-03, OQ-12-04
- **Decision:** —
- **Steps:**
  1. Sign in as a Violation manager
  2. Try Category, Owners and Config in turn and attempt Add, Edit, Delete and Update
- **Expected:**
  1. Sign-in succeeds
  2. Each change is refused or the control is absent; categories (10), owners (1) and the Badge Name "Ministry of Transport and Mining" are unchanged
- **Notes:** The prototype never checks the role: the signed-in user is hard-coded as "Admin Admin / Administrator" and Administrator-only is PROPOSED (OQ-A-27). There is no way to sign in as a Violation manager on the prototype, so the case needs a build with real accounts; the expected refusal is the story's PROPOSED rule. Hiding a control is presentation: the refusal must also hold on the server (API cases are outside qa-scope platforms). Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-012 · Role · Violation manager access to Manage Contact Us and to review decisions

- **Traces:** SCR-13.STATE.permission-denied, SCR-05.STATE.permission-denied
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Decision table (role × screen)
- **Priority:** P1
- **Tier:** regression
- **Role:** Violation manager
- **Preconditions:** A Violation manager account exists in a build that checks roles
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-13-03, OQ-V-03, OQ-V-00
- **Decision:** —
- **Steps:**
  1. Sign in as a Violation manager
  2. Open Manage Contact Us and try to send a reply
  3. Open a report, set Status Verified and press Save review
- **Expected:**
  1. Sign-in succeeds
  2. Access to Contact Us follows the role decision (not defined by any story)
  3. Which reports a Violation manager may decide, by Level, follows the decision (OQ-V-03)
- **Notes:** The prototype never checks the role: the signed-in user is hard-coded as "Admin Admin / Administrator" and Administrator-only is PROPOSED (OQ-A-27). There is no way to sign in as a Violation manager on the prototype, so the case needs a build with real accounts; the expected refusal is the story's PROPOSED rule. Hiding a control is presentation: the refusal must also hold on the server (API cases are outside qa-scope platforms). Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-013 · Role · the Administrator can reach every screen (positive control for the role matrix)

- **Traces:** SCR-04.COMM.receives-every-shell-screen, SCR-20.STATE.populated
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Decision table (role × screen)
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open in turn Dashboard, Manage Violation Uploads, Category, Owners, Manage Contact Us, Admin user List, App user List, Config and Profile
- **Expected:**
  1. Each screen shows its heading ("Dashboard", "User uploaded Violations", "Category", "Owner", "User ContactUs", "User", "App User", "Config", "My Profile") with no refusal message
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-014 · Role · Level means one thing: portal-user Level 1-3 versus report Level 0-3

- **Traces:** SCR-20.VAL.level-optional-one-of-blank-1-2-3-the-la, SCR-07.VAL.level-must-be-1-when-status-is-verified
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-16, OQ-20-02, OQ-V-03
- **Decision:** —
- **Steps:**
  1. On Admin user List add a Violation manager with Level 3
  2. Sign in as that user and open a report with Level 0 and try to verify it
- **Expected:**
  1. The user is saved with Level 3 (Level blank, 1, 2 or 3 are the only options)
  2. Whether the Level of the user limits which report Level the user may decide is defined by the owner's answer; the report Level options remain 0, 1, 2 and 3
- **Notes:** Level 0-3 on SCR-07 and Level 1-3 on SCR-20 have no stated relation. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-015 · PII · every list masks the phone and reveals one row at a time, and a re-render re-masks it

- **Traces:** ST-SCR-05-04, ST-SCR-06-02, ST-SCR-21-02, SCR-06.STATE.masked, SCR-06.STATE.revealed, SCR-21.STATE.phone-revealed
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Functional
- **Technique:** State transition
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. On the Dashboard read row 1 Mobile and press its eye icon
  2. On Manage Violation Uploads read rows 1 and 2 and reveal only row 1
  3. Open row 3 and Save review with no change
  4. On App user List reveal row 1, press ✎ on row 2 and Save
- **Expected:**
  1. Row 1 reads "+1 876 ····290" then "+1 876 3125290" with the icon 🙈; pressing again returns the mask
  2. Row 1 shows "+1 876 3125290" and row 2 still shows "+1 876 ····290"
  3. After the table is rebuilt every row, including row 1, shows "+1 876 ····290" again
  4. Row 1 shows ····567 again after the save (all rows re-mask)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-016 · PII · the review modal shows the reporter's full phone with no mask and no reveal control (bypass)

- **Traces:** SCR-07.ACT.item, SCR-06.COMM.shares-mobile-masking, ST-SCR-07-01
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-19
- **Decision:** —
- **Steps:**
  1. Open report 1 from the list or the Dashboard, where the phone is masked
  2. Read the Mobile row in the modal
- **Expected:**
  1. Row 1 reads "+1 876 ····290" in the list
  2. The modal's Mobile row is masked as in the list with an eye reveal control, or is shown in full only for a role the owner allows and the reveal is recorded
- **Notes:** As built ST-SCR-07-01 asserts "+1 876 3125290" in full with no toggle. Who may reveal and whether each reveal is audited is undecided. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-017 · PII · the app-user Edit button label and the success toast expose the full phone number (bypass)

- **Traces:** SCR-21.ACT.row-aria-label-edit-app-user-full-phone, SCR-21.COMM.sends-toast, ST-SCR-21-06
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-21-11
- **Decision:** —
- **Steps:**
  1. On App user List inspect the accessible name and title of row 1's ✎ button
  2. Press ✎ on row 1 and Save
  3. Read the Phone No field in the Edit dialog
- **Expected:**
  1. The accessible name reads "Edit app user 1234567" as built; a masked name such as "Edit app user ····567" is the privacy-safe form
  2. The toast reads "App user 1234567 updated successfully." as built; a masked phone is the privacy-safe form
  3. The Edit dialog's Phone No holds 1234567 (needed to edit the record)
- **Notes:** The story calls the label and toast a privacy finding and asks whether they are intentional. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-018 · PII · search on App users matches the masked text, or the revealed number once revealed

- **Traces:** ST-SCR-21-08, SCR-21.VAL.search-app-users-free-text-substring-mat, SCR-21.ACT.search-app-users
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Functional
- **Technique:** Equivalence partitioning
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Type "567" in Search app users
  2. Clear the box, type "1234567"
  3. Clear the box, reveal row 1 with its eye icon and type "1234567"
- **Expected:**
  1. Only row 1 stays visible
  2. No rows show (the text on screen is ····567)
  3. Row 1 stays visible (the revealed number is the row text)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-019 · PII · CSV, Excel and Print do not export unmasked phone numbers

- **Traces:** SCR-06.ACT.csv, SCR-06.ACT.excel, SCR-06.ACT.print, SCR-21.ACT.csv-excel-print, SCR-20.ACT.csv
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-12, OQ-21-05, OQ-20-03
- **Decision:** —
- **Steps:**
  1. On Manage Violation Uploads and on App user List press CSV, Excel and Print
- **Expected:**
  1. As built nothing happens (ST-SCR-06-08); when built, the file or print view shows phones masked as "+1 876 ····290" and ····567, rows follow the active filter and nothing exports without an audit entry (rule not defined)
- **Notes:** Exporting unmasked numbers defeats the mask (SCR-06 OQ-V-12). Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-020 · PII · other personal data is shown in clear: portal-user phone and citizen email

- **Traces:** SCR-20.STATE.populated, SCR-13.STATE.populated
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Regression
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-13-07
- **Decision:** —
- **Steps:**
  1. Open Admin user List and read the Phone No of row 1
  2. Open Manage Contact Us and read the Email of row 1
- **Expected:**
  1. Row 1 reads Phone No 123456789 (plain text, not masked)
  2. Row 1 reads Email test@gmail.com in full (not masked)
- **Notes:** Characterises current display; whether the sender email should be masked like the phone is OQ-13-07. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-021 · PII · the same person is stored in two phone formats and the reporter cannot be linked to the app user

- **Traces:** SCR-21.COMM.shares-violations-list-and-review-modal, SCR-06.COMM.sends-scr-21-app-user-list-05-users-scr
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-21-09
- **Decision:** —
- **Steps:**
  1. Read report 1 Mobile in the revealed state
  2. Search App user List for the same digits
- **Expected:**
  1. Report 1 reads "+1 876 3125290"
  2. A single phone format links both records; as built the app users are digits only and no row matches
- **Notes:** Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-022 · Integrity · reports keep working when their category is renamed

- **Traces:** SCR-10.COMM.breaks-if-changed-violations-list-dashbo, SCR-06.COMM.receives-category-screen, SCR-07.COMM.receives-scr-06-scr-05
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
  1. Edit category "Using mobile phone while driving" (reports 2, 4 and 5) to "Phone use while driving" and press Save
  2. Read Category and Category Owner of reports 2, 4 and 5 and the title of the review modal for report 2
- **Expected:**
  1. The toast reads `Category "Phone use while driving" updated successfully.`
  2. Reports 2, 4 and 5 show the new name and the modal title reads "Violation #2 — Phone use while driving" (as built they keep the old name text)
- **Notes:** Provisional: the rule (id link, cascade or block) is undecided.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-023 · Integrity · a category in use cannot vanish silently

- **Traces:** SCR-10.ACT.delete-name-row-aria-label-delete-name, SCR-10.COMM.shares-report-review-modal-title-violati
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-10-06, OQ-10-05
- **Decision:** —
- **Steps:**
  1. Delete category "Wrong parking" (reports 3, 6, 7, 8, 9) and confirm `Delete category "Wrong parking"?`
  2. Read reports 3, 6, 7, 8 and 9
- **Expected:**
  1. The delete is blocked or warns that 5 reports use the category
  2. No report is left with a category name that is missing from the category list
- **Notes:** As built the row disappears with no toast and the reports keep the old text with Category Owner "-". Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-024 · Integrity · an owner in use cannot vanish, and Edit-Save does not silently blank the owner

- **Traces:** SCR-11.ACT.delete-owner-aria-label-delete-police, ST-SCR-11-06, SCR-10.ACT.edit-name-row-aria-label-edit-name
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-11-06
- **Decision:** —
- **Steps:**
  1. Delete owner Police and confirm
  2. Press ✎ on category row 1 and read the Owner select
  3. Press Save
- **Expected:**
  1. The delete is blocked or cascades visibly (a warning names the categories that use Police)
  2. The Owner select shows a valid state; as built it renders empty with no option selected
  3. Saving never writes owner "" without the user having chosen "No owner"
- **Notes:** Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-025 · Integrity · names are unique (case-insensitive) because the name is the join key

- **Traces:** SCR-10.VAL.category-name-uniqueness-case-insensitiv, SCR-11.VAL.owner-uniqueness-case-insensitive-unique
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Equivalence partitioning
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-10-07, OQ-11-07
- **Decision:** —
- **Steps:**
  1. Add category "over crowding" (an existing "Over Crowding" differs only in case)
  2. Add owner "POLICE"
- **Expected:**
  1. "A category with this name already exists." shows and no row is added (PROPOSED wording)
  2. "An owner with this name already exists." shows and no row is added (PROPOSED wording)
- **Notes:** As built duplicates are accepted. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-026 · Integrity · owner names offered by Category and by the violations filter follow the Owners list (works as built)

- **Traces:** SCR-11.COMM.sends-scr-10-category, SCR-10.COMM.receives-scr-11-owners, SCR-10.COMM.shares-violations-list-owner-filter-all
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Integration · Positive
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Add owner "Transport Authority" on Owners
  2. Open the Add Category modal and read Owner options
  3. Open the Category Owner filter on Manage Violation Uploads
- **Expected:**
  1. Row 2 appears on Owners
  2. The Owner select offers "No owner", "Police" and "Transport Authority"
  3. The filter offers "All Category Owners", "Police" and "Transport Authority"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-027 · Counts · tiles, funnel and sidebar badge agree at seed and sum to Submitted

- **Traces:** ST-SCR-05-01, ST-SCR-05-02, SCR-05.COMM.shares-sidebar-pending-badge, SCR-05.VAL.none-no-input-fields
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Data
- **Technique:** Decision table
- **Priority:** P1
- **Tier:** sanity
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the Dashboard after sign-in and read the tiles, the funnel and the sidebar badge on Manage Violation Uploads
- **Expected:**
  1. Pending review 23 + Verified 0 + Rejected 0 + Under review 0 = Violation reports 23 = funnel Submitted 23
  2. The funnel Pending (23) equals the Pending tile (23) and the sidebar badge (23)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-028 · Counts · after reviews in all four statuses the parts still sum to 23 and the badge follows Pending

- **Traces:** ST-SCR-07-03, ST-SCR-05-06, SCR-05.COMM.receives-scr-07-review-modal
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Data
- **Technique:** State transition
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Set report 1 to Verified, report 2 to Rejected and report 3 to Under review, each with Save review
  2. Open the Dashboard
- **Expected:**
  1. Each save closes the modal and raises its toast (`Report 1 updated to Verified. Reporter awarded reward points.`, `Report 2 updated to Rejected.`, `Report 3 updated to Under review.`)
  2. Pending 20, Under review 1, Verified 1, Rejected 1, Submitted 23; 20 + 1 + 1 + 1 = 23; the sidebar badge reads 20; rows 1-3 show green Verified, red Rejected and sky-blue Under review chips
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-029 · Counts · a re-review moves a report between buckets without double counting

- **Traces:** ST-SCR-07-02, SCR-07.ACT.save-review
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Data
- **Technique:** State transition
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Set report 1 Verified and Save review
  2. Reopen report 1, set Pending and Save review
  3. Open the Dashboard
- **Expected:**
  1. Verified 1, Pending 22
  2. The modal closes and the toast reads "Report 1 updated to Pending."
  3. Pending 23, Verified 0, Rejected 0, Under review 0, sidebar badge 23, and the sum is 23
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-030 · Counts · counts cover every report, not the 10 loaded rows

- **Traces:** SCR-05.DATA.services-required, SCR-05.COMM.shares-hard-coded-tiles
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Boundary value analysis
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-05
- **Decision:** —
- **Steps:**
  1. Load a set where reports outside the first 10 hold all four statuses
  2. Open the Dashboard
- **Expected:**
  1. Verified, Rejected and Under review include rows beyond row 10, Pending counts only reports that are Pending, and the four add up to Submitted
- **Notes:** As built Pending absorbs the 13 unloaded rows by assumption, so the sum equals 23 by coincidence. Needs a build with the full set. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-031 · Counts · the Categories, Portal users, App users and Messages tiles follow adds and deletes

- **Traces:** SCR-05.COMM.shares-hard-coded-tiles, SCR-05.ACT.tile-categories, SCR-05.ACT.tile-portal-users, SCR-05.ACT.tile-app-users
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-07
- **Decision:** —
- **Steps:**
  1. Add category "Tailgating", add a portal user, delete a portal user, add an app user
  2. Open the Dashboard
- **Expected:**
  1. Each save succeeds with its toast
  2. Categories reads 11, Portal users reads 8 (added one, deleted one), App users reads 3,124 (as built they read 10, 8 and 3,123, hard-coded)
- **Notes:** Four tiles are literals in the markup. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-032 · Counts · the Latest violation reports table lists exactly five rows, newest first

- **Traces:** SCR-05.VAL.latest-reports-exactly-5-rows-newest-cre, ST-SCR-05-03
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-06
- **Decision:** —
- **Steps:**
  1. Open the Dashboard and read the Latest violation reports table
- **Expected:**
  1. Five rows S No 1 to 5 with Created At 2026-09-08 05:45:32, 2026-09-01 07:18:44, 2026-08-19 08:44:55, 2026-08-19 06:45:31, 2026-08-19 06:44:37 in descending order
- **Notes:** The newest-first order is PROPOSED (the prototype takes the first 5 array items). Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-033 · Search x Filter · both limits apply together (AND)

- **Traces:** SCR-06.VAL.search-violations-free-text-0-100-charac, SCR-06.ACT.filter, SCR-06.ACT.search-violations
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative
- **Technique:** Decision table (filter × search)
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-15
- **Decision:** —
- **Steps:**
  1. Set Created From 2026-09-01, Created To 2026-09-30 and press Filter (rows 1 and 2 remain)
  2. Type "parking" in Search violations
- **Expected:**
  1. Rows 1 and 2 remain and the count text reads "Showing 2 of 10 entries"
  2. No rows show, because neither row 1 nor row 2 matches "parking" (as built rows 3, 6, 7, 8 and 9 reappear)
- **Notes:** SCR-06: "Production must apply both together (AND)", yet marked OQ-V-15. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-034 · Search x Filter · Reset clears the search box as well and the count text is right

- **Traces:** ST-SCR-06-05, SCR-06.STATE.reset-with-search-text
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-15
- **Decision:** —
- **Steps:**
  1. Type "parking" in Search violations (rows 3, 6, 7, 8, 9 remain)
  2. Press Reset
- **Expected:**
  1. Five rows remain
  2. The three filter inputs and the search box are empty, all 10 rows show and the text reads "Showing 1 to 10 of 23 entries" (as built the box keeps "parking")
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-035 · Search x Filter · typing in Search does not undo a Filter, and the count text follows what is shown

- **Traces:** SCR-06.STATE.searching, SCR-06.STATE.filtered
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-15
- **Decision:** —
- **Steps:**
  1. Filter to Created From 2026-09-01 / Created To 2026-09-30
  2. Type "a" then delete it
- **Expected:**
  1. Rows 1 and 2 only
  2. Rows 1 and 2 only after each keystroke, and the count text always equals the number of rows shown (as built search un-hides rows the Filter hid and the text is not updated)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-036 · Search x Filter · reversed date range is refused with a message

- **Traces:** SCR-06.VAL.created-to-vf-to-optional-date-declared, SCR-06.VAL.created-from-vf-from-optional-date-iso-y
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative
- **Technique:** Boundary value analysis
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-14
- **Decision:** —
- **Steps:**
  1. Set Created From 2026-09-30 and Created To 2026-09-01 and press Filter
- **Expected:**
  1. "From must not be after To." shows and the filter does not run (PROPOSED; as built zero rows show with no message)
- **Notes:** Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-037 · Search x Filter · leading spaces in a search are trimmed and the list-search limit is 100 on all six lists

- **Traces:** SCR-06.VAL.search-violations-free-text-0-100-charac, SCR-10.VAL.search-categories-search-input-free-text, SCR-20.VAL.search-users-free-text-substring-match-e
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative
- **Technique:** Boundary value analysis
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-26
- **Decision:** —
- **Steps:**
  1. On Manage Violation Uploads type two spaces then "parking"
  2. Type 100 characters then 101 characters in the search box of SCR-06, SCR-10, SCR-11, SCR-13, SCR-20 and SCR-21
- **Expected:**
  1. Rows 3, 6, 7, 8 and 9 remain (as built zero rows)
  2. 100 characters are accepted; the 101st is not accepted, identically on all six lists
- **Notes:** 100 and trimming are PROPOSED; the prototype states neither. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-038 · Search x Filter · no match shows a message and the footer count follows the rows (all lists)

- **Traces:** SCR-06.STATE.filtered-to-nothing, ST-SCR-06-04, SCR-10.STATE.search-no-match
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-V-09
- **Decision:** —
- **Steps:**
  1. On Manage Violation Uploads choose Category Owner Police and press Filter
  2. On Category type "zzz" in the search box
- **Expected:**
  1. No rows show and the count text reads "Showing 0 of 10 entries"; a visible empty-result message is the intended behaviour (none exists as built)
  2. All rows are hidden, the header row stays and the info line reads "Showing 1 to 10 of 10 entries" as built
- **Notes:** Empty-result message is OQ-V-09. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-039 · Focus · every dialog opens with focus on its first control and × / Cancel return it to the opener

- **Traces:** ST-SCR-00-04, SCR-10.ACT.cat-modal-aria-label-close-dialog, SCR-20.ACT.dialog-aria-label-close-dialog, SCR-07.ACT.close
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Accessibility · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open in turn: Feedback (login), Add Category, Add Owner, Reply, Add User, Add App User, a review modal, Logout; read the focused element
  2. Close each with × or Cancel and read the focused element
- **Expected:**
  1. Focus is on the × "Close dialog" button 30 ms after opening (on Cancel for the Logout dialog)
  2. Focus returns to the control that opened the dialog (as built on × and Cancel, except Cancel on Logout, see the next cases)
- **Notes:** Builder requirement in SCR-03 OQ-A-21: trap Tab inside every modal and return focus to the opening control on any dismissal.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-040 · Focus · Escape and a backdrop click return focus to the opener

- **Traces:** ST-SCR-03-05, SCR-03.ACT.escape-key, SCR-03.ACT.backdrop, SCR-07.ACT.escape
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Accessibility · Negative
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-21
- **Decision:** —
- **Steps:**
  1. Open Add Category from the ＋ Add Category button
  2. Press Escape
  3. Open it again and mouse-down on the dark backdrop
- **Expected:**
  1. Focus is on the × button
  2. The dialog closes and focus is back on ＋ Add Category (as built focus is not restored)
  3. The dialog closes and focus is back on ＋ Add Category
- **Notes:** Builder requirement in SCR-03 OQ-A-21: trap Tab inside every modal and return focus to the opening control on any dismissal. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-041 · Focus · Save of an Edit dialog returns focus to that row's edit button, not to the page body

- **Traces:** SCR-10.ACT.cat-modal-save, SCR-11.ACT.owner-modal-save, SCR-13.ACT.reply-modal-send-reply-primary-blue, SCR-20.ACT.save-dialog, SCR-21.ACT.save
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Accessibility · Negative
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-21, OQ-20-13, OQ-21-13
- **Decision:** —
- **Steps:**
  1. On each of Category, Owners, Contact Us, Admin user List and App user List open a row's edit or reply button and Save a valid change
  2. Read the focused element
- **Expected:**
  1. Each save succeeds with its toast
  2. Focus is on the same row's ✎ / ↩ button or on the table heading (as built it is BODY: the row is rebuilt first)
- **Notes:** Builder requirement in SCR-03 OQ-A-21: trap Tab inside every modal and return focus to the opening control on any dismissal. Add-Save already returns focus to the static Add button. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-042 · Focus · Save review on the Dashboard and the list keeps focus on the review button or the table

- **Traces:** SCR-07.ACT.save-review, SCR-05.ACT.in-option-column-aria-label-review-repor
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Accessibility · Negative
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-21
- **Decision:** —
- **Steps:**
  1. Open the Review modal from the Dashboard with Option eye button of report 1 and press Save review
  2. Read the focused element
- **Expected:**
  1. The modal closes
  2. Focus is on a control in the same place (row 1's review button or the table heading); as built it is lost
- **Notes:** Builder requirement in SCR-03 OQ-A-21: trap Tab inside every modal and return focus to the opening control on any dismissal. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-043 · Focus · Tab cannot leave an open dialog and Cancel on Logout returns focus to the header account button

- **Traces:** SCR-04.ACT.cancel, SCR-04.STATE.confirm
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Accessibility · Negative
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-A-21
- **Decision:** —
- **Steps:**
  1. Open the Logout dialog and press Tab repeatedly past the last control
  2. Press Cancel
- **Expected:**
  1. Focus cycles inside the dialog between Cancel and Sign out (as built it leaves into the dimmed page)
  2. Focus is on the header "Admin Admin" button (as built focus is lost to the hidden Logout item)
- **Notes:** Builder requirement in SCR-03 OQ-A-21: trap Tab inside every modal and return focus to the opening control on any dismissal. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-044 · XSS · < and > are stripped as typed on the sign-in, forgot-password and feedback fields

- **Traces:** SCR-00.VAL.username-characters-and-are-stripped-as, SCR-01.VAL.email-address-stripped-as-typed, SCR-03.VAL.all-text-stripped-as-typed
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Error guessing
- **Priority:** P1
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Type `<script>alert(1)</script>` into Username on login
  2. Type `<b>@x.co` into Email address on SCR-01 (Forgot Password?)
  3. Type `<script>alert(1)</script>` into Feedback Name, Email and Message
  4. Type `<script>alert(1)</script>` into the login Password
- **Expected:**
  1. Username reads "scriptalert(1)/script"
  2. Email address reads "b@x.co"
  3. Name, Email and Message each read "scriptalert(1)/script"; no script runs
  4. Password keeps all characters (25, not stripped, type=password)
- **Notes:** Declared: a global capture-phase input listener strips < and >, silently. The Password field is not stripped (SCR-00).
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-045 · XSS · < and > are stripped as typed on the Category, Owner, Config, Reply and Review fields

- **Traces:** SCR-10.VAL.category-name-characters-and-are-strippe, SCR-11.VAL.both-stripped-as-typed, SCR-12.VAL.badge-name-characters-stripped-as-typed, SCR-13.VAL.your-response-characters-stripped-as-typ, SCR-07.VAL.reviewer-note-optional-free-text-trimmed
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Error guessing
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. In Add Category type `<script>alert(1)</script>` into Category name and Description
  2. In Add Owner type the same into Owner and Description
  3. On Config type `<img src=x onerror=alert(1)>` into Badge Name and press Update
  4. In the Reply modal type `<script>alert(1)</script>` into Your response
  5. In a review modal type `<script>alert(1)</script>` into Reviewer note
- **Expected:**
  1. Both fields read "scriptalert(1)/script"
  2. Both fields read "scriptalert(1)/script"
  3. The field reads "img src=x onerror=alert(1)"; after Update the toast reads `Config updated. Badge Name set to "img src=x onerror=alert(1)".` and no script runs on any auth screen
  4. The box reads "scriptalert(1)/script"
  5. The note reads "scriptalert(1)/script"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-046 · XSS · < and > are stripped as typed in the Admin user, App user and every Search field

- **Traces:** SCR-20.VAL.first-name-required-trimmed-whitespace-o, SCR-21.VAL.first-name-optional-free-text-trimmed-ma, SCR-06.VAL.search-violations-free-text-0-100-charac
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Error guessing
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. In Add User type `<script>alert(1)</script>` into First Name, Last Name, Email, Address
  2. In Add App User type `<script>alert(1)</script>` into First Name and Last Name
  3. Type `<script>alert(1)</script>` into the search box of each list screen
- **Expected:**
  1. Each field reads "scriptalert(1)/script" (Email: "scriptalert(1)/script" fails the address shape and shows "Please enter a valid email address." after blur)
  2. Both fields read "scriptalert(1)/script"
  3. Each search box reads "scriptalert(1)/script" and the tables hide rows that do not contain it
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-047 · XSS · stripping does not apply to password fields, and < and > count as the symbol

- **Traces:** SCR-22.VAL.all-three-inputs-are-type-password-with, SCR-22.VAL.new-password-at-least-one-of-each-upperc, SCR-20.VAL.password-required-on-add-data-req-added
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Functional
- **Technique:** Equivalence partitioning
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. On Profile type `Abcdefghij1<` into New password
  2. In Add User type `Abcdefghij1>` into Password
- **Expected:**
  1. 12 characters remain, all five rules are ticked (the symbol is < ) and the label reads "Strong"
  2. 12 characters remain, all five rules are ticked (the symbol is > ) and the label reads "Strong"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-048 · XSS · pasted markup is stripped the same way as typed markup

- **Traces:** SCR-03.VAL.all-text-stripped-as-typed, SCR-10.VAL.category-name-characters-and-are-strippe
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Error guessing
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Paste `<script>alert(1)</script>` into Feedback Message and into Category name
- **Expected:**
  1. Both fields read "scriptalert(1)/script"
- **Notes:** Inferred from the declared capture-phase input listener (paste raises an input event); the stories test typing only. Confirm when executed.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-049 · Password policy · length boundaries 11, 12, 128 and 129 on Change password and Add User

- **Traces:** SCR-20.VAL.password-required-on-add-data-req-added, SCR-22.VAL.new-password-min-12-characters, SCR-22.VAL.new-password-max-128-characters
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Functional
- **Technique:** Boundary value analysis
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. On Profile type New password of 11 characters `Abcdefghi1!`
  2. Type 12 characters `Abcdefghij1!`
  3. Type 128 characters (`Aa1!` followed by 124 `a`)
  4. Type 129 characters (`Aa1!` followed by 125 `a`)
  5. Repeat steps 1-4 in the Password field of Add User
- **Expected:**
  1. "At least 12 characters" is not ticked
  2. All five rules are ticked and the label reads "Strong"
  3. All five rules are ticked and "Maximum 128 characters." does not show
  4. "Maximum 128 characters." shows in red and on Update password "Password does not meet all the requirements." shows under New password
  5. The same results; for 11 and 129 characters Save stays disabled
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-050 · Password policy · the five classes and the exact symbol set

- **Traces:** SCR-22.VAL.new-password-at-least-one-of-each-upperc, SCR-20.VAL.password-required-on-add-data-req-added
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Functional
- **Technique:** Decision table
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Type `abcdefghijkl` (12 lowercase)
  2. Type `Abcdefghijk1~`
  3. Type `Abcdefghijk1 ` (ends with a space)
  4. Type `Abcdefghijk1/`
  5. Type `Éabcdefghij1!` (accented capital)
  6. Type `Abcdefghijk1!`
- **Expected:**
  1. Only "At least 12 characters" and "A lowercase letter (a–z)" are ticked
  2. "A special character" is not ticked (~ does not count)
  3. "A special character" is not ticked (space does not count)
  4. "A special character" is not ticked (/ does not count)
  5. "An uppercase letter (A–Z)" is not ticked (ASCII only)
  6. All five rules are ticked
- **Notes:** Declared symbol set: ! @ # $ % ^ & * ( ) _ + - = [ ] { } | ; ' : " , . < > ? . The UI shows only "(!@#$…)". Non-ASCII letters not counting is as declared; whether they should count is OQ-22-04.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-051 · Password policy · the strength label counts rules met: Very weak, Weak, Fair, Good, Strong

- **Traces:** ST-SCR-20-04, ST-SCR-22-02, ST-SCR-22-03
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Type `ab` (1 rule: lowercase)
  2. Type `abcdefghijkl` (2 rules)
  3. Type `Abcdefghij1` (3 rules)
  4. Type `Abcdefghijk1!` (5 rules)
- **Expected:**
  1. Label "Weak", one red segment
  2. Label "Fair", two amber segments
  3. Label "Good", three lime segments
  4. Label "Strong", four green segments
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-052 · Password policy · four of five rules must not read Strong while Save stays disabled

- **Traces:** SCR-20.VAL.password-required-on-add-data-req-added, SCR-22.VAL.new-password-min-12-characters
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-20-09
- **Decision:** —
- **Steps:**
  1. Type `Abcdefghi1!` (11 characters, so four of five rules are met)
- **Expected:**
  1. The label does not read "Strong" and the meter is not full green while "At least 12 characters" is unmet and Save is disabled (as built the label reads "Strong")
- **Notes:** Story calls this a defect to carry as a finding. Provisional until the meter design is decided.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-053 · Password policy · both screens apply the same policy to the same input

- **Traces:** SCR-20.COMM.shares-password-policy-12-128-five-class, SCR-22.COMM.shares-scr-20-password-policy
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Integration · Regression
- **Technique:** Pairwise
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Type the same 6 inputs on Profile New password and in Add User Password: `abc`, `abcdefghijkl`, `Abcdefghij1`, `Abcdefghijk1!`, a 128-character valid value, a 129-character value
- **Expected:**
  1. For each input the rows ticked, the number of lit segments and the label are identical on both screens; only the 128-character and 13-character valid values enable Save and pass Update password
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-054 · Password policy · the policy error outranks the difference check on Change password

- **Traces:** ST-SCR-22-06, SCR-22.VAL.new-password-must-differ-from-current-pa
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative
- **Technique:** Decision table
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Type Current `abc`, New `abc`, Confirm `abc` and press Update password
  2. Type Current, New and Confirm `Abcdefghijk1!` and press Update password
- **Expected:**
  1. "Password does not meet all the requirements." shows under New password and "New password must be different from the current one." does not
  2. "New password must be different from the current one." shows under New password
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-055 · Password policy · Current password is not trimmed, so a single space passes the required check

- **Traces:** SCR-22.VAL.current-password-cp-current-required-tru
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Negative
- **Technique:** Error guessing
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-22-03
- **Decision:** —
- **Steps:**
  1. Type Current ` ` (one space), New `Abcdefghijk1!`, Confirm `Abcdefghijk1!` and press Update password
- **Expected:**
  1. No "Current password is required." shows and a toast reads "Password updated successfully." (as built; the correctness check is server-side, OQ-22-03)
- **Notes:** Characterises declared behaviour; with the PROPOSED server check a blank-ish current password would be refused. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-056 · Password policy · the reset and sign-in paths apply a policy to a password they set

- **Traces:** SCR-22.COMM.breaks-if-changed-login-forgot-password, SCR-02.STATE.done-reset-only
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Security · Negative
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-22-05, OQ-A-15
- **Decision:** —
- **Steps:**
  1. Complete Forgot password and follow the reset link
  2. Enter `abc` as the new password
- **Expected:**
  1. A page to set the password exists
  2. The 12-128, five-class policy applies and "Password does not meet all the requirements." shows (whether the same policy applies is the open question)
- **Notes:** Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-057 · Password policy · Add User validates but never stores the password; Edit with a blank password keeps it

- **Traces:** ST-SCR-20-07, SCR-20.DATA.writes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Data
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Press ✎ on the Ronald row
  2. Save with Password blank
  3. Add a user with a compliant password and reopen it with ✎
- **Expected:**
  1. Title "Edit User", the Password asterisk is hidden and the hint reads "Leave blank to keep the current password."
  2. The row is updated and the toast reads `User "Ronald Stephen" updated successfully.`
  3. The Password field is empty (the value was read for validation and thrown away)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-058 · Shell · opening a screen closes any open dialog and discards its input

- **Traces:** SCR-20.STATE.populated, SCR-04.COMM.receives-every-shell-screen
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Regression
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Add User and type a First Name
  2. Press Category in the sidebar
  3. Return to Admin user List and press ＋ Add User
- **Expected:**
  1. The dialog is open with the typed value
  2. The dialog is closed and the Category screen shows
  3. The dialog is blank, Role reads Administrator and Save is disabled
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-059 · Shell · Escape closes layers in order: dialog, then account menu, then navigation drawer

- **Traces:** SCR-04.ACT.escape-backdrop-mouse-down-dialog, SCR-04.ACT.click-outside-escape
- **Platform:** Web
- **Environment:** Chrome (current) · 768×1024 · dev http://localhost:8765/index.html
- **Type:** Functional · Regression
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open the drawer with ☰, then the account menu, then press Escape
  2. Press Escape again
- **Expected:**
  1. The account menu closes and the drawer stays open
  2. The drawer closes
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-060 · Badge Name · is stored per browser, so the sign-in screens differ between Chrome and Edge

- **Traces:** ST-SCR-12-02, SCR-12.COMM.receives-browser-localstorage
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Negative · Compatibility
- **Technique:** Use case
- **Priority:** P1
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** OQ-12-03
- **Decision:** —
- **Steps:**
  1. In Chrome save Badge Name "Jamaica Transport Authority" on Config and sign out
  2. Open the same URL in Edge and read the badge line under "Admin Portal"
- **Expected:**
  1. Chrome's login shows "Jamaica Transport Authority"
  2. A visitor in any browser sees the saved value; as built Edge shows "Ministry of Transport and Mining" (the value is in the browser's localStorage)
- **Notes:** The Badge Name is public-facing and cannot be per device in production. Provisional.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-061 · Data · changes are held in memory only: a reload restores the seed (Badge Name excepted)

- **Traces:** SCR-10.DATA.writes, SCR-20.DATA.writes, SCR-12.DATA.writes
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Data · Regression
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Add category "Tailgating", add portal user "Test User", save Badge Name "Test Org"
  2. Reload the page, sign in and open the three screens
- **Expected:**
  1. Each save succeeds with its toast
  2. Category lists 10 rows, Admin user List lists 8 rows, Config reads "Test Org" (only the Badge Name survives, ST-SCR-12-04)
- **Notes:** As built per the Data sections. A production build must persist every save (derivation rule on toasts that claim a save); no OQ asks for that.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-062 · Edge · sign-in to Dashboard with correct tiles

- **Traces:** ST-SCR-02-01, ST-SCR-05-01
- **Platform:** Web
- **Environment:** Edge (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Compatibility · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** sanity
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. In Edge open the prototype, type any Username and Password, press LOGIN, type 123456 and press Verify
- **Expected:**
  1. The Dashboard shows, a toast reads "Signed in successfully." and the tiles read Violation reports 23, Pending review 23, Verified 0, Rejected 0, Categories 10, App users 3,123, Portal users 8, Messages 24
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-063 · Edge · review a report and see the counts follow

- **Traces:** ST-SCR-07-02, ST-SCR-07-03
- **Platform:** Web
- **Environment:** Edge (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Compatibility · Functional
- **Technique:** Use case
- **Priority:** P2
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. In Edge open report 1 from Manage Violation Uploads, choose Verified and press Save review
  2. Open the Dashboard
- **Expected:**
  1. Row 1 shows a green Verified chip and a toast reads "Report 1 updated to Verified. Reporter awarded reward points."
  2. Pending reads 22, Verified reads 1 and the sidebar badge reads 22
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-X-WEB-064 · Edge · add a category, a portal user and change the password

- **Traces:** ST-SCR-10-02, ST-SCR-20-05, ST-SCR-22-07
- **Platform:** Web
- **Environment:** Edge (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Compatibility · Functional
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. In Edge add category "Tailgating" / "Following too closely"
  2. Add the portal user of ST-SCR-20-05
  3. Change the password as in ST-SCR-22-07
- **Expected:**
  1. Row 11 appears and the toast reads `Category "Tailgating" added successfully.`
  2. A 9th row appears and the toast reads `User "Test User" added successfully.`
  3. A toast reads "Password updated successfully."
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —
