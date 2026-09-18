import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProgressDots } from '@/components/ProgressDots';
import { SpeakButton } from '@/components/SpeakButton';
import { BigIconButton } from '@/components/BigIconButton';
import { colors, getFontSize, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { useMoodHistory } from '@/context/MoodHistoryContext';
import { emotions } from '@/data/emotions';

const PROMPT = 'How are you feeling right now? Tap the one that fits best.';
const firstCheckinChoices = emotions.filter((e) =>
  ['happy', 'sad', 'angry', 'scared', 'excited', 'calm'].includes(e.id)
);

export default function FirstCheckin() {
  const router = useRouter();
  const { profile, completeOnboarding } = useUser();
  const { addEntry } = useMoodHistory();
  const largeText = profile.prefs.largeText;

  function finish(emotionId?: string) {
    if (emotionId) addEntry(emotionId);
    completeOnboarding();
    router.replace('/(tabs)');
  }

  return (
    <ScreenContainer>
      <ProgressDots total={4} current={3} />
      <View style={styles.row}>
        <Text accessibilityRole="header" style={[styles.question, { fontSize: getFontSize('heading', largeText) }]}>
          {PROMPT}
        </Text>
        <SpeakButton text={PROMPT} />
      </View>
      <View style={styles.grid}>
        {firstCheckinChoices.map((e) => (
          <BigIconButton
            key={e.id}
            emoji={e.emoji}
            label={e.name}
            color={e.color}
            onPress={() => finish(e.id)}
          />
        ))}
      </View>
      <View style={styles.actions}>
        <PrimaryButton label="Skip for now" variant="outline" onPress={() => finish()} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.lg },
  question: { flex: 1, color: colors.textPrimary, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'center' },
  actions: { marginTop: spacing.xl },
});
