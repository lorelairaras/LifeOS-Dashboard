import { useState } from 'react'
import { Flame, Plus, Trash2, Check } from 'lucide-react'
import { useHabits } from '@/features/habits/hooks/useHabits'
import { localIsoDate, dayLabel, dayLetter, currentStreak } from '@/features/habits/utils/dates'
import ConfirmDialog from '@/components/ConfirmDialog'
import type { Habit } from '@/types'

// Last 7 days, oldest first
const LAST_7_DAYS = [6, 5, 4, 3, 2, 1, 0]

export default function HabitRitualsPage() {
  const { habits, checks, loading, error, addHabit, deleteHabit, toggleCheck } = useHabits()
  const [newHabit, setNewHabit] = useState('')
  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const name = newHabit.trim()
    if (!name) return
    addHabit(name)
    setNewHabit('')
  }

  const checksByHabit = new Map<string, Set<string>>()
  for (const check of checks) {
    if (!checksByHabit.has(check.habitId)) checksByHabit.set(check.habitId, new Set())
    checksByHabit.get(check.habitId)!.add(check.date)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-ro-gold" aria-hidden="true" />
          <h1 className="font-display text-2xl font-semibold text-ro-pri">Habit Rituals</h1>
        </div>
        <p className="mt-1 text-sm text-ro-muted">Daily habits · Build streaks one day at a time</p>
      </div>

      {error && (
        <div role="alert" className="rounded-lg border border-ro-danger/30 bg-ro-danger/10 px-3 py-2 text-sm text-ro-danger">
          {error}
        </div>
      )}

      {/* Add habit */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a habit — e.g. Morning pages"
          aria-label="New habit name"
          maxLength={80}
          className="ro-input flex-1"
        />
        <button
          type="submit"
          disabled={!newHabit.trim()}
          className="flex items-center gap-2 rounded-lg border border-ro-pink/25 bg-ro-pink/10 px-4 py-2 text-sm font-medium text-ro-pink transition-colors hover:bg-ro-pink/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={14} aria-hidden="true" />
          Add
        </button>
      </form>

      {loading ? (
        <div className="py-12 text-center text-sm text-ro-muted">Loading habits...</div>
      ) : habits.length === 0 ? (
        <div className="ro-card flex flex-col items-center justify-center gap-3 py-16 text-center">
          <Flame size={36} className="text-ro-muted/40" aria-hidden="true" />
          <p className="text-sm font-medium text-ro-sec">No habits yet</p>
          <p className="text-xs text-ro-muted">Add your first habit above to start building streaks.</p>
        </div>
      ) : (
        <div className="space-y-3" data-testid="habit-list">
          {/* Day header row — desktop only; mobile shows per-cell letters */}
          <div className="hidden items-center gap-3 px-5 sm:flex">
            <span className="flex-1" />
            <div className="flex gap-1.5">
              {LAST_7_DAYS.map((daysAgo) => (
                <span
                  key={daysAgo}
                  className="w-8 text-center font-mono text-[8px] uppercase tracking-wide text-ro-muted"
                >
                  {dayLabel(daysAgo)}
                </span>
              ))}
            </div>
            <span className="w-16 text-right font-mono text-[8px] uppercase tracking-wide text-ro-muted">
              Streak
            </span>
            <span className="w-7" />
          </div>

          {habits.map((habit) => {
            const checkedDates = checksByHabit.get(habit.id) ?? new Set<string>()
            const streak = currentStreak(checkedDates)
            return (
              <div key={habit.id} className="ro-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:px-5">
                <span className="flex flex-1 items-center gap-2 text-sm text-ro-pri">
                  {habit.emoji && <span aria-hidden="true">{habit.emoji}</span>}
                  {habit.name}
                </span>

                {/* 7-day toggle grid */}
                <div className="flex gap-1.5" role="group" aria-label={`${habit.name} — last 7 days`}>
                  {LAST_7_DAYS.map((daysAgo) => {
                    const date = localIsoDate(daysAgo)
                    const checked = checkedDates.has(date)
                    const isToday = daysAgo === 0
                    return (
                      <div key={date} className="flex flex-col items-center gap-0.5">
                        <span
                          className="font-mono text-[7px] uppercase text-ro-muted sm:hidden"
                          aria-hidden="true"
                        >
                          {dayLetter(daysAgo)}
                        </span>
                        <button
                          type="button"
                          aria-label={`${habit.name} — ${dayLabel(daysAgo)} — ${checked ? 'done' : 'not done'}`}
                          aria-pressed={checked}
                          onClick={() => toggleCheck(habit.id, date)}
                          className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors ${
                            checked
                              ? 'border-ro-gold/50 bg-ro-gold/20 text-ro-gold'
                              : 'border-ro-pink/10 bg-ro-surface text-transparent hover:border-ro-pink/30'
                          } ${isToday ? 'ring-1 ring-ro-pink/40' : ''}`}
                        >
                          <Check size={13} aria-hidden="true" />
                        </button>
                      </div>
                    )
                  })}
                </div>

                <span className="w-16 text-right font-mono text-xs text-ro-gold">
                  <span aria-hidden="true">{streak > 0 ? `${streak}🔥` : '—'}</span>
                  <span className="sr-only">
                    {`Current streak: ${streak} ${streak === 1 ? 'day' : 'days'}`}
                  </span>
                </span>

                <button
                  type="button"
                  aria-label={`Delete habit ${habit.name}`}
                  onClick={() => setDeletingHabit(habit)}
                  className="self-end rounded-md p-1.5 text-ro-muted transition-colors hover:bg-ro-surface hover:text-ro-danger sm:self-auto"
                >
                  <Trash2 size={13} aria-hidden="true" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deletingHabit}
        onConfirm={() => {
          if (deletingHabit) deleteHabit(deletingHabit.id)
          setDeletingHabit(null)
        }}
        onCancel={() => setDeletingHabit(null)}
        title="Delete habit"
        message={`Delete "${deletingHabit?.name}" and all its history? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  )
}
