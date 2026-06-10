import { BookMarked } from 'lucide-react'

const placeholderNotes = [
  { title: 'Product thinking frameworks', tag: 'Product' },
  { title: 'React patterns I always forget', tag: 'Frontend' },
  { title: 'Interview prep — BA questions', tag: 'Career' },
  { title: 'Books to read this year', tag: 'Personal' },
  { title: 'System design notes', tag: 'Technical' },
]

export default function KnowledgeVaultPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <BookMarked size={16} className="text-ro-sec" aria-hidden="true" />
          <h1 className="font-display text-2xl font-semibold text-ro-pri">Knowledge Vault</h1>
        </div>
        <p className="mt-1 text-sm text-ro-muted">Notes & resources · coming soon</p>
      </div>

      <div className="ro-card p-10 text-center">
        {/* Note cards mockup */}
        <div className="mx-auto mb-8 max-w-sm space-y-2" aria-hidden="true">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-ro-muted">
            Example — note cards
          </p>
          {placeholderNotes.map((note) => (
            <div
              key={note.title}
              className="flex items-center justify-between rounded-lg border border-ro-pink/8 bg-ro-surface px-4 py-2.5 text-left"
            >
              <span className="text-xs text-ro-sec">{note.title}</span>
              <span className="rounded-full border border-ro-pink/10 px-2 py-0.5 font-mono text-[8px] text-ro-muted">
                {note.tag}
              </span>
            </div>
          ))}
        </div>

        <p className="font-display text-lg font-semibold text-ro-pri">Knowledge Vault opens soon</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ro-sec">
          Write notes, collect resources, and build your personal knowledge base — all connected to your projects and prompts. Coming in the next phase.
        </p>
      </div>
    </div>
  )
}
