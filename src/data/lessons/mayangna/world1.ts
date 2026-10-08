// Esta configuración define el contenido de la lección Mayangna, sus recursos multimedia y el héroe que se desbloquea al completar el juego.

import {Lesson} from '../../../types/Lesson';

export const mayangnaLessons: Lesson[] = [
  {
    id: 1,

    language: 'Mayangna',

    world: 1,

    level: 1,

    title: 'Hola',

    word: 'PARASTH',

    translation: 'Hola',

    pronunciation: 'PARASTH',

    audio: require('../../../assets/sounds/parastah.mp3'),

    video: require('../../../assets/videos/hola_guardabarranco.mp4'),

    cards: [
      {
        id: 1,

        title: 'Conoce la palabra',

        description:
          '',

        targetLanguage: 'PARASTAH',

        spanish: 'Hola',

        video: require(
          '../../../assets/videos/hola_guardabarranco.mp4'
        ),
      },

      {
        id: 2,

        title: 'Escucha y pronuncia',

        description:
          'Escucha la pronunciación y repite la palabra.',

        targetLanguage: 'PARASTAH',

        pronunciation: 'PARASTAH',

        audio: require(
          '../../../assets/sounds/parastah.mp3'
        ),
      },

      {
        id: 3,

        title: 'Aprende a escribirla',

        description:
          'Observa cómo se escribe la palabra.',

        targetLanguage: 'PARASTAH',

        spanish: 'Hola',

        video: require(
          '../../../assets/videos/escritura_hola_mayangna.mp4'
        ),
      },
    ],

    reward: {
      characterId: 3,

      name: 'Benjamín',

      image: require(
        '../../../assets/images/benjamin.png'
      ),

      description:
        'Has desbloqueado a Benjamín, un nuevo héroe de Nicaragua para tu colección.',
    },
  },
];