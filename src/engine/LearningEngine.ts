import { StudentProfile } from '../types/StudentProfile';

import {
getProfileConfig
}
from './ProfileAdapter';


import {
getStudentProgress
}
from './ProgressManager';


import {
getLesson
}
from './LessonManager';



export function getLearningSession(

student:StudentProfile

){



const progress =
getStudentProgress(
student.id
);



const adaptation =
getProfileConfig(
student.profile
);



const lesson =
getLesson(

student.idioma,

student.currentWorld,

student.currentLevel

);



return {


student,


progress,


adaptation,


lesson


};


}