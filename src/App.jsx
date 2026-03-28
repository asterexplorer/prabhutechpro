import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
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
        <div style={{ padding: '2rem', background: '#f8fafc', color: '#dc2626', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h1>Something went wrong</h1>
          <p>Please refer to the console for more details.</p>
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toast, setToast] = useState(null);

  // Wire scroll-reveal after every render
  useScrollReveal();

  useEffect(() => {
    // 1. Scroll Progress
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Realtime Socket System
    const socket = io('http://localhost:5000');
    
    socket.on('notification', (data) => {
      setToast(data);
      setTimeout(() => setToast(null), 5000); // Auto-clear after 5s
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      socket.disconnect();
    };
  }, []);

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
        {/* Realtime Toast */}
        {toast && (
          <div className="live-toast">
            <div className="live-toast__icon">🚀</div>
            <div className="live-toast__body">
              <strong>{toast.user}</strong>: {toast.message}
              <span>{toast.time}</span>
            </div>
          </div>
        )}

        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
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
