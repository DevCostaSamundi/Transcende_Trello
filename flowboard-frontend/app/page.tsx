import '@/app/style/page.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="home-root">

      {/* Glow orbs */}
      <div className="glow-orb glow-orb-1" aria-hidden="true" />
      <div className="glow-orb glow-orb-2" aria-hidden="true" />

      {/* Floating cards background */}
      <div className="floating-cards" aria-hidden="true">
        <div className="floating-card fc-1" />
        <div className="floating-card fc-2" />
        <div className="floating-card fc-3" />
        <div className="floating-card fc-4" />
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="nav-logo-icon">⬡</span>
          <span className="nav-logo-text">FlowBoard</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div className="nav-actions">
          <Link href="/login" className="nav-signin">Sign in</Link>
          <Link href="/signup" className="nav-cta">Get started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          <span className="badge-icon">✨</span>
          <span>Over 50,000 teams trust FlowBoard</span>
        </div>

        <h1 className="hero-title">
          Organize your work,<br />
          <span className="hero-accent">accelerate your team.</span>
        </h1>

        <p className="hero-sub">
          Visualize projetos, gerencie tarefas e colabore com sua equipe 
          em tempo real. Sem complicação, sem limitações.
        </p>

        <div className="hero-actions">
          <Link href="/signup" className="btn-primary">
            Start for free
            <span className="btn-arrow">→</span>
          </Link>
          <Link href="#how-it-works" className="btn-ghost">
            See how it works
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50k+</span>
            <span className="stat-label">Active teams</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">2M+</span>
            <span className="stat-label">Tasks completed</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">99.9%</span>
            <span className="stat-label">Uptime</span>
          </div>
        </div>

        {/* Hero preview card */}
        <div className="hero-preview">
          <div className="preview-header">
            <div className="preview-dots">
              <span /><span /><span />
            </div>
            <span className="preview-title">Product Launch</span>
          </div>
          <div className="preview-columns">
            <div className="preview-col">
              <div className="preview-col-header">
                <span className="col-icon todo" />
                <span>To Do</span>
              </div>
              <div className="preview-card">
                <span className="card-label design" />
                <span className="card-title">Design landing page</span>
                <div className="card-meta">
                  <span className="card-avatars">
                    <span className="avatar" style={{background: '#FF6B6B'}}>A</span>
                  </span>
                  <span className="card-date">📅 Dec 15</span>
                </div>
              </div>
              <div className="preview-card">
                <span className="card-label dev" />
                <span className="card-title">API integration</span>
                <div className="card-meta">
                  <span className="card-avatars">
                    <span className="avatar" style={{background: '#4ECDC4'}}>B</span>
                  </span>
                  <span className="card-date">📅 Dec 18</span>
                </div>
              </div>
            </div>
            <div className="preview-col">
              <div className="preview-col-header">
                <span className="col-icon progress" />
                <span>In Progress</span>
              </div>
              <div className="preview-card">
                <span className="card-label marketing" />
                <span className="card-title">Marketing campaign</span>
                <div className="card-meta">
                  <span className="card-avatars">
                    <span className="avatar" style={{background: '#FFE66D'}}>C</span>
                    <span className="avatar" style={{background: '#95E1D3'}}>+2</span>
                  </span>
                  <span className="card-date">📅 Dec 20</span>
                </div>
              </div>
            </div>
            <div className="preview-col">
              <div className="preview-col-header">
                <span className="col-icon done" />
                <span>Done</span>
              </div>
              <div className="preview-card done-card">
                <span className="card-label research" />
                <span className="card-title">User research</span>
                <div className="card-meta">
                  <span className="card-avatars">
                    <span className="avatar" style={{background: '#A8E6CF'}}>D</span>
                  </span>
                  <span className="card-check">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <span className="section-badge">Features</span>
          <h2>Everything you need to ship faster</h2>
          <p>Powerful tools that grow with your team, from startup to enterprise.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Unlimited Boards</h3>
            <p>Create as many boards as you need. Organize projects by team, client, or workflow.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Collaboration</h3>
            <p>See changes instantly. Comments, mentions, and notifications keep everyone synced.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <h3>Power-Ups</h3>
            <p>Extend functionality with calendars, time tracking, charts, and integrations.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Apps</h3>
            <p>Access your boards anywhere with native apps for iOS and Android.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Enterprise Security</h3>
            <p>SOC 2 compliant with SSO, 2FA, and advanced permission controls.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Automation</h3>
            <p>Automate repetitive tasks with rules and triggers. Save hours every week.</p>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <span className="section-badge">How it works</span>
          <h2>Up and running in minutes</h2>
          <p>No complex setup. No training required. Just drag, drop, and done.</p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create a board</h3>
            <p>Start from scratch or pick a template for common workflows.</p>
          </div>
          <div className="step-connector" />
          <div className="step">
            <div className="step-number">2</div>
            <h3>Add your team</h3>
            <p>Invite colleagues with a simple link. Assign roles and permissions.</p>
          </div>
          <div className="step-connector" />
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get to work</h3>
            <p>Create cards, assign tasks, set due dates, and track progress visually.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2>Loved by teams worldwide</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              "FlowBoard transformed how our engineering team manages sprints. We've cut our standup time in half and ship 30% faster."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>M</div>
              <div className="author-info">
                <span className="author-name">Maria Silva</span>
                <span className="author-role">Engineering Manager @ TechCorp</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              "The best Kanban tool we've used. Simple enough for designers, powerful enough for developers."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}>J</div>
              <div className="author-info">
                <span className="author-name">João Santos</span>
                <span className="author-role">Creative Director @ Studio9</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              "Finally, a project management tool that doesn't require a PhD to understand. Our whole team is onboard in minutes."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{background: 'linear-gradient(135deg, #4facfe, #00f2fe)'}}>A</div>
              <div className="author-info">
                <span className="author-name">Ana Costa</span>
                <span className="author-role">Startup Founder @ LaunchPad</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to organize your work?</h2>
          <p>Join thousands of teams already using FlowBoard. Free forever for small teams.</p>
          <div className="cta-actions">
            <Link href="/signup" className="btn-primary btn-large">
              Get started free
              <span className="btn-arrow">→</span>
            </Link>
            <span className="cta-note">No credit card required</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="nav-logo">
              <span className="nav-logo-icon">⬡</span>
              <span className="nav-logo-text">FlowBoard</span>
            </div>
            <p>Organize anything, together.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Integrations</a>
              <a href="#">Security</a>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">API</a>
              <a href="#">Blog</a>
              <a href="#">Community</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
              <a href="#">Press</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 FlowBoard. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>

    </main>
  )
}