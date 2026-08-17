import { Platform } from 'react-native';

/**
 * expo-font's web loader wraps a synchronous try/catch around an async call, so
 * FontFaceObserver's 12s verification timeout (a rejected promise, not a throw)
 * slips past it as an unhandled rejection instead of being swallowed as intended.
 * The font still renders correctly via the injected @font-face rule regardless —
 * this only silences that specific known bug (expo-font#22954), nothing else.
 */
export function suppressFontObserverTimeout() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;

  window.addEventListener('unhandledrejection', (event) => {
    const message = String(event.reason?.message ?? event.reason ?? '');
    if (message.includes('timeout exceeded')) {
      event.preventDefault();
    }
  });
}
