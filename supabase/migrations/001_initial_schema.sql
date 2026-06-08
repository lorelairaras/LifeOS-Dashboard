-- LifeOS Portfolio Dashboard — Initial Schema
-- Run this in the Supabase SQL Editor to set up all tables.

-- Shared trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- user_profiles
CREATE TABLE user_profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "update_own" ON user_profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER set_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

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

-- tasks
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
CREATE TRIGGER set_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- prompts
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
CREATE TRIGGER set_updated_at BEFORE UPDATE ON prompts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- job_applications
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
CREATE TRIGGER set_updated_at BEFORE UPDATE ON job_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- budget_entries
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

-- weekly_focus
CREATE TABLE weekly_focus (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  text       TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE weekly_focus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON weekly_focus FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "upsert_own" ON weekly_focus FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON weekly_focus FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
