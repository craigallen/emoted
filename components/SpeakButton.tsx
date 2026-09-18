import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, minTouchTarget, radii } from '@/constants/theme';
import { useSpeech } from '@/hooks/useSpeech';

type Props = {
  text: string;
  label?: string;
};

// A button that reads its `text` aloud. Placed next to explanations
// throughout the app so a child who can't yet read fluently (or who has a
// vision difficulty) can still access every screen.
export function SpeakButton({ text, label = 'Read this out loud' }: Props) {
  const { speak, stop, isSpeaking } = useSpeech();

  return (
    <Pressable
      onPress={() => (isSpeaking ? stop() : speak(text))}
      accessibilityRole="button"
      accessibilityLabel={isSpeaking ? 'Stop reading' : label}
      style={({ pressed }) => [styles.button, { opacity: pressed ? 0.8 : 1 }]}
    >
      <Text style={styles.icon}>{isSpeaking ? '⏸️' : '🔊'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: minTouchTarget,
    minHeight: minTouchTarget,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
});
