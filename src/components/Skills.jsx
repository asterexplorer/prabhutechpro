import React, { useState } from 'react';
import {
  Code2, Database, Cloud, Shield, Cpu, Globe,
  Layers, GitBranch, Zap, BarChart3, Lock, Wifi,
  Terminal, Package, Rocket, Star
} from 'lucide-react';

const categories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Code2,
    color: '#5b52f0',
    glow: 'rgba(91,82,240,0.3)',
    skills: [
      { name: 'React / Next.js',    level: 98, desc: 'Component architecture, SSR, RSC' },
      { name: 'TypeScript',         level: 95, desc: 'Type-safe enterprise applications' },
      { name: 'Tailwind & CSS',     level: 92, desc: 'Design systems & responsive UI' },
      { name: 'Vue / Nuxt',         level: 82, desc: 'Progressive web apps' },
      { name: 'React Native',       level: 78, desc: 'Cross-platform mobile' },
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Terminal,
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.3)',
    skills: [
      { name: 'Node.js / Express',  level: 97, desc: 'High-performance REST & GraphQL APIs' },
      { name: 'Python / FastAPI',   level: 91, desc: 'ML pipelines & microservices' },
      { name: 'Go',                 level: 80, desc: 'Concurrent systems and CLI tools' },
      { name: 'GraphQL',            level: 88, desc: 'Schema design & federation' },
      { name: 'WebSockets',         level: 85, desc: 'Real-time bidirectional comms' },
    ]
  },
  {
    id: 'data',
    label: 'Data & AI',
    icon: Cpu,
    color: '#e040fb',
    glow: 'rgba(224,64,251,0.3)',
    skills: [
      { name: 'PostgreSQL',         level: 96, desc: 'Advanced queries, indexes, RLS' },
      { name: 'MongoDB',            level: 90, desc: 'Document modeling & Atlas' },
      { name: 'Redis',              level: 87, desc: 'Caching, pub/sub, queues' },
      { name: 'OpenAI / LLM APIs', level: 93, desc: 'Prompt engineering & RAG' },
      { name: 'Data Pipelines',     level: 82, desc: 'ETL, Kafka, Airflow' },
    ]
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    icon: Cloud,
    color: '#22d3a3',
    glow: 'rgba(34,211,163,0.3)',
    skills: [
      { name: 'AWS / GCP',          level: 94, desc: 'EC2, Lambda, Cloud Run, GKE' },
      { name: 'Docker & Kubernetes',level: 91, desc: 'Container orchestration at scale' },
      { name: 'CI/CD Pipelines',   level: 93, desc: 'GitHub Actions, GitLab, Jenkins' },
      { name: 'Terraform',          level: 86, desc: 'Infrastructure as Code' },
      { name: 'Observability',      level: 84, desc: 'Prometheus, Grafana, Datadog' },
    ]
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    skills: [
      { name: 'OAuth2 / OIDC',      level: 95, desc: 'SSO, JWT, PKCE flows' },
      { name: 'Zero Trust',         level: 89, desc: 'RBAC, ABAC, mTLS' },
      { name: 'OWASP / Pentesting', level: 84, desc: 'Vulnerability assessment' },
      { name: 'SOC 2 Compliance',   level: 90, desc: 'Audit trails, data governance' },
      { name: 'Encryption',         level: 92, desc: 'AES-256, TLS 1.3, FIPS 140-2' },
    ]
  },
];

const techIcons = [
  { name: 'React',      color: '#61dafb', letter: 'R' },
  { name: 'Node.js',   color: '#68a063', letter: 'N' },
  { name: 'TypeScript',color: '#3178c6', letter: 'TS' },
  { name: 'AWS',       color: '#f90',    letter: 'A' },
  { name: 'Docker',    color: '#0db7ed', letter: 'D' },
  { name: 'Python',    color: '#3776ab', letter: 'Py' },
  { name: 'GraphQL',   color: '#e10098', letter: 'G' },
  { name: 'Redis',     color: '#d82c20', letter: 'Re' },
  { name: 'Postgres',  color: '#336791', letter: 'PG' },
  { name: 'Kubernetes',color: '#326ce5', letter: 'K8' },
  { name: 'Go',        color: '#00acd7', letter: 'Go' },
  { name: 'Terraform', color: '#7b42bc', letter: 'Tf' },
];

