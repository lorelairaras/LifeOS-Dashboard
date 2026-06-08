import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckSquare, Briefcase, Wallet, FolderKanban, Plus } from 'lucide-react'
import type { Task, JobApplication, BudgetEntry, Project } from '@/types'
import StatCard from '@/components/StatCard'
import WeeklyFocusWidget from '@/components/WeeklyFocusWidget'
import Button from '@/components/Button'
import { isOverdue } from '@/utils/dateUtils'
import { calculateTotals, formatCurrency, filterCurrentMonth } from '@/utils/budgetUtils'

export default function DashboardHomePage() {
  const navigate = useNavigate()

  // Placeholder state arrays — local state only. Cross-page aggregation wired in Phase 12 (Supabase).
  const [tasks] = useState<Task[]>([])
  const [jobs] = useState<JobApplication[]>([])
  const [budgetEntries] = useState<BudgetEntry[]>([])
  const [projects] = useState<Project[]>([])
  const [weeklyFocus, setWeeklyFocus] = useState('')

  // Derived stat values — all 0 in shell, will update as features are built
  const todaysTasks = tasks.filter(
    (t) => t.status !== 'done' && isOverdue(t.dueDate)
  ).length

  const openApplications = jobs.filter(
    (j) => !['rejected', 'closed'].includes(j.status)
  ).length

  const currentMonthEntries = filterCurrentMonth(budgetEntries)
  const { balance } = calculateTotals(currentMonthEntries)

  const activeProjects = projects.filter((p) => p.status === 'in_progress').length

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Your personal operating system overview.
        </p>
      </div>

      {/* Stat cards */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Summary statistics
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Tasks Due Today"
            value={todaysTasks}
            icon={CheckSquare}
            colour={todaysTasks > 0 ? 'text-warning' : 'text-text-muted'}
          />
          <StatCard
            label="Open Applications"
            value={openApplications}
            icon={Briefcase}
            colour="text-blue-400"
          />
          <StatCard
            label="Budget Balance"
            value={formatCurrency(balance)}
            icon={Wallet}
            colour={balance >= 0 ? 'text-success' : 'text-danger'}
          />
          <StatCard
            label="Active Projects"
            value={activeProjects}
            icon={FolderKanban}
            colour="text-purple-400"
          />
        </div>
      </section>

      {/* Weekly Focus */}
      <WeeklyFocusWidget value={weeklyFocus} onChange={setWeeklyFocus} />

      {/* Quick Actions */}
      <section aria-labelledby="quick-actions-heading">
        <h2 id="quick-actions-heading" className="mb-3 text-sm font-semibold text-text-primary">
          Quick Actions
        </h2>
<div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/dashboard/tasks')}
          >
            <Plus size={14} aria-hidden="true" />
            Add Task
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/dashboard/jobs')}
          >
            <Plus size={14} aria-hidden="true" />
            Log Application
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/dashboard/budget')}
          >
            <Plus size={14} aria-hidden="true" />
            Add Entry
          </Button>
        </div>
      </section>
    </div>
  )
}
