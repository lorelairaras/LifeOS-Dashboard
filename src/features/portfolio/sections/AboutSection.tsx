export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 sm:py-24 ro-grid-bg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Module panel header */}
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/50">
            Module
          </span>
          <span className="h-px flex-1 bg-ro-pink/10" aria-hidden="true" />
        </div>

        <div className="ro-card p-8 sm:p-10">
          <h2 id="about-heading" className="font-display mb-8 text-2xl font-bold text-ro-pri">
            About Me
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 text-sm leading-relaxed text-ro-sec lg:col-span-2">
              <p>
                I&rsquo;m a frontend developer and business analyst focused on building tools that are
                well-documented, properly tested, and genuinely useful. I care as much about the
                requirements document and the QA plan as I do about the component tree.
              </p>
              <p>
                My background spans frontend development with React and TypeScript, business systems
                analysis, requirements engineering, and product thinking. I work best in the space
                where product and engineering meet — where a good question asked early saves two weeks
                of rework later.
              </p>
              <p>
                This portfolio is itself a working project. The docs folder has the same care as the
                code: architecture decisions are recorded, requirements have IDs, and nothing is marked
                done until tests confirm it.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex flex-col gap-3">
              {[
                { label: 'Focus',     value: 'Frontend + Product' },
                { label: 'Location',  value: 'Vietnam 🇻🇳' },
                { label: 'Available', value: 'Open to roles' },
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
