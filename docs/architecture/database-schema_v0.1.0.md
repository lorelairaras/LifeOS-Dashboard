# Database Schema — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-08  
**Author:** Rory  
**Status:** Phase 11 — Schema design approved for Phase 12 implementation  
**Standards reference:** ISO 27001 (A.9 Access Control), SOC 2 (CC6.1)

---

## Full SQL Schema

### Trigger function for updated_at

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### user_profiles

```sql
CREATE TABLE user_profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON user_profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "update_own" ON user_profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_on_signup();
```

**Fields:** id (UUID, PK), display_name (TEXT), created_at, updated_at  
**RLS:** Select own, update own. No insert policy — created by trigger. No delete policy — cascades from auth.users.  
**CRUD:** READ own profile, UPDATE display_name only. No direct CREATE or DELETE.  
**Privacy:** Contains no sensitive data beyond what Supabase Auth already stores.  
**QA cases:**
- QA-UP-001: Profile auto-created on user signup
- QA-UP-002: User can read own profile
- QA-UP-003: User cannot read other profiles
- QA-UP-004: User can update own display_name
- QA-UP-005: Profile deleted when auth user deleted

---

### tasks

```sql
CREATE TABLE tasks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  status      TEXT NOT NULL DEFAULT 'todo'
                CHECK (status IN ('todo', 'in_progress', 'done', 'blocked')),
  priority    TEXT NOT NULL DEFAULT 'medium'
                CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category    TEXT NOT NULL DEFAULT 'general'
                CHECK (category IN ('general', 'work', 'project', 'personal', 'career')),
  due_date    DATE,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON tasks FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON tasks FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(user_id, status);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

**Fields:** id, user_id, title (required), description, status, priority, category, due_date, notes, created_at, updated_at  
**RLS:** Full CRUD scoped to auth.uid() = user_id  
**CRUD rules:**
- CREATE: user_id must equal auth.uid(); title required; status defaults to 'todo'
- READ: Only own tasks; filter/sort handled client-side
- UPDATE: Any field except id, user_id, created_at; updated_at auto-set by trigger
- DELETE: Hard delete; no soft delete in MVP

**Privacy:** Task titles and notes are user-controlled content with low sensitivity.  
**QA cases:**
- QA-T-001: Create task with all required fields
- QA-T-002: Create task with only title (defaults applied)
- QA-T-003: Read only own tasks (other user's tasks invisible)
- QA-T-004: Update task status
- QA-T-005: Update task priority
- QA-T-006: Delete task
- QA-T-007: Invalid status value rejected by CHECK constraint
- QA-T-008: Empty title rejected by NOT NULL
- QA-T-009: updated_at auto-updates on edit
- QA-T-010: Tasks deleted when user account deleted (CASCADE)

---

### prompts

```sql
CREATE TABLE prompts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  body         TEXT NOT NULL,
  category     TEXT NOT NULL DEFAULT 'other'
                 CHECK (category IN ('frontend_development', 'qa_testing',
                   'documentation', 'business_analysis', 'product_planning',
                   'resume_cover_letter', 'daily_planning', 'other')),
  use_case     TEXT,
  tags         TEXT[] NOT NULL DEFAULT '{}',
  last_used_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON prompts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON prompts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON prompts FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON prompts FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_prompts_user_id ON prompts(user_id);
CREATE INDEX idx_prompts_category ON prompts(user_id, category);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

**Fields:** id, user_id, title (required), body (required), category, use_case, tags (TEXT[]), last_used_at, created_at, updated_at  
**RLS:** Full CRUD scoped to auth.uid() = user_id  
**CRUD rules:**
- CREATE: user_id must equal auth.uid(); title and body required
- READ: Only own prompts
- UPDATE: Any field except id, user_id, created_at; last_used_at updated on copy action
- DELETE: Hard delete

**Privacy:** Prompt content is user-authored text with low sensitivity.  
**QA cases:**
- QA-P-001: Create prompt with title and body
- QA-P-002: Read only own prompts
- QA-P-003: Update prompt body
- QA-P-004: Update last_used_at on copy
- QA-P-005: Delete prompt
- QA-P-006: Tags stored and retrieved as array
- QA-P-007: Invalid category rejected
- QA-P-008: Empty title or body rejected

---

### job_applications

