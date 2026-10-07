import {Lesson} from '../../../types/Lesson';


// =========================================================
// ESPAÑOL - MUNDO 1
// Adaptación para estudiante con lengua materna Miskito
// =========================================================

export const spanishLessons: Lesson[] = [

  {
    id: 1,

    language: 'Español',

    world: 1,

    level: 1,

    title: 'Hola',

    word: 'NACKSA',

    translation: 'Hola',

    pronunciation: 'nacksa',



    cards: [


      {
        id: 1,

        title: '',

        description:
          'Naksa, naiwa yawan NAKSA aisi lan takaya ispail ra.',

        spanish: 'NACKSA',

        targetLanguage: 'HOLA',

        pronunciation: '',

        audio: require(
          '../../../assets/sounds/saludo_miskito.mp3'
        ),
      },



      {
        id: 2,

        title: 'Wals an kli aisas',

        description:
          '',

        spanish: '',

        targetLanguage: 'HOLA',

        pronunciation: 'o-la',

        audio: require(
          '../../../assets/sounds/pronunciacion.mp3'
        ),
      },



      {
        id: 3,

        title: 'Aprende a escribir',

        description:
          'Kaiks náhki asla dauki ba NAKSA ulban ka ba',

        spanish: '',

        targetLanguage: 'H O L A',

        pronunciation: '',

        audio: require(
          '../../../assets/sounds/escritura_nacksa.mp3'
        ),
      },

    ],



    game: {

      type: 'multiple-choice',

      question:
        'Wapni muns NAKSA ulban ka ba asla dauki',

      maxAttempts: 3,

      options: [],

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

      image: require(
        '../../../assets/images/ruben.png'
      ),

      description:
        '¡Has desbloqueado a Rubén! Ahora forma parte de tu colección de héroes de AISANKA.',

    },

  },

];