export type LearningProfile =
  | 'autismo'
  | 'tdah'
  | 'visual'
  | 'auditivo'
  | 'normal';

export interface StudentProfile {

  id:number;

  nombre:string;

  correo:string;

  idioma:string;

  profile:LearningProfile;

  currentWorld:number;

  currentLevel:number;

  unlockedWorlds:number[];

  unlockedLevels:number[];

  stars:number;

}