/*
 * AISANKA — CONTENIDO DE LA UNIDAD 1 DE CHINO
 *
 * Este archivo define la primera lección del idioma chino para AISANKA.
 * La lección enseña el saludo "Hola" mediante una secuencia de tres
 * experiencias: observación del saludo, escucha de la pronunciación
 * y reconocimiento de su escritura.
 *
 * Los recursos multimedia utilizados aquí son consumidos directamente
 * por los componentes de lección y juego, manteniendo separada la
 * información educativa de la lógica visual de la aplicación.
 */

import {Lesson} from '../../../types/Lesson';

export const chineseLessons: Lesson[] = [

  {
    id: 1,

    language: 'Chino',

    world: 1,

    level: 1,

    title: 'Aprendamos a saludar',

    word: '你好',

    translation: 'Hola',

    pronunciation: 'Nǐ hǎo',

    audio:
      require('../../../assets/sounds/hola_chino.mp3'),

    video:
      require('../../../assets/videos/hola_guardabarranco.mp4'),

    cards: [

      {
        id: 1,

        title: 'Conozcamos la palabra',

        description:
          'Observa el saludo y relaciónalo con la palabra Hola.',

        spanish: 'Hola',

        targetLanguage: '你好',

        pronunciation: 'Nǐ hǎo',

        media: {

          type: 'video',

          source:
            require('../../../assets/videos/hola_guardabarranco.mp4'),

          description:
            'Video introductorio del saludo.',

        },

      },

      {

        id: 2,

        title: 'Escuchemos cómo se pronuncia',

        description:
          'Escucha la palabra y repítela con calma.',

        spanish: 'Hola',

        targetLanguage: '你好',

        pronunciation: 'Nǐ hǎo',

        media: {

          type: 'audio',

          source:
            require('../../../assets/sounds/hola_chino.mp3'),

          description:
            'Audio de pronunciación de la palabra Hola.',

        },

        audio:
          require('../../../assets/sounds/hola_chino.mp3'),

      },

      {

        id: 3,

        title: 'Descubramos cómo se escribe',

        description:
          'Observa el video y presta atención a la escritura.',

        spanish: 'Hola',

        targetLanguage: '你好',

        pronunciation: 'Nǐ hǎo',

        media: {

          type: 'video',

          source:
            require('../../../assets/videos/escritura_hola_chino.mp4'),

          description:
            'Video que muestra la escritura de Hola en chino.',

        },

        video:
          require('../../../assets/videos/escritura_hola_chino.mp4'),

      },

    ],

    game: {

      type: 'multiple-choice',

      question:
        '¿Cuál de estas palabras significa HOLA?',

      maxAttempts: 3,

      options: [

        {

          id: 1,

          word: '你好',

          image:
            require('../../../assets/images/hola.png'),

          correct: true,

        },

        {

          id: 2,

          word: '再见',

          image:
            require('../../../assets/images/adios.png'),

          correct: false,

        },

        {

          id: 3,

          word: '谢谢',

          image:
            require('../../../assets/images/gracias.png'),

          correct: false,

        },

      ],

      starsByAttempt: [

        {

          attempt: 1,

          stars: 3,

        },

        {

          attempt: 2,

          stars: 2,

        },

        {

          attempt: 3,

          stars: 1,

        },

      ],

    },

    reward: {

      characterId: 1,

      name: 'Rubén',

      image:
        require('../../../assets/images/ruben.png'),

      description:
        'Has desbloqueado a Rubén. Ahora forma parte de tu colección de personajes.',

    },

  },

];