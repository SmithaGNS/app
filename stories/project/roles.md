# Roles & permissions

Roles (fixed enum, DM-09): **Administrator**, **Violation manager**. Level (1-3) is stored on Portal users with no behaviour attached (OQ-V-16).

Per the ROLES cluster ("build every screen behind one permission check with no matrix filled in"), a single `can(role, permission)` check guards every route. The matrix is configuration, not hard-coded; the default matrix below is a **PROPOSED** assumption and is logged as a decision.

| Permission | Administrator | Violation manager |
| --- | :-: | :-: |
| violations:read / violations:review | ✓ | ✓ |
| violations:reveal-phone (audited) | ✓ | ✗ |
| dashboard:read | ✓ | ✓ |
| categories:manage, owners:manage, config:manage | ✓ | ✗ |
| contact:read / contact:reply | ✓ | ✓ |
| portal-users:manage, app-users:manage | ✓ | ✗ |
| profile:read / password:change (own) | ✓ | ✓ |

Test accounts (development/test only): `administrator@test.local` / `Test@1234` · `violation-manager@test.local` / `Test@1234`.
Public (no sign-in): login, forgot password, OTP, Feedback form, Badge Name read.
