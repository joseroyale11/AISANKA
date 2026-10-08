import { LearningProfile } from '../types/StudentProfile';


export interface ProfileConfig {

  animations: boolean;

  voiceGuide: boolean;

  subtitles: boolean;

  signLanguage: boolean;

  repetitions: number;

  maxAttempts: number;

}


const profiles: Record<
  LearningProfile,
  ProfileConfig
> = {


  tdah: {

    animations: true,

    voiceGuide: true,

    subtitles: false,

    signLanguage: false,

    repetitions: 2,

    maxAttempts: 3,

  },


  autismo: {

    animations: true,

    voiceGuide: true,

    subtitles: false,

    signLanguage: false,

    repetitions: 3,

    maxAttempts: 3,

  },


  visual: {

    animations: false,

    voiceGuide: true,

    subtitles: false,

    signLanguage: false,

    repetitions: 2,

    maxAttempts: 3,

  },


  auditivo: {

    animations: false,

    voiceGuide: false,

    subtitles: true,

    signLanguage: true,

    repetitions: 2,

    maxAttempts: 3,

  },


  normal: {

    animations: true,

    voiceGuide: true,

    subtitles: true,

    signLanguage: false,

    repetitions: 1,

    maxAttempts: 3,

  },

};


export function getProfileConfig(
  profile: LearningProfile
): ProfileConfig {

  return profiles[profile];

}