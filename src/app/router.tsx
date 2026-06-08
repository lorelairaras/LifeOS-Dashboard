import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import PortfolioLayout from '@/app/PortfolioLayout'
import DashboardLayout from '@/app/DashboardLayout'
import PortfolioPage from '@/features/portfolio/pages/PortfolioPage'
import NotFoundPage from '@/features/portfolio/pages/NotFoundPage'

// Lazy-load dashboard pages — DashboardLayout wraps Outlet in <Suspense>
const DashboardHomePage = lazy(() => import('@/features/dashboard/pages/DashboardHomePage'))
const TasksPage = lazy(() => import('@/features/dashboard/pages/TasksPage'))
const PromptsPage = lazy(() => import('@/features/dashboard/pages/PromptsPage'))
const JobsPage = lazy(() => import('@/features/dashboard/pages/JobsPage'))
const BudgetPage = lazy(() => import('@/features/dashboard/pages/BudgetPage'))
const ProjectsDashboardPage = lazy(
  () => import('@/features/dashboard/pages/ProjectsDashboardPage')
)
const SettingsPage = lazy(() => import('@/features/dashboard/pages/SettingsPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PortfolioLayout />,
    children: [{ index: true, element: <PortfolioPage /> }],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHomePage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'prompts', element: <PromptsPage /> },
      { path: 'jobs', element: <JobsPage /> },
      { path: 'budget', element: <BudgetPage /> },
      { path: 'projects', element: <ProjectsDashboardPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
