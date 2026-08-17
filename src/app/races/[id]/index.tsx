import { Ionicons } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';

import { BackButton } from '@/components/back-button';
import { Card } from '@/components/card';
import { PhotoCard } from '@/components/photo-card';
import { Screen } from '@/components/screen';
import { StatusBadge, type RaceStatus } from '@/components/status-badge';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { RACE_CATEGORIES } from '@/data/mock';

const STATUS_LABEL_KEY: Record<RaceStatus, string> = {
  open: 'races.statusOpen',
  closingSoon: 'races.statusClosingSoon',
  full: 'races.statusFull',
  closed: 'races.statusClosed',
};

export default function RaceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const theme = useTheme();
  const race = RACE_CATEGORIES.find((r) => r.id === id);

  if (!race) {
    return (
      <Screen>
        <ThemedText type="body">Race not found.</ThemedText>
      </Screen>
    );
  }

  const canRegister = race.status === 'open' || race.status === 'closingSoon';

  return (
    <Screen edgeToEdge>
      <PhotoCard source={race.photo} height={300} radius={0} scrimHeight="tall">
        <BackButton />
        <View style={styles.heroContent}>
          <View style={[styles.iconBadge, { backgroundColor: theme.accentSoft }]}>
            <Ionicons name={race.icon} size={20} color={theme.accent} />
          </View>
          <ThemedText type="display" themeColor="primaryText">
            {race.name}
          </ThemedText>
          <StatusBadge
            status={race.status}
            label={t(STATUS_LABEL_KEY[race.status], { days: race.closesInDays })}
          />
        </View>
      </PhotoCard>

      <View style={styles.body}>
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text-outline" size={18} color={theme.accent} />
            <ThemedText type="subheading">{t('races.rules')}</ThemedText>
          </View>
          <ThemedText type="body" themeColor="textSecondary">
            Placeholder rules copy for {race.name} — replace with the official rulebook content.
          </ThemedText>
        </Card>

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="time-outline" size={18} color={theme.accent} />
            <ThemedText type="subheading">{t('races.schedule')}</ThemedText>
          </View>
          <ThemedText type="body" themeColor="textSecondary">
            Placeholder schedule — check-in, heats, and finals timing go here.
          </ThemedText>
        </Card>

        <Link href={{ pathname: '/races/[id]/register', params: { id: race.id } }} asChild>
          <Pressable
            disabled={!canRegister}
            style={StyleSheet.flatten([
              styles.registerButton,
              { backgroundColor: canRegister ? theme.primary : theme.border },
            ])}>
            <ThemedText type="bodyBold" themeColor="primaryText">
              {t('races.register')}
            </ThemedText>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.four,
    gap: Spacing.two,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
  body: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  registerButton: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
  },
});
