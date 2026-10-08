import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  Dimensions,
  Easing,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import Video from 'react-native-video';

import {Lesson} from '../../types/Lesson';



interface Props {
  lesson: Lesson;
  onComplete: () => void;
}



const {width, height} =
  Dimensions.get('window');



const COLORS = {

  blue: '#2563EB',
  blueDark: '#1E3A8A',

  purple: '#7C3AED',
  purpleDark: '#4C1D95',

  green: '#059669',
  greenDark: '#065F46',

  orange: '#EA580C',
  orangeDark: '#9A3412',

  pink: '#DB2777',
  pinkDark: '#9D174D',

  white: '#FFFFFF',

  dark: '#172033',

  gray: '#64748B',

  soft: '#F8FAFC',

  border: '#E2E8F0',
};

export default function AuditoryLesson({
  lesson,
  onComplete,
}: Props) {


  const navigation =
    useNavigation<any>();


  const [
    currentCard,
    setCurrentCard,
  ] = useState(0);


  const fadeAnim =
    useRef(
      new Animated.Value(0),
    ).current;


  const scaleAnim =
    useRef(
      new Animated.Value(0.88),
    ).current;


  const translateAnim =
    useRef(
      new Animated.Value(35),
    ).current;


  const progressAnim =
    useRef(
      new Animated.Value(0),
    ).current;


  const circleOneAnim =
    useRef(
      new Animated.Value(0),
    ).current;


  const circleTwoAnim =
    useRef(
      new Animated.Value(0),
    ).current;


  const buttonScale =
    useRef(
      new Animated.Value(1),
    ).current;


  const cards = [

    {
      id: 1,

      type: 'video',

      title: 'Comencemos',

      subtitle:
        'Observa la introducción de la lección.',

      source:
        require('../../assets/videos/saludo.mp4'),
    },


    {
      id: 2,

      type: 'text',

      title: 'Buenos días',

      subtitle:
        'En inglés se dice:',

      mainText:
        'GOOD MORNING',
    },


    {
      id: 3,

      type: 'video',

      title: 'Ahora observa',

      subtitle:
        'Observa cómo se expresa "buenos días" en lenguaje de señas.',

      source:
        require('../../assets/videos/BDASL.mp4'),
    },


    {
      id: 4,

      type: 'text',

      title: '¿Cómo se pronuncia?',

      subtitle:
        'GOOD MORNING se pronuncia:',

      mainText:
        'gud mornin',
    },



    {
      id: 5,

      type: 'video',

      title: 'Aprendamos a escribir',

      subtitle:
        'Observa el video y aprende cómo se escribe esta expresión en inglés.',

      source:
        require('../../assets/videos/escritura_hola_ingles.mp4'),
    },

  ];



  const card =
    cards[currentCard];


  useEffect(() => {

    fadeAnim.setValue(0);

    scaleAnim.setValue(0.88);

    translateAnim.setValue(35);


    Animated.parallel([

      Animated.timing(
        fadeAnim,
        {
          toValue: 1,

          duration: 450,

          easing:
            Easing.out(
              Easing.cubic,
            ),

          useNativeDriver: true,
        },
      ),


      Animated.spring(
        scaleAnim,
        {
          toValue: 1,

          friction: 7,

          tension: 55,

          useNativeDriver: true,
        },
      ),


      Animated.timing(
        translateAnim,
        {
          toValue: 0,

          duration: 500,

          easing:
            Easing.out(
              Easing.cubic,
            ),

          useNativeDriver: true,
        },
      ),

    ]).start();



    Animated.timing(
      progressAnim,
      {
        toValue:
          (currentCard + 1) /
          cards.length,

        duration: 550,

        easing:
          Easing.out(
            Easing.cubic,
          ),

        useNativeDriver: false,
      },
    ).start();

  }, [
    currentCard,
  ]);


  useEffect(() => {

    const animationOne =
      Animated.loop(

        Animated.sequence([

          Animated.timing(
            circleOneAnim,
            {
              toValue: 1,

              duration: 4000,

              easing:
                Easing.inOut(
                  Easing.sin,
                ),

              useNativeDriver: true,
            },
          ),

          Animated.timing(
            circleOneAnim,
            {
              toValue: 0,

              duration: 4000,

              easing:
                Easing.inOut(
                  Easing.sin,
                ),

              useNativeDriver: true,
            },
          ),

        ]),

      );


    const animationTwo =
      Animated.loop(

        Animated.sequence([

          Animated.timing(
            circleTwoAnim,
            {
              toValue: 1,

              duration: 5000,

              easing:
                Easing.inOut(
                  Easing.sin,
                ),

              useNativeDriver: true,
            },
          ),

          Animated.timing(
            circleTwoAnim,
            {
              toValue: 0,

              duration: 5000,

              easing:
                Easing.inOut(
                  Easing.sin,
                ),

              useNativeDriver: true,
            },
          ),

        ]),

      );


    animationOne.start();

    animationTwo.start();


    return () => {

      animationOne.stop();

      animationTwo.stop();

    };

  }, []);


  const getBackgroundColor = () => {

    switch (currentCard) {

      case 0:
        return COLORS.blue;

      case 1:
        return COLORS.purple;

      case 2:
        return COLORS.green;

      case 3:
        return COLORS.orange;

      case 4:
        return COLORS.pink;

      default:
        return COLORS.blue;

    }

  };


  const getDarkColor = () => {

    switch (currentCard) {

      case 0:
        return COLORS.blueDark;

      case 1:
        return COLORS.purpleDark;

      case 2:
        return COLORS.greenDark;

      case 3:
        return COLORS.orangeDark;

      case 4:
        return COLORS.pinkDark;

      default:
        return COLORS.blueDark;

    }

  };


  const nextCard = () => {

    Animated.sequence([

      Animated.timing(
        buttonScale,
        {
          toValue: 0.94,

          duration: 80,

          useNativeDriver: true,
        },
      ),

      Animated.spring(
        buttonScale,
        {
          toValue: 1,

          friction: 5,

          useNativeDriver: true,
        },
      ),

    ]).start();


    if (
      currentCard <
      cards.length - 1
    ) {

      setCurrentCard(
        previous =>
          previous + 1,
      );

      return;
    }


    onComplete();

  };



  const previousCard = () => {

    if (currentCard > 0) {

      setCurrentCard(
        previous =>
          previous - 1,
      );

      return;
    }



    navigation.goBack();

  };



  const progress =
    (currentCard + 1) /
    cards.length;


  const circleOneTransform = {

    transform: [

      {
        translateX:
          circleOneAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 35],
          }),
      },

      {
        translateY:
          circleOneAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 25],
          }),
      },

      {
        scale:
          circleOneAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.12],
          }),
      },

    ],

  };



  const circleTwoTransform = {

    transform: [

      {
        translateX:
          circleTwoAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -25],
          }),
      },

      {
        translateY:
          circleTwoAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -20],
          }),
      },

      {
        scale:
          circleTwoAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.08],
          }),
      },

    ],

  };


  return (

    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            getBackgroundColor(),
        },
      ]}
    >


      {}

      <Animated.View
        style={[
          styles.backgroundCircleOne,
          circleOneTransform,
        ]}
      />


      <Animated.View
        style={[
          styles.backgroundCircleTwo,
          circleTwoTransform,
        ]}
      />


      <View
        style={
          styles.backgroundCircleThree
        }
      />


      {}

      <View
        style={styles.header}
      >

        <View
          style={
            styles.headerInformation
          }
        >

          <Text
            style={
              styles.worldText
            }
          >
            APRENDAMOS JUNTOS
          </Text>


          <Text
            style={
              styles.headerTitle
            }
          >
            Buenos días
          </Text>

        </View>


        <View
          style={styles.counter}
        >

          <Text
            style={
              styles.counterNumber
            }
          >
            {currentCard + 1}
          </Text>


          <View
            style={
              styles.counterDivider
            }
          />


          <Text
            style={
              styles.counterTotal
            }
          >
            {cards.length}
          </Text>

        </View>

      </View>


      {}

      <View
        style={
          styles.progressContainer
        }
      >

        <Animated.View
          style={[
            styles.progressBar,
            {
              width:
                progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
            },
          ]}
        />

      </View>


      {}

      <View
        style={
          styles.cardLabelContainer
        }
      >

        <Text
          style={
            styles.cardLabel
          }
        >
          TARJETA {currentCard + 1} DE {cards.length}
        </Text>

      </View>


      {}

      <Animated.View
        style={[
          styles.card,
          {
            opacity:
              fadeAnim,

            transform: [

              {
                scale:
                  scaleAnim,
              },

              {
                translateY:
                  translateAnim,
              },

            ],
          },
        ]}
      >


        {}

        <Text
          style={
            styles.cardTitle
          }
        >
          {card.title}
        </Text>


        <Text
          style={
            styles.cardSubtitle
          }
        >
          {card.subtitle}
        </Text>


        {}

        {card.type === 'video' && (

          <View
            style={
              styles.videoOuterContainer
            }
          >

            <View
              style={
                styles.videoHeader
              }
            >

              <View
                style={
                  styles.videoIndicator
                }
              />

              <Text
                style={
                  styles.videoHeaderText
                }
              >
                MATERIAL DE APRENDIZAJE
              </Text>

            </View>


            <View
              style={
                styles.videoContainer
              }
            >

              <Video
                source={
                  card.source
                }

                style={
                  styles.video
                }

                resizeMode="contain"

                controls

                paused={false}

                repeat={false}
              />

            </View>

          </View>

        )}


        {}

        {card.type === 'text' && (

          <Animated.View
            style={
              styles.wordContainer
            }
          >

            <View
              style={[
                styles.wordGlow,
                {
                  backgroundColor:
                    `${getBackgroundColor()}18`,
                },
              ]}
            />


            <View
              style={
                styles.wordInner
              }
            >

              <Text
                style={[
                  styles.mainText,

                  currentCard === 3 &&
                    styles.pronunciationText,

                  {
                    color:
                      getDarkColor(),
                  },
                ]}
              >
                {card.mainText}
              </Text>


              <View
                style={[
                  styles.wordUnderline,
                  {
                    backgroundColor:
                      getBackgroundColor(),
                  },
                ]}
              />

            </View>


            <Text
              style={
                styles.textHint
              }
            >
              {currentCard === 1
                ? 'Observa y memoriza la expresión.'
                : 'Escucha mentalmente cómo suena.'}
            </Text>

          </Animated.View>

        )}

      </Animated.View>


      {}

      <View
        style={styles.dots}
      >

        {cards.map(
          (_, index) => (

            <View
              key={index}
              style={[
                styles.dot,

                index ===
                  currentCard &&
                  styles.activeDot,

                index <
                  currentCard &&
                  styles.completedDot,
              ]}
            />

          ),
        )}

      </View>


      {}

      <View
        style={
          styles.buttonsContainer
        }
      >


        {}

        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.backButton,
            {
              borderColor:
                'rgba(255,255,255,0.55)',
            },
          ]}
          onPress={
            previousCard
          }
        >

          <Text
            style={
              styles.backButtonText
            }
          >
            Volver
          </Text>

        </TouchableOpacity>


        {}

        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                scale:
                  buttonScale,
              },
            ],
          }}
        >

          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.nextButton,
              {
                backgroundColor:
                  COLORS.white,
              },
            ]}
            onPress={
              nextCard
            }
          >

            <Text
              style={[
                styles.nextButtonText,
                {
                  color:
                    getDarkColor(),
                },
              ]}
            >
              {currentCard ===
              cards.length - 1
                ? 'Ir al juego'
                : 'Continuar'}
            </Text>

          </TouchableOpacity>

        </Animated.View>

      </View>

    </SafeAreaView>

  );

}


