# Naming Conventions — LifeOS

**Version:** v0.1.0
**Date:** 2026-06-11
**Author:** Rory (drafted by Claude)
**Status:** Active
**Standards referenced:** Nielsen heuristic #2 (match between system and real world), WCAG 3.1.5 (reading level)

---

## The rule

**Plain English is the primary name everywhere.** The gothic Rose Obsidian "flavor names" are an optional layer, shown only as page-header subtitles when the user turns on **Settings → Flavor names** (off by default).

A first-time visitor, recruiter, or stakeholder must be able to guess what every screen does from its name in under 5 seconds.

## The name map

| Plain name (primary) | Flavor name (optional subtitle) | Route |
|---|---|---|
| Home | The Command Chamber | /dashboard |
| Today | Today's Ritual | /dashboard/today |
| Tasks | Ritual Tasks | /dashboard/tasks |
| Prompts | The Grimoire | /dashboard/prompts |
| Projects | The Reliquary | /dashboard/projects |
| Budget | Budget Pulse | /dashboard/budget |
| Job Tracker | Career Pipeline | /dashboard/jobs |
| Weekly Review | The Séance | /dashboard/review |
| Habits | Habit Rituals | /dashboard/habits |
| AI Assistant | The Oracle | /dashboard/oracle |
| Notes | The Vault | /dashboard/vault |

Sidebar group labels: OVERVIEW · WORK · LIFE · REFLECT · MORE (was COMMAND · PRACTICE · LIFE SYSTEMS · RITUALS · ORACLE).

## Microcopy rules

1. **Reading level:** grade 8 or below. Short sentences. No invented vocabulary in functional copy.
2. **Buttons say what happens:** verb + noun ("Add Task", "Save my day", "Delete"). Flavor verbs ("Seal the Day") appear only when Flavor names is ON.
3. **Errors say what to do next:** "Couldn't save. Check your connection and try again." Never just "Error".
4. **Empty states:** one sentence about what the feature does + one action button.
5. **Demo notice:** "This is a demo with example data. Changes are not saved." + setup link.
6. **Internal copy references** (descriptions, AI action cards, demo data) use plain names, never flavor names.

## Where the flavor layer is allowed

- Page-header subtitle (via `PageHeader`'s `flavor` prop or the `useFlavorNames()` hook), gated by the toggle
- Command palette sublabels (always visible — doubles as search keywords so "grimoire" still finds Prompts)
- Brand moments: portfolio hero, logo area, marketing copy

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-11 | Initial naming convention guide — Phase 23C naming flip |
