import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs, TabList, TabTrigger, TabSlot, type TabTriggerSlotProps } from 'expo-router/ui';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';

import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { isLightPeriod, useTimePeriod } from '@/hooks/use-time-period';

type TabDef = {
  name: string;
  href: '/' | '/races' | '/bookings' | '/community' | '/profile';
  labelKey: 'tabs.home' | 'tabs.races' | 'tabs.bookings' | 'tabs.community' | 'tabs.profile';
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
};

const TAB_DEFS: TabDef[] = [
  { name: 'home', href: '/', labelKey: 'tabs.home', icon: 'home-outline', iconActive: 'home' },
  { name: 'races', href: '/races', labelKey: 'tabs.races', icon: 'flag-outline', iconActive: 'flag' },
  {
    name: 'bookings',
    href: '/bookings',
    labelKey: 'tabs.bookings',
    icon: 'calendar-outline',
    iconActive: 'calendar',
  },
  {
    name: 'community',
    href: '/community',
    labelKey: 'tabs.community',
    icon: 'people-outline',
    iconActive: 'people',
  },
  {
    name: 'profile',
    href: '/profile',
    labelKey: 'tabs.profile',
    icon: 'person-circle-outline',
    iconActive: 'person-circle',
  },
];

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <BottomBar>
          {TAB_DEFS.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton icon={tab.icon} iconActive={tab.iconActive} labelKey={tab.labelKey} />
            </TabTrigger>
          ))}
        </BottomBar>
      </TabList>
    </Tabs>
  );
}

function BottomBar({ children, ...props }: React.ComponentProps<typeof View>) {
  const theme = useTheme();
  const period = useTimePeriod();

  return (
    <View {...props} style={styles.barContainer}>
      <BlurView
        intensity={Platform.OS === 'web' ? 0 : 60}
        tint={isLightPeriod(period) ? 'light' : 'dark'}
        style={[
          styles.barInner,
          {
            borderColor: theme.border,
            backgroundColor: Platform.OS === 'web' ? theme.backgroundElement : `${theme.backgroundElement}CC`,
          },
        ]}>
        {children}
      </BlurView>
    </View>
  );
}

function TabButton({
  isFocused,
  icon,
  iconActive,
  labelKey,
  ...props
}: TabTriggerSlotProps & Pick<TabDef, 'icon' | 'iconActive' | 'labelKey'>) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Pressable {...props} style={styles.tabButton}>
      <View style={[styles.iconWrap, isFocused && { backgroundColor: theme.accentSoft }]}>
        <Ionicons
          name={isFocused ? iconActive : icon}
          size={20}
          color={isFocused ? theme.accent : theme.textSecondary}
        />
      </View>
      <ThemedText
        type="caption"
        themeColor={isFocused ? 'text' : 'textSecondary'}
        style={styles.tabLabel}>
        {t(labelKey)}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: { flex: 1 },
  barContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  barInner: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: MaxContentWidth,
    borderTopWidth: 1,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.one,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.half,
    paddingVertical: Spacing.one,
  },
  iconWrap: {
    width: 40,
    height: 28,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
  },
});
