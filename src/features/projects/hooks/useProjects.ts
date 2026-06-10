import { useReducer, useEffect, useState, useCallback } from 'react'
import type { Project, ProjectStatus, ProjectVisibility } from '@/types'
import { isSupabaseConfigured } from '@/lib/supabase'
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

  useEffect(() => {
    // Supabase projects table not yet wired — always use demo data for now
    void user
    dispatch({ type: 'SET', payload: isSupabaseConfigured ? [] : DEMO_PROJECTS })
    setLoading(false)
  }, [user])

  const addProject = useCallback(
    (input: ProjectInput) => {
      const now = new Date().toISOString()
      dispatch({
        type: 'ADD',
        payload: { id: crypto.randomUUID(), ...input, createdAt: now, updatedAt: now },
      })
    },
    [],
  )

  const updateProject = useCallback((id: string, changes: Partial<ProjectInput>) => {
    const now = new Date().toISOString()
    dispatch({ type: 'UPDATE', payload: { id, changes: { ...changes, updatedAt: now } } })
  }, [])

  const deleteProject = useCallback((id: string) => {
    dispatch({ type: 'DELETE', payload: id })
  }, [])

  return { projects, loading, addProject, updateProject, deleteProject }
}
