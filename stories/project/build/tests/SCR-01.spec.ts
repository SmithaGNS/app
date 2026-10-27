// SCR-01 · Forgot password  —  route #forgot (section #forgot)
// Generated from screen-stories/01-auth/SCR-01-forgot-password.md by ux-prototype-to-screen-stories v3.4.0. Do not hand-edit: regenerate.
//
// Every assertion below comes from the story's acceptance criteria and is
// written against VISIBLE TEXT, not against the prototype's selectors —
// those do not exist in this build, and a selector that matches nothing
// makes a test pass for the wrong reason.

import { test, expect } from '@playwright/test';

const ROUTE = '#forgot (section #forgot)';

test.describe('SCR-01 · Forgot password', () => {

  test('ST-SCR-01-01 — Required email', async ({ page }) => {
    // Given I am on Reset your password with an empty field
    // When I press Send code
    // Then "Email is required." shows under the field and I stay on this screen
    // And focus is in the field
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-01-02 — Malformed email', async ({ page }) => {
    // Given I typed "abc"
    // When I press Send code
    // Then "Please enter a valid email address." shows
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-01-03 — Valid email', async ({ page }) => {
    // Given I typed user@example.com
    // When I press Send code
    // Then the OTP screen shows "Enter the 6-digit code sent to user@example.com."
    // And a green toast reads "A 6-digit code was sent to user@example.com."
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-01-04 — Error clears while typing', async ({ page }) => {
    // Given the error is showing
    // When I type a character
    // Then the message and red outline disappear
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-01-05 — Back', async ({ page }) => {
    // Given I am on this screen
    // When I press ← Back to sign in
    // Then SCR-00 shows
    test.fixme(true, 'not implemented');
  });
});
