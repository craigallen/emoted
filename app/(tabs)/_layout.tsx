import React from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, minTouchTarget } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { getFontSize } from '@/constants/theme';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.55 }}>{emoji}</Text>;
}

export default function TabsLayout() {
  const { profile } = useUser();
  const largeText = profile.prefs.largeText;
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          minHeight: minTouchTarget + 16 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: getFontSize('caption', largeText), fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="emotions"
        options={{
          title: 'Emotions',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📚" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="calm"
        options={{
          title: 'Calm Down',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🫧" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'My Journal',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📔" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚙️" focused={focused} />,
        }}
      />
      {/*
        These are detail screens reached by drilling into a tab (an emotion's
        page, a calm-down tool), not destinations of their own. Without
        `href: null`, Expo Router auto-adds every nested route file as its
        own tab bar entry, which overflowed the bar with extra icon-only tabs.
      */}
      <Tabs.Screen name="emotions/[id]" options={{ href: null }} />
      <Tabs.Screen name="calm/breathing" options={{ href: null }} />
      <Tabs.Screen name="calm/grounding" options={{ href: null }} />
    </Tabs>
  );
}
