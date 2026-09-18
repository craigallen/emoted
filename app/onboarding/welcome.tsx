import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SpeakButton } from '@/components/SpeakButton';
import { colors, getFontSize, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';

const WELCOME_TEXT =
  "Welcome to Emoted! This app helps you learn about your feelings, one step at a time. Let's set a few things up. You can skip any question you don't want to answer.";

export default function Welcome() {
  const router = useRouter();
  const { profile } = useUser();
  const largeText = profile.prefs.largeText;

  return (
    <ScreenContainer contentStyle={styles.content}>
      <Text style={styles.mascot} accessibilityElementsHidden importantForAccessibility="no">
        🦊🦉🐻🐢🐰
      </Text>
      <Text accessibilityRole="header" style={[styles.title, { fontSize: getFontSize('display', largeText) }]}>
        Welcome to Emoted
      </Text>
      <View style={styles.row}>
        <Text style={[styles.body, { fontSize: getFontSize('bodyLarge', largeText) }]}>{WELCOME_TEXT}</Text>
        <SpeakButton text={WELCOME_TEXT} label="Read the welcome message out loud" />
      </View>
      <View style={styles.actions}>
        <PrimaryButton label="Let's get started" onPress={() => router.push('/onboarding/name')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  mascot: { fontSize: 40 },
  title: { fontWeight: '800', color: colors.textPrimary, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  body: { flex: 1, color: colors.textSecondary, textAlign: 'center', lineHeight: 28 },
  actions: { width: '100%', marginTop: spacing.lg },
});
