import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { PhotoCard } from '@/components/photo-card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { BOOKING_TYPES } from '@/data/mock';

export default function BookingsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Screen>
      <ThemedText type="heading">{t('bookings.title')}</ThemedText>

      {BOOKING_TYPES.map((booking, index) => (
        <Animated.View key={booking.id} entering={FadeInDown.delay(index * 60).duration(400)}>
          <PhotoCard source={booking.photo} height={180}>
            <View
              style={[
                styles.availabilityBadge,
                { backgroundColor: booking.spotsLeft > 0 ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0.5)' },
              ]}>
              <ThemedText
                type="caption"
                themeColor={booking.spotsLeft > 0 ? 'text' : 'primaryText'}
                style={styles.availabilityLabel}>
                {booking.spotsLeft > 0
                  ? t('bookings.spotsAvailable', { count: booking.spotsLeft })
                  : t('bookings.fullyBooked')}
              </ThemedText>
            </View>

            <View style={styles.bottomRow}>
              <ThemedText type="subheading" themeColor="primaryText">
                {t(booking.labelKey)}
              </ThemedText>
              <Pressable
                disabled={booking.spotsLeft === 0}
                style={[
                  styles.button,
                  { backgroundColor: booking.spotsLeft > 0 ? theme.accent : 'rgba(255,255,255,0.3)' },
                ]}>
                <ThemedText type="bodyBold" style={styles.buttonLabel}>
                  {t('bookings.checkAvailability')}
                </ThemedText>
              </Pressable>
            </View>
          </PhotoCard>
        </Animated.View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  availabilityBadge: {
    position: 'absolute',
    top: Spacing.three,
    right: Spacing.three,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.pill,
  },
  availabilityLabel: {
    fontWeight: '600',
  },
  bottomRow: {
    position: 'absolute',
    left: Spacing.three,
    right: Spacing.three,
    bottom: Spacing.three,
    gap: Spacing.two,
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.medium,
  },
  buttonLabel: {
    color: '#1A1512',
  },
});
