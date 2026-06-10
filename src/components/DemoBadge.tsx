import { FlaskConical } from 'lucide-react'

export default function DemoBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-ro-gold/30 bg-ro-gold/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-ro-gold"
      title="Supabase is not configured — showing example data. Connect Supabase to use your own data."
      aria-label="Demo data mode active"
    >
      <FlaskConical size={9} aria-hidden="true" />
      Demo
    </span>
  )
}