const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      paddingHorizontal: 20,
      overflow: 'hidden',
    },


    backgroundCircleOne: {
      position: 'absolute',

      width: 280,
      height: 280,

      borderRadius: 140,

      backgroundColor:
        'rgba(255,255,255,0.09)',

      top: -110,
      right: -90,
    },


    backgroundCircleTwo: {
      position: 'absolute',

      width: 230,
      height: 230,

      borderRadius: 115,

      backgroundColor:
        'rgba(255,255,255,0.07)',

      bottom: -90,
      left: -80,
    },


    backgroundCircleThree: {
      position: 'absolute',

      width: 110,
      height: 110,

      borderRadius: 55,

      backgroundColor:
        'rgba(255,255,255,0.06)',

      top: '42%',
      right: -50,
    },



    header: {
      marginTop: 12,

      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',
    },


    headerInformation: {
      flex: 1,
    },


    worldText: {
      color:
        'rgba(255,255,255,0.72)',

      fontSize: 11,

      fontWeight: '800',

      letterSpacing: 1.8,
    },


    headerTitle: {
      color:
        COLORS.white,

      fontSize: 27,

      fontWeight: '900',

      marginTop: 4,
    },


    counter: {
      minWidth: 68,

      height: 48,

      paddingHorizontal: 13,

      borderRadius: 24,

      backgroundColor:
        'rgba(255,255,255,0.17)',

      borderWidth: 1,

      borderColor:
        'rgba(255,255,255,0.25)',

      flexDirection: 'row',

      justifyContent:
        'center',

      alignItems: 'center',
    },


    counterNumber: {
      color:
        COLORS.white,

      fontSize: 18,

      fontWeight: '900',
    },


    counterDivider: {
      width: 1,

      height: 18,

      backgroundColor:
        'rgba(255,255,255,0.45)',

      marginHorizontal: 8,
    },


    counterTotal: {
      color:
        'rgba(255,255,255,0.75)',

      fontSize: 15,

      fontWeight: '700',
    },



    progressContainer: {
      height: 8,

      backgroundColor:
        'rgba(255,255,255,0.18)',

      borderRadius: 10,

      overflow: 'hidden',

      marginTop: 17,
    },


    progressBar: {
      height: '100%',

      backgroundColor:
        COLORS.white,

      borderRadius: 10,
    },


    cardLabelContainer: {
      alignItems: 'center',

      marginTop: 11,
    },


    cardLabel: {
      color:
        'rgba(255,255,255,0.72)',

      fontSize: 10,

      fontWeight: '900',

      letterSpacing: 1.5,
    },



    card: {
      flex: 1,

      backgroundColor:
        COLORS.white,

      borderRadius: 30,

      marginTop: 12,

      marginBottom: 8,

      padding: 20,

      alignItems: 'center',

      justifyContent:
        'center',

      shadowColor: '#000',

      shadowOffset: {
        width: 0,
        height: 10,
      },

      shadowOpacity: 0.2,

      shadowRadius: 18,

      elevation: 12,

      borderWidth: 1,

      borderColor:
        'rgba(255,255,255,0.8)',
    },


    cardTitle: {
      fontSize: 26,

      fontWeight: '900',

      color:
        COLORS.dark,

      textAlign: 'center',

      letterSpacing: 0.2,
    },


    cardSubtitle: {
      fontSize: 16,

      color:
        COLORS.gray,

      fontWeight: '600',

      lineHeight: 23,

      textAlign: 'center',

      marginTop: 7,

      marginBottom: 17,

      maxWidth: width * 0.82,
    },



    videoOuterContainer: {
      width: '100%',

      borderRadius: 23,

      overflow: 'hidden',

      backgroundColor:
        '#0F172A',

      borderWidth: 1,

      borderColor:
        COLORS.border,

      shadowColor: '#000',

      shadowOffset: {
        width: 0,
        height: 7,
      },

      shadowOpacity: 0.18,

      shadowRadius: 10,

      elevation: 8,
    },


    videoHeader: {
      height: 39,

      paddingHorizontal: 14,

      flexDirection: 'row',

      alignItems: 'center',

      backgroundColor:
        '#111827',
    },


    videoIndicator: {
      width: 8,

      height: 8,

      borderRadius: 4,

      backgroundColor:
        '#34D399',

      marginRight: 9,
    },


    videoHeaderText: {
      color:
        'rgba(255,255,255,0.72)',

      fontSize: 10,

      fontWeight: '800',

      letterSpacing: 1.2,
    },


    videoContainer: {
      width: '100%',

      height:
        Math.min(
          height * 0.42,
          370,
        ),

      backgroundColor:
        '#020617',
    },


    video: {
      width: '100%',

      height: '100%',
    },



    wordContainer: {
      width: '100%',

      minHeight: 245,

      borderRadius: 25,

      backgroundColor:
        '#F8FAFC',

      justifyContent:
        'center',

      alignItems: 'center',

      padding: 24,

      overflow: 'hidden',

      borderWidth: 1,

      borderColor:
        '#E2E8F0',
    },


    wordGlow: {
      position: 'absolute',

      width: 210,

      height: 210,

      borderRadius: 105,
    },


    wordInner: {
      alignItems: 'center',

      justifyContent:
        'center',
    },


    mainText: {
      fontSize: 40,

      fontWeight: '900',

      textAlign: 'center',

      letterSpacing: 2,
    },


    pronunciationText: {
      fontSize: 37,

      letterSpacing: 1,
    },


    wordUnderline: {
      width: 80,

      height: 5,

      borderRadius: 3,

      marginTop: 13,
    },


    textHint: {
      marginTop: 22,

      color:
        COLORS.gray,

      fontSize: 14,

      fontWeight: '700',

      textAlign: 'center',
    },


    dots: {
      flexDirection: 'row',

      justifyContent:
        'center',

      alignItems: 'center',

      marginVertical: 7,
    },


    dot: {
      width: 8,

      height: 8,

      borderRadius: 4,

      backgroundColor:
        'rgba(255,255,255,0.32)',

      marginHorizontal: 4,
    },


    activeDot: {
      width: 28,

      backgroundColor:
        COLORS.white,
    },


    completedDot: {
      backgroundColor:
        'rgba(255,255,255,0.72)',
    },

    buttonsContainer: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 10,

      marginBottom: 12,
    },


    backButton: {
      width: 105,

      height: 57,

      borderRadius: 29,

      borderWidth: 1.5,

      backgroundColor:
        'rgba(255,255,255,0.10)',

      justifyContent:
        'center',

      alignItems: 'center',
    },


    backButtonText: {
      color:
        COLORS.white,

      fontSize: 16,

      fontWeight: '800',
    },


    nextButton: {
      height: 57,

      borderRadius: 29,

      justifyContent:
        'center',

      alignItems: 'center',

      shadowColor: '#000',

      shadowOffset: {
        width: 0,
        height: 5,
      },

      shadowOpacity: 0.18,

      shadowRadius: 9,

      elevation: 7,
    },


    nextButtonText: {
      fontSize: 17,

      fontWeight: '900',

      letterSpacing: 0.2,
    },

  });