import { useState, useEffect } from 'react';
import { BookOpen, Award, ChevronRight, RotateCcw, CheckCircle2, XCircle, Star, Trophy, Lightbulb, Brain } from 'lucide-react';
import './Learn.css';
import { modules, quizQuestions, badges } from '../constants/learnData';
import { useLanguage } from '../contexts/LanguageContext';

export default function Learn() {
  const [activeModule, setActiveModule] = useState(null);
  const [cardIndex, setCardIndex]       = useState(0);
  const [flipped, setFlipped]           = useState(false);
  const [completedModules, setCompleted] = useState(new Set());
  const [quizMode, setQuizMode]         = useState(false);
  const [quizStep, setQuizStep]         = useState(0);
  const [quizAnswers, setQuizAnswers]   = useState([]);
  const [quizDone, setQuizDone]         = useState(false);
  const [selectedAns, setSelectedAns]   = useState(null);
  const [showExp, setShowExp]           = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = `Learn & Quiz | ElectED — ${lang === 'es' ? 'Asistente del Proceso Electoral' : 'Election Process Assistant'}`;
  }, [lang]);

  // ── Module / Flashcard logic ──
  const openModule = (mod) => { setActiveModule(mod); setCardIndex(0); setFlipped(false); };
  const closeModule = () => { setActiveModule(null); setFlipped(false); };
  const nextCard = () => {
    if (cardIndex < activeModule.cards.length - 1) { setCardIndex(i => i+1); setFlipped(false); }
    else {
      setCompleted(s => new Set([...s, activeModule.id]));
      closeModule();
    }
  };
  const prevCard = () => { if (cardIndex > 0) { setCardIndex(i => i-1); setFlipped(false); } };

  // ── Quiz logic ──
  const startQuiz = () => { setQuizMode(true); setQuizStep(0); setQuizAnswers([]); setQuizDone(false); setSelectedAns(null); setShowExp(false); };
  const selectAnswer = (idx) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    setShowExp(true);
  };
  const nextQuizQ = () => {
    setQuizAnswers(a => [...a, selectedAns]);
    if (quizStep < quizQuestions.length - 1) { setQuizStep(s => s+1); setSelectedAns(null); setShowExp(false); }
    else { setQuizDone(true); }
  };
  const resetQuiz = () => { setQuizMode(false); setQuizStep(0); setQuizAnswers([]); setQuizDone(false); setSelectedAns(null); setShowExp(false); };

  const score = quizAnswers.filter((a, i) => a === quizQuestions[i].correct).length;
  const earnedBadges = badges.filter(b => b.quizBased ? (quizDone && score >= b.threshold) : completedModules.size >= b.threshold);

  return (
    <div className="learn-page page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container page-hero__inner">
          <span className="badge badge-primary"><BookOpen size={12} /> Learn & Quiz</span>
          <h1 className="text-display page-hero__title">
            Learn, Explore & <span className="gradient-text">Test Your Knowledge</span>
          </h1>
          <p className="page-hero__subtitle">
            Flip through interactive concept cards across {modules.length} topic modules, then take the ultimate election quiz to earn badges and track your progress.
          </p>
        </div>
      </div>

      <div className="container learn-container">

        {/* ── Badges Row ── */}
        {(completedModules.size > 0 || quizDone) && (
          <div className="badges-row animate-fade-up">
            <h2 className="badges-row__title"><Trophy size={18} /> Your Badges</h2>
            <div className="badges-list">
              {earnedBadges.map(b => (
                <div key={b.id} className="badge-item animate-bounce-in" style={{ '--badge-color': b.color }}>
                  <div className="badge-item__icon" style={{ background: `${b.color}20`, border: `2px solid ${b.color}50` }}>{b.icon}</div>
                  <div className="badge-item__info">
                    <span className="badge-item__title" style={{ color: b.color }}>{b.title}</span>
                    <span className="badge-item__desc">{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Progress Overview ── */}
        <div className="learn-progress-card card">
          <div className="learn-progress-card__left">
            <Brain size={20} className="learn-progress-card__icon" />
            <div>
              <p className="learn-progress-card__label">Module Progress</p>
              <p className="learn-progress-card__value">{completedModules.size} / {modules.length} Completed</p>
            </div>
          </div>
          <div className="learn-progress-card__bar">
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${(completedModules.size / modules.length) * 100}%` }}></div>
            </div>
          </div>
          <span className="badge badge-primary">{Math.round((completedModules.size / modules.length) * 100)}%</span>
        </div>

        {/* ── Modules Grid ── */}
        <section className="learn-section" aria-labelledby="modules-heading">
          <div className="learn-section__header">
            <h2 id="modules-heading" className="text-heading learn-section__title">
              <BookOpen size={20} /> Flashcard Modules
            </h2>
            <p className="learn-section__sub">Tap a module to start flipping through concept cards</p>
          </div>
          <div className="grid-2 modules-grid">
            {modules.map(mod => (
              <button
                key={mod.id}
                className={`module-card card ${completedModules.has(mod.id) ? 'module-card--done' : ''}`}
                onClick={() => openModule(mod)}
                style={{ '--mod-color': mod.color }}
                aria-label={`Open ${mod.title} module`}
              >
                <div className="module-card__icon" style={{ background: `${mod.color}18`, color: mod.color }}>{mod.icon}</div>
                <div className="module-card__content">
                  <div className="module-card__header">
                    <h3 className="module-card__title">{mod.title}</h3>
                    {completedModules.has(mod.id) && <CheckCircle2 size={18} className="module-card__check" style={{ color: mod.color }} />}
                  </div>
                  <p className="module-card__desc">{mod.desc}</p>
                  <p className="module-card__count">{mod.cards.length} cards</p>
                </div>
                <ChevronRight size={18} className="module-card__arrow" style={{ color: mod.color }} />
              </button>
            ))}
          </div>
        </section>

        {/* ── Flashcard Modal ── */}
        {activeModule && (
          <div className="flashcard-overlay" onClick={closeModule} role="dialog" aria-modal="true" aria-label={`${activeModule.title} flashcards`}>
            <div className="flashcard-modal animate-fade-up" onClick={e => e.stopPropagation()}>
              <div className="flashcard-modal__header">
                <div>
                  <span className="badge" style={{ background: `${activeModule.color}18`, color: activeModule.color }}>{activeModule.icon} {activeModule.title}</span>
                  <p className="flashcard-modal__progress">Card {cardIndex + 1} of {activeModule.cards.length}</p>
                </div>
                <button className="flashcard-modal__close" onClick={closeModule} aria-label="Close module">✕</button>
              </div>
              <div className="progress-bar" style={{ margin: 'var(--space-2) 0 var(--space-5)' }}>
                <div className="progress-bar-fill" style={{ width: `${((cardIndex + 1) / activeModule.cards.length) * 100}%`, background: `linear-gradient(90deg, ${activeModule.color}80, ${activeModule.color})` }}></div>
              </div>

              {/* Flip Card */}
              <div className={`flip-card ${flipped ? 'flip-card--flipped' : ''}`} onClick={() => setFlipped(f => !f)} role="button" aria-label={flipped ? 'Show question' : 'Show answer'} tabIndex={0} onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}>
                <div className="flip-card__inner">
                  <div className="flip-card__front" style={{ borderColor: `${activeModule.color}40` }}>
                    <span className="flip-card__label">Question</span>
                    <p className="flip-card__text">{activeModule.cards[cardIndex].front}</p>
                    <span className="flip-card__hint"><Lightbulb size={13} /> Tap to reveal answer</span>
                  </div>
                  <div className="flip-card__back" style={{ background: `linear-gradient(135deg, ${activeModule.color}15, ${activeModule.color}08)`, borderColor: `${activeModule.color}60` }}>
                    <span className="flip-card__label" style={{ color: activeModule.color }}>Answer</span>
                    <p className="flip-card__text">{activeModule.cards[cardIndex].back}</p>
                  </div>
                </div>
              </div>

              <div className="flashcard-modal__nav">
                <button className="btn btn-secondary" onClick={prevCard} disabled={cardIndex === 0}>← Prev</button>
                <button className="btn btn-primary" onClick={nextCard} style={{ background: activeModule.color }}>
                  {cardIndex === activeModule.cards.length - 1 ? '✓ Complete Module' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Quiz Section ── */}
        <section className="learn-section quiz-section" aria-labelledby="quiz-heading">
          <div className="learn-section__header">
            <h2 id="quiz-heading" className="text-heading learn-section__title">
              <Star size={20} /> Election Knowledge Quiz
            </h2>
            <p className="learn-section__sub">{quizQuestions.length} questions • Multiple choice • Earn badges</p>
          </div>

          {!quizMode && !quizDone && (
            <div className="quiz-intro card">
              <div className="quiz-intro__icon">🧠</div>
              <div className="quiz-intro__content">
                <h3 className="quiz-intro__title">Ready to Test Your Knowledge?</h3>
                <p className="quiz-intro__desc">Take our {quizQuestions.length}-question quiz covering all aspects of the election process. Earn badges based on your score!</p>
                <div className="quiz-intro__rewards">
                  {badges.filter(b => b.quizBased).map(b => (
                    <div key={b.id} className="quiz-intro__reward">
                      <span>{b.icon}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary quiz-intro__cta" onClick={startQuiz}>
                Start Quiz <ChevronRight size={18} />
              </button>
            </div>
          )}

          {quizMode && !quizDone && (
            <div className="quiz-active card animate-fade-up" key={quizStep}>
              <div className="quiz-active__header">
                <span className="badge badge-primary">Question {quizStep + 1} / {quizQuestions.length}</span>
                <div className="progress-bar" style={{ flex: 1 }}>
                  <div className="progress-bar-fill" style={{ width: `${((quizStep) / quizQuestions.length) * 100}%` }}></div>
                </div>
              </div>
              <h3 className="quiz-active__question">{quizQuestions[quizStep].q}</h3>
              <div className="quiz-options">
                {quizQuestions[quizStep].options.map((opt, i) => {
                  const isCorrect = i === quizQuestions[quizStep].correct;
                  const isSelected = selectedAns === i;
                  let cls = 'quiz-option';
                  if (showExp && isCorrect) cls += ' quiz-option--correct';
                  if (showExp && isSelected && !isCorrect) cls += ' quiz-option--wrong';
                  return (
                    <button key={i} className={cls} onClick={() => selectAnswer(i)} disabled={selectedAns !== null}>
                      <span className="quiz-option__letter">{String.fromCharCode(65+i)}</span>
                      <span>{opt}</span>
                      {showExp && isCorrect && <CheckCircle2 size={16} className="quiz-option__icon" />}
                      {showExp && isSelected && !isCorrect && <XCircle size={16} className="quiz-option__icon" />}
                    </button>
                  );
                })}
              </div>
              {showExp && (
                <div className="quiz-explanation animate-slide-in">
                  <Lightbulb size={15} />
                  <p>{quizQuestions[quizStep].explanation}</p>
                </div>
              )}
              {selectedAns !== null && (
                <button className="btn btn-primary" onClick={nextQuizQ} style={{ marginTop: 'var(--space-4)', width: '100%' }}>
                  {quizStep === quizQuestions.length - 1 ? 'See Results 🎉' : 'Next Question →'}
                </button>
              )}
            </div>
          )}

          {quizDone && (
            <div className="quiz-result card animate-bounce-in">
              <div className="quiz-result__score-ring" style={{ '--score-pct': `${(score / quizQuestions.length) * 100}%` }}>
                <span className="quiz-result__score-num">{score}</span>
                <span className="quiz-result__score-total">/ {quizQuestions.length}</span>
              </div>
              <h3 className="quiz-result__title">
                {score === quizQuestions.length ? '🎉 Perfect Score!' : score >= 8 ? '🌟 Excellent Work!' : score >= 5 ? '👍 Good Job!' : '📚 Keep Learning!'}
              </h3>
              <p className="quiz-result__subtitle">
                You answered {score} out of {quizQuestions.length} questions correctly — {Math.round((score / quizQuestions.length) * 100)}%
              </p>
              {/* Badge earned */}
              {(() => {
                const top = [...badges].filter(b => b.quizBased && score >= b.threshold).pop();
                return top ? (
                  <div className="quiz-result__badge-earned animate-bounce-in" style={{ background: `${top.color}15`, border: `2px solid ${top.color}40` }}>
                    <span style={{ fontSize: '2rem' }}>{top.icon}</span>
                    <div>
                      <p style={{ fontWeight: 700, color: top.color }}>{top.title}</p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Badge earned!</p>
                    </div>
                  </div>
                ) : null;
              })()}
              {/* Answer review */}
              <div className="quiz-result__review">
                {quizQuestions.map((q, i) => (
                  <div key={i} className={`quiz-result__review-item ${quizAnswers[i] === q.correct ? 'quiz-result__review-item--correct' : 'quiz-result__review-item--wrong'}`}>
                    {quizAnswers[i] === q.correct ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    <span className="quiz-result__review-q">{q.q}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-secondary" onClick={resetQuiz}><RotateCcw size={15} /> Retake Quiz</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
