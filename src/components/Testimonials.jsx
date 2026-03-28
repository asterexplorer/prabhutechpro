import React from 'react';
import { Quote, Star } from 'lucide-react';

const TestimonialCard = ({ quote, author, role, rating, avatar }) => (
  <div className="glass feature-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
    <div style={{ display: 'flex', gap: '0.25rem' }}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill={i < rating ? '#fbbf24' : 'none'} color={i < rating ? '#fbbf24' : 'var(--text-muted)'} />
      ))}
    </div>
    <Quote size={24} color="var(--primary)" style={{ opacity: 0.3 }} />
    <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1 }}>
      "{quote}"
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--bg-card-border)', paddingTop: '1rem' }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.9rem',
        fontWeight: 700
      }}>
        {author[0]}
      </div>
      <div>
        <h4 style={{ margin: 0, fontSize: '1rem' }}>{author}</h4>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{role}</span>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const reviews = [
    {
      author: 'Sarah Jenkins',
      role: 'CEO at Scaleify',
      rating: 5,
      quote: 'Prabhu Tech Pro helped us automate 70% of our manual processes. The efficiency gains are incredible.'
    },
    {
      author: 'David Chen',
      role: 'CTO at CloudBase',
      rating: 5,
      quote: 'The most stable and user-friendly platform I have ever used. Our uptime has never been better.'
    },
    {
      author: 'Elena Petrova',
      role: 'Head of Growth at VentureX',
      rating: 4,
      quote: 'Excellent toolkit for startups. The AI-driven insights have transformed our decision-making.'
    }
  ];

  return (
    <section id="solutions" style={{ padding: '100px 0', background: 'rgba(79, 70, 229, 0.03)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <span className="badge">Testimonials</span>
          <h2 className="section-title">Trusted by industry leaders</h2>
          <p className="section-subtitle">
            Join 1,000+ companies that have already transformed their workflow.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem'
        }}>
          {reviews.map((review, index) => (
            <TestimonialCard key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
