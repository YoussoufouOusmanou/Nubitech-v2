"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const detectedLanguage = navigator.language.split('-')[0];
    const supportedLanguages = ['en', 'fr'];
    const languageToUse = supportedLanguages.includes(detectedLanguage) ? detectedLanguage : 'en';

    i18next.changeLanguage(languageToUse).then(() => {
        setIsInitialized(true);
    });
  }, []);

  if (!isInitialized) {
    return null; // ou un loader
  }

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
};
