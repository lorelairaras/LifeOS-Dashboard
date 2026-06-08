import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
]

export default function PortfolioLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Skip to main content — WCAG 2.4.1 */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-40 bg-surface-900/90 backdrop-blur-sm border-b border-surface-700/50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-bold text-text-primary hover:text-accent transition-colors"
          >
            Rory
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-6 md:flex" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Dashboard CTA */}
          <a
            href="/dashboard"
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover md:inline-flex"
          >
            Dashboard
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="rounded-md p-2 text-text-secondary hover:text-text-primary md:hidden"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>

        {/* Mobile menu drawer */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="border-t border-surface-700/50 bg-surface-900 md:hidden"
            aria-label="Mobile menu"
          >
            <ul className="flex flex-col gap-1 px-4 py-4" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-800 hover:text-text-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/dashboard"
                  className="block rounded-lg bg-accent px-3 py-2 text-center text-sm font-medium text-white hover:bg-accent-hover"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Main content */}
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
    </>
  )
}
