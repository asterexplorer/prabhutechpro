import React, { useState } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';

// Layout
import Navbar  from './components/layout/Navbar';
import Footer  from './components/layout/Footer';

// Sections
import Hero         from './components/sections/Hero';
import Stats        from './components/sections/Stats';
import Features     from './components/sections/Features';
import Solutions    from './components/sections/Solutions';
import Skills       from './components/sections/Skills';
import About        from './components/sections/About';
import Pricing      from './components/sections/Pricing';
import Testimonials from './components/sections/Testimonials';
import FAQ          from './components/sections/FAQ';
import CTA          from './components/sections/CTA';
import ContactSection from './components/sections/Contact';

// ── Error boundary (class for legacy compat) ─────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', background: '#0a0a12', color: '#ff4d4d', minHeight: '100vh' }}>
          <h1>Something went wrong</h1>
          <pre style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>{this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── App ───────────────────────────────────────────────────────────────────
const App = () => {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState('');

  // Wire scroll-reveal after every render
  useScrollReveal();

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('Processing…');
    try {
      const res = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const d = await res.json();
      setStatus(d.message || 'Subscribed! 🎉');
      setEmail('');
    } catch {
      setStatus('Could not connect to server. Try again later.');
    }
  };

  return (
    <ErrorBoundary>
      <div id="app-root">
        <div className="orb-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <Navbar />
        <main id="main-content">
          <Hero />
          <Stats />
          <Features />
          <Skills />
          <Solutions />
          <About />
          <Pricing />
          <Testimonials />
          <FAQ />
          <ContactSection />
          <CTA />
        </main>
        <Footer
          email={email}
          setEmail={setEmail}
          handleNewsletter={handleNewsletter}
          status={status}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
