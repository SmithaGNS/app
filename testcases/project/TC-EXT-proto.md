<!-- authored by senior-qa -->
# TC · Prototype controls (PROTO items from stories/basis-extra.json)

Author senior-qa

### TC-SCR-00-WEB-031 · Prototype controls · login form: main content, Username, Password, Forgot Password?, LOGIN, Feedback

- **Traces:** PROTO-drivesafe-admin-portal-main-content, PROTO-drivesafe-admin-portal-lg-user, PROTO-drivesafe-admin-portal-lg-pass, PROTO-drivesafe-admin-portal-forgot-password, PROTO-drivesafe-admin-portal-sign-in, PROTO-drivesafe-admin-portal-feedback
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Regression
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open the prototype URL
  2. Read the main content region and each control; press Forgot Password?, return, press Feedback, close it
- **Expected:**
  1. The page has a #main-content region and a "Skip to content" link that shows on focus
  2. Input lg-user is the text field labelled Username (placeholder "Enter your username", autocomplete username); lg-pass is the masked Password field (type=password, autocomplete current-password)
  3. Button "Forgot Password?" opens SCR-01 with an empty field; button LOGIN (aria-label "Sign in") opens the OTP screen; button Feedback opens the Feedback modal with focus on ×
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-01-WEB-024 · Prototype controls · forgot-password form: Email address, Send code, Back to sign in

- **Traces:** PROTO-drivesafe-admin-portal-fp-email, PROTO-drivesafe-admin-portal-send-code, PROTO-drivesafe-admin-portal-back-to-sign-in
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Regression
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Open Forgot Password?
  2. Press Send code with "user@example.com" typed, then use "← Change email", then ← Back to sign in
- **Expected:**
  1. Input fp-email is the Email address field (type=email, placeholder "Enter your email", aria-required true)
  2. Button "Send code" opens the OTP screen in reset mode; "← Back to sign in" returns to "Welcome back"; the "Back to sign in" button of the done panel returns to "Welcome back"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-02-WEB-034 · Prototype controls · OTP screen: six digit boxes, Verify, Resend code, Change email, Back to sign in

- **Traces:** PROTO-drivesafe-admin-portal-digit-1, PROTO-drivesafe-admin-portal-digit-2, PROTO-drivesafe-admin-portal-digit-3, PROTO-drivesafe-admin-portal-digit-4, PROTO-drivesafe-admin-portal-digit-5, PROTO-drivesafe-admin-portal-digit-6, PROTO-drivesafe-admin-portal-verify, PROTO-drivesafe-admin-portal-resend-code, PROTO-drivesafe-admin-portal-change-email, PROTO-drivesafe-admin-portal-back-to-sign-in
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Regression
- **Technique:** Use case
- **Priority:** P3
- **Tier:** regression
- **Role:** Anonymous
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. Reach the OTP screen from LOGIN, then from Send code
  2. Read the six boxes and each button
- **Expected:**
  1. Inputs digit-1 to digit-6 are boxes with aria-label "Digit 1" to "Digit 6", maxlength 1, numeric
  2. Verify with six digits opens the Dashboard (login mode) or the "Identity verified" panel (reset mode)
  3. Resend code is disabled with "(500s)" and enables when the countdown ends; "← Change email" (reset) opens SCR-01; "← Back to sign in" (login) opens "Welcome back"; the done panel's "Back to sign in" opens "Welcome back"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-04-WEB-027 · Prototype controls · shell: navigation menu, account button, Profile, Logout, profile card, group headers

- **Traces:** PROTO-drivesafe-admin-portal-open-navigation-menu, PROTO-drivesafe-admin-portal-aa, PROTO-drivesafe-admin-portal-profile, PROTO-drivesafe-admin-portal-logout, PROTO-drivesafe-admin-portal-open-my-profile, PROTO-drivesafe-admin-portal-item, PROTO-drivesafe-admin-portal-user-management, SCR-04.ACT.profile
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
  1. Sign in and read the header and the sidebar at 1440x900 and at 768x1024
  2. Press each of the controls
