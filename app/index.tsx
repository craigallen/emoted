import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';

import { useUser } from '@/context/UserContext';
import { colors } from '@/constants/theme';

export default function Index() {
  const { profile, isLoading } = useUser();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} accessibilityLabel="Loading Emoted" />
      </View>
    );
  }

  return <Redirect href={profile.onboardingComplete ? '/(tabs)' : '/onboarding/welcome'} />;
}
