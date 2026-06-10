import { Flame } from 'lucide-react'

export default function HabitRitualsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-ro-gold" aria-hidden="true" />
          <h1 className="font-display text-2xl font-semibold text-ro-pri">Habit Rituals</h1>
        </div>
        <p className="mt-1 text-sm text-ro-muted">Daily habits · coming soon</p>
      </div>

      <div className="ro-card p-10 text-center">
        {/* Habit grid mockup */}
        <div className="mx-auto mb-8 max-w-xs" aria-hidden="true">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-ro-muted">
            Example — streak grid
          </p>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => {
              const filled = Math.random() > 0.35
              return (
                <div
                  key={i}
                  className={`h-7 w-7 rounded-md border ${
                    filled
                      ? 'border-ro-gold/30 bg-ro-gold/20'
                      : 'border-ro-pink/10 bg-ro-surface'
                  }`}
                />
              )
            })}
          </div>
          <div className="mt-3 flex items-center justify-center gap-3 font-mono text-[9px] text-ro-muted">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm border border-ro-gold/30 bg-ro-gold/20" />
              Done
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm border border-ro-pink/10 bg-ro-surface" />
              Missed
            </span>
          </div>
        </div>

        <p className="font-display text-lg font-semibold text-ro-pri">Habit tracking is coming</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ro-sec">
          Build streaks, track daily rituals, and visualise your consistency. Coming in the next phase.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {['Morning pages', 'Exercise', 'Read 20 min', 'No social media before noon', 'Cold water'].map((habit) => (
            <span
              key={habit}
              className="rounded-full border border-ro-gold/15 bg-ro-gold/8 px-3 py-1 text-xs text-ro-muted"
            >
              {habit}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
