import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/app/RootLayout'
import PortfolioLayout from '@/app/PortfolioLayout'
import DashboardLayout from '@/app/DashboardLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import PortfolioPage from '@/features/portfolio/pages/PortfolioPage'
import NotFoundPage from '@/features/portfolio/pages/NotFoundPage'

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const SignupPage = lazy(() => import('@/features/auth/pages/SignupPage'))

const DashboardHomePage    = lazy(() => import('@/features/dashboard/pages/DashboardHomePage'))
const TasksPage            = lazy(() => import('@/features/dashboard/pages/TasksPage'))
const PromptsPage          = lazy(() => import('@/features/dashboard/pages/PromptsPage'))
const JobsPage             = lazy(() => import('@/features/dashboard/pages/JobsPage'))
const BudgetPage           = lazy(() => import('@/features/dashboard/pages/BudgetPage'))
const ProjectsDashboardPage = lazy(() => import('@/features/dashboard/pages/ProjectsDashboardPage'))
const SettingsPage         = lazy(() => import('@/features/dashboard/pages/SettingsPage'))
const TodayRitualPage      = lazy(() => import('@/features/dashboard/pages/TodayRitualPage'))
const WeeklySeancePage     = lazy(() => import('@/features/dashboard/pages/WeeklySeancePage'))
const AIOraclePage         = lazy(() => import('@/features/dashboard/pages/AIOraclePage'))
const HabitRitualsPage     = lazy(() => import('@/features/dashboard/pages/HabitRitualsPage'))
const KnowledgeVaultPage   = lazy(() => import('@/features/dashboard/pages/KnowledgeVaultPage'))

// basename follows Vite's base: '/LifeOS-Dashboard/' under --mode ghpages (GitHub Pages),
// '/' everywhere else (dev + Vercel). See vite.config.ts.
export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <PortfolioLayout />,
          children: [{ index: true, element: <PortfolioPage /> }],
        },
        { path: '/login',  element: <LoginPage /> },
        { path: '/signup', element: <SignupPage /> },
        {
          path: '/dashboard',
          element: (
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          ),
          children: [
            { index: true,         element: <DashboardHomePage /> },
            { path: 'tasks',       element: <TasksPage /> },
            { path: 'prompts',     element: <PromptsPage /> },
            { path: 'jobs',        element: <JobsPage /> },
            { path: 'budget',      element: <BudgetPage /> },
            { path: 'projects',    element: <ProjectsDashboardPage /> },
            { path: 'settings',    element: <SettingsPage /> },
            { path: 'today',       element: <TodayRitualPage /> },
            { path: 'review',      element: <WeeklySeancePage /> },
            { path: 'oracle',      element: <AIOraclePage /> },
            { path: 'habits',      element: <HabitRitualsPage /> },
            { path: 'vault',       element: <KnowledgeVaultPage /> },
          ],
        },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
