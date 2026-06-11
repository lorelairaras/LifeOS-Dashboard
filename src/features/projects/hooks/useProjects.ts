import { useReducer, useEffect, useState, useCallback } from 'react'
import type { Project, ProjectStatus, ProjectVisibility } from '@/types'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { fromDb, toDb, toDbUpdate } from '@/lib/supabaseHelpers'
import { useAuth } from '@/hooks/useAuth'
import { DEMO_PROJECTS } from '@/data/mockData'

export type ProjectInput = {
  name: string
  status: ProjectStatus
  visibility: ProjectVisibility
  problemSolved?: string
  techStack: string[]
  keyFeatures?: string
  githubUrl?: string
  liveDemoUrl?: string
  lessonsLearned?: string
  futureImprovements?: string
}

type ProjectAction =
  | { type: 'SET'; payload: Project[] }
  | { type: 'ADD'; payload: Project }
  | { type: 'UPDATE'; payload: { id: string; changes: Partial<Project> } }
  | { type: 'DELETE'; payload: string }

function projectsReducer(state: Project[], action: ProjectAction): Project[] {
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

export function useProjects() {
  const { user } = useAuth()
  const [projects, dispatch] = useReducer(projectsReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      dispatch({ type: 'SET', payload: DEMO_PROJECTS })
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          setError('Failed to load projects')
        } else {
          dispatch({ type: 'SET', payload: (data ?? []).map((r) => fromDb<Project>(r)) })
        }
        setLoading(false)
      })
  }, [user])

  const addProject = useCallback(
    async (input: ProjectInput) => {
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
        .from('projects')
        .insert(row)
        .select()
        .single()
      if (err) {
        setError('Failed to create project')
      } else if (data) {
        dispatch({ type: 'ADD', payload: fromDb<Project>(data) })
      }
    },
    [user],
  )

  const updateProject = useCallback(async (id: string, changes: Partial<ProjectInput>) => {
    setError(null)
    if (!isSupabaseConfigured) {
      const now = new Date().toISOString()
      dispatch({ type: 'UPDATE', payload: { id, changes: { ...changes, updatedAt: now } } })
      return
    }
    // toDbUpdate: cleared optional fields (undefined) must persist as NULL
    const row = toDbUpdate(changes)
    const { data, error: err } = await supabase
      .from('projects')
      .update(row)
      .eq('id', id)
      .select()
      .single()
    if (err) {
      setError('Failed to update project')
    } else if (data) {
      dispatch({ type: 'UPDATE', payload: { id, changes: fromDb<Partial<Project>>(data) } })
    }
  }, [])

  const deleteProject = useCallback(async (id: string) => {
    setError(null)
    if (!isSupabaseConfigured) {
      dispatch({ type: 'DELETE', payload: id })
      return
    }
    const { error: err } = await supabase.from('projects').delete().eq('id', id)
    if (err) {
      setError('Failed to delete project')
    } else {
      dispatch({ type: 'DELETE', payload: id })
    }
  }, [])

  return { projects, loading, error, addProject, updateProject, deleteProject }
}
