import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Clock, Users, BookOpen, Award,
  ChevronRight, Star, Shield, Zap, Globe2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Home.css';

const features = [
  {
    icon: <Clock size={24} />,
    color: 'blue',
    title: 'Interactive Timeline',
    desc: 'Walk through every stage of the election process — from candidate filing to inauguration — with rich visual details.',
    link: '/timeline',
    badge: '7 Stages',
  },
  {
    icon: <CheckCircle2 size={24} />,
    color: 'green',
    title: 'Eligibility Checker',
    desc: 'Answer a few simple questions and instantly find out if you\'re eligible to vote, with step-by-step guidance.',
    link: '/eligibility',
    badge: 'Personalized',
  },
  {
    icon: <BookOpen size={24} />,
    color: 'purple',
    title: 'Learn & Quiz',
    desc: 'Flip through concept cards and test your knowledge with interactive quizzes. Earn badges as you learn!',
    link: '/learn',
    badge: '10+ Topics',
  },
  {
    icon: <Zap size={24} />,
    color: 'gold',
    title: 'AI Assistant',
    desc: 'Ask anything! Our intelligent chatbot answers your election questions in simple, clear language 24/7.',
    link: '#',
    badge: 'AI-Powered',
    action: 'chatbot',
  },
];

const electionStages = [
  { num: '01', label: 'Voter Registration', icon: '📋', color: '#6366f1' },
  { num: '02', label: 'Candidate Filing',   icon: '📝', color: '#8b5cf6' },
  { num: '03', label: 'Campaign Period',    icon: '📣', color: '#06b6d4' },
  { num: '04', label: 'Voting Day',         icon: '🗳️', color: '#10b981' },
  { num: '05', label: 'Vote Counting',      icon: '📊', color: '#f59e0b' },
  { num: '06', label: 'Certification',      icon: '✅', color: '#ef4444' },
  { num: '07', label: 'Inauguration',       icon: '🏛️', color: '#ec4899' },
];

const testimonials = [
  { name: 'Sarah M.', role: 'First-time voter', text: 'ElectED made the whole process crystal clear. I went from completely confused to confidently voting in one afternoon!', stars: 5 },
  { name: 'James K.', role: 'Civics teacher', text: 'I use this with my students. The interactive timeline and quizzes make election education genuinely engaging.', stars: 5 },
  { name: 'Priya R.', role: 'New citizen', text: 'As someone new to this country, the eligibility checker and chatbot were incredibly helpful and reassuring.', stars: 5 },
];

