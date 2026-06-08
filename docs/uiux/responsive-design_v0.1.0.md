# Responsive Design and Accessibility — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft

---

## Responsive Strategy

LifeOS is designed mobile-first. Tailwind CSS breakpoints are used:

| Prefix | Min-width | Device |
|---|---|---|
| (none) | 0px | Mobile base |
| `sm:` | 640px | Large mobile |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Small desktop |
| `xl:` | 1280px | Desktop |

All components are built mobile-first. Desktop overrides use `md:` or `lg:` prefixes.

---

## Layout Behaviour by Breakpoint

### Public Portfolio

| Section | Mobile | Tablet (md) | Desktop (xl) |
|---|---|---|---|
| Navigation | Hamburger menu, full-screen drawer | Inline nav links | Sticky inline nav |
| Hero | Single column, centered | Single column | Single column with more padding |
| Skills | Single column, wrapping tags | Two columns | Three columns |
| Projects | Single column | Two-column grid | Two or three-column grid |
| Contact | Single column | Single column | Centered, max-width container |

### Dashboard

| Element | Mobile | Tablet (md) | Desktop (xl) |
|---|---|---|---|
| Navigation | Bottom bar or top drawer | Collapsible sidebar | Fixed left sidebar (240px wide) |
| Stat cards | Stacked 2x2 | 2x2 or 4x1 grid | 4x1 grid |
| Task list | Single column | Single column | Single column with wider cells |
| Prompt grid | Single column | Two columns | Two or three columns |

---

## Required Viewport Tests

Every page must be tested at these viewports before a phase is considered complete:

| Viewport | Width | Test method |
|---|---|---|
| Mobile S | 320px | Browser devtools |
| Mobile M | 390px | Browser devtools (iPhone 14 proxy) |
| Tablet | 768px | Browser devtools |
| Desktop | 1280px | Standard browser window |

Pass criteria:
- No horizontal scrollbar at any viewport
- All text readable (not clipped or overflowing)
- All buttons tappable (minimum 44x44px touch target)
- No content obscured by navigation overlays
- Images do not overflow containers

---

## Accessibility Requirements

LifeOS targets **WCAG 2.1 Level AA** compliance.

### Colour Contrast

| Type | Minimum ratio | Tool to check |
|---|---|---|
| Normal text (< 18px) | 4.5:1 | WebAIM Contrast Checker |
| Large text (≥ 18px or ≥ 14px bold) | 3:1 | WebAIM Contrast Checker |
| UI components and graphical objects | 3:1 | WebAIM Contrast Checker |

The accent colour (`#6366f1`) must be tested against all backgrounds it appears on.

### Keyboard Navigation

All primary flows must be completable with keyboard only:

- Tab order must follow visual reading order
- All interactive elements (buttons, links, inputs) must be reachable via Tab
- No keyboard traps outside of modals
- Modals trap focus internally and release on close

Focus indicator: Tailwind's `focus-visible:ring-2 focus-visible:ring-accent` applied globally to all interactive elements.

### Semantic HTML

- Page headings use `<h1>` through `<h4>` in logical order — no skipping levels
- Navigation uses `<nav>` with an `aria-label`
- Sections use `<section>` with `aria-labelledby` pointing to the section heading
- Lists use `<ul>` / `<ol>` — no `<div>` lists
- Buttons use `<button>` — no clickable `<div>` elements
- Form inputs have associated `<label>` elements (either `htmlFor` or wrapped)

### ARIA

- Icon-only buttons must have `aria-label`
- Modal dialogs use `role="dialog"` and `aria-modal="true"` and `aria-labelledby`
- Loading states use `aria-live="polite"` or `aria-busy="true"`
- Status messages (e.g. "Copied!") use `aria-live="polite"`
- Error messages use `aria-describedby` to associate with the input

### Images and Media

- Decorative images use `alt=""`
- Informational images have descriptive `alt` text
- No critical information is conveyed by colour alone (add text/icon as well)

---

## Pre-Launch Accessibility Checklist

Before deploying each phase, confirm:

- [ ] All interactive elements reachable by Tab
- [ ] Visible focus indicator on all focusable elements
- [ ] All form inputs have labels
- [ ] All icon-only buttons have `aria-label`
- [ ] Colour contrast passes AA on all text elements
- [ ] No horizontal overflow at 320px
- [ ] All buttons and links meet 44px touch target size
- [ ] Page `<title>` is descriptive and unique per route
- [ ] Modal focus trap works correctly
- [ ] Keyboard escape dismisses modals

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial responsive design and accessibility document created |
