import { Check, Info } from 'lucide-react'
import Card3D from '@/components/Card3D'
import { services } from '@/features/portfolio/data/servicesData'

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-16 sm:py-24 ro-grid-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/50">
            Services
          </span>
          <span className="h-px flex-1 bg-ro-pink/10" aria-hidden="true" />
        </div>

        <div className="ro-card p-8 sm:p-10">
          <h2 id="services-heading" className="font-display mb-3 text-2xl font-bold text-ro-pri">
            Work I can do for you
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-ro-sec">
            LifeOS is the proof of work. Here is what that same care looks like applied to your
            project — from a single page to a full system.
          </p>

          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2" role="list" aria-label="Services offered">
            {services.map((service) => (
              <li key={service.id}>
                <Card3D className="h-full" intensity={5}>
                  <article className="flex h-full flex-col rounded-xl border border-ro-pink/12 bg-ro-surface p-6 transition-colors hover:border-ro-pink/25">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ro-pink/20 bg-ro-pink/10 text-ro-pink">
                        <service.icon size={18} aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-ro-pink/15 bg-ro-card px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-ro-pink/70">
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-ro-pri">{service.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ro-sec">{service.benefit}</p>

                    <ul className="mt-4 space-y-2" role="list">
                      {service.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2 text-xs text-ro-sec">
                          <Check size={13} className="mt-0.5 shrink-0 text-ro-success" aria-hidden="true" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    {service.note && (
                      <p className="mt-4 flex items-start gap-2 rounded-lg border border-ro-gold/20 bg-ro-gold/5 px-3 py-2 text-[11px] leading-relaxed text-ro-sec">
                        <Info size={12} className="mt-0.5 shrink-0 text-ro-gold" aria-hidden="true" />
                        <span>{service.note}</span>
                      </p>
                    )}
                  </article>
                </Card3D>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-ro-pink/10 pt-6">
            <p className="text-sm text-ro-sec">Have something in mind?</p>
            <a
              href="#contact"
              className="rounded-lg border border-ro-pink/30 bg-ro-pink/10 px-4 py-2 text-sm font-medium text-ro-pink transition-colors hover:bg-ro-pink/20"
            >
              Start a conversation →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
