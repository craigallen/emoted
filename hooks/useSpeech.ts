import { useCallback, useEffect, useRef, useState } from 'react';
import * as Speech from 'expo-speech';

// Wraps expo-speech so every screen can offer "read this aloud" with the
// child's chosen companion voice. Speech only ever starts from an explicit
// user tap (e.g. SpeakButton) — never automatically. This is the app's core
// accessibility feature for children who read slowly, don't yet read, or
// have a vision difficulty.
export function useSpeech() {
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

  return { speak, stop, isSpeaking };
}
