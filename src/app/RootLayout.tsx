import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '@/components/AuthProvider'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-surface-900">
            <span className="text-sm text-text-muted">Loading...</span>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </AuthProvider>
  )
}
