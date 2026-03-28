import React from 'react';
import { ArrowRight, PlayCircle, CheckCircle, Users, TrendingUp, Zap } from 'lucide-react';

const Hero = () => {
  const avatarInitials = ['A', 'R', 'K', 'S'];

  return (
    <section className="hero container animate-fade-in">
      {/* Background orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Badge */}
      <div className="badge" style={{ position: 'relative', zIndex: 1 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={13} fill="currentColor" style={{ marginTop: '-1px' }} />
          Trusted by 250K+ enterprises globally
        </span>
      </div>

      {/* Title */}
      <h1 className="hero-title" style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
        The Ultimate Platform for{' '}
        <span className="gradient-text">Future-Ready</span>{' '}
        Enterprises
      </h1>

      {/* Description */}
      <p className="hero-description">
        Prabhu Tech Pro unifies AI automation, real-time collaboration,
        and enterprise-grade security — so your teams ship faster and scale
        smarter.
      </p>

      {/* CTA Buttons */}
      <div className="hero-actions">
        <button className="btn-primary" style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Start 14-day Free Trial <ArrowRight size={18} />
        </button>
        <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlayCircle size={18} /> Watch Demo
        </button>
      </div>

      {/* Social proof */}
      <div className="hero-social-proof">
        <div className="hero-avatars">
          {avatarInitials.map((ch, i) => (
            <span key={i} style={{ background: `hsl(${240 + i * 40}, 80%, 55%)` }}>{ch}</span>
          ))}
        </div>
        <span>
          <strong style={{ color: 'var(--text-primary)' }}>4.9 ★</strong>
          {' '}from 2,000+ verified reviews
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle size={13} color="var(--success)" />
          SOC 2 Certified
        </span>
      </div>

      {/* Dashboard preview */}
      <div className="dashboard-preview animate-float" style={{ position: 'relative', width: '100%', maxWidth: '900px', zIndex: 1 }}>

        {/* Floating stat cards */}
        <div className="floating-stat floating-stat-1 glass">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <TrendingUp size={14} color="var(--primary-light)" />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Revenue</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary-light)', fontFamily: 'var(--font-accent)' }}>+142%</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>vs last quarter</div>
        </div>

        <div className="floating-stat floating-stat-2 glass">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <Users size={14} color="var(--secondary)" />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Now</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--secondary)', fontFamily: 'var(--font-accent)' }}>2,847</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>users online</div>
        </div>

        <div className="floating-stat floating-stat-3 glass">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <Zap size={14} color="var(--success)" />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Uptime</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--success)', fontFamily: 'var(--font-accent)' }}>99.99%</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>SLA tracked</div>
        </div>

        {/* Main dashboard frame */}
        <div className="dashboard-frame">
          {/* Window chrome */}
          <div className="dashboard-bar">
            <div className="dashboard-dot" style={{ background: '#ef4444' }} />
            <div className="dashboard-dot" style={{ background: '#f59e0b' }} />
            <div className="dashboard-dot" style={{ background: '#22c55e' }} />
            <span style={{ marginLeft: '0.75rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              app.prabhutech.pro/dashboard
            </span>
          </div>

          {/* App body */}
          <div className="dashboard-inner">
            <div className="dashboard-sidebar">
              {['Overview', 'Analytics', 'Automations', 'Integrations', 'Settings'].map((item, i) => (
                <div key={i} className={`sidebar-item${i === 1 ? ' active' : ''}`}>
                  {item}
                </div>
              ))}
            </div>

            <div className="dashboard-main">
              <div className="dashboard-charts">
                {[
                  { label: 'MRR', value: '$84K', color: 'var(--primary-light)', bars: [40, 55, 48, 62, 58, 70, 76] },
                  { label: 'Users', value: '252K', color: 'var(--secondary)', bars: [30, 40, 35, 50, 60, 55, 68] },
                  { label: 'Tasks', value: '5.2M', color: 'var(--accent)', bars: [50, 60, 70, 65, 80, 75, 90] },
                ].map(({ label, value, color, bars }) => (
                  <div key={label} className="chart-card">
                    <div className="chart-label">{label}</div>
                    <div className="chart-value" style={{ color }}>{value}</div>
                    <div className="chart-bar-container">
                      {bars.map((h, i) => (
                        <div key={i} className="chart-bar" style={{
                          height: `${h}%`,
                          background: color,
                          opacity: i === bars.length - 1 ? 1 : 0.45
                        }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity rows */}
              {['Workflow automation triggered', 'API integration synced', 'Report generated', 'User onboarded'].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.025)',
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: ['var(--primary-light)', 'var(--secondary)', 'var(--accent)', 'var(--success)'][i], display: 'inline-block' }} />
                    {item}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>{i + 1}m ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
