import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { PressablePhotoCard } from '@/components/photo-card';
import { Screen } from '@/components/screen';
import { StatusBadge, type RaceStatus } from '@/components/status-badge';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { RACE_CATEGORIES } from '@/data/mock';

const STATUS_LABEL_KEY: Record<RaceStatus, string> = {
  open: 'races.statusOpen',
  closingSoon: 'races.statusClosingSoon',
  full: 'races.statusFull',
  closed: 'races.statusClosed',
};

export default function RacesScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <ThemedText type="heading">{t('races.title')}</ThemedText>
      <View style={styles.grid}>
        {RACE_CATEGORIES.map((race, index) => (
          <Animated.View
            key={race.id}
            entering={FadeInDown.delay(index * 50).duration(400)}
            style={styles.tileWrap}>
            <Link href={{ pathname: '/races/[id]', params: { id: race.id } }} asChild>
              <PressablePhotoCard source={race.photo} height={168} radius={Radius.large}>
                <View style={styles.tileIcon}>
                  <Ionicons name={race.icon} size={16} color="#FFFFFF" />
                </View>
                <View style={styles.tileContent}>
                  <ThemedText type="bodyBold" themeColor="primaryText">
                    {race.name}
                  </ThemedText>
                  <StatusBadge
                    status={race.status}
                    label={t(STATUS_LABEL_KEY[race.status], { days: race.closesInDays })}
                  />
                </View>
              </PressablePhotoCard>
            </Link>
          </Animated.View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  tileWrap: {
    flexBasis: '47%',
    flexGrow: 1,
  },
  tileIcon: {
    position: 'absolute',
    top: Spacing.two,
    left: Spacing.two,
    width: 30,
    height: 30,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileContent: {
    position: 'absolute',
    bottom: Spacing.two,
    left: Spacing.two,
    right: Spacing.two,
    gap: Spacing.one,
  },
});
