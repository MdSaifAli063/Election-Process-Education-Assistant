import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, BookOpen, Calculator, ShieldCheck } from 'lucide-react';

export const FeaturesSection = ({ t }) => {
  const features = [
    { 
      title: 'Real-time Updates', 
      desc: 'Get the latest election dates and registration news instantly.', 
      icon: <MapPin size={24} />, 
      color: 'blue', 
      badge: 'Real-time',
      link: '/timeline' 
    },
    { 
      title: 'Interactive Learning', 
      desc: 'Master the election process through engaging quizzes.', 
      icon: <BookOpen size={24} />, 
      color: 'green', 
      badge: 'Interactive',
      link: '/learn' 
    },
    { 
      title: 'Smart Tools', 
      desc: 'Check your eligibility and understand your voting rights.', 
      icon: <Calculator size={24} />, 
      color: 'purple', 
      badge: 'Smart',
      link: '/eligibility' 
    },
    { 
      title: 'Official Data', 
      desc: 'Information sourced directly from verified government channels.', 
      icon: <ShieldCheck size={24} />, 
      color: 'gold', 
      badge: 'Official',
      link: '#' 
    }
  ];

  return (
    <section className="section features reveal" aria-labelledby="features-heading">
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
  );
};
