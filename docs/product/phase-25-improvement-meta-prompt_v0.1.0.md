# Phase 25 Meta Prompt — Reliability, Daily-Use Depth & Portfolio Polish

**Version:** v0.1.0
**Date:** 2026-06-12
**Author:** Rory (drafted by Claude)
**Status:** Active
**Purpose:** Paste-ready prompt for the next improvement wave. Covers only gaps NOT already planned in the earlier meta prompts (#46 wording/polish 23C–24, #48 fluid/cursor 23E + F1–F8, #49 Ashen Orchid). Verified against the live codebase on 2026-06-12.
**Standards referenced:** ISO 27001 (A.9 access control, A.12.1.2 change management, A.14.2.8 security testing), SOC 2 (CC8.1 change management, Availability), DPTM (data portability), WCAG 2.1 AA, OWASP (XSS), ISO 9001 (document control), Free Tools Rule

---

## Why this wave

Three lessons drive Phase 25:

1. **The Vercel incident.** Merged code on `main` failed the production build for hours because nothing ran the real build before merge. There is **no CI pipeline at all** (`/.github/workflows` does not exist). One workflow file closes this class of failure permanently — it is the single highest-leverage item in this document.
2. **Demo → daily-use gap.** The dashboard demos beautifully, but daily-use essentials are missing: no password reset (an account is unrecoverable), Today/Weekly rituals live only in un-namespaced localStorage, no error boundary (any page crash white-screens the app), errors are silent (no toasts), and `user_profiles.display_name` exists in the DB but is never used — the greeting is hardcoded.
3. **First-impression gaps on the portfolio.** The favicon is still `vite.svg`, there are no OG/social-preview tags, `[YOUR_USERNAME]` placeholders remain in 4 files, and the resume has no PDF. These are the cheapest, most visible wins in the repo.

> **Snapshot note:** the Repomix audit that informed this doc was taken from the stale `lifeos-fix-cleared-fields` worktree. Every gap below was re-verified against current `main` (post PRs #6–#8: plain-English naming, AmbientBats flock, useMotionEffects, Settings ToggleRow) plus the `fix/vercel-build` typecheck fix. All gaps are confirmed present on `main`.

---

## Verified gap audit (what exists vs what's missing)

| Area | Exists today | Missing (Phase 25 target) |
|---|---|---|
| CI / verification | Local `tsc -b`, lint, vitest, Playwright run manually | GitHub Actions on PR + main (free for public repos) |
| Error handling | Per-hook `error` string banners | ErrorBoundary, toasts, unmount guards/.catch, `setError(null)` consistency |
| Auth | Login, signup, RLS, protected routes | Password reset, session-expiry handling, dashboard 404 |
| Profile | `user_profiles` table + signup trigger | Any UI for it — greeting/sidebar hardcode "Rory" |
| Rituals | Today + Weekly in localStorage | Supabase persistence, history/archive, per-user key namespacing |
| Tasks | Full CRUD, filters | Recurrence, link to projects |
| Habits | 7-day toggle grid + streak | Month heatmap, best-streak / 30-day stats |
| Notes | Plain-text CRUD, search, tags | Markdown subset (sanitized), pins, `[[links]]` |
| Budget | CRUD, totals, type filter | Category targets, trend chart, CSV export |
| Portfolio head | Title + meta description | Real favicon, theme-color, OG/Twitter tags, sitemap, robots, per-route titles |
| Content | — | `[YOUR_USERNAME]` ×4 files, placeholder resume entries, no PDF |
| Bundle | Main chunk ~460KB raw / ~132KB gz | Vendor splitting, size budget recorded in tech-stack doc |

---

## The paste-ready prompt

```
Phase 25 — Reliability, Daily-Use Depth & Portfolio Polish

CONTEXT:
LifeOS Portfolio Dashboard — React + Vite + TypeScript + Tailwind + Supabase (free tier).
Rose Obsidian design system; plain-English naming with gothic "flavor names" toggle; ambient bat
flock (AmbientBats + useMotionEffects, reduced-motion aware) live; demo mode (no Supabase env,
persona "Lyra M.") vs personal mode (login + RLS owner-only).
Rules: never push to main — feat/fix/docs/* branches + PR; independent review agent before merge
(reviewer ≠ author); docs versioned MAJOR.MINOR.PATCH with changelogs, never overwritten; QA log,
bug log, and document index updated per session; free tier only; no secrets in code (.env.example
only; service role key never in client); budget data never logged; demo data never seeds real accounts.

PHASE 25A — RELIABILITY & TRUST (do first, one PR each unless noted):
1. GitHub Actions CI (.github/workflows/ci.yml): on every PR and push to main run npm ci,
   npm run typecheck (tsc -b — must match the Vercel build), npm run lint, vitest run, and
   Playwright (chromium project). Cache npm + Playwright browsers. Free for public repos.
   This directly prevents a repeat of the broken-main Vercel deploy. Build this FIRST —
   it protects everything after it.
2. React ErrorBoundary: one global + one inside DashboardLayout around <Outlet/>. On crash render
   a styled Rose Obsidian panel ("Something broke. Reload the page.") with a reload button —
   never a white screen. Console-only logging (no external error service without a human decision).
3. Toast system: one shared <Toaster/> (top-right, role="status", aria-live polite); success and
   failure toasts on every create/update/delete in all hooks. Replaces silent failures.
4. Hooks hardening pass (carried review findings from QA log v0.17.0 #5/#6 and v0.19.0 #5/#6):
   unmount guards + .catch on every load effect; setError(null) at the start of every mutation
   (match useProjects); make the !isSupabaseConfigured || !user guard consistent across
   load/add/update/delete in all 7 hooks.
5. Auth completeness: "Forgot password?" link on /login → supabase.auth.resetPasswordForEmail +
   a /reset-password page (free, built into Supabase Auth). Session-expiry → redirect to /login
   with a friendly message. Add a dashboard-scoped 404 for unknown /dashboard/* routes.
6. Profile UI: Settings gains a "Profile" section editing user_profiles.display_name (table and
   signup trigger already exist — currently unused). Greeting + sidebar use it in personal mode;
   demo mode keeps the "Rory" persona branding.
7. Namespace localStorage keys by user id in personal mode (lifeos:<uid>:today-focus etc.) so demo
   browsing and a real account on the same browser never share ritual data.

PHASE 25B — DAILY-USE DEPTH (one PR per item; write a short planning note first):
1. Persist Today Ritual + Weekly Review to Supabase: migration 003 (daily_entries, weekly_reviews;
   RLS owner-only, same policy pattern as migration 002). localStorage stays as the demo fallback.
   Add a "Past reviews" read-only archive list to Weekly Review.
2. Task ↔ Project linking: nullable project_id on tasks (migration), project select in TaskForm,
   open-task count on project cards.
3. Recurring tasks: a simple recurrence field (none/daily/weekly/monthly); completing a recurring
   task spawns the next occurrence. No cron, no background jobs — computed on completion.
4. Habit month heatmap: GitHub-style month grid (pure CSS/SVG, no chart library) + per-habit stats:
   current streak (exists), best streak, 30-day completion %.
5. Notes upgrades: render a SANITIZED markdown subset (bold/italic/lists/links only — escape HTML,
   never dangerouslySetInnerHTML with raw input; OWASP XSS), pinned notes sort first,
   [[note-title]] cross-links resolve to the matching note.
6. Budget depth: optional monthly target per category with an overspend indicator, plus a pure-SVG
   6-month income/expense trend chart (carried from 23D #3 — still unbuilt).
7. Data portability (DPTM): CSV export for budget + job tracker (client-side Blob, no backend) and
   an "Export all my data" JSON button in Settings.
8. Command palette v2: add ACTIONS, not just navigation — "Add task…", "Add note…", "Copy last
   prompt" — and a global quick-add shortcut. Document shortcuts in the palette footer.

PHASE 25C — PORTFOLIO & FIRST IMPRESSION (small PRs, do the quick wins anytime):
1. Replace every [YOUR_USERNAME] placeholder (portfolioData.ts, ContactSection, HeroSection);
   real favicon set (replace vite.svg) + theme-color meta; Open Graph + Twitter card tags with a
   1200×630 social preview image in /public.
2. Resume: real experience content, a static PDF in /public wired to the existing Download CV
   button, and a print stylesheet for the resume section.
3. SEO: unique per-route <title> (useEffect or tiny helper — no new package), sitemap.xml,
   robots.txt.
4. Bundle audit: manualChunks vendor split in vite.config.ts; budget = main chunk < 140KB gz;
   record before/after sizes in the tech-stack doc.
5. Lighthouse gate recorded in the QA log per release: Performance ≥ 90, Accessibility ≥ 95,
   SEO ≥ 90 (mobile preset).

CONSTRAINTS:
- Free tier only. GitHub Actions is free for public repos; any analytics or error-reporting service
  needs a logged human decision first.
- No new npm package without a bundle-size check + tech-stack doc entry. Markdown rendering must be
  sanitized — no raw-HTML injection path (OWASP).
- WCAG 2.1 AA; all new motion respects useMotionEffects + prefers-reduced-motion; mobile-first at
  320/390/768; toasts and error panels must be screen-reader announced.
- Every PR: typecheck (tsc -b), lint, vitest, full Playwright + new test IDs for new behavior;
  independent review agent (reviewer ≠ author); QA log + bug log + document index versioned.
- Migrations are additive only (003+); never edit applied migrations; RLS owner-only on every
  new table, with INSERT ownership checks for any cross-table reference (habit_checks pattern).

DELIVERY ORDER: 25A-1 (CI) first and alone — then 25A-2..7 → 25B by value (1 → 8) → 25C quick
wins (C1 can ship same-day, anytime). Start with Phase 25A-1 now. Answer open questions yourself
with the most reasonable choice.
```

---

## Documentation triage (per auto-generation policy)

| Document | Standard followed | Generation |
|---|---|---|
| CI workflow + verification-gate note | ISO 27001 A.12.1.2 / A.14.2.8, SOC 2 CC8.1 | AUTO |
| ErrorBoundary / toast architecture note | SOC 2 Availability, WCAG 4.1.3 | AUTO |
| Migration 003 spec (daily_entries, weekly_reviews, project_id, recurrence) | ISO 27001 A.9 (RLS), DPTM | AUTO draft — **REVIEW before applying to a live DB** |
| Password-reset flow note | ISO 27001 A.9.4.3 | AUTO |
| Data-export spec (CSV/JSON) | DPTM data portability | REVIEW — Rory approves before build |
| QA log / bug log / doc index (per PR) | ISO 9001 | AUTO |
| New test cases (TC-CI, TC-EB, TC-AUTH-RST, TC-RIT, TC-EXP IDs) | ISO 9001 8.5.1, WCAG 2.1 AA | AUTO |
| Markdown rendering approach (lib vs regex subset) | Free Tools Rule, OWASP XSS | REVIEW |
| Analytics / error-reporting service (if ever pursued) | Free Tools Rule, human-decisions log | HUMAN — Rory decides |

---

## Standards-readiness flags (gaps this wave closes — or leaves open)

| Flag | Standard | Status after Phase 25 |
|---|---|---|
| No automated change-management gate (CI) | ISO 27001 A.12.1.2, SOC 2 CC8.1 | **Closed** by 25A-1 |
| No account-recovery path (password reset) | ISO 27001 A.9.4.3 | **Closed** by 25A-5 |
| No crash containment (white-screen on error) | SOC 2 Availability | **Closed** by 25A-2 |
| No data-export capability | DPTM data portability, SOC 2 | **Closed** by 25B-7 |
| Status changes not announced (silent errors) | WCAG 4.1.3 | **Closed** by 25A-3 |
| No audit logging for data mutations (FR-SUP-001) | ISO 27001 A.12.4 | **Still open** — out of scope; tracked in supabase-plan v0.1.0 |
| No data-retention policy (SEC-002) | DPTM, SOC 2 | **Still open** — tracked in privacy-and-data-notes v0.2.0 |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-12 | Initial Phase 25 meta prompt — CI/reliability (25A), daily-use depth (25B), portfolio polish (25C). Gap audit verified against main; deduplicated against meta prompts #46/#48/#49. |
