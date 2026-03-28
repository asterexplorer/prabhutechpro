import React from 'react';
import { ArrowRight, PlayCircle, CheckCircle, Users, TrendingUp, Zap, Star } from 'lucide-react';
import { COMPANY } from '../../data/content';
import { BtnPrimary, BtnGhost } from '../ui';

const AVATAR_COLORS = ['#5b52f0', '#06b6d4', '#e040fb', '#22d3a3'];
const AVATARS = ['A', 'R', 'K', 'S'];

const Hero = () => (
  <section id="home" className="hero">
    {/* Background orbs */}
    <div className="hero-orb hero-orb-1" aria-hidden="true" />
    <div className="hero-orb hero-orb-2" aria-hidden="true" />
    <div className="hero-orb hero-orb-3" aria-hidden="true" />

    {/* Grid lines overlay */}
    <div className="hero-grid" aria-hidden="true" />

    <div className="hero__content">
      {/* Announcement banner */}
      <a href="#features" className="hero__announce">
        <span className="hero__announce-dot" />
        <span>🚀 Announcing Prabhu AI v2.0 — smarter workflows</span>
        <ArrowRight size={14} />
      </a>

      {/* Headline */}
      <h1 className="hero-title animate-fade-in">
        The Ultimate Platform for{' '}
        <span className="gradient-text">Future-Ready</span>{' '}
        Enterprises
      </h1>

      {/* Sub-copy */}
      <p className="hero-description animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {COMPANY.description}
      </p>

      {/* CTAs */}
      <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <BtnPrimary
          id="hero-cta-trial"
          style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8, padding: '1rem 2.2rem' }}
        >
          Start 14-day Free Trial <ArrowRight size={18} />
        </BtnPrimary>
        <BtnGhost
          id="hero-cta-demo"
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '1rem 2.2rem' }}
        >
          <PlayCircle size={18} /> Watch Demo
        </BtnGhost>
      </div>

      {/* Social proof row */}
      <div className="hero-social-proof animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="hero-avatars">
          {AVATARS.map((ch, i) => (
            <span key={i} style={{ background: AVATAR_COLORS[i] }}>{ch}</span>
          ))}
        </div>
        <div className="hero-social-proof__stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} fill="#fbbf24" color="#fbbf24" />
          ))}
          <strong>4.9</strong>
          <span style={{ color: 'var(--text-muted)' }}>from 2,000+ reviews</span>
        </div>
        <span className="hero-badge-check">
          <CheckCircle size={14} color="var(--success)" />
          SOC 2 Certified
        </span>
      </div>

      {/* Trust logos */}
      <div className="hero__trusted animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <span className="hero__trusted-label">Trusted by teams at</span>
        <div className="hero__logos">
          {['Stripe', 'Slack', 'GitHub', 'Notion', 'Salesforce'].map((name) => (
            <span key={name} className="hero__logo-pill">{name}</span>
          ))}
        </div>
      </div>
    </div>

    {/* Dashboard mock */}
    <div className="dashboard-preview animate-float">
      {/* Floating cards */}
      <div className="floating-stat floating-stat-1 glass">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <TrendingUp size={13} color="var(--primary-light)" />
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Revenue</span>
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--primary-light)', fontFamily: 'var(--font-accent)' }}>+142%</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>vs last quarter</div>
      </div>

      <div className="floating-stat floating-stat-2 glass">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <Users size={13} color="var(--secondary)" />
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Now</span>
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--secondary)', fontFamily: 'var(--font-accent)' }}>2,847</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>users online</div>
      </div>

      <div className="floating-stat floating-stat-3 glass">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <Zap size={13} color="var(--success)" />
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Uptime</span>
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--success)', fontFamily: 'var(--font-accent)' }}>99.99%</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SLA tracked</div>
      </div>

      {/* Main frame */}
      <div className="dashboard-frame">
        <div className="dashboard-bar">
          <div className="dashboard-dot" style={{ background: '#ef4444' }} />
          <div className="dashboard-dot" style={{ background: '#f59e0b' }} />
          <div className="dashboard-dot" style={{ background: '#22c55e' }} />
          <span style={{ marginLeft: '0.75rem', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            app.prabhutech.pro/dashboard
          </span>
        </div>
        <div className="dashboard-inner">
          <div className="dashboard-sidebar">
            {['Overview', 'Analytics', 'Automations', 'Integrations', 'Settings'].map((item, i) => (
              <div key={i} className={`sidebar-item${i === 1 ? ' active' : ''}`}>{item}</div>
            ))}
          </div>
          <div className="dashboard-main">
            <div className="dashboard-charts">
              {[
                { label: 'MRR',   value: '$84K',  color: 'var(--primary-light)', bars: [40, 55, 48, 62, 58, 70, 76] },
                { label: 'Users', value: '252K',  color: 'var(--secondary)',     bars: [30, 40, 35, 50, 60, 55, 68] },
                { label: 'Tasks', value: '5.2M',  color: 'var(--accent)',        bars: [50, 60, 70, 65, 80, 75, 90] },
              ].map(({ label, value, color, bars }) => (
                <div key={label} className="chart-card">
                  <div className="chart-label">{label}</div>
                  <div className="chart-value" style={{ color }}>{value}</div>
                  <div className="chart-bar-container">
                    {bars.map((h, i) => (
                      <div key={i} className="chart-bar" style={{ height: `${h}%`, background: color, opacity: i === bars.length - 1 ? 1 : 0.4 }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {['Workflow automation triggered', 'API integration synced', 'Report generated', 'User onboarded'].map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.45rem 0.75rem', borderRadius: 8,
                background: 'rgba(255,255,255,0.025)', fontSize: '0.7rem', color: 'var(--text-secondary)',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: ['var(--primary-light)', 'var(--secondary)', 'var(--accent)', 'var(--success)'][i], display: 'inline-block' }} />
                  {item}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.62rem' }}>{i + 1}m ago</span>
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

export default Hero;
