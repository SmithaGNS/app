# Roadmap — DriveSafe Admin Portal

Source: `stories/project/index/*`, `stories/*/input/SCR-*.md`, `testcases/*/input/TC-*.md`, prototype in `stories/project/prototype/`.
Requirements priority: test cases > screen stories > BRS/FRS (none supplied) > prototype.
Where the stories say PROPOSED, the PROPOSED answer is built and logged as a `decision` row (see `open-questions.csv`).

| # | Module | Screens | Side | Depends on | Notes |
|---|---|---|---|---|---|
| 1 | auth | SCR-00 login, SCR-01 forgot password, SCR-02 OTP, SCR-04 shell/account menu/logout, SCR-03 feedback modal | both | — | Portal user table, session (JWT), OTP challenge, throttling, public Badge Name read; shell (sidebar, drawer, header menu, toast, modal) |
| 2 | catalogue | SCR-11 owners, SCR-10 categories, SCR-12 config (Badge Name) | both | auth | Owner first (Category references it); keys not names; block delete while referenced; protect "Other"; case-insensitive unique names |
| 3 | users | SCR-20 portal users, SCR-21 app users, SCR-22 profile/change password | both | auth | Password hashing, soft delete, forced change at first login, phone as digits + country code |
| 4 | contact | SCR-13 contact messages (+ SCR-03 feedback storage) | both | auth | Reply stored with author; nothing is sent; Feedback and Contact are two entities |
| 5 | violations | SCR-06 list, SCR-07 review modal, SCR-05 dashboard | both | catalogue, users | Status events, reviewer note, level 0-3, phone mask/reveal (Administrator only, audited), forward-only transitions, server-side dashboard counts; reward points NOT credited |

Build order: `all-backend-first` — backend modules 1→5, then frontend modules 1→5.
Out of scope (PROPOSED answers): CSV/Excel/Print export, reward-point crediting, delivery of replies, real e-mail/SMS for OTP and reset (OTP is delivered to a dev log/mock provider), citizen mobile app and report intake (reports are seeded and a documented intake endpoint is provided as a stub).
