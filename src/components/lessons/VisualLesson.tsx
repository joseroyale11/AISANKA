import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Video from 'react-native-video';

import {
  Lesson,
  LessonCard,
} from '../../types/Lesson';

const VIDEO_HOLA_GUARDABARRANCO =
  require(
    '../../assets/videos/hola_guardabarranco.mp4'
  );

const VIDEO_ESCRITURA_HOLA =
  require(
    '../../assets/videos/escritura_hola_español.mp4'
  );



interface VisualLessonProps {

  lesson: Lesson;

  onComplete: () => void;

  onBack?: () => void;

}


const gradientThemes = [

  {
    colorA: '#FF5F6D',
    colorB: '#FFC371',
    accent: '#FFF1C1',
  },

  {
    colorA: '#F8A5C2',
    colorB: '#7FDBFF',
    accent: '#E9D5FF',
  },

  {
    colorA: '#8EC5FC',
    colorB: '#E0C3FC',
    accent: '#FFFFFF',
  },

];



export default function VisualLesson({

  lesson,

  onComplete,

  onBack,

}: VisualLessonProps) {



  const cards: LessonCard[] =
    lesson.cards ?? [];



  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    audioVersion,
    setAudioVersion,
  ] = useState(0);

  const [
    completing,
    setCompleting,
  ] = useState(false);



  const cardOpacity =
    useRef(
      new Animated.Value(0),
    ).current;

  const cardTranslate =
    useRef(
      new Animated.Value(35),
    ).current;

  const cardScale =
    useRef(
      new Animated.Value(0.96),
    ).current;

  const backgroundMotion =
    useRef(
      new Animated.Value(0),
    ).current;

  const nextButtonScale =
    useRef(
      new Animated.Value(1),
    ).current;



  const currentCard =
    cards[currentIndex];



  const currentVideo =
    currentIndex === 0
      ? VIDEO_HOLA_GUARDABARRANCO
      : currentIndex === 2
        ? VIDEO_ESCRITURA_HOLA
        : null;



  const currentTheme =
    gradientThemes[
      currentIndex %
      gradientThemes.length
    ];



  useEffect(() => {

    cardOpacity.setValue(0);
    cardTranslate.setValue(35);
    cardScale.setValue(0.96);

    Animated.parallel([

      Animated.timing(
        cardOpacity,
        {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        },
      ),

      Animated.spring(
        cardTranslate,
        {
          toValue: 0,
          friction: 7,
          tension: 55,
          useNativeDriver: true,
        },
      ),

      Animated.spring(
        cardScale,
        {
          toValue: 1,
          friction: 7,
          tension: 55,
          useNativeDriver: true,
        },
      ),

    ]).start();

  }, [
    currentIndex,
    cardOpacity,
    cardTranslate,
    cardScale,
  ]);



  useEffect(() => {

    const animation =
      Animated.loop(

        Animated.sequence([

          Animated.timing(
            backgroundMotion,
            {
              toValue: 1,
              duration: 2600,
              useNativeDriver: true,
            },
          ),

          Animated.timing(
            backgroundMotion,
            {
              toValue: 0,
              duration: 2600,
              useNativeDriver: true,
            },
          ),

        ]),

      );

    animation.start();

    return () => {
      animation.stop();
    };

  }, [backgroundMotion]);



  function reproducirAudio() {

    setAudioVersion(
      value =>
        value + 1,
    );

  }



  useEffect(() => {

    if (!currentCard?.audio) {
      return;
    }

    setAudioVersion(
      value =>
        value + 1,
    );

  }, [
    currentIndex,
    currentCard?.audio,
  ]);



  function siguiente() {

    if (completing) {
      return;
    }

    if (
      currentIndex <
      cards.length - 1
    ) {

      setCurrentIndex(
        value =>
          value + 1,
      );

      return;

    }

    setCompleting(true);

    Animated.sequence([

      Animated.spring(
        nextButtonScale,
        {
          toValue: 0.96,
          friction: 4,
          tension: 100,
          useNativeDriver: true,
        },
      ),

      Animated.spring(
        nextButtonScale,
        {
          toValue: 1,
          friction: 4,
          tension: 100,
          useNativeDriver: true,
        },
      ),

    ]).start(() => {

      onComplete();

    });

  }



  function anterior() {

    if (completing) {
      return;
    }

    if (
      currentIndex > 0
    ) {

      setCurrentIndex(
        value =>
          value - 1,
      );

      return;

    }

    if (onBack) {
      onBack();
    }

  }



  const progress =
    cards.length > 0
      ? ((currentIndex + 1) /
          cards.length) *
        100
      : 0;


  if (!currentCard) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F8FAFC"
        />

        <View
          style={styles.errorContainer}
        >

          <View
            style={styles.errorVisual}
          >

            <Text
              style={styles.errorVisualText}
            >
              AISANKA
            </Text>

          </View>

          <Text
            style={styles.errorTitle}
          >
            Contenido no disponible
          </Text>

          <Text
            style={styles.errorText}
          >
            Esta lección todavía no tiene
            tarjetas configuradas.
          </Text>

          <Pressable
            style={styles.backButton}
            onPress={onBack}
          >

            <Text
              style={styles.backButtonText}
            >
              VOLVER
            </Text>

          </Pressable>

        </View>

      </SafeAreaView>

    );

  }


  return (

    <SafeAreaView
      style={styles.container}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          currentTheme.colorA
        }
      />


      {}

      <View
        pointerEvents="none"
        style={styles.backgroundLayer}
      >

        <Animated.View
          style={[
            styles.backgroundBlob,
            styles.blobOne,
            {
              backgroundColor:
                currentTheme.colorA,

              transform: [
                {
                  translateX:
                    backgroundMotion.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 35],
                    }),
                },

                {
                  translateY:
                    backgroundMotion.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -20],
                    }),
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.backgroundBlob,
            styles.blobTwo,
            {
              backgroundColor:
                currentTheme.colorB,

              transform: [
                {
                  translateX:
                    backgroundMotion.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -30],
                    }),
                },

                {
                  translateY:
                    backgroundMotion.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 25],
                    }),
                },
              ],
            },
          ]}
        />

        <View
          style={[
            styles.backgroundBlob,
            styles.blobThree,
            {
              backgroundColor:
                currentTheme.accent,
            },
          ]}
        />

      </View>


      {}

      {currentCard.audio && (

        <Video
          key={
            `${currentIndex}-${audioVersion}`
          }
          source={
            currentCard.audio
          }
          paused={false}
          repeat={false}
          controls={false}
          volume={1}
          playInBackground={false}
          playWhenInactive={false}
          onError={() => {}}
          style={styles.hiddenAudio}
        />

      )}


      {}

      <View
        style={styles.header}
      >

        <Pressable
          style={
            styles.headerBackButton
          }
          onPress={anterior}
        >

          <Text
            style={
              styles.headerBackArrow
            }
          >
            ‹
          </Text>

          <Text
            style={
              styles.headerBackLabel
            }
          >
            ATRÁS
          </Text>

        </Pressable>


        <View
          style={styles.progressContainer}
        >

          <Text
            style={styles.progressText}
          >
            {currentIndex + 1} / {cards.length}
          </Text>

          <View
            style={
              styles.progressBackground
            }
          >

            <Animated.View
              style={[
                styles.progressFill,
                {
                  width:
                    `${progress}%`,
                  backgroundColor:
                    currentTheme.colorA,
                },
              ]}
            />

          </View>

        </View>

      </View>


      {}

      <View
        style={styles.titleContainer}
      >

        <Text
          style={styles.lessonLabel}
        >
          APRENDEMOS JUNTOS
        </Text>

        <Text
          style={styles.lessonTitle}
          numberOfLines={2}
        >
          {lesson.title}
        </Text>

      </View>


      {}

      <Animated.View
        style={[
          styles.card,
          {
            opacity:
              cardOpacity,

            transform: [
              {
                translateY:
                  cardTranslate,
              },

              {
                scale:
                  cardScale,
              },
            ],
          },
        ]}
      >

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.cardContent
          }
        >

          {}

          <View
            style={[
              styles.numberCircle,
              {
                backgroundColor:
                  currentTheme.colorA,
              },
            ]}
          >

            <Text
              style={styles.numberText}
            >
              {currentIndex + 1}
            </Text>

          </View>


          {}

          <Text
            style={styles.cardTitle}
          >
            {currentCard.title ||
              (
                currentIndex === 0
                  ? ''
                  : currentIndex === 1
                    ? 'Escucha y repite'
                    : 'Aprende a escribirla'
              )}
          </Text>


          {}

          {currentVideo && (

            <View
              style={styles.videoContainer}
            >

              <Video
                source={currentVideo}
                paused={false}
                repeat={true}
                muted={true}
                controls={false}
                resizeMode="contain"
                style={styles.lessonVideo}
              />

              <View
                style={styles.videoBadge}
              >

                <Text
                  style={styles.videoBadgeText}
                >
                  {currentIndex === 0
                    ? ''
                    : 'OBSERVA CÓMO SE ESCRIBE'}
                </Text>

              </View>

            </View>

          )}


          {}

          <View
            style={[
              styles.wordContainer,
              {
                backgroundColor:
                  `${currentTheme.colorA}22`,
              },
            ]}
          >

            <Text
              style={styles.wordLabel}
            >
              PALABRA
            </Text>

            <Text
              style={[
                styles.wordText,
                {
                  color:
                    currentTheme.colorA,
                },
              ]}
            >
              {currentCard.targetLanguage ??
                currentCard.title}
            </Text>

          </View>


          {}

          {currentCard.spanish && (

            <View
              style={
                styles.translationContainer
              }
            >

              <Text
                style={styles.translationLabel}
              >
                EN ESPAÑOL
              </Text>

              <Text
                style={styles.translationText}
              >
                {currentCard.spanish}
              </Text>

            </View>

          )}


          {}

          {currentCard.pronunciation && (

            <View
              style={
                styles.pronunciationContainer
              }
            >

              <Text
                style={
                  styles.pronunciationLabel
                }
              >
                PRONUNCIACIÓN
              </Text>

              <Text
                style={
                  styles.pronunciationText
                }
              >
                {currentCard.pronunciation}
              </Text>

            </View>

          )}


          {}

          {currentCard.description && (

            <Text
              style={styles.description}
            >
              {currentCard.description}
            </Text>

          )}


          {}

          {currentCard.audio && (

            <Pressable
              onPress={
                reproducirAudio
              }
              style={({pressed}) => [
                styles.audioButton,

                pressed &&
                  styles.buttonPressed,
              ]}
            >

              <View
                style={styles.audioButtonCircle}
              >

                <Text
                  style={
                    styles.audioButtonCircleText
                  }
                >
                  SONIDO
                </Text>

              </View>

              <Text
                style={
                  styles.audioButtonText
                }
              >
                ESCUCHAR DE NUEVO
              </Text>

            </Pressable>

          )}

        </ScrollView>

      </Animated.View>


      {}

      <View
        style={styles.dotsContainer}
      >

        {cards.map(
          (_, index) => (

            <Animated.View
              key={index}
              style={[
                styles.dot,

                index === currentIndex
                  ? {
                      width: 32,
                      backgroundColor:
                        currentTheme.colorA,
                    }
                  : {
                      width: 8,
                      backgroundColor:
                        '#CBD5E1',
                    },
              ]}
            />

          ),
        )}

      </View>


      {}

      <View
        style={styles.navigation}
      >

        <Pressable
          style={[
            styles.navigationButton,
            styles.previousButton,

            currentIndex === 0 &&
              styles.previousButtonDisabled,
          ]}
          onPress={anterior}
          disabled={
            completing
          }
        >

          <Text
            style={
              styles.previousButtonText
            }
          >
            ATRÁS
          </Text>

        </Pressable>


        <Animated.View
          style={[
            styles.nextButtonWrapper,
            {
              transform: [
                {
                  scale:
                    nextButtonScale,
                },
              ],
            },
          ]}
        >

          <Pressable
            style={
              styles.navigationButton
            }
            onPress={siguiente}
            disabled={
              completing
            }
          >

            <Text
              style={
                styles.nextButtonText
              }
            >
              {currentIndex ===
                cards.length - 1
                ? 'IR AL JUEGO'
                : 'SIGUIENTE'}
            </Text>

          </Pressable>

        </Animated.View>

      </View>


      {}

      <View
        style={styles.helpContainer}
      >

        <Text
          style={styles.helpText}
        >
          {currentIndex === 0
            ? 'Mira el video y escucha la palabra.'
            : currentIndex === 1
              ? 'Escucha con atención y repite.'
              : 'Observa las letras y su orden.'}
        </Text>

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 18,
  },

  hiddenAudio: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },

  backgroundLayer: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },

  backgroundBlob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.42,
  },

  blobOne: {
    width: 330,
    height: 330,
    top: -130,
    left: -100,
  },

  blobTwo: {
    width: 360,
    height: 360,
    bottom: -170,
    right: -120,
  },

  blobThree: {
    width: 240,
    height: 240,
    top: '42%',
    right: -150,
    opacity: 0.18,
  },



  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },

  headerBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 92,
    paddingVertical: 8,
  },

  headerBackArrow: {
    fontSize: 38,
    lineHeight: 38,
    color: '#0F172A',
    fontWeight: '700',
  },

  headerBackLabel: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '900',
    color: '#334155',
  },

  progressContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  progressText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#334155',
  },

  progressBackground: {
    width: 145,
    height: 8,
    marginTop: 5,
    borderRadius: 8,
    backgroundColor:
      'rgba(255,255,255,0.75)',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 8,
  },


  titleContainer: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 9,
  },

  lessonLabel: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#475569',
  },

  lessonTitle: {
    marginTop: 2,
    fontSize: 34,
    lineHeight: 39,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
  },


  card: {
    flex: 1,
    minHeight: 0,
    borderRadius: 30,
    backgroundColor:
      'rgba(255,255,255,0.97)',
    elevation: 9,
    shadowColor: '#0F172A',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    overflow: 'hidden',
  },

  cardContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  numberCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberText: {
    fontSize: 21,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  cardTitle: {
    marginTop: 10,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '900',
    color: '#1E293B',
    textAlign: 'center',
  },

  videoContainer: {
    width: '100%',
    height: 170,
    marginTop: 12,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },

  lessonVideo: {
    width: '100%',
    height: '100%',
  },

  videoBadge: {
    position: 'absolute',
    left: 12,
    bottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor:
      'rgba(15,23,42,0.78)',
  },

  videoBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },


  wordContainer: {
    width: '100%',
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 21,
    alignItems: 'center',
  },

  wordLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#64748B',
  },

  wordText: {
    marginTop: 2,
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
  },



  translationContainer: {
    marginTop: 11,
    alignItems: 'center',
  },

  translationLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.3,
    color: '#64748B',
  },

  translationText: {
    marginTop: 2,
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
  },



  pronunciationContainer: {
    marginTop: 10,
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },

  pronunciationLabel: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
    color: '#64748B',
  },

  pronunciationText: {
    marginTop: 2,
    fontSize: 21,
    fontWeight: '900',
    color: '#334155',
  },



  description: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'center',
  },



  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    marginTop: 14,
    paddingHorizontal: 19,
    borderRadius: 25,
    backgroundColor: '#0F172A',
  },

  audioButtonCircle: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },

  audioButtonCircleText: {
    fontSize: 7,
    fontWeight: '900',
    color: '#0F172A',
  },

  audioButtonText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },



  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 8,
  },

  dot: {
    height: 8,
    borderRadius: 8,
  },


  navigation: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 6,
  },

  nextButtonWrapper: {
    flex: 1,
  },

  navigationButton: {
    minHeight: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },

  previousButton: {
    flex: 0.72,
    backgroundColor:
      'rgba(255,255,255,0.86)',
    borderWidth: 1,
    borderColor:
      'rgba(15,23,42,0.08)',
  },

  previousButtonDisabled: {
    opacity: 0.5,
  },

  previousButtonText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '900',
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.3,
  },

  buttonPressed: {
    transform: [
      {
        scale: 0.96,
      },
    ],
  },



  helpContainer: {
    alignItems: 'center',
    paddingBottom: 6,
  },

  helpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'center',
  },



  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  errorVisual: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
  },

  errorVisualText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1D4ED8',
    letterSpacing: 1,
  },

  errorTitle: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
  },

  errorText: {
    marginTop: 9,
    fontSize: 17,
    lineHeight: 24,
    color: '#64748B',
    textAlign: 'center',
  },

  backButton: {
    marginTop: 25,
    minWidth: 180,
    minHeight: 54,
    borderRadius: 27,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

});