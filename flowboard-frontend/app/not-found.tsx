import Link from 'next/link'
import '@/app/style/not-found.css'

export default function NotFound() {
  return (
    <main className="nf-root">
        
      <div className="glow-orb" aria-hidden="true" />

      {/* Content */}
      <div className="nf-content">

        <div className="glitch-wrap" aria-label="404">
          <span className="glitch" data-text="404">404</span>
        </div>

        <h1 className="nf-title">Page not found</h1>
        <p className="nf-sub">
          This board doesn't exist — or you don't have access to it.
        </p>

        <div className="nf-actions">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/dashboard" className="btn-ghost">
            Go to dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
