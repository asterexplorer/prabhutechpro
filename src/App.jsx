import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Skills from './components/Skills';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const ErrorFallback = ({ error }) => (
  <div style={{ padding: '2rem', background: '#1a1a1a', color: '#ff4d4d', minHeight: '100vh' }}>
    <h1>Render Error</h1>
    <pre>{error?.message}</pre>
    <pre>{error?.stack}</pre>
  </div>
);

const App = () => {
  const [stats, setStats] = useState({
    activeUsers: '250K+',
    uptimeSla: '99.9%',
    automationsRun: '5M+',
    capRaised: '$12M+'
  });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [renderError, setRenderError] = useState(null);

  /* ---------- fetch live stats ---------- */
  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/stats');
      const d = await res.json();
      setStats({
        activeUsers: (d.activeUsers / 1000).toFixed(1) + 'K+',
        uptimeSla: d.uptimeSla + '%',
        automationsRun: (d.automationsRun / 1_000_000).toFixed(1) + 'M+',
        capRaised: '$' + d.capRaised + 'M+'
      });
    } catch {
      console.warn('Backend not reachable – using fallback stats');
    }
  };

  useEffect(() => {
    fetchStats();
    const t = setInterval(fetchStats, 5000);
    return () => clearInterval(t);
  }, []);

  /* ---------- scroll-reveal ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    const els = document.querySelectorAll('.reveal');
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ---------- newsletter ---------- */
  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('Processing…');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const d = await res.json();
      setStatus(d.message);
      setEmail('');
    } catch {
      setStatus('Error connecting to server. Try again later.');
    }
  };

  if (renderError) return <ErrorFallback error={renderError} />;

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', background: 'var(--bg-dark)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar />
      <main>
        <Hero />

        {/* ── Live Statistics ── */}
        <section className="stats-section reveal">
          <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem', textAlign: 'center' }}>
            {[
              { label: 'Active Users',     value: stats.activeUsers,     color: 'var(--primary-light)' },
              { label: 'Uptime SLA',       value: stats.uptimeSla,       color: 'var(--secondary)' },
              { label: 'Automations Run',  value: stats.automationsRun,  color: 'var(--accent)' },
              { label: 'Capital Raised',   value: stats.capRaised,       color: 'var(--success)' },
            ].map(({ label, value, color }) => (
              <div key={label} className="stat-item">
                <h2 style={{ color }}>{value}</h2>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <div className="reveal">
          <Features />
        </div>

        {/* ── Skills ── */}
        <div className="reveal">
          <Skills />
        </div>

        {/* ── Pricing ── */}
        <div className="reveal">
          <Pricing />
        </div>

        {/* ── Testimonials ── */}
        <div className="reveal">
          <Testimonials />
        </div>

        {/* ── FAQ ── */}
        <div className="reveal">
          <FAQ />
        </div>

        {/* ── CTA ── */}
        <section id="contact" className="container reveal" style={{ padding: '100px 1.5rem', marginBottom: '80px' }}>
          <div className="glass" style={{
            padding: '80px 4rem',
            borderRadius: '32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(91, 82, 240, 0.25)'
          }}>
            {/* Glow */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '32px',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, var(--primary-glow) 0%, transparent 70%)',
              zIndex: 0, opacity: 0.45, pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="badge">Start Today</span>
              <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Ready to transform your workflow?</h2>
              <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
                Join thousands of industry leaders who trust Prabhu Tech Pro to scale their business.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-primary" style={{ padding: '1.1rem 2.8rem', fontSize: '1.05rem' }}>
                  Create Free Account
                </button>
                <button className="btn-ghost" style={{ padding: '1.1rem 2.8rem', fontSize: '1.05rem' }}>
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer email={email} setEmail={setEmail} handleNewsletter={handleNewsletter} status={status} />
    </div>
  );
};

export default App;