- **Expected:**
  1. The ☰ button (aria-label "Open navigation menu") shows below 1024 px and opens the drawer; the button "AA" opens the account menu
  2. Profile in the menu opens My Profile; Logout opens the confirmation dialog; the sidebar profile card (title "Open my profile") opens My Profile
  3. The group headers Category Management (⚙️), User Management and Settings (🛠️) expand and collapse their lists with aria-expanded and the caret rotating
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-05-WEB-034 · Prototype controls · Dashboard: View all

- **Traces:** PROTO-drivesafe-admin-portal-view-all
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
  1. Open the Dashboard and press View all
- **Expected:**
  1. The list "User uploaded Violations" opens and the sidebar item Manage Violation Uploads is highlighted
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-06-WEB-047 · Prototype controls · violations list: filters, search, export buttons, page size and pager

- **Traces:** PROTO-drivesafe-admin-portal-vf-owner, PROTO-drivesafe-admin-portal-vf-from, PROTO-drivesafe-admin-portal-vf-to, PROTO-drivesafe-admin-portal-filter, PROTO-drivesafe-admin-portal-reset, PROTO-drivesafe-admin-portal-search-violations, PROTO-drivesafe-admin-portal-csv, PROTO-drivesafe-admin-portal-excel, PROTO-drivesafe-admin-portal-print, PROTO-drivesafe-admin-portal-select, PROTO-drivesafe-admin-portal-previous, PROTO-drivesafe-admin-portal-1, PROTO-drivesafe-admin-portal-2, PROTO-drivesafe-admin-portal-3, PROTO-drivesafe-admin-portal-next
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
  1. Open Manage Violation Uploads
  2. Use the Category Owner select, Created From, Created To, Filter, Reset and the search box
  3. Press CSV, Excel, Print, the page-size select, Previous, 1, 2, 3 and Next
- **Expected:**
  1. vf-owner offers "All Category Owners" and "Police"; vf-from and vf-to are date inputs; Filter (rows 1 and 2 remain for 2026-09-01 to 2026-09-30, "Showing 2 of 10 entries") and Reset ("Showing 1 to 10 of 23 entries") work; the search box (aria-label "Search violations") hides non-matching rows
  2. CSV, Excel and Print do nothing when pressed (wired to nothing); the page-size select changes no rows; the pager buttons do nothing; page "1" is the current page (aria-current=page)
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-10-WEB-044 · Prototype controls · category list: search, export buttons, Add Category, page size and pager

- **Traces:** PROTO-drivesafe-admin-portal-search-categories, PROTO-drivesafe-admin-portal-csv, PROTO-drivesafe-admin-portal-excel, PROTO-drivesafe-admin-portal-print, PROTO-drivesafe-admin-portal-add-category, PROTO-drivesafe-admin-portal-select, PROTO-drivesafe-admin-portal-previous, PROTO-drivesafe-admin-portal-1, PROTO-drivesafe-admin-portal-next
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
  1. Open Category
  2. Type "police" in the search box, press ＋ Add Category, then press CSV, Excel, Print, the page-size select, Previous, 1 and Next
- **Expected:**
  1. Only row 1 stays visible; ＋ Add Category opens the Add Category modal
  2. CSV, Excel and Print do nothing when pressed (wired to nothing); the page-size select changes no rows; Previous and Next are disabled and 1 is the current page
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-11-WEB-036 · Prototype controls · owners list: search, export buttons, Add Owner, page size and pager

- **Traces:** PROTO-drivesafe-admin-portal-search-owners, PROTO-drivesafe-admin-portal-csv, PROTO-drivesafe-admin-portal-excel, PROTO-drivesafe-admin-portal-print, PROTO-drivesafe-admin-portal-add-owner, PROTO-drivesafe-admin-portal-select, PROTO-drivesafe-admin-portal-previous, PROTO-drivesafe-admin-portal-1, PROTO-drivesafe-admin-portal-next
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
  1. Open Owners
  2. Type "pol" in the search box, press ＋ Add Owner, then press CSV, Excel, Print, the page-size select, Previous, 1 and Next
