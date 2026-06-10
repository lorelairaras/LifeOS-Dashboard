-- LifeOS Portfolio Dashboard — Phase 23B Migration
-- Adds: projects, habits, habit_checks, notes
-- Run this in the Supabase SQL Editor AFTER 001_initial_schema.sql.

-- projects
CREATE TABLE projects (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name                 TEXT NOT NULL,
  status               TEXT NOT NULL DEFAULT 'idea'
                         CHECK (status IN ('idea', 'in_progress', 'complete', 'archived')),
  visibility           TEXT NOT NULL DEFAULT 'private'
                         CHECK (visibility IN ('public', 'private')),
  problem_solved       TEXT,
  tech_stack           TEXT[] NOT NULL DEFAULT '{}',
  key_features         TEXT,
  github_url           TEXT,
  live_demo_url        TEXT,
  lessons_learned      TEXT,
  future_improvements  TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON projects FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON projects FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(user_id, status);
CREATE TRIGGER set_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- habits
CREATE TABLE habits (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  emoji      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON habits FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON habits FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE TRIGGER set_updated_at BEFORE UPDATE ON habits FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- habit_checks — one row per habit per day completed
CREATE TABLE habit_checks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  habit_id   UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  date       DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (habit_id, date)
);

ALTER TABLE habit_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON habit_checks FOR SELECT USING (auth.uid() = user_id);
-- INSERT must also verify the referenced habit belongs to the caller: FK validation
-- bypasses RLS, and the cross-user UNIQUE(habit_id, date) would otherwise let one
-- user block another's check-in by inserting against their habit id.
CREATE POLICY "insert_own" ON habit_checks FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM habits h WHERE h.id = habit_id AND h.user_id = auth.uid())
  );
CREATE POLICY "delete_own" ON habit_checks FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_habit_checks_user_id ON habit_checks(user_id);
CREATE INDEX idx_habit_checks_habit ON habit_checks(habit_id, date);

-- notes
CREATE TABLE notes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  content    TEXT NOT NULL DEFAULT '',
  tags       TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON notes FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON notes FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_updated ON notes(user_id, updated_at DESC);
