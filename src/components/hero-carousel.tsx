import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type ViewProps,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const SLIDE_DURATION_MS = 4500;
const FADE_DURATION_MS = 900;

type HeroCarouselProps = {
  images: ImageSourcePropType[];
  height?: number;
  /** Color-grade over the imagery — used to reflect live weather conditions. */
  tintColor?: string;
  children?: React.ReactNode;
  style?: ViewProps['style'];
};

/** Auto-rotating hero banner: crossfades between images behind fixed overlay content. */
export function HeroCarousel({
  images,
  height = 340,
  tintColor,
  children,
  style,
}: HeroCarouselProps) {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then((enabled) => {
      reducedMotionRef.current = enabled;
    });
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      if (reducedMotionRef.current) return;
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <View style={[{ height }, styles.container, style]}>
      {images.map((source, i) => (
        <CrossfadeLayer key={i} source={source} active={i === index} />
      ))}
      {tintColor && <View style={[StyleSheet.absoluteFill, { backgroundColor: tintColor }]} />}
      <LinearGradient
        colors={[theme.overlayScrimStart, theme.overlayScrimEnd]}
        locations={[0, 0.55]}
        style={StyleSheet.absoluteFill}
      />
      {children}
      {images.length > 1 && (
        <View style={styles.dotsRow}>
          {images.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
      )}
    </View>
  );
}

function CrossfadeLayer({ source, active }: { source: ImageSourcePropType; active: boolean }) {
  const opacity = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    opacity.value = withTiming(active ? 1 : 0, { duration: FADE_DURATION_MS });
  }, [active, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
      <Image source={source} style={StyleSheet.absoluteFill} contentFit="cover" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  dotsRow: {
    position: 'absolute',
    top: Spacing.four,
    right: Spacing.four,
    flexDirection: 'row',
    gap: Spacing.one,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: 16,
  },
});
