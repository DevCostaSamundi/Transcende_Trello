import '@/app/style/page.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="home-root">

      {/* Background grid cards */}
      <div className="bg-grid" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="bg-card" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>

      {/* Glow orb */}
      <div className="glow-orb" aria-hidden="true" />

      {/* Content */}
      <div className="hero">
        <div className="logo-badge">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">FlowBoard</span>
        </div>

        <h1 className="hero-title">
          Your team&apos;s work,<br />
          <span className="hero-accent">in one place.</span>
        </h1>

        <p className="hero-sub">
          Boards, lists and cards — synced in real time across your entire team.
        </p>

        <div className="hero-actions">
          <Link href="/signup" className="btn-primary">
            Get started free
          </Link>
          <Link href="/login" className="btn-ghost">
            Sign in
          </Link>
        </div>

        <p className="hero-hint">No credit card required · 5 members free</p>
      </div>
    </main>
  )
}