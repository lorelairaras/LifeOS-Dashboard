import { useReducer, useEffect, useState, useCallback } from 'react'
import type { BudgetEntry, EntryType } from '@/types'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { fromDb, toDb } from '@/lib/supabaseHelpers'
import { useAuth } from '@/hooks/useAuth'
import { DEMO_BUDGET } from '@/data/mockData'

export type BudgetInput = {
  title: string
  amount: number
  type: EntryType
  category: string
  date: string
  notes?: string
}

type BudgetAction =
  | { type: 'SET'; payload: BudgetEntry[] }
  | { type: 'ADD'; payload: BudgetEntry }
  | { type: 'UPDATE'; payload: { id: string; changes: Partial<BudgetEntry> } }
  | { type: 'DELETE'; payload: string }

function budgetReducer(state: BudgetEntry[], action: BudgetAction): BudgetEntry[] {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'ADD':
      return [...state, action.payload]
    case 'UPDATE':
      return state.map((e) =>
        e.id === action.payload.id ? { ...e, ...action.payload.changes } : e
      )
    case 'DELETE':
      return state.filter((e) => e.id !== action.payload)
    default:
      return state
  }
}

export function useBudget() {
  const { user } = useAuth()
  const [entries, dispatch] = useReducer(budgetReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      dispatch({ type: 'SET', payload: DEMO_BUDGET })
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('budget_entries')
      .select('*')
      .order('date', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          setError('Failed to load budget entries')
        } else {
          dispatch({ type: 'SET', payload: (data ?? []).map((r) => fromDb<BudgetEntry>(r)) })
        }
        setLoading(false)
      })
  }, [user])

  const addEntry = useCallback(
    async (input: BudgetInput) => {
      const now = new Date().toISOString()
      if (!isSupabaseConfigured || !user) {
        dispatch({
          type: 'ADD',
          payload: { id: crypto.randomUUID(), ...input, createdAt: now },
        })
        return
      }
      const row = toDb({ ...input, userId: user.id })
      const { data, error: err } = await supabase
        .from('budget_entries')
        .insert(row)
        .select()
        .single()
      if (err) {
        setError('Failed to create budget entry')
      } else if (data) {
        dispatch({ type: 'ADD', payload: fromDb<BudgetEntry>(data) })
      }
    },
    [user],
  )

  const updateEntry = useCallback(
    async (id: string, changes: Partial<BudgetInput>) => {
      if (!isSupabaseConfigured) {
        dispatch({ type: 'UPDATE', payload: { id, changes } })
        return
      }
      const row = toDb(changes)
      const { data, error: err } = await supabase
        .from('budget_entries')
        .update(row)
        .eq('id', id)
        .select()
        .single()
      if (err) {
        setError('Failed to update budget entry')
      } else if (data) {
        dispatch({
          type: 'UPDATE',
          payload: { id, changes: fromDb<Partial<BudgetEntry>>(data) },
        })
      }
    },
    [],
  )

  const deleteEntry = useCallback(async (id: string) => {
    if (!isSupabaseConfigured) {
      dispatch({ type: 'DELETE', payload: id })
      return
    }
    const { error: err } = await supabase.from('budget_entries').delete().eq('id', id)
    if (err) {
      setError('Failed to delete budget entry')
    } else {
      dispatch({ type: 'DELETE', payload: id })
    }
  }, [])

  return { entries, loading, error, addEntry, updateEntry, deleteEntry }
}
