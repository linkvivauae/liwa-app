import { ScrollView, StyleSheet, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from './themed-view';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

type ScreenProps = ScrollViewProps & {
  /** Removes the default horizontal/top padding so a hero image can go full-bleed. */
  edgeToEdge?: boolean;
};

export function Screen({ children, style, edgeToEdge, ...props }: ScreenProps) {
  return (
    <ThemedView style={styles.fill}>
      <SafeAreaView style={styles.fill} edges={edgeToEdge ? ['bottom'] : undefined}>
        <ScrollView
          style={styles.fill}
          contentContainerStyle={[edgeToEdge ? styles.contentEdgeToEdge : styles.content, style]}
          showsVerticalScrollIndicator={false}
          {...props}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.five,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  contentEdgeToEdge: {
    paddingBottom: BottomTabInset + Spacing.five,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
});
