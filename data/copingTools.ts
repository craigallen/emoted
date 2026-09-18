// Simple, screen-agnostic calming activities. Kept short and concrete on
// purpose — these are meant to be read aloud a step at a time by the
// child's companion.

export type BreathingStep = {
  label: 'Breathe in' | 'Hold' | 'Breathe out';
  seconds: number;
};

export const breathingExercise: {
  title: string;
  intro: string;
  steps: BreathingStep[];
  rounds: number;
} = {
  title: 'Bubble Breathing',
  intro: 'Let\'s take a few slow breaths together, like blowing up a big, gentle bubble.',
  steps: [
    { label: 'Breathe in', seconds: 4 },
    { label: 'Hold', seconds: 2 },
    { label: 'Breathe out', seconds: 6 },
  ],
  rounds: 4,
};

export type GroundingStep = {
  count: number;
  sense: string;
  prompt: string;
};

export const groundingExercise: {
  title: string;
  intro: string;
  steps: GroundingStep[];
} = {
  title: '5-4-3-2-1 Grounding',
  intro: 'This helps your mind feel steady by noticing the world around you.',
  steps: [
    { count: 5, sense: 'See', prompt: 'Name 5 things you can see right now.' },
    { count: 4, sense: 'Feel', prompt: 'Name 4 things you can touch or feel.' },
    { count: 3, sense: 'Hear', prompt: 'Name 3 things you can hear.' },
    { count: 2, sense: 'Smell', prompt: 'Name 2 things you can smell.' },
    { count: 1, sense: 'Taste', prompt: 'Name 1 thing you can taste, or that you like the taste of.' },
  ],
};

export type CopingTool = {
  id: 'breathing' | 'grounding';
  title: string;
  emoji: string;
  description: string;
  color: string;
};

export const copingTools: CopingTool[] = [
  {
    id: 'breathing',
    title: 'Bubble Breathing',
    emoji: '🫧',
    description: 'Slow, gentle breaths to help your body feel calmer.',
    color: '#5B8DEF',
  },
  {
    id: 'grounding',
    title: '5-4-3-2-1 Grounding',
    emoji: '🌳',
    description: 'Notice the world around you to help your mind feel steady.',
    color: '#1F9E6D',
  },
];
