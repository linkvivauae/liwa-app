import { useEffect, useState } from 'react';

export type WeatherCondition = 'clear' | 'cloudy' | 'hazy' | 'rain' | 'storm';

export type Weather = {
  tempC: number;
  condition: WeatherCondition;
};

// Liwa Oasis, Abu Dhabi — where the festival (and this club's races) take place.
const LIWA_LATITUDE = 23.14;
const LIWA_LONGITUDE = 53.75;
const REFRESH_INTERVAL_MS = 15 * 60_000;

// WMO weather codes: https://open-meteo.com/en/docs
function conditionForCode(code: number): WeatherCondition {
  if (code === 0 || code === 1) return 'clear';
  if (code === 2 || code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'hazy';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if (code >= 95) return 'storm';
  return 'clear';
}

async function fetchWeather(): Promise<Weather | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LIWA_LATITUDE}&longitude=${LIWA_LONGITUDE}&current_weather=true`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    const current = data?.current_weather;
    if (!current) return null;
    return {
      tempC: Math.round(current.temperature),
      condition: conditionForCode(current.weathercode),
    };
  } catch {
    return null;
  }
}

/** Live conditions for Liwa — used to color-grade the Home hero and show a weather chip. */
export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    let cancelled = false;

    function load() {
      fetchWeather().then((result) => {
        if (!cancelled && result) setWeather(result);
      });
    }

    load();
    const id = setInterval(load, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return weather;
}
