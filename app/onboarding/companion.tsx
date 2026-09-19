import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProgressDots } from '@/components/ProgressDots';
import { SpeakButton } from '@/components/SpeakButton';
import { CompanionAvatar } from '@/components/CompanionAvatar';
import { colors, getFontSize, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { companions } from '@/data/companions';
import { useSpeech } from '@/hooks/useSpeech';

const PROMPT = 'Pick a friend to help you along the way. They can read things out loud for you too!';

export default function CompanionStep() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();
  const { speak } = useSpeech();
  const [selectedId, setSelectedId] = useState(profile.companionId ?? companions[0].id);
  const largeText = profile.prefs.largeText;

  function choose(id: string) {
    setSelectedId(id);
    const companion = companions.find((c) => c.id === id);
    if (companion) speak(companion.greeting);
  }

  function goNext() {
    updateProfile({ companionId: selectedId });
    router.push('/onboarding/first-checkin');
  }

  return (
    <ScreenContainer>
      <ProgressDots total={4} current={2} />
      <View style={styles.speakRow}>
        <SpeakButton text={PROMPT} />
      </View>
      <Text accessibilityRole="header" style={[styles.question, { fontSize: getFontSize('heading', largeText) }]}>
        {PROMPT}
      </Text>
      <View style={styles.grid}>
        {companions.map((c) => {
          const selected = c.id === selectedId;
          return (
            <Pressable
              key={c.id}
              onPress={() => choose(c.id)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`${c.name}${selected ? ', selected' : ''}`}
              style={({ pressed }) => [
                styles.card,
                selected && styles.cardSelected,
                { opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <CompanionAvatar companion={c} size={72} />
              <Text style={[styles.name, { fontSize: getFontSize('body', largeText) }]}>{c.name}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.actions}>
        <PrimaryButton label="This is my friend!" onPress={goNext} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  speakRow: { alignItems: 'flex-start', marginBottom: spacing.sm },
  question: { color: colors.textPrimary, fontWeight: '800', marginBottom: spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'center' },
  card: {
    width: 130,
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceMuted,
  },
  name: { color: colors.textPrimary, fontWeight: '700', textAlign: 'center' },
  actions: { marginTop: spacing.xl },
});
