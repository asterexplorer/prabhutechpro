import React from 'react';
import { CheckCircle, Award, Globe, Users } from 'lucide-react';
import { COMPANY } from '../../data/content';
import { SectionHeader, BtnPrimary, BtnGhost } from '../ui';

const PILLARS = [
  { icon: Award,  title: 'Built for Scale',    desc: 'Architecture designed to handle millions of events per second without breaking a sweat.' },
  { icon: Globe,  title: 'Global by Default',  desc: 'Edge nodes in 40+ countries ensure sub-100ms response times for every user on the planet.' },
  { icon: Users,  title: 'Customer Obsessed',  desc: 'Our NPS score of 72 speaks for itself — we live and breathe customer success.' },
];

const MILESTONES = [
  { year: '2021', event: 'Founded in San Francisco by three ex-Google engineers' },
  { year: '2022', event: 'Launched v1.0 — 500 customers onboarded in the first week' },
  { year: '2023', event: 'Series A: $8M raised. SOC 2 Type II certified' },
  { year: '2024', event: 'Expanded to Europe and Asia-Pacific. 100K+ users' },
  { year: '2025', event: 'Series B: $12M. Launched Prabhu AI suite' },
];

const About = () => (
  <section id="about" className="section section--alt">
    <div className="container">
      <SectionHeader
        badge="Our Story"
        title={`Why We Built <span class="gradient-text">Prabhu Tech Pro</span>`}
        subtitle="We saw firsthand how fragmented tooling was killing engineering velocity. So we built the platform we always wished existed."
      />

      {/* Pillars */}
      <div className="about__pillars reveal">
        {PILLARS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="about__pillar glass-card">
            <Icon size={28} style={{ color: 'var(--primary-light)', marginBottom: '1rem' }} />
            <h3>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="about__timeline reveal">
        <h3 className="about__timeline-title">Our Journey</h3>
        {MILESTONES.map(({ year, event }, i) => (
          <div key={year} className="about__milestone">
            <div className="about__milestone-year">{year}</div>
            <div className="about__milestone-dot" />
            <div className="about__milestone-event">{event}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
