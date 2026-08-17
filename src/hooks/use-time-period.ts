import { useEffect, useState } from 'react';

export type TimePeriod = 'dawn' | 'day' | 'dusk' | 'night';

const CHECK_INTERVAL_MS = 60_000;

export function periodForHour(hour: number): TimePeriod {
  if (hour >= 5 && hour < 7) return 'dawn';
  if (hour >= 7 && hour < 17) return 'day';
  if (hour >= 17 && hour < 19) return 'dusk';
  return 'night';
}

export function isLightPeriod(period: TimePeriod) {
  return period === 'dawn' || period === 'day';
}

/**
 * Drives the app's palette from the device clock instead of the OS light/dark
 * setting. Defaults to 'day' until the client hydrates — the server can't know
 * the visitor's local time, so this avoids a hydration mismatch on web.
 */
export function useTimePeriod(): TimePeriod {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [period, setPeriod] = useState<TimePeriod>('day');

  useEffect(() => {
    setHasHydrated(true);
    setPeriod(periodForHour(new Date().getHours()));

    const id = setInterval(() => {
      setPeriod(periodForHour(new Date().getHours()));
    }, CHECK_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return hasHydrated ? period : 'day';
}
