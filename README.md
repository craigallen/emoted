# Emoted

A simple, accessible app to help kids learn about and check in with their feelings — built to run on **web, iOS, and Android from one codebase**.

Based on the "Emoted" UX case study (emotion learning for kids, with a friendly read-aloud companion, high-contrast kid-friendly visuals, and emoji-labeled emotions).

## Tech stack

- **Expo + React Native (TypeScript)**, using **Expo Router** for file-based navigation across all three platforms.
- **expo-speech** for text-to-speech ("read aloud" on every screen) — this is the app's core accessibility feature, standing in for the case study's "friendly pet that reads aloud."
- **AsyncStorage** for all persistence. Everything (name, age, chosen companion, journal entries, preferences) stays on-device only — no accounts, no backend, nothing sent anywhere.

## Getting started

```bash
npm install
npm run web       # run in the browser
npm run ios       # run in iOS Simulator (macOS + Xcode required)
npm run android   # run in an Android emulator
```

Or scan the QR code from `npx expo start` in the Expo Go app on a physical phone.

## App structure

```
app/
  onboarding/       welcome -> name -> age -> companion -> first check-in
  (tabs)/
    index.tsx        Home: mood check-in + quick actions
    emotions/         Emotion Library: browse + learn about each feeling
    calm/              Calm-down tools: breathing, 5-4-3-2-1 grounding
    journal.tsx        A private, on-device log of logged feelings
    settings.tsx        Edit profile, accessibility prefs, reset data
components/         Shared UI: buttons, cards, the read-aloud button, etc.
context/            UserContext (profile+prefs), MoodHistoryContext (journal)
data/               Emotion library content, companions, calm-down scripts
hooks/              useSpeech (read-aloud), useReduceMotion
```

## Onboarding

Per your request, the onboarding flow is: **Welcome → name (optional) → age (optional) → pick a companion → first mood check-in (optional)**. Every question has a visible "Skip" option, and skipping is a first-class path, not a hidden one. Age is only used locally to pick simpler vs. more nuanced wording for emotion descriptions — it's never required, and the app works the same either way ("unknown" age uses the middle-ground reading level).

## Accessibility choices

- **Read aloud everywhere**: every explanation, prompt, and instruction has a speaker button, and the child's chosen companion can read the whole screen. A "read screens out loud automatically" setting is on by default.
- Text always respects the device's OS-level font-scaling setting (nothing disables `allowFontScaling`), plus an in-app "Bigger text" toggle on top of that.
- High-contrast color palette; meaning is never carried by color alone — every emotion/mood tile pairs color with an emoji **and** a text label.
- All touch targets are at least 48×48, with explicit `accessibilityRole`/`accessibilityLabel`s throughout.
- A "Reduce animations" setting (plus respecting the OS-level reduce-motion setting) turns off the breathing exercise's animation, leaving the numeric countdown and read-aloud guidance intact.

## What's still a placeholder / next steps

- **App icons & splash screen** are the default Expo placeholders — swap `assets/icon.png`, `assets/splash-icon.png`, etc. with real artwork.
- **Emotion library content** (11 emotions with body-feelings, coping tips, etc.) is a solid starting set per the case study's "add a greater range of emotions" next step, but a grown-up/clinician review pass before shipping is worth doing.
- No accounts or parental dashboard yet — everything is single-device, local-only by design for this first version.
- `app.json`'s `ios.bundleIdentifier` / `android.package` (`com.emoted.app`) are placeholders — change them before submitting to app stores.
