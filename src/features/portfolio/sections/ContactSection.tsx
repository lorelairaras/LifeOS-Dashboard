import { Mail, Github, Linkedin, Send } from 'lucide-react'

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'lorelai.raras@edufied.edu.vn',
    href: 'mailto:lorelai.raras@edufied.edu.vn',
    external: false,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/lorelairaras',
    href: 'https://github.com/lorelairaras',
    external: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/[YOUR_USERNAME]',
    href: 'https://linkedin.com/in/[YOUR_USERNAME]',
    external: true,
  },
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/50">
            Summon Me
          </span>
          <span className="h-px flex-1 bg-ro-pink/10" aria-hidden="true" />
        </div>

        <div className="ro-card p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 flex justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ro-pink/20 bg-ro-pink/10 text-ro-pink">
                <Send size={20} aria-hidden="true" />
              </span>
            </div>

            <h2 id="contact-heading" className="font-display mb-3 text-2xl font-bold text-ro-pri">
              Get in Touch
            </h2>
            <p className="mb-10 text-sm text-ro-sec">
              Open to frontend and product-adjacent roles, freelance projects, and interesting
              conversations.
            </p>

            <ul className="flex flex-col gap-3 sm:flex-row sm:justify-center" role="list">
              {contactLinks.map((link) => (
                <li key={link.label} className="flex-1 sm:max-w-xs">
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 rounded-xl border border-ro-pink/14 bg-ro-surface px-4 py-3 text-left transition-all hover:border-ro-pink/30 hover:bg-ro-card"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ro-pink/10 text-ro-pink">
                      <link.icon size={15} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-ro-muted">
                        {link.label}
                      </span>
                      <span className="block truncate text-xs text-ro-sec">{link.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
