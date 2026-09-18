import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProgressDots } from '@/components/ProgressDots';
import { SpeakButton } from '@/components/SpeakButton';
import { colors, getFontSize, minTouchTarget, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';

const PROMPT = "What should I call you? This is just for you — you can skip this if you'd rather not say.";

export default function NameStep() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();
  const [name, setName] = useState(profile.name ?? '');
  const largeText = profile.prefs.largeText;

  function goNext(finalName: string | null) {
    updateProfile({ name: finalName });
    router.push('/onboarding/age');
  }

  return (
    <ScreenContainer>
      <ProgressDots total={4} current={0} />
      <View style={styles.row}>
        <Text accessibilityRole="header" style={[styles.question, { fontSize: getFontSize('heading', largeText) }]}>
          {PROMPT}
        </Text>
        <SpeakButton text={PROMPT} />
      </View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Type your name (optional)"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { fontSize: getFontSize('bodyLarge', largeText) }]}
        accessibilityLabel="Your name, this question is optional"
        maxLength={30}
        returnKeyType="done"
        onSubmitEditing={() => goNext(name.trim() ? name.trim() : null)}
      />
      <View style={styles.actions}>
        <PrimaryButton label="Next" onPress={() => goNext(name.trim() ? name.trim() : null)} />
        <PrimaryButton label="Skip this question" variant="outline" onPress={() => goNext(null)} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.md },
  question: { flex: 1, color: colors.textPrimary, fontWeight: '800' },
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
