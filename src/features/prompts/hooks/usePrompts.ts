import { useReducer } from 'react'
import type { Prompt, PromptCategory } from '@/types'

export type PromptInput = {
  title: string
  body: string
  category: PromptCategory
  useCase?: string
  tags: string[]
}

type PromptAction =
  | { type: 'ADD'; payload: PromptInput }
  | { type: 'UPDATE'; payload: { id: string; changes: Partial<PromptInput> } }
  | { type: 'DELETE'; payload: string }
  | { type: 'UPDATE_LAST_USED'; payload: string }

function promptsReducer(state: Prompt[], action: PromptAction): Prompt[] {
  const now = new Date().toISOString()
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        { id: crypto.randomUUID(), ...action.payload, createdAt: now, updatedAt: now },
      ]
    case 'UPDATE':
      return state.map((p) =>
        p.id === action.payload.id
          ? { ...p, ...action.payload.changes, updatedAt: now }
          : p
      )
    case 'DELETE':
      return state.filter((p) => p.id !== action.payload)
    case 'UPDATE_LAST_USED':
      return state.map((p) =>
        p.id === action.payload ? { ...p, lastUsedAt: now } : p
      )
    default:
      return state
  }
}

export function usePrompts() {
  const [prompts, dispatch] = useReducer(promptsReducer, [])
  const addPrompt = (data: PromptInput) => dispatch({ type: 'ADD', payload: data })
  const updatePrompt = (id: string, changes: Partial<PromptInput>) =>
    dispatch({ type: 'UPDATE', payload: { id, changes } })
  const deletePrompt = (id: string) => dispatch({ type: 'DELETE', payload: id })
  const updateLastUsed = (id: string) => dispatch({ type: 'UPDATE_LAST_USED', payload: id })
  return { prompts, addPrompt, updatePrompt, deletePrompt, updateLastUsed }
}
