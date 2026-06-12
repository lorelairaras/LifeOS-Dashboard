# Ashen Orchid — Fluid Cursor, Motifs, Flexible Layout & Daily-Life Features (Meta Prompt)

**Version:** v0.2.0
**Date:** 2026-06-12
**Author:** Rory (drafted by Claude)
**Status:** Active
**Supersedes:** ashen-orchid-design-meta-prompt_v0.1.0.md
**Purpose:** Paste-ready brief that evolves the Rose Obsidian look toward a muted black-metal-zine
aesthetic ("Ashen Orchid"), adds a **bat-flock cursor over a fluid orchid-ink trail** + orchid/bat
motifs, makes the dashboard flexible like SpaceHey/Notion, and adds daily-life modules.
Extends `fluid-design-meta-prompt_v0.1.0.md`. v0.2.0 replaces the "circle bloom" cursor with the
bat-flock-as-cursor + liquid trail (validated in an interactive prototype) and upgrades the orchid spec.
**Standards referenced:** WCAG 2.1 AA (1.4.3 contrast, 2.3.3 animation-from-interaction), 60fps budget, Free Tools Rule

---

## 0. Direction in one line

Keep the gothic soul, lose the neon. Move from hot-pink-on-black toward **muted ash, dryad bark,
and oxblood, lit by a single orchid accent** — the "black-metal zine / dark-academia Notion" look
from the reference boards. Lean on **CSS** (custom properties, gradients, masks, `:has()`, container
queries, scroll-driven animation) so motion and theming cost almost no JavaScript.

## 1. Palette — "Ashen Orchid" (ship as a theme preset, don't rip out Rose Obsidian)

Source: Engie Designs palette + an orchid accent. Ship as an **accent/theme preset** (roadmap F3) so
Rose Obsidian and Ashen Orchid both exist and the user picks in Settings.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--ao-void` | Existential Angst | `#0A0A0A` | app background |
| `--ao-bark` | Dryad Bark | `#33312F` | panels / cards |
| `--ao-charcoal` | Light Charcoal | `#726E68` | muted text, borders |
| `--ao-ash` | Ashes | `#B7B4AE` | primary text |
| `--ao-oxblood` | Black Kite | `#371E1E` | deep accent / danger-ish |
| `--ao-orchid` | Orchid (new) | `#B084A8` | primary accent (links, active, glow) |
| `--ao-orchid-bright` | Orchid bright | `#CDA6C6` | hover/emphasis, splash highlight |

**Contrast (WCAG 1.4.3 — verify in build):** Ashes `#B7B4AE` on Void `#0A0A0A` ≈ 9:1 (passes AAA body).
Orchid `#B084A8` on Void ≈ 5.6:1 (passes AA). **Do not** put `--ao-charcoal` text on `--ao-bark` for
anything important — that pair is ~2:1 and fails; reserve charcoal for large/decorative only. Run an
automated contrast check on the preset before merge.

## 2. Motifs — orchids + bats, CSS/SVG, decorative-only

- **Orchid (proper phalaenopsis, not a daisy):** bilateral — one dorsal sepal, two broad lateral petals,
  two lower lateral sepals, and a distinct trilobe **labellum (lip)** in oxblood with a `#9C7268` throat
  and two column dots. Fill with a `radialGradient` from `--ao-orchid-bright` → `--ao-orchid` → `--ao-oxblood`
  so petals read dimensional, not flat. Use as: a large faint corner bloom on hero/Home, and small crisp
  orchids as **section dividers** (replace the plain separators). Inline SVG, `aria-hidden`, theme-inherited.
- **Bats** appear in two roles: (a) the **cursor flock** (see §3), and (b) an optional far-background
  parallax colony — dark dryad-bark silhouettes, slow bob + flutter, recolored for this palette.
- Optional zine accents from the references — hairline crosses, spiderweb corners, blackletter *display*
  font for big headings only (keep body in the readable sans). Use sparingly; readability wins.
