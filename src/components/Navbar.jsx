import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Activity } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="nav-container">
      <div className={`container ${isScrolled ? 'nav-content glass' : 'nav-content'}`}>
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={32} color="#4f46e5" />
          <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-1px' }}>
            Prabhu<span className="gradient-text">TechPro</span>
          </span>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="mobile-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'none', color: 'white', zIndex: 1100 }}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#skills">Skills</a>
          <a href="#pricing">Pricing</a>
          <a href="#solutions">Solutions</a>
          <a href="#contact">Contact</a>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Get Started <ArrowRight size={18} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="#skills"   onClick={() => setIsMenuOpen(false)}>Skills</a>
          <a href="#pricing"  onClick={() => setIsMenuOpen(false)}>Pricing</a>
          <a href="#solutions"onClick={() => setIsMenuOpen(false)}>Solutions</a>
          <a href="#contact"  onClick={() => setIsMenuOpen(false)}>Contact</a>
          <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Get Started</button>
        </div>
      </div>
      
      <style>{`
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav-links a {
          color: var(--text-secondary);
          font-weight: 500;
        }
        .nav-links a:hover {
          color: var(--text-primary);
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 10, 12, 0.98);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1050;
          padding: 2rem;
        }
        .mobile-menu.open {
          transform: translateY(0);
        }
        .mobile-menu a {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        @media (max-width: 992px) {
          .nav-links {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
