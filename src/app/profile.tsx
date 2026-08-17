import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { MembershipCard } from '@/components/membership-card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { useLanguage } from '@/context/language-context';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { language, setLanguage } = useLanguage();

  const settingsRows: { icon: keyof typeof Ionicons.glyphMap; labelKey: string }[] = [
    { icon: 'person-outline', labelKey: 'profile.account' },
    { icon: 'card-outline', labelKey: 'profile.membership' },
    { icon: 'notifications-outline', labelKey: 'profile.notifications' },
    { icon: 'information-circle-outline', labelKey: 'profile.aboutClub' },
    { icon: 'mail-outline', labelKey: 'profile.contactUs' },
  ];

  return (
    <Screen>
      <ThemedText type="heading">{t('profile.title')}</ThemedText>

      <MembershipCard name="Yousef Al Mansoori" tier="Gold Member" memberId="LSC · 004821" />

      <Card style={styles.languageCard}>
        <View style={styles.languageHeader}>
          <Ionicons name="globe-outline" size={20} color={theme.accent} />
          <ThemedText type="bodyBold">{t('profile.language')}</ThemedText>
        </View>
        <View style={[styles.languageToggle, { backgroundColor: theme.background, borderColor: theme.border }]}>
          <LanguageOption code="en" label="English" active={language === 'en'} onPress={setLanguage} />
          <LanguageOption code="ar" label="العربية" active={language === 'ar'} onPress={setLanguage} />
        </View>
      </Card>

      <Card style={styles.listCard}>
        {settingsRows.map((row, index) => (
          <Pressable
            key={row.labelKey}
            style={[
              styles.row,
              index < settingsRows.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border },
            ]}>
            <View style={[styles.rowIconWrap, { backgroundColor: theme.backgroundSelected }]}>
              <Ionicons name={row.icon} size={17} color={theme.text} />
            </View>
            <ThemedText type="body" style={styles.rowLabel}>
              {t(row.labelKey)}
            </ThemedText>
            <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
          </Pressable>
        ))}
      </Card>
    </Screen>
  );
}

function LanguageOption({
  code,
  label,
  active,
  onPress,
}: {
  code: 'en' | 'ar';
  label: string;
  active: boolean;
  onPress: (code: 'en' | 'ar') => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={() => onPress(code)}
      style={[styles.languageOption, active && { backgroundColor: theme.accent }]}>
      <ThemedText type="bodyBold" style={active && styles.languageOptionActiveLabel}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  languageCard: {
    gap: Spacing.three,
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  languageToggle: {
    flexDirection: 'row',
    gap: Spacing.half,
    borderRadius: Radius.medium,
    borderWidth: 1,
    padding: Spacing.half,
  },
  languageOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Radius.small,
  },
  languageOptionActiveLabel: {
    color: '#1A1512',
  },
  listCard: {
    padding: 0,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  rowIconWrap: {
    width: 34,
    height: 34,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
  },
});
