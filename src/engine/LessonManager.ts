import { Lesson } from '../types/Lesson';

import { chineseLessons } from '../data/lessons/chinese/world1';
import { englishLessons } from '../data/lessons/english/world1';
import { spanishLessons } from '../data/lessons/spanish/world1';
import { miskitoLessons } from '../data/lessons/miskito/world1';
import { mayangnaLessons } from '../data/lessons/mayangna/world1';


export function getLesson(
  language: string,
  world: number,
  level: number,
): Lesson | null {

  let lessons: Lesson[] = [];


  switch (language) {

    case 'Chino':
      lessons = chineseLessons;
      break;

    case 'Inglés':
      lessons = englishLessons;
      break;

    case 'Español':
      lessons = spanishLessons;
      break;

    case 'Miskito':
      lessons = miskitoLessons;
      break;

    case 'Mayangna':
      lessons = mayangnaLessons;
      break;

    default:
      return null;
  }


  const lesson = lessons.find(
    item =>
      item.world === world &&
      item.level === level
  );


  return lesson ?? null;
}