import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';

import { UserProvider } from '@/context/UserContext';
import { MoodHistoryProvider } from '@/context/MoodHistoryContext';
import { colors } from '@/constants/theme';

// react-native-screens is only auto-enabled on iOS/Android. Without this,
// react-navigation's web output never applies `display: none` to inactive
// tab screens (it just leaves them absolutely-positioned with a lower
// z-index), so a hidden screen's buttons stay clickable underneath the
// visible one. See app/(tabs)/_layout.tsx for how this manifested.
enableScreens();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <UserProvider>
          <MoodHistoryProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
          </MoodHistoryProvider>
        </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
