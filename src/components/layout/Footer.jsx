import React, { useState } from 'react';
import { Activity, Twitter, Github, Linkedin, Instagram, Heart, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY, FOOTER_LINKS, NAV_LINKS } from '../../data/content';

const Footer = ({ email, setEmail, handleNewsletter, status }) => {
  return (
    <footer id="contact" className="footer">
      {/* Top wave divider */}
      <div className="footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40L60 36.7C120 33.3 240 26.7 360 30C480 33.3 600 46.7 720 46.7C840 46.7 960 33.3 1080 26.7C1200 20 1320 20 1380 20H1440V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V40Z" fill="#08080e"/>
        </svg>
      </div>

      <div className="footer__body">
        <div className="container">
          <div className="footer__grid">
            {/* Brand col */}
            <div className="footer__brand">
              <a href="#" className="footer__logo">
                <Activity size={26} style={{ color: 'var(--primary-light)' }} />
                <span>Prabhu<span className="gradient-text">Tech</span>Pro</span>
              </a>
              <p className="footer__tagline">
                Revolutionizing how SaaS businesses operate globally. Accelerate your roadmap with the most complete platform for modern enterprises.
              </p>

              {/* Contact info */}
              <ul className="footer__contact">
                <li><Mail size={14} /><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
                <li><Phone size={14} /><a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a></li>
                <li><MapPin size={14} /><span>{COMPANY.address}</span></li>
              </ul>

              {/* Social */}
              <div className="footer__social">
                {[
                  { Icon: Twitter,   label: 'Twitter',   href: '#' },
                  { Icon: Github,    label: 'GitHub',    href: '#' },
                  { Icon: Linkedin,  label: 'LinkedIn',  href: '#' },
                  { Icon: Instagram, label: 'Instagram', href: '#' },
                ].map(({ Icon, label, href }) => (
                  <a key={label} href={href} className="footer__social-icon" aria-label={label}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category} className="footer__col">
                <h4 className="footer__col-title">{category}</h4>
                <ul className="footer__col-links">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter col */}
            <div className="footer__newsletter">
              <h4 className="footer__col-title">Stay Updated</h4>
              <p>Get product updates, launch news and exclusive offers — straight to your inbox.</p>
              <form onSubmit={handleNewsletter} className="footer__form" id="newsletter-form">
                <div className="footer__form-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="footer__input"
                    required
                    aria-label="Email address"
                  />
                  <button type="submit" className="footer__form-btn" id="newsletter-submit" aria-label="Subscribe">
                    <ArrowRight size={18} />
                  </button>
                </div>
                {status && (
                  <p className={`footer__form-status ${status.includes('Error') ? 'footer__form-status--error' : ''}`}>
                    {status}
                  </p>
                )}
              </form>
              <p className="footer__privacy">No spam, ever. Unsubscribe in one click.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>{COMPANY.copyright}</p>
          <p className="footer__love">
            Built with <Heart size={13} fill="#ef4444" color="#ef4444" /> for the modern web
          </p>
          <div className="footer__badges">
            <span className="footer__badge">SOC 2</span>
            <span className="footer__badge">GDPR</span>
            <span className="footer__badge">ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
