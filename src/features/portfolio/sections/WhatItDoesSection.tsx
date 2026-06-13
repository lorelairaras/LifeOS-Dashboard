import Card3D from '@/components/Card3D'
import { modules } from '@/features/portfolio/data/lifeosProduct'

export default function WhatItDoesSection() {
  return (
    <section id="what" aria-labelledby="what-heading" className="py-16 sm:py-24 ro-grid-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/50">
            What it does
          </span>
          <span className="h-px flex-1 bg-ro-pink/10" aria-hidden="true" />
        </div>

        <div className="ro-card p-8 sm:p-10">
          <h2 id="what-heading" className="font-display mb-3 text-2xl font-bold text-ro-pri">
            Seven modules, one calm interface
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-ro-sec">
            LifeOS replaces a pile of half-used apps with a single dashboard. Each module does one
            job well, and they all share the same look, navigation, and command palette.
          </p>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="LifeOS modules">
            {modules.map((module) => (
              <li key={module.id}>
                <Card3D className="h-full" intensity={6}>
                  <article className="flex h-full flex-col rounded-xl border border-ro-pink/12 bg-ro-surface p-5 transition-colors hover:border-ro-pink/25">
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-ro-pink/20 bg-ro-pink/10 text-ro-pink">
                      <module.icon size={17} aria-hidden="true" />
                    </span>
                    <h3 className="text-sm font-semibold text-ro-pri">{module.name}</h3>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ro-sec">{module.summary}</p>
                  </article>
                </Card3D>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
