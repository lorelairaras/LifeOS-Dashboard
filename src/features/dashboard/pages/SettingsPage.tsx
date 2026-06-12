import { Settings, Wand2, Bird } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { useFlavorNames } from '@/hooks/useFlavorNames'
import { useMotionEffects } from '@/hooks/useMotionEffects'

interface ToggleRowProps {
  icon: React.ElementType
  label: string
  description: string
  note?: string
  checked: boolean
  onToggle: () => void
}

function ToggleRow({ icon: Icon, label, description, note, checked, onToggle }: ToggleRowProps) {
  return (
    <div className="ro-card flex items-center justify-between gap-4 p-5">
      <div className="flex items-start gap-3">
        <Icon size={16} className="mt-0.5 shrink-0 text-ro-pink/70" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-ro-pri">{label}</p>
          <p className="mt-0.5 text-xs text-ro-muted">{description}</p>
          {note && <p className="mt-1 text-xs text-ro-gold/80">{note}</p>}
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onToggle}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
          checked ? 'border-ro-pink/50 bg-ro-pink/30' : 'border-ro-pink/15 bg-ro-surface'
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 h-[18px] w-[18px] rounded-full transition-all ${
            checked ? 'left-[22px] bg-ro-pink' : 'left-0.5 bg-ro-muted/60'
          }`}
        />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const { enabled: flavorOn, toggle: toggleFlavor } = useFlavorNames()
  const { userPref: motionPref, reduced, toggle: toggleMotion } = useMotionEffects()

  return (
    <div>
      <PageHeader title="Settings" description="Set up your dashboard the way you like it." />

      <div className="max-w-xl space-y-6">
        {/* Appearance */}
        <section aria-labelledby="settings-appearance">
          <h2
            id="settings-appearance"
            className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ro-pink/50"
          >
            Appearance
          </h2>
          <div className="space-y-3">
            <ToggleRow
              icon={Wand2}
              label="Flavor names"
              description="Show the gothic Rose Obsidian names (The Grimoire, The Séance, …) as page subtitles. Plain names stay everywhere else."
              checked={flavorOn}
              onToggle={toggleFlavor}
            />
            <ToggleRow
              icon={Bird}
              label="Motion effects"
              description="Show the ambient bat flock drifting behind the dashboard. Purely decorative."
              note={
                reduced
                  ? 'Your system requests reduced motion, so the flock stays still regardless of this setting.'
                  : undefined
              }
              checked={motionPref}
              onToggle={toggleMotion}
            />
          </div>
        </section>

        {/* More settings placeholder */}
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-ro-pink/15 px-6 py-12 text-center">
          <Settings size={32} className="mb-3 text-ro-muted/50" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-ro-pri">More settings coming</h2>
          <p className="mt-1 max-w-sm text-xs text-ro-muted">
            Display name, themes, data export, and account options are planned for a later phase.
          </p>
        </div>
      </div>
    </div>
  )
}
