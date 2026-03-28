import React from 'react';
import { Check } from 'lucide-react';

const PricingCard = ({ tier, price, description, features, isPopular }) => (
  <div className={`glass feature-card ${isPopular ? 'popular-tier' : ''}`} style={{
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    border: isPopular ? '2px solid var(--primary)' : '1px solid var(--bg-card-border)',
    transform: isPopular ? 'scale(1.05)' : 'none',
    zIndex: isPopular ? 1 : 0
  }}>
    {isPopular && (
      <span style={{
        position: 'absolute',
        top: '-15px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--primary)',
        color: 'white',
        padding: '0.25rem 1rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: 700
      }}>MOST POPULAR</span>
    )}
    <div>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{tier}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{description}</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
      <span style={{ fontSize: '3rem', fontWeight: 800 }}>${price}</span>
      <span style={{ color: 'var(--text-muted)' }}>/mo</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
      {features.map((feature, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
          <Check size={18} color={isPopular ? 'var(--primary)' : '#34d399'} />
          <span>{feature}</span>
        </div>
      ))}
    </div>
    <button className={isPopular ? 'btn-primary' : 'glass'} style={{ 
      padding: '1rem', 
      borderRadius: '12px', 
      fontWeight: 700,
      width: '100%',
      marginTop: '1rem',
      background: isPopular ? 'var(--primary)' : 'rgba(255,255,255,0.05)'
    }}>
      Get Started
    </button>
  </div>
);

const Pricing = () => {
  const tiers = [
    {
      tier: 'Starter',
      price: '29',
      description: 'Perfect for small teams and early-stage startups.',
      features: ['Up to 5 users', '10GB Storage', 'Basic Analytics', 'Email Support', 'Manual Integrations']
    },
    {
      tier: 'Pro',
      price: '99',
      description: 'Ideal for scaling businesses with complex needs.',
      isPopular: true,
      features: ['Up to 25 users', '100GB Storage', 'Advanced AI Insights', 'Priority Support', 'API Access', 'Custom Workflow']
    },
    {
      tier: 'Enterprise',
      price: 'Custom',
      description: 'Dedicated resources for global enterprises.',
      features: ['Unlimited users', 'Unlimited Storage', 'White-glove Onboarding', '24/7 Phone Support', 'Custom SLA', 'SSO & Compliance']
    }
  ];

  return (
    <section id="pricing" style={{ padding: '100px 0' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <span className="badge">Flexible Pricing</span>
          <h2 className="section-title">Plans that scale with you</h2>
          <p className="section-subtitle">
            Choose the perfect plan for your business. No hidden fees, cancel anytime.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2.5rem',
          alignItems: 'center',
          paddingTop: '20px'
        }}>
          {tiers.map((tier, index) => (
            <PricingCard key={index} {...tier} />
          ))}
        </div>
      </div>

      <style>{`
        .popular-tier {
          box-shadow: 0 20px 50px rgba(79, 70, 229, 0.2);
        }
      `}</style>
    </section>
  );
};

export default Pricing;
