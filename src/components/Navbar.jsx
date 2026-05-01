import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Sun, Moon, Globe, Menu, X, Vote, ChevronRight, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t, lang, setLanguage, availableLangs } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [newsIndex, setNewsIndex] = useState(0);
  const location = useLocation();

  const news = [
    "General Elections 2026: Registration opens soon!",
    "New multilingual guides added for all voters.",
    "ISRO successfully launches new satellite - check details!",
    "Interactive quizzes now feature 20+ new scenarios."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % news.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [news.length]);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { to: '/',            label: t('nav.home') },
    { to: '/timeline',    label: t('nav.timeline') },
    { to: '/eligibility', label: t('nav.eligibility') },
    { to: '/learn',       label: t('nav.learn') },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      {/* ── News Ticker (Inside Header) ── */}
      <div className="news-ticker">
        <div className="container news-ticker__inner">
          <div className="news-ticker__label">
            <span className="news-ticker__dot"></span>
            LIVE
          </div>
          <div className="news-ticker__content">
            <p key={newsIndex} className="news-ticker__text animate-fade-up">
              {news[newsIndex]}
            </p>
          </div>
          <div className="news-ticker__badge">
            <Zap size={10} />
            <span>SMART ELECTION GUIDE</span>
          </div>
          <Link to="/learn" className="news-ticker__link">
            Details <ChevronRight size={12} />
          </Link>
        </div>
      </div>

      <div className="container navbar__inner">
        {/* Logo */}
        <NavLink to="/" className="navbar__logo" aria-label="ElectED Home">
          <div className="navbar__logo-icon">
            <Vote size={20} />
          </div>
          <span className="navbar__logo-text">Elect<span className="gradient-text">ED</span></span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Controls */}
        <div className="navbar__controls">
          {/* Language Selector */}
          <div className="navbar__lang" ref={langRef}>
            <button
              className="btn btn-ghost navbar__icon-btn"
              onClick={() => setLangOpen(o => !o)}
              aria-label="Select Language"
              aria-expanded={langOpen}
            >
              <Globe size={18} />
              <span className="navbar__lang-label">{lang.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="navbar__lang-dropdown animate-fade-in" role="menu">
                {availableLangs.map(l => {
                  const getLangLabel = (code) => {
                    const labels = { en: '🇺🇸 English', es: '🇪🇸 Español', hi: '🇮🇳 हिन्दी', ur: '🇵🇰 اردو' };
                    return labels[code] || code.toUpperCase();
                  };
                  return (
                    <button
                      key={l}
                      className={`navbar__lang-item ${lang === l ? 'navbar__lang-item--active' : ''}`}
                      onClick={() => { setLanguage(l); setLangOpen(false); }}
                      role="menuitem"
                    >
                      {getLangLabel(l)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            className="btn btn-ghost navbar__icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* New Feature: Join Now CTA */}
          <Link to="/timeline" className="btn btn-primary navbar__cta">
            Join Now
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="btn btn-ghost navbar__icon-btn navbar__mobile-toggle"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile animate-fade-in" role="navigation" aria-label="Mobile navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
