import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Link, Stack } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, spacing } from '@/constants/theme';

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops' }} />
      <ScreenContainer contentStyle={styles.content}>
        <Text style={styles.emoji}>🧭</Text>
        <Text style={styles.title}>We couldn't find that page.</Text>
        <Link href="/" style={styles.link}>
          Go back home
        </Link>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  emoji: { fontSize: 48 },
  title: { fontSize: 20, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  link: { fontSize: 18, color: colors.primary, fontWeight: '700', marginTop: spacing.md },
});
