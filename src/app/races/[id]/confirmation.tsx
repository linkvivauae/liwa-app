import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { RACE_CATEGORIES } from '@/data/mock';

export default function ConfirmationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const race = RACE_CATEGORIES.find((r) => r.id === id);
  const reference = useMemo(() => `LSC-${id?.toUpperCase().slice(0, 3)}-4821`, [id]);

  return (
    <Screen>
      <View style={styles.center}>
        <View style={[styles.glow, { backgroundColor: theme.accentSoft }]} />

        <Animated.View entering={ZoomIn.duration(450)}>
          <View style={[styles.checkCircle, { backgroundColor: theme.primary, borderColor: theme.accent }]}>
            <Ionicons name="checkmark" size={40} color="#FFFFFF" />
          </View>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(200)} style={styles.textBlock}>
          <ThemedText type="heading">You're registered!</ThemedText>
          <ThemedText type="body" themeColor="textSecondary" style={styles.centerText}>
            {race?.name} — see you at the festival.
          </ThemedText>
        </Animated.View>

        <Card style={styles.refCard}>
          <ThemedText type="caption" themeColor="textSecondary" style={styles.eyebrow}>
            Booking reference
          </ThemedText>
          <ThemedText type="display" style={styles.refValue}>
            {reference}
          </ThemedText>
        </Card>

        <Pressable style={[styles.secondaryButton, { borderColor: theme.border }]}>
          <Ionicons name="calendar-outline" size={18} color={theme.text} />
          <ThemedText type="bodyBold">Add to calendar</ThemedText>
        </Pressable>

        <Pressable
          onPress={() => router.replace('/races')}
          style={[styles.primaryButton, { backgroundColor: theme.primary }]}>
          <ThemedText type="bodyBold" themeColor="primaryText">
            Done
          </ThemedText>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    gap: Spacing.four,
    paddingTop: Spacing.five,
  },
  glow: {
    position: 'absolute',
    top: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.5,
  },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  centerText: {
    textAlign: 'center',
  },
  refCard: {
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: Spacing.one,
  },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  refValue: {
    fontSize: 24,
  },
  primaryButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: 1,
  },
});
