import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ATHLETES, EVENT_FEED_PHOTOS } from '@/data/mock';

export default function CommunityScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [following, setFollowing] = useState<Set<string>>(new Set());

  function toggleFollow(id: string) {
    setFollowing((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <Screen>
      <ThemedText type="heading">{t('community.title')}</ThemedText>

      <View style={styles.athleteList}>
        {ATHLETES.map((athlete, index) => {
          const isFollowing = following.has(athlete.id);
          return (
            <Animated.View key={athlete.id} entering={FadeInDown.delay(index * 60).duration(400)}>
              <Card style={styles.athleteCard}>
                <Image source={athlete.photo} style={styles.avatar} contentFit="cover" />
                <View style={styles.athleteInfo}>
                  <ThemedText type="subheading">{athlete.name}</ThemedText>
                  <ThemedText type="caption" themeColor="textSecondary">
                    {athlete.category} · {athlete.seasons} seasons
                  </ThemedText>
                </View>
                <Pressable
                  onPress={() => toggleFollow(athlete.id)}
                  style={[
                    styles.followButton,
                    isFollowing
                      ? { backgroundColor: theme.accent, borderColor: theme.accent }
                      : { borderColor: theme.primary },
                  ]}>
                  <Ionicons
                    name={isFollowing ? 'checkmark' : 'notifications-outline'}
                    size={15}
                    color={isFollowing ? '#1A1512' : theme.primary}
                  />
                  <ThemedText
                    type="caption"
                    style={[styles.followLabel, { color: isFollowing ? '#1A1512' : theme.primary }]}>
                    {isFollowing ? t('community.following') : t('community.follow')}
                  </ThemedText>
                </Pressable>
              </Card>
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.feedSection}>
        <ThemedText type="subheading">{t('community.photoFeed')}</ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.feedRow}>
          {EVENT_FEED_PHOTOS.map((photo, index) => (
            <Image key={index} source={photo} style={styles.feedThumb} contentFit="cover" />
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  athleteList: {
    gap: Spacing.three,
  },
  athleteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: Radius.pill,
  },
  athleteInfo: {
    flex: 1,
    gap: Spacing.half,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
  },
  followLabel: {
    fontWeight: '700',
  },
  feedSection: {
    gap: Spacing.three,
  },
  feedRow: {
    gap: Spacing.two,
  },
  feedThumb: {
    width: 140,
    height: 100,
    borderRadius: Radius.medium,
  },
});
