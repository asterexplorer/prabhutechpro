import React from 'react';
import {
  Cpu, ShieldCheck, CloudLightning, Users, BarChart3, Globe,
} from 'lucide-react';
import { FEATURES } from '../../data/content';
import { SectionHeader } from '../ui';

const ICON_MAP = { Cpu, ShieldCheck, CloudLightning, Users, BarChart3, Globe };

const FeatureCard = ({ icon, title, description, color, index }) => {
  const Icon = ICON_MAP[icon] || Cpu;
  return (
    <article
      className="feature-card reveal"
      style={{ animationDelay: `${index * 0.08}s` }}
      aria-label={title}
    >
      <div
        className="feature-card__icon"
        style={{
          background: `rgba(${color}, 0.1)`,
          boxShadow: `0 0 24px rgba(${color}, 0.12)`,
        }}
      >
        <Icon size={26} color={`rgb(${color})`} />
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{description}</p>
      <div className="feature-card__glow" style={{ background: `radial-gradient(circle at 0 0, rgba(${color},0.12), transparent 70%)` }} />
    </article>
  );
};

const Features = () => (
  <section id="features" className="section">
    <div className="container">
      <SectionHeader
        badge="Powerful Capabilities"
        title={`Everything You Need to <span class="gradient-text">Dominate</span> Your Industry`}
        subtitle="Prabhu Tech Pro provides the most comprehensive toolkit designed for modern, enterprise-grade SaaS businesses."
      />
      <div className="grid-3 reveal">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} {...feature} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Features;
