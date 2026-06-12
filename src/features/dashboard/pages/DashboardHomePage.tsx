import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckSquare,
  Briefcase,
  Wallet,
  FolderKanban,
  Plus,
  Target,
  Command,
  Sparkles,
  Sun,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { useJobs } from '@/features/jobs/hooks/useJobs'
import { useBudget } from '@/features/budget/hooks/useBudget'
import { usePrompts } from '@/features/prompts/hooks/usePrompts'
import { useProjects } from '@/features/projects/hooks/useProjects'
import StatCard from '@/components/StatCard'
import ProgressRing from '@/components/ProgressRing'
import CommandPalette from '@/components/CommandPalette'
import Button from '@/components/Button'
import { isOverdue } from '@/utils/dateUtils'
import { calculateTotals, formatCurrency, filterCurrentMonth } from '@/utils/budgetUtils'
import { useWeeklyFocus } from '@/hooks/useWeeklyFocus'
import { useFlavorNames } from '@/hooks/useFlavorNames'

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
  if (score >= 80) return 'On fire'
  if (score >= 60) return 'Strong momentum'
  if (score >= 40) return 'Building momentum'
  if (score >= 20) return 'Getting started'
  return 'Ready to begin'
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 5)  return 'The night is yours'
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

const STATUS_COLOR: Record<string, string> = {
  todo:        'bg-ro-muted/40',
  in_progress: 'bg-ro-gold',
  done:        'bg-ro-success',
  blocked:     'bg-ro-danger',
}

const PROJECT_STATUS_COLOR: Record<string, string> = {
  idea:        'bg-ro-oracle/60',
  in_progress: 'bg-ro-pink',
  complete:    'bg-ro-success',
  archived:    'bg-ro-muted/40',
}

