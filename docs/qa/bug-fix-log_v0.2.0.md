# Bug Fix Log — LifeOS Portfolio Dashboard

**Version:** v0.2.0
**Date:** 2026-06-11
**Author:** Rory
**Status:** Active — updated when bugs are found and fixed
**Supersedes:** bug-fix-log_v0.1.0.md

---

## Log Format

```
## BUG-[ID]
Date found: [date]
Found in: [phase] | [test ID if applicable]
Severity: Critical | High | Medium | Low
Description: [what is broken]
Root cause: [why it happened]
Fix applied: [what was changed]
Date fixed: [date]
Verified by: [test ID or manual confirmation]
Status: Open | Fixed | Won't Fix
```

---

## BUG-A11Y-01

- **Date found:** 2026-06-11
- **Found in:** A11y fix round (branch `fix/dialog-focus-a11y`) | TC-A11Y-003
- **Severity:** Medium
- **Description:** Modal's newly added focus restore returned focus to `<body>` instead of the triggering element after close, for every Modal hosting a form (all current uses). Caught by the independent reviewer and confirmed by TC-A11Y-003 failing on chromium and mobile-chrome (2 failed / 84 passed).
- **Root cause:** The opener was captured via `document.activeElement` inside a passive `useEffect`. Every form rendered inside Modal sets `autoFocus` on its first field, and React applies `autoFocus` during the commit phase — before passive effects run — so the captured "opener" was actually the form's first input. That input is unmounted on close, the `isConnected` guard short-circuited, and focus silently dropped to `<body>`.
- **Fix applied:** Both `Modal.tsx` and `ConfirmDialog.tsx` now capture the opener at the `isOpen` false→true transition during render (before children commit), restoring it in the focus effect's cleanup with an `isConnected` guard.
- **Date fixed:** 2026-06-11
- **Verified by:** TC-A11Y-003 + TC-A11Y-004 — full suite 88/88 PASS (chromium + mobile-chrome)
- **Status:** Fixed

---

## Severity Definitions

| Severity | Meaning |
|---|---|
| Critical | App crashes, data loss, security issue, or core flow completely broken |
| High | Feature is broken and there is no workaround |
| Medium | Feature is degraded but a workaround exists |
| Low | Minor visual or UX issue with no functional impact |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.2.0 | 2026-06-11 | First bug logged: BUG-A11Y-01 (Modal focus restore captured opener after autoFocus). |
| v0.1.0 | 2026-06-03 | Bug fix log created — awaiting first bug |
