import { useReducer, useEffect, useState, useCallback } from 'react'
import type { Habit, HabitCheck } from '@/types'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { fromDb, toDb } from '@/lib/supabaseHelpers'
import { useAuth } from '@/hooks/useAuth'
import { DEMO_HABITS, DEMO_HABIT_CHECKS } from '@/data/mockData'

type State = {
  habits: Habit[]
  checks: HabitCheck[]
}

type Action =
  | { type: 'SET'; payload: State }
  | { type: 'ADD_HABIT'; payload: Habit }
  | { type: 'DELETE_HABIT'; payload: string }
  | { type: 'ADD_CHECK'; payload: HabitCheck }
  | { type: 'DELETE_CHECK'; payload: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'ADD_HABIT':
      return { ...state, habits: [...state.habits, action.payload] }
    case 'DELETE_HABIT':
      return {
        habits: state.habits.filter((h) => h.id !== action.payload),
        checks: state.checks.filter((c) => c.habitId !== action.payload),
      }
    case 'ADD_CHECK':
      return { ...state, checks: [...state.checks, action.payload] }
    case 'DELETE_CHECK':
      return { ...state, checks: state.checks.filter((c) => c.id !== action.payload) }
    default:
      return state
  }
}

export function useHabits() {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(reducer, { habits: [], checks: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      dispatch({ type: 'SET', payload: { habits: DEMO_HABITS, checks: DEMO_HABIT_CHECKS } })
      setLoading(false)
      return
    }
    setLoading(true)
    Promise.all([
      supabase.from('habits').select('*').order('created_at', { ascending: true }),
      supabase.from('habit_checks').select('*'),
    ]).then(([habitsRes, checksRes]) => {
      if (habitsRes.error || checksRes.error) {
        setError('Failed to load habits')
      } else {
        dispatch({
          type: 'SET',
          payload: {
            habits: (habitsRes.data ?? []).map((r) => fromDb<Habit>(r)),
            checks: (checksRes.data ?? []).map((r) => fromDb<HabitCheck>(r)),
          },
        })
      }
      setLoading(false)
    })
  }, [user])

  const addHabit = useCallback(
    async (name: string, emoji?: string) => {
      setError(null)
      const now = new Date().toISOString()
      if (!isSupabaseConfigured || !user) {
        dispatch({
          type: 'ADD_HABIT',
          payload: { id: crypto.randomUUID(), name, emoji, createdAt: now, updatedAt: now },
        })
        return
      }
      const row = toDb({ name, emoji, userId: user.id })
      const { data, error: err } = await supabase
        .from('habits')
        .insert(row)
        .select()
        .single()
      if (err) {
        setError('Failed to create habit')
      } else if (data) {
        dispatch({ type: 'ADD_HABIT', payload: fromDb<Habit>(data) })
      }
    },
    [user],
  )

  const deleteHabit = useCallback(async (id: string) => {
    setError(null)
    if (!isSupabaseConfigured) {
      dispatch({ type: 'DELETE_HABIT', payload: id })
      return
    }
    const { error: err } = await supabase.from('habits').delete().eq('id', id)
    if (err) {
      setError('Failed to delete habit')
    } else {
      dispatch({ type: 'DELETE_HABIT', payload: id })
    }
  }, [])

  const toggleCheck = useCallback(
    async (habitId: string, date: string) => {
      setError(null)
      const existing = state.checks.find((c) => c.habitId === habitId && c.date === date)
      if (existing) {
        if (!isSupabaseConfigured) {
          dispatch({ type: 'DELETE_CHECK', payload: existing.id })
          return
        }
        const { error: err } = await supabase.from('habit_checks').delete().eq('id', existing.id)
        if (err) {
          setError('Failed to update habit')
        } else {
          dispatch({ type: 'DELETE_CHECK', payload: existing.id })
        }
        return
      }
      const now = new Date().toISOString()
      if (!isSupabaseConfigured || !user) {
        dispatch({
          type: 'ADD_CHECK',
          payload: { id: crypto.randomUUID(), habitId, date, createdAt: now },
        })
        return
      }
      const row = toDb({ habitId, date, userId: user.id })
      const { data, error: err } = await supabase
        .from('habit_checks')
        .insert(row)
        .select()
        .single()
      if (err) {
        setError('Failed to update habit')
      } else if (data) {
        dispatch({ type: 'ADD_CHECK', payload: fromDb<HabitCheck>(data) })
      }
    },
    [state.checks, user],
  )

  return { habits: state.habits, checks: state.checks, loading, error, addHabit, deleteHabit, toggleCheck }
}