const trustBadges = [
  { icon: <Shield size={18} />, label: 'Unbiased & Nonpartisan' },
  { icon: <Globe2 size={18} />, label: 'Multilingual Support' },
  { icon: <Users size={18} />, label: 'Accessible for Everyone' },
  { icon: <Award size={18} />, label: 'Educational & Free' },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="home page-enter">

      {/* ── Hero Section ── */}
      <section className="hero" aria-label="Hero section">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1"></div>
          <div className="hero__orb hero__orb--2"></div>
          <div className="hero__orb hero__orb--3"></div>
          <div className="hero__grid"></div>
        </div>

        <div className="container hero__content">
          <div className="hero__text">
            <div className="badge badge-primary hero__badge animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <Zap size={12} />
              {t('hero.badge')}
            </div>

            <h1 className="text-display hero__title animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('hero.title')}{' '}
              <span className="gradient-text">{t('hero.titleAccent')}</span>
            </h1>

            <p className="hero__subtitle animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {t('hero.subtitle')}
            </p>

            <div className="hero__actions animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/timeline" className="btn btn-primary hero__cta">
                {t('hero.cta1')} <ArrowRight size={18} />
              </Link>
              <Link to="/eligibility" className="btn btn-secondary hero__cta">
                {t('hero.cta2')} <ChevronRight size={16} />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="hero__trust animate-fade-up" style={{ animationDelay: '0.5s' }}>
              {trustBadges.map(({ icon, label }) => (
                <div key={label} className="hero__trust-item">
                  {icon} <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hero__visual animate-float" aria-hidden="true" style={{ transform: 'scale(0.88)', transformOrigin: 'center center' }}>
            <div className="hero__visual-card glass">
              <div className="hero__visual-header">
                <div className="hero__visual-dots">
                  <span style={{ background: '#ef4444' }}></span>
                  <span style={{ background: '#f59e0b' }}></span>
                  <span style={{ background: '#22c55e' }}></span>
                </div>
                <span className="hero__visual-title">Election Process</span>
              </div>
              <div className="hero__visual-stages">
                {electionStages.map((s, i) => (
                  <div key={s.num} className="hero__stage" style={{ animationDelay: `${0.6 + i * 0.08}s`, padding: '6px 12px', justifyContent: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                      <div className="hero__stage-icon" style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                        {s.icon}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ background: s.color, color: '#ffffff', padding: '2px 6px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em' }}>{s.num}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{s.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="stats-bar" aria-label="Platform statistics">
        <div className="container stats-bar__inner">
          {[
            { value: '7', label: t('stats.stages') },
            { value: '15+', label: t('stats.topics') },
            { value: '50+', label: t('stats.quizzes') },
            { value: '4', label: t('stats.languages') },
          ].map(({ value, label }) => (
            <div key={label} className="stats-bar__item">
              <span className="stats-bar__value gradient-text">{value}</span>
              <span className="stats-bar__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="section features" aria-labelledby="features-heading">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-primary">Core Features</span>
            <h2 id="features-heading" className="text-heading section-header__title">
              {t('features.title')}
            </h2>
            <p className="section-header__subtitle">{t('features.subtitle')}</p>
          </div>

          <div className="features__grid">
            {features.map((f) => (
              <div key={f.title} className={`feature-card card feature-card--${f.color}`}>
                <div className={`feature-card__icon feature-card__icon--${f.color}`}>
                  {f.icon}
                </div>
                <div className="feature-card__content">
                  <div className="feature-card__header">
                    <h3 className="feature-card__title">{f.title}</h3>
                    <span className="badge badge-primary">{f.badge}</span>
                  </div>
                  <p className="feature-card__desc">{f.desc}</p>
                  {f.link !== '#' ? (
                    <Link to={f.link} className="feature-card__link">
                      Explore <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <button
                      className="feature-card__link"
                      onClick={() => document.getElementById('chatbot-fab-btn')?.click()}
                    >
                      Open Assistant <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Snapshot ── */}
      <section className="section process-snapshot" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-primary">Process Overview</span>
            <h2 id="process-heading" className="text-heading section-header__title">
              The Election Journey at a Glance
            </h2>
          </div>
          <div className="process-snapshot__grid">
            {electionStages.map((s, i) => (
              <div key={s.num} className="process-card">
                <div className="process-card__icon" style={{ background: `${s.color}20`, border: `1.5px solid ${s.color}40` }}>
                  <span style={{ fontSize: '1.6rem' }}>{s.icon}</span>
                </div>
                <div className="process-card__connector" style={{ background: s.color, opacity: i < electionStages.length - 1 ? 1 : 0 }}></div>
                <div className="process-card__num" style={{ color: s.color }}>{s.num}</div>
                <div className="process-card__label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="process-snapshot__cta">
            <Link to="/timeline" className="btn btn-primary">
              Explore Full Timeline <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section testimonials" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Testimonials</span>
            <h2 id="testimonials-heading" className="text-heading section-header__title">
              What Our Users Say
            </h2>
          </div>
          <div className="grid-3 testimonials__grid">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card card">
                <div className="testimonial-card__stars">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="text-caption">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner" aria-label="Call to action">
        <div className="container cta-banner__inner">
          <div className="cta-banner__text">
            <h2 className="text-heading cta-banner__title">Ready to Understand Your Vote?</h2>
            <p className="cta-banner__subtitle">Start your interactive journey through the election process today. It's free, fast, and incredibly informative.</p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/timeline" className="btn btn-primary">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link to="/learn" className="btn btn-secondary cta-banner__secondary">
              Take a Quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
