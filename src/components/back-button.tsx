import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius } from '@/constants/theme';

/** Floating circular back control for edge-to-edge hero headers. */
export function BackButton({ light = true }: { light?: boolean }) {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={() => router.back()}
      accessibilityLabel="Go back"
      accessibilityRole="button"
      style={[
        styles.button,
        { top: insets.top + 12, backgroundColor: light ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.9)' },
      ]}>
      <Ionicons name="chevron-back" size={20} color={light ? '#FFFFFF' : '#241F19'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
