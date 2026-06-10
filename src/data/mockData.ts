// ============================================================
// Demo data — used when Supabase is not configured.
// All data attributed to fictional persona "Lyra M." so it is
// clearly distinct from any real user's private information.
// ============================================================

import type {
  Task,
  Prompt,
  JobApplication,
  BudgetEntry,
  Project,
  Habit,
  HabitCheck,
  Note,
} from '@/types'

const now = new Date().toISOString()
// Local calendar date (NOT UTC) — must match the habit page's date keys,
// which also use local dates. toISOString() would shift the day for
// users ahead of UTC.
const d = (daysAgo: number) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

// ── Tasks ────────────────────────────────────────────────────
export const DEMO_TASKS: Task[] = [
  {
    id: 'demo-task-1',
    title: 'Finish portfolio case study write-up',
    description: 'Document the LifeOS build from idea to deployment.',
    status: 'in_progress',
    priority: 'high',
    category: 'project',
    dueDate: d(0),
    createdAt: d(3),
    updatedAt: now,
  },
  {
    id: 'demo-task-2',
    title: 'Review and update CV for senior roles',
    status: 'todo',
    priority: 'high',
    category: 'career',
    dueDate: d(1),
    createdAt: d(5),
    updatedAt: now,
  },
  {
    id: 'demo-task-3',
    title: 'Refactor Budget Pulse filters',
    status: 'todo',
    priority: 'medium',
    category: 'work',
    dueDate: d(0),
    createdAt: d(2),
    updatedAt: now,
  },
  {
    id: 'demo-task-4',
    title: 'Write three new frontend prompts',
    status: 'done',
    priority: 'medium',
    category: 'project',
    dueDate: d(2),
    createdAt: d(7),
    updatedAt: d(2),
  },
  {
    id: 'demo-task-5',
    title: 'Follow up with Prism Studio application',
    status: 'done',
    priority: 'urgent',
    category: 'career',
    dueDate: d(3),
    createdAt: d(8),
    updatedAt: d(3),
  },
  {
    id: 'demo-task-6',
    title: 'Set up Playwright tests for new routes',
    status: 'todo',
    priority: 'medium',
    category: 'project',
    createdAt: d(1),
    updatedAt: now,
  },
  {
    id: 'demo-task-7',
    title: 'Log this month\'s subscriptions in Budget Pulse',
    status: 'done',
    priority: 'low',
    category: 'personal',
    dueDate: d(5),
    createdAt: d(10),
    updatedAt: d(5),
  },
  {
    id: 'demo-task-8',
    title: 'Draft weekly review notes',
    status: 'in_progress',
    priority: 'low',
    category: 'personal',
    createdAt: d(1),
    updatedAt: now,
  },
]

