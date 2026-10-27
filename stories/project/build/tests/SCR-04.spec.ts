// SCR-04 · Account menu and logout confirmation  —  route shell header #user-menu + modal #logout-modal (shown here over #owners)
// Generated from screen-stories/01-auth/SCR-04-account-menu-logout.md by ux-prototype-to-screen-stories v3.4.0. Do not hand-edit: regenerate.
//
// Every assertion below comes from the story's acceptance criteria and is
// written against VISIBLE TEXT, not against the prototype's selectors —
// those do not exist in this build, and a selector that matches nothing
// makes a test pass for the wrong reason.

import { test, expect } from '@playwright/test';

const ROUTE = 'shell header #user-menu + modal #logout-modal (shown here over #owners)';

test.describe('SCR-04 · Account menu and logout confirmation', () => {

  test('ST-SCR-04-01 — Menu contents', async ({ page }) => {
    // Given I am signed in
    // When I press the header button "Admin Admin"
    // Then a menu shows "Signed in as Admin Admin", Profile and Logout
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-04-02 — Outside click closes', async ({ page }) => {
    // Given the menu is open
    // When I click elsewhere on the page
    // Then the menu closes
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-04-03 — Logout asks first', async ({ page }) => {
    // Given the menu is open
    // When I press Logout
    // Then the dialog "Are you sure you want to sign out?" shows and the menu is closed
    // And I am still signed in
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-04-04 — Cancel', async ({ page }) => {
    // Given the dialog shows
    // When I press Cancel
    // Then it closes and the page I was on is unchanged
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-04-05 — Sign out', async ({ page }) => {
    // Given the dialog shows
    // When I press Sign out
    // Then the Welcome back login screen shows and the sidebar and header are hidden
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-04-06 — Escape', async ({ page }) => {
    // Given the dialog shows
    // When I press Escape
    // Then the dialog closes and I stay signed in
    test.fixme(true, 'not implemented');
  });
});