- Everything here is decorative: `aria-hidden`, no focus, disabled under `prefers-reduced-motion`.

## 3. The cursor — a bat flock over a fluid orchid-ink trail (replaces the cursor entirely)

Decision (from the prototype): **the bats ARE the cursor.** Hide the native cursor (`cursor:none`) on
fine pointers and render a small **flock that hunts the pointer**:

- **Lead bat** eases to the pointer (`lerp ~0.16`); **followers** chain — each eases toward the one ahead
  with a fixed gap, so the flock strings out into a tail. ~6–7 bats, size and opacity tapering down the chain.
- **Banking:** each bat rotates to its own velocity vector (`atan2`), only updating heading above a small
  speed threshold so a resting flock doesn't spin. Wings flap via an independent CSS `scaleX` keyframe
  (transform on an inner element so it never fights the JS position/rotation transform on the wrapper).
- **Glide, don't snap:** the rAF loop runs continuously and keeps easing toward the last target, so when
  the mouse stops the flock settles smoothly and circles in.
- **Fluid trail (the "splash"):** the lead bat emits ink along its travel path — interpolate points between
  last and current position (so fast moves leave continuous ribbons, not dots), each particle inheriting a
  fraction of the lead's velocity plus a curl term (`vx += sin(y·k + t)·amt`) for liquid swirl. Draw additive
  (`globalCompositeOperation='lighter'`) orchid/oxblood radial gradients that grow and fade; a translucent
  `--ao-void` fill each frame makes the wet smear. One canvas, capped particles (~240), `dpr ≤ 2`, 60fps,
  zero React re-renders. (This is the prototype Claude built — port it.)

**Fallbacks (required):** under `prefers-reduced-motion` or coarse pointer, restore the native cursor, kill
the canvas, and park the bats statically (or drop them entirely). The flock is decorative — never the only
way to see where the pointer is on touch.

**Optional Tier B — true WebGL fluid (planning-gated, HUMAN decision):** if you ever want the full
Dobryakov/reactbits Navier–Stokes sim *behind* the flock, vendor the MIT component **with attribution**,
lazy-load it (never in the main bundle), default OFF, hard-disable under reduced-motion AND coarse pointer,
and **log the perf/battery trade-off in `docs/decisions/human-decisions.md`** first. The canvas trail above
already gives a convincingly liquid feel at a fraction of the cost, so Tier B is a want, not a need.

Everything sits behind the **"Motion effects"** toggle and the guardrails in §6.

## 4. Flexible & dynamic layout — SpaceHey × Notion

Turn the dashboard from a fixed grid into a **board of blocks the user arranges**:

- **Notion-side (structure):** each module/widget is a "block." User can **reorder, resize (1–3 cols),
  and show/hide** blocks; layout persists per user (localStorage in demo, `user_layouts` table in
  personal mode). Provide **keyboard reordering** (move up/down buttons + arrow keys), not drag-only —
  drag is an enhancement, never the only path (WCAG 2.1.1).
