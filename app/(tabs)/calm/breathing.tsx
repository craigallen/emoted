import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useRouter, Stack } from 'expo-router';

import { ScreenContainer } from '@/components/ScreenContainer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, getFontSize, radii, spacing } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { useSpeech } from '@/hooks/useSpeech';
import { useReduceMotion } from '@/hooks/useReduceMotion';
import { breathingExercise } from '@/data/copingTools';

const { steps, rounds, intro, title } = breathingExercise;
const totalSteps = steps.length * rounds;

export default function Breathing() {
  const router = useRouter();
  const { profile } = useUser();
  const { stop: stopSpeech } = useSpeech();
  const reduceMotion = useReduceMotion();
  const largeText = profile.prefs.largeText;

  const [running, setRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(steps[0].seconds);
  const [finished, setFinished] = useState(false);

  const scale = useRef(new Animated.Value(0.85)).current;
  const stepTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentStep = steps[stepIndex % steps.length];
  const currentRound = Math.floor(stepIndex / steps.length) + 1;

  function clearTimers() {
    if (stepTimeout.current) clearTimeout(stepTimeout.current);
    if (countdownInterval.current) clearInterval(countdownInterval.current);
  }

  function animateFor(step: typeof currentStep) {
    if (reduceMotion) return;
    const target = step.label === 'Breathe in' ? 1.35 : step.label === 'Breathe out' ? 0.85 : undefined;
    if (target == null) return;
    Animated.timing(scale, {
      toValue: target,
      duration: step.seconds * 1000,
      useNativeDriver: true,
    }).start();
  }

  function runStep(index: number) {
    const step = steps[index % steps.length];
    setStepIndex(index);
    setSecondsLeft(step.seconds);
    animateFor(step);

    countdownInterval.current = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    stepTimeout.current = setTimeout(() => {
      if (countdownInterval.current) clearInterval(countdownInterval.current);
      const next = index + 1;
      if (next >= totalSteps) {
        setRunning(false);
        setFinished(true);
      } else {
        runStep(next);
      }
    }, step.seconds * 1000);
  }

  function start() {
    setFinished(false);
    setStepIndex(0);
    setRunning(true);
    runStep(0);
  }

  function reset() {
    clearTimers();
    stopSpeech();
    setRunning(false);
    setFinished(false);
    setStepIndex(0);
    setSecondsLeft(steps[0].seconds);
    scale.setValue(0.85);
  }

  useEffect(() => {
    return () => {
      clearTimers();
      stopSpeech();
    };
  }, []);

  return (
    <ScreenContainer contentStyle={styles.content}>
      <Stack.Screen options={{ title }} />
      {!running && !finished ? (
        <>
          <Text style={[styles.title, { fontSize: getFontSize('heading', largeText) }]}>{title}</Text>
          <Text style={[styles.intro, { fontSize: getFontSize('bodyLarge', largeText) }]}>{intro}</Text>
          <PrimaryButton label="Start" onPress={start} />
        </>
      ) : null}

      {running ? (
        <View style={styles.session}>
          <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
            <Text style={[styles.stepLabel, { fontSize: getFontSize('display', largeText) }]}>{currentStep.label}</Text>
            <Text style={[styles.seconds, { fontSize: getFontSize('heading', largeText) }]}>{secondsLeft}</Text>
          </Animated.View>
          <Text style={[styles.roundText, { fontSize: getFontSize('body', largeText) }]}>
            Round {currentRound} of {rounds}
          </Text>
          <PrimaryButton label="Stop" variant="outline" onPress={reset} />
        </View>
      ) : null}

      {finished ? (
        <View style={styles.session}>
          <Text style={styles.doneEmoji}>🌟</Text>
          <Text style={[styles.title, { fontSize: getFontSize('heading', largeText) }]}>Great job!</Text>
          <Text style={[styles.intro, { fontSize: getFontSize('bodyLarge', largeText) }]}>
            You took some slow breaths. How do you feel now?
          </Text>
          <View style={styles.finishedActions}>
            <PrimaryButton label="Do it again" onPress={start} />
            <PrimaryButton label="Back to Calm Down" variant="outline" onPress={() => router.navigate('/(tabs)/calm')} />
          </View>
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  title: { color: colors.textPrimary, fontWeight: '800', textAlign: 'center' },
  intro: { color: colors.textSecondary, textAlign: 'center', lineHeight: 26 },
  session: { alignItems: 'center', gap: spacing.lg, width: '100%' },
  circle: {
    width: 220,
    height: 220,
    borderRadius: radii.pill,
    backgroundColor: colors.tint2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  stepLabel: { color: colors.primaryDark, fontWeight: '800', textAlign: 'center' },
  seconds: { color: colors.primaryDark, fontWeight: '700' },
  roundText: { color: colors.textSecondary },
  doneEmoji: { fontSize: 56 },
  finishedActions: { gap: spacing.md, width: '100%', marginTop: spacing.md },
});
