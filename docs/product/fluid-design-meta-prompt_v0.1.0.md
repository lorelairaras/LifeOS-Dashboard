# Fluid & Cursor-Reactive Design — Meta Prompt (Phase 23E + features)

**Version:** v0.1.0
**Date:** 2026-06-11
**Author:** Rory (drafted by Claude)
**Status:** Active
**Purpose:** Paste-ready brief for adding fluid, mouse-following motion that matches the Rose Obsidian vibe, plus the next feature wave.
**Standards referenced:** WCAG 2.3.3 (Animation from Interactions), WCAG 2.1 AA, 60fps performance budget, Free Tools Rule

---

## Design intent — "moonlight, not neon"

The Rose Obsidian world is a dark velvet room lit by a single rose-pink moon. Cursor-reactive
motion should read as **light moving across that velvet** — slow, soft, and warm. The pink bloom
(`#FF4FA3`) is the light source; the cursor is where it falls. Nothing snaps, flashes, or races.

- Easing: `ease-out`, durations 150–600ms. Motion lags the cursor slightly (a soft follow), it never tracks 1:1.
- Opacity stays low (glows 8–18%). The effect should be *felt* before it's *noticed*.
- Two accent colors max on screen at once (pink + one of gold/oracle/bloom).

## Cursor-reactive techniques (each mapped to the vibe)

1. **Cursor spotlight** — a large, soft radial `ro-pink → transparent` glow centered on the pointer,
   painted on the void background and on panels. The moon following you across the room. *Highest-impact, lowest-risk — build first.*
2. **Card pointer-tilt** — cards rotate ±4–6° (`rotateX/rotateY`) toward the cursor with a faint moving
   sheen. Velvet catching the light as you lean over it.
3. **Spotlight border** — on hover, a rose gradient ring lights the card edge nearest the cursor
   (the "spotlight card" effect). Reads like moonlight catching a gilded frame.
4. **Parallax grunge bats** — the moving background layer is a small colony of dark bat silhouettes
   drifting *opposite* the cursor at different depths (near bats move more than far ones). One faint
   rose "moon" glow sits behind them. The bats bob and flutter their wings on a slow idle loop, so the
   background is alive even when the mouse is still. Grunge treatment: a low-opacity film-grain overlay
   (SVG `feTurbulence` data-URI, ~5–8%, `mix-blend-mode: overlay`) plus a dark vignette on the edges —
   distressed, moody, hand-printed, never cartoon-Halloween. Bats are dark plum silhouettes
   (`#1d1622`–`#2a1f2e`), low opacity, lit from behind by the rose glow. Replaces the earlier
   "ambient orbs" idea and extends the `.ro-glow` utility into a `.ro-bats` layer.
5. **Magnetic primary buttons** — the primary CTA nudges ~3px toward the cursor when near, then
   eases back. A subtle gravitational pull.
6. **Reactive grid** — the existing `--ro-grid` overlay brightens only within a radius of the cursor
   (radial mask). The gothic grid breathes where you look.
7. **Soft custom cursor (optional, behind toggle)** — a small pink bloom dot with a lagging ring.
   Keep native affordances (text caret, pointer on links).

## Non-negotiable guardrails (compliance built in from the first draft)

- **`prefers-reduced-motion: reduce` disables ALL of it.** Static, glow-free fallback. (WCAG 2.3.3.) This is the first thing to wire, not an afterthought.
- **Fine pointers only** — wrap every effect in `@media (pointer: fine)`. Touch / coarse pointers get
  the static design (no jank, no battery drain, no phantom hover).
- **Performance budget — 60fps, no exceptions:**
  - One shared, rAF-throttled `pointermove` listener for the whole app — never one per component.
  - Effects animate `transform` / `opacity` / CSS custom properties only. No layout-triggering props.
  - The pointer hook writes CSS variables (`--mx`, `--my`, `--mxn`, `--myn`) — components read them in
    CSS. **Mouse movement must cause zero React re-renders.**
  - `will-change` is applied on hover/focus and removed on leave — never left on permanently.
  - Measure with DevTools Performance; record the frame cost in `docs/architecture/tech-stack.md`.
