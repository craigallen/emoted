// Central design tokens for Emoted.
// Colors are chosen to meet at least WCAG AA contrast (4.5:1) for body text
// against their paired background, and every emotion/mood color is always
// shown together with an emoji + text label so meaning never depends on
// color alone (colorblind-safe).

export const colors = {
  background: '#FFFDF8',
  surface: '#FFFFFF',
  surfaceMuted: '#F4F1FF',

  textPrimary: '#1B1F27',
  textSecondary: '#4B5262',
  textOnPrimary: '#FFFFFF',

  primary: '#4C4FD5',
  primaryDark: '#373AA6',
  secondary: '#FF7A50',
  secondaryDark: '#D65E38',

  success: '#1F9E6D',
  border: '#E3E1F5',
  shadow: '#0B0B1F',

  // Neutral tones used behind cards for gentle variety.
  tint1: '#FFF1E6',
  tint2: '#E8F4FF',
  tint3: '#EAF7EE',
  tint4: '#FDF0F6',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 10,
  md: 18,
  lg: 28,
  pill: 999,
} as const;

// Base font sizes at the "standard" text-size setting. The app also
// respects the OS-level font-scaling setting automatically, because we
// never set allowFontScaling={false} on any <Text>.
const baseFontSizes = {
  body: 17,
  bodyLarge: 20,
  heading: 26,
  display: 34,
  caption: 14,
  button: 19,
};

export type FontSizeKey = keyof typeof baseFontSizes;

// Multiplier applied on top of baseFontSizes when the user turns on
// "Bigger text" in Settings. This is in addition to, not instead of,
// the OS accessibility text-size setting.
const LARGE_TEXT_MULTIPLIER = 1.25;

export function getFontSize(key: FontSizeKey, largeText: boolean): number {
  const size = baseFontSizes[key];
  return Math.round(largeText ? size * LARGE_TEXT_MULTIPLIER : size);
}

// Minimum hit target recommended by WCAG 2.5.5 / mobile platform guidelines.
export const minTouchTarget = 48;
