import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { LanguageProvider } from '@/context/language-context';
import { FontsToLoad } from '@/constants/theme';
import { isLightPeriod, useTimePeriod } from '@/hooks/use-time-period';
import { suppressFontObserverTimeout } from '@/utils/suppress-font-observer-timeout';
import '@/i18n';

SplashScreen.preventAutoHideAsync();
suppressFontObserverTimeout();

export default function RootLayout() {
  const period = useTimePeriod();
  const [fontsLoaded] = useFonts(FontsToLoad);

  if (!fontsLoaded) return null;

  return (
    <LanguageProvider>
      <ThemeProvider value={isLightPeriod(period) ? DefaultTheme : DarkTheme}>
        <AnimatedSplashOverlay />
        <AppTabs />
      </ThemeProvider>
    </LanguageProvider>
  );
}
