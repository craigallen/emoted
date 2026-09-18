import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, getFontSize, minTouchTarget, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  accessibilityHint?: string;
};

export function PrimaryButton({ label, onPress, variant = 'primary', disabled, accessibilityHint }: Props) {
  const { profile } = useUser();
  const largeText = profile.prefs.largeText;

  const backgroundColor =
    variant === 'primary' ? colors.primary : variant === 'secondary' ? colors.secondary : 'transparent';
  const textColor = variant === 'outline' ? colors.primary : colors.textOnPrimary;
  const borderColor = variant === 'outline' ? colors.primary : 'transparent';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, borderColor, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
      ]}
    >
      <Text style={[styles.label, { color: textColor, fontSize: getFontSize('button', largeText) }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: minTouchTarget,
    borderRadius: radii.pill,
    borderWidth: 2,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
