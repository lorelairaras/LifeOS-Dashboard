# Data Model — LifeOS Portfolio Dashboard

**Version:** v0.2.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft — MVP uses local state; Supabase schema planned for Phase 7
**Supersedes:** data-model_v0.1.0.md

---

## Overview

In MVP (Phases 0–6), all data lives in React component state. The TypeScript types below define the application's data shapes. These types map directly to Supabase table schemas in Phase 7.

---

## TypeScript Types (MVP)

### Task

```typescript
type TaskStatus = 'todo' | 'in_progress' | 'done' | 'blocked';
type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
type TaskCategory = 'general' | 'work' | 'project' | 'personal' | 'career';

interface Task {
  id: string;               // crypto.randomUUID()
  title: string;            // Required
  description?: string;     // Optional — added v0.2.0
  status: TaskStatus;       // Default: 'todo'
  priority: TaskPriority;   // Default: 'medium'
  category: TaskCategory;   // Default: 'general' — added v0.2.0
  dueDate?: string;         // ISO 8601 date string
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Prompt

```typescript
type PromptCategory =
  | 'frontend_development'
  | 'qa_testing'
  | 'documentation'
  | 'business_analysis'
  | 'product_planning'
  | 'resume_cover_letter'
  | 'daily_planning'
  | 'other';

interface Prompt {
  id: string;
  title: string;              // Required
  body: string;               // Required — the actual prompt text
  category: PromptCategory;   // Default: 'other'
  useCase?: string;
  tags: string[];
  lastUsedAt?: string;        // ISO 8601 timestamp — updated on copy — added v0.2.0
  createdAt: string;
  updatedAt: string;
}
```

### JobApplication

```typescript
type ApplicationStatus =
  | 'saved'
  | 'applied'
  | 'phone_screen'
  | 'assessment'       // Added v0.2.0
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'closed';          // Renamed from 'withdrawn' v0.2.0

type JobType = 'remote' | 'hybrid' | 'on_site' | 'flexible';  // Added v0.2.0

interface JobApplication {
  id: string;
  company: string;               // Required
  role: string;                  // Required
  location?: string;
  jobType?: JobType;             // Added v0.2.0
  status: ApplicationStatus;     // Default: 'applied'
  jobUrl?: string;
  notes?: string;
  dateApplied?: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

### BudgetEntry

```typescript
type EntryType = 'income' | 'expense';

interface BudgetEntry {
  id: string;
  title: string;        // Required — Added v0.2.0 (e.g. "Freelance payment - June")
  amount: number;       // Positive number
  type: EntryType;
  category: string;     // e.g. 'Salary', 'Food', 'Transport', 'Freelance'
  date: string;         // ISO 8601 date string
  notes?: string;
  createdAt: string;
}
```

### Project (new in v0.2.0)

```typescript
type ProjectStatus = 'idea' | 'in_progress' | 'complete' | 'archived';
type ProjectVisibility = 'public' | 'private';

interface Project {
  id: string;
  name: string;                   // Required
  status: ProjectStatus;          // Default: 'in_progress'
  visibility: ProjectVisibility;  // Default: 'private'
  problemSolved?: string;         // What problem does this address?
  techStack: string[];            // List of technologies
  keyFeatures?: string;           // What does it do?
  githubUrl?: string;
  liveDemoUrl?: string;
  lessonsLearned?: string;
  futureImprovements?: string;
  createdAt: string;
  updatedAt: string;
}
```

### WeeklyFocus (Dashboard Home widget — new in v0.2.0)

```typescript
interface WeeklyFocus {
  text: string;           // Editable short text — "What am I focusing on this week?"
  updatedAt: string;
}
```

This is a single-value piece of state, not a list. Stored as `useState<WeeklyFocus>` at the dashboard level.

---

## Supabase Schema (Phase 7 — Planned)

```sql
-- Tasks table
CREATE TABLE tasks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  status        TEXT NOT NULL DEFAULT 'todo'
                  CHECK (status IN ('todo', 'in_progress', 'done', 'blocked')),
  priority      TEXT NOT NULL DEFAULT 'medium'
                  CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category      TEXT NOT NULL DEFAULT 'general'
                  CHECK (category IN ('general', 'work', 'project', 'personal', 'career')),
  due_date      DATE,
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prompts table
CREATE TABLE prompts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  body          TEXT NOT NULL,
  category      TEXT NOT NULL DEFAULT 'other'
                  CHECK (category IN ('frontend_development', 'qa_testing',
                    'documentation', 'business_analysis', 'product_planning',
                    'resume_cover_letter', 'daily_planning', 'other')),
  use_case      TEXT,
  tags          TEXT[] NOT NULL DEFAULT '{}',
  last_used_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Job applications table
CREATE TABLE job_applications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company         TEXT NOT NULL,
  role            TEXT NOT NULL,
  location        TEXT,
  job_type        TEXT CHECK (job_type IN ('remote', 'hybrid', 'on_site', 'flexible')),
  status          TEXT NOT NULL DEFAULT 'applied'
                    CHECK (status IN ('saved', 'applied', 'phone_screen',
                                      'assessment', 'interviewing', 'offer',
                                      'rejected', 'closed')),
  job_url         TEXT,
  notes           TEXT,
  date_applied    DATE,
  follow_up_date  DATE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Budget entries table
CREATE TABLE budget_entries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  amount      NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  type        TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category    TEXT NOT NULL DEFAULT '',
  date        DATE NOT NULL,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Projects table
CREATE TABLE projects (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name                  TEXT NOT NULL,
  status                TEXT NOT NULL DEFAULT 'in_progress'
                          CHECK (status IN ('idea', 'in_progress', 'complete', 'archived')),
  visibility            TEXT NOT NULL DEFAULT 'private'
                          CHECK (visibility IN ('public', 'private')),
  problem_solved        TEXT,
  tech_stack            TEXT[] NOT NULL DEFAULT '{}',
  key_features          TEXT,
  github_url            TEXT,
  live_demo_url         TEXT,
  lessons_learned       TEXT,
  future_improvements   TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Weekly focus (single row per user)
CREATE TABLE weekly_focus (
  user_id     UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  text        TEXT NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Row-Level Security (Phase 7)

```sql
-- Pattern for all tables — repeat for tasks, prompts, job_applications, budget_entries, projects, weekly_focus
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own their data"
  ON tasks FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

---

## Data Flow (MVP)

```
User Action
  → React event handler
  → useState / useReducer update
  → Component re-renders
  (No network request — data resets on refresh)
```

## Data Flow (Phase 7)

```
User Action
  → React event handler
  → Optimistic state update (UI updates immediately)
  → Supabase client insert/update/delete
    → On success: confirm — no change needed
    → On error: revert to pre-action state + show error toast
```

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.2.0 | 2026-06-03 | Added Task.description, Task.category; added PromptCategory enum with specific values; added JobApplication.jobType; renamed 'withdrawn' to 'closed', added 'assessment' status; added BudgetEntry.title; added Project type; added WeeklyFocus type; updated Supabase schema to match |
| v0.1.0 | 2026-06-03 | Initial data model created |
