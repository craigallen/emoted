import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionHeading } from '@/components/SectionHeading';
import { PrimaryButton } from '@/components/PrimaryButton';
import { CompanionAvatar } from '@/components/CompanionAvatar';
import { colors, getFontSize, minTouchTarget, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { useMoodHistory } from '@/context/MoodHistoryContext';
import { companions } from '@/data/companions';
import { confirmAsync } from '@/utils/confirm';

export default function Settings() {
  const router = useRouter();
  const { profile, updateProfile, updatePrefs, resetProfile } = useUser();
  const { clearHistory } = useMoodHistory();
  const largeText = profile.prefs.largeText;

  const [name, setName] = useState(profile.name ?? '');
  const [ageText, setAgeText] = useState(profile.age != null ? String(profile.age) : '');

  function saveName() {
    updateProfile({ name: name.trim() ? name.trim() : null });
  }

  function saveAge() {
    const parsed = parseInt(ageText, 10);
    const valid = !Number.isNaN(parsed) && parsed > 0 && parsed < 100;
    updateProfile({ age: valid ? parsed : null });
    if (!valid) setAgeText('');
  }

  async function confirmResetEverything() {
    const confirmed = await confirmAsync(
      'Start over?',
      'This clears your name, age, friend, preferences, and your whole journal. This cannot be undone.',
      'Start over'
    );
    if (confirmed) {
      await clearHistory();
      await resetProfile();
      router.replace('/onboarding/welcome');
    }
  }

  return (
    <ScreenContainer>
      <SectionHeading title="Settings" />

      <Text style={[styles.groupTitle, { fontSize: getFontSize('bodyLarge', largeText) }]}>Your info</Text>
      <Text style={[styles.label, { fontSize: getFontSize('body', largeText) }]}>What should I call you?</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        onBlur={saveName}
        onSubmitEditing={saveName}
        placeholder="Your name (optional)"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { fontSize: getFontSize('bodyLarge', largeText) }]}
        accessibilityLabel="Your name, optional"
        maxLength={30}
      />
      <Text style={[styles.label, { fontSize: getFontSize('body', largeText) }]}>How old are you?</Text>
      <TextInput
        value={ageText}
        onChangeText={(t) => setAgeText(t.replace(/[^0-9]/g, '').slice(0, 2))}
        onBlur={saveAge}
        onSubmitEditing={saveAge}
        placeholder="Your age (optional)"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { fontSize: getFontSize('bodyLarge', largeText) }]}
        accessibilityLabel="Your age, optional"
        keyboardType="number-pad"
        maxLength={2}
      />

      <Text style={[styles.label, { fontSize: getFontSize('body', largeText) }]}>Your friend</Text>
      <View style={styles.companionRow}>
        {companions.map((c) => {
          const selected = c.id === profile.companionId;
          return (
            <Pressable
              key={c.id}
              onPress={() => updateProfile({ companionId: c.id })}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`${c.name}${selected ? ', selected' : ''}`}
              style={[styles.companionOption, selected && styles.companionOptionSelected]}
            >
              <CompanionAvatar companion={c} size={52} />
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.groupTitle, { fontSize: getFontSize('bodyLarge', largeText), marginTop: spacing.xl }]}>
        Accessibility
      </Text>
      <SettingSwitch
        label="Bigger text"
        value={profile.prefs.largeText}
        onChange={(v) => updatePrefs({ largeText: v })}
        largeText={largeText}
      />
      <SettingSwitch
        label="Reduce animations"
        value={profile.prefs.reduceMotion}
        onChange={(v) => updatePrefs({ reduceMotion: v })}
        largeText={largeText}
      />

      <Text style={[styles.groupTitle, { fontSize: getFontSize('bodyLarge', largeText), marginTop: spacing.xl }]}>
        For grown-ups
      </Text>
      <Text style={[styles.note, { fontSize: getFontSize('body', largeText) }]}>
        Emoted keeps everything on this device only. There are no accounts, no ads, and nothing is ever sent
        anywhere. You can clear all saved data at any time below.
      </Text>
      <View style={styles.dangerZone}>
        <PrimaryButton label="Start over" variant="outline" onPress={confirmResetEverything} />
      </View>
    </ScreenContainer>
  );
}

function SettingSwitch({
  label,
  value,
  onChange,
  largeText,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  largeText: boolean;
}) {
  return (
    <View style={styles.switchRow}>
      <Text style={[styles.switchLabel, { fontSize: getFontSize('body', largeText) }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        accessibilityLabel={label}
        trackColor={{ true: colors.primary, false: colors.border }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  groupTitle: { color: colors.textPrimary, fontWeight: '800', marginBottom: spacing.sm },
  label: { color: colors.textSecondary, marginBottom: spacing.xs, marginTop: spacing.sm },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radii.md,
    minHeight: minTouchTarget,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  companionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xs },
  companionOption: {
    padding: spacing.xs,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  companionOptionSelected: { borderColor: colors.primary },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    minHeight: minTouchTarget,
  },
  switchLabel: { flex: 1, color: colors.textPrimary, marginRight: spacing.md },
  note: { color: colors.textSecondary, lineHeight: 24, marginBottom: spacing.lg },
  dangerZone: { marginBottom: spacing.xxl },
});
