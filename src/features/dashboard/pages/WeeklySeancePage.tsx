import { useState } from 'react'
import { CalendarCheck, CheckSquare, Sparkles, Briefcase, Wallet, FolderKanban } from 'lucide-react'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { usePrompts } from '@/features/prompts/hooks/usePrompts'
import { useJobs } from '@/features/jobs/hooks/useJobs'
import { useBudget } from '@/features/budget/hooks/useBudget'
import { useProjects } from '@/features/projects/hooks/useProjects'
import { calculateTotals, formatCurrency, filterCurrentMonth } from '@/utils/budgetUtils'

const NEXT_FOCUS_KEY = 'lifeos:next-week-focus'
const WORKED_KEY = 'lifeos:weekly-worked'
const DRAINED_KEY = 'lifeos:weekly-drained'

function daysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

export default function WeeklySeancePage() {
  const { tasks } = useTasks()
  const { prompts } = usePrompts()
  const { jobs } = useJobs()
  const { entries: budgetEntries } = useBudget()
  const { projects } = useProjects()

  const [nextFocus, setNextFocus] = useState(() => localStorage.getItem(NEXT_FOCUS_KEY) ?? '')
  const [whatWorked, setWhatWorked] = useState(() => localStorage.getItem(WORKED_KEY) ?? '')
  const [whatDrained, setWhatDrained] = useState(() => localStorage.getItem(DRAINED_KEY) ?? '')
  const [closed, setClosed] = useState(false)

  const weekStart = daysAgo(7)

  const tasksCompletedThisWeek = tasks.filter(
    (t) => t.status === 'done' && new Date(t.updatedAt) >= weekStart,
  ).length

  const promptsThisWeek = prompts.filter(
    (p) => new Date(p.createdAt) >= weekStart,
  ).length

  const jobsAppliedThisWeek = jobs.filter(
    (j) => j.dateApplied && new Date(j.dateApplied) >= weekStart,
  ).length

  const monthEntries = filterCurrentMonth(budgetEntries)
  const { balance } = calculateTotals(monthEntries)

  const projectsUpdatedThisWeek = projects.filter(
    (p) => new Date(p.updatedAt) >= weekStart,
  ).length

  const summaryCards = [
    { label: 'Tasks Completed', value: tasksCompletedThisWeek, icon: CheckSquare, color: 'text-ro-pink' },
    { label: 'Prompts Written', value: promptsThisWeek, icon: Sparkles, color: 'text-ro-oracle' },
    { label: 'Jobs Applied', value: jobsAppliedThisWeek, icon: Briefcase, color: 'text-ro-bloom' },
    { label: 'Monthly Balance', value: formatCurrency(balance), icon: Wallet, color: 'text-ro-gold' },
    { label: 'Projects Updated', value: projectsUpdatedThisWeek, icon: FolderKanban, color: 'text-ro-success' },
  ]

  function handleClose() {
    localStorage.setItem(NEXT_FOCUS_KEY, nextFocus)
    localStorage.setItem(WORKED_KEY, whatWorked)
    localStorage.setItem(DRAINED_KEY, whatDrained)
    setClosed(true)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <CalendarCheck size={16} className="text-ro-bloom" aria-hidden="true" />
          <h1 className="font-display text-2xl font-semibold text-ro-pri">Weekly Séance</h1>
        </div>
        <p className="mt-1 text-sm text-ro-muted">Weekly review · last 7 days</p>
      </div>

      {closed ? (
        <div className="ro-card p-8 text-center">
          <p className="font-display text-xl text-ro-pri">The séance is closed. ✦</p>
          <p className="mt-2 text-sm text-ro-sec">Until next week.</p>
          <button
            type="button"
            onClick={() => setClosed(false)}
            className="mt-6 font-mono text-xs text-ro-muted underline underline-offset-2 hover:text-ro-pink"
          >
            Reopen
          </button>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <section aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ro-pink/40">
              This Week
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {summaryCards.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="ro-card flex items-center gap-3 p-4">
                  <Icon size={16} className={color} aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[9px] text-ro-muted">{label}</p>
                    <p className="text-lg font-bold text-ro-pri">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reflection fields */}
          <div className="ro-card divide-y divide-ro-pink/8">
            {/* What worked */}
            <div className="p-5">
              <label htmlFor="what-worked" className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-success/60">
                What worked
              </label>
              <textarea
                id="what-worked"
                value={whatWorked}
                onChange={(e) => setWhatWorked(e.target.value)}
                placeholder="Wins, breakthroughs, good habits…"
                rows={3}
                className="w-full resize-none bg-transparent text-sm leading-relaxed text-ro-sec placeholder-ro-muted/40 outline-none"
              />
            </div>

            {/* What drained */}
            <div className="p-5">
              <label htmlFor="what-drained" className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-danger/60">
                What drained me
              </label>
              <textarea
                id="what-drained"
                value={whatDrained}
                onChange={(e) => setWhatDrained(e.target.value)}
                placeholder="Blockers, distractions, things to drop…"
                rows={3}
                className="w-full resize-none bg-transparent text-sm leading-relaxed text-ro-sec placeholder-ro-muted/40 outline-none"
              />
            </div>

            {/* Next week focus */}
            <div className="p-5">
              <label htmlFor="next-focus" className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/60">
                Next week's focus
              </label>
              <input
                id="next-focus"
                type="text"
                value={nextFocus}
                onChange={(e) => setNextFocus(e.target.value)}
                placeholder="One thing to focus on next week…"
                className="w-full bg-transparent font-display text-base font-medium text-ro-pri placeholder-ro-muted/40 outline-none"
              />
            </div>
          </div>

          {/* Close the séance */}
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl border border-ro-bloom/25 bg-ro-bloom/10 py-3 font-display text-sm font-semibold text-ro-bloom transition-all hover:bg-ro-bloom/20"
          >
            ✦ Close the Séance
          </button>
        </>
      )}
    </div>
  )
}
