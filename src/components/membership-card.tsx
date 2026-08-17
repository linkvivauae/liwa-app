import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';

import { Brand, Radius, Spacing } from '@/constants/theme';
import { Photos } from '@/data/mock';

export function MembershipCard({
  name,
  tier,
  memberId,
}: {
  name: string;
  tier: string;
  memberId: string;
}) {
  return (
    <LinearGradient
      colors={[Brand.wineDeep, Brand.charcoal]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}>
      <View style={[styles.ring, styles.ringOne]} />
      <View style={[styles.ring, styles.ringTwo]} />

      <View style={styles.topRow}>
        <Image source={Photos.liwaLogoWhite} style={styles.festivalLogo} contentFit="contain" />
        <Ionicons name="shield-checkmark" size={20} color={Brand.gold} />
      </View>

      <View style={styles.bottomRow}>
        <View>
          <ThemedText type="subheading" themeColor="primaryText">
            {name}
          </ThemedText>
          <ThemedText type="caption" style={styles.memberId}>
            {memberId}
          </ThemedText>
        </View>
        <View style={styles.tierBadge}>
          <ThemedText type="caption" style={styles.tierLabel}>
            {tier}
          </ThemedText>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xlarge,
    padding: Spacing.four,
    minHeight: 170,
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(201,162,75,0.35)',
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(201,162,75,0.18)',
  },
  ringOne: {
    width: 220,
    height: 220,
    right: -80,
    top: -100,
  },
  ringTwo: {
    width: 160,
    height: 160,
    right: -40,
    top: -50,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  festivalLogo: {
    width: 110,
    height: 36,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  memberId: {
    color: 'rgba(248,243,232,0.65)',
    letterSpacing: 1,
    marginTop: Spacing.half,
  },
  tierBadge: {
    backgroundColor: Brand.gold,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radius.pill,
  },
  tierLabel: {
    color: Brand.charcoal,
    fontWeight: '700',
  },
});