- **Keyboard & focus untouched** — every effect is decorative. `:focus-visible` rings stay; nothing
  functional depends on hover or mouse position.
- **Settings toggle: "Motion effects"** — default ON for fine pointers, but always yields to
  `prefers-reduced-motion`. Sits beside the existing "Flavor names" toggle. Persist like `useFlavorNames`.
- **No heavy npm packages.** Target a ~40-line `usePointer()` hook + CSS utilities. If a tilt/animation
  library is ever considered, check bundle size, confirm free tier, and log it in the tech-stack doc first.

## Architecture

- `src/hooks/usePointer.ts` — single document `pointermove` listener, rAF-throttled, writes
  `--mx/--my` (px) and `--mxn/--myn` (normalized −1…1) to a container or `:root`. Respects
  reduced-motion + coarse-pointer (no-ops, returns static). Mirrors the `useFlavorNames` storage pattern for the toggle.
- `src/components/SpotlightCard.tsx` — wraps/extends `ro-card`; adds tilt + spotlight border, reading
  the CSS vars. Drop-in replacement so existing cards upgrade with a rename.
- `src/styles/index.css` — new utilities: `.ro-spotlight`, `.ro-tilt`, `.ro-bats`, `.ro-grain`, `.ro-reactive-grid`.
- `src/components/MotionProvider.tsx` (optional) — provides the toggle state + mounts the listener once.

## Build order (Phase 23E, one PR)

1. `usePointer` hook + reduced-motion / coarse-pointer guards + "Motion effects" Settings toggle.
2. Cursor spotlight on the dashboard shell and portfolio hero (technique 1).
3. `SpotlightCard` (tilt + spotlight border) — adopt on Home stat cards, Projects, Notes (techniques 2–3).
4. Parallax grunge bats + rose moon glow + grain/vignette on portfolio hero + dashboard Home (technique 4).
5. Magnetic primary buttons + reactive grid (techniques 5–6).
6. Custom cursor (technique 7) — last, optional, behind the toggle.

Each step: typecheck, lint, Playwright (add a reduced-motion test asserting effects are inert), independent review, QA log + doc index bump.

---

## More features (extend the roadmap — each its own PR, planning approval first)

| # | Feature | Notes |
|---|---|---|
| F1 | Global search (⌘K palette upgrade) | Fuzzy search across tasks, prompts, notes, projects; arrow-key nav; recent pages |
| F2 | Dashboard customization | Drag to reorder / show-hide stat cards; persisted per user |
| F3 | Accent presets within Rose Obsidian | "Moonlit" (lighter), "Blood" (deeper), "Oracle" (violet) — swaps `ro.*` accent only, not the whole theme |
| F4 | Streak celebrations | Soft pink particle bloom when a habit streak hits 7/30 — **reduced-motion safe** |
| F5 | Keyboard shortcuts overlay | Press `?` for a cheat sheet; documents existing ⌘K and nav |
| F6 | Page transitions | Gentle fade/slide between routes; reduced-motion → instant |
| F7 | On-brand empty-state illustrations | SVG, rose-on-obsidian; replaces text-only empty states |
| F8 | Prompt copy + use-count | (carried from Phase 24) copy button with feedback, "last used" sort |

---

## Documentation triage (per auto-generation policy)

| Document | Standard | Generation |
|---|---|---|
| `usePointer` / motion architecture note | 60fps budget, WCAG 2.3.3 | AUTO |
| tech-stack update (frame cost, any lib) | Free Tools Rule | AUTO |
| QA log + document index (per PR) | ISO 9001 | AUTO |
| Test cases incl. reduced-motion assertions | WCAG 2.3.3 | AUTO |
| Accent-preset / theming spec (F3) | — | REVIEW — Rory approves before build |
| Any paid animation service | Free Tools Rule, human-decisions | HUMAN — Rory decides |