const SkillBar = ({ name, level, desc, color, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ marginBottom: '1.4rem', cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.45rem' }}>
        <span style={{ fontWeight: 600, fontSize: '0.95rem', color: hovered ? 'white' : 'var(--text-primary)', transition: 'color 0.2s' }}>
          {name}
        </span>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color, fontFamily: 'var(--font-accent)' }}>
          {level}%
        </span>
      </div>
      {hovered && (
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem', lineHeight: 1.4 }}>
          {desc}
        </p>
      )}
      <div style={{
        height: '6px',
        background: 'rgba(255,255,255,0.07)',
        borderRadius: '99px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${level}%`,
          borderRadius: '99px',
          background: `linear-gradient(90deg, ${color}99 0%, ${color} 100%)`,
          boxShadow: `0 0 10px ${color}66`,
          transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          animationDelay: `${delay * 0.1}s`,
        }} />
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const active = categories.find(c => c.id === activeTab);

  return (
    <section id="skills" style={{ padding: '110px 0', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <span className="badge">
            <Star size={12} style={{ marginRight: 6 }} fill="currentColor" />
            Tech Stack
          </span>
          <h2 className="section-title">
            Built with <span className="gradient-text">battle-tested</span> expertise
          </h2>
          <p className="section-subtitle">
            Enterprise-grade capabilities across the full stack — from pixel-perfect UIs
            to zero-downtime Kubernetes deployments.
          </p>
        </div>

        {/* Tech logo orbit */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
          marginBottom: '4rem'
        }}>
          {techIcons.map((t, i) => (
            <div
              key={t.name}
              title={t.name}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: `${t.color}18`,
                border: `1px solid ${t.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: t.letter.length > 1 ? '0.7rem' : '1rem',
                fontWeight: 800,
                color: t.color,
                fontFamily: 'var(--font-accent)',
                cursor: 'default',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                animation: `float ${4 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.1)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${t.color}44`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {t.letter}
            </div>
          ))}
        </div>

        {/* Tab switcher */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          marginBottom: '2.5rem',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.25s ease',
                  background: isActive ? `${cat.color}22` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? cat.color + '60' : 'rgba(255,255,255,0.08)'}`,
                  color: isActive ? cat.color : 'var(--text-secondary)',
                  cursor: 'pointer',
                  boxShadow: isActive ? `0 4px 16px ${cat.glow}` : 'none',
                }}
              >
                <Icon size={15} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
        }}
          className="skills-grid"
        >
          {/* Skill bars */}
          <div className="glass feature-card" style={{ padding: '2.25rem', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              {React.createElement(active.icon, { size: 22, color: active.color })}
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: active.color }}>{active.label} Skills</h3>
            </div>
            {active.skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                {...skill}
                color={active.color}
                delay={i}
              />
            ))}
          </div>

          {/* Stats / summary card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Average mastery */}
            <div className="glass feature-card" style={{ padding: '2rem', borderRadius: '20px', flex: '0 0 auto' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                Average Mastery — {active.label}
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                <span style={{ fontSize: '3.5rem', fontWeight: 900, color: active.color, lineHeight: 1, fontFamily: 'var(--font-accent)' }}>
                  {Math.round(active.skills.reduce((s, sk) => s + sk.level, 0) / active.skills.length)}%
                </span>
                <span style={{ color: 'var(--text-muted)', marginBottom: '0.4rem' }}>proficiency</span>
              </div>
              <div style={{ marginTop: '1rem', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.round(active.skills.reduce((s, sk) => s + sk.level, 0) / active.skills.length)}%`,
                  background: `linear-gradient(90deg, ${active.color}88, ${active.color})`,
                  borderRadius: '99px',
                  boxShadow: `0 0 16px ${active.glow}`,
                  transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                }} />
              </div>
            </div>

            {/* Quick highlights */}
            {[
              { icon: Rocket, label: '50+ Projects Delivered', sub: 'Across 12+ countries' },
              { icon: GitBranch, label: '10M+ Lines of Code', sub: 'Production systems' },
              { icon: Zap, label: '99.99% Uptime Record', sub: 'Across all deployments' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="glass feature-card" style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: `${active.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={20} color={active.color} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{label}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
