import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionHeading } from '@/components/SectionHeading';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, getFontSize, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { useMoodHistory } from '@/context/MoodHistoryContext';
import { getEmotion } from '@/data/emotions';
import { confirmAsync } from '@/utils/confirm';

function formatWhen(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  if (isToday) return `Today, ${time}`;
  return `${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}, ${time}`;
}

export default function Journal() {
  const { profile } = useUser();
  const { entries, clearHistory } = useMoodHistory();
  const largeText = profile.prefs.largeText;

  const rows = useMemo(
    () =>
      entries.map((entry) => ({
        entry,
        emotion: getEmotion(entry.emotionId),
      })),
    [entries]
  );

  async function confirmClear() {
    const confirmed = await confirmAsync(
      'Clear your journal?',
      'This will remove all your saved feelings. This cannot be undone.',
      'Clear it'
    );
    if (confirmed) clearHistory();
  }

  return (
    <ScreenContainer>
      <SectionHeading title="My Journal" subtitle="A private record of the feelings you've shared. Only you can see this." />

      {rows.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📔</Text>
          <Text style={[styles.emptyText, { fontSize: getFontSize('body', largeText) }]}>
            Nothing here yet. Head to Home and share how you're feeling!
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {rows.map(({ entry, emotion }) => (
            <View key={entry.id} style={[styles.row, { backgroundColor: (emotion?.color ?? colors.border) + '1f' }]}>
              <Text style={styles.rowEmoji}>{emotion?.emoji ?? '❓'}</Text>
              <View style={styles.rowText}>
                <Text style={[styles.rowTitle, { fontSize: getFontSize('body', largeText) }]}>
                  {emotion?.name ?? 'Unknown feeling'}
                </Text>
                <Text style={[styles.rowTime, { fontSize: getFontSize('caption', largeText) }]}>
                  {formatWhen(entry.createdAt)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {rows.length > 0 ? (
        <View style={styles.clearAction}>
          <PrimaryButton label="Clear my journal" variant="outline" onPress={confirmClear} />
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xxl },
  emptyEmoji: { fontSize: 48 },
  emptyText: { color: colors.textSecondary, textAlign: 'center' },
  list: { gap: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.md,
  },
  rowEmoji: { fontSize: 28 },
  rowText: { flex: 1, gap: 2 },
  rowTitle: { color: colors.textPrimary, fontWeight: '700' },
  rowTime: { color: colors.textSecondary },
  clearAction: { marginTop: spacing.xl },
});
