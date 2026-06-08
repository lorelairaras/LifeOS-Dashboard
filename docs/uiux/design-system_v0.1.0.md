# Design System — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft — to be refined during Phase 1

---

## Overview

LifeOS uses a minimal design system built on Tailwind CSS. All design tokens are defined in `tailwind.config.ts`. No values are hardcoded in component files. This document defines the design language and component standards.

---

## Colour Palette

Defined in `tailwind.config.ts` under `theme.extend.colors`.

| Token | Hex | Usage |
|---|---|---|
| `primary-900` | `#0f172a` | Page background (dark) |
| `primary-800` | `#1e293b` | Card background (dark) |
| `primary-700` | `#334155` | Border, subtle dividers |
| `primary-500` | `#64748b` | Secondary text, placeholders |
| `primary-100` | `#f1f5f9` | Background (light mode) |
| `accent` | `#6366f1` | Primary interactive colour (indigo) |
| `accent-hover` | `#4f46e5` | Hover state for primary |
| `success` | `#22c55e` | Success states, "Done" status |
| `warning` | `#f59e0b` | Overdue dates, "Blocked" status |
| `danger` | `#ef4444` | Destructive actions, errors |
| `text-primary` | `#f8fafc` | Main text (dark background) |
| `text-secondary` | `#94a3b8` | Supporting text (dark background) |

Note: Dark mode is the primary design. Light mode is post-MVP.

---

## Typography

```
font-family: 'Inter', system-ui, sans-serif
```

| Level | Tailwind class | Usage |
|---|---|---|
| Display | `text-4xl font-bold` | Hero section name |
| H1 | `text-3xl font-semibold` | Page titles |
| H2 | `text-2xl font-semibold` | Section titles |
| H3 | `text-xl font-semibold` | Card titles |
| Body | `text-base` | Default paragraph text |
| Small | `text-sm` | Labels, metadata, captions |
| Micro | `text-xs` | Tags, timestamps |

---

## Spacing

Tailwind's default spacing scale is used. Standard spacing values:
- `p-4` (16px) — card padding
- `p-6` (24px) — section padding
- `gap-4` (16px) — grid/flex gap between cards
- `gap-6` (24px) — section-level spacing
- `py-16` (64px) — section vertical padding on desktop

---

## Border Radius

| Token | Tailwind | Usage |
|---|---|---|
| Small | `rounded` | Tags, badges |
| Medium | `rounded-lg` | Cards, inputs |
| Large | `rounded-xl` | Modals, large panels |
| Full | `rounded-full` | Avatars, pill tags |

---

## Shadows

| Usage | Tailwind class |
|---|---|
| Card | `shadow-md` |
| Modal | `shadow-2xl` |
| Dropdown | `shadow-lg` |

---

## Shared Components

All shared components live in `src/components/`. They accept only generic props and must not import from feature folders.

### Button

Props: `variant` ('primary' | 'secondary' | 'danger' | 'ghost'), `size` ('sm' | 'md' | 'lg'), `disabled`, `loading`, `onClick`, `type`, `children`

Styles:
- Primary: `bg-accent text-white hover:bg-accent-hover`
- Secondary: `bg-primary-700 text-text-primary hover:bg-primary-500`
- Danger: `bg-danger text-white hover:bg-red-700`
- Ghost: `bg-transparent text-text-secondary hover:text-text-primary`

Minimum height: `h-10` (40px) for accessibility.

### Card

Props: `children`, `className` (optional override)

Base style: `bg-primary-800 rounded-xl p-6 shadow-md`

### Badge

Props: `label`, `variant` ('default' | 'success' | 'warning' | 'danger' | 'info')

Used for status labels on tasks, jobs.

### Input

Props: `label`, `name`, `type`, `value`, `onChange`, `placeholder`, `error`, `required`

Wraps a label and input element. Displays validation error below the input.

### Textarea

Same props pattern as Input, renders `<textarea>` with auto-resize.

### Select

Props: `label`, `name`, `value`, `onChange`, `options` (array of `{value, label}`), `error`

### Modal

Props: `isOpen`, `onClose`, `title`, `children`

Behaviour:
- Renders in a portal (`document.body`)
- Backdrop click closes modal
- `Escape` key closes modal
- Focus trapped inside modal when open
- Focus returns to trigger element on close

### EmptyState

Props: `title`, `description`, `action` (optional: `{label, onClick}`)

### LoadingState

Props: `message` (optional)

Displays a spinner and optional loading text.

### ErrorState

Props: `message`, `onRetry` (optional)

### StatCard

Props: `label`, `value`, `icon` (optional), `trend` (optional: `{direction, value}`)

Used on dashboard home for summary metrics.

### PageHeader

Props: `title`, `description` (optional), `action` (optional: `{label, onClick}`)

---

## Status Badge Colour Map

| Status | Colour |
|---|---|
| To Do | `text-text-secondary bg-primary-700` |
| In Progress | `text-blue-300 bg-blue-900` |
| Done | `text-green-300 bg-green-900` |
| Blocked | `text-warning bg-yellow-900` |
| Applied | `text-blue-300 bg-blue-900` |
| Interviewing | `text-purple-300 bg-purple-900` |
| Offer | `text-success bg-green-900` |
| Rejected | `text-danger bg-red-900` |
| Withdrawn | `text-text-secondary bg-primary-700` |

---

## Icons

Library: `lucide-react` (free, MIT, tree-shakeable)

Common icons used:
- `PlusCircle` — create action
- `Pencil` — edit action
- `Trash2` — delete action
- `Copy` — copy to clipboard
- `CheckCircle` — success state
- `AlertCircle` — warning/error
- `ExternalLink` — external URL indicator
- `Menu` — mobile hamburger
- `X` — close/dismiss

---

## Animation

Minimal animation. Tailwind's `transition` utilities only.
- Button hover: `transition-colors duration-150`
- Modal: `transition-opacity duration-200`
- Sidebar: `transition-transform duration-200` (mobile)

No third-party animation libraries in MVP.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial design system created |
