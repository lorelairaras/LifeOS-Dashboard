export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-16 sm:py-24 ro-grid-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Module panel header */}
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/50">
            Why it exists
          </span>
          <span className="h-px flex-1 bg-ro-pink/10" aria-hidden="true" />
        </div>

        <div className="ro-card p-8 sm:p-10">
          <h2 id="about-heading" className="font-display mb-8 text-2xl font-bold text-ro-pri">
            The idea behind LifeOS
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 text-sm leading-relaxed text-ro-sec lg:col-span-2">
              <p>
                Most developer portfolios go stale because they only ever serve a passive showcase
                purpose. A site with no daily utility gets no daily maintenance. LifeOS flips that:
                the public page you are reading is the front door to a private dashboard its author
                actually uses every day, so it stays current by design.
              </p>
              <p>
                It is built by Rory &mdash; a frontend developer and business analyst who cares as
                much about the requirements doc and the QA plan as the component tree. LifeOS ships
                with versioned documentation, requirements that have IDs, and nothing marked done
                until tests confirm it. The same rigor is available as a service.
              </p>
              <p>
                The whole thing runs on a free-tier-friendly stack &mdash; React, Vite, TypeScript,
                Tailwind, and Supabase &mdash; deployed on Vercel. No paid lock-in to use it.
              </p>
            </div>

            {/* Quick facts */}
            <dl className="flex flex-col gap-3">
              {[
                { label: 'Type', value: 'Public showcase + private dashboard' },
                { label: 'Stack', value: 'React, TS, Tailwind, Supabase' },
                { label: 'Hosting', value: 'Vercel (free tier)' },
                { label: 'Built by', value: 'Rory, Vietnam' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-ro-pink/10 bg-ro-surface px-4 py-3"
                >
                  <dt className="font-mono text-[9px] font-bold uppercase tracking-widest text-ro-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ro-pri">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
