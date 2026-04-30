import { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, ChevronLeft, RotateCcw, User, MapPin, Calendar, Shield } from 'lucide-react';
import './Eligibility.css';

const questions = [
  {
    id: 'age',
    icon: <Calendar size={22} />,
    question: 'How old are you?',
    subtext: 'Most jurisdictions require voters to be at least 18 years old on or before Election Day.',
    type: 'choice',
    options: [
      { value: 'under18', label: 'Under 18', hint: 'Not yet eligible in most places' },
      { value: '17',      label: '17 years old', hint: 'Check pre-registration rules' },
      { value: '18plus',  label: '18 or older', hint: 'You meet the age requirement!' },
    ],
  },
  {
    id: 'citizenship',
    icon: <Shield size={22} />,
    question: 'Are you a citizen of the country?',
    subtext: 'Voting is generally reserved for citizens. Some local elections allow permanent residents to vote.',
    type: 'choice',
    options: [
      { value: 'yes',         label: 'Yes, I am a citizen', hint: 'You meet the citizenship requirement!' },
      { value: 'permanent',   label: 'Permanent resident / Green card holder', hint: 'May be eligible for some local elections' },
      { value: 'no',          label: 'No, I am not a citizen', hint: 'Generally not eligible for national elections' },
    ],
  },
  {
    id: 'residency',
    icon: <MapPin size={22} />,
    question: 'Do you have a permanent residence?',
    subtext: 'You must be registered at a stable address in the jurisdiction where you want to vote.',
    type: 'choice',
    options: [
      { value: 'yes',       label: 'Yes, I have a permanent address', hint: 'You meet the residency requirement!' },
      { value: 'temporary', label: 'I have a temporary address', hint: 'You may still be able to register' },
      { value: 'no',        label: 'No fixed address', hint: 'Some shelters or service addresses may be usable' },
    ],
  },
  {
    id: 'felony',
    icon: <User size={22} />,
    question: 'Have you been convicted of a felony?',
    subtext: 'Rules vary widely. Many places restore voting rights after completing a sentence.',
    type: 'choice',
    options: [
      { value: 'no',          label: 'No conviction', hint: 'No restriction applies' },
      { value: 'served',      label: 'Convicted but completed my sentence', hint: 'Rights may be restored — check local laws' },
      { value: 'incarcerated',label: 'Currently incarcerated', hint: 'Most jurisdictions suspend voting while incarcerated' },
    ],
  },
  {
    id: 'registered',
    icon: <CheckCircle2 size={22} />,
    question: 'Are you currently registered to vote?',
    subtext: 'Registration must typically be completed 15–30 days before Election Day.',
    type: 'choice',
    options: [
      { value: 'yes',      label: 'Yes, I am registered', hint: 'You\'re ready to vote!' },
      { value: 'unsure',   label: 'I\'m not sure', hint: 'You can check your status online' },
      { value: 'no',       label: 'No, I need to register', hint: 'Time to register!' },
    ],
  },
];

function getResult(answers) {
  const { age, citizenship, residency, felony, registered } = answers;

  if (age === 'under18') {
    return {
      status: 'ineligible',
      title: 'Not Yet Eligible',
      message: 'You must be at least 18 years old to vote in most elections. However, some states allow 17-year-olds to vote in primaries if they will be 18 by the general election.',
      actions: ['Check your state\'s pre-registration rules', 'Register when you turn 18', 'Stay engaged through youth civic programs'],
      color: '#ef4444',
      icon: '⏳',
    };
  }

  if (citizenship === 'no') {
    return {
      status: 'ineligible',
      title: 'Not Currently Eligible',
      message: 'National and most state elections require citizenship. However, some cities allow non-citizens to vote in local elections. Check your specific city\'s rules.',
      actions: ['Explore naturalization options', 'Check local election eligibility in your city', 'Stay engaged through community advocacy'],
      color: '#ef4444',
      icon: '📋',
    };
  }

  if (age === '17' && citizenship === 'yes') {
    return {
      status: 'conditional',
      title: 'Potentially Eligible (Pre-registration)',
      message: 'At 17, you may be able to pre-register to vote in many states. If you will be 18 by Election Day, you can often vote in the primary election.',
      actions: ['Check your state\'s pre-registration laws', 'Pre-register now so you\'re ready at 18', 'Confirm if you\'ll be 18 by Election Day'],
      color: '#f59e0b',
      icon: '🕐',
    };
  }

  if (felony === 'incarcerated') {
    return {
      status: 'conditional',
      title: 'Rights Currently Suspended',
      message: 'Most jurisdictions suspend voting rights during incarceration. However, 2 states (Maine & Vermont) never remove voting rights. Rights are typically restored after serving your sentence.',
      actions: ['Check your state\'s specific re-enfranchisement laws', 'Know that rights may be automatically restored upon release', 'Contact a legal aid organization for assistance'],
      color: '#f59e0b',
      icon: '⚖️',
    };
  }

  if (registered === 'no') {
    return {
      status: 'eligible-unregistered',
      title: 'Eligible — But Not Yet Registered!',
      message: 'Great news! Based on your answers, you appear to be eligible to vote. However, you still need to complete your voter registration before the deadline to cast a ballot.',
      actions: [
        'Register online at your state\'s official election website',
        'Registration deadlines are typically 15–30 days before elections',
        'You\'ll need your ID, address, and date of birth',
        'Some states offer same-day registration at polling places',
      ],
      color: '#06b6d4',
      icon: '📝',
    };
  }

  if (registered === 'unsure') {
    return {
      status: 'eligible-check',
      title: 'Eligible — Check Your Registration!',
      message: 'You appear to meet the eligibility requirements. Make sure your voter registration is current, especially if you\'ve moved recently or changed your name.',
      actions: [
        'Visit vote.gov to check your registration status',
        'Update your registration if you\'ve moved',
        'Confirm your correct polling place',
        'Request a mail-in ballot if needed',
      ],
      color: '#8b5cf6',
      icon: '🔍',
    };
  }

  return {
    status: 'eligible',
    title: 'You\'re All Set to Vote! 🎉',
    message: 'Congratulations! Based on your answers, you are fully eligible and registered to vote. Your voice matters — make sure to cast your ballot on Election Day!',
    actions: [
      'Confirm your polling place location',
      'Bring your required ID on Election Day',
      'Consider voting early to avoid lines',
      'Help others understand their eligibility too!',
    ],
    color: '#10b981',
    icon: '🗳️',
  };
}

export default function Eligibility() {
  const [step, setStep] = useState(0); // 0 = intro, 1–5 = questions, 6 = result
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const totalSteps = questions.length;
  const isIntro = step === 0;
  const isResult = step > totalSteps;
  const currentQ = questions[step - 1];
  const progress = step === 0 ? 0 : Math.round((step / totalSteps) * 100);
  const result = isResult ? getResult(answers) : null;

  const handleNext = () => {
    if (!isIntro && selected === null) return;
    if (!isIntro) setAnswers(a => ({ ...a, [currentQ.id]: selected }));
    setSelected(null);
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setSelected(answers[questions[step - 2]?.id] || null);
    setStep(s => s - 1);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setSelected(null);
  };

  return (
    <div className="eligibility-page page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container page-hero__inner">
          <span className="badge badge-primary"><CheckCircle2 size={12} /> Eligibility Checker</span>
          <h1 className="text-display page-hero__title">
            Are You <span className="gradient-text">Eligible to Vote?</span>
          </h1>
          <p className="page-hero__subtitle">
            Answer {totalSteps} quick questions to find out your voting eligibility and get personalized guidance tailored to your situation.
          </p>
        </div>
      </div>

      <div className="container eligibility-container">
        <div className="eligibility-card glass">

          {/* Progress */}
          {!isIntro && !isResult && (
            <div className="eligibility-progress">
              <div className="eligibility-progress__header">
                <span className="eligibility-progress__label">Question {step} of {totalSteps}</span>
                <span className="eligibility-progress__pct">{progress}% Complete</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {/* Intro Step */}
          {isIntro && (
            <div className="eligibility-intro animate-fade-up">
              <div className="eligibility-intro__icon">🗳️</div>
              <h2 className="text-heading eligibility-intro__title">Check Your Voter Eligibility</h2>
              <p className="eligibility-intro__desc">
                This quick, private checker will guide you through the key eligibility requirements for voting. Your answers are not stored or shared — this is purely educational.
              </p>
              <div className="eligibility-intro__features">
                {['Takes only 2 minutes', '5 simple questions', 'Personalized results', '100% private'].map(f => (
                  <div key={f} className="eligibility-intro__feature">
                    <CheckCircle2 size={16} className="eligibility-intro__feature-icon" /> {f}
                  </div>
                ))}
              </div>
              <button className="btn btn-primary eligibility-intro__cta" onClick={handleNext}>
                Start the Checker <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Question Steps */}
          {!isIntro && !isResult && currentQ && (
            <div className="eligibility-question animate-fade-up" key={step}>
              <div className="eligibility-question__icon" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--color-primary-600)' }}>
                {currentQ.icon}
              </div>
              <h2 className="text-heading eligibility-question__title">{currentQ.question}</h2>
              <p className="eligibility-question__subtext">{currentQ.subtext}</p>

              <div className="eligibility-options">
                {currentQ.options.map(opt => (
                  <button
                    key={opt.value}
                    className={`eligibility-option ${selected === opt.value ? 'eligibility-option--selected' : ''}`}
                    onClick={() => setSelected(opt.value)}
                  >
                    <div className="eligibility-option__radio">
                      {selected === opt.value && <div className="eligibility-option__radio-dot"></div>}
                    </div>
                    <div className="eligibility-option__content">
                      <span className="eligibility-option__label">{opt.label}</span>
                      <span className="eligibility-option__hint">{opt.hint}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="eligibility-nav">
                {step > 1 && (
                  <button className="btn btn-secondary" onClick={handleBack}>
                    <ChevronLeft size={16} /> Back
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={selected === null}
                  style={{ marginLeft: 'auto' }}
                >
                  {step === totalSteps ? 'See My Results' : 'Next Question'} <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Result */}
          {isResult && result && (
            <div className="eligibility-result animate-bounce-in">
              <div className="eligibility-result__icon" style={{ background: `${result.color}18`, border: `2px solid ${result.color}40` }}>
                <span style={{ fontSize: '2.5rem' }}>{result.icon}</span>
              </div>

              <div className="eligibility-result__badge" style={{ background: `${result.color}15`, color: result.color, border: `1.5px solid ${result.color}30` }}>
                {result.status === 'eligible' ? <CheckCircle2 size={16} /> : result.status === 'ineligible' ? <XCircle size={16} /> : <AlertCircle size={16} />}
                {result.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </div>

              <h2 className="text-heading eligibility-result__title" style={{ color: result.color }}>{result.title}</h2>
              <p className="eligibility-result__message">{result.message}</p>

              <div className="eligibility-result__actions-list">
                <h3 className="eligibility-result__actions-title">What to do next:</h3>
                {result.actions.map((action, i) => (
                  <div key={i} className="eligibility-result__action">
                    <span className="eligibility-result__action-num" style={{ background: result.color }}>{i + 1}</span>
                    {action}
                  </div>
                ))}
              </div>

              {/* Summary of answers */}
              <div className="eligibility-result__summary">
                <h3 className="eligibility-result__summary-title">Your Answers</h3>
                <div className="eligibility-result__summary-grid">
                  {questions.map(q => (
                    <div key={q.id} className="eligibility-result__summary-item">
                      <span className="eligibility-result__summary-q">{q.question}</span>
                      <span className="eligibility-result__summary-a">
                        {q.options.find(o => o.value === answers[q.id])?.label || '—'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn btn-secondary eligibility-result__reset" onClick={handleReset}>
                <RotateCcw size={15} /> Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
