import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      {steps.map((label, index) => {
        const isDone = index < current;
        const isActive = index === current;
        const color = isDone || isActive ? theme.accent : theme.border;

        return (
          <View key={label} style={styles.step}>
            <View style={styles.stepHeader}>
              <View style={[styles.dot, { backgroundColor: color }]} />
              {index < steps.length - 1 && <View style={[styles.line, { backgroundColor: color }]} />}
            </View>
            <ThemedText
              type="caption"
              themeColor={isActive ? 'text' : 'textSecondary'}
              style={isActive ? styles.activeLabel : undefined}>
              {label}
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  step: {
    flex: 1,
    gap: Spacing.half,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  line: {
    flex: 1,
    height: 2,
    marginHorizontal: Spacing.half,
  },
  activeLabel: {
    fontWeight: '700',
  },
});
