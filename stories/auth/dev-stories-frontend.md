# Dev stories - auth (frontend)

Tech-lead breakdown. Each story lists acceptance criteria with the test-case ids that prove it (Playwright specs in `frontend/e2e`, Vitest next to the code; test titles start with the TC ids).

| Story | Title | Acceptance criteria | TC ids |
|---|---|---|---|
| AUTH-F-01 | Foundation: tokens, client, router | Typed client generated from the contract (`npm run api:generate`); design tokens from the prototype; React Router with public / protected trees; `src/features/{module}/routes.tsx` extension pattern; placeholder "coming soon" route components for every unbuilt screen | TC-SCR-04-NAV-04, TC-SCR-04-WEB-022 |
| AUTH-F-02 | Session in memory, refresh, idle | Tokens only in memory (no web storage); single-flight refresh + one retry on 401; failed refresh ends the session; 30 min idle logout with notice | TC-SCR-04-WEB-015, TC-SCR-00-WEB-025, client.test, idle.test |
| AUTH-F-03 | SCR-00 Login | Renders per layout (brand panel from 1024 px, badge name from `/v1/public/config`, yellow LOGIN, reCAPTCHA notice + badge); username 3-254 trimmed `<>` stripped; password 1-128 untouched; required messages; loading disables button; generic 401 message; 429 message; Enter submits; Forgot / Feedback links | TC-SCR-00-WEB-001..025, TC-SCR-00-RSP-001..003 |
| AUTH-F-04 | SCR-01 Forgot password | Email required / shape / 5-254; validate on blur + submit; error clears on typing, announced (`role=alert`), focus returns to the field; valid send -> OTP reset mode + toast; back link | TC-SCR-01-WEB-001..019, TC-SCR-01-RSP-001..003 |
| AUTH-F-05 | SCR-02 OTP | Six boxes (digits only, auto-advance, Backspace/arrows, paste); 6-digit rule; server errors (incorrect / expired / attempts) shown; resend locked for server interval then re-enabled, toast; login mode -> dashboard + "Signed in successfully."; reset mode -> "Identity verified" panel; back link per mode; no challenge -> login | TC-SCR-02-WEB-001..030, TC-SCR-02-RSP-001..003 |
| AUTH-F-06 | SCR-03 Feedback modal | Opens clean (Subject reset); validation per rules; posts the enum subject to `/v1/public/feedback`; thanks panel + toast; failure keeps the form; Cancel / x / Escape / backdrop discard and restore focus to the Feedback link | TC-SCR-03-WEB-001..033, TC-SCR-03-RSP-001..003 |
| AUTH-F-07 | Shared Modal + Toast + live region | role=dialog/aria-modal/labelled; Tab trap; background inert; focus in on open and restored on every dismissal; layered Escape; toasts 3.5 s dismissible; `#live-region` polite | TC-SCR-03-WEB-032, TC-SCR-04-WEB-021, Modal.test, Toast.test |
| AUTH-F-08 | SCR-04 header account menu + logout | Menu shows "Signed in as", Profile, Logout; outside click / Escape close; Logout confirmation (Cancel focused, Cancel/Escape/backdrop keep session and restore focus); Sign out revokes the session server-side and clears fields | TC-SCR-04-WEB-001..022, TC-SCR-04-RSP-004/005 |
| AUTH-F-09 | SCR-04 sidebar + drawer + role-aware nav | All screens listed; groups collapsed, toggle without closing others, auto-expand on child route; exactly one `aria-current`; Pending badge hidden at 0/unknown; off-canvas drawer < 1024 px (open, backdrop/Escape/nav close, Escape order); Violation manager sees no admin groups; forbidden state on direct URL | TC-SCR-04-NAV-01..07, TC-SCR-04-ROLE-01/02, TC-SCR-04-RSP-001..003, Sidebar.test, can.test |

Generated cases not in the provided list use the prefixes `NAV` (sidebar rules), `ROLE` (permission matrix on nav/routes) and extra `RSP` (drawer behaviour).

Definition of done: typecheck, lint (no errors), build, Vitest and Playwright green; axe zero serious/critical on every auth screen and the shell; security review without High/Critical.
