import { loginMock } from '../services/authMock';

import { getLearningSession } 
from '../engine/LearningEngine';


const student = loginMock(
  'marlinggranados@gmail.com',
  'MINED2026*'
);


console.log('========== AISANKA TEST ==========');


if(student){

  const session = getLearningSession(student);


  console.log(
    'Estudiante:',
    session.student.nombre
  );


  console.log(
    'Idioma:',
    session.student.idioma
  );


  console.log(
    'Perfil:',
    session.student.profile
  );


  console.log(
    'Adaptación:',
    session.adaptation
  );


  console.log(
    'Progreso:',
    session.progress
  );


  console.log(
    'Lección:',
    session.lesson
  );


}else{

  console.log(
    'Usuario no encontrado'
  );

}