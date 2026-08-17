import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';

import { Radius, Spacing } from '@/constants/theme';

export type RaceStatus = 'open' | 'closingSoon' | 'full' | 'closed';

const STATUS_COLORS: Record<RaceStatus, { bg: string; fg: string }> = {
  open: { bg: '#E4F3E7', fg: '#1F7A34' },
  closingSoon: { bg: '#FBEBD6', fg: '#B4650B' },
  full: { bg: '#F0E9E2', fg: '#6B6862' },
  closed: { bg: '#F0E4E4', fg: '#A32E2E' },
};

export function StatusBadge({ status, label }: { status: RaceStatus; label: string }) {
  const colors = STATUS_COLORS[status];
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <ThemedText type="caption" style={[styles.label, { color: colors.fg }]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.pill,
  },
  label: {
    fontWeight: '600',
  },
});
