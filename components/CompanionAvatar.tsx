import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Companion } from '@/data/companions';
import { radii } from '@/constants/theme';

type Props = {
  companion: Companion;
  size?: number;
};

export function CompanionAvatar({ companion, size = 88 }: Props) {
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: companion.color + '33' },
      ]}
      accessible
      accessibilityLabel={companion.name}
    >
      <Text style={{ fontSize: size * 0.55 }}>{companion.emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
  },
});
