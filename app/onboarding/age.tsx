import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProgressDots } from '@/components/ProgressDots';
import { SpeakButton } from '@/components/SpeakButton';
import { colors, getFontSize, minTouchTarget, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';

const PROMPT = "How old are you? This helps me use words that make sense for you. You can skip this too.";
const NOTE = 'Your age only stays on this device — it is never sent anywhere.';

export default function AgeStep() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();
  const [ageText, setAgeText] = useState(profile.age != null ? String(profile.age) : '');
  const largeText = profile.prefs.largeText;

  function goNext(finalAge: number | null) {
    updateProfile({ age: finalAge });
    router.push('/onboarding/companion');
  }

  function handleNext() {
    const parsed = parseInt(ageText, 10);
    const valid = !Number.isNaN(parsed) && parsed > 0 && parsed < 100;
    goNext(valid ? parsed : null);
  }

  return (
    <ScreenContainer>
      <ProgressDots total={4} current={1} />
      <View style={styles.speakRow}>
        <SpeakButton text={PROMPT} />
      </View>
      <Text accessibilityRole="header" style={[styles.question, { fontSize: getFontSize('heading', largeText) }]}>
        {PROMPT}
      </Text>
      <Text style={[styles.note, { fontSize: getFontSize('caption', largeText) }]}>{NOTE}</Text>
      <TextInput
        value={ageText}
        onChangeText={(t) => setAgeText(t.replace(/[^0-9]/g, '').slice(0, 2))}
        placeholder="Your age (optional)"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { fontSize: getFontSize('bodyLarge', largeText) }]}
        accessibilityLabel="Your age, this question is optional"
        keyboardType="number-pad"
        maxLength={2}
        returnKeyType="done"
        onSubmitEditing={handleNext}
      />
      <View style={styles.actions}>
        <PrimaryButton label="Next" onPress={handleNext} />
        <PrimaryButton label="Skip this question" variant="outline" onPress={() => goNext(null)} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  speakRow: { alignItems: 'flex-start', marginBottom: spacing.sm },
  question: { color: colors.textPrimary, fontWeight: '800', marginBottom: spacing.sm },
  note: { color: colors.textSecondary, marginBottom: spacing.lg },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radii.md,
    minHeight: minTouchTarget,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  actions: { gap: spacing.md, marginTop: spacing.md },
});
