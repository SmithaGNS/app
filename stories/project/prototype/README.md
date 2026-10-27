# DriveSafe — Admin Portal (Tailwind CSS prototype)

A responsive, accessible, mobile-first rebuild of the DriveSafe admin portal,
reconstructed from live screen captures. Covers the full back-office concept:
dashboard → violation review lifecycle → categories → contact replies → portal
users → app users → an end-to-end concept view.

## Folder structure

```
admin-tailwind/
├── index.html        # markup + Tailwind config + component layer (@apply)
├── js/
│   ├── data.js        # data + JSDoc interfaces (Violation, Category, AdminUser, AppUser, ContactMessage)
│   └── app.js         # rendering, CRUD, navigation, modals, accessibility, keyboard
└── README.md
```

## Running it

`js/app.js` is an **ES module**, so open the page over HTTP, not `file://`
(browsers block module imports from `file://`). It already lives in the web root:

```
http://<host>/learn/Drive_safe/admin-tailwind/
```

Tailwind is loaded via the **Play CDN** (needs internet). For production, compile
with the Tailwind CLI and drop the CDN `<script>`:

```bash
npx tailwindcss -i src/input.css -o dist/app.css --minify
# move the tailwind.config block in index.html into tailwind.config.js
```

## Design system (defined in `tailwind.config` inside `index.html`)

| Token | Value | Use |
|---|---|---|
| **Colors** | `brand #f6a21e` / `brand.dark #e8951a` | header, primary accents |
| | `side #222d32` / `side.hover #1e282c` / `side.text #b8c7ce` | sidebar |
| | `accent #f39c12` | card top border, buttons, modal headers |
| | `canvas #eef1f5` | page background |
| | status: amber / sky / green / red | Pending · Under review · Verified · Rejected |
| **Typography** | `font-sans` = Segoe UI → Roboto → Arial | body |
| | `h1` scales `text-xl md:text-2xl 3xl:text-3xl` | page titles |
| **Spacing** | padding scales `px-4 md:px-6 lg:px-8 xl:px-10 3xl:px-16 4xl:px-24` | content container |
| **Border radius** | `rounded-card` 6px, `rounded-pill` 40px | cards, login fields |
| **Shadows** | `shadow-card` (subtle), `shadow-pop` (modals) | elevation |

Reusable component classes (via `@layer components`, so markup stays class-only,
no inline styles): `.btn` `.btn-primary/green/grey/add`, `.input` `.label` `.field`,
`.card`, `.th` `.cell`, `.nav-link` `.nav-active`, `.kpi`, `.pill`, `.modal`.

## Custom breakpoints

```js
screens: { sm:640, md:768, lg:1024, xl:1280, '2xl':1536, '3xl':1920, '4xl':2560 }
```

## Responsive behavior

Mobile-first: base styles target phones; each breakpoint adds layout.

| Area | Mobile (<768) | md 768 (iPad ⬆) | lg 1024 (iPad ⬅➡ / laptop) | xl 1280 | 2xl 1536 | 3xl 1920 / 4xl 2560 |
|---|---|---|---|---|---|---|
| **Sidebar** | off-canvas drawer, opened by ☰, dimmed backdrop, Esc closes | same | **permanent** (`lg:translate-x-0`, `lg:pl-60`) | — | — | — |
| **Container** | `px-4`, full width | `px-6` | `px-8` | `px-10`, `max-w-screen-2xl` | centered | `px-16`/`px-24`, `max-w-screen-3xl/4xl` so lines don't over-stretch on 4K |
| **KPI grid** | `grid-cols-1` | `sm:grid-cols-2` | `lg:grid-cols-4` | — | — | `3xl:grid-cols-8` (single row on wide monitors) |
| **Funnel / forms** | stacked `grid-cols-1` / `flex-col` | — | `lg:flex-row` / `sm:grid-cols-2` | — | — | — |
| **Tables** | horizontal scroll inside `.table-wrap` (`min-w-[…]`) so columns never crush | same | more width available | — | — | — |
| **Typography** | `text-sm` / `h1 text-xl` | `md:text-base` / `md:text-2xl` | — | — | — | `3xl:text-3xl` headings, larger KPIs |
| **Header user** | avatar only | `sm:` shows name | — | — | — | — |

Consistency from iPad portrait (768) to 4K is held by: fluid `flex`/`grid`
(no fixed widths except deliberate table `min-w`), a capped `max-width` that grows
by tier so content stays readable instead of stretching edge-to-edge, and spacing
/ type scales that step up at `3xl`/`4xl`.

## Accessibility

- Skip-to-content link; single `<main id="main-content">`.
- Landmarks: `<header>`, `<aside aria-label>`, `<nav aria-label>` (breadcrumb + pagination), `<main>`.
- Sidebar toggle: `aria-controls` / `aria-expanded`; submenu button `aria-expanded`; active item `aria-current="page"`.
- Icon-only buttons carry `aria-label`; decorative emoji are `aria-hidden`.
- Tables: `<caption class="sr-only">`, `<th scope="col">`.
- Modals: `role="dialog"` `aria-modal="true"` `aria-labelledby`; focus moves to the first field on open and returns to the trigger on close; **Esc** closes modal/drawer; backdrop click closes.
- reCAPTCHA stand-in: `role="checkbox"` + `aria-checked` toggled by keyboard/click.
- Status messages announced via an `aria-live="polite"` region.
- Every interactive element has a visible focus ring (`.focus-ring`).

## JavaScript interfaces

`js/data.js` documents the data model with JSDoc `@typedef`s —
`Violation`, `Category`, `ContactMessage`, `AdminUser`, `AppUser` — the shapes a
real API would return. `app.js` imports them and renders/mutates in memory.

## Authentication flow & recent additions

- **Login** → reCAPTCHA **v3** (invisible, score-based) replaces the old v2 "I'm not a robot" checkbox; a reCAPTCHA badge shows on auth screens, verification runs in the background (`recaptchaV3(action)` returns a token + score).
- **Forgot Password** (`#forgot`) → enter email → **Send code**.
- **Verify OTP** (`#otp`) → 6-box code entry with auto-advance, backspace, arrow keys, and paste; 30-second **Resend** countdown; **Verify** → confirmation. (Prototype accepts any 6 digits.)
- **Account dropdown**: the header name opens a menu (Profile / **Logout**); Logout opens a **confirmation modal** → Sign out returns to login. Closes on outside-click and Esc.
- **Form validation** (Add/Edit User, Category, Contact reply, App user): required fields carry a red `*`, `aria-required`, inline error messages, red invalid rings, focus-to-first-error, and email/digits/min-length checks (`validateFields(scope)`). Password is required only when **creating** a user.
- **PII masking**: the violations **Mobile** column is masked (`+1 876 ••••290`) with a per-row **eye toggle** (`aria-pressed`) to reveal/hide.

## Data & scope

Content is the real data captured from the live portal. Speculative design
(severity **Level 0–3**, the **points economy**) is marked `concept` / `PROPOSED`
so it is not mistaken for observed behavior. Reports total 23 (page 1 shown);
app users total 3,123 (page 1 shown).
