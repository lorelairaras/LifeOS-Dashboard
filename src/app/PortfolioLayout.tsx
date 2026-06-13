import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X, Layers, Sparkles, Briefcase, Mail, BookOpen, Home, Info } from 'lucide-react'
import { buttonBaseClasses, buttonVariantClasses, buttonSizeClasses } from '@/components/button.utils'

const sidebarAnchors = [
  { id: 'hero',         label: 'Home',          Icon: Home },
  { id: 'what',         label: 'What it does',  Icon: Layers },
  { id: 'how',          label: 'How it helps',  Icon: Sparkles },
  { id: 'services',     label: 'Services',      Icon: Briefcase },
  { id: 'case-studies', label: 'Case Studies',  Icon: BookOpen },
  { id: 'about',        label: 'About',         Icon: Info },
  { id: 'contact',      label: 'Contact',       Icon: Mail },
]

const mobileNavLinks = sidebarAnchors.map((a) => ({ href: `#${a.id}`, label: a.label }))

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [ids])

  return active
}

export default function PortfolioLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionIds = sidebarAnchors.map((a) => a.id)
  const activeSection = useActiveSection(sectionIds)

  return (
    <>
      {/* Skip to main content - WCAG 2.4.1 */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top bar - OS command bar style */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-ro-pink/10 bg-ro-void/90 backdrop-blur-md">
        <nav
          className="flex items-center justify-between px-4 py-3 sm:px-6"
          aria-label="Main navigation"
        >
          {/* Logo / system name */}
          <a
            href={import.meta.env.BASE_URL}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            aria-label="LifeOS - go to home"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ro-pink/15 text-ro-pink">
              <span className="font-mono text-[10px] font-bold tracking-tighter">LO</span>
            </div>
            <span className="font-display text-base font-semibold text-ro-pri">LifeOS</span>
            <span className="hidden text-xs text-ro-muted sm:block">/ by Rory</span>
          </a>

          {/* Desktop - Enter Dashboard CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <span className="font-mono text-[10px] text-ro-pink/40 tracking-widest uppercase">
              System Online
            </span>
            <a
              href={`${import.meta.env.BASE_URL}dashboard`}
              className={[buttonBaseClasses, buttonVariantClasses.primary, buttonSizeClasses.sm].join(' ')}
            >
              Enter Dashboard &rarr;
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="rounded-md p-2 text-ro-sec transition-colors hover:text-ro-pri md:hidden"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="border-t border-ro-pink/10 bg-ro-dark md:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1 px-4 py-4" role="list">
              {mobileNavLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-ro-sec transition-colors hover:bg-ro-card hover:text-ro-pri"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={`${import.meta.env.BASE_URL}dashboard`}
                  className="block rounded-lg bg-ro-pink px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-ro-deep"
                >
                  Enter Dashboard &rarr;
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Layout shell - sidebar strip + main content */}
      <div className="flex min-h-screen pt-12">
        {/* Decorative sidebar strip - scroll anchor nav */}
        <aside
          className="fixed left-0 top-12 bottom-0 z-30 hidden w-14 flex-col items-center gap-1 border-r border-ro-pink/10 bg-ro-void/95 py-6 md:flex"
          aria-label="Section navigation"
        >
          {sidebarAnchors.map(({ id, label, Icon }) => {
            const isActive = activeSection === id
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-label={`Jump to ${label} section`}
                title={label}
                className={`group relative flex h-10 w-10 flex-col items-center justify-center rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-ro-pink/15 text-ro-pink shadow-[0_0_12px_rgba(255,79,163,0.2)]'
                    : 'text-ro-muted hover:bg-ro-card hover:text-ro-sec'
                }`}
              >
                <Icon size={14} aria-hidden="true" />
                {/* Tooltip */}
                <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md border border-ro-pink/20 bg-ro-card px-2 py-1 font-mono text-[10px] text-ro-sec opacity-0 transition-opacity group-hover:opacity-100">
                  {label}
                </span>
                {/* Active indicator dot */}
                {isActive && (
                  <span
                    className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-ro-pink"
                    aria-hidden="true"
                  />
                )}
              </a>
            )
          })}
        </aside>

        {/* Main scrollable content */}
        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 md:ml-14"
        >
          <Outlet />
        </main>
      </div>
    </>
  )
}
