import { Settings, Bird } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { useMotionEffects } from '@/hooks/useMotionEffects'

export default function SettingsPage() {
  const { userPref, reduced, toggle } = useMotionEffects()

  return (
    <div>
      <PageHeader title="Settings" description="Configure your dashboard preferences." />

      <div className="max-w-xl space-y-4">
        {/* Motion effects toggle */}
        <div className="ro-card flex items-center justify-between gap-4 p-5">
          <div className="flex items-start gap-3">
            <Bird size={16} className="mt-0.5 shrink-0 text-ro-pink/70" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ro-pri">Motion effects</p>
              <p className="mt-0.5 text-xs text-ro-muted">
                Show the ambient bat flock drifting behind the dashboard. Purely decorative.
              </p>
              {reduced && (
                <p className="mt-1 text-xs text-ro-gold/80">
                  Your system requests reduced motion, so the flock stays still regardless of this setting.
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={userPref}
            aria-label="Motion effects"
            onClick={toggle}
            className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
              userPref ? 'border-ro-pink/50 bg-ro-pink/30' : 'border-ro-pink/15 bg-ro-surface'
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute top-0.5 h-[18px] w-[18px] rounded-full transition-all ${
                userPref ? 'left-[22px] bg-ro-pink' : 'left-0.5 bg-ro-muted/60'
              }`}
            />
          </button>
        </div>

        {/* More settings placeholder */}
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-ro-pink/15 px-6 py-12 text-center">
          <Settings size={32} className="mb-3 text-ro-muted/50" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-ro-pri">More settings coming</h2>
          <p className="mt-1 max-w-sm text-xs text-ro-muted">
            Display name, themes, and account options are planned for a later phase.
          </p>
        </div>
      </div>
    </div>
  )
}
