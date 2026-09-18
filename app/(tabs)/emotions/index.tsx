import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionHeading } from '@/components/SectionHeading';
import { BigIconButton } from '@/components/BigIconButton';
import { spacing } from '@/constants/theme';
import { emotions } from '@/data/emotions';

export default function EmotionsLibrary() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <SectionHeading
        title="Emotion Library"
        subtitle="Tap a feeling to learn what it is and what can help."
      />
      <View style={styles.grid}>
        {emotions.map((e) => (
          <BigIconButton
            key={e.id}
            emoji={e.emoji}
            label={e.name}
            color={e.color}
            onPress={() => router.push(`/(tabs)/emotions/${e.id}`)}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'center' },
});
