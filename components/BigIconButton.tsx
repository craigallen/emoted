import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, getFontSize, minTouchTarget, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';

type Props = {
  emoji: string;
  label: string;
  color: string;
  onPress: () => void;
  size?: 'md' | 'lg';
};

// A large, emoji + text tile used for the emotion library and the mood
// check-in picker. Color is decorative only — meaning always comes from
// the emoji and the text label together, so this stays usable for
// colorblind users.
export function BigIconButton({ emoji, label, color, onPress, size = 'md' }: Props) {
  const { profile } = useUser();
  const largeText = profile.prefs.largeText;
  const isLarge = size === 'lg';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      importantForAccessibility="yes"
      style={({ pressed }) => [
        styles.tile,
        isLarge && styles.tileLarge,
        { backgroundColor: color + '26', opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <View
        style={[styles.emojiWrap, { backgroundColor: color + '40' }]}
        importantForAccessibility="no-hide-descendants"
      >
        <Text style={{ fontSize: isLarge ? 40 : 32 }}>{emoji}</Text>
      </View>
      <Text
        style={[styles.label, { fontSize: getFontSize(isLarge ? 'bodyLarge' : 'body', largeText) }]}
        numberOfLines={2}
        importantForAccessibility="no-hide-descendants"
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    minWidth: minTouchTarget * 2,
    minHeight: minTouchTarget * 1.6,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  tileLarge: {
    minHeight: minTouchTarget * 2,
  },
  emojiWrap: {
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.textPrimary,
    fontWeight: '700',
    textAlign: 'center',
  },
});
