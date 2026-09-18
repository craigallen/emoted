import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, getFontSize, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';

type Props = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: Props) {
  const { profile } = useUser();
  const largeText = profile.prefs.largeText;

  return (
    <View style={styles.wrap}>
      <Text
        accessibilityRole="header"
        style={[styles.title, { fontSize: getFontSize('heading', largeText) }]}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { fontSize: getFontSize('body', largeText) }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textSecondary,
  },
});