- **Expected:**
  1. The Police row stays visible; ＋ Add Owner opens the Add Owner modal
  2. CSV, Excel and Print do nothing when pressed (wired to nothing); the page-size select changes no rows; Previous and Next are disabled and 1 is the current page
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-12-WEB-020 · Prototype controls · Config: Badge Name field and Update

- **Traces:** PROTO-drivesafe-admin-portal-cfg-badge, PROTO-drivesafe-admin-portal-update
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
  1. Open Config
  2. Replace the field with "Test Org" and press Update
- **Expected:**
  1. Input cfg-badge holds "Ministry of Transport and Mining"
  2. Update stores the value and the toast reads `Config updated. Badge Name set to "Test Org".`
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-13-WEB-037 · Prototype controls · contact list: search, export buttons, page size and pager

- **Traces:** PROTO-drivesafe-admin-portal-search-messages, PROTO-drivesafe-admin-portal-csv, PROTO-drivesafe-admin-portal-excel, PROTO-drivesafe-admin-portal-print, PROTO-drivesafe-admin-portal-select, PROTO-drivesafe-admin-portal-previous, PROTO-drivesafe-admin-portal-1, PROTO-drivesafe-admin-portal-2, PROTO-drivesafe-admin-portal-3, PROTO-drivesafe-admin-portal-next
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
  1. Open Manage Contact Us
  2. Type "yicitc" in the search box, then press CSV, Excel, Print, the page-size select, Previous, 1, 2, 3 and Next
- **Expected:**
  1. Only row 10 stays visible (aria-label "Search messages")
  2. CSV, Excel and Print do nothing when pressed (wired to nothing); the page-size select changes no rows; Previous is disabled, 1 is the current page and 2, 3 and Next do nothing
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-20-WEB-056 · Prototype controls · admin user list: search, export buttons, Add User, page size and pager

- **Traces:** PROTO-drivesafe-admin-portal-search-users, PROTO-drivesafe-admin-portal-csv, PROTO-drivesafe-admin-portal-excel, PROTO-drivesafe-admin-portal-print, PROTO-drivesafe-admin-portal-add-user, PROTO-drivesafe-admin-portal-select, PROTO-drivesafe-admin-portal-previous, PROTO-drivesafe-admin-portal-1, PROTO-drivesafe-admin-portal-next
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
  1. Open Admin user List
  2. Type "level" in the search box, press ＋ Add User, then press CSV, Excel, Print, the page-size select, Previous, 1 and Next
- **Expected:**
  1. Only the Level2 Admin and Level1 Admin rows remain; ＋ Add User opens the Add User dialog with Save disabled
  2. CSV, Excel and Print do nothing when pressed (wired to nothing); the page-size select changes no rows; Previous and Next are disabled and 1 is the current page
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-21-WEB-045 · Prototype controls · app user list: search, export buttons, Add App User, page size and pager

- **Traces:** PROTO-drivesafe-admin-portal-search-app-users, PROTO-drivesafe-admin-portal-csv, PROTO-drivesafe-admin-portal-excel, PROTO-drivesafe-admin-portal-print, PROTO-drivesafe-admin-portal-add-app-user, PROTO-drivesafe-admin-portal-select, PROTO-drivesafe-admin-portal-previous, PROTO-drivesafe-admin-portal-1, PROTO-drivesafe-admin-portal-2, PROTO-drivesafe-admin-portal-3, PROTO-drivesafe-admin-portal-item, PROTO-drivesafe-admin-portal-313, PROTO-drivesafe-admin-portal-next
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
  1. Open App user List
  2. Type "567" in the search box, press ＋ Add App User, then press CSV, Excel, Print, the page-size select, Previous, 1, 2, 3, … , 313 and Next
