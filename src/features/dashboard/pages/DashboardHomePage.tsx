import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckSquare, Briefcase, Wallet, FolderKanban, Plus, Target, Command } from 'lucide-react'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { useJobs } from '@/features/jobs/hooks/useJobs'
import { useBudget } from '@/features/budget/hooks/useBudget'
import { usePrompts } from '@/features/prompts/hooks/usePrompts'
import StatCard from '@/components/StatCard'
import ProgressRing from '@/components/ProgressRing'
import CommandPalette from '@/components/CommandPalette'
import Button from '@/components/Button'
import { isOverdue } from '@/utils/dateUtils'
import { calculateTotals, formatCurrency, filterCurrentMonth } from '@/utils/budgetUtils'
import { useWeeklyFocus } from '@/hooks/useWeeklyFocus'

function computeMomentumScore(
  tasksCompleted: number,
  jobsTotal: number,
  budgetEntries: number,
  hasFocus: boolean,
  promptsTotal: number,
): number {
  let score = 0
  score += Math.min(tasksCompleted * 5, 25)
  score += Math.min(jobsTotal * 4, 20)
  score += Math.min(budgetEntries * 4, 20)
  if (hasFocus) score += 15
  score += Math.min(promptsTotal * 4, 20)
  return Math.min(score, 100)
}

function getMomentumLabel(score: number): string {
  if (score >= 80) return 'Peak productivity'
  if (score >= 60) return 'Great momentum'
  if (score >= 40) return 'Building up'
  if (score >= 20) return 'Getting started'
  return 'Ready to launch'
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  if (hour < 21) return 'Good evening'
  return 'Good night'
}

function formatTodayDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export default function DashboardHomePage() {
  const navigate = useNavigate()
  const [paletteOpen, setPaletteOpen] = useState(false)

  const { tasks } = useTasks()
  const { jobs } = useJobs()
  const { entries: budgetEntries } = useBudget()
  const { prompts } = usePrompts()
  const { text: weeklyFocus, updateFocus } = useWeeklyFocus()

  const openPalette = useCallback(() => setPaletteOpen(true), [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const todaysTasks = tasks.filter(
    (t) => t.status !== 'done' && isOverdue(t.dueDate),
  ).length

  const openApplications = jobs.filter(
    (j) => !['rejected', 'closed'].includes(j.status),
  ).length

  const currentMonthEntries = filterCurrentMonth(budgetEntries)
  const { balance } = calculateTotals(currentMonthEntries)

  const completedTasks = tasks.filter((t) => t.status === 'done').length
  const momentum = computeMomentumScore(
    completedTasks,
    jobs.length,
    budgetEntries.length,
    Boolean(weeklyFocus?.trim()),
    prompts.length,
  )

  return (
    <>
      {paletteOpen && <CommandPalette onClose={closePalette} />}

      <div className="space-y-6">
        {/* Greeting header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-os-pri">Dashboard</h1>
            <p className="mt-0.5 text-sm text-os-sec">
              {getGreeting()}, Rory · {formatTodayDate()}
            </p>
          </div>
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette (⌘K)"
            className="hidden sm:flex items-center gap-2 rounded-lg border border-os-border bg-os-card px-3 py-2 text-xs text-os-sec transition-colors hover:border-os-bright hover:text-os-pri"
          >
            <Command size={12} aria-hidden="true" />
            <span>Command</span>
            <kbd className="rounded border border-os-border px-1 font-mono text-[10px] text-os-dim">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Today's Focus */}
        <div className="os-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Target size={13} className="text-os-cyan" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-os-sec">
              Today's Focus
            </span>
          </div>
          <label htmlFor="today-focus" className="sr-only">
            What are you focusing on today?
          </label>
          <input
            id="today-focus"
            type="text"
            value={weeklyFocus}
            onChange={(e) => updateFocus(e.target.value)}
            placeholder="What matters most today?"
            className="w-full bg-transparent text-base font-medium text-os-pri placeholder-os-dim outline-none"
          />
          <p className="mt-2 text-xs text-os-dim">Saved for this session only.</p>
        </div>

        {/* Momentum + Stat cards */}
        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">
            Summary statistics
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {/* Momentum ring card */}
            <div className="os-card col-span-1 flex flex-col items-center justify-center gap-2.5 border-l-2 border-l-os-cyan p-5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-os-sec">
                Momentum
              </span>
              <div className="relative">
                <ProgressRing value={momentum} size={78} stroke={5} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-mono text-lg font-bold text-os-cyan"
                    aria-label={`Momentum score: ${momentum} out of 100`}
                  >
                    {momentum}
                  </span>
                </div>
              </div>
              <span className="text-center text-[10px] text-os-sec">
                {getMomentumLabel(momentum)}
              </span>
            </div>

            <StatCard
              label="Tasks Due Today"
              value={todaysTasks}
              icon={CheckSquare}
              accent="rose"
            />
            <StatCard
              label="Open Applications"
              value={openApplications}
              icon={Briefcase}
              accent="cyan"
            />
            <StatCard
              label="Budget Balance"
              value={formatCurrency(balance)}
              icon={Wallet}
              accent="amber"
            />
            <StatCard
              label="Active Projects"
              value={0}
              icon={FolderKanban}
              accent="lime"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section aria-labelledby="quick-actions-heading">
          <h2
            id="quick-actions-heading"
            className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-os-sec"
          >
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/tasks')}>
              <Plus size={14} aria-hidden="true" />
              Add Task
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/jobs')}>
              <Plus size={14} aria-hidden="true" />
              Log Application
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/budget')}>
              <Plus size={14} aria-hidden="true" />
              Add Entry
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
