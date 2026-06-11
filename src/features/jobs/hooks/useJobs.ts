import { useReducer, useEffect, useState, useCallback } from 'react'
import type { JobApplication, ApplicationStatus, JobType } from '@/types'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { fromDb, toDb, toDbUpdate } from '@/lib/supabaseHelpers'
import { useAuth } from '@/hooks/useAuth'
import { DEMO_JOBS } from '@/data/mockData'

export type JobInput = {
  company: string
  role: string
  location?: string
  jobType?: JobType
  status: ApplicationStatus
  jobUrl?: string
  notes?: string
  dateApplied?: string
  followUpDate?: string
}

type JobAction =
  | { type: 'SET'; payload: JobApplication[] }
  | { type: 'ADD'; payload: JobApplication }
  | { type: 'UPDATE'; payload: { id: string; changes: Partial<JobApplication> } }
  | { type: 'DELETE'; payload: string }

function jobsReducer(state: JobApplication[], action: JobAction): JobApplication[] {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'ADD':
      return [...state, action.payload]
    case 'UPDATE':
      return state.map((j) =>
        j.id === action.payload.id ? { ...j, ...action.payload.changes } : j
      )
    case 'DELETE':
      return state.filter((j) => j.id !== action.payload)
    default:
      return state
  }
}

export function useJobs() {
  const { user } = useAuth()
  const [jobs, dispatch] = useReducer(jobsReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      dispatch({ type: 'SET', payload: DEMO_JOBS })
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          setError('Failed to load job applications')
        } else {
          dispatch({
            type: 'SET',
            payload: (data ?? []).map((r) => fromDb<JobApplication>(r)),
          })
        }
        setLoading(false)
      })
  }, [user])

  const addJob = useCallback(
    async (input: JobInput) => {
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
        .from('job_applications')
        .insert(row)
        .select()
        .single()
      if (err) {
        setError('Failed to create job application')
      } else if (data) {
        dispatch({ type: 'ADD', payload: fromDb<JobApplication>(data) })
      }
    },
    [user],
  )

  const updateJob = useCallback(
    async (id: string, changes: Partial<JobInput>) => {
      if (!isSupabaseConfigured) {
        const now = new Date().toISOString()
        dispatch({ type: 'UPDATE', payload: { id, changes: { ...changes, updatedAt: now } } })
        return
      }
      // toDbUpdate: cleared optional fields (undefined) must persist as NULL
      const row = toDbUpdate(changes)
      const { data, error: err } = await supabase
        .from('job_applications')
        .update(row)
        .eq('id', id)
        .select()
        .single()
      if (err) {
        setError('Failed to update job application')
      } else if (data) {
        dispatch({
          type: 'UPDATE',
          payload: { id, changes: fromDb<Partial<JobApplication>>(data) },
        })
      }
    },
    [],
  )

  const deleteJob = useCallback(async (id: string) => {
    if (!isSupabaseConfigured) {
      dispatch({ type: 'DELETE', payload: id })
      return
    }
    const { error: err } = await supabase.from('job_applications').delete().eq('id', id)
    if (err) {
      setError('Failed to delete job application')
    } else {
      dispatch({ type: 'DELETE', payload: id })
    }
  }, [])

  return { jobs, loading, error, addJob, updateJob, deleteJob }
}
