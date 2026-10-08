import {Progress} from '../types/Progress';
import {PROGRESS} from '../mock/progress';

export function getStudentProgress(
  studentId: number,
): Progress | undefined {

  return PROGRESS.find(
    item => item.studentId === studentId,
  );
}


export function completeLesson(
  progress: Progress,
  lessonId: number,
): Progress {


  if (!progress.completedLessons.includes(lessonId)) {

    progress.completedLessons.push(lessonId);

    progress.stars += 1;
  }

  const nextLevel = lessonId + 1;

  if (
    !progress.unlockedLevels.includes(nextLevel)
  ) {

    progress.unlockedLevels.push(nextLevel);
  }

  if (nextLevel > progress.currentLevel) {

    progress.currentLevel = nextLevel;
  }

  return progress;
}