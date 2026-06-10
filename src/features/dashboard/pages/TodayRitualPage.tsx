import { useState, useEffect } from 'react'
import { Sun, Target, Battery, Moon, BookOpen } from 'lucide-react'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { useFlavorNames } from '@/hooks/useFlavorNames'

const FOCUS_KEY = 'lifeos:today-focus'
const ENERGY_KEY = 'lifeos:today-energy'
const REFLECTION_KEY = 'lifeos:today-reflection'

const ENERGY_LEVELS = [
  { value: 1, moon: '🌑', label: 'Depleted' },
  { value: 2, moon: '🌒', label: 'Low' },
  { value: 3, moon: '🌓', label: 'Steady' },
  { value: 4, moon: '🌔', label: 'Energised' },
  { value: 5, moon: '🌕', label: 'Peak' },
]

export default function TodayRitualPage() {
  const { tasks, toggleDone } = useTasks()
  const { enabled: flavorOn } = useFlavorNames()

  const [focus, setFocus] = useState(() => localStorage.getItem(FOCUS_KEY) ?? '')
  const [energy, setEnergy] = useState<number>(() => Number(localStorage.getItem(ENERGY_KEY)) || 3)
  const [reflection, setReflection] = useState(() => localStorage.getItem(REFLECTION_KEY) ?? '')
  const [sealed, setSealed] = useState(false)

  useEffect(() => { localStorage.setItem(FOCUS_KEY, focus) }, [focus])
  useEffect(() => { localStorage.setItem(ENERGY_KEY, String(energy)) }, [energy])
  useEffect(() => { localStorage.setItem(REFLECTION_KEY, reflection) }, [reflection])

  const topTasks = tasks
    .filter((t) => t.status !== 'done')
    .slice(0, 3)

  function handleSeal() {
    localStorage.setItem(REFLECTION_KEY, reflection)
    setSealed(true)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Sun size={16} className="text-ro-gold" aria-hidden="true" />
          <h1 className="font-display text-2xl font-semibold text-ro-pri">Today</h1>
        </div>
        {flavorOn && (
          <p className="mt-0.5 font-display text-xs italic text-ro-pink/60">Today&rsquo;s Ritual</p>
        )}
        <p className="mt-1 text-sm text-ro-muted">Plan your day</p>
      </div>

      {sealed ? (
        <div className="ro-card p-8 text-center">
          <p className="font-display text-xl text-ro-pri">Your day is saved. ✦</p>
          <p className="mt-2 text-sm text-ro-sec">Good work. See you tomorrow.</p>
          <button
            type="button"
            onClick={() => setSealed(false)}
            className="mt-6 font-mono text-xs text-ro-muted underline underline-offset-2 hover:text-ro-pink"
          >
            Edit again
          </button>
        </div>
      ) : (
        <>
          {/* Main focus */}
          <div className="ro-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <Target size={12} className="text-ro-pink" aria-hidden="true" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/60">
                Main Focus
              </span>
            </div>
            <label htmlFor="today-focus" className="sr-only">
              What is your main focus today?
            </label>
            <input
              id="today-focus"
              type="text"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              placeholder="What matters most today?"
              className="w-full bg-transparent font-display text-lg font-medium text-ro-pri placeholder-ro-muted/40 outline-none"
            />
          </div>

          {/* Top 3 tasks */}
          <div className="ro-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen size={12} className="text-ro-oracle" aria-hidden="true" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-oracle/60">
                Top 3 Tasks
              </span>
            </div>
            {topTasks.length === 0 ? (
              <p className="text-sm text-ro-muted">No open tasks. Add some on the Tasks page.</p>
            ) : (
              <ul className="space-y-2" role="list">
                {topTasks.map((task) => (
                  <li key={task.id} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleDone(task.id)}
                      aria-label={`Mark "${task.title}" as ${task.status === 'done' ? 'incomplete' : 'done'}`}
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-ro-pink/25 bg-ro-surface transition-colors hover:border-ro-pink/50"
                    >
                      {task.status === 'done' && (
                        <span className="h-2.5 w-2.5 rounded-sm bg-ro-pink" aria-hidden="true" />
                      )}
                    </button>
                    <span className={`text-sm ${task.status === 'done' ? 'text-ro-muted line-through' : 'text-ro-sec'}`}>
                      {task.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Energy selector */}
          <div className="ro-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <Battery size={12} className="text-ro-gold" aria-hidden="true" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-gold/60">
                Energy Level
              </span>
            </div>
            <div className="flex items-center gap-3" role="radiogroup" aria-label="Energy level">
              {ENERGY_LEVELS.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  role="radio"
                  aria-checked={energy === level.value}
                  aria-label={level.label}
                  onClick={() => setEnergy(level.value)}
                  title={level.label}
                  className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-2 text-xl transition-all ${
                    energy === level.value
                      ? 'border-ro-gold/40 bg-ro-gold/10'
                      : 'border-ro-pink/10 bg-ro-surface hover:border-ro-pink/20'
                  }`}
                >
                  <span aria-hidden="true">{level.moon}</span>
                  <span className="font-mono text-[8px] text-ro-muted">{level.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* End-of-day reflection */}
          <div className="ro-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <Moon size={12} className="text-ro-bloom" aria-hidden="true" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-bloom/60">
                End-of-Day Reflection
              </span>
            </div>
            <label htmlFor="reflection" className="sr-only">
              End of day reflection
            </label>
            <textarea
              id="reflection"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What did you accomplish? What's unfinished? How did it go?"
              rows={4}
              className="w-full resize-none bg-transparent text-sm leading-relaxed text-ro-sec placeholder-ro-muted/40 outline-none"
            />
          </div>

          {/* Seal the day */}
          <button
            type="button"
            onClick={handleSeal}
            className="w-full rounded-xl border border-ro-pink/25 bg-ro-pink/10 py-3 font-display text-sm font-semibold text-ro-pink transition-all hover:bg-ro-pink/20"
          >
            {flavorOn ? '✦ Seal the Day' : "Save today's plan"}
          </button>
        </>
      )}
    </div>
  )
}
