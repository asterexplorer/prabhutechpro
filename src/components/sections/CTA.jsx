import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BtnPrimary, BtnGhost } from '../ui';

const CTA = () => (
  <section className="section cta-section reveal">
    <div className="container">
      <div className="cta-card glass-card">
        {/* Background glow */}
        <div className="cta-card__glow" aria-hidden="true" />

        <div className="cta-card__content">
          <span className="badge">Start Today — Free</span>
          <h2 className="section-title cta-card__title">
            Ready to transform your{' '}
            <span className="gradient-text">workflow?</span>
          </h2>
          <p className="section-subtitle cta-card__subtitle">
            Join thousands of industry leaders who trust Prabhu Tech Pro to ship faster,
            scale smarter, and build better products.
          </p>
          <div className="cta-card__actions">
            <BtnPrimary
              id="cta-create-account"
              style={{ padding: '1.1rem 2.6rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              Create Free Account <ArrowRight size={18} />
            </BtnPrimary>
            <BtnGhost
              id="cta-contact-sales"
              style={{ padding: '1.1rem 2.6rem', fontSize: '1rem' }}
            >
              Contact Sales
            </BtnGhost>
          </div>
          <p className="cta-card__fine-print">
            14-day free trial · No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
