// ============================================================
// Shared TypeScript types for LifeOS Portfolio Dashboard
// Source of truth: docs/architecture/data-model_v0.2.0.md
// ============================================================

import type { LucideIcon } from 'lucide-react'

// --- Task Tracker ---

export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'blocked'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskCategory = 'general' | 'work' | 'project' | 'personal' | 'career'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  category: TaskCategory
  dueDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// --- Prompt Library ---

export type PromptCategory =
  | 'frontend_development'
  | 'qa_testing'
  | 'documentation'
  | 'business_analysis'
  | 'product_planning'
  | 'resume_cover_letter'
  | 'daily_planning'
  | 'other'

export interface Prompt {
  id: string
  title: string
  body: string
  category: PromptCategory
  useCase?: string
  tags: string[]
  lastUsedAt?: string
  createdAt: string
  updatedAt: string
}

// --- Job Application Tracker ---

export type ApplicationStatus =
  | 'saved'
  | 'applied'
  | 'phone_screen'
  | 'assessment'
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'closed'

export type JobType = 'remote' | 'hybrid' | 'on_site' | 'flexible'

export interface JobApplication {
  id: string
  company: string
  role: string
  location?: string
  jobType?: JobType
  status: ApplicationStatus
  jobUrl?: string
  notes?: string
  dateApplied?: string
  followUpDate?: string
  createdAt: string
  updatedAt: string
}

// --- Budget Tracker ---

export type EntryType = 'income' | 'expense'

export interface BudgetEntry {
  id: string
  title: string
  amount: number
  type: EntryType
  category: string
  date: string
  notes?: string
  createdAt: string
}

// --- Projects ---

export type ProjectStatus = 'idea' | 'in_progress' | 'complete' | 'archived'
export type ProjectVisibility = 'public' | 'private'

export interface Project {
  id: string
  name: string
  status: ProjectStatus
  visibility: ProjectVisibility
  problemSolved?: string
  techStack: string[]
  keyFeatures?: string
  githubUrl?: string
  liveDemoUrl?: string
  lessonsLearned?: string
  futureImprovements?: string
  createdAt: string
  updatedAt: string
}

// --- Habit Rituals ---

export interface Habit {
  id: string
  name: string
  emoji?: string
  createdAt: string
  updatedAt: string
}

export interface HabitCheck {
  id: string
  habitId: string
  date: string // YYYY-MM-DD
  createdAt: string
}

// --- Knowledge Vault ---

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

// --- Portfolio Static Data ---

export interface SkillTag {
  name: string
  category: string
}

export interface PortfolioProject {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveDemoUrl?: string
  featured?: boolean
}

export interface CaseStudy {
  id: string
  title: string
  summary: string
  problem: string
  solution: string
  techStack: string[]
  highlights: string[]
  githubUrl?: string
  liveDemoUrl?: string
  featured?: boolean
}

export interface ExperienceItem {
  role: string
  company: string
  startDate: string
  endDate: string | 'Present'
  bullets: string[]
}

// --- LifeOS Product Landing ---

/** A LifeOS module described on the public "What it does" tour. */
export interface ProductModule {
  id: string
  name: string
  /** One-line, outcome-focused summary in product language. */
  summary: string
  /** In-app route the module lives at (under /dashboard). */
  route: string
  icon: LucideIcon
}

/** A feature-to-outcome mapping shown in the "How it helps" block. */
export interface ProductBenefit {
  id: string
  /** Visitor-facing outcome headline. */
  outcome: string
  /** Short supporting explanation. */
  detail: string
  icon: LucideIcon
}

/** A service offered to clients, rendered from data (no hardcoded JSX copy). */
export interface Service {
  id: string
  title: string
  /** Single benefit line - what the client gets, not what the tool is. */
  benefit: string
  /** Three to four concrete capability points. */
  capabilities: string[]
  icon: LucideIcon
  /** Short tag/eyebrow (e.g. "Build", "Design", "AI", "Analysis"). */
  tag: string
  /** Honest scoping note shown where expectations must be set. Optional. */
  note?: string
  featured?: boolean
}
