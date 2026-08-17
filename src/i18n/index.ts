import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './locales/ar.json';
import en from './locales/en.json';

export type SupportedLanguage = 'en' | 'ar';
export const RTL_LANGUAGES: SupportedLanguage[] = ['ar'];

export function isRTL(language: SupportedLanguage) {
  return RTL_LANGUAGES.includes(language);
}

const deviceLanguage = Localization.getLocales()[0]?.languageCode;
const initialLanguage: SupportedLanguage = deviceLanguage === 'ar' ? 'ar' : 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
