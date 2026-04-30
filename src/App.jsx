import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import Chatbot from './components/Chatbot';
import Home        from './pages/Home';
import Timeline    from './pages/Timeline';
import Eligibility from './pages/Eligibility';
import Learn       from './pages/Learn';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main id="main-content" role="main">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/timeline"    element={<Timeline />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/learn"       element={<Learn />} />
          <Route path="*" element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem', textAlign: 'center' }}>
              <span style={{ fontSize: '5rem' }}>🗳️</span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800 }}>Page Not Found</h1>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 400 }}>The page you're looking for doesn't exist. Head back to explore the election process.</p>
              <a href="/" className="btn btn-primary">← Back to Home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
