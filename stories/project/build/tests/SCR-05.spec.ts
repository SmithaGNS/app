// SCR-05 · Dashboard  —  route #dashboard (section #dashboard)
// Generated from screen-stories/02-violations/SCR-05-dashboard.md by ux-prototype-to-screen-stories v3.4.0. Do not hand-edit: regenerate.
//
// Every assertion below comes from the story's acceptance criteria and is
// written against VISIBLE TEXT, not against the prototype's selectors —
// those do not exist in this build, and a selector that matches nothing
// makes a test pass for the wrong reason.

import { test, expect } from '@playwright/test';

const ROUTE = '#dashboard (section #dashboard)';

test.describe('SCR-05 · Dashboard', () => {

  test('ST-SCR-05-01 — Tiles on arrival', async ({ page }) => {
    // Given I just signed in
    // When the Dashboard loads
    // Then the tiles read Violation reports 23, Pending review 23, Verified 0, Rejected 0, Categories 10, App users 3,123, Portal users 8, Messages 24
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-05-02 — Funnel', async ({ page }) => {
    // Given the same data
    // Then the funnel reads Submitted 23, Pending 23, Under review 0, Verified 0, Rejected 0
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-05-03 — Latest five', async ({ page }) => {
    // Given the same data
    // Then the table lists exactly five rows S No 1 to 5 with columns S No, Mobile, Category, Location, Created At, Status, Option
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-05-04 — Phone masked', async ({ page }) => {
    // Given row 1 shows "+1 876 ····290"
    // When I press its eye icon
    // Then it reads "+1 876 3125290" and the icon becomes 🙈
    // And pressing again returns to the masked text
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-05-05 — Review from dashboard', async ({ page }) => {
    // Given row 1 is listed
    // When I press its Option eye button
    // Then the modal "Violation #1 — Breaking One way/No Entry" shows
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-05-06 — Counts follow a review', async ({ page }) => {
    // Given I saved report 1 as Verified (SCR-07)
    // When I return to the Dashboard
    // Then Pending reads 22, Verified reads 1, the sidebar badge reads 22 and row 1 shows a green Verified chip
    test.fixme(true, 'not implemented');
  });

  test('ST-SCR-05-07 — Tile navigation', async ({ page }) => {
    // Given the Dashboard
    // When I press the Violation reports tile
    // Then the list "User uploaded Violations" shows and the sidebar item Manage Violation Uploads is highlighted
    test.fixme(true, 'not implemented');
  });
});
