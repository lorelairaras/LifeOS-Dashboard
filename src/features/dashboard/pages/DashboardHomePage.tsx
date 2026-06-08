import { useNavigate } from 'react-router-dom'
import { CheckSquare, Briefcase, Wallet, FolderKanban, Plus } from 'lucide-react'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { useJobs } from '@/features/jobs/hooks/useJobs'
import { useBudget } from '@/features/budget/hooks/useBudget'
import StatCard from '@/components/StatCard'
import WeeklyFocusWidget from '@/components/WeeklyFocusWidget'
import Button from '@/components/Button'
import { isOverdue } from '@/utils/dateUtils'
import { calculateTotals, formatCurrency, filterCurrentMonth } from '@/utils/budgetUtils'
import { useWeeklyFocus } from '@/hooks/useWeeklyFocus'

export default function DashboardHomePage() {
  const navigate = useNavigate()
  const { tasks } = useTasks()
  const { jobs } = useJobs()
  const { entries: budgetEntries } = useBudget()
  const { text: weeklyFocus, updateFocus } = useWeeklyFocus()

  const todaysTasks = tasks.filter(
    (t) => t.status !== 'done' && isOverdue(t.dueDate)
  ).length

  const openApplications = jobs.filter(
    (j) => !['rejected', 'closed'].includes(j.status)
  ).length

  const currentMonthEntries = filterCurrentMonth(budgetEntries)
  const { balance } = calculateTotals(currentMonthEntries)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Your personal operating system overview.
        </p>
      </div>

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
            value={0}
            icon={FolderKanban}
            colour="text-purple-400"
          />
        </div>
      </section>

      <WeeklyFocusWidget value={weeklyFocus} onChange={updateFocus} />

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
