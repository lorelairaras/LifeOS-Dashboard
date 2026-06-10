import { useReducer, useEffect, useState, useCallback } from 'react'
import type { Task, TaskStatus, TaskPriority, TaskCategory } from '@/types'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { fromDb, toDb, toDbUpdate } from '@/lib/supabaseHelpers'
import { useAuth } from '@/hooks/useAuth'
import { DEMO_TASKS } from '@/data/mockData'

export type TaskInput = {
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  category: TaskCategory
  dueDate?: string
  notes?: string
}

type TaskAction =
  | { type: 'SET'; payload: Task[] }
  | { type: 'ADD'; payload: Task }
  | { type: 'UPDATE'; payload: { id: string; changes: Partial<Task> } }
  | { type: 'DELETE'; payload: string }

function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'ADD':
      return [...state, action.payload]
    case 'UPDATE':
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload.changes } : t
      )
    case 'DELETE':
      return state.filter((t) => t.id !== action.payload)
    default:
      return state
  }
}

export function useTasks() {
  const { user } = useAuth()
  const [tasks, dispatch] = useReducer(tasksReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      dispatch({ type: 'SET', payload: DEMO_TASKS })
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          setError('Failed to load tasks')
        } else {
          dispatch({ type: 'SET', payload: (data ?? []).map((r) => fromDb<Task>(r)) })
        }
        setLoading(false)
      })
  }, [user])

  const addTask = useCallback(
    async (input: TaskInput) => {
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
        .from('tasks')
        .insert(row)
        .select()
        .single()
      if (err) {
        setError('Failed to create task')
      } else if (data) {
        dispatch({ type: 'ADD', payload: fromDb<Task>(data) })
      }
    },
    [user],
  )

  const updateTask = useCallback(
    async (id: string, changes: Partial<TaskInput>) => {
      if (!isSupabaseConfigured) {
        const now = new Date().toISOString()
        dispatch({ type: 'UPDATE', payload: { id, changes: { ...changes, updatedAt: now } } })
        return
      }
      // toDbUpdate: cleared optional fields (undefined) must persist as NULL
      const row = toDbUpdate(changes)
      const { data, error: err } = await supabase
        .from('tasks')
        .update(row)
        .eq('id', id)
        .select()
        .single()
      if (err) {
        setError('Failed to update task')
      } else if (data) {
        dispatch({ type: 'UPDATE', payload: { id, changes: fromDb<Partial<Task>>(data) } })
      }
    },
    [],
  )

  const deleteTask = useCallback(async (id: string) => {
    if (!isSupabaseConfigured) {
      dispatch({ type: 'DELETE', payload: id })
      return
    }
    const { error: err } = await supabase.from('tasks').delete().eq('id', id)
    if (err) {
      setError('Failed to delete task')
    } else {
      dispatch({ type: 'DELETE', payload: id })
    }
  }, [])

  const toggleDone = useCallback(
    async (id: string) => {
      const task = tasks.find((t) => t.id === id)
      if (!task) return
      const newStatus: TaskStatus = task.status === 'done' ? 'todo' : 'done'
      await updateTask(id, { status: newStatus })
    },
    [tasks, updateTask],
  )

  return { tasks, loading, error, addTask, updateTask, deleteTask, toggleDone }
}