```sql
CREATE TABLE job_applications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company         TEXT NOT NULL,
  role            TEXT NOT NULL,
  location        TEXT,
  job_type        TEXT CHECK (job_type IN ('remote', 'hybrid', 'on_site', 'flexible')),
  status          TEXT NOT NULL DEFAULT 'applied'
                    CHECK (status IN ('saved', 'applied', 'phone_screen',
                      'assessment', 'interviewing', 'offer', 'rejected', 'closed')),
  job_url         TEXT,
  notes           TEXT,
  date_applied    DATE,
  follow_up_date  DATE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON job_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON job_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON job_applications FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON job_applications FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_job_applications_status ON job_applications(user_id, status);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON job_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

**Fields:** id, user_id, company (required), role (required), location, job_type, status, job_url, notes, date_applied, follow_up_date, created_at, updated_at  
**RLS:** Full CRUD scoped to auth.uid() = user_id  
**CRUD rules:**
- CREATE: user_id must equal auth.uid(); company and role required
- READ: Only own applications
- UPDATE: Any field except id, user_id, created_at; status transitions not enforced in DB
- DELETE: Hard delete

**Privacy:** Contains professional information (companies, roles). Medium sensitivity. Notes field may contain interview details or salary info — do not log in error output.  
**QA cases:**
- QA-J-001: Create job application with company and role
- QA-J-002: Read only own applications
- QA-J-003: Update application status
- QA-J-004: Delete application
- QA-J-005: Invalid status rejected
- QA-J-006: job_type null allowed (optional field)
- QA-J-007: Notes content not leaked in errors

---

### budget_entries

```sql
CREATE TABLE budget_entries (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  amount     NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  type       TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category   TEXT NOT NULL DEFAULT '',
  date       DATE NOT NULL,
  notes      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE budget_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON budget_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON budget_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON budget_entries FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON budget_entries FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_budget_entries_user_id ON budget_entries(user_id);
CREATE INDEX idx_budget_entries_date ON budget_entries(user_id, date);
```

**Fields:** id, user_id, title (required), amount (required, > 0), type (required), category, date (required), notes, created_at  
**RLS:** Full CRUD scoped to auth.uid() = user_id  
**CRUD rules:**
- CREATE: user_id must equal auth.uid(); title, amount, type, date required
- READ: Only own entries
- UPDATE: Any field except id, user_id, created_at
- DELETE: Hard delete

**Privacy:** HIGH sensitivity — financial data. Amount and notes must never appear in error messages, console logs, or debug output. Category names (e.g., "Salary") may reveal income sources.  
**QA cases:**
- QA-B-001: Create budget entry with all required fields
- QA-B-002: Read only own entries
- QA-B-003: Update entry amount
- QA-B-004: Delete entry
- QA-B-005: Negative amount rejected by CHECK
- QA-B-006: Zero amount rejected by CHECK
- QA-B-007: Totals recalculated after CRUD operations
- QA-B-008: Amount not logged in error messages

---

### weekly_focus

```sql
CREATE TABLE weekly_focus (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  text       TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE weekly_focus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON weekly_focus FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "upsert_own" ON weekly_focus FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON weekly_focus FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
```

**Fields:** user_id (PK), text, updated_at  
**RLS:** Select own, insert own, update own. No delete — row persists for user lifetime.  
**CRUD rules:**
- UPSERT: Insert or update text for auth.uid()
- READ: Own row only

**Privacy:** Low sensitivity — single text field.  
**QA cases:**
- QA-WF-001: Create weekly focus on first visit
- QA-WF-002: Update weekly focus text
- QA-WF-003: Read only own focus
- QA-WF-004: Focus deleted when user account deleted (CASCADE)

---

## Column naming convention

TypeScript uses camelCase; PostgreSQL uses snake_case. The Supabase client handles mapping automatically when using `.select()`, but the app code should include explicit mapping functions to convert between formats.

| TypeScript | PostgreSQL |
|---|---|
| userId | user_id |
| dueDate | due_date |
| createdAt | created_at |
| updatedAt | updated_at |
| lastUsedAt | last_used_at |
| dateApplied | date_applied |
| followUpDate | follow_up_date |
| jobType | job_type |
| jobUrl | job_url |
| useCase | use_case |
| displayName | display_name |
| problemSolved | problem_solved |
| techStack | tech_stack |
| keyFeatures | key_features |
| githubUrl | github_url |
| liveDemoUrl | live_demo_url |
| lessonsLearned | lessons_learned |
| futureImprovements | future_improvements |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-08 | Initial database schema with all tables, RLS, CRUD rules, privacy notes, QA cases |
