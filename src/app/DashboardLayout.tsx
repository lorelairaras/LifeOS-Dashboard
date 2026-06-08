import { useState, useEffect, Suspense } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  Briefcase,
  Wallet,
  FolderKanban,
  Settings,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/dashboard/tasks', label: 'Tasks', icon: CheckSquare, end: false },
  { to: '/dashboard/prompts', label: 'Prompts', icon: BookOpen, end: false },
  { to: '/dashboard/jobs', label: 'Jobs', icon: Briefcase, end: false },
  { to: '/dashboard/budget', label: 'Budget', icon: Wallet, end: false },
  { to: '/dashboard/projects', label: 'Projects', icon: FolderKanban, end: false },
]

const bottomItems = [
  { to: '/dashboard/settings', label: 'Settings', icon: Settings, end: false },
]

function NavItem({
  to,
  label,
  icon: Icon,
  end,
  onClick,
}: {
  to: string
  label: string
  icon: React.ElementType
  end: boolean
  onClick?: () => void
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-accent/10 text-accent'
            : 'text-text-secondary hover:bg-surface-700 hover:text-text-primary'
        }`
      }
    >
      <Icon size={18} aria-hidden="true" />
      {label}
    </NavLink>
  )
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Close mobile sidebar on route change — BUG-014 fix: was useState, now useEffect
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen bg-surface-900">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-surface-700/50 bg-surface-800 md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex h-full w-60 flex-col bg-surface-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-surface-700/50 px-4 py-4">
              <span className="font-semibold text-text-primary">LifeOS</span>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setSidebarOpen(false)}
                className="rounded-md p-1 text-text-secondary hover:text-text-primary"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <SidebarContent onNavClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 border-b border-surface-700/50 bg-surface-800 px-4 py-3 md:hidden">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1 text-text-secondary hover:text-text-primary"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
          <span className="font-semibold text-text-primary">LifeOS</span>
        </header>

        {/* Data-loss notice */}
        <DataLossNotice key={location.pathname} />

        {/* Page content — Suspense required for lazy-loaded dashboard pages */}
        <main id="main-content" tabIndex={-1} className="flex-1 p-4 sm:p-6 lg:p-8">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <span className="text-sm text-text-muted">Loading...</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  return (
    <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
      <div className="mb-4 border-b border-surface-700/50 px-3 pb-3">
        <span className="text-lg font-bold text-text-primary">LifeOS</span>
        <p className="mt-0.5 text-xs text-text-muted">Personal Dashboard</p>
      </div>

      <nav aria-label="Dashboard navigation">
        <ul className="flex flex-col gap-1" role="list">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavItem {...item} onClick={onNavClick} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto border-t border-surface-700/50 pt-4">
        <ul className="flex flex-col gap-1" role="list">
          {bottomItems.map((item) => (
            <li key={item.to}>
              <NavItem {...item} onClick={onNavClick} />
            </li>
          ))}
          <li>
            <a
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-700 hover:text-text-primary"
            >
              <ExternalLink size={18} aria-hidden="true" />
              View Portfolio
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

function DataLossNotice() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  return (
    <div
      data-testid="data-loss-notice"
      className="flex items-center justify-between gap-3 border-b border-warning/20 bg-warning/10 px-4 py-2 sm:px-6"
      role="status"
    >
      <p className="text-xs text-warning">
        <strong>Demo mode:</strong> Data is not saved between sessions. Refresh = data reset.
      </p>
      <button
        type="button"
        aria-label="Dismiss demo mode notice"
        onClick={() => setDismissed(true)}
        className="shrink-0 text-warning/70 transition-colors hover:text-warning"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  )
}
