import { Github, Mail, ArrowDown } from 'lucide-react'
import { buttonBaseClasses, buttonVariantClasses, buttonSizeClasses } from '@/components/button.utils'
import { valueProposition, modules } from '@/features/portfolio/data/lifeosProduct'

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden ro-grid-bg"
    >
      {/* Ambient glow behind the panel */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ro-pink/6 blur-[80px]" />
        <div className="absolute right-[15%] top-[25%] h-48 w-48 rounded-full bg-ro-oracle/5 blur-[60px]" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-4 py-28 sm:px-6 lg:px-8">
        {/* OS dashboard panel */}
        <div className="ro-card overflow-hidden">
          {/* Panel header bar */}
          <div className="flex items-center justify-between border-b border-ro-pink/10 bg-ro-surface px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ro-danger/60" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-ro-gold/60" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-ro-success/60" aria-hidden="true" />
              </div>
              <span className="ml-2 font-mono text-[10px] text-ro-muted">lifeos &mdash; command</span>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-ro-success/30 bg-ro-success/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-ro-success">
              <span className="h-1.5 w-1.5 rounded-full bg-ro-success animate-glow-pulse" aria-hidden="true" />
              System Online
            </span>
          </div>

          {/* Panel body */}
          <div className="px-8 py-12 sm:px-12">
            {/* Eyebrow */}
            <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ro-pink/70">
              A personal operating system
            </p>

            {/* Product name */}
            <h1 id="hero-heading" className="font-display text-5xl font-bold tracking-tight text-ro-pri sm:text-6xl lg:text-7xl">
              Life<span className="italic text-ro-pink">OS</span>
            </h1>

            {/* Value proposition */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ro-sec sm:text-lg">
              {valueProposition}
            </p>

            {/* Module chips */}
            <ul className="mt-7 flex flex-wrap gap-2" role="list" aria-label="LifeOS modules">
              {modules.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center gap-1.5 rounded-full border border-ro-pink/14 bg-ro-surface px-2.5 py-1 text-[11px] text-ro-sec"
                >
                  <m.icon size={12} className="text-ro-pink/70" aria-hidden="true" />
                  {m.name}
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`${import.meta.env.BASE_URL}dashboard`}
                className={[buttonBaseClasses, buttonVariantClasses.primary, buttonSizeClasses.lg].join(' ')}
              >
                Enter the Dashboard &rarr;
              </a>
              <a
                href="#what"
                className={[buttonBaseClasses, buttonVariantClasses.ghost, buttonSizeClasses.lg, 'border border-ro-pink/25'].join(' ')}
              >
                See what it does
              </a>
            </div>

            {/* Builder credit + links */}
            <div className="mt-8 flex items-center gap-3 border-t border-ro-pink/10 pt-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ro-muted">
                Designed &amp; built by Rory
              </span>
              <span className="h-3 w-px bg-ro-pink/15" aria-hidden="true" />
              <a
                href="https://github.com/lorelairaras"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ro-muted transition-colors hover:bg-ro-card hover:text-ro-pri"
              >
                <Github size={15} aria-hidden="true" />
              </a>
              <a
                href="mailto:lorelai.raras@edufied.edu.vn"
                aria-label="Send email"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ro-muted transition-colors hover:bg-ro-card hover:text-ro-pri"
              >
                <Mail size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex justify-center">
          <a
            href="#what"
            aria-label="Scroll to what LifeOS does"
            className="flex flex-col items-center gap-1.5 text-ro-muted transition-colors hover:text-ro-sec"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest">Scroll</span>
            <ArrowDown size={16} className="animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
