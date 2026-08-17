import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import {
  Pressable,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type PressableProps,
  type ViewProps,
} from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PhotoCardProps = {
  source: ImageSourcePropType;
  height?: number;
  radius?: number;
  scrimHeight?: 'short' | 'tall';
  children?: React.ReactNode;
  style?: ViewProps['style'];
};

/** Full-bleed image with a bottom gradient scrim so overlaid text stays legible. */
export function PhotoCard({
  source,
  height = 160,
  radius = Radius.large,
  scrimHeight = 'short',
  children,
  style,
}: PhotoCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { height, borderRadius: radius }, style]}>
      <Image source={source} style={StyleSheet.absoluteFill} contentFit="cover" />
      <LinearGradient
        colors={[theme.overlayScrimStart, theme.overlayScrimEnd]}
        locations={scrimHeight === 'tall' ? [0, 0.55] : [0.35, 1]}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

export function PressablePhotoCard({
  onPress,
  ...props
}: PhotoCardProps & { onPress?: PressableProps['onPress'] }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
      <PhotoCard {...props} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
});
