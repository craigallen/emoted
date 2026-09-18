// Friendly companions kids pick during onboarding. The companion "speaks"
// (via expo-speech, see hooks/useSpeech.ts) throughout the app, which is
// both a delight feature and the app's core accessibility feature for
// children who can't yet read fluently.

export type Companion = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  greeting: string;
};

export const companions: Companion[] = [
  {
    id: 'fox',
    name: 'Fig the Fox',
    emoji: '🦊',
    color: '#FF7A50',
    greeting: "Hi, I'm Fig! I'll be with you the whole time.",
  },
  {
    id: 'owl',
    name: 'Hazel the Owl',
    emoji: '🦉',
    color: '#8A6CD9',
    greeting: "Hoo hoo! I'm Hazel. I love learning about feelings with you.",
  },
  {
    id: 'bear',
    name: 'Bramble the Bear',
    emoji: '🐻',
    color: '#B98457',
    greeting: "Hey there, I'm Bramble. I'm always happy to give a big hug.",
  },
  {
    id: 'turtle',
    name: 'Sage the Turtle',
    emoji: '🐢',
    color: '#1F9E6D',
    greeting: "Hi, I'm Sage. I like taking things slow and calm.",
  },
  {
    id: 'bunny',
    name: 'Clover the Bunny',
    emoji: '🐰',
    color: '#E06B9B',
    greeting: "Hop hop, I'm Clover! Let's figure out feelings together.",
  },
];

export function getCompanion(id: string | null | undefined): Companion {
  return companions.find((c) => c.id === id) ?? companions[0];
}
