import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  Briefcase,
  Wallet,
  FolderKanban,
  Settings,
  Sun,
  CalendarCheck,
  Flame,
  Brain,
  BookMarked,
} from 'lucide-react'

const COMMANDS = [
  { id: 'home',     label: 'Command Chamber',    sublabel: 'Daily overview',    icon: LayoutDashboard, path: '/dashboard' },
  { id: 'today',    label: 'Today Ritual',        sublabel: 'Plan your day',     icon: Sun,             path: '/dashboard/today' },
  { id: 'tasks',    label: 'Ritual Tasks',        sublabel: 'Task manager',      icon: CheckSquare,     path: '/dashboard/tasks' },
  { id: 'prompts',  label: 'Prompt Grimoire',     sublabel: 'Prompt library',    icon: Sparkles,        path: '/dashboard/prompts' },
  { id: 'projects', label: 'Project Reliquary',   sublabel: 'Active projects',   icon: FolderKanban,    path: '/dashboard/projects' },
  { id: 'budget',   label: 'Budget Pulse',        sublabel: 'Expenses & income', icon: Wallet,          path: '/dashboard/budget' },
  { id: 'jobs',     label: 'Career Pipeline',     sublabel: 'Job tracker',       icon: Briefcase,       path: '/dashboard/jobs' },
  { id: 'review',   label: 'Weekly Séance',       sublabel: 'Weekly review',     icon: CalendarCheck,   path: '/dashboard/review' },
  { id: 'habits',   label: 'Habit Rituals',       sublabel: 'Daily habits',      icon: Flame,           path: '/dashboard/habits' },
  { id: 'oracle',   label: 'AI Oracle',           sublabel: 'AI assistant',      icon: Brain,           path: '/dashboard/oracle' },
  { id: 'vault',    label: 'Knowledge Vault',     sublabel: 'Notes & resources', icon: BookMarked,      path: '/dashboard/vault' },
  { id: 'settings', label: 'Settings',            sublabel: '',                  icon: Settings,        path: '/dashboard/settings' },
]

interface CommandPaletteProps {
  onClose: () => void
}

export default function CommandPalette({ onClose }: CommandPaletteProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.sublabel.toLowerCase().includes(query.toLowerCase()),
      )
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
        className="absolute inset-0 bg-ro-void/75 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="glass-elevated relative w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="flex items-center gap-3 border-b border-ro-pink/15 px-4 py-3">
          <Search size={14} className="shrink-0 text-ro-pink/60" aria-hidden="true" />
          <input
            type="text"
            autoFocus
            placeholder="Navigate to…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-ro-pri placeholder-ro-muted outline-none"
            aria-label="Search commands"
          />
          <kbd className="shrink-0 rounded border border-ro-pink/20 px-1.5 py-0.5 font-mono text-[10px] text-ro-muted">
            ESC
          </kbd>
        </div>

        <ul role="listbox" className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-ro-sec italic">
              No results found
            </li>
          ) : (
            filtered.map((cmd) => (
              <li key={cmd.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected="false"
                  onClick={() => go(cmd.path)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-ro-surface"
                >
                  <cmd.icon size={14} className="shrink-0 text-ro-pink/60" aria-hidden="true" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm text-ro-sec group-hover:text-ro-pri">{cmd.label}</span>
                    {cmd.sublabel && (
                      <span className="block font-mono text-[9px] text-ro-muted">{cmd.sublabel}</span>
                    )}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="border-t border-ro-pink/10 px-4 py-2">
          <p className="text-[10px] text-ro-muted">
            Navigate · <kbd className="font-mono">↑↓</kbd> ·
            Select · <kbd className="font-mono">↵</kbd> ·
            Close · <kbd className="font-mono">ESC</kbd>
          </p>
        </div>
      </div>
    </div>
  )
}
