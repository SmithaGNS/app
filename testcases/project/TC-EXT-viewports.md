<!-- authored by senior-qa -->
# TC · Viewport matrix 768x1024 and 1024x768 for every screen (C11)

Author senior-qa

### TC-SCR-00-RSP-004 · Viewport · 768x1024 · Open the prototype URL

- **Traces:** SCR-00.STATE.default
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open the prototype URL
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The brand panel is hidden, only the form shows ("Welcome back", Username, Password, Forgot Password?, LOGIN, Feedback) and there is no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-00-RSP-005 · Viewport · 1024x768 · Open the prototype URL

- **Traces:** SCR-00.STATE.default
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open the prototype URL
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The brand panel shows on the left with "Drive Safe" and "SAFER ROADS • BRIGHTER JAMAICA" and the form on the right; there is no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-01-RSP-004 · Viewport · 768x1024 · Open Forgot Password? from the login page

- **Traces:** SCR-01.STATE.default
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open Forgot Password? from the login page
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The brand panel is hidden; "Reset your password", the Email address field, Send code and "← Back to sign in" are visible with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-01-RSP-005 · Viewport · 1024x768 · Open Forgot Password? from the login page

- **Traces:** SCR-01.STATE.default
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open Forgot Password? from the login page
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The brand panel shows; the form with "Reset your password", the field, Send code and "← Back to sign in" shows beside it with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-02-RSP-004 · Viewport · 768x1024 · Reach the OTP screen from LOGIN

- **Traces:** SCR-02.STATE.awaiting-code-login
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 reach the OTP screen from LOGIN
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The brand panel is hidden; "Verify your identity", six boxes, Verify and the Resend row fit the width with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-02-RSP-005 · Viewport · 1024x768 · Reach the OTP screen from LOGIN

- **Traces:** SCR-02.STATE.awaiting-code-login
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 reach the OTP screen from LOGIN
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The brand panel shows beside the form; six boxes, Verify and the Resend row are visible with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-03-RSP-004 · Viewport · 768x1024 · Open Feedback from the login page

- **Traces:** SCR-03.STATE.form
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open Feedback from the login page
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. Name and Email sit side by side (two columns from 640 px), Subject and Message are full width and Cancel and Send feedback are reachable; no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-03-RSP-005 · Viewport · 1024x768 · Open Feedback from the login page

