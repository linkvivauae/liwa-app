import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { StepIndicator } from '@/components/step-indicator';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { RACE_CATEGORIES } from '@/data/mock';

const STEPS = ['Details', 'Payment', 'Review'];

type SubmitState = 'idle' | 'submitting' | 'error';

export default function RegisterScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const theme = useTheme();
  const race = RACE_CATEGORIES.find((r) => r.id === id);

  const [step, setStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  if (!race) {
    return (
      <Screen>
        <ThemedText type="body">Race not found.</ThemedText>
      </Screen>
    );
  }

  const isLastStep = step === STEPS.length - 1;
  const raceId = race.id;

  async function handlePrimaryAction() {
    if (!isLastStep) {
      setStep((s) => s + 1);
      return;
    }

    setSubmitState('submitting');
    // Placeholder submission — wire up to the real registration API.
    // Deliberately surfaces failure with a retry instead of freezing (brief §5, Priority 0).
    await new Promise((resolve) => setTimeout(resolve, 900));
    const succeeded = true;

    if (succeeded) {
      router.replace({ pathname: '/races/[id]/confirmation', params: { id: raceId } });
    } else {
      setSubmitState('error');
    }
  }

  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={styles.backRow} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={theme.text} />
        <ThemedText type="bodyBold">{race.name}</ThemedText>
      </Pressable>

      <StepIndicator steps={STEPS} current={step} />

      <Card style={styles.stepCard}>
        <ThemedText type="subheading">{STEPS[step]}</ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          Placeholder step content — this is where the {STEPS[step].toLowerCase()} form fields go.
        </ThemedText>
      </Card>

      {submitState === 'error' && (
        <Card style={[styles.errorCard, { borderColor: theme.primary }]}>
          <ThemedText type="bodyBold" themeColor="primary">
            Registration failed — please check your connection.
          </ThemedText>
          <Pressable
            onPress={handlePrimaryAction}
            style={[styles.retryButton, { backgroundColor: theme.primary }]}>
            <ThemedText type="bodyBold" themeColor="primaryText">
              {t('common.retry')}
            </ThemedText>
          </Pressable>
        </Card>
      )}

      {submitState !== 'error' && (
        <View style={styles.actionsRow}>
          {step > 0 && (
            <Pressable
              onPress={() => setStep((s) => s - 1)}
              style={[styles.secondaryButton, { borderColor: theme.border }]}>
              <ThemedText type="bodyBold">{t('common.back')}</ThemedText>
            </Pressable>
          )}
          <Pressable
            onPress={handlePrimaryAction}
            disabled={submitState === 'submitting'}
            style={[styles.primaryButton, { backgroundColor: theme.primary }]}>
            {submitState === 'submitting' ? (
              <ActivityIndicator color={theme.primaryText} />
            ) : (
              <ThemedText type="bodyBold" themeColor="primaryText">
                {isLastStep ? t('races.register') : 'Continue'}
              </ThemedText>
            )}
          </Pressable>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  stepCard: {
    gap: Spacing.two,
  },
  errorCard: {
    gap: Spacing.three,
    borderWidth: 1.5,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  primaryButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
  },
  secondaryButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: 1,
  },
  retryButton: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Radius.medium,
  },
});
