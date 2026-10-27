// SCR-02 · OTP verification  —  route #otp (section #otp; two modes: login, reset)
// Generated from screen-stories/01-auth/SCR-02-otp-verification.md by ux-prototype-to-screen-stories v3.4.0. Do not hand-edit: regenerate.
//
// Every assertion below comes from the story's acceptance criteria and is
// written against VISIBLE TEXT, not against the prototype's selectors —
// those do not exist in this build, and a selector that matches nothing
// makes a test pass for the wrong reason.

import { test, expect } from '@playwright/test';

const ROUTE = '#otp (section #otp; two modes: login, reset)';

test.describe('SCR-02 · OTP verification', () => {

  test('ST-SCR-02-01 — Login mode completes sign-in', async ({ page }) => {
    // Given I pressed LOGIN on SCR-00 and I am on OTP
    // When I type 123456 and press Verify
    // Then the Dashboard shows and a toast reads "Signed in successfully."
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-02-02 — Incomplete code', async ({ page }) => {
    // Given the boxes are empty
    // When I press Verify
    // Then "Enter all 6 digits of the code." shows and focus is in box 1
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-02-03 — Reset mode done state', async ({ page }) => {
    // Given I came from Forgot password with user@example.com
    // When I enter 6 digits and press Verify
    // Then "Identity verified" shows with "A password reset link has been sent to user@example.com. The link expires in 30 minutes."
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-02-04 — Paste fills the boxes', async ({ page }) => {
    // Given the boxes are empty
    // When I paste "123 456"
    // Then the boxes read 1,2,3,4,5,6 and focus is on box 6
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-02-05 — Resend lock', async ({ page }) => {
    // Given the screen just appeared
    // Then Resend code is disabled and the label reads "(500s)"
    // And pressing nothing for 500 s enables it
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-02-06 — Back link depends on mode', async ({ page }) => {
    // Given I arrived in reset mode
    // Then the back link reads "← Change email" and leads to SCR-01
    // And in login mode it reads "← Back to sign in" and leads to SCR-00
    test.fixme(true, 'not implemented');
  });
});
