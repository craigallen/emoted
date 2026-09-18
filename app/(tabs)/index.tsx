import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionHeading } from '@/components/SectionHeading';
import { SpeakButton } from '@/components/SpeakButton';
import { CompanionAvatar } from '@/components/CompanionAvatar';
import { BigIconButton } from '@/components/BigIconButton';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, getFontSize, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { useMoodHistory } from '@/context/MoodHistoryContext';
import { getCompanion } from '@/data/companions';
import { emotions, getEmotion } from '@/data/emotions';

const checkinChoices = emotions.filter((e) =>
  ['happy', 'sad', 'angry', 'scared', 'worried', 'excited', 'calm', 'frustrated'].includes(e.id)
);

export default function Home() {
  const router = useRouter();
  const { profile } = useUser();
  const { entries, addEntry } = useMoodHistory();
  const [justLogged, setJustLogged] = useState(false);
  const largeText = profile.prefs.largeText;
  const companion = getCompanion(profile.companionId);

  const greeting = profile.name ? `Hi, ${profile.name}!` : 'Hi there!';
  const lastEntry = entries[0];
  const lastEmotion = lastEntry ? getEmotion(lastEntry.emotionId) : undefined;

  const speakText = useMemo(
    () => `${greeting} How are you feeling right now?`,
    [greeting]
  );

  function logMood(emotionId: string) {
    addEntry(emotionId);
    setJustLogged(true);
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <CompanionAvatar companion={companion} size={64} />
        <View style={styles.headerText}>
          <Text style={[styles.greeting, { fontSize: getFontSize('heading', largeText) }]}>{greeting}</Text>
          <Text style={[styles.sub, { fontSize: getFontSize('body', largeText) }]}>
            {companion.name} is here with you.
          </Text>
        </View>
        <SpeakButton text={speakText} />
      </View>

      <SectionHeading title="How are you feeling right now?" />
      <View style={styles.grid}>
        {checkinChoices.map((e) => (
          <BigIconButton key={e.id} emoji={e.emoji} label={e.name} color={e.color} onPress={() => logMood(e.id)} />
        ))}
      </View>

      {justLogged && lastEmotion ? (
        <View style={[styles.confirmation, { backgroundColor: lastEmotion.color + '22' }]}>
          <Text style={[styles.confirmationText, { fontSize: getFontSize('body', largeText) }]}>
            Thanks for sharing! I saved that you're feeling {lastEmotion.name.toLowerCase()} {lastEmotion.emoji}
          </Text>
        </View>
      ) : null}

      <View style={styles.quickActions}>
        <PrimaryButton label="Learn about a feeling" variant="secondary" onPress={() => router.navigate('/(tabs)/emotions')} />
        <PrimaryButton label="I need to calm down" variant="outline" onPress={() => router.navigate('/(tabs)/calm')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  headerText: { flex: 1, gap: 2 },
  greeting: { color: colors.textPrimary, fontWeight: '800' },
  sub: { color: colors.textSecondary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'center' },
  confirmation: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radii.md,
  },
  confirmationText: { color: colors.textPrimary, fontWeight: '600', textAlign: 'center' },
  quickActions: { marginTop: spacing.xl, gap: spacing.md },
});
