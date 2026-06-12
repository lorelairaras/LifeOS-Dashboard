import { Settings, Wand2 } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { useFlavorNames } from '@/hooks/useFlavorNames'

export default function SettingsPage() {
  const { enabled: flavorOn, toggle } = useFlavorNames()

  return (
    <div>
      <PageHeader title="Settings" description="Set up your dashboard the way you like it." />

      <div className="max-w-xl space-y-4">
        {/* Flavor names toggle */}
        <div className="ro-card flex items-center justify-between gap-4 p-5">
          <div className="flex items-start gap-3">
            <Wand2 size={16} className="mt-0.5 shrink-0 text-ro-pink/70" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ro-pri">Flavor names</p>
              <p className="mt-0.5 text-xs text-ro-muted">
                Show the gothic Rose Obsidian names (The Grimoire, The Séance, …) as
                page subtitles. Plain names stay everywhere else.
              </p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={flavorOn}
            aria-label="Flavor names"
            onClick={toggle}
            className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
              flavorOn
                ? 'border-ro-pink/50 bg-ro-pink/30'
                : 'border-ro-pink/15 bg-ro-surface'
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute top-0.5 h-[18px] w-[18px] rounded-full transition-all ${
                flavorOn ? 'left-[22px] bg-ro-pink' : 'left-0.5 bg-ro-muted/60'
              }`}
            />
          </button>
        </div>

        {/* More settings placeholder */}
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-ro-pink/15 py-12 px-6 text-center">
          <Settings size={32} className="mb-3 text-ro-muted/50" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-ro-pri">More settings coming</h2>
          <p className="mt-1 max-w-sm text-xs text-ro-muted">
            Display name, data export, and account options are planned for a later phase.
          </p>
        </div>
      </div>
    </div>
  )
}
