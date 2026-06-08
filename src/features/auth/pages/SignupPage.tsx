import { useState, type FormEvent } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { isSupabaseConfigured } from '@/lib/supabase'

export default function SignupPage() {
  const { user, loading, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!isSupabaseConfigured) {
    return <Navigate to="/dashboard" replace />
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-900">
        <span className="text-sm text-text-muted">Loading...</span>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const { error: signUpError } = await signUp(email, password)
    if (signUpError) {
      setError(signUpError)
    } else {
      setSuccess(true)
    }
    setSubmitting(false)
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-900 px-4">
        <div className="w-full max-w-sm rounded-xl border border-surface-700/50 bg-surface-800 p-6 text-center shadow-lg">
          <h1 className="mb-3 text-xl font-bold text-text-primary">Check your email</h1>
          <p className="mb-4 text-sm text-text-secondary">
            We sent a confirmation link to <strong className="text-text-primary">{email}</strong>.
            Click the link to activate your account.
          </p>
          <Link
            to="/login"
            className="text-sm text-accent hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-900 px-4">
      <div className="w-full max-w-sm rounded-xl border border-surface-700/50 bg-surface-800 p-6 shadow-lg">
        <h1 className="mb-6 text-center text-xl font-bold text-text-primary">
          Create your account
        </h1>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-surface-600 bg-surface-700 px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-text-secondary"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-surface-600 bg-surface-700 px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="At least 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {submitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>

        <p className="mt-3 text-center text-xs text-text-muted">
          <Link to="/" className="hover:text-text-secondary hover:underline">
            Back to portfolio
          </Link>
        </p>
      </div>
    </div>
  )
}