- **Traces:** SCR-03.STATE.form
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Fresh page load of the prototype; no session (the boot screen is #login)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open Feedback from the login page
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. Name and Email sit side by side, Subject and Message are full width and Cancel and Send feedback are reachable; the brand panel shows behind the dimmed backdrop
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-04-RSP-004 · Viewport · 768x1024 · Open the account menu, then the Logout dialog

- **Traces:** SCR-04.STATE.menu-open
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open the account menu, then the Logout dialog
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is an off-canvas drawer, hidden by default, and the ☰ "Open navigation menu" button shows in the header with the account name "Admin Admin" visible
  2. The menu card is 208 px wide and the dialog shows Cancel and Sign out; focus stays on ☰ when the drawer opens
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-04-RSP-005 · Viewport · 1024x768 · Open the account menu, then the Logout dialog

- **Traces:** SCR-04.STATE.menu-open
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open the account menu, then the Logout dialog
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is permanent and the ☰ button is hidden
  2. The menu card is 208 px wide and the dialog shows Cancel and Sign out
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-05-RSP-005 · Viewport · 768x1024 · Open the Dashboard

- **Traces:** SCR-05.STATE.populated
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open the Dashboard
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is an off-canvas drawer, hidden by default, and the ☰ "Open navigation menu" button shows in the header with the account name "Admin Admin" visible
  2. All eight KPI tiles, the funnel and the Latest violation reports table are reachable with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-05-RSP-006 · Viewport · 1024x768 · Open the Dashboard

- **Traces:** SCR-05.STATE.populated
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open the Dashboard
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is permanent and the ☰ button is hidden
  2. The eight tiles form two rows of four (4 columns at lg) and the 7-column table is reachable with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-06-RSP-006 · Viewport · 768x1024 · Open Manage Violation Uploads

- **Traces:** SCR-06.STATE.populated
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open Manage Violation Uploads
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is an off-canvas drawer, hidden by default, and the ☰ "Open navigation menu" button shows in the header with the account name "Admin Admin" visible
  2. The 72 rem table scrolls horizontally inside its own wrapper and the page has no horizontal page scroll
  3. The filter bar, search box and "Showing 1 to 10 of 23 entries" are visible
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-06-RSP-007 · Viewport · 1024x768 · Open Manage Violation Uploads

- **Traces:** SCR-06.STATE.populated
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open Manage Violation Uploads
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is permanent and the ☰ button is hidden
  2. The 72 rem table scrolls horizontally inside its own wrapper (it fits only at about 2560 px) and the page has no horizontal page scroll
  3. The filter bar, search box and "Showing 1 to 10 of 23 entries" are visible
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-07-RSP-005 · Viewport · 768x1024 · Open the review modal for report 1 from Manage Violation Uploads

- **Traces:** SCR-07.STATE.open-unchanged
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open the review modal for report 1 from Manage Violation Uploads
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The modal is at most 90% of the viewport height (921 px), its body scrolls inside the card and Close and Save review are reachable
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-07-RSP-006 · Viewport · 1024x768 · Open the review modal for report 1 from Manage Violation Uploads

- **Traces:** SCR-07.STATE.open-unchanged
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open the review modal for report 1 from Manage Violation Uploads
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The modal is at most 90% of the viewport height (691 px), its body scrolls inside the card and Close and Save review are reachable
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-10-RSP-005 · Viewport · 768x1024 · Open Category Management > Category

- **Traces:** SCR-10.STATE.populated
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open Category Management > Category
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is an off-canvas drawer, hidden by default, and the ☰ "Open navigation menu" button shows in the header with the account name "Admin Admin" visible
  2. The 40 rem table fits the content width (it fits at 768 px) with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-10-RSP-006 · Viewport · 1024x768 · Open Category Management > Category

- **Traces:** SCR-10.STATE.populated
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open Category Management > Category
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is permanent and the ☰ button is hidden
  2. The 40 rem table scrolls horizontally inside its wrapper (it scrolls from 1024 to about 1052 px) with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-11-RSP-005 · Viewport · 768x1024 · Open Category Management > Owners

- **Traces:** SCR-11.STATE.populated
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open Category Management > Owners
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is an off-canvas drawer, hidden by default, and the ☰ "Open navigation menu" button shows in the header with the account name "Admin Admin" visible
  2. The 40 rem table fits the content width (it fits at 768 px) with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-11-RSP-006 · Viewport · 1024x768 · Open Category Management > Owners

- **Traces:** SCR-11.STATE.populated
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open Category Management > Owners
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is permanent and the ☰ button is hidden
  2. The 40 rem table scrolls horizontally inside its wrapper (it scrolls from 1024 to about 1052 px) with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-12-RSP-004 · Viewport · 768x1024 · Open Settings > Config

- **Traces:** SCR-12.STATE.default
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open Settings > Config
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is an off-canvas drawer, hidden by default, and the ☰ "Open navigation menu" button shows in the header with the account name "Admin Admin" visible
  2. The Config card (maximum width xl), the Badge Name field and Update are visible with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-12-RSP-005 · Viewport · 1024x768 · Open Settings > Config

- **Traces:** SCR-12.STATE.default
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open Settings > Config
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is permanent and the ☰ button is hidden
  2. The Config card (maximum width xl), the Badge Name field and Update are visible with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-13-RSP-005 · Viewport · 768x1024 · Open Manage Contact Us

- **Traces:** SCR-13.STATE.populated
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open Manage Contact Us
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is an off-canvas drawer, hidden by default, and the ☰ "Open navigation menu" button shows in the header with the account name "Admin Admin" visible
  2. The 54 rem table scrolls inside its wrapper (it scrolls up to about 985 px) with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-13-RSP-006 · Viewport · 1024x768 · Open Manage Contact Us

- **Traces:** SCR-13.STATE.populated
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open Manage Contact Us
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is permanent and the ☰ button is hidden
  2. The 54 rem table scrolls inside its wrapper (it scrolls from 1024 to about 1292 px) with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-20-RSP-004 · Viewport · 768x1024 · Open User Management > Admin user List

- **Traces:** SCR-20.STATE.populated
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open User Management > Admin user List
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is an off-canvas drawer, hidden by default, and the ☰ "Open navigation menu" button shows in the header with the account name "Admin Admin" visible
  2. The table (1,139 px of content) scrolls inside its wrapper (646 px visible), the Option column is off-screen to the right and the page has no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-20-RSP-005 · Viewport · 1024x768 · Open User Management > Admin user List

- **Traces:** SCR-20.STATE.populated
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open User Management > Admin user List
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is permanent and the ☰ button is hidden
  2. The table scrolls inside its wrapper (610 px visible), the Option column is off-screen to the right and the page has no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-21-RSP-005 · Viewport · 768x1024 · Open User Management > App user List

- **Traces:** SCR-21.STATE.populated
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open User Management > App user List
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is an off-canvas drawer, hidden by default, and the ☰ "Open navigation menu" button shows in the header with the account name "Admin Admin" visible
  2. The table (960 px of content) scrolls inside its wrapper (646 px visible) and the page has no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-21-RSP-006 · Viewport · 1024x768 · Open User Management > App user List

- **Traces:** SCR-21.STATE.populated
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open User Management > App user List
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is permanent and the ☰ button is hidden
  2. The table scrolls inside its wrapper (610 px visible) and the page has no horizontal page scroll
  3. The pager (Previous, 1, 2, 3, …, 313, Next) wraps onto two lines
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-22-RSP-004 · Viewport · 768x1024 · Open the account menu and choose Profile

- **Traces:** SCR-22.ACT.avatar-menu-profile
- **Platform:** Responsive
- **Environment:** 768x1024 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 768x1024 open the account menu and choose Profile
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is an off-canvas drawer, hidden by default, and the ☰ "Open navigation menu" button shows in the header with the account name "Admin Admin" visible
  2. The details card is stacked above the Change password form (one column) with no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —

### TC-SCR-22-RSP-005 · Viewport · 1024x768 · Open the account menu and choose Profile

- **Traces:** SCR-22.ACT.avatar-menu-profile
- **Platform:** Responsive
- **Environment:** 1024x768 · Chrome (emulated) · dev http://localhost:8765/index.html
- **Type:** UI · Compatibility · Positive
- **Technique:** Equivalence partitioning
- **Priority:** P3
- **Tier:** regression
- **Role:** Administrator
- **Preconditions:** Signed in as Administrator (the prototype accepts any username, any password and any 6 digits)
- **Test data:** Prototype seed as shipped (data.js), reloaded fresh: 23 violations (10 loaded), 10 categories, 1 owner Police, 8 portal users, 3,123 app users (10 loaded), 24 messages (10 loaded); synthetic data only
- **Depends on:** —
- **Decision:** —
- **Steps:**
  1. At 1024x768 open the account menu and choose Profile
  2. Check scrolling, clipping and reachability of every control
- **Expected:**
  1. The sidebar is permanent and the ☰ button is hidden
  2. The details card (207 px wide) sits beside the Change password form (429 px wide) in 3 columns; no horizontal page scroll
- **Notes:** Measured widths and breakpoints are quoted from the story's Responsive section / index, not invented.
- **Status:** Not run
- **Actual:** —
- **Evidence:** —
- **Defect:** —
- **Executed:** —
