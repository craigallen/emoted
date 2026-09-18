import { Alert, Platform } from 'react-native';

// React Native Web's Alert.alert() is a documented no-op (it does nothing
// and never calls back), so a plain Alert.alert() confirm dialog silently
// fails to do anything on web. This gives every platform a working confirm.
export function confirmAsync(title: string, message: string, confirmLabel: string): Promise<boolean> {
  if (Platform.OS === 'web') {
    return Promise.resolve(typeof window !== 'undefined' ? window.confirm(`${title}\n\n${message}`) : false);
  }
  return new Promise((resolve) => {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
      { text: confirmLabel, style: 'destructive', onPress: () => resolve(true) },
    ]);
  });
}
