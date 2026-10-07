import {Lesson} from '../../../types/Lesson';


export const englishLessons: Lesson[] = [

  {

    id: 1,

    language: 'Inglés',

    world: 1,

    level: 1,

    title: 'Buenos días',

    word: 'GOOD MORNING',

    translation: 'Buenos días',

    pronunciation: 'gud mornin',



    cards: [


      {

        id: 1,

        title:
          'Aprendamos un nuevo saludo',

        description:
          'Hola, hoy aprenderemos a decir Hola en ASL ',

        spanish:
          'Hola, hoy aprenderemos a decir buenos días en inglés.',

        targetLanguage:
          'GOOD MORNING',

        media: {

          type: 'video',

          source:
            require(
              '../../../assets/videos/saludo.mp4',
            ),

          description:
            'Video introductorio en lenguaje de señas.',
        },

        video:
          require(
            '../../../assets/videos/saludo.mp4',
          ),

      },



      {

        id: 2,

        title:
          'Así se dice',

        description:
          'Observa la expresión escrita en inglés.',

        spanish:
          'Buenos días',

        targetLanguage:
          'GOOD MORNING',

        media: {

          type: 'image',

          source:
            require(
              '../../../assets/images/logo.png',
            ),

          description:
            'Presentación textual de la expresión en inglés.',
        },

      },



      {

        id: 3,

        title:
          'Ahora en lenguaje de señas Americano (ASL)',

        description:
          'Observa cómo se expresa buenos días en ASL.',

        spanish:
          'Buenos días',

        targetLanguage:
          'GOOD MORNING',

        media: {

          type: 'video',

          source:
            require(
              '../../../assets/videos/BDASL.mp4',
            ),

          description:
            'Traducción de buenos días mediante lenguaje de señas ASL.',
        },

        video:
          require(
            '../../../assets/videos/BDASL.mp4',
          ),

      },



      {

        id: 4,

        title:
          '¿Cómo se pronuncia?',

        description:
          'Observa y aprende la pronunciación.',

        spanish:
          'Buenos días',

        targetLanguage:
          'GOOD MORNING',

        pronunciation:
          'gud mornin',

        media: {

          type: 'image',

          source:
            require(
              '../../../assets/images/logo.png',
            ),

          description:
            'Apoyo visual para la pronunciación.',
        },

      },



      {

        id: 5,

        title:
          'Aprendamos a escribir',

        description:
          'Observa el video y aprende cómo se escribe esta expresión en inglés.',

        spanish:
          'Buenos días',

        targetLanguage:
          'GOOD MORNING',

        media: {

          type: 'video',

          source:
            require(
              '../../../assets/videos/escritura_hola_ingles.mp4',
            ),

          description:
            'Video explicativo sobre la escritura de la expresión en inglés.',
        },

        video:
          require(
            '../../../assets/videos/escritura_hola_ingles.mp4',
          ),

      },

    ],



    game: {

      type: 'multiple-choice',

      question:
        'Encuentra el saludo GOOD MORNING',

      maxAttempts: 2,


      options: [

        {

          id: 1,

          word:
            'GOOD MORNING',

          video:
            require(
              '../../../assets/videos/buenos_dias.mp4',
            ),

          correct: true,

        },


        {

          id: 2,

          word:
            'GOOD NIGHT',

          video:
            require(
              '../../../assets/videos/buenas_noches.mp4',
            ),

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

      ],

    },



    reward: {

      characterId: 2,

      name:
        'Benjamín Zeledón',

      image:
        require(
          '../../../assets/images/benjamin.png',
        ),

      description:
        '¡Has desbloqueado a Benjamín Zeledón! Ahora forma parte de tu colección de héroes de Nicaragua.',

    },

  },

];