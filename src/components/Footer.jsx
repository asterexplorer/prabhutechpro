import React from 'react';
import { Twitter, Instagram, Github, Linkedin, Activity, Heart } from 'lucide-react';

const Footer = ({ email, setEmail, handleNewsletter, status }) => {
  return (
    <footer style={{ background: '#08080a', borderTop: '1px solid var(--bg-card-border)', padding: '80px 0 40px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
              <Activity size={28} color="#4f46e5" />
              <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                Prabhu<span className="gradient-text">TechPro</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
              Revolutionizing the way SaaS startups operate globally. Accelerate your roadmap with us.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Twitter size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
              <Instagram size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
              <Github size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
              <Linkedin size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Product</h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>Features</li>
              <li>Integrations</li>
              <li>Pricing</li>
              <li>Roadmap</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>About</li>
              <li>Careers</li>
              <li>Legal</li>
              <li>Support</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Newsletter</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Get the latest updates direct to your inbox.</p>
            <form onSubmit={handleNewsletter} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass" 
                  style={{
                    padding: '0.8rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--bg-card-border)',
                    outline: 'none',
                    color: 'white',
                    width: '100%'
                  }} 
                />
                <button type="submit" className="btn-primary" style={{ padding: '0.8rem' }}>Join</button>
              </div>
              {status && <p style={{ fontSize: '0.8rem', color: status.includes('Error') ? '#ef4444' : '#34d399' }}>{status}</p>}
            </form>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid var(--bg-card-border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <p>© 2026 Prabhu Tech Pro Inc. All rights reserved.</p>
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            Built with <Heart size={14} fill="#ef4444" color="#ef4444" /> for the modern web.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
