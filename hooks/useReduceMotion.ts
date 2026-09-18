import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

import { useUser } from '@/context/UserContext';

// Combines the OS-level "reduce motion" accessibility setting with the
// in-app preference, so animations can be skipped for anyone who needs
// that — without requiring them to know to dig through iOS/Android
// settings to find it.
export function useReduceMotion(): boolean {
  const { profile } = useUser();
  const [osReduceMotion, setOsReduceMotion] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled?.().then((value) => {
      if (mounted) setOsReduceMotion(!!value);
    });
    const subscription = AccessibilityInfo.addEventListener?.('reduceMotionChanged', (value) => {
      setOsReduceMotion(!!value);
    });
    return () => {
      mounted = false;
      subscription?.remove?.();
    };
  }, []);

  return osReduceMotion || profile.prefs.reduceMotion;
}