export default function DashboardHomePage() {
  const navigate = useNavigate()
  const [paletteOpen, setPaletteOpen] = useState(false)

  const { tasks } = useTasks()
  const { jobs } = useJobs()
  const { entries: budgetEntries } = useBudget()
  const { prompts } = usePrompts()
  const { projects } = useProjects()
  const { text: weeklyFocus } = useWeeklyFocus()
  const { enabled: flavorOn } = useFlavorNames()

  const openPalette  = useCallback(() => setPaletteOpen(true), [])
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
    (t) => t.status !== 'done' && t.dueDate && isOverdue(t.dueDate),
  ).length

  const openApplications = jobs.filter(
    (j) => !['rejected', 'closed'].includes(j.status),
  ).length

  const currentMonthEntries = filterCurrentMonth(budgetEntries)
  const { balance } = calculateTotals(currentMonthEntries)

  const completedTasks = tasks.filter((t) => t.status === 'done').length

  const thisWeekPrompts = prompts.filter((p) => {
    if (!p.createdAt) return false
    const created = new Date(p.createdAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return created >= weekAgo
  }).length

  const activeProjects = projects.filter((p) => p.status === 'in_progress').length

  const momentum = computeMomentumScore(
    completedTasks,
    jobs.length,
    budgetEntries.length,
    Boolean(weeklyFocus?.trim()),
    prompts.length,
  )

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4)

  const recentPrompts = [...prompts]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)

  const activeProjectList = projects
    .filter((p) => p.status === 'in_progress')
    .slice(0, 2)

  return (
    <>
      {paletteOpen && <CommandPalette onClose={closePalette} />}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-ro-pink/50">
              {formatTodayDate()}
            </p>
            <h1 className="font-display mt-1 text-2xl font-semibold text-ro-pri">
              {getGreeting()}, Rory
            </h1>
            {flavorOn && (
              <p className="mt-0.5 font-display text-xs italic text-ro-pink/60">The Command Chamber</p>
            )}
            <p className="mt-0.5 text-sm text-ro-muted">Your daily overview</p>
          </div>
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette (⌘K)"
            className="hidden sm:flex items-center gap-2 rounded-lg border border-ro-pink/20 bg-ro-card px-3 py-2 text-xs text-ro-sec transition-colors hover:border-ro-pink/40 hover:text-ro-pri"
          >
            <Command size={11} aria-hidden="true" />
            <span>Navigate</span>
            <kbd className="rounded border border-ro-pink/20 px-1 font-mono text-[10px] text-ro-muted">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Today's Ritual focus card */}
        <div
          className="ro-card cursor-pointer p-5 transition-colors hover:border-ro-pink/30"
          onClick={() => navigate('/dashboard/today')}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/dashboard/today')}
          aria-label="Open Today page"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun size={12} className="text-ro-gold" aria-hidden="true" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-gold/60">
                Today
              </span>
            </div>
            <ArrowRight size={12} className="text-ro-muted" aria-hidden="true" />
          </div>
          {weeklyFocus?.trim() ? (
            <p className="font-display text-base font-medium text-ro-pri">{weeklyFocus}</p>
          ) : (
            <p className="font-display text-base font-medium text-ro-muted/50">
              What matters most today?
            </p>
          )}
          <p className="mt-2 text-xs text-ro-muted">Open Today to plan your day →</p>
        </div>

        {/* Momentum ring + stat cards */}
        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Summary statistics</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
            {/* Momentum */}
            <div className="ro-card col-span-1 flex flex-col items-center justify-center gap-2.5 border-l-2 border-l-ro-pink p-5 lg:col-span-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={11} className="text-ro-pink/60" aria-hidden="true" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/60">
                  Momentum
                </span>
              </div>
              <div className="relative">
                <ProgressRing value={momentum} size={80} stroke={5} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-mono text-xl font-bold text-ro-pink"
                    aria-label={`Momentum score: ${momentum} out of 100`}
                  >
                    {momentum}
                  </span>
                </div>
              </div>
              <span className="text-center text-[10px] italic text-ro-sec">
                {getMomentumLabel(momentum)}
              </span>
            </div>

            <StatCard label="Tasks Due" value={todaysTasks} icon={CheckSquare} accent="pink" />
            <StatCard label="Open Applications" value={openApplications} icon={Briefcase} accent="bloom" />
            <StatCard label="Monthly Balance" value={formatCurrency(balance)} icon={Wallet} accent="gold" />
            <StatCard label="Active Projects" value={activeProjects} icon={FolderKanban} accent="success" />
            <StatCard label="Prompts This Week" value={thisWeekPrompts} icon={Sparkles} accent="oracle" />
          </div>
        </section>

        {/* Active projects progress */}
        {activeProjectList.length > 0 && (
          <section aria-labelledby="projects-heading">
            <div className="mb-3 flex items-center justify-between">
              <h2 id="projects-heading" className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ro-pink/40">
                Active Projects
              </h2>
              <button
                type="button"
                onClick={() => navigate('/dashboard/projects')}
                className="font-mono text-[10px] text-ro-muted transition-colors hover:text-ro-pink"
              >
                View all →
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {activeProjectList.map((project) => (
                <div key={project.id} className="ro-card p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-ro-pri">{project.name}</span>
                    <span className={`h-2 w-2 shrink-0 rounded-full ${PROJECT_STATUS_COLOR[project.status]}`} aria-hidden="true" />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-full border border-ro-pink/10 bg-ro-surface px-2 py-0.5 font-mono text-[9px] text-ro-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recent activity grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Recent tasks */}
          <section aria-labelledby="recent-tasks-heading">
            <div className="mb-3 flex items-center justify-between">
              <h2 id="recent-tasks-heading" className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ro-pink/40">
                Recent Tasks
              </h2>
              <button
                type="button"
                onClick={() => navigate('/dashboard/tasks')}
                className="font-mono text-[10px] text-ro-muted transition-colors hover:text-ro-pink"
              >
                View all →
              </button>
            </div>
            <div className="ro-card divide-y divide-ro-pink/8">
              {recentTasks.length === 0 ? (
                <p className="px-4 py-4 text-sm text-ro-muted">No tasks yet.</p>
              ) : (
                recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 px-4 py-3">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${STATUS_COLOR[task.status]}`}
                      aria-hidden="true"
                    />
                    <span className={`flex-1 truncate text-sm ${task.status === 'done' ? 'text-ro-muted line-through' : 'text-ro-sec'}`}>
                      {task.title}
                    </span>
                    <span className="shrink-0 rounded-full border border-ro-pink/10 px-2 py-0.5 font-mono text-[9px] text-ro-muted capitalize">
                      {task.priority}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Recent prompts */}
          <section aria-labelledby="recent-prompts-heading">
            <div className="mb-3 flex items-center justify-between">
              <h2 id="recent-prompts-heading" className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ro-pink/40">
                Recent Prompts
              </h2>
              <button
                type="button"
                onClick={() => navigate('/dashboard/prompts')}
                className="font-mono text-[10px] text-ro-muted transition-colors hover:text-ro-pink"
              >
                View all →
              </button>
            </div>
            <div className="ro-card divide-y divide-ro-pink/8">
              {recentPrompts.length === 0 ? (
                <p className="px-4 py-4 text-sm text-ro-muted">No prompts yet.</p>
              ) : (
                recentPrompts.map((prompt) => (
                  <div key={prompt.id} className="px-4 py-3">
                    <p className="truncate text-sm text-ro-sec">{prompt.title}</p>
                    <p className="mt-0.5 font-mono text-[9px] capitalize text-ro-muted">
                      {prompt.category.replace(/_/g, ' ')}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Quick actions */}
        <section aria-labelledby="quick-actions-heading">
          <h2
            id="quick-actions-heading"
            className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ro-pink/40"
          >
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/tasks')}>
              <Plus size={12} aria-hidden="true" />
              Add Task
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/prompts')}>
              <Plus size={12} aria-hidden="true" />
              Add Prompt
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/jobs')}>
              <Plus size={12} aria-hidden="true" />
              Log Application
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/budget')}>
              <Plus size={12} aria-hidden="true" />
              Add Entry
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/today')}>
              <Target size={12} aria-hidden="true" />
              Plan Today
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
