# 3D Portfolio Feature Plan — LifeOS Portfolio Dashboard

**Version:** v0.1.0
**Date:** 2026-06-08
**Author:** Rory
**Status:** Planning (Phase 18)

---

## Overview

Add interactive 3D elements to the public portfolio page to create a memorable, visually distinctive experience. The 3D layer enhances the existing portfolio without replacing it — all content remains accessible without 3D.

---

## Planned 3D Features

### 3D-FP-001: Interactive Hero Scene

**Description:** A subtle 3D background scene in the hero section. Responds to mouse movement with parallax/tilt effect. Renders simple geometric shapes (spheres, torus, floating cubes) with a dark theme color palette.

**Fallback:** Static gradient background (current hero) when WebGL is unavailable or on low-power devices.

**Priority:** High — first visual impression

---

### 3D-FP-002: Skill Constellation

**Description:** Skills displayed as an interactive 3D node graph / constellation. Each skill is a floating node, connected by lines to related skills. User can rotate and explore the constellation.

**Fallback:** Current flat skill tags grid.

**Priority:** Medium — visually impressive but complex

---

### 3D-FP-003: Project Cards with 3D Hover

**Description:** Project cards that tilt/rotate slightly on hover with a 3D perspective transform. Uses CSS transforms, not WebGL — lightweight and widely supported.

**Fallback:** Standard card hover (current behavior).

**Priority:** High — low implementation cost, high visual impact

---

### 3D-FP-004: Animated Page Transitions

**Description:** Smooth 3D transitions between portfolio sections when navigating via anchor links (e.g., camera-like movement between About, Skills, Projects, Contact).

**Fallback:** Standard smooth scroll (current behavior).

**Priority:** Low — high complexity for marginal UX benefit

---

## MVP 3D Feature (Phase 19)

Start with **3D-FP-003: Project Cards with 3D Hover** — it is:
- CSS-only (no WebGL dependency)
- Works on all browsers and devices
- Low risk — degrades gracefully
- Quick to implement

Then add **3D-FP-001: Interactive Hero Scene** if time allows.

---

## Technology Selection

### Primary: React Three Fiber (R3F)

| Library | Purpose | Free? | Bundle Impact |
|---|---|---|---|
| `@react-three/fiber` | React renderer for Three.js | Yes (MIT) | ~150KB gzipped |
| `@react-three/drei` | Useful helpers (OrbitControls, etc.) | Yes (MIT) | Tree-shakeable |
| `three` | Core 3D engine | Yes (MIT) | Peer dependency |

### Alternative: CSS-only 3D

For 3D-FP-003 (card hover), no libraries needed — pure CSS `perspective` and `transform: rotateX/Y`.

### Decision Required

The user must decide:
1. **CSS-only 3D** (card hover only) — zero bundle increase, works everywhere
2. **R3F for hero + CSS for cards** — ~150KB added, requires WebGL
3. **Full R3F** (hero + skills + transitions) — larger bundle, more impressive

Document decision in `docs/decisions/human-decisions.md`.

---

## Performance Considerations

| Concern | Mitigation |
|---|---|
| Large bundle size (Three.js) | Lazy-load 3D components with `React.lazy()` and `Suspense` |
| Mobile performance | Detect low-power devices with `navigator.hardwareConcurrency` and GPU blacklist; disable 3D on <4 cores |
| Battery drain | Use `requestAnimationFrame` with `setAnimationLoop`; pause when tab not visible |
| Accessibility | All 3D content is decorative; real content in semantic HTML underneath. `prefers-reduced-motion` disables animations. |
| SEO | 3D is rendered client-side via `<canvas>`. All text content remains in DOM for crawlers. |

---

## Accessibility Requirements

| ID | Requirement | Priority |
|---|---|---|
| 3D-A11Y-001 | All 3D elements are decorative — no information is conveyed exclusively through 3D | Must |
| 3D-A11Y-002 | `prefers-reduced-motion: reduce` disables all 3D animations | Must |
| 3D-A11Y-003 | Canvas elements have `aria-hidden="true"` and are not focusable | Must |
| 3D-A11Y-004 | All content remains readable without JavaScript/WebGL | Must |
| 3D-A11Y-005 | 3D scenes don't cause seizures (no rapid flashing, no high-contrast strobing) | Must |

---

## Free Tier Verification

| Tool/Service | Free Tier | Sufficient? | Notes |
|---|---|---|---|
| Three.js | MIT license, free | Yes | No API calls |
| React Three Fiber | MIT license, free | Yes | No API calls |
| @react-three/drei | MIT license, free | Yes | Tree-shakeable |

All 3D tools are fully free and open source. No paid services required.

---

## Documents to Generate Automatically vs. Requiring Human Approval

| Document | Auto-generate? | Standard Reference |
|---|---|---|
| 3D architecture docs | Yes | ISO 9001 8.5.1 |
| Performance budget | Yes (draft), needs human review | ISO 27001 A.12.1.3 |
| Accessibility impact | Yes | WCAG 2.1 AA |
| Technology selection (R3F vs CSS) | No — requires human decision | ISO 9001 7.1.2 |
| Test cases | Yes | ISO 9001 8.5.1 |

---

## Standards-Readiness Notes

- **ISO 27001 A.12.1.3 (Capacity management):** Bundle size impact documented. Lazy loading planned.
- **ISO 9001 8.2.2:** All 3D features have unique IDs and requirements documented.
- **WCAG 2.1 AA:** Accessibility requirements defined for all 3D features.
- **SOC 2 (Availability):** Fallback behavior documented for WebGL failures.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-08 | Initial 3D feature plan — 4 features, MVP selected, tech stack evaluated |