- **SpaceHey-side (expression):** a **theme picker** (Rose Obsidian / Ashen Orchid / future presets) and
  an optional **"accent" color** the user can nudge. Keep an allowlisted, sanitized surface — no raw
  user CSS injection (that's an XSS hole); offer curated knobs instead.
- Implement with CSS Grid + container queries so blocks reflow responsively; `:has()` for
  selection states. Persist a small JSON layout descriptor, render from it.

## 5. New daily-life modules (the blocks)

Each is a block in §4 and, in personal mode, an RLS-owner-only table. Demo mode seeds fictional data.

| # | Block | What it does | Data |
|---|---|---|---|
| D1 | Daily schedule | Hourly time-blocks for today (ref boards have this) | `schedule_blocks` (date, start, end, label) |
| D2 | Calendar + events | Month view, events, ties to task due dates | `events` (date, title, notes) |
| D3 | Reading list | Books: to-read / reading / done, progress | `reading_items` |
| D4 | Watch list | Films/shows queue + status | `watch_items` |
| D5 | Journal | One dated entry per day (extends Today reflection) | `journal_entries` |
| D6 | Routines | Morning/evening checklists, time-of-day grouped | `routines` + `routine_checks` |
| D7 | Mood tracker | Daily mood + note; tiny trend strip | `mood_entries` |
| D8 | Quick links | Bookmarks hub (ref boards have this) | `links` |
| D9 | Quote of the day | Rotating gothic/literary quote (static set, no API) | static JSON |
| D10 | Goals | Weekly + monthly goals with checkboxes | `goals` |

All free-tier, client- or Supabase-backed, no paid APIs. Music/now-playing stays a simple embedded
playlist link (no paid streaming API) unless explicitly approved.

## 6. Guardrails (build in from first commit)

- `prefers-reduced-motion: reduce` → **all** cursor/bat/bloom motion off; static fallback.
- `@media (pointer: fine)` gates cursor effects; touch = static.
- 60fps: `transform`/`opacity`/CSS-vars only; one shared rAF; canvas capped at `min(devicePixelRatio,2)`;
  effects pause when tab hidden (`visibilitychange`).
- **CSS-first:** prefer CSS custom properties, gradients, masks, `@property`, scroll-driven & view-transition
  APIs over JS. JS only where canvas/state truly needs it.
- WCAG AA contrast verified for the muted palette (see §1) — automated check before merge.
- No heavy npm packages without a bundle-size check logged in `tech-stack.md`. **WebGL fluid (Tier B) and
  any drag-and-drop lib require approval logged in `human-decisions.md`.**
- Keyboard parity everywhere (reorder, toggles, blocks); focus-visible rings untouched.
- Demo data never seeds real accounts; budget/journal/mood data never logged.

## 7. Documentation triage

| Document | Standard | Generation |
|---|---|---|
| Ashen Orchid theme tokens + contrast report | WCAG 1.4.3 | AUTO |
| Orchid-ink cursor (Tier A) architecture note | 60fps, WCAG 2.3.3 | AUTO |
| Daily-life data model + RLS migration | ISO 27001 | AUTO (RLS owner-only, mirrors existing) |
| QA log + document index + test cases | ISO 9001 | AUTO |
| Flexible-layout / block-system spec | — | REVIEW — Rory approves before build |
| Theme-picker / custom-accent scope | — | REVIEW |
| WebGL fluid cursor (Tier B) — perf/battery trade-off | Free Tools Rule | **HUMAN — Rory decides + logs** |

---

## 8. The paste-ready prompt

```
Phase 23F — Ashen Orchid: fluid cursor, motifs, flexible layout, daily-life blocks

CONTEXT:
LifeOS Portfolio Dashboard — React + Vite + TypeScript + Tailwind + Supabase (free tier).
Existing Rose Obsidian theme (ro.* tokens). Demo mode = no Supabase env; Personal mode = login + RLS.
Branch feat/*; PR; reviewer ≠ author; docs versioned; never push to main.

DIRECTION: muted black-metal-zine / dark-academia. Keep the gothic soul, drop the neon. CSS-first
(custom properties, gradients, masks, :has(), container queries, scroll-driven anim) — minimal JS.

1. THEME PRESET "Ashen Orchid" (ship alongside Rose Obsidian; user picks in Settings):
   --ao-void #0A0A0A, --ao-bark #33312F, --ao-charcoal #726E68, --ao-ash #B7B4AE (primary text),
   --ao-oxblood #371E1E, --ao-orchid #B084A8 (accent), --ao-orchid-bright #CDA6C6.
   Verify WCAG 1.4.3 contrast (Ash-on-void ~9:1 ok; orchid-on-void ~5.6:1 ok; NEVER charcoal text on
   bark for important text). Add an automated contrast check before merge.

2. MOTIFS (CSS/SVG, aria-hidden, reduced-motion safe):
   orchid-sprig section dividers + a faint corner orchid; bat parallax colony recolored to this palette;
   optional hairline cross / spiderweb / blackletter display-font for big headings only (readability wins).

3. CURSOR = BAT FLOCK over a FLUID orchid-ink trail (replaces the native cursor on fine pointers,
   cursor:none). Lead bat eases to pointer (lerp ~0.16); 6-7 followers chain with a fixed gap (tail),
   size/opacity tapering; each banks to its velocity vector (atan2, above a speed threshold); wings flap
   via independent CSS scaleX keyframe on an inner element. rAF runs continuously so the flock glides and
   settles when the mouse stops. Fluid trail: lead emits ink interpolated along its path (continuous
   ribbons, not dots), particles inherit a fraction of lead velocity + curl (vx+=sin(y*k+t)*amt), drawn
   additive (globalCompositeOperation 'lighter') as orchid/oxblood radial gradients that grow+fade; a
   translucent --ao-void fill per frame = wet smear. One canvas, ~240 particles cap, dpr<=2, 60fps, zero
   React re-renders. REQUIRED fallback: reduced-motion OR coarse pointer -> restore native cursor, kill
   canvas, park/drop bats. Optional Tier B (full WebGL Dobryakov/reactbits sim behind the flock) is
   planning-gated + HUMAN decision: vendor MIT with attribution, lazy-load, off by default, logged in
   human-decisions. Everything behind the "Motion effects" toggle.

4. FLEXIBLE LAYOUT (SpaceHey × Notion): dashboard = board of blocks. Reorder / resize (1–3 cols) /
   show-hide per user; persist layout (localStorage demo, user_layouts table personal). KEYBOARD reorder
   (buttons + arrows), drag is enhancement only. Theme picker + curated accent knob (NO raw user CSS —
   sanitized/allowlisted knobs only). CSS Grid + container queries.

5. DAILY-LIFE BLOCKS (each a block + RLS-owner table; demo seeds fictional data):
   D1 daily hourly schedule, D2 calendar+events, D3 reading list, D4 watch list, D5 journal (extends
   Today reflection), D6 routines (morning/evening checklists), D7 mood tracker + trend strip,
   D8 quick-links hub, D9 quote of the day (static set), D10 weekly/monthly goals. No paid APIs.

GUARDRAILS: prefers-reduced-motion disables ALL motion; @media (pointer:fine) gates cursor; 60fps
(transform/opacity/CSS-vars, one rAF, dpr<=2, pause on tab hidden); keyboard parity; WCAG AA contrast
verified; no heavy deps without bundle-size log; WebGL fluid + any DnD lib need human-decisions approval;
sensitive data never logged.

BUILD ORDER (separate PRs): (a) Ashen Orchid theme preset + theme picker + contrast check →
(b) phalaenopsis orchid motifs + bat-flock cursor over fluid ink trail → (c) block layout system
(reorder/resize/hide, keyboard-first) → (d) daily-life blocks D1–D10 in small batches. Each PR:
typecheck, lint, full Playwright + new tests (incl. a reduced-motion test asserting cursor effects
inert and native cursor restored), independent review, QA log + document index versioned. Start with
(a). Answer open questions yourself reasonably.
```

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.2.0 | 2026-06-12 | Cursor pivots to bat-flock-as-cursor over a fluid orchid-ink trail (replaces the circle-bloom approach; native cursor hidden on fine pointers, restored under reduced-motion/coarse). Orchid upgraded to a dimensional bilateral phalaenopsis with labellum + gradient. Build step (b) renamed. Validated against an interactive prototype. |
| v0.1.0 | 2026-06-12 | Initial Ashen Orchid meta prompt — muted palette preset, orchid/bat motifs, two-tier fluid splash cursor, SpaceHey×Notion flexible block layout, daily-life modules D1–D10. Extends fluid-design-meta-prompt v0.1.0. |
