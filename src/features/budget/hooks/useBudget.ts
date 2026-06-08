import { useReducer } from 'react'
import type { BudgetEntry, EntryType } from '@/types'

export type BudgetInput = {
  title: string
  amount: number
  type: EntryType
  category: string
  date: string
  notes?: string
}

type BudgetAction =
  | { type: 'ADD'; payload: BudgetInput }
  | { type: 'UPDATE'; payload: { id: string; changes: Partial<BudgetInput> } }
  | { type: 'DELETE'; payload: string }

function budgetReducer(state: BudgetEntry[], action: BudgetAction): BudgetEntry[] {
  const now = new Date().toISOString()
  switch (action.type) {
    case 'ADD':
      return [...state, { id: crypto.randomUUID(), ...action.payload, createdAt: now }]
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
  const [entries, dispatch] = useReducer(budgetReducer, [])
  const addEntry = (data: BudgetInput) => dispatch({ type: 'ADD', payload: data })
  const updateEntry = (id: string, changes: Partial<BudgetInput>) =>
    dispatch({ type: 'UPDATE', payload: { id, changes } })
  const deleteEntry = (id: string) => dispatch({ type: 'DELETE', payload: id })
  return { entries, addEntry, updateEntry, deleteEntry }
}
