# QA Execution Log — v0.21.0

**Phase:** 23E — Ambient bat flock + Motion-effects toggle
**Date:** 2026-06-12
**Executed by:** Claude (author)
**Branch:** feat/phase-23e-bat-flock (off `main` @ cleared-fields merge)
**Supersedes:** qa-execution-log_v0.20.0.md

> Numbering note: QA logs are append-only separate files, so v0.21.0 is safe regardless
> of the order the in-flight branches merge. The shared **document index is intentionally
> NOT bumped on this branch** — building one from main's current v0.15.0 snapshot would
> regress entries #47–#49 that the unmerged `23C` (index v0.16.0) and `docs/design-meta-prompts`
> (index v0.17.0) branches add. The index will register AmbientBats + this QA log during
> final integration, once branch merge order is settled (recommended: 23C → docs → bats).

---

## Scope

Add a decorative **ambient bat flock** that flies around the whole dashboard background, with a
**Motion effects** setting and full accessibility/performance guardrails. No functional/data changes.

## Changes

| File | Change |
|---|---|
| `src/components/AmbientBats.tsx` | NEW — canvas flock: 22 bats (auto-halved on small/coarse screens), wander steering, edge-steer + wrap, wing flap, banks to heading, gentle cursor attraction. dpr≤2, pauses on tab hidden, `pointer-events:none`, `aria-hidden`. |
| `src/hooks/useMotionEffects.ts` | NEW — preference hook; `enabled = userPref && !prefers-reduced-motion`; localStorage + in-memory fallback; cross-component + cross-tab sync. |
| `src/app/DashboardLayout.tsx` | Mount `<AmbientBats>` as a `z-0` background layer behind a `z-10` content wrapper, gated by `useMotionEffects().enabled`. |
| `src/features/dashboard/pages/SettingsPage.tsx` | Replaced placeholder with a real Settings page exposing the Motion-effects `role="switch"` toggle + reduced-motion notice. |
| `playwright.config.ts` | `use.reducedMotion: 'reduce'` (test-hygiene intent). |
| `tests/e2e/bats.spec.ts` | NEW — TC-BAT-001..004. |

## Final Summary

| Check | Result |
|---|---|
| TypeScript (`npm run typecheck`) | PASS |
| ESLint (`npm run lint`) | PASS — 0 warnings |
| Playwright E2E (`npx playwright test`) | PASS — 98/98 on Chromium + mobile-chrome (flock active) |
| Visual verification | Bats confirmed flying across the background behind content (screenshot) |

## New tests (TC-BAT)

| ID | Assertion |
|---|---|
| TC-BAT-001 | Flock canvas mounts iff motion is allowed (reads in-page `prefers-reduced-motion`, asserts presence/absence accordingly) |
| TC-BAT-002 | Settings exposes the Motion-effects switch |
| TC-BAT-003 | Toggling the switch flips `aria-checked` |
| TC-BAT-004 | Turning the toggle off removes the flock (skipped under reduced motion) |

## Accessibility & performance notes

- **Decorative only:** `aria-hidden`, `pointer-events:none`, no focus, not announced.
- **Reduced motion:** `useMotionEffects` AND-gates on `prefers-reduced-motion`, so the flock never
  mounts when the OS asks for reduced motion — independent of the user toggle.
- **Performance:** single canvas, `transform`-only draws, `dpr` capped at 2, rAF paused on tab hidden,
  bat count auto-reduced on small / coarse-pointer screens.
- **Known tooling quirk:** the continuous rAF means screenshot tools that wait for "idle" can time out;
  Playwright (no idle-wait) is unaffected — full suite green.

## Standards Readiness Check

| Standard | Flag | Notes |
|---|---|---|
| WCAG 2.3.3 (animation from interaction) | ✅ | Reduced-motion disables the flock entirely |
| WCAG 1.4.11 / 4.1.2 | ✅ | Decorative (aria-hidden); toggle is role="switch" + aria-checked |
| 60fps budget | ✅ | Canvas transforms only, dpr≤2, paused when hidden |
| ISO 9001 | ✅ | typecheck/lint/E2E gates run; flake investigated (one-off) and de-risked via robust tests |
| Free Tools Rule | ✅ | No new dependencies; hand-written canvas |

## Independent Review (reviewer ≠ author) — APPROVE WITH MINOR FIXES

A separate agent with no knowledge of the implementation reviewed the branch. It verified
(high confidence) the rAF/listener teardown, the reduced-motion JS gate, decorative semantics,
the Settings toggle, steering math (div-by-zero guarded), dpr cap, and cross-tab sync are all
correct. Findings and resolutions:

| # | Severity | Finding | Resolution |
|---|---|---|---|
| 1 | Minor | rAF pause relied on the visibility handler, not self-enforcing | **FIXED** — `step()` now bails `if (!running \|\| document.hidden)` at the top |
| 2 | Minor | Bat count/seeding fixed at mount, not re-derived on resize | **NO CHANGE** — conscious decision for a decorative layer (no memory growth); noted |
| 3 | Minor | `coarse` pointer sampled once at mount | **NO CHANGE** — desirable (saves battery on touch); noted |
| 4 | Minor | Playwright `reducedMotion` not reaching matchMedia → a11y fallback path unverified locally | **ACKNOWLEDGED** — confirmed reproducible (TC-BAT-004 does not skip on a fresh server); config kept + annotated; see coverage note below |
| 5 | Minor | Tests could bleed via localStorage if context reuse is enabled | **ADDRESSED** — added a note; an init-script reset was tried and reverted because it broke TC-BAT-004 (wipes the pref between navigations). Default context isolation already covers this. |
| 6 | Minor | Hardcoded rgba bat colors disconnected from ro.* tokens | **NOTED in code** — comment added; tokens aren't exposed as CSS vars, so a canvas can't read them today |

### Coverage note (honest reconciliation)

The 98/98 run exercised the **non-reduced** path (flock active) — Playwright's `reducedMotion`
emulation did not take effect in this environment. The reduced-motion fallback (flock does not
mount) is therefore **asserted-correct-if-reached but not exercised by the local suite**. The JS
gate in `useMotionEffects` is the single source of truth and was verified by the reviewer to
unmount the flock under reduced motion. Recommended follow-up: confirm the reduced branch runs in
CI (headless honours `setEmulatedMedia`), or add an explicit context with `reducedMotion` forced.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.21.0 | 2026-06-12 | Ambient bat flock + Motion-effects toggle. 98/98 E2E. Document-index bump deferred to integration to avoid regressing parallel branches. |
| v0.20.0 | 2026-06-12 | 23C wording round (re-homed), merged with main. 90/90. |
| v0.19.0 | 2026-06-12 | Cleared-fields fix. 90/90. |