- **Expected:**
  1. Only row 1 stays visible; ＋ Add App User opens the Add App User dialog with Save disabled
  2. CSV, Excel and Print do nothing when pressed (wired to nothing); the page-size select changes no rows; the pager buttons do nothing; Previous looks enabled although page 1 is current
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-22-WEB-035 · Prototype controls · Profile: three password fields, eyes, Update password and Cancel

- **Traces:** PROTO-drivesafe-admin-portal-cp-current, PROTO-drivesafe-admin-portal-show-password, PROTO-drivesafe-admin-portal-cp-new, PROTO-drivesafe-admin-portal-cp-confirm, PROTO-drivesafe-admin-portal-update-password, PROTO-drivesafe-admin-portal-cancel
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
  1. Open Profile
  2. Press each eye, press Update password empty, then Cancel
- **Expected:**
  1. cp-current, cp-new and cp-confirm are masked password fields (autocomplete current-password, new-password, new-password); each eye ("Show password") reveals only its own field
  2. Update password shows "Current password is required.", "New password is required." and "Please confirm your new password."; Cancel opens the Dashboard and the fields are empty when Profile is reopened
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-07-WEB-033 · Prototype controls · review modal: Close, Status, Level, Reviewer note, Close and Save review

- **Traces:** PROTO-drivesafe-admin-portal-close-dialog, PROTO-drivesafe-admin-portal-review-status, PROTO-drivesafe-admin-portal-review-level, PROTO-drivesafe-admin-portal-review-note, PROTO-drivesafe-admin-portal-close, PROTO-drivesafe-admin-portal-save-review
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
  1. Open the review modal for report 1
  2. Use × ("Close dialog"), Status, Level, Reviewer note, Close and Save review
- **Expected:**
  1. review-status offers Pending, Under review, Verified, Rejected; review-level offers 0, 1, 2, 3; review-note is a 2-row textarea with placeholder "Why this decision?"
  2. × and Close discard the changes; Save review writes Status and Level and shows the toast; the note is not saved
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-10-WEB-045 · Prototype controls · Add/Edit Category dialog: Close, name, description, owner, Cancel, Save

- **Traces:** PROTO-drivesafe-admin-portal-close-dialog, PROTO-drivesafe-admin-portal-cat-name, PROTO-drivesafe-admin-portal-cat-desc, PROTO-drivesafe-admin-portal-cat-owner, PROTO-drivesafe-admin-portal-cancel, PROTO-drivesafe-admin-portal-save
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
  1. Open ＋ Add Category
  2. Fill Category name "Tailgating", Description "Following too closely", Owner "No owner" and press Save
- **Expected:**
  1. cat-name has maxlength 60, cat-desc has maxlength 150 and cat-owner offers "No owner" and Police
  2. Save adds row 11 with the toast `Category "Tailgating" added successfully.`; Cancel and × ("Close dialog") close and discard
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-20-WEB-057 · Prototype controls · Add/Edit User dialog: first, last, email, phone, address, role, level, password, eye, Cancel, Save

- **Traces:** PROTO-drivesafe-admin-portal-close-dialog, PROTO-drivesafe-admin-portal-u-first, PROTO-drivesafe-admin-portal-u-last, PROTO-drivesafe-admin-portal-u-email, PROTO-drivesafe-admin-portal-u-phone, PROTO-drivesafe-admin-portal-u-addr, PROTO-drivesafe-admin-portal-u-role, PROTO-drivesafe-admin-portal-u-level, PROTO-drivesafe-admin-portal-u-pass, PROTO-drivesafe-admin-portal-show-password, PROTO-drivesafe-admin-portal-cancel, PROTO-drivesafe-admin-portal-save
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
  1. Open ＋ Add User
  2. Read every field and press the Password eye, Cancel and Save
- **Expected:**
  1. u-first, u-last, u-email (type=email), u-phone (digits), u-addr (optional), u-role (Administrator preset), u-level (blank, 1, 2, 3) and u-pass (type=password) are present
  2. The eye ("Show password") reveals the password; Cancel and × close and discard; Save is disabled until valid
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-13-WEB-038 · Prototype controls · Reply dialog: response box, Cancel, Send reply

