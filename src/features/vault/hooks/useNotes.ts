import { useReducer, useEffect, useState, useCallback } from 'react'
import type { Note } from '@/types'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { fromDb, toDb } from '@/lib/supabaseHelpers'
import { useAuth } from '@/hooks/useAuth'
import { DEMO_NOTES } from '@/data/mockData'

export type NoteInput = {
  title: string
  content: string
  tags: string[]
}

type NoteAction =
  | { type: 'SET'; payload: Note[] }
  | { type: 'ADD'; payload: Note }
  | { type: 'UPDATE'; payload: { id: string; changes: Partial<Note> } }
  | { type: 'DELETE'; payload: string }

function notesReducer(state: Note[], action: NoteAction): Note[] {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'ADD':
      return [action.payload, ...state]
    case 'UPDATE':
      return state.map((n) =>
        n.id === action.payload.id ? { ...n, ...action.payload.changes } : n
      )
    case 'DELETE':
      return state.filter((n) => n.id !== action.payload)
    default:
      return state
  }
}

export function useNotes() {
  const { user } = useAuth()
  const [notes, dispatch] = useReducer(notesReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      dispatch({ type: 'SET', payload: DEMO_NOTES })
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('notes')
      .select('*')
      .order('updated_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          setError('Failed to load notes')
        } else {
          dispatch({ type: 'SET', payload: (data ?? []).map((r) => fromDb<Note>(r)) })
        }
        setLoading(false)
      })
  }, [user])

  const addNote = useCallback(
    async (input: NoteInput) => {
      setError(null)
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
        .from('notes')
        .insert(row)
        .select()
        .single()
      if (err) {
        setError('Failed to create note')
      } else if (data) {
        dispatch({ type: 'ADD', payload: fromDb<Note>(data) })
      }
    },
    [user],
  )

  const updateNote = useCallback(async (id: string, changes: Partial<NoteInput>) => {
    setError(null)
    if (!isSupabaseConfigured) {
      const now = new Date().toISOString()
      dispatch({ type: 'UPDATE', payload: { id, changes: { ...changes, updatedAt: now } } })
      return
    }
    const row = toDb(changes)
    const { data, error: err } = await supabase
      .from('notes')
      .update(row)
      .eq('id', id)
      .select()
      .single()
    if (err) {
      setError('Failed to update note')
    } else if (data) {
      dispatch({ type: 'UPDATE', payload: { id, changes: fromDb<Partial<Note>>(data) } })
    }
  }, [])

  const deleteNote = useCallback(async (id: string) => {
    setError(null)
    if (!isSupabaseConfigured) {
      dispatch({ type: 'DELETE', payload: id })
      return
    }
    const { error: err } = await supabase.from('notes').delete().eq('id', id)
    if (err) {
      setError('Failed to delete note')
    } else {
      dispatch({ type: 'DELETE', payload: id })
    }
  }, [])

  return { notes, loading, error, addNote, updateNote, deleteNote }
}
