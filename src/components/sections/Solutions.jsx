import React from 'react';
import { Rocket, Building2, GraduationCap, ArrowRight } from 'lucide-react';
import { SOLUTIONS } from '../../data/content';
import { SectionHeader, BtnPrimary } from '../ui';

const ICON_MAP = { Rocket, Building2, GraduationCap };

const SolutionCard = ({ icon, title, description, badge, index }) => {
  const Icon = ICON_MAP[icon] || Rocket;
  const colors = ['79,70,229', '0,212,255', '224,64,251'];
  const color = colors[index % colors.length];

  return (
    <article className="solution-card reveal glass-card" style={{ '--card-color': `rgb(${color})` }}>
      {badge && <span className="solution-card__badge">{badge}</span>}
      <div className="solution-card__icon" style={{ background: `rgba(${color},0.12)` }}>
        <Icon size={28} color={`rgb(${color})`} />
      </div>
      <h3 className="solution-card__title">{title}</h3>
      <p className="solution-card__desc">{description}</p>
      <a href="#contact" className="solution-card__cta">
        Learn more <ArrowRight size={16} />
      </a>
    </article>
  );
};

const Solutions = () => (
  <section id="solutions" className="section section--alt">
    <div className="container">
      <SectionHeader
        badge="By Use Case"
        title={`Built for <span class="gradient-text">Every Team</span>`}
        subtitle="Whether you're a scrappy startup, a global enterprise, or a growing agency — Prabhu Tech Pro has a solution tailored for you."
      />
      <div className="grid-3">
        {SOLUTIONS.map((sol, i) => (
          <SolutionCard key={sol.title} {...sol} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Solutions;
