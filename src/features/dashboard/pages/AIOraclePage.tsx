import { Brain, FileText, Sparkles, Wallet, FolderOpen, ListTodo, Zap } from 'lucide-react'
import { useFlavorNames } from '@/hooks/useFlavorNames'

const oracleActions = [
  {
    icon: Brain,
    title: 'Summarise My Week',
    description: 'Turns your weekly data into a plain-English summary — wins, blockers, and what to do next.',
    color: 'text-ro-oracle',
    bg: 'bg-ro-oracle/10 border-ro-oracle/20',
  },
  {
    icon: Sparkles,
    title: 'Improve a Prompt',
    description: 'Paste any prompt and get a sharper, more structured version with better constraints.',
    color: 'text-ro-pink',
    bg: 'bg-ro-pink/10 border-ro-pink/20',
  },
  {
    icon: FileText,
    title: 'Write Cover Letter',
    description: 'Pick a job application and generate a tailored, confident cover letter draft.',
    color: 'text-ro-bloom',
    bg: 'bg-ro-bloom/10 border-ro-bloom/20',
  },
  {
    icon: Wallet,
    title: 'Analyse Expenses',
    description: 'Review your budget data and find spending patterns, warnings, and suggestions.',
    color: 'text-ro-gold',
    bg: 'bg-ro-gold/10 border-ro-gold/20',
  },
  {
    icon: FolderOpen,
    title: 'Draft Case Study',
    description: 'Turn one of your projects into a structured portfolio case study draft.',
    color: 'text-ro-success',
    bg: 'bg-ro-success/10 border-ro-success/20',
  },
  {
    icon: ListTodo,
    title: 'Suggest Next Action',
    description: 'Looks at your open tasks, projects, and jobs — and tells you what to work on next.',
    color: 'text-ro-sec',
    bg: 'bg-ro-surface border-ro-pink/10',
  },
]

export default function AIOraclePage() {
  const { enabled: flavorOn } = useFlavorNames()
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Brain size={16} className="text-ro-oracle" aria-hidden="true" />
          <h1 className="font-display text-2xl font-semibold text-ro-pri">AI Assistant</h1>
        </div>
        {flavorOn && (
          <p className="mt-0.5 font-display text-xs italic text-ro-pink/60">The Oracle</p>
        )}
        <p className="mt-1 text-sm text-ro-muted">Coming soon</p>
      </div>

      {/* Status card */}
      <div className="ro-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-ro-pink/10 bg-ro-surface px-5 py-3">
          <span className="font-mono text-[10px] text-ro-muted">assistant.lifeos</span>
          <span className="flex items-center gap-1.5 rounded-full border border-ro-oracle/30 bg-ro-oracle/10 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-ro-oracle">
            <Zap size={8} aria-hidden="true" />
            Not active yet
          </span>
        </div>
        <div className="px-6 py-5">
          <p className="font-display text-lg italic text-ro-sec">
            {flavorOn
              ? '“The Oracle is being summoned. It will answer in a future version.”'
              : 'The AI assistant is not ready yet. It will arrive in a future version.'}
          </p>
          <p className="mt-2 text-xs text-ro-muted">
            AI features need an API key and are planned for a later phase.
          </p>
        </div>
      </div>

      {/* Action cards */}
      <div>
        <h2 className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ro-pink/40">
          Planned Abilities
        </h2>
        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="AI Assistant planned features"
        >
          {oracleActions.map((action) => (
            <li key={action.title}>
              <div
                className={`rounded-xl border p-5 ${action.bg} opacity-75`}
                aria-label={`${action.title} — coming soon`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg border ${action.bg}`}>
                    <action.icon size={16} className={action.color} aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-ro-pink/20 bg-ro-card px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-widest text-ro-muted">
                    Soon
                  </span>
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-ro-pri">{action.title}</h3>
                <p className="text-xs leading-relaxed text-ro-muted">{action.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
