import React, { useState } from 'react';
import { Check, Zap, ArrowRight } from 'lucide-react';
import { PRICING_TIERS } from '../../data/content';
import { SectionHeader, BtnPrimary, BtnGhost } from '../ui';

const PricingCard = ({ tier, price, period, description, features, cta, isPopular }) => (
  <article
    className={`pricing-card glass-card reveal ${isPopular ? 'pricing-card--popular' : ''}`}
    aria-label={`${tier} plan`}
  >
    {isPopular && (
      <div className="pricing-card__popular-label">
        <Zap size={12} fill="white" /> Most Popular
      </div>
    )}
    <div className="pricing-card__header">
      <h3 className="pricing-card__tier">{tier}</h3>
      <p className="pricing-card__desc">{description}</p>
    </div>
    <div className="pricing-card__price">
      {price === 'Custom' ? (
        <span className="pricing-card__amount pricing-card__amount--custom">Custom</span>
      ) : (
        <>
          <span className="pricing-card__currency">$</span>
          <span className="pricing-card__amount">{price}</span>
          {period && <span className="pricing-card__period">/{period}</span>}
        </>
      )}
    </div>
    <ul className="pricing-card__features">
      {features.map((f, i) => (
        <li key={i} className="pricing-card__feature">
          <Check size={16} className="pricing-card__check" />
          <span>{f}</span>
        </li>
      ))}
    </ul>
    {isPopular ? (
      <BtnPrimary
        id={`pricing-cta-${tier.toLowerCase()}`}
        style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 6 }}
      >
        {cta} <ArrowRight size={16} />
      </BtnPrimary>
    ) : (
      <button
        id={`pricing-cta-${tier.toLowerCase()}`}
        className="pricing-card__btn-outline"
      >
        {cta} <ArrowRight size={16} />
      </button>
    )}
  </article>
);

const Pricing = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHeader
          badge="Flexible Pricing"
          title={`Plans that <span class="gradient-text">Scale</span> with You`}
          subtitle="No hidden fees. Cancel anytime. Start free, upgrade as you grow."
        />

        {/* Billing toggle */}
        <div className="pricing__toggle reveal">
          <span className={!annual ? 'pricing__toggle-label--active' : ''}>Monthly</span>
          <button
            id="pricing-billing-toggle"
            className={`pricing__switch ${annual ? 'pricing__switch--on' : ''}`}
            onClick={() => setAnnual(!annual)}
            aria-pressed={annual}
            aria-label="Toggle annual billing"
          >
            <span className="pricing__switch-knob" />
          </button>
          <span className={annual ? 'pricing__toggle-label--active' : ''}>
            Annual <span className="pricing__discount">Save 20%</span>
          </span>
        </div>

        <div className="pricing__grid reveal">
          {PRICING_TIERS.map((tier) => (
            <PricingCard
              key={tier.tier}
              {...tier}
              price={annual && tier.price !== 'Custom'
                ? Math.round(Number(tier.price) * 0.8)
                : tier.price}
            />
          ))}
        </div>

        <p className="pricing__note reveal">
          All plans include a 14-day free trial. No credit card required. &nbsp;
          <a href="#contact" style={{ color: 'var(--primary-light)' }}>Need a custom quote?</a>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
