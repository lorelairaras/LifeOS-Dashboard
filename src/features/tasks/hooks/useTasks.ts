import { useReducer } from 'react'
import type { Task, TaskStatus, TaskPriority, TaskCategory } from '@/types'

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
  | { type: 'ADD'; payload: TaskInput }
  | { type: 'UPDATE'; payload: { id: string; changes: Partial<TaskInput> } }
  | { type: 'DELETE'; payload: string }
  | { type: 'TOGGLE_DONE'; payload: string }

function tasksReducer(state: Task[], action: TaskAction): Task[] {
  const now = new Date().toISOString()
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        { id: crypto.randomUUID(), ...action.payload, createdAt: now, updatedAt: now },
      ]
    case 'UPDATE':
      return state.map((t) =>
        t.id === action.payload.id
          ? { ...t, ...action.payload.changes, updatedAt: now }
          : t
      )
    case 'DELETE':
      return state.filter((t) => t.id !== action.payload)
    case 'TOGGLE_DONE':
      return state.map((t) =>
        t.id === action.payload
          ? { ...t, status: t.status === 'done' ? 'todo' : ('done' as TaskStatus), updatedAt: now }
          : t
      )
    default:
      return state
  }
}

export function useTasks() {
  const [tasks, dispatch] = useReducer(tasksReducer, [])

  const addTask = (data: TaskInput) => dispatch({ type: 'ADD', payload: data })
  const updateTask = (id: string, changes: Partial<TaskInput>) =>
    dispatch({ type: 'UPDATE', payload: { id, changes } })
  const deleteTask = (id: string) => dispatch({ type: 'DELETE', payload: id })
  const toggleDone = (id: string) => dispatch({ type: 'TOGGLE_DONE', payload: id })

  return { tasks, addTask, updateTask, deleteTask, toggleDone }
}