- **Traces:** PROTO-drivesafe-admin-portal-close-dialog, PROTO-drivesafe-admin-portal-reply-text, PROTO-drivesafe-admin-portal-cancel, PROTO-drivesafe-admin-portal-send-reply
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
  1. Open ↩ "Reply to testing"
  2. Press Send reply empty, then type a response and press Send reply
- **Expected:**
  1. reply-text is the response box and × ("Close dialog") and Cancel close and discard
  2. "Response is required." shows for an empty box; with text the toast reads "Reply sent to testing."
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-21-WEB-046 · Prototype controls · Add/Edit App User dialog: names, email, phone, points, Cancel, Save

- **Traces:** PROTO-drivesafe-admin-portal-close-dialog, PROTO-drivesafe-admin-portal-a-first, PROTO-drivesafe-admin-portal-a-last, PROTO-drivesafe-admin-portal-a-email, PROTO-drivesafe-admin-portal-a-phone, PROTO-drivesafe-admin-portal-a-earn, PROTO-drivesafe-admin-portal-a-red, PROTO-drivesafe-admin-portal-cancel, PROTO-drivesafe-admin-portal-save
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
  1. Open ＋ Add App User
  2. Read every field and press Cancel, then Save with Phone "8761234567"
- **Expected:**
  1. a-first, a-last, a-email (type=email), a-phone, a-earn and a-red (type=number, min=0, default 0) are present
  2. Cancel and × close and discard; Save adds an 11th row with the toast "App user 8761234567 added successfully."
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-04-WEB-028 · Prototype controls · Logout dialog: Cancel and Sign out

- **Traces:** PROTO-drivesafe-admin-portal-cancel, PROTO-drivesafe-admin-portal-sign-out, SCR-04.ACT.cancel, SCR-04.ACT.sign-out
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
  1. Open the account menu, choose Logout
  2. Press Cancel, choose Logout again and press Sign out
- **Expected:**
  1. Cancel closes the dialog and keeps the session
  2. Sign out opens the "Welcome back" screen with the shell hidden
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-11-WEB-037 · Prototype controls · Add/Edit Owner dialog: Close, owner, description, Cancel, Save

- **Traces:** PROTO-drivesafe-admin-portal-close-dialog, PROTO-drivesafe-admin-portal-owner-name, PROTO-drivesafe-admin-portal-owner-desc, PROTO-drivesafe-admin-portal-cancel, PROTO-drivesafe-admin-portal-save
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
  1. Open ＋ Add Owner
  2. Fill Owner "Transport Authority", Description "Licensing body" and press Save
- **Expected:**
  1. owner-name has maxlength 60 and owner-desc has maxlength 150
  2. Save adds row 2 with the toast `Owner "Transport Authority" added successfully.`; Cancel and × close and discard
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-03-WEB-037 · Prototype controls · Feedback dialog: Close, name, email, subject, message, Cancel, Send feedback

- **Traces:** PROTO-drivesafe-admin-portal-close-dialog, PROTO-drivesafe-admin-portal-fb-name, PROTO-drivesafe-admin-portal-fb-email, PROTO-drivesafe-admin-portal-fb-subject, PROTO-drivesafe-admin-portal-fb-message, PROTO-drivesafe-admin-portal-cancel, PROTO-drivesafe-admin-portal-send-feedback
- **Platform:** Web
- **Environment:** Chrome (current) · 1440×900 · dev http://localhost:8765/index.html
- **Type:** Functional · Regression
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
  2. Read every field and press Cancel, then reopen and press Send feedback with valid values
- **Expected:**
  1. fb-name, fb-email (type=email), fb-subject (General feedback, Report a problem, Feature request, Account / login issue) and fb-message (maxlength 1000) are present
  2. Cancel and × close and discard; Send feedback shows "Thanks for your feedback!"
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —
