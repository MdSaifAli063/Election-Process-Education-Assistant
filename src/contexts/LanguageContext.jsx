import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav: {
      home: 'Home', timeline: 'Timeline', eligibility: 'Eligibility', learn: 'Learn & Quiz', assistant: 'Assistant',
    },
    hero: {
      badge: 'Your Smart Election Guide',
      title: 'Understand Every Step of the',
      titleAccent: 'Election Process',
      subtitle: 'An interactive, step-by-step guide that simplifies complex election concepts into a clear, engaging, and personalized learning experience.',
      cta1: 'Start Exploring',
      cta2: 'Check Eligibility',
      stages: [
        { num: '01', label: 'Voter Registration', icon: '📋', color: '#6366f1' },
        { num: '02', label: 'Candidate Filing', icon: '🚀', color: '#a855f7' },
        { num: '03', label: 'Campaign Period', icon: '📣', color: '#06b6d4' },
        { num: '04', label: 'Voting Day', icon: '🗳️', color: '#22c55e' },
        { num: '05', label: 'Vote Counting', icon: '📊', color: '#f59e0b' },
        { num: '06', label: 'Certification', icon: '✅', color: '#ef4444' },
        { num: '07', label: 'Inauguration', icon: '🏛️', color: '#ec4899' }
      ]
    },

    stats: {
      stages: 'Election Stages', topics: 'Topics Covered', quizzes: 'Quiz Questions', languages: 'Languages',
    },
    features: {
      title: 'Everything You Need to Know',
      subtitle: 'From registration to results — explore every stage of the democratic process interactively.',
    },
    common: {
      learnMore: 'Learn More', next: 'Next', back: 'Back', submit: 'Submit', correct: 'Correct!', incorrect: 'Incorrect', tryAgain: 'Try Again', completed: 'Completed', loading: 'Loading...', close: 'Close',
    },
    chatbot: {
      title: 'ElectED Assistant', placeholder: 'Ask me anything about elections…', welcome: "Hi! I'm your Election Assistant. Ask me anything about voter registration, voting procedures, results, or any step in the election process. I'm here to help! 🗳️",
    },
  },
  es: {
    nav: {
      home: 'Inicio', timeline: 'Cronología', eligibility: 'Elegibilidad', learn: 'Aprender', assistant: 'Asistente',
    },
    hero: {
      badge: 'Tu Guía Electoral Inteligente',
      title: 'Entiende Cada Paso del',
      titleAccent: 'Proceso Electoral',
      subtitle: 'Una guía interactiva que simplifica los conceptos electorales complejos en una experiencia de aprendizaje clara y atractiva.',
      cta1: 'Comenzar a Explorar',
      cta2: 'Verificar Elegibilidad',
      stages: [
        { num: '01', label: 'Registro de Votantes', icon: '📋', color: '#6366f1' },
        { num: '02', label: 'Registro de Candidatos', icon: '🚀', color: '#a855f7' },
        { num: '03', label: 'Periodo de Campaña', icon: '📣', color: '#06b6d4' },
        { num: '04', label: 'Día de la Votación', icon: '🗳️', color: '#22c55e' },
        { num: '05', label: 'Conteo de Votos', icon: '📊', color: '#f59e0b' },
        { num: '06', label: 'Certificación', icon: '✅', color: '#ef4444' },
        { num: '07', label: 'Inauguración', icon: '🏛️', color: '#ec4899' }
      ]
    },

    stats: {
      stages: 'Etapas', topics: 'Temas', quizzes: 'Preguntas', languages: 'Idiomas',
    },
    features: {
      title: 'Todo Lo Que Necesitas Saber',
      subtitle: 'Desde el registro hasta los resultados — explora cada etapa del proceso democrático.',
    },
    common: {
      learnMore: 'Aprender Más', next: 'Siguiente', back: 'Atrás', submit: 'Enviar', correct: '¡Correcto!', incorrect: 'Incorrecto', tryAgain: 'Intentar de Nuevo', completed: 'Completado', loading: 'Cargando...', close: 'Cerrar',
    },
    chatbot: {
      title: 'Asistente ElectED', placeholder: 'Pregúntame sobre elecciones…', welcome: '¡Hola! Soy tu asistente electoral. ¡Pregúntame lo que quieras! 🗳️',
    },
  },
  hi: {
    nav: {
      home: 'मुख्य पृष्ठ', timeline: 'समयरेखा', eligibility: 'योग्यता', learn: 'सीखें', assistant: 'सहायक',
    },
    hero: {
      badge: 'आपका स्मार्ट चुनाव मार्गदर्शक',
      title: 'चुनाव प्रक्रिया के',
      titleAccent: 'हर चरण को समझें',
      subtitle: 'एक इंटरैक्टिव, चरण-दर-चरण मार्गदर्शिका जो जटिल चुनाव अवधारणाओं को एक स्पष्ट, आकर्षक अनुभव में सरल बनाती है।',
      cta1: 'एक्सप्लोर करें',
      cta2: 'योग्यता जांचें',
      stages: [
        { num: '01', label: 'मतदाता पंजीकरण', icon: '📋', color: '#6366f1' },
        { num: '02', label: 'उम्मीदवार नामांकन', icon: '🚀', color: '#a855f7' },
        { num: '03', label: 'चुनाव प्रचार', icon: '📣', color: '#06b6d4' },
        { num: '04', label: 'मतदान दिवस', icon: '🗳️', color: '#22c55e' },
        { num: '05', label: 'मतगणना', icon: '📊', color: '#f59e0b' },
        { num: '06', label: 'प्रमाणन', icon: '✅', color: '#ef4444' },
        { num: '07', label: 'शपथ ग्रहण', icon: '🏛️', color: '#ec4899' }
      ]
    },

    stats: {
      stages: 'चरण', topics: 'विषय', quizzes: 'प्रश्न', languages: 'भाषाएं',
    },
    features: {
      title: 'वह सब कुछ जो आपको जानना चाहिए',
      subtitle: 'पंजीकरण से लेकर परिणामों तक — लोकतांत्रिक प्रक्रिया के हर चरण का अन्वेषण करें।',
    },
    common: {
      learnMore: 'और जानें', next: 'अगला', back: 'पीछे', submit: 'जमा करें', correct: 'सही!', incorrect: 'गलत', tryAgain: 'पुनः प्रयास करें', completed: 'पूरा हुआ', loading: 'लोड हो रहा है...', close: 'बंद करें',
    },
    chatbot: {
      title: 'ElectED सहायक', placeholder: 'चुनाव के बारे में कुछ भी पूछें...', welcome: 'नमस्ते! मैं आपका चुनाव सहायक हूँ। चुनाव प्रक्रिया के बारे में कुछ भी पूछें! 🗳️',
    },
  },
  ur: {
    nav: {
      home: 'ہوم', timeline: 'ٹائم لائن', eligibility: 'اہلیت', learn: 'سیکھیں', assistant: 'مددگار',
    },
    hero: {
      badge: 'آپ کا سمارٹ الیکشن گائیڈ',
      title: 'انتخابی عمل کے',
      titleAccent: 'ہر مرحلے کو سمجھیں',
      subtitle: 'ایک انٹرایکٹو، مرحلہ وار گائیڈ جو پیچیدہ انتخابی تصورات کو ایک واضح، پرکشش تجربے میں آسان بناتی ہے۔',
      cta1: 'ایکسپلور کریں',
      cta2: 'اہلیت چیک کریں',
      stages: [
        { num: '01', label: 'ووٹر رجسٹریشن', icon: '📋', color: '#6366f1' },
        { num: '02', label: 'امیدوار کا اندراج', icon: '🚀', color: '#a855f7' },
        { num: '03', label: 'انتخابی مہم', icon: '📣', color: '#06b6d4' },
        { num: '04', label: 'ووٹنگ کا دن', icon: '🗳️', color: '#22c55e' },
        { num: '05', label: 'ووٹوں کی گنتی', icon: '📊', color: '#f59e0b' },
        { num: '06', label: 'تصدیق', icon: '✅', color: '#ef4444' },
        { num: '07', label: 'حلف برداری', icon: '🏛️', color: '#ec4899' }
      ]
    },

    stats: {
      stages: 'مراحل', topics: 'موضوعات', quizzes: 'سوالات', languages: 'زبانیں',
    },
    features: {
      title: 'وہ سب کچھ جو آپ کو جاننے کی ضرورت ہے',
      subtitle: 'رجسٹریشن سے لے کر نتائج تک — جمہوری عمل کے ہر مرحلے کو دریافت کریں۔',
    },
    common: {
      learnMore: 'مزید جانیں', next: 'اگلا', back: 'پیچھے', submit: 'جمع کروائیں', correct: 'درست!', incorrect: 'غلط', tryAgain: 'دوبارہ کوشش کریں', completed: 'مکمل', loading: 'لوڈ ہو رہا ہے...', close: 'بند کریں',
    },
    chatbot: {
      title: 'ElectED مددگار', placeholder: 'انتخابات کے بارے میں کچھ بھی پوچھیں...', welcome: 'ہیلو! میں آپ کا الیکشن اسسٹنٹ ہوں۔ انتخابی عمل کے بارے میں کچھ بھی پوچھیں! 🗳️',
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('elected-lang') || 'en');

  const t = (path) => {
    const keys = path.split('.');
    let val = translations[lang];
    for (const k of keys) { val = val?.[k]; }
    return val || path;
  };

  const setLanguage = (l) => {
    setLang(l);
    localStorage.setItem('elected-lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t, availableLangs: Object.keys(translations) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
