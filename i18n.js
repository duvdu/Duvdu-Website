// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './util/locales/en.json';
import translationAR from './util/locales/ar.json';

i18n
  .use(initReactI18next)
  .init({
    lng: "English", 
    fallbackLng: 'English', 
    resources: {
      English: {
        translation: translationEN,
      },
      Arabic: {
        translation: translationAR,
      },
    },
  });

export default i18n;