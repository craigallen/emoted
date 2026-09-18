import AsyncStorage from '@react-native-async-storage/async-storage';

// Thin JSON wrapper around AsyncStorage. All app data lives only on-device;
// nothing here is sent anywhere. That matters for an app used by children.
export async function readJSON<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeJSON<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeKey(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export const StorageKeys = {
  profile: 'emoted.profile.v1',
  moodHistory: 'emoted.moodHistory.v1',
} as const;
