import { describe, it, expect } from 'vitest';

// Simulating t() function logic
const mockTranslations = {
  en: { nav: { home: 'Home' } },
  es: { nav: { home: 'Inicio' } }
};

const t = (path, lang) => {
  const keys = path.split('.');
  let val = mockTranslations[lang];
  for (const k of keys) { val = val?.[k]; }
  return val || path;
};

describe('Multilingual Translation Engine', () => {
  it('should return the correct English translation for home', () => {
    expect(t('nav.home', 'en')).toBe('Home');
  });

  it('should return the correct Spanish translation for home', () => {
    expect(t('nav.home', 'es')).toBe('Inicio');
  });

  it('should return the path if the translation is missing', () => {
    expect(t('nav.invalid', 'en')).toBe('nav.invalid');
  });
});
