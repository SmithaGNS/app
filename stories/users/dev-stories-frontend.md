# Dev stories - users (frontend)

Tech-lead breakdown. Tests carry the TC ids listed (Vitest = `src/features/users/*.test.ts(x)`, PW = `e2e/users.spec.ts`, PW-real = `e2e/users-real.spec.ts`).

| Story | Title | Acceptance criteria | TC ids |
|---|---|---|---|
| USR-F-01 | API hooks + schemas | Generated client only; one password policy; phone/points/name schemas; angle brackets stripped | TC-SCR-20-WEB-034..041, TC-SCR-21-WEB-027..030, TC-SCR-22-WEB-016..026 |
| USR-F-02 | Portal users table | Server paging 10/25/50/100, search (max 100), pinned Option column, role/level/phone display, no export controls | TC-SCR-20-WEB-001/002/011/019..022/029/030/032/033/042/048 |
| USR-F-03 | Portal user Add/Edit dialog | Save disabled until valid, errors on blur, role preset, level, status (Edit), password required on Add / optional on Edit, live checklist + meter, eye toggles, server field errors | TC-SCR-20-WEB-003..007/015/016/025/026/031/036..041 |
| USR-F-04 | Dialog dismissal + focus | x / Cancel / Esc / backdrop discard; focus returns to the row action or opener | TC-SCR-20-WEB-010/023/024/027/028 |
| USR-F-05 | Delete + reset password | Accessible confirm; server blocks (self, last Administrator) shown in the dialog; reset toast (and email_missing error) | TC-SCR-20-WEB-008/009/017/018 |
| USR-F-06 | Portal users states | Loading, error + retry, empty, search no-match | TC-SCR-20-WEB-043..046 |
| USR-F-07 | App users table | Masked phone, points formatted, paging, server search on the unmasked phone, no export | TC-SCR-21-WEB-001/008/010/015/016/021/023/024/031/033/037 |
| USR-F-08 | Reveal phone | Administrator-only eye, audited POST, re-mask, never kept across pages | TC-SCR-21-WEB-002/013/019/020, TC-SCR-21-RSP-001 |
| USR-F-09 | App user Add/Edit dialog | Phone digits 7-15, points 0..1,000,000, redeemed <= earned, optional names/e-mail, duplicate phone error, Edit with masked phone + Reveal, blank phone unchanged | TC-SCR-21-WEB-003..007/012/014/017/018/022/025..030/032 |
| USR-F-10 | App users states | Loading, error, empty, no-match | TC-SCR-21-WEB-033..035 |
| USR-F-11 | Profile | Own details + Edit details dialog (name, phone, address), Profile opens from avatar menu and sidebar card, all roles | TC-SCR-22-WEB-001/010/011/028 |
| USR-F-12 | Change password | Current/new/confirm, policy checklist, per-field eye toggles, order of messages, server field errors, 429 lock-out, success state, Cancel | TC-SCR-22-WEB-002..009/012..027 |
| USR-F-13 | First-login gate | `mustChangePassword` or 403 `password_change_required` sends every route to Profile until the password is changed | TC-SCR-22-WEB-001 (guard), PW first-login tests |
| USR-F-14 | Permissions | Administrator only for SCR-20/21 (forbidden state otherwise), Profile for all, anonymous to sign-in | TC-SCR-20-WEB-047/050, TC-SCR-21-WEB-019/020/036/039, TC-SCR-22-WEB-030 |
| USR-F-15 | A11y + responsive | axe clean (lists, dialogs, confirm, profile), Tab trap, 390/810/1440/2560 without page-level horizontal scroll | TC-SCR-20-WEB-049, TC-SCR-21-WEB-038, TC-SCR-22-WEB-029, TC-SCR-20/21/22-RSP-* |

Definition of done: typecheck, lint, build, Vitest and Playwright green; security review without High/Critical.