// ── Prompts ───────────────────────────────────────────────────
export const DEMO_PROMPTS: Prompt[] = [
  {
    id: 'demo-prompt-1',
    title: 'React component code review',
    body: 'Review the following React component for correctness, accessibility, and performance. Flag any issues with prop types, missing keys, or memory leaks. Suggest improvements with brief explanations.\n\n[PASTE COMPONENT HERE]',
    category: 'frontend_development',
    useCase: 'Code review before PR',
    tags: ['react', 'code-review', 'accessibility'],
    lastUsedAt: d(1),
    createdAt: d(14),
    updatedAt: d(1),
  },
  {
    id: 'demo-prompt-2',
    title: 'Cover letter — senior product role',
    body: 'Write a concise, confident cover letter for a Senior Product Manager role at [COMPANY]. I am applying from a background in business analysis and frontend development. Highlight: systems thinking, cross-functional communication, and shipping products from zero to one. Keep it under 250 words. Tone: direct, not flowery.',
    category: 'resume_cover_letter',
    useCase: 'Job applications',
    tags: ['cover-letter', 'product', 'career'],
    lastUsedAt: d(3),
    createdAt: d(20),
    updatedAt: d(3),
  },
  {
    id: 'demo-prompt-3',
    title: 'Playwright test scaffold',
    body: 'Generate a Playwright test for the following user flow:\n[DESCRIBE FLOW]\n\nUse the @playwright/test package. Include: navigation, form interaction, assertion on visible text, and a screenshot on failure. Follow the AAA pattern (Arrange, Act, Assert).',
    category: 'qa_testing',
    useCase: 'E2E test generation',
    tags: ['playwright', 'testing', 'automation'],
    lastUsedAt: d(7),
    createdAt: d(30),
    updatedAt: d(7),
  },
  {
    id: 'demo-prompt-4',
    title: 'Weekly planning — daily prioritisation',
    body: 'I have the following tasks for the week:\n[PASTE TASK LIST]\n\nGroup them by day (Mon–Fri) based on energy level and dependencies. Assume mornings are for deep work, afternoons for meetings and admin. Return a simple day-by-day plan with 3 tasks per day maximum.',
    category: 'daily_planning',
    useCase: 'Weekly planning ritual',
    tags: ['planning', 'productivity', 'daily-ritual'],
    lastUsedAt: d(2),
    createdAt: d(12),
    updatedAt: d(2),
  },
  {
    id: 'demo-prompt-5',
    title: 'Requirements gap analysis',
    body: 'Review the following requirements document and identify:\n1. Ambiguous or missing acceptance criteria\n2. Unstated assumptions\n3. Dependencies not captured\n4. Edge cases not covered\n\nFormat as a numbered list with a severity rating (High / Medium / Low) for each gap.\n\n[PASTE REQUIREMENTS HERE]',
    category: 'business_analysis',
    useCase: 'Requirements review',
    tags: ['requirements', 'BA', 'analysis'],
    lastUsedAt: d(5),
    createdAt: d(18),
    updatedAt: d(5),
  },
  {
    id: 'demo-prompt-6',
    title: 'Technical documentation — feature spec',
    body: 'Write a technical specification for the following feature:\n[FEATURE DESCRIPTION]\n\nInclude sections: Overview, Goals, Non-Goals, Technical Approach, API Changes, Data Model Changes, Testing Plan. Keep each section to a short paragraph. Audience: mid-level engineers.',
    category: 'documentation',
    useCase: 'Feature documentation',
    tags: ['docs', 'spec', 'technical-writing'],
    lastUsedAt: d(9),
    createdAt: d(25),
    updatedAt: d(9),
  },
]

// ── Job Applications ──────────────────────────────────────────
export const DEMO_JOBS: JobApplication[] = [
  {
    id: 'demo-job-1',
    company: 'Prism Studio',
    role: 'Senior Product Manager',
    location: 'Remote',
    jobType: 'remote',
    status: 'interviewing',
    jobUrl: '#',
    notes: 'Second round scheduled. Prepare case study walkthrough.',
    dateApplied: d(14),
    followUpDate: d(-3),
    createdAt: d(14),
    updatedAt: d(3),
  },
  {
    id: 'demo-job-2',
    company: 'Obsidian Labs',
    role: 'Frontend Engineer',
    location: 'Hybrid — Singapore',
    jobType: 'hybrid',
    status: 'applied',
    jobUrl: '#',
    notes: 'Applied through LinkedIn. Referral from Mika.',
    dateApplied: d(7),
    followUpDate: d(-5),
    createdAt: d(7),
    updatedAt: d(7),
  },
  {
    id: 'demo-job-3',
    company: 'Veilworks',
    role: 'Business Analyst',
    location: 'On-site — KL',
    jobType: 'on_site',
    status: 'phone_screen',
    notes: 'Phone screen this Thursday at 3pm.',
    dateApplied: d(10),
    followUpDate: d(-1),
    createdAt: d(10),
    updatedAt: d(2),
  },
  {
    id: 'demo-job-4',
    company: 'Arclight Digital',
    role: 'Product Designer',
    location: 'Remote',
    jobType: 'remote',
    status: 'saved',
    notes: 'Revisit after portfolio update.',
    createdAt: d(3),
    updatedAt: d(3),
  },
  {
    id: 'demo-job-5',
    company: 'Null Island Co.',
    role: 'Technical Product Manager',
    location: 'Remote',
    jobType: 'remote',
    status: 'rejected',
    notes: 'Rejected after assessment stage. Feedback: wanted more data analytics background.',
    dateApplied: d(21),
    createdAt: d(21),
    updatedAt: d(8),
  },
]

