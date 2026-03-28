import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'How does the 14-day free trial work?',
    a: 'You get full access to all Pro features for 14 days — no credit card required. At the end, you can choose a plan that fits your team, or continue on the free tier with limited features.'
  },
  {
    q: 'Can I migrate from another platform?',
    a: 'Absolutely. We provide a guided import wizard supporting CSV, JSON, and direct API connections from popular tools like Notion, Airtable, Asana, and more. Our onboarding team handles migrations for Enterprise plans.'
  },
  {
    q: 'What integrations do you support?',
    a: 'Prabhu Tech Pro connects with 100+ tools including Slack, Google Workspace, GitHub, Salesforce, AWS, Stripe, HubSpot, and more via native integrations and a Zapier bridge.'
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We are SOC 2 Type II certified, use AES-256 encryption at rest, TLS 1.3 in transit, and offer SAML SSO, RBAC, and audit logs on Enterprise plans. Your data is yours — always.'
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel any time with a single click — no penalties, no fine print. If you cancel before your billing cycle ends, you retain access until the end of the period.'
  },
  {
    q: 'Do you offer discounts for startups or NGOs?',
    a: 'We offer a 50% startup discount for companies under 2 years old with fewer than 20 employees, and special pricing for verified nonprofits. Contact our sales team to apply.'
  }
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <section style={{ padding: '100px 0', background: 'rgba(0,0,0,0.2)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <span className="badge">FAQ</span>
          <h2 className="section-title">Everything you need to know</h2>
          <p className="section-subtitle">
            Can't find your answer? <a href="#contact" style={{ color: 'var(--primary-light)', textDecoration: 'underline' }}>Chat with our team</a>.
          </p>
        </div>

        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item${open === i ? ' open' : ''}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                {open === i
                  ? <ChevronUp size={18} color="var(--primary-light)" />
                  : <ChevronDown size={18} color="var(--text-muted)" />
                }
              </div>
              <div className={`faq-answer${open === i ? ' open' : ''}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
