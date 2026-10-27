# Dev stories - violations (frontend)

Written by the tech lead. All done in round 1. TC ids refer to `testcases/violations/input/` and `testcases/project/TC-JRN|TC-SEAM`.

| Story | Description | Acceptance (TC ids) | Status |
|---|---|---|---|
| VIO-F1 | API hooks over the generated client, query keys, invalidation, usePendingCount (sidebar badge) | TC-SEAM-WEB-021, TC-SCR-05-WEB-018 | done |
| VIO-F2 | Dashboard: 8 tiles from GET /v1/dashboard, links (status tiles carry ?status=), funnel, latest five, messages total + unanswered | TC-SCR-05-WEB-001/002/006..015, RSP-001, TC-JRN-WEB-008/011 | done |
| VIO-F3 | Dashboard states: loading, error + retry, empty, forbidden | TC-SCR-05-WEB-022..024 | done |
| VIO-F4 | Phone mask and Administrator-only audited reveal on Dashboard and list; manager has no control | TC-SCR-05-WEB-003/016, TC-SCR-06-WEB-017/036/037 | done |
| VIO-F5 | List: server paging 10/25/50/100 with shared PagerBar, 14 columns, status pill, derived owner, 72rem scroll wrapper | TC-SCR-06-WEB-001/019..024/030, RSP-002..005 | done |
| VIO-F6 | Filters: owner, created from/to (2020-01-01..today, From <= To), Filter/Reset, search (<=100, < > stripped, debounced, ANDed), status chip | TC-SCR-06-WEB-002..005/025..028/031/034/035, TC-JRN-WEB-011/012 | done |
| VIO-F7 | List states: loading, error + retry, empty (filtered / none), forbidden | TC-SCR-06-WEB-032/038 | done |
| VIO-F8 | Review modal: detail rows, masked mobile, evidence placeholder, presets, history, session reviewer footnote | TC-SCR-07-RSP-001, WEB-006/020/025 | done |
| VIO-F9 | Review save: zod rules (Verified level >= 1, Rejected note, 500), server 400/404/409 handling, toast with server message, invalidation so tiles/funnel/badge/rows follow | TC-SCR-07-WEB-001..003/012/016/018/019/021, TC-JRN-WEB-007, TC-SEAM-WEB-017/026/029 | done |
| VIO-F10 | Modal dismissal: Close, x, Escape, backdrop discard; focus returns to the opener (also after Save) | TC-SCR-07-WEB-004/005/007/011/013/014/023/027 | done |
| VIO-F11 | Accessibility (axe clean, captions, labels, keyboard tiles) and responsive 390-2560 | TC-SCR-05-WEB-027, TC-SCR-06-WEB-040, TC-SCR-07-WEB-027, RSP-* | done |
| VIO-F12 | Anonymous access sends to sign-in, no data requested | TC-SCR-05-WEB-028, TC-SCR-06-WEB-041, TC-SCR-07-WEB-028 | done |

Not built by design: CSV/Excel/Print (VIO-R18), reward points (VIO-R11), evidence viewer (VIO-R16), sorting (OQ-V-11).
Deviations from generated cases are logged in open-questions.csv (Q-078..Q-086).