---

## The paste-ready prompt

```
Phase 23E — Fluid & Cursor-Reactive Design (Rose Obsidian)

CONTEXT:
LifeOS Portfolio Dashboard — React + Vite + TypeScript + Tailwind + Supabase (free tier).
Rose Obsidian (ro.* tokens): obsidian void #080509, rose-pink bloom #FF4FA3, velvet panels.
Demo mode = no Supabase env vars; Personal mode = login + RLS. Branch feat/*; PR; docs versioned.

DESIGN INTENT — "moonlight, not neon":
Pink bloom is the light source; the cursor is where it falls. Slow, soft, warm. ease-out 150–600ms,
motion lags the cursor (never 1:1), glows 8–18% opacity, max 2 accents on screen.

BUILD (Phase 23E, one PR):
1. src/hooks/usePointer.ts — ONE rAF-throttled document pointermove listener; writes CSS vars
   --mx/--my (px) and --mxn/--myn (normalized −1..1). Mouse movement causes ZERO React re-renders.
   No-ops under prefers-reduced-motion AND coarse pointer.
2. "Motion effects" toggle in Settings (default ON for fine pointers, always yields to reduced-motion;
   persist like useFlavorNames). Pairs with the Flavor names toggle.
3. Cursor spotlight: soft radial ro-pink→transparent glow at the pointer on dashboard shell + portfolio hero.
4. SpotlightCard component (extends ro-card): ±4–6° pointer-tilt + rose spotlight border on the
   nearest edge. Adopt on Home stat cards, Projects, Notes.
5. Parallax grunge bats (.ro-bats): dark plum bat silhouettes drifting opposite the cursor at varied
   depths, slow idle bob + wing flutter, one rose "moon" glow behind, film-grain (feTurbulence ~5-8%
   mix-blend overlay) + edge vignette. Moody/distressed, not cartoon. On hero + Home.
6. Magnetic primary buttons (~3px pull) + reactive grid (brighten --ro-grid within a cursor radius).
7. Optional soft custom cursor (pink bloom + lagging ring), behind the toggle, keeps native affordances.

GUARDRAILS (build in from first commit, do not retrofit):
- prefers-reduced-motion: reduce disables ALL motion → static glow-free fallback (WCAG 2.3.3).
- @media (pointer: fine) gates every effect; touch/coarse = static.
- transform/opacity/CSS-vars only; no layout props; will-change only on hover/focus then removed.
- Target 60fps; record frame cost in docs/architecture/tech-stack.md.
- Focus-visible rings and keyboard paths untouched; effects are purely decorative.
- No heavy npm packages; ~40-line hook + CSS. Any lib → bundle check + free-tier + tech-stack log first.

THEN (each its own PR, planning approval first):
F1 global ⌘K search across modules; F2 draggable/hideable dashboard cards; F3 accent presets
(Moonlit/Blood/Oracle, swap ro.* accent only); F4 streak celebration bloom (reduced-motion safe);
F5 "?" shortcuts overlay; F6 route page transitions (reduced-motion → instant); F7 SVG empty-state
illustrations; F8 prompt copy + use-count.

CONSTRAINTS:
- Free tier only; no paid tools without approval logged in docs/decisions/human-decisions.
- WCAG 2.1 AA; mobile-first 320/390/768; reduced-motion + coarse-pointer correctness is part of "done".
- typecheck, lint, full Playwright (add a reduced-motion test asserting effects are inert) per PR.
- Independent review agent before merge (reviewer ≠ author).
- QA log + document index versioned each session.

DELIVERY ORDER: 23E motion foundation (steps 1–3) → SpotlightCard + grunge bats (4–5) → magnetic/grid/cursor
(6–7) → features F1–F8. Start with steps 1–3. Answer open questions yourself with the most reasonable choice.
```

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-11 | Initial fluid/cursor-reactive design meta prompt + feature wave (Phase 23E, F1–F8) |
