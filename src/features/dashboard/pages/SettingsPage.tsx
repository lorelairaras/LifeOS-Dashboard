import { Settings } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Configure your dashboard preferences." />
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-surface-700 py-16 px-6 text-center">
        <Settings size={40} className="mb-4 text-text-muted" aria-hidden="true" />
        <h2 className="text-base font-semibold text-text-primary">Settings coming soon</h2>
        <p className="mt-1 text-sm text-text-secondary max-w-sm">
          Settings will be available in a future phase after core features are complete.
        </p>
      </div>
    </div>
  )
}
