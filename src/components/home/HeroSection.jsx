import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ShieldCheck, Globe, Users, Award } from 'lucide-react';

export const HeroSection = ({ t }) => {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__bg" />
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
      
      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <div className="hero__badge badge badge-primary animate-fade-in">
              <span>{t('hero.badge')}</span>
            </div>
            <h1 className="text-heading hero__title animate-slide-up">
              {t('hero.title')} <br /> <span className="text-gradient">{t('hero.titleAccent')}</span>
            </h1>
            <p className="hero__subtitle animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>
            
            <div className="hero__actions animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/timeline" className="btn btn-primary hero__cta">
                {t('hero.cta1')} <ArrowRight size={18} />
              </Link>
              <Link to="/eligibility" className="btn btn-secondary hero__cta">
                {t('hero.cta2')} <ChevronRight size={18} />
              </Link>
            </div>

            <div className="hero__trust animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="hero__trust-item">
                <ShieldCheck size={16} /> Unbiased & Nonpartisan
              </div>
              <div className="hero__trust-item">
                <Globe size={16} /> Multilingual Support
              </div>
              <div className="hero__trust-item">
                <Users size={16} /> Accessible for Everyone
              </div>
              <div className="hero__trust-item">
                <Award size={16} /> Educational & Free
              </div>
            </div>
          </div>

          <div className="hero__visual animate-float" aria-hidden="true" style={{ transform: 'scale(0.88)', transformOrigin: 'center center' }}>
            <div className="hero__visual-card card">
              <div className="hero__visual-header">
                <div className="hero__visual-dots">
                  <span style={{ background: '#ef4444' }}></span>
                  <span style={{ background: '#f59e0b' }}></span>
                  <span style={{ background: '#22c55e' }}></span>
                </div>
                <span className="hero__visual-title">Election Process</span>
              </div>
              <div className="hero__visual-stages">
                {(t('hero.stages') || []).map((s, i) => (
                  <div key={s.num} className="hero__stage" style={{ animationDelay: `${0.6 + i * 0.08}s` }}>
                    <div className="hero__stage-icon">{s.icon}</div>
                    <div className="hero__stage-info">
                      <span className="hero__stage-num" style={{ background: s.color, color: 'white' }}>{s.num}</span>
                      <span className="hero__stage-label">{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
