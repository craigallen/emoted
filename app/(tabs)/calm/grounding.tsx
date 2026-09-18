import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter, Stack } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SpeakButton } from '@/components/SpeakButton';
import { ProgressDots } from '@/components/ProgressDots';
import { colors, getFontSize, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { groundingExercise } from '@/data/copingTools';

const { steps, title, intro } = groundingExercise;

export default function Grounding() {
  const router = useRouter();
  const { profile } = useUser();
  const largeText = profile.prefs.largeText;
  const [index, setIndex] = useState(-1); // -1 = intro screen

  const step = index >= 0 && index < steps.length ? steps[index] : null;
  const finished = index >= steps.length;

  return (
    <ScreenContainer contentStyle={styles.content}>
      <Stack.Screen options={{ title }} />

      {index === -1 ? (
        <>
          <Text style={styles.emoji}>🌳</Text>
          <Text style={[styles.title, { fontSize: getFontSize('heading', largeText) }]}>{title}</Text>
          <Text style={[styles.body, { fontSize: getFontSize('bodyLarge', largeText) }]}>{intro}</Text>
          <PrimaryButton label="Start" onPress={() => setIndex(0)} />
        </>
      ) : null}

      {step ? (
        <View style={styles.session}>
          <ProgressDots total={steps.length} current={index} />
          <View style={styles.countCircle}>
            <Text style={[styles.count, { fontSize: getFontSize('display', largeText) }]}>{step.count}</Text>
          </View>
          <View style={styles.promptRow}>
            <Text style={[styles.prompt, { fontSize: getFontSize('bodyLarge', largeText) }]}>{step.prompt}</Text>
            <SpeakButton text={step.prompt} />
          </View>
          <PrimaryButton label={index === steps.length - 1 ? 'Finish' : 'Next'} onPress={() => setIndex(index + 1)} />
        </View>
      ) : null}

      {finished ? (
        <View style={styles.session}>
          <Text style={styles.emoji}>🌟</Text>
          <Text style={[styles.title, { fontSize: getFontSize('heading', largeText) }]}>Nicely done!</Text>
          <Text style={[styles.body, { fontSize: getFontSize('bodyLarge', largeText) }]}>
            You noticed the world around you. How do you feel now?
          </Text>
          <View style={styles.finishedActions}>
            <PrimaryButton label="Do it again" onPress={() => setIndex(0)} />
            <PrimaryButton label="Back to Calm Down" variant="outline" onPress={() => router.navigate('/(tabs)/calm')} />
          </View>
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  emoji: { fontSize: 56 },
  title: { color: colors.textPrimary, fontWeight: '800', textAlign: 'center' },
  body: { color: colors.textSecondary, textAlign: 'center', lineHeight: 26 },
  session: { alignItems: 'center', gap: spacing.lg, width: '100%' },
  countCircle: {
    width: 120,
    height: 120,
    borderRadius: radii.pill,
    backgroundColor: colors.tint3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: { color: colors.success, fontWeight: '800' },
  promptRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  prompt: { flex: 1, color: colors.textPrimary, textAlign: 'center', lineHeight: 28 },
  finishedActions: { gap: spacing.md, width: '100%', marginTop: spacing.md },
});
