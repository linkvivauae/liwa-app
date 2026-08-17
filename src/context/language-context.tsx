import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { DevSettings, I18nManager, Platform } from 'react-native';

import i18n, { isRTL, type SupportedLanguage } from '@/i18n';

const STORAGE_KEY = 'lsc.language';

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// react-native-web's I18nManager is a no-op stub (forceRTL does nothing, isRTL is
// always false) — real RTL mirroring on web has to go through the DOM `dir` attribute.
function applyWebDirection(wantsRTL: boolean) {
  if (Platform.OS !== 'web') return;
  document.documentElement.dir = wantsRTL ? 'rtl' : 'ltr';
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<SupportedLanguage>(
    i18n.language as SupportedLanguage
  );

  useEffect(() => {
    applyWebDirection(isRTL(language));
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === 'en' || stored === 'ar') {
        applyLanguage(stored, { persisted: true });
      }
    });
  }, []);

  async function applyLanguage(next: SupportedLanguage, { persisted = false } = {}) {
    await i18n.changeLanguage(next);
    setLanguageState(next);
    if (!persisted) await AsyncStorage.setItem(STORAGE_KEY, next);

    const wantsRTL = isRTL(next);

    if (Platform.OS === 'web') {
      applyWebDirection(wantsRTL);
      return;
    }

    if (I18nManager.isRTL !== wantsRTL) {
      I18nManager.allowRTL(wantsRTL);
      I18nManager.forceRTL(wantsRTL);
      // Native layout direction only takes effect after a reload.
      if (__DEV__) DevSettings.reload();
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: applyLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
