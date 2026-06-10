import { useState, useEffect, Suspense } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  Briefcase,
  Wallet,
  FolderKanban,
  Settings,
  Menu,
  X,
  ExternalLink,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { isSupabaseConfigured } from '@/lib/supabase'

type NavItemConfig = {
  to: string
  label: string
  icon: React.ElementType
  end: boolean
  activeClass: string
}

const navGroups: { label: string; items: NavItemConfig[] }[] = [
  {
    label: 'WORKSPACE',
    items: [
      {
        to: '/dashboard',
        label: 'Home',
        icon: LayoutDashboard,
        end: true,
        activeClass: 'bg-os-cyan/10 text-os-cyan',
      },
    ],
  },
  {
    label: 'PRODUCTIVITY',
    items: [
      {
        to: '/dashboard/tasks',
        label: 'Tasks',
        icon: CheckSquare,
        end: false,
        activeClass: 'bg-os-rose/10 text-os-rose',
      },
      {
        to: '/dashboard/prompts',
        label: 'Prompts',
        icon: Sparkles,
        end: false,
        activeClass: 'bg-os-violet/10 text-os-violet',
      },
      {
        to: '/dashboard/projects',
        label: 'Projects',
        icon: FolderKanban,
        end: false,
        activeClass: 'bg-os-lime/10 text-os-lime',
      },
    ],
  },
  {
    label: 'LIFE OS',
    items: [
      {
        to: '/dashboard/budget',
        label: 'Budget',
        icon: Wallet,
        end: false,
        activeClass: 'bg-os-amber/10 text-os-amber',
      },
      {
        to: '/dashboard/jobs',
        label: 'Jobs',
        icon: Briefcase,
        end: false,
        activeClass: 'bg-os-cyan/10 text-os-cyan',
      },
    ],
  },
]

function NavItem({
  to,
  label,
  icon: Icon,
  end,
  activeClass,
  onClick,
}: NavItemConfig & { onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? activeClass
            : 'text-os-sec hover:bg-os-card hover:text-os-pri'
        }`
      }
    >
      <Icon size={15} aria-hidden="true" />
      {label}
    </NavLink>
  )
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen bg-os-bg">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-os-border bg-os-surface md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex h-full w-60 flex-col border-r border-os-border bg-os-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-os-border px-4 py-4">
              <span className="font-bold text-os-pri tracking-tight">LifeOS</span>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setSidebarOpen(false)}
                className="rounded-md p-1 text-os-sec transition-colors hover:text-os-pri"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <SidebarContent onNavClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 border-b border-os-border bg-os-surface px-4 py-3 md:hidden">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1 text-os-sec transition-colors hover:text-os-pri"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <span className="font-bold text-os-pri tracking-tight">LifeOS</span>
        </header>

        {/* Data-loss notice */}
        <DataLossNotice key={location.pathname} />

        {/* Page content */}
        <main id="main-content" tabIndex={-1} className="flex-1 p-4 sm:p-6 lg:p-8">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <span className="text-sm text-os-sec">Loading…</span>
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
  const { signOut, user } = useAuth()

  return (
    <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
      {/* Logo */}
      <div className="mb-3 px-3 pt-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-os-cyan/15 text-os-cyan">
            <span className="font-mono text-xs font-bold">LO</span>
          </div>
          <span className="font-bold tracking-tight text-os-pri">LifeOS</span>
        </div>
      </div>

      {/* Profile card */}
      <div className="mb-4 rounded-xl border border-os-border bg-os-card px-3 py-2.5 flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-os-cyan/20 text-os-cyan">
          <span className="font-mono text-xs font-semibold">RR</span>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-os-pri">Rory</p>
          <p className="truncate text-xs text-os-sec">Life OS · Dashboard</p>
        </div>
      </div>

      {/* Grouped nav */}
      <nav aria-label="Dashboard navigation">
        <div className="flex flex-col gap-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-os-dim">
                {group.label}
              </p>
              <ul className="flex flex-col gap-0.5" role="list">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <NavItem {...item} onClick={onNavClick} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom items */}
      <div className="mt-auto border-t border-os-border pt-3">
        <ul className="flex flex-col gap-0.5" role="list">
          <li>
            <NavLink
              to="/dashboard/settings"
              onClick={onNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-os-card text-os-pri'
                    : 'text-os-sec hover:bg-os-card hover:text-os-pri'
                }`
              }
            >
              <Settings size={15} aria-hidden="true" />
              Settings
            </NavLink>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-os-sec transition-colors hover:bg-os-card hover:text-os-pri"
            >
              <ExternalLink size={15} aria-hidden="true" />
              View Portfolio
            </a>
          </li>
          {isSupabaseConfigured && user && (
            <li>
              <button
                type="button"
                onClick={() => signOut()}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-os-sec transition-colors hover:bg-os-card hover:text-os-rose"
              >
                <LogOut size={15} aria-hidden="true" />
                Sign out
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

function DataLossNotice() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed || isSupabaseConfigured) return null
  return (
    <div
      data-testid="data-loss-notice"
      className="flex items-center justify-between gap-3 border-b border-os-amber/20 bg-os-amber/5 px-4 py-2 sm:px-6"
      role="status"
    >
      <p className="text-xs text-os-amber">
        <strong>Demo mode:</strong> Data is not saved between sessions. Refresh = data reset.
      </p>
      <button
        type="button"
        aria-label="Dismiss demo mode notice"
        onClick={() => setDismissed(true)}
        className="shrink-0 text-os-amber/60 transition-colors hover:text-os-amber"
      >
        <X size={13} aria-hidden="true" />
      </button>
    </div>
  )
}
