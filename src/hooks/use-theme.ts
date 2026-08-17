import { Colors, Elevation } from '@/constants/theme';
import { isLightPeriod, useTimePeriod } from '@/hooks/use-time-period';

export function useTheme() {
  const period = useTimePeriod();
  return Colors[period];
}

export function useElevation() {
  const period = useTimePeriod();
  return Elevation[isLightPeriod(period) ? 'light' : 'dark'];
}
