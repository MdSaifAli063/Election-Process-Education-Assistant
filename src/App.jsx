import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Eligibility = lazy(() => import('./pages/Eligibility'));
const Learn = lazy(() => import('./pages/Learn'));

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ErrorBoundary from './components/ErrorBoundary';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <div className="mesh-bg">
        <div className="mesh-blob mesh-blob--1"></div>
        <div className="mesh-blob mesh-blob--2"></div>
        <div className="mesh-blob mesh-blob--3"></div>
      </div>

      <Navbar />
      <ScrollToTop />

      <main id="main-content" role="main">
        <Suspense fallback={<div className="page-loader">Loading ElectED...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="*" element={
              <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem', textAlign: 'center' }}>
                <span style={{ fontSize: '5rem' }}>🗳️</span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800 }}>Page Not Found</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: 400 }}>The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn-primary">← Back to Home</a>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <Chatbot />
    </ErrorBoundary>
  );
}
