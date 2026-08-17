import { Pressable, StyleSheet, type PressableProps, type ViewProps } from 'react-native';

import { ThemedView } from './themed-view';

import { Radius, Spacing } from '@/constants/theme';
import { useElevation, useTheme } from '@/hooks/use-theme';

export function Card({ style, ...props }: ViewProps) {
  const theme = useTheme();
  const elevation = useElevation();
  return (
    <ThemedView
      type="backgroundElement"
      style={[
        styles.card,
        {
          borderColor: theme.border,
          shadowColor: elevation.shadowColor,
          shadowOpacity: elevation.shadowOpacity,
        },
        style,
      ]}
      {...props}
    />
  );
}

export function PressableCard({ style, ...props }: PressableProps) {
  const theme = useTheme();
  const elevation = useElevation();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: theme.border,
          shadowColor: elevation.shadowColor,
          shadowOpacity: elevation.shadowOpacity,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        typeof style === 'function' ? undefined : style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.large,
    borderWidth: 1,
    padding: Spacing.four,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 3,
  },
});
