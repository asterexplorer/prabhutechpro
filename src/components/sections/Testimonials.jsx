import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/content';
import { SectionHeader } from '../ui';

const TestimonialCard = ({ author, role, rating, quote, avatar, gradient, index }) => (
  <article className="testimonial-card glass-card reveal" style={{ animationDelay: `${index * 0.1}s` }}>
    <div className="testimonial-card__stars">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill={i < rating ? '#fbbf24' : 'none'} color={i < rating ? '#fbbf24' : 'var(--text-muted)'} />
      ))}
    </div>
    <Quote size={22} style={{ color: 'var(--primary)', opacity: 0.25, marginBottom: '0.75rem' }} />
    <p className="testimonial-card__quote">"{quote}"</p>
    <div className="testimonial-card__author">
      <div
        className="testimonial-card__avatar"
        style={{ background: `linear-gradient(135deg, rgb(${gradient}), rgba(${gradient},0.6))` }}
      >
        {avatar}
      </div>
      <div>
        <strong className="testimonial-card__name">{author}</strong>
        <span className="testimonial-card__role">{role}</span>
      </div>
    </div>
  </article>
);

const Testimonials = () => (
  <section id="testimonials" className="section section--alt">
    <div className="container">
      <SectionHeader
        badge="Customer Stories"
        title={`Trusted by <span class="gradient-text">Industry Leaders</span>`}
        subtitle="Join 1,000+ companies that have already transformed their workflow with Prabhu Tech Pro."
      />
      <div className="testimonials__grid">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.author} {...t} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