// ── Budget Entries ────────────────────────────────────────────
export const DEMO_BUDGET: BudgetEntry[] = [
  { id: 'demo-b-1',  title: 'Monthly salary',      amount: 4800, type: 'income',  category: 'Income',        date: d(28), notes: '', createdAt: d(28) },
  { id: 'demo-b-2',  title: 'Freelance — BA audit', amount: 900,  type: 'income',  category: 'Freelance',     date: d(20), notes: 'Invoice #009', createdAt: d(20) },
  { id: 'demo-b-3',  title: 'Rent',                amount: 1350, type: 'expense', category: 'Housing',       date: d(28), notes: '', createdAt: d(28) },
  { id: 'demo-b-4',  title: 'Groceries — week 1',  amount: 87,   type: 'expense', category: 'Food',          date: d(26), notes: '', createdAt: d(26) },
  { id: 'demo-b-5',  title: 'Groceries — week 2',  amount: 94,   type: 'expense', category: 'Food',          date: d(19), notes: '', createdAt: d(19) },
  { id: 'demo-b-6',  title: 'Transport pass',       amount: 55,   type: 'expense', category: 'Transport',    date: d(25), notes: '', createdAt: d(25) },
  { id: 'demo-b-7',  title: 'Figma Pro',            amount: 15,   type: 'expense', category: 'Utilities',     date: d(22), notes: 'Monthly subscription', createdAt: d(22) },
  { id: 'demo-b-8',  title: 'GitHub Copilot',       amount: 10,   type: 'expense', category: 'Utilities',     date: d(22), notes: 'Monthly subscription', createdAt: d(22) },
  { id: 'demo-b-9',  title: 'Coffee & co-working',  amount: 42,   type: 'expense', category: 'Entertainment', date: d(18), notes: '', createdAt: d(18) },
  { id: 'demo-b-10', title: 'Health insurance',      amount: 120,  type: 'expense', category: 'Health',        date: d(28), notes: '', createdAt: d(28) },
  { id: 'demo-b-11', title: 'Online course — React', amount: 35,   type: 'expense', category: 'Education',     date: d(15), notes: 'Udemy sale price', createdAt: d(15) },
  { id: 'demo-b-12', title: 'Dinner — team outing',  amount: 68,   type: 'expense', category: 'Food',          date: d(12), notes: '', createdAt: d(12) },
]

// ── Projects ──────────────────────────────────────────────────
export const DEMO_PROJECTS: Project[] = [
  {
    id: 'demo-proj-1',
    name: 'LifeOS Dashboard',
    status: 'in_progress',
    visibility: 'public',
    problemSolved: 'Needed a unified command center for tasks, prompts, career, and finances — nothing existed that matched how I think.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vite'],
    keyFeatures: 'Task tracker, Prompt Grimoire, Career Pipeline, Budget Pulse, Project Reliquary, Rose Obsidian design system',
    lessonsLearned: 'Design system tokens first saves hours of rework later. Naming things well is product work.',
    createdAt: d(90),
    updatedAt: d(0),
  },
  {
    id: 'demo-proj-2',
    name: 'Prompt Optimiser CLI',
    status: 'complete',
    visibility: 'public',
    problemSolved: 'Improving prompts manually is slow. Wanted a CLI tool to refine and version prompts automatically.',
    techStack: ['Python', 'Click', 'OpenAI API'],
    keyFeatures: 'Prompt versioning, quality scoring, export to JSON or markdown',
    lessonsLearned: 'CLIs are underrated for developer tools. Fast to build, fast to use.',
    createdAt: d(60),
    updatedAt: d(20),
  },
  {
    id: 'demo-proj-3',
    name: 'Internal BA Toolkit',
    status: 'idea',
    visibility: 'private',
    problemSolved: 'Reusable templates and scripts for requirements gathering, gap analysis, and stakeholder mapping.',
    techStack: ['Notion', 'Python', 'Markdown'],
    keyFeatures: 'Requirements gap analysis, RACI matrix generator, meeting note templates',
    createdAt: d(14),
    updatedAt: d(14),
  },
]

