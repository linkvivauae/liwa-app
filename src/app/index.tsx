import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Card } from '@/components/card';
import { HeroCarousel } from '@/components/hero-carousel';
import { PhotoCard } from '@/components/photo-card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, WeatherTint } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useWeather, type WeatherCondition } from '@/hooks/use-weather';
import { BOOKING_TYPES, HOME_STATS, NEWS_ITEMS, NEXT_EVENT, Photos } from '@/data/mock';

const WEATHER_ICON: Record<WeatherCondition, keyof typeof Ionicons.glyphMap> = {
  clear: 'sunny-outline',
  cloudy: 'cloud-outline',
  hazy: 'partly-sunny-outline',
  rain: 'rainy-outline',
  storm: 'thunderstorm-outline',
};

const STATS_OVERLAP = 40;

const HERO_IMAGES = [
  Photos.villageOrbitNight,
  Photos.motorsportDrift,
  Photos.driftCarsAerial,
  Photos.desertTentNight,
];

const QUICK_ACTIONS = [
  { href: '/races' as const, icon: 'flag-outline' as const, labelKey: 'home.quickRegister' },
  { href: '/bookings' as const, icon: 'bonfire-outline' as const, labelKey: 'home.quickBook' },
  { href: '/community' as const, icon: 'people-outline' as const, labelKey: 'home.quickCommunity' },
];

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - new Date().getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const days = daysUntil(NEXT_EVENT.date);
  const weather = useWeather();

  return (
    <Screen edgeToEdge>
      <HeroCarousel
        images={HERO_IMAGES}
        height={340}
        tintColor={weather ? WeatherTint[weather.condition] : undefined}>
        {weather && (
          <View style={styles.weatherChip}>
            <Ionicons name={WEATHER_ICON[weather.condition]} size={14} color="#FFFFFF" />
            <ThemedText type="caption" themeColor="primaryText" style={styles.weatherChipLabel}>
              {weather.tempC}°C
            </ThemedText>
          </View>
        )}
        <View style={styles.heroContent}>
          <ThemedText type="eyebrow" themeColor="primaryText" style={styles.heroEyebrow}>
            {t('home.heroCountdownTitle')}
          </ThemedText>
          <ThemedText type="display" themeColor="primaryText">
            {t('home.daysRemaining', { count: days })}
          </ThemedText>
          <ThemedText type="body" themeColor="primaryText" style={styles.heroEvent}>
            {NEXT_EVENT.name}
          </ThemedText>
          <Link href="/races" asChild>
            <Pressable style={styles.heroLinkPressable}>
              <ThemedText type="bodyBold" themeColor="primaryText" style={styles.heroLink}>
                {t('home.viewSchedule')}
              </ThemedText>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </Pressable>
          </Link>
        </View>
      </HeroCarousel>

      <View style={styles.body}>
        <View style={styles.statsRow}>
          <Stat icon="flag-outline" value={HOME_STATS.races} labelKey="home.statsRaces" />
          <Stat icon="calendar-outline" value={HOME_STATS.bookings} labelKey="home.statsBookings" />
          <Stat
            icon="people-outline"
            value={HOME_STATS.participants}
            labelKey="home.statsParticipants"
          />
        </View>

        <View style={styles.quickActionsRow}>
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.href} href={action.href} asChild>
              <Pressable
                style={StyleSheet.flatten([styles.quickAction, { borderColor: theme.border }])}>
                <View style={[styles.quickActionIcon, { backgroundColor: theme.accentSoft }]}>
                  <Ionicons name={action.icon} size={20} color={theme.accent} />
                </View>
                <ThemedText type="caption" style={styles.quickActionLabel}>
                  {t(action.labelKey)}
                </ThemedText>
              </Pressable>
            </Link>
          ))}
        </View>

        <View style={styles.bookSection}>
          <View style={styles.sectionHeaderRow}>
            <ThemedText type="subheading">{t('home.bookSectionTitle')}</ThemedText>
            <Link href="/bookings" asChild>
              <Pressable>
                <ThemedText type="bodyBold" themeColor="primary">
                  {t('home.seeAll')}
                </ThemedText>
              </Pressable>
            </Link>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookScroll}>
            {BOOKING_TYPES.map((booking, index) => (
              <Animated.View
                key={booking.id}
                entering={FadeInDown.delay(index * 60).duration(400)}
                style={styles.bookCardWrap}>
                <Link href="/bookings" asChild>
                  <Pressable>
                    <PhotoCard source={booking.photo} height={140} radius={Radius.large}>
                      <View style={styles.bookCardBadge}>
                        <ThemedText type="caption" style={styles.bookCardBadgeLabel}>
                          {booking.spotsLeft > 0
                            ? t('bookings.spotsAvailable', { count: booking.spotsLeft })
                            : t('bookings.fullyBooked')}
                        </ThemedText>
                      </View>
                      <View style={styles.bookCardContent}>
                        <ThemedText type="bodyBold" themeColor="primaryText">
                          {t(booking.labelKey)}
                        </ThemedText>
                      </View>
                    </PhotoCard>
                  </Pressable>
                </Link>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.newsSection}>
          <ThemedText type="subheading">{t('home.newsTitle')}</ThemedText>
          {NEWS_ITEMS.map((item, index) => (
            <Animated.View key={item.id} entering={FadeInDown.delay(index * 60).duration(400)}>
              <Card style={styles.newsCard}>
                <Image source={item.photo} style={styles.newsThumb} contentFit="cover" />
                <View style={styles.newsTextBlock}>
                  <ThemedText type="bodyBold">{item.title}</ThemedText>
                  <ThemedText type="caption" themeColor="textSecondary">
                    {item.date}
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
              </Card>
            </Animated.View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

function Stat({
  icon,
  value,
  labelKey,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  labelKey: string;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Card style={styles.statCard}>
      <View style={[styles.statIconWrap, { backgroundColor: theme.accentSoft }]}>
        <Ionicons name={icon} size={18} color={theme.accent} />
      </View>
      <ThemedText type="heading" style={styles.statValue}>
        {value.toLocaleString()}
      </ThemedText>
      <ThemedText type="caption" themeColor="textSecondary">
        {t(labelKey)}
      </ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  weatherChip: {
    position: 'absolute',
    top: Spacing.four,
    left: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.pill,
  },
  weatherChipLabel: {
    fontWeight: '600',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.four + STATS_OVERLAP,
    gap: Spacing.half,
  },
  heroEyebrow: {
    textTransform: 'uppercase',
    opacity: 0.85,
  },
  heroEvent: {
    opacity: 0.92,
    marginBottom: Spacing.two,
  },
  heroLinkPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    alignSelf: 'flex-start',
  },
  heroLink: {
    textDecorationLine: 'underline',
  },
  body: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.five,
    marginTop: -STATS_OVERLAP,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
    padding: Spacing.three,
    borderRadius: Radius.medium,
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.half,
  },
  statValue: {
    fontSize: 22,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: 1,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    fontWeight: '600',
  },
  bookSection: {
    gap: Spacing.three,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookScroll: {
    marginHorizontal: -Spacing.four,
    paddingHorizontal: Spacing.four,
  },
  bookCardWrap: {
    width: 220,
    marginEnd: Spacing.three,
  },
  bookCardBadge: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.pill,
  },
  bookCardBadgeLabel: {
    color: '#241F19',
    fontWeight: '600',
  },
  bookCardContent: {
    position: 'absolute',
    left: Spacing.two,
    bottom: Spacing.two,
  },
  newsSection: {
    gap: Spacing.three,
  },
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
  },
  newsThumb: {
    width: 56,
    height: 56,
    borderRadius: Radius.medium,
  },
  newsTextBlock: {
    flex: 1,
    gap: Spacing.half,
  },
});
