import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Activity, ChevronDown } from 'lucide-react';
import { NAV_LINKS, COMPANY } from '../../data/content';
import { BtnPrimary } from '../ui';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 992) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
        <div className="navbar__inner container">
          {/* Logo */}
          <a href="#" className="navbar__logo" aria-label={COMPANY.name}>
            <Activity size={28} className="navbar__logo-icon" />
            <span>
              Prabhu<span className="gradient-text">Tech</span>Pro
            </span>
          </a>

          {/* Desktop links */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`navbar__link ${activeLink === href ? 'navbar__link--active' : ''}`}
                  onClick={() => setActiveLink(href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="navbar__cta">
            <a href="#contact" className="navbar__signin">Sign In</a>
            <BtnPrimary id="nav-get-started" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              Get Started <ArrowRight size={16} />
            </BtnPrimary>
          </div>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-toggle"
            className="navbar__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'mobile-drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-drawer__inner">
          <nav>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="mobile-drawer__link"
                onClick={close}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mobile-drawer__btns">
            <a href="#contact" className="btn-ghost" style={{ display: 'block', textAlign: 'center' }} onClick={close}>
              Sign In
            </a>
            <BtnPrimary id="mobile-get-started" style={{ display: 'block', textAlign: 'center', width: '100%' }} onClick={close}>
              Get Started Free
            </BtnPrimary>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="mobile-backdrop" onClick={close} aria-hidden="true" />
      )}
    </>
  );
};

export default Navbar;
