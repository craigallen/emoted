// The emotion library. Each emotion has two levels of explanation so the
// app can adapt its language to the child's age (see utils/ageBand.ts):
// `simple` for younger readers, `detailed` for older kids/tweens who can
// handle more nuance. Every screen that shows this text also offers a
// "read aloud" button (see hooks/useSpeech.ts).

export type Emotion = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  simple: string;
  detailed: string;
  feelsLikeInBody: string[];
  youMightThink: string;
  thingsThatHelp: string[];
};

export const emotions: Emotion[] = [
  {
    id: 'happy',
    name: 'Happy',
    emoji: '😄',
    color: '#F6C445',
    simple: 'Happy is a warm, light feeling you get when something good happens.',
    detailed:
      'Happiness is a comfortable, light feeling that shows up when things are going well, you feel safe, or you spend time with people or things you enjoy.',
    feelsLikeInBody: ['A smile that shows up on its own', 'Feeling light or bouncy', 'Wanting to laugh or talk'],
    youMightThink: '"This is great!"',
    thingsThatHelp: ['Share it with someone you like', 'Notice what made you feel this way', 'Enjoy the moment'],
  },
  {
    id: 'sad',
    name: 'Sad',
    emoji: '😢',
    color: '#5B8DEF',
    simple: 'Sad is a heavy feeling that can come when you lose something or things do not go the way you hoped.',
    detailed:
      'Sadness is a heavy, low-energy feeling that often shows up after a loss, a disappointment, or when something we cared about did not go the way we hoped. It is a normal feeling, not a bad one.',
    feelsLikeInBody: ['A heavy feeling in your chest', 'Tears or a lump in your throat', 'Feeling tired or slow'],
    youMightThink: '"I wish this was different."',
    thingsThatHelp: ['Tell a grown-up you trust', 'Give yourself a hug or hold something soft', 'Rest or take it slow'],
  },
  {
    id: 'angry',
    name: 'Angry',
    emoji: '😠',
    color: '#E14B4B',
    simple: 'Angry is a strong, hot feeling that can come when something feels unfair.',
    detailed:
      'Anger is a strong burst of energy that often shows up when something feels unfair, when we are hurt, or when we cannot do something we want to do. It is okay to feel angry — what matters is what we do with it.',
    feelsLikeInBody: ['A hot feeling in your face or chest', 'Clenched hands or a tight jaw', 'Wanting to yell or stomp'],
    youMightThink: '"That is not fair!"',
    thingsThatHelp: ['Take slow breaths', 'Squeeze something soft or push against a wall', 'Talk about it once you feel calmer'],
  },
  {
    id: 'scared',
    name: 'Scared',
    emoji: '😨',
    color: '#8A6CD9',
    simple: 'Scared is a jumpy feeling that shows up when something feels unsafe or unknown.',
    detailed:
      'Fear is your body\'s way of warning you about something that feels unsafe, unfamiliar, or unexpected. It can be about something real or something imagined — both are okay to feel.',
    feelsLikeInBody: ['A fast heartbeat', 'Wanting to hide or run', 'A jumpy, shaky feeling'],
    youMightThink: '"What if something bad happens?"',
    thingsThatHelp: ['Find a grown-up or safe place', 'Take slow breaths', 'Say out loud what is scaring you'],
  },
  {
    id: 'worried',
    name: 'Worried',
    emoji: '😟',
    color: '#5FA8A0',
    simple: 'Worried is a fluttery feeling in your tummy when you keep thinking about something that might go wrong.',
    detailed:
      'Worry (or anxiety) shows up when your mind keeps thinking about things that might go wrong, even ones that probably will not happen. A little worry can help us be careful; a lot of worry can feel uncomfortable.',
    feelsLikeInBody: ['A fluttery or tight tummy', 'Thoughts that repeat over and over', 'Trouble sitting still or focusing'],
    youMightThink: '"What if it goes wrong?"',
    thingsThatHelp: ['Name the worry out loud', 'Try slow counting breaths', 'Ask a grown-up to help you think it through'],
  },
  {
    id: 'excited',
    name: 'Excited',
    emoji: '🤩',
    color: '#FF7A50',
    simple: 'Excited is a bursty, happy feeling you get before or during something fun.',
    detailed:
      'Excitement is a burst of high energy that shows up when we are looking forward to something, or right in the middle of something fun. It can feel similar to being nervous, just with a happy flavor.',
    feelsLikeInBody: ['Extra energy, hard to sit still', 'Fast talking', 'A fizzy feeling in your tummy'],
    youMightThink: '"I can\'t wait!"',
    thingsThatHelp: ['Move your body — jump or dance', 'Share the excitement with someone', 'Take a breath before big moments'],
  },
  {
    id: 'calm',
    name: 'Calm',
    emoji: '😌',
    color: '#1F9E6D',
    simple: 'Calm is a peaceful, easy feeling when your body and mind feel settled.',
    detailed:
      'Calm is a settled, easy feeling where your body and mind feel steady rather than rushed. It often shows up after resting, breathing slowly, or being somewhere that feels safe and quiet.',
    feelsLikeInBody: ['Slow, easy breathing', 'Relaxed shoulders', 'A quiet mind'],
    youMightThink: '"I feel okay right now."',
    thingsThatHelp: ['Notice how good this feels', 'Keep doing what is working', 'Remember this feeling for later'],
  },
  {
    id: 'frustrated',
    name: 'Frustrated',
    emoji: '😤',
    color: '#D65E38',
    simple: 'Frustrated is a stuck feeling when something is hard or not working the way you want.',
    detailed:
      'Frustration shows up when we are trying to do something and it keeps not working, or when we are close to a goal but something is in the way. It is a smaller cousin of anger.',
    feelsLikeInBody: ['A tight, stuck feeling', 'Sighing or huffing', 'Wanting to give up or throw something'],
    youMightThink: '"This is so hard!"',
    thingsThatHelp: ['Take a short break', 'Ask for help', 'Try a different way'],
  },
  {
    id: 'embarrassed',
    name: 'Embarrassed',
    emoji: '😳',
    color: '#E06B9B',
    simple: 'Embarrassed is a hot, shy feeling when you think others noticed a mistake you made.',
    detailed:
      'Embarrassment shows up when we feel like others noticed something awkward or a mistake we made. It fades faster than it feels like it will, and everyone feels it sometimes.',
    feelsLikeInBody: ['Hot cheeks', 'Wanting to hide your face', 'A jumpy, shy feeling'],
    youMightThink: '"Everyone is looking at me."',
    thingsThatHelp: ['Remember everyone makes mistakes', 'Take a breath', 'Talk to someone who makes you feel safe'],
  },
  {
    id: 'proud',
    name: 'Proud',
    emoji: '🥳',
    color: '#F6C445',
    simple: 'Proud is a tall, warm feeling when you did something well or worked hard.',
    detailed:
      'Pride is a warm, confident feeling that shows up after we accomplish something, work hard, or act in a way that matches our values. It feels good to notice it.',
    feelsLikeInBody: ['Standing a little taller', 'A warm feeling in your chest', 'Wanting to smile or tell someone'],
    youMightThink: '"I did it!"',
    thingsThatHelp: ['Tell someone what you did', 'Write it down or draw it', 'Let yourself enjoy it'],
  },
  {
    id: 'lonely',
    name: 'Lonely',
    emoji: '🥺',
    color: '#7C8798',
    simple: 'Lonely is an empty feeling when you wish you had someone to be with.',
    detailed:
      'Loneliness shows up when we want connection with others but feel like we do not have it right now — even sometimes when we are surrounded by people.',
    feelsLikeInBody: ['An empty or heavy feeling', 'Wanting company', 'Quietness'],
    youMightThink: '"I wish someone was here."',
    thingsThatHelp: ['Reach out to someone you trust', 'Join an activity you enjoy', 'Be gentle with yourself'],
  },
  {
    id: 'confused',
    name: 'Confused',
    emoji: '😕',
    color: '#9A8CFF',
    simple: 'Confused is a foggy feeling when you are not sure what is happening or what to do.',
    detailed:
      'Confusion shows up when something does not make sense yet, or when we are not sure what to think or feel. It is a normal step on the way to understanding.',
    feelsLikeInBody: ['A foggy feeling in your head', 'Pausing or hesitating', 'Wanting to ask questions'],
    youMightThink: '"Wait, I don\'t get it."',
    thingsThatHelp: ['Ask a question', 'Slow down', 'It is okay to say "I don\'t know yet"'],
  },
];

export function getEmotion(id: string | string[] | undefined): Emotion | undefined {
  const key = Array.isArray(id) ? id[0] : id;
  return emotions.find((e) => e.id === key);
}
