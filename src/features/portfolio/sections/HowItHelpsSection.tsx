import { benefits } from '@/features/portfolio/data/lifeosProduct'

export default function HowItHelpsSection() {
  return (
    <section id="how" aria-labelledby="how-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/50">
            How it helps
          </span>
          <span className="h-px flex-1 bg-ro-pink/10" aria-hidden="true" />
        </div>

        <div className="ro-card p-8 sm:p-10">
          <h2 id="how-heading" className="font-display mb-3 text-2xl font-bold text-ro-pri">
            Why it sticks when other dashboards go stale
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-ro-sec">
            Most personal dashboards are abandoned within a week. LifeOS is built around three
            ideas that keep it in daily use.
          </p>

          <dl className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="flex flex-col rounded-xl border border-ro-pink/12 bg-ro-surface p-5"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-ro-pink/20 bg-ro-pink/10 text-ro-pink">
                  <benefit.icon size={18} aria-hidden="true" />
                </span>
                <dt className="text-sm font-semibold text-ro-pri">{benefit.outcome}</dt>
                <dd className="mt-1.5 text-xs leading-relaxed text-ro-sec">{benefit.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
