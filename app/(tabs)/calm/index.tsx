import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionHeading } from '@/components/SectionHeading';
import { colors, getFontSize, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { copingTools } from '@/data/copingTools';

export default function CalmDown() {
  const router = useRouter();
  const { profile } = useUser();
  const largeText = profile.prefs.largeText;

  return (
    <ScreenContainer>
      <SectionHeading title="Calm Down Tools" subtitle="Pick something to help your body and mind feel steadier." />
      <View style={styles.list}>
        {copingTools.map((tool) => (
          <Pressable
            key={tool.id}
            onPress={() => router.push(`/(tabs)/calm/${tool.id}`)}
            accessibilityRole="button"
            accessibilityLabel={`${tool.title}. ${tool.description}`}
            style={({ pressed }) => [styles.card, { backgroundColor: tool.color + '1f', opacity: pressed ? 0.85 : 1 }]}
          >
            <Text style={styles.emoji}>{tool.emoji}</Text>
            <View style={styles.cardText}>
              <Text style={[styles.cardTitle, { fontSize: getFontSize('bodyLarge', largeText) }]}>{tool.title}</Text>
              <Text style={[styles.cardDesc, { fontSize: getFontSize('body', largeText) }]}>{tool.description}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.lg,
  },
  emoji: { fontSize: 40 },
  cardText: { flex: 1, gap: 2 },
  cardTitle: { color: colors.textPrimary, fontWeight: '800' },
  cardDesc: { color: colors.textSecondary },
});
