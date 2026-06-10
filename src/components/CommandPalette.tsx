import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  Briefcase,
  Wallet,
  FolderKanban,
  Settings,
} from 'lucide-react'

const COMMANDS = [
  { id: 'home',     label: 'Dashboard Home',  icon: LayoutDashboard, path: '/dashboard' },
  { id: 'tasks',    label: 'Tasks',            icon: CheckSquare,     path: '/dashboard/tasks' },
  { id: 'prompts',  label: 'Prompt Library',   icon: BookOpen,        path: '/dashboard/prompts' },
  { id: 'jobs',     label: 'Job Tracker',      icon: Briefcase,       path: '/dashboard/jobs' },
  { id: 'budget',   label: 'Budget',           icon: Wallet,          path: '/dashboard/budget' },
  { id: 'projects', label: 'Projects',         icon: FolderKanban,    path: '/dashboard/projects' },
  { id: 'settings', label: 'Settings',         icon: Settings,        path: '/dashboard/settings' },
]

interface CommandPaletteProps {
  onClose: () => void
}

export default function CommandPalette({ onClose }: CommandPaletteProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : COMMANDS

  const go = useCallback(
    (path: string) => {
      navigate(path)
      onClose()
    },
    [navigate, onClose],
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="glass-elevated relative w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-os-border px-4 py-3">
          <Search size={15} className="shrink-0 text-os-sec" aria-hidden="true" />
          <input
            type="text"
            autoFocus
            placeholder="Go to page..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-os-pri placeholder-os-sec outline-none"
            aria-label="Search commands"
          />
          <kbd className="shrink-0 rounded border border-os-border px-1.5 py-0.5 font-mono text-[10px] text-os-dim">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <ul role="listbox" className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-os-sec">No results</li>
          ) : (
            filtered.map((cmd) => (
              <li key={cmd.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected="false"
                  onClick={() => go(cmd.path)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-os-pri transition-colors hover:bg-os-surface text-left"
                >
                  <cmd.icon size={15} className="shrink-0 text-os-sec" aria-hidden="true" />
                  {cmd.label}
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="border-t border-os-border px-4 py-2">
          <p className="text-[10px] text-os-dim">
            Navigate with <kbd className="font-mono">↑↓</kbd> · Select with <kbd className="font-mono">↵</kbd>
          </p>
        </div>
      </div>
    </div>
  )
}
