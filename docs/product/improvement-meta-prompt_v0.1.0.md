# Improvement Meta Prompt — Phases 23C → 24

**Version:** v0.1.0
**Date:** 2026-06-11
**Author:** Rory (drafted by Claude)
**Status:** Active
**Purpose:** Ready-to-paste prompt for the next improvement sessions. Covers wording simplification, design polish, and the feature roadmap.
**Standards referenced:** WCAG 2.1 AA (wording & readability), ISO 9001 (documented process), Nielsen usability heuristics (match between system and real world)

---

## Why wording comes first

Current naming (Command Chamber, Prompt Grimoire, Weekly Séance, Project Reliquary) is brand-rich but fails the "5-second stakeholder test" — a recruiter, client, or new user cannot guess what a screen does from its name. Usability heuristic #2 (match between system and the real world) says labels should use words familiar to the user. The fix is to **flip the two-layer naming**: plain English becomes the primary label everywhere; the gothic name becomes optional flavor.

| Current (primary) | New primary (plain) | Gothic flavor (kept as subtitle) |
|---|---|---|
| Command Chamber | Home | "The Command Chamber" |
| Today Ritual | Today | "Today's Ritual" |
| Ritual Tasks | Tasks | "Ritual Tasks" |
| Prompt Grimoire | Prompts | "The Grimoire" |
| Project Reliquary | Projects | "The Reliquary" |
| Budget Pulse | Budget | "Budget Pulse" |
| Career Pipeline | Job Tracker | "Career Pipeline" |
| Weekly Séance | Weekly Review | "The Séance" |
| Habit Rituals | Habits | "Habit Rituals" |
| AI Oracle | AI Assistant | "The Oracle" |
| Knowledge Vault | Notes | "The Vault" |

Other wording rules:
- Microcopy at max grade-8 reading level: "Plan your day" not "Curate your daily intentions"
- Buttons say what happens: "Save", "Add Task", "Delete" — never "Seal the Day" alone (keep flavor text as secondary line if desired)
- Error messages say what to do next: "Couldn't save. Check your connection and try again."
- Empty states explain the feature in one sentence + one action button

---

## The Meta Prompt (paste into a new session)

```
Phase 23C+ — LifeOS Simplification & Polish

CONTEXT:
LifeOS Portfolio Dashboard — React + Vite + TypeScript + Tailwind + Supabase (free tier).
Rose Obsidian design system (ro.* tokens) unified across portfolio + dashboard.
All 8 dashboard modules functional with demo-mode fallback (mock persona "Lyra M.").
Demo mode = no Supabase env vars (public site). Personal mode = Supabase + login (private data via RLS).
Branch rule: never push to main; feat/* branches + PR. Docs versioned MAJOR.MINOR.PATCH, never overwrite.

PHASE 23C — WORDING SIMPLIFICATION (do first, highest stakeholder impact):
1. Flip two-layer naming everywhere: plain English PRIMARY, gothic flavor SECONDARY.
   Home (was Command Chamber), Today (Today Ritual), Tasks (Ritual Tasks),
   Prompts (Prompt Grimoire), Projects (Project Reliquary), Budget (Budget Pulse),
   Job Tracker (Career Pipeline), Weekly Review (Weekly Séance), Habits (Habit Rituals),
   AI Assistant (AI Oracle), Notes (Knowledge Vault).
2. Apply in: sidebar labels, page headers, command palette, page <title>, breadcrumbs,
   empty states, buttons, aria-labels, E2E test selectors, and docs.
3. Add a "Flavor names" toggle in Settings (default OFF for new users): when ON, gothic
   names show as the page-header subtitle. Store in localStorage (demo) / user_profiles (personal).
4. Rewrite all microcopy to grade-8 reading level. Buttons = verb + noun. Errors = what happened + what to do.
5. Simplify demo notice: "This is a demo with example data. Changes are not saved." + link "Set up your own dashboard" → personal setup guide.

PHASE 23D — DESIGN POLISH:
1. Loading skeletons (not spinners) for all module lists.
2. Toast notifications for create/update/delete success and failure (one shared <Toaster/>).
3. Budget: add a simple bar chart (income vs expense by month) and category breakdown — pure SVG/CSS, no chart library if possible; if needed, only a free, lightweight one (document choice in tech-stack doc).
4. Task filters: status + priority + search; saved in URL query params.
5. Job tracker: optional kanban view (columns by status, drag optional — click-to-move is fine for MVP).
6. Onboarding hints: first-visit tooltip per module explaining the feature in one line (dismissable, stored per module).
7. Consistent focus-visible rings on ALL interactive elements (audit with keyboard-only pass).
8. Reduce visual noise: max 2 accent colors per screen; verify contrast ratios ≥ 4.5:1 (WCAG AA).
9. Mobile audit at 320px: every page must work one-handed; sticky bottom action bar on mobile for primary actions.

PHASE 24 — FEATURE ROADMAP (each needs planning approval before build):
1. Persist Today + Weekly Review to Supabase (daily_entries, weekly_reviews tables, RLS owner-only) — currently localStorage.
2. Prompt library: copy button with success feedback, use-count tracking, "last used" sort.
3. CSV export for budget and job tracker (client-side, no backend).
4. Settings page: display name, flavor-names toggle, export-all-my-data button (DPTM data portability).
5. Public portfolio: read-only "featured prompts" and "featured projects" sections pulled from demo data or a public flag (visibility='public' projects only).
6. AI Assistant: STILL PLACEHOLDER unless explicitly approved — requires paid API key decision (document in human-decisions log).

CONSTRAINTS:
- Free tier only. No paid tools without explicit approval logged in docs/decisions/human-decisions.
- No new npm packages without checking bundle size and documenting in tech-stack doc.
- WCAG 2.1 AA. Mobile-first at 320/390/768.
- All work tested: typecheck, lint, full Playwright suite + new tests per feature.
- Independent review agent before merge (reviewer must not be the author).
- QA log + document index versioned per session.
- Demo data never seeds real accounts; budget data never logged.

DELIVERY ORDER: 23C wording (one PR) → 23D design (one PR) → 24 features (one PR each).
Start with Phase 23C now. Answer open questions yourself with the most reasonable choice.
```

---

## Documentation impact of these phases

Per the documentation triage policy, when these phases run, the following docs will be touched:

| Document | Standard followed | Generation |
|---|---|---|
| Naming convention guide (new) | Nielsen heuristics, WCAG 3.1.5 (reading level) | AUTO — Claude drafts, no gate |
| QA execution log (per phase) | ISO 9001 | AUTO |
| Document index (per phase) | ISO 9001 | AUTO |
| Tech-stack doc (if chart lib added) | Free Tools Rule | AUTO |
| Test cases (new TC IDs) | ISO 9001 | AUTO |
| Settings/data-export spec | DPTM (data portability) | REVIEW — Rory approves before build |
| AI Assistant decision (paid API) | Free Tools Rule, human-decisions log | HUMAN — Rory must decide |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-11 | Initial meta prompt — wording simplification (23C), design polish (23D), feature roadmap (24) |
