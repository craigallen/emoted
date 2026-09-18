import { useCallback, useEffect, useRef, useState } from 'react';
import * as Speech from 'expo-speech';

import { useUser } from '@/context/UserContext';

// Wraps expo-speech so every screen can offer "read this aloud" with the
// child's chosen companion voice, and so the auto-play preference is
// respected in one place. This is the app's core accessibility feature for
// children who read slowly, don't yet read, or have a vision difficulty.
export function useSpeech() {
  const { profile } = useUser();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      Speech.stop();
    };
  }, []);

  const speak = useCallback((text: string) => {
    Speech.stop();
    setIsSpeaking(true);
    const handleEnd = () => {
      if (mounted.current) setIsSpeaking(false);
    };
    Speech.speak(text, {
      rate: 0.95,
      pitch: 1.05,
      onDone: handleEnd,
      onStopped: handleEnd,
      onError: handleEnd,
    });
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  const autoPlay = profile.prefs.readAloudAutoPlay;

  return { speak, stop, isSpeaking, autoPlay };
}
