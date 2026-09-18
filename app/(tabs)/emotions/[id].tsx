import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SpeakButton } from '@/components/SpeakButton';
import { colors, getFontSize, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { useMoodHistory } from '@/context/MoodHistoryContext';
import { getEmotion } from '@/data/emotions';
import { isYoungBand } from '@/utils/ageBand';
import { useSpeech } from '@/hooks/useSpeech';

export default function EmotionDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { profile, ageBand } = useUser();
  const { addEntry } = useMoodHistory();
  const { speak } = useSpeech();
  const [logged, setLogged] = useState(false);
  const largeText = profile.prefs.largeText;

  const emotion = getEmotion(id);

  const description = useMemo(() => {
    if (!emotion) return '';
    return isYoungBand(ageBand) ? emotion.simple : emotion.detailed;
  }, [emotion, ageBand]);

  const fullReadAloudText = useMemo(() => {
    if (!emotion) return '';
    return [
      `${emotion.name}.`,
      description,
      `In your body, ${emotion.name.toLowerCase()} might feel like: ${emotion.feelsLikeInBody.join(', ')}.`,
      `You might think: ${emotion.youMightThink}`,
      `Things that can help: ${emotion.thingsThatHelp.join(', ')}.`,
    ].join(' ');
  }, [emotion, description]);

  useEffect(() => {
    if (emotion && profile.prefs.readAloudAutoPlay) {
      speak(fullReadAloudText);
    }
    // Only re-trigger when the emotion itself changes, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emotion?.id]);

  if (!emotion) {
    return (
      <ScreenContainer>
        <Text style={styles.notFound}>We couldn't find that feeling.</Text>
        <PrimaryButton label="Back to Emotion Library" onPress={() => router.navigate('/(tabs)/emotions')} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: emotion.name }} />
      <View style={[styles.hero, { backgroundColor: emotion.color + '26' }]}>
        <Text style={styles.emoji}>{emotion.emoji}</Text>
        <View style={styles.heroText}>
          <Text accessibilityRole="header" style={[styles.name, { fontSize: getFontSize('display', largeText) }]}>
            {emotion.name}
          </Text>
        </View>
        <SpeakButton text={fullReadAloudText} label={`Read about ${emotion.name} out loud`} />
      </View>

      <Text style={[styles.paragraph, { fontSize: getFontSize('bodyLarge', largeText) }]}>{description}</Text>

      <Section title="What it might feel like in your body" largeText={largeText}>
        {emotion.feelsLikeInBody.map((f) => (
          <Bullet key={f} text={f} largeText={largeText} />
        ))}
      </Section>

      <Section title="You might think..." largeText={largeText}>
        <Text style={[styles.quote, { fontSize: getFontSize('bodyLarge', largeText) }]}>{emotion.youMightThink}</Text>
      </Section>

      <Section title="Things that can help" largeText={largeText}>
        {emotion.thingsThatHelp.map((f) => (
          <Bullet key={f} text={f} largeText={largeText} />
        ))}
      </Section>

      <View style={styles.actions}>
        <PrimaryButton
          label={logged ? "Saved to your journal ✓" : `I'm feeling ${emotion.name.toLowerCase()} right now`}
          onPress={() => {
            addEntry(emotion.id);
            setLogged(true);
          }}
          disabled={logged}
        />
        <PrimaryButton label="Show me a calm-down tool" variant="outline" onPress={() => router.navigate('/(tabs)/calm')} />
      </View>
    </ScreenContainer>
  );
}

function Section({ title, largeText, children }: { title: string; largeText: boolean; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text accessibilityRole="header" style={[styles.sectionTitle, { fontSize: getFontSize('bodyLarge', largeText) }]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function Bullet({ text, largeText }: { text: string; largeText: boolean }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={[styles.bulletText, { fontSize: getFontSize('body', largeText) }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notFound: { color: colors.textPrimary, marginBottom: spacing.lg },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.lg,
    marginBottom: spacing.lg,
  },
  emoji: { fontSize: 48 },
  heroText: { flex: 1 },
  name: { color: colors.textPrimary, fontWeight: '800' },
  paragraph: { color: colors.textPrimary, lineHeight: 28, marginBottom: spacing.lg },
  section: { marginBottom: spacing.lg, gap: spacing.sm },
  sectionTitle: { color: colors.textPrimary, fontWeight: '700' },
  quote: { color: colors.textSecondary, fontStyle: 'italic' },
  bulletRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  bulletDot: { color: colors.primary, fontSize: 18, lineHeight: 26 },
  bulletText: { flex: 1, color: colors.textPrimary, lineHeight: 26 },
  actions: { gap: spacing.md, marginTop: spacing.md, marginBottom: spacing.xl },
});
