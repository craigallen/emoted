export type AgeBand = 'young' | 'middle' | 'teen' | 'unknown';

// Age is optional (a child may skip it during onboarding), so this always
// has a safe fallback: 'unknown' behaves the same as 'middle' everywhere
// it's used, since that's the safest middle-ground reading level.
export function getAgeBand(age: number | null | undefined): AgeBand {
  if (age == null || Number.isNaN(age)) return 'unknown';
  if (age <= 7) return 'young';
  if (age <= 12) return 'middle';
  return 'teen';
}

export function isYoungBand(band: AgeBand): boolean {
  return band === 'young';
}
