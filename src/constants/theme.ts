/**
 * LSC (Liwa Sport Club) premium brand theme.
 * Deep wine-red + gold-on-charcoal for a dark-first editorial feel; the light
 * variant swaps in warm cream surfaces while keeping the same accent colors.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Brand = {
  wine: '#9C1730',
  wineDeep: '#6E0F22',
  gold: '#C9A24B',
  goldSoft: '#E4CD8E',
  charcoal: '#15120F',
  charcoalElevated: '#1E1A16',
  sand: '#EFE6D3',
} as const;

/**
 * Four time-of-day palettes instead of a plain light/dark pair — the app picks
 * one automatically from the device clock (see useTimePeriod), so a festival-goer
 * checking the app at sunrise sees a different mood than one checking it at night.
 */
export const Colors = {
  dawn: {
    text: '#2E2015',
    textSecondary: '#8A6F5C',
    background: '#FDF0E4',
    backgroundElement: '#FBE4D2',
    backgroundSelected: '#F6D4B8',
    primary: Brand.wine,
    primaryText: '#FFFFFF',
    accent: '#C17A3E',
    accentSoft: '#F5DEC0',
    border: '#F0DAC0',
    overlayScrimStart: 'rgba(60,30,20,0)',
    overlayScrimEnd: 'rgba(60,30,20,0.55)',
  },
  day: {
    text: '#241F19',
    textSecondary: '#726A5C',
    background: '#FBF7EF',
    backgroundElement: '#F3ECDC',
    backgroundSelected: Brand.sand,
    primary: Brand.wine,
    primaryText: '#FFFFFF',
    accent: '#A9812E',
    accentSoft: '#F1E6C8',
    border: '#E6DCC4',
    overlayScrimStart: 'rgba(21,18,15,0)',
    overlayScrimEnd: 'rgba(21,18,15,0.88)',
  },
  dusk: {
    text: '#FBEEE0',
    textSecondary: '#D9BFA8',
    background: '#2A1810',
    backgroundElement: '#3A2318',
    backgroundSelected: '#4A2E1E',
    primary: Brand.wine,
    primaryText: '#FFFFFF',
    accent: '#E2A857',
    accentSoft: '#4A3220',
    border: '#4A2E1E',
    overlayScrimStart: 'rgba(20,10,5,0)',
    overlayScrimEnd: 'rgba(20,10,5,0.85)',
  },
  night: {
    text: '#F8F3E8',
    textSecondary: '#B7AC9A',
    background: Brand.charcoal,
    backgroundElement: Brand.charcoalElevated,
    backgroundSelected: '#2B2419',
    primary: Brand.wine,
    primaryText: '#FFFFFF',
    accent: Brand.gold,
    accentSoft: '#3A2F1C',
    border: '#332B22',
    overlayScrimStart: 'rgba(15,12,10,0)',
    overlayScrimEnd: 'rgba(10,8,6,0.92)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.day;

/** Subtle color-grade applied over the hero imagery to reflect live weather. */
export const WeatherTint: Record<'clear' | 'cloudy' | 'hazy' | 'rain' | 'storm', string> = {
  clear: 'transparent',
  cloudy: 'rgba(120,130,140,0.22)',
  hazy: 'rgba(196,154,90,0.30)',
  rain: 'rgba(70,90,110,0.30)',
  storm: 'rgba(50,50,70,0.38)',
};

/** Elevation/shadow tokens keyed by the light/dark family a time period belongs to. */
export const Elevation = {
  light: { shadowColor: '#4A3B1F', shadowOpacity: 0.12 },
  dark: { shadowColor: '#000000', shadowOpacity: 0.4 },
} as const;

/** Latin gets an editorial serif/geometric-sans pairing; Arabic has no Latin-glyph
 * fallback for these Google Fonts, so it gets its own pairing (Almarai). */
export const FontFamily = {
  en: {
    display: 'Fraunces_600SemiBold',
    body: 'Manrope_400Regular',
    bodySemiBold: 'Manrope_600SemiBold',
  },
  ar: {
    display: 'Almarai_700Bold',
    body: 'Almarai_400Regular',
    bodySemiBold: 'Almarai_700Bold',
  },
} as const;

export const FontsToLoad = {
  Fraunces_600SemiBold: require('@expo-google-fonts/fraunces/600SemiBold/Fraunces_600SemiBold.ttf'),
  Manrope_400Regular: require('@expo-google-fonts/manrope/400Regular/Manrope_400Regular.ttf'),
  Manrope_600SemiBold: require('@expo-google-fonts/manrope/600SemiBold/Manrope_600SemiBold.ttf'),
  Almarai_400Regular: require('@expo-google-fonts/almarai/400Regular/Almarai_400Regular.ttf'),
  Almarai_700Bold: require('@expo-google-fonts/almarai/700Bold/Almarai_700Bold.ttf'),
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

/** Heading / subheading / body / caption scale from the brief's visual design system (§4). */
export const Type = {
  display: { fontSize: 34, lineHeight: 40 },
  heading: { fontSize: 26, lineHeight: 32 },
  subheading: { fontSize: 19, lineHeight: 25 },
  body: { fontSize: 16, lineHeight: 23 },
  bodyBold: { fontSize: 16, lineHeight: 23 },
  caption: { fontSize: 13, lineHeight: 18 },
  eyebrow: { fontSize: 12, lineHeight: 16, letterSpacing: 1.6 },
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** One consistent corner radius scale so icon tiles/cards stop mixing styles. */
export const Radius = {
  small: 8,
  medium: 14,
  large: 22,
  xlarge: 28,
  pill: 999,
} as const;

// Height of the custom bottom tab bar (src/components/app-tabs.tsx), which renders
// identically — and is absolutely positioned — on every platform.
export const BottomTabInset = 78;
export const MaxContentWidth = 800;
