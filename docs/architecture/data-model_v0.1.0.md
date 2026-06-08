# Data Model — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft — MVP uses local state; Supabase schema planned for Phase 7

---

## Overview

In MVP (Phases 0–6), all data lives in React component state. No database tables exist. The TypeScript types below define the shape of the data used in the application. These types will map directly to Supabase table schemas in Phase 7.

---

## TypeScript Types (MVP)

### Task

```typescript
type TaskStatus = 'todo' | 'in_progress' | 'done' | 'blocked';
type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

interface Task {
  id: string;           // UUID (generated client-side with crypto.randomUUID())
  title: string;        // Required
  status: TaskStatus;   // Default: 'todo'
  priority: TaskPriority; // Default: 'medium'
  dueDate?: string;     // ISO 8601 date string, optional
  notes?: string;       // Optional free text
  createdAt: string;    // ISO 8601 timestamp
  updatedAt: string;    // ISO 8601 timestamp
}
```

### Prompt

```typescript
interface Prompt {
  id: string;
  title: string;        // Required
  body: string;         // Required — the actual prompt text
  category: string;     // e.g. 'Writing', 'Code', 'Analysis', 'Research'
  useCase?: string;     // Optional description of when to use this prompt
  tags: string[];       // Array of tag strings
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
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'withdrawn';

interface JobApplication {
  id: string;
  company: string;          // Required
  role: string;             // Required
  location?: string;        // Optional
  status: ApplicationStatus; // Default: 'applied'
  jobUrl?: string;          // URL to job posting
  notes?: string;
  dateApplied?: string;     // ISO 8601 date string
  followUpDate?: string;    // ISO 8601 date string
  createdAt: string;
  updatedAt: string;
}
```

### BudgetEntry

```typescript
type EntryType = 'income' | 'expense';

interface BudgetEntry {
  id: string;
  amount: number;       // Positive number in the user's local currency
  type: EntryType;      // Required
  category: string;     // e.g. 'Salary', 'Food', 'Transport', 'Freelance'
  date: string;         // ISO 8601 date string, required
  notes?: string;
  createdAt: string;
}
```

---

## Supabase Schema (Phase 7 — Planned)

The following SQL schema is planned for Phase 7. It maps directly to the TypeScript types above.

```sql
-- Tasks table
CREATE TABLE tasks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'todo'
                CHECK (status IN ('todo', 'in_progress', 'done', 'blocked')),
  priority    TEXT NOT NULL DEFAULT 'medium'
                CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date    DATE,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prompts table
CREATE TABLE prompts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  category    TEXT NOT NULL DEFAULT '',
  use_case    TEXT,
  tags        TEXT[] NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Job applications table
CREATE TABLE job_applications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company         TEXT NOT NULL,
  role            TEXT NOT NULL,
  location        TEXT,
  status          TEXT NOT NULL DEFAULT 'applied'
                    CHECK (status IN ('saved', 'applied', 'phone_screen',
                                      'interviewing', 'offer', 'rejected', 'withdrawn')),
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
  amount      NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  type        TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category    TEXT NOT NULL DEFAULT '',
  date        DATE NOT NULL,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Row-Level Security (Phase 7)

All tables will have RLS enabled. The policy for each table:

```sql
-- Example for tasks — repeat pattern for all tables
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own tasks"
  ON tasks
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

This ensures a user can only read, insert, update, and delete their own records.

---

## ID Generation

In MVP, IDs are generated client-side using the Web Crypto API:
```typescript
const id = crypto.randomUUID();
```

In Phase 7, IDs are generated by Supabase (`gen_random_uuid()` on the server). Client-generated IDs are used for optimistic UI updates and reconciled with server IDs after the insert.

---

## Data Flow (MVP)

```
User Action
  → React event handler
  → State update (useState / useReducer)
  → Component re-renders with new data
  → UI reflects change
  (No network request in MVP)
```

## Data Flow (Phase 7)

```
User Action
  → React event handler
  → Optimistic state update
  → Supabase client call (insert / update / delete)
    → On success: confirm state
    → On error: revert state, show error toast
```

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial data model created — TypeScript types and planned Supabase schema |