// ── Habits ────────────────────────────────────────────────────
export const DEMO_HABITS: Habit[] = [
  { id: 'demo-habit-1', name: 'Morning pages',     emoji: '📓', createdAt: d(30), updatedAt: d(30) },
  { id: 'demo-habit-2', name: 'Exercise',          emoji: '🏃', createdAt: d(30), updatedAt: d(30) },
  { id: 'demo-habit-3', name: 'Read 20 minutes',   emoji: '📖', createdAt: d(21), updatedAt: d(21) },
  { id: 'demo-habit-4', name: 'No social media before noon', emoji: '🌙', createdAt: d(14), updatedAt: d(14) },
]

// Checks for the last 7 days — staggered so each habit shows a realistic streak
export const DEMO_HABIT_CHECKS: HabitCheck[] = [
  // Morning pages — 6/7 days
  ...[0, 1, 2, 3, 5, 6].map((days, i) => ({
    id: `demo-check-1-${i}`, habitId: 'demo-habit-1', date: d(days), createdAt: d(days),
  })),
  // Exercise — 4/7 days
  ...[0, 2, 4, 6].map((days, i) => ({
    id: `demo-check-2-${i}`, habitId: 'demo-habit-2', date: d(days), createdAt: d(days),
  })),
  // Read — 5/7 days
  ...[0, 1, 3, 4, 5].map((days, i) => ({
    id: `demo-check-3-${i}`, habitId: 'demo-habit-3', date: d(days), createdAt: d(days),
  })),
  // No social media — 3/7 days
  ...[1, 2, 5].map((days, i) => ({
    id: `demo-check-4-${i}`, habitId: 'demo-habit-4', date: d(days), createdAt: d(days),
  })),
]

// ── Notes ─────────────────────────────────────────────────────
export const DEMO_NOTES: Note[] = [
  {
    id: 'demo-note-1',
    title: 'Product thinking frameworks',
    content: 'Jobs-to-be-Done: people hire products to do a job. Opportunity Solution Trees: outcome → opportunities → solutions → experiments. North Star framework: one metric that matters, with input metrics underneath.',
    tags: ['product', 'frameworks'],
    createdAt: d(25),
    updatedAt: d(3),
  },
  {
    id: 'demo-note-2',
    title: 'React patterns I always forget',
    content: 'useCallback only matters when the function is a dependency or passed to memoized children. Key prop resets component state. Lazy initial state: useState(() => expensive()).',
    tags: ['frontend', 'react'],
    createdAt: d(20),
    updatedAt: d(8),
  },
  {
    id: 'demo-note-3',
    title: 'Interview prep — BA questions',
    content: 'How do you handle conflicting stakeholder requirements? Walk through a gap analysis you ran. How do you validate requirements before development starts?',
    tags: ['career', 'interviews'],
    createdAt: d(15),
    updatedAt: d(15),
  },
  {
    id: 'demo-note-4',
    title: 'Books to read this year',
    content: 'Continuous Discovery Habits — Teresa Torres. Shape Up — Ryan Singer. The Mom Test — Rob Fitzpatrick. Inspired — Marty Cagan.',
    tags: ['personal', 'reading'],
    createdAt: d(10),
    updatedAt: d(10),
  },
  {
    id: 'demo-note-5',
    title: 'System design notes',
    content: 'Start with requirements and scale estimates. Load balancer → app servers → cache → DB. Cache invalidation is the hard part. Prefer boring technology.',
    tags: ['technical', 'architecture'],
    createdAt: d(5),
    updatedAt: d(1),
  },
]
