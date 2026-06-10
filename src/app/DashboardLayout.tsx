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
  Sun,
  CalendarCheck,
  Flame,
  BookMarked,
  Brain,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { isSupabaseConfigured } from '@/lib/supabase'
import DemoBadge from '@/components/DemoBadge'

type NavItemConfig = {
  to: string
  label: string
  sublabel: string
  icon: React.ElementType
  end: boolean
  activeClass: string
  soon?: boolean
}

const navGroups: { label: string; items: NavItemConfig[] }[] = [
  {
    label: 'COMMAND',
    items: [
      {
        to: '/dashboard',
        label: 'Command Chamber',
        sublabel: 'Daily overview',
        icon: LayoutDashboard,
        end: true,
        activeClass: 'bg-ro-pink/10 text-ro-pink',
      },
      {
        to: '/dashboard/today',
        label: 'Today Ritual',
        sublabel: 'Plan your day',
        icon: Sun,
        end: false,
        activeClass: 'bg-ro-pink/10 text-ro-pink',
      },
    ],
  },
  {
    label: 'PRACTICE',
    items: [
      {
        to: '/dashboard/tasks',
        label: 'Ritual Tasks',
        sublabel: 'Task manager',
        icon: CheckSquare,
        end: false,
        activeClass: 'bg-ro-pink/10 text-ro-pink',
      },
      {
        to: '/dashboard/prompts',
        label: 'Prompt Grimoire',
        sublabel: 'Prompt library',
        icon: Sparkles,
        end: false,
        activeClass: 'bg-ro-oracle/10 text-ro-oracle',
      },
      {
        to: '/dashboard/projects',
        label: 'Project Reliquary',
        sublabel: 'Active projects',
        icon: FolderKanban,
        end: false,
        activeClass: 'bg-ro-success/10 text-ro-success',
      },
    ],
  },
  {
    label: 'LIFE SYSTEMS',
    items: [
      {
        to: '/dashboard/budget',
        label: 'Budget Pulse',
        sublabel: 'Expenses & income',
        icon: Wallet,
        end: false,
        activeClass: 'bg-ro-gold/10 text-ro-gold',
      },
      {
        to: '/dashboard/jobs',
        label: 'Career Pipeline',
        sublabel: 'Job tracker',
        icon: Briefcase,
        end: false,
        activeClass: 'bg-ro-bloom/10 text-ro-bloom',
      },
    ],
  },
  {
    label: 'RITUALS',
    items: [
      {
        to: '/dashboard/review',
        label: 'Weekly Séance',
        sublabel: 'Weekly review',
        icon: CalendarCheck,
        end: false,
        activeClass: 'bg-ro-bloom/10 text-ro-bloom',
      },
      {
        to: '/dashboard/habits',
        label: 'Habit Rituals',
        sublabel: 'Daily habits',
        icon: Flame,
        end: false,
        activeClass: 'bg-ro-gold/10 text-ro-gold',
        soon: true,
      },
    ],
  },
  {
    label: 'ORACLE',
    items: [
      {
        to: '/dashboard/oracle',
        label: 'AI Oracle',
        sublabel: 'AI assistant',
        icon: Brain,
        end: false,
        activeClass: 'bg-ro-oracle/10 text-ro-oracle',
        soon: true,
      },
      {
        to: '/dashboard/vault',
        label: 'Knowledge Vault',
        sublabel: 'Notes & resources',
        icon: BookMarked,
        end: false,
        activeClass: 'bg-ro-sec/10 text-ro-sec',
        soon: true,
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
  soon,
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
            : 'text-ro-sec hover:bg-ro-card hover:text-ro-pri'
        }`
      }
    >
      <Icon size={14} aria-hidden="true" />
      <span className="flex-1 truncate">{label}</span>
      {soon && (
        <span className="rounded-full border border-ro-pink/20 bg-ro-pink/8 px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-widest text-ro-pink/60">
          soon
        </span>
      )}
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
    <div className="flex min-h-screen bg-ro-void">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ro-pink/10 bg-ro-surface md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ro-void/80 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex h-full w-64 flex-col border-r border-ro-pink/10 bg-ro-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-ro-pink/10 px-4 py-4">
              <span className="font-display text-base font-semibold text-ro-pri">LifeOS</span>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setSidebarOpen(false)}
                className="rounded-md p-1 text-ro-sec transition-colors hover:text-ro-pri"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>
            <SidebarContent onNavClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 border-b border-ro-pink/10 bg-ro-surface px-4 py-3 md:hidden">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1 text-ro-sec transition-colors hover:text-ro-pri"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <span className="font-display font-semibold text-ro-pri">LifeOS</span>
          {!isSupabaseConfigured && (
            <span className="ml-auto">
              <DemoBadge />
            </span>
          )}
        </header>

        {/* Demo mode notice bar */}
        <DataLossNotice key={location.pathname} />

        {/* Page content */}
        <main id="main-content" tabIndex={-1} className="flex-1 p-4 sm:p-6 lg:p-8">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <span className="text-sm text-ro-sec">Loading…</span>
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
    <div className="flex flex-1 flex-col overflow-y-auto p-3">
      {/* Brand */}
      <div className="mb-4 px-3 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ro-pink/15 text-ro-pink">
            <span className="font-mono text-[10px] font-bold tracking-tighter">LO</span>
          </div>
          <span className="font-display text-base font-semibold text-ro-pri">LifeOS</span>
          {!isSupabaseConfigured && <DemoBadge />}
        </div>
      </div>

      {/* Profile card */}
      <div className="mb-5 rounded-xl border border-ro-pink/15 bg-ro-card px-3 py-3 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ro-pink/15 text-ro-pink ring-1 ring-ro-pink/30">
          <span className="font-mono text-xs font-semibold">RR</span>
        </div>
        <div className="min-w-0">
          <p className="font-display truncate text-sm font-semibold text-ro-pri">Rory</p>
          <p className="truncate text-[11px] text-ro-sec">
            <span className="text-ro-pink/70">✦</span> Rose Obsidian LifeOS
          </p>
        </div>
      </div>

      {/* Grouped navigation */}
      <nav aria-label="Dashboard navigation">
        <div className="flex flex-col gap-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-ro-pink/40">
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
      <div className="mt-auto pt-4">
        <div className="border-t border-ro-pink/10 pt-3">
          <ul className="flex flex-col gap-0.5" role="list">
            <li>
              <NavLink
                to="/dashboard/settings"
                onClick={onNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-ro-card text-ro-pri'
                      : 'text-ro-sec hover:bg-ro-card hover:text-ro-pri'
                  }`
                }
              >
                <Settings size={14} aria-hidden="true" />
                Settings
              </NavLink>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ro-sec transition-colors hover:bg-ro-card hover:text-ro-pri"
              >
                <ExternalLink size={14} aria-hidden="true" />
                View Portfolio
              </a>
            </li>
            {isSupabaseConfigured && user && (
              <li>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ro-sec transition-colors hover:bg-ro-card hover:text-ro-danger"
                >
                  <LogOut size={14} aria-hidden="true" />
                  Sign out
                </button>
              </li>
            )}
          </ul>
        </div>
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
      className="flex items-center justify-between gap-3 border-b border-ro-gold/20 bg-ro-gold/5 px-4 py-2 sm:px-6"
      role="status"
    >
      <p className="text-xs text-ro-gold">
        <strong>Demo mode:</strong> Showing example data. Connect Supabase to use your own data — changes won&rsquo;t persist.
      </p>
      <button
        type="button"
        aria-label="Dismiss demo mode notice"
        onClick={() => setDismissed(true)}
        className="shrink-0 text-ro-gold/60 transition-colors hover:text-ro-gold"
      >
        <X size={12} aria-hidden="true" />
      </button>
    </div>
  )
}
