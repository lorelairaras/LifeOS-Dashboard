import { useReducer, useEffect, useState, useCallback } from 'react'
import type { Prompt, PromptCategory } from '@/types'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { fromDb, toDb, toDbUpdate } from '@/lib/supabaseHelpers'
import { useAuth } from '@/hooks/useAuth'
import { DEMO_PROMPTS } from '@/data/mockData'

export type PromptInput = {
  title: string
  body: string
  category: PromptCategory
  useCase?: string
  tags: string[]
}

type PromptAction =
  | { type: 'SET'; payload: Prompt[] }
  | { type: 'ADD'; payload: Prompt }
  | { type: 'UPDATE'; payload: { id: string; changes: Partial<Prompt> } }
  | { type: 'DELETE'; payload: string }

function promptsReducer(state: Prompt[], action: PromptAction): Prompt[] {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'ADD':
      return [...state, action.payload]
    case 'UPDATE':
      return state.map((p) =>
        p.id === action.payload.id ? { ...p, ...action.payload.changes } : p
      )
    case 'DELETE':
      return state.filter((p) => p.id !== action.payload)
    default:
      return state
  }
}

export function usePrompts() {
  const { user } = useAuth()
  const [prompts, dispatch] = useReducer(promptsReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      dispatch({ type: 'SET', payload: DEMO_PROMPTS })
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          setError('Failed to load prompts')
        } else {
          dispatch({ type: 'SET', payload: (data ?? []).map((r) => fromDb<Prompt>(r)) })
        }
        setLoading(false)
      })
  }, [user])

  const addPrompt = useCallback(
    async (input: PromptInput) => {
      const now = new Date().toISOString()
      if (!isSupabaseConfigured || !user) {
        dispatch({
          type: 'ADD',
          payload: { id: crypto.randomUUID(), ...input, createdAt: now, updatedAt: now },
        })
        return
      }
      const row = toDb({ ...input, userId: user.id })
      const { data, error: err } = await supabase
        .from('prompts')
        .insert(row)
        .select()
        .single()
      if (err) {
        setError('Failed to create prompt')
      } else if (data) {
        dispatch({ type: 'ADD', payload: fromDb<Prompt>(data) })
      }
    },
    [user],
  )

  const updatePrompt = useCallback(
    async (id: string, changes: Partial<PromptInput>) => {
      if (!isSupabaseConfigured) {
        const now = new Date().toISOString()
        dispatch({ type: 'UPDATE', payload: { id, changes: { ...changes, updatedAt: now } } })
        return
      }
      // toDbUpdate: cleared optional fields (undefined) must persist as NULL
      const row = toDbUpdate(changes)
      const { data, error: err } = await supabase
        .from('prompts')
        .update(row)
        .eq('id', id)
        .select()
        .single()
      if (err) {
        setError('Failed to update prompt')
      } else if (data) {
        dispatch({ type: 'UPDATE', payload: { id, changes: fromDb<Partial<Prompt>>(data) } })
      }
    },
    [],
  )

  const deletePrompt = useCallback(async (id: string) => {
    if (!isSupabaseConfigured) {
      dispatch({ type: 'DELETE', payload: id })
      return
    }
    const { error: err } = await supabase.from('prompts').delete().eq('id', id)
    if (err) {
      setError('Failed to delete prompt')
    } else {
      dispatch({ type: 'DELETE', payload: id })
    }
  }, [])

  const updateLastUsed = useCallback(async (id: string) => {
    const now = new Date().toISOString()
    if (!isSupabaseConfigured) {
      dispatch({ type: 'UPDATE', payload: { id, changes: { lastUsedAt: now } } })
      return
    }
    const { error: err } = await supabase
      .from('prompts')
      .update({ last_used_at: now })
      .eq('id', id)
    if (!err) {
      dispatch({ type: 'UPDATE', payload: { id, changes: { lastUsedAt: now } } })
    }
  }, [])

  return { prompts, loading, error, addPrompt, updatePrompt, deletePrompt, updateLastUsed }
}
