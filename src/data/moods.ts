import type { Mood } from 'pagepal';

/** Every mood, what triggers it, and its priority (from pagepal's DEFAULT_PRIORITIES). */
export const MOODS: { mood: Mood; trigger: string; priority: number }[] = [
  { mood: 'cheer', trigger: 'Form submitted, back online, back after a while', priority: 90 },
  { mood: 'wink', trigger: 'Poked, text copied, all required fields valid', priority: 88 },
  { mood: 'wince', trigger: 'Validation error, failed request', priority: 85 },
  { mood: 'dizzy', trigger: 'Scrolling fast', priority: 80 },
  { mood: 'concerned', trigger: 'Rage clicks', priority: 75 },
  { mood: 'confused', trigger: 'Dead click: nothing happened', priority: 74 },
  { mood: 'sad', trigger: 'Offline', priority: 70 },
  { mood: 'shy', trigger: 'Password field focused', priority: 65 },
  { mood: 'waiting', trigger: 'Requests in flight', priority: 60 },
  { mood: 'dozing', trigger: 'User idle', priority: 40 },
  { mood: 'sleepy', trigger: 'Dark mode', priority: 20 },
  { mood: 'neutral', trigger: 'Nothing going on', priority: 0 },
];
