export type LessonMediaType =
  | 'image'
  | 'video'
  | 'audio';

export interface LessonMedia {
  type: LessonMediaType;
  source: any;
  description?: string;
}

export interface LessonCard {
  id: number;

  title: string;

  description?: string;

  spanish?: string;

  targetLanguage?: string;

  pronunciation?: string;

  media?: LessonMedia;

  audio?: any;

  video?: any;

  image?: any;
}

export interface LessonGameOption {
  id: number;

  word: string;

  image?: any;

  video?: any;

  correct: boolean;
}

export interface LessonGame {
  type: 'multiple-choice';

  question: string;

  options: LessonGameOption[];

  maxAttempts: number;

  starsByAttempt: {
    attempt: number;
    stars: number;
  }[];
}

export interface LessonReward {
  characterId: number;

  name: string;

  image: any;

  description: string;
}

export interface Lesson {
  id: number;

  language: string;

  world: number;

  level: number;

  title: string;

  word: string;

  translation: string;

  pronunciation: string;

  image?: any;

  audio?: any;

  video?: any;

  cards?: LessonCard[];

  game?: LessonGame;

  reward?: LessonReward;
}