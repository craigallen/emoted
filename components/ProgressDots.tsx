import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

type Props = {
  total: number;
  current: number; // zero-based index
};

export function ProgressDots({ total, current }: Props) {
  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`Step ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, { backgroundColor: i === current ? colors.primary : colors.border }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
