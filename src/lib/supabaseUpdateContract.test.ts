import { describe, it, expect } from 'vitest'
import useJobsSrc from '@/features/jobs/hooks/useJobs.ts?raw'
import useTasksSrc from '@/features/tasks/hooks/useTasks.ts?raw'
import usePromptsSrc from '@/features/prompts/hooks/usePrompts.ts?raw'
import useBudgetSrc from '@/features/budget/hooks/useBudget.ts?raw'
import useProjectsSrc from '@/features/projects/hooks/useProjects.ts?raw'
import useNotesSrc from '@/features/vault/hooks/useNotes.ts?raw'

// Source-contract test: the cleared-fields bug (BUG-23C-01) lived at the call
// sites — hooks building UPDATE payloads with toDb(), which drops undefined
// keys, so cleared optional fields never reached the DB. Helper unit tests
// alone cannot catch a hook reverting to toDb(changes); this pins each
// update path to toDbUpdate() without needing a DOM/render test setup.
const updateHooks: Record<string, string> = {
  useJobs: useJobsSrc,
  useTasks: useTasksSrc,
  usePrompts: usePromptsSrc,
  useBudget: useBudgetSrc,
  useProjects: useProjectsSrc,
  useNotes: useNotesSrc,
}

describe('Supabase update call-site contract', () => {
  for (const [name, src] of Object.entries(updateHooks)) {
    it(`${name} builds its UPDATE payload with toDbUpdate, not toDb`, () => {
      expect(src).toContain('toDbUpdate(changes)')
      expect(src).not.toContain(' toDb(changes)')
    })
  }
})
