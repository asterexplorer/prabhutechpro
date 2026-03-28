import React from 'react';
import { Cpu, ShieldCheck, CloudLightning, Users, BarChart3, Globe } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="feature-card">
    <div style={{
      width: '56px',
      height: '56px',
      borderRadius: '16px',
      background: `rgba(${color}, 0.1)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem'
    }}>
      <Icon size={28} color={`rgb(${color})`} />
    </div>
    <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: Cpu,
      title: 'AI Orchestration',
      description: 'Leverage hyper-intelligent algorithms to automate complex workflows and redundant tasks.',
      color: '79, 70, 229'
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and granular permission settings to protect your data.',
      color: '6, 182, 212'
    },
    {
      icon: CloudLightning,
      title: 'Cloud Integration',
      description: 'Connect with your favorite tools seamlessly including AWS, Azure, and Google Cloud.',
      color: '217, 70, 239'
    },
    {
      icon: Users,
      title: 'Global Collaboration',
      description: 'Work with your team in real-time across continents with zero latency.',
      color: '249, 115, 22'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Get deep insights into your business performance with interactive visualizations.',
      color: '34, 197, 94'
    },
    {
      icon: Globe,
      title: 'Edge Performance',
      description: 'Lightning-fast delivery with our global edge network, ensuring your app stays responsive.',
      color: '239, 68, 68'
    }
  ];

  return (
    <section id="features" className="container" style={{ padding: '100px 1.5rem' }}>
      <div className="badge animate-fade-in" style={{ display: 'block', margin: '0 auto 1.5rem auto', width: 'fit-content' }}>
        Powerful Capabilities
      </div>
      <h2 className="section-title">Everything You Need To <span className="gradient-text">Dominate</span> Your Industry</h2>
      <p className="section-subtitle">
        Prabhu Tech Pro provides the most comprehensive set of tools designed for modern SaaS businesses.
      </p>

      <div className="grid-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;
