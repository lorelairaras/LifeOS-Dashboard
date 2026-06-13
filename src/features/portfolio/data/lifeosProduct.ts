import {
  ListChecks,
  Sparkles,
  Briefcase,
  Wallet,
  FolderKanban,
  Flame,
  BookOpen,
  Gauge,
  ShieldCheck,
  Repeat,
} from 'lucide-react'
import type { ProductModule, ProductBenefit } from '@/types'

// ============================================================
// LifeOS — product narrative for the public landing page.
// Subject of the page is the PRODUCT (what it does, how it helps),
// not a personal résumé. Edit copy here, never in the JSX layout.
// ============================================================

/** One-line value proposition shown in the hero. */
export const valueProposition =
  'One calm command centre for the scattered parts of a working life — tasks, prompts, job hunt, budget, projects, habits, and notes, in a single app you actually want to open.'

/** Short "what it is" line for the hero eyebrow / meta. */
export const productTagline = 'A personal operating system for getting things done.'

/** The seven modules, described in product language for the "What it does" tour. */
export const modules: ProductModule[] = [
  {
    id: 'tasks',
    name: 'Ritual Tasks',
    summary: 'Capture, prioritise, and clear daily work without drowning in a backlog.',
    route: 'tasks',
    icon: ListChecks,
  },
  {
    id: 'prompts',
    name: 'Prompt Grimoire',
    summary: 'Save and reuse your best AI prompts so good work is repeatable, not re-typed.',
    route: 'prompts',
    icon: Sparkles,
  },
  {
    id: 'jobs',
    name: 'Career Pipeline',
    summary: 'Track every application from saved to offer, with follow-up dates that nudge you.',
    route: 'jobs',
    icon: Briefcase,
  },
  {
    id: 'budget',
    name: 'Budget Pulse',
    summary: 'See income and spending at a glance, so money decisions stop being guesses.',
    route: 'budget',
    icon: Wallet,
  },
  {
    id: 'projects',
    name: 'Project Reliquary',
    summary: 'Keep side projects alive with problem, stack, lessons, and next steps in one place.',
    route: 'projects',
    icon: FolderKanban,
  },
  {
    id: 'habits',
    name: 'Habit Rituals',
    summary: 'Build streaks with a check-a-day grid that makes consistency visible.',
    route: 'habits',
    icon: Flame,
  },
  {
    id: 'vault',
    name: 'Knowledge Vault',
    summary: 'A searchable, tagged home for the notes and snippets you keep losing.',
    route: 'vault',
    icon: BookOpen,
  },
]

/** Feature-to-outcome mapping for the "How it helps" block. */
export const benefits: ProductBenefit[] = [
  {
    id: 'one-place',
    outcome: 'Everything in one place',
    detail:
      'Stop tab-hopping between a to-do app, a notes app, a spreadsheet, and a job tracker. LifeOS unifies seven tools behind one interface and one mental model.',
    icon: Gauge,
  },
  {
    id: 'low-friction',
    outcome: 'Built to be opened daily',
    detail:
      'A fast, keyboard-friendly command palette and a calm dark theme mean the system earns daily use instead of going stale like most dashboards.',
    icon: Repeat,
  },
  {
    id: 'private-by-default',
    outcome: 'Yours, and private',
    detail:
      'The public page is a showcase; your real data lives behind login. The demo you can try uses a fictional persona — no real personal information is exposed.',
    icon: ShieldCheck,
  },
]
