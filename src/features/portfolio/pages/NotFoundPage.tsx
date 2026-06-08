import { Link } from 'react-router-dom'
import Button from '@/components/Button'

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      <p className="text-7xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-text-primary">Page not found</h1>
      <p className="mt-2 text-text-secondary">
        The page you&rsquo;re looking for doesn&rsquo;t exist or was moved.
      </p>
      <Link to="/" className="mt-6">
        <Button variant="primary" size="md">
          Back to Portfolio
        </Button>
      </Link>
    </main>
  )
}
