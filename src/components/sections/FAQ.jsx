import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../../data/content';
import { SectionHeader } from '../ui';

const FAQItem = ({ q, a, isOpen, onClick, index }) => (
  <div
    className={`faq-item ${isOpen ? 'open' : ''}`}
    onClick={onClick}
    id={`faq-item-${index}`}
  >
    <button
      className="faq-question"
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${index}`}
    >
      <span>{q}</span>
      <ChevronDown
        size={18}
        color={isOpen ? 'var(--primary-light)' : 'var(--text-muted)'}
        style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease', flexShrink: 0 }}
      />
    </button>
    <div
      id={`faq-answer-${index}`}
      className={`faq-answer ${isOpen ? 'open' : ''}`}
      role="region"
      aria-hidden={!isOpen}
    >
      {a}
    </div>
  </div>
);

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section">
      <div className="container">
        <SectionHeader
          badge="FAQ"
          title={`Everything You Need <span class="gradient-text">to Know</span>`}
          subtitle={<>Can't find your answer? <a href="#contact" style={{ color: 'var(--primary-light)' }}>Chat with our team</a>.</>}
        />
        <div className="faq__list reveal">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              {...faq}
              index={i}
              isOpen={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
