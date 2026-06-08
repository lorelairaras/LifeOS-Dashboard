import { useReducer } from 'react'
import type { JobApplication, ApplicationStatus, JobType } from '@/types'

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
  | { type: 'ADD'; payload: JobInput }
  | { type: 'UPDATE'; payload: { id: string; changes: Partial<JobInput> } }
  | { type: 'DELETE'; payload: string }

function jobsReducer(state: JobApplication[], action: JobAction): JobApplication[] {
  const now = new Date().toISOString()
  switch (action.type) {
    case 'ADD':
      return [...state, { id: crypto.randomUUID(), ...action.payload, createdAt: now, updatedAt: now }]
    case 'UPDATE':
      return state.map((j) =>
        j.id === action.payload.id ? { ...j, ...action.payload.changes, updatedAt: now } : j
      )
    case 'DELETE':
      return state.filter((j) => j.id !== action.payload)
    default:
      return state
  }
}

export function useJobs() {
  const [jobs, dispatch] = useReducer(jobsReducer, [])
  const addJob = (data: JobInput) => dispatch({ type: 'ADD', payload: data })
  const updateJob = (id: string, changes: Partial<JobInput>) =>
    dispatch({ type: 'UPDATE', payload: { id, changes } })
  const deleteJob = (id: string) => dispatch({ type: 'DELETE', payload: id })
  return { jobs, addJob, updateJob, deleteJob }
}
