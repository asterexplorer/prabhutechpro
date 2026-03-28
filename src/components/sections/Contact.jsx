import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader,
  MessageSquare, User, AtSign, BookOpen,
} from 'lucide-react';
import { COMPANY } from '../../data/content';
import { SectionHeader, BtnPrimary } from '../ui';

// ── Contact info cards ────────────────────────────────────────────────────────
const INFO_CARDS = [
  {
    icon: Mail,
    label: 'Email Us',
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    color: '91,82,240',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: COMPANY.phone,
    href: `tel:${COMPANY.phone}`,
    color: '0,212,255',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: COMPANY.address,
    href: 'https://maps.google.com',
    color: '224,64,251',
  },
];

const SUBJECTS = [
  'General Inquiry',
  'Sales & Pricing',
  'Technical Support',
  'Partnership',
  'Press & Media',
  'Other',
];

// ── Input Field atom ──────────────────────────────────────────────────────────
const Field = ({ id, label, type = 'text', placeholder, value, onChange, error, icon: Icon, required }) => (
  <div className="contact-field">
    <label htmlFor={id} className="contact-field__label">
      {label} {required && <span className="contact-field__req">*</span>}
    </label>
    <div className={`contact-field__wrap ${error ? 'contact-field__wrap--error' : ''}`}>
      {Icon && <Icon size={16} className="contact-field__icon" />}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="contact-field__input"
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off'}
      />
    </div>
    {error && (
      <span id={`${id}-err`} className="contact-field__error" role="alert">
        <AlertCircle size={12} /> {error}
      </span>
    )}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const ContactSection = () => {
  const INIT = { name: '', email: '', phone: '', subject: '', message: '' };

  const [form,   setForm]   = useState(INIT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState('');

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // Client-side validation
  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name    = 'Name must be at least 2 characters.';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email   = 'Please enter a valid email address.';
    if (!form.subject)
      errs.subject = 'Please select a subject.';
    if (!form.message.trim() || form.message.trim().length < 10)
      errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setErrors({});
    setStatus('loading');

    try {
      const res  = await fetch('http://localhost:5000/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerMsg(data.errors?.join(' ') || data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      } else {
        setServerMsg(data.message);
        setStatus('success');
        setForm(INIT);
      }
    } catch {
      setServerMsg('Unable to connect to server. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <section id="contact-form" className="section">
      <div className="container">
        <SectionHeader
          badge="Get In Touch"
          title={`Let's <span class="gradient-text">Start a Conversation</span>`}
          subtitle="Have a question, need a custom quote, or want to see a live demo? Our team responds within 1–2 business days."
        />

        <div className="contact__layout">
          {/* ── Left: Info cards ── */}
          <aside className="contact__info">
            {INFO_CARDS.map(({ icon: Icon, label, value, href, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="contact-info-card glass-card reveal"
              >
                <div
                  className="contact-info-card__icon"
                  style={{ background: `rgba(${color},0.12)`, boxShadow: `0 0 20px rgba(${color},0.1)` }}
                >
                  <Icon size={22} color={`rgb(${color})`} />
                </div>
                <div>
                  <span className="contact-info-card__label">{label}</span>
                  <span className="contact-info-card__value">{value}</span>
                </div>
              </a>
            ))}

            {/* Response time badge */}
            <div className="contact__response-time glass-card reveal">
              <div className="contact__response-dot" />
              <div>
                <strong>Fast Response</strong>
                <span>Usually replies within 4 business hours</span>
              </div>
            </div>
          </aside>

          {/* ── Right: Form ── */}
          <div className="contact__form-wrap reveal">
            {status === 'success' ? (
              /* Success state */
              <div className="contact__success glass-card">
                <div className="contact__success-icon">
                  <CheckCircle size={48} color="var(--success)" />
                </div>
                <h3>Message Sent!</h3>
                <p>{serverMsg}</p>
                <p className="contact__success-sub">
                  Check your inbox — we've also sent you a confirmation email.
                </p>
                <button
                  className="btn-ghost"
                  onClick={() => setStatus('idle')}
                  style={{ marginTop: '1.5rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* Form */
              <form
                id="contact-form-el"
                onSubmit={handleSubmit}
                noValidate
                className="contact__form glass-card"
              >
                <h3 className="contact__form-title">Send us a message</h3>

                {/* Error banner */}
                {status === 'error' && (
                  <div className="contact__alert contact__alert--error" role="alert">
                    <AlertCircle size={16} />
                    <span>{serverMsg}</span>
                  </div>
                )}

                <div className="contact__row">
                  <Field
                    id="contact-name"
                    label="Full Name"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={set('name')}
                    error={errors.name}
                    icon={User}
                    required
                  />
                  <Field
                    id="contact-email"
                    label="Work Email"
                    type="email"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={set('email')}
                    error={errors.email}
                    icon={AtSign}
                    required
                  />
                </div>

                <div className="contact__row">
                  <Field
                    id="contact-phone"
                    label="Phone (optional)"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={set('phone')}
                    error={errors.phone}
                    icon={Phone}
                  />

                  {/* Subject dropdown */}
                  <div className="contact-field">
                    <label htmlFor="contact-subject" className="contact-field__label">
                      Subject <span className="contact-field__req">*</span>
                    </label>
                    <div className={`contact-field__wrap ${errors.subject ? 'contact-field__wrap--error' : ''}`}>
                      <BookOpen size={16} className="contact-field__icon" />
                      <select
                        id="contact-subject"
                        value={form.subject}
                        onChange={set('subject')}
                        className="contact-field__input contact-field__select"
                        aria-required
                        aria-invalid={!!errors.subject}
                      >
                        <option value="">Select a subject…</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    {errors.subject && (
                      <span className="contact-field__error" role="alert">
                        <AlertCircle size={12} /> {errors.subject}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message textarea */}
                <div className="contact-field">
                  <label htmlFor="contact-message" className="contact-field__label">
                    Message <span className="contact-field__req">*</span>
                  </label>
                  <div className={`contact-field__wrap contact-field__wrap--textarea ${errors.message ? 'contact-field__wrap--error' : ''}`}>
                    <MessageSquare size={16} className="contact-field__icon contact-field__icon--top" />
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us about your project, timeline, team size, and any specific requirements…"
                      value={form.message}
                      onChange={set('message')}
                      className="contact-field__input contact-field__textarea"
                      aria-required
                      aria-invalid={!!errors.message}
                    />
                  </div>
                  {errors.message && (
                    <span className="contact-field__error" role="alert">
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                  <span className="contact-field__count">
                    {form.message.length} / 2000 characters
                  </span>
                </div>

                <div className="contact__submit-row">
                  <BtnPrimary
                    id="contact-submit-btn"
                    type="submit"
                    style={{
                      padding: '1rem 2.4rem',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      opacity: status === 'loading' ? 0.75 : 1,
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </BtnPrimary>
                  <p className="contact__privacy">
                    🔒 Your information is secure and never shared.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
