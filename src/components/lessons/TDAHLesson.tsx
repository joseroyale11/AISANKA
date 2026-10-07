import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AccessibilityInfo,
  Animated,
  Dimensions,
  Easing,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import SoundPlayer from 'react-native-sound-player';
import Video from 'react-native-video';

import {Lesson} from '../../types/Lesson';
import {miskitoLessons} from '../../data/lessons/miskito/world1';

interface TDAHLessonProps {
  lesson: Lesson;
  levelId: number;
  onComplete: () => void;
  onBack?: () => void;
}

const {width} = Dimensions.get('window');

const NAKSA_AUDIO =
  require('../../assets/sounds/nacksa.mp3');

const HELLO_VIDEO =
  require('../../assets/videos/hola_guardabarranco.mp4');

const WRITING_VIDEO =
  require('../../assets/videos/escritura_hola_miskito.mp4');

const gradients = [
  ['#EF4444', '#FACC15'],
  ['#16A34A', '#67E8F9'],
  ['#2563EB', '#8B5CF6'],
  ['#F97316', '#EC4899'],
];

export default function TDAHLesson({
  lesson,
  levelId,
  onComplete,
  onBack,
}: TDAHLessonProps) {

  const [currentCard, setCurrentCard] =
    useState(0);

  const [reduceMotion, setReduceMotion] =
    useState(false);

  const slideAnimation =
    useRef(new Animated.Value(0)).current;

  const scaleAnimation =
    useRef(new Animated.Value(1)).current;

  const rotateAnimation =
    useRef(new Animated.Value(0)).current;

  const floatingAnimation =
    useRef(new Animated.Value(0)).current;

  const buttonAnimation =
    useRef(new Animated.Value(1)).current;

  const miskitoLesson =
    miskitoLessons.find(
      item =>
        item.world === lesson.world &&
        item.level === levelId,
    ) ??
    miskitoLessons[0];

  const spanishWord =
    (
      miskitoLesson?.translation ||
      'Hola'
    ).toUpperCase();

  const miskitoWord =
    (
      miskitoLesson?.word ||
      'Naksa'
    ).toUpperCase();

  const pronunciation =
    miskitoLesson?.pronunciation ||
    'nak-sa';

  useEffect(() => {
    AccessibilityInfo
      .isReduceMotionEnabled()
      .then(setReduceMotion);

    const subscription =
      AccessibilityInfo.addEventListener(
        'reduceMotionChanged',
        setReduceMotion,
      );

    return () => {
      subscription.remove();
    };
  }, []);


  useEffect(() => {

    slideAnimation.setValue(70);
    scaleAnimation.setValue(0.94);

    Animated.parallel([
      Animated.spring(
        slideAnimation,
        {
          toValue: 0,
          friction: 7,
          tension: 70,
          useNativeDriver: true,
        },
      ),
      Animated.spring(
        scaleAnimation,
        {
          toValue: 1,
          friction: 7,
          tension: 70,
          useNativeDriver: true,
        },
      ),
    ]).start();

  }, [
    currentCard,
    slideAnimation,
    scaleAnimation,
  ]);


  useEffect(() => {

    if (reduceMotion) {
      rotateAnimation.setValue(0);
      floatingAnimation.setValue(0);
      return;
    }

    const rotate =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            rotateAnimation,
            {
              toValue: 1,
              duration: 1800,
              easing: Easing.inOut(
                Easing.ease,
              ),
              useNativeDriver: true,
            },
          ),
          Animated.timing(
            rotateAnimation,
            {
              toValue: -1,
              duration: 1800,
              easing: Easing.inOut(
                Easing.ease,
              ),
              useNativeDriver: true,
            },
          ),
          Animated.timing(
            rotateAnimation,
            {
              toValue: 0,
              duration: 900,
              useNativeDriver: true,
            },
          ),
        ]),
      );

    const floating =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            floatingAnimation,
            {
              toValue: -10,
              duration: 1000,
              easing: Easing.inOut(
                Easing.ease,
              ),
              useNativeDriver: true,
            },
          ),
          Animated.timing(
            floatingAnimation,
            {
              toValue: 10,
              duration: 1000,
              easing: Easing.inOut(
                Easing.ease,
              ),
              useNativeDriver: true,
            },
          ),
        ]),
      );

    rotate.start();
    floating.start();

    return () => {
      rotate.stop();
      floating.stop();
    };

  }, [
    reduceMotion,
    rotateAnimation,
    floatingAnimation,
  ]);


  const reproducirNaksa = () => {
    try {
      SoundPlayer.stop();
      SoundPlayer.playAsset(
        NAKSA_AUDIO,
      );
    } catch (error) {
      console.log(
        'Error reproduciendo nacksa.mp3:',
        error,
      );
    }
  };

  const anunciar = (
    texto: string,
  ) => {
    AccessibilityInfo
      .announceForAccessibility(
        texto,
      );
  };


  const siguienteTarjeta = () => {

    if (currentCard < 3) {

      const siguiente =
        currentCard + 1;

      setCurrentCard(siguiente);

      anunciar(
        `Tarjeta ${siguiente + 1}`,
      );

      return;
    }

    onComplete();
  };



  const tarjetaAnterior = () => {

    if (currentCard > 0) {

      setCurrentCard(
        previous =>
          previous - 1,
      );

      anunciar(
        `Tarjeta ${currentCard}`,
      );
    }
  };

 

  const volver = () => {

    SoundPlayer.stop();

    if (onBack) {
      onBack();
    }
  };

  const letras =
    miskitoWord
      .replace(/\s/g, '')
      .split('');


  const renderCardContent = () => {



    if (currentCard === 0) {

      return (
        <>
          <Animated.View
            style={[
              styles.videoCard,
              {
                transform: [
                  {
                    translateY:
                      floatingAnimation,
                  },
                ],
              },
            ]}
          >

            <Video
              source={HELLO_VIDEO}
              style={styles.lessonVideo}
              resizeMode="cover"
              repeat
              muted={false}
              playInBackground={false}
              playWhenInactive={false}
            />

          </Animated.View>

          <Animated.View
            style={[
              styles.animatedWord,
              {
                transform: [
                  {
                    scale:
                      scaleAnimation,
                  },
                ],
              },
            ]}
          >

            <Text
              style={styles.smallLabel}
            >
              APRENDE UNA PALABRA
            </Text>

            <Text
              style={styles.mainWord}
            >
              {spanishWord}
            </Text>

            <View
              style={
                styles.arrowContainer
              }
            >
              <Text
                style={styles.arrow}
              >
                ↓
              </Text>
            </View>

            <Text
              style={styles.languageLabel}
            >
              EN MISKITO
            </Text>

            <Text
              style={
                styles.translationWord
              }
            >
              {miskitoWord}
            </Text>

          </Animated.View>

          <Animated.View
            style={[
              styles.attentionBox,
              {
                transform: [
                  {
                    rotate:
                      rotateAnimation.interpolate({
                        inputRange: [
                          -1,
                          0,
                          1,
                        ],
                        outputRange: [
                          '-2deg',
                          '0deg',
                          '2deg',
                        ],
                      }),
                  },
                ],
              },
            ]}
          >

            <View
              style={styles.attentionDot}
            />

         

          </Animated.View>
        </>
      );
    }

 

    if (currentCard === 1) {

      return (
        <>
          <Animated.View
            style={[
              styles.soundCircle,
              {
                transform: [
                  {
                    scale:
                      scaleAnimation,
                  },
                ],
              },
            ]}
          >

            <View
              style={styles.soundWave}
            />

          </Animated.View>

          <Text
            style={styles.cardTitle}
          >
            ESCUCHA Y REPITE
          </Text>

          <Text
            style={
              styles.pronunciationWord
            }
          >
            {miskitoWord}
          </Text>

          <Text
            style={
              styles.pronunciationText
            }
          >
            {pronunciation}
          </Text>

          <Pressable
            style={({pressed}) => [
              styles.soundButton,
              pressed &&
                styles.buttonPressed,
            ]}
            onPress={() => {
              reproducirNaksa();

              anunciar(
                `Escucha la palabra ${miskitoWord}`,
              );
            }}
          >

            <View
              style={
                styles.playTriangle
              }
            />

            <Text
              style={
                styles.soundButtonText
              }
            >
              ESCUCHAR PRONUNCIACIÓN
            </Text>

          </Pressable>

          <Pressable
            style={({pressed}) => [
              styles.repeatButton,
              pressed &&
                styles.buttonPressed,
            ]}
            onPress={() => {
              reproducirNaksa();

              anunciar(
                `Repite ${miskitoWord}`,
              );
            }}
          >

            <Text
              style={
                styles.repeatButtonText
              }
            >
              REPETIR AUDIO
            </Text>

          </Pressable>

          <View
            style={styles.didacticBox}
          >

            <Text
              style={
                styles.didacticTitle
              }
            >
              PRÁCTICA
            </Text>

            <Text
              style={
                styles.didacticText
              }
            >
              Escucha la pronunciación,
              repítela y vuelve a escucharla
              hasta familiarizarte con ella.
            </Text>

          </View>
        </>
      );
    }



    if (currentCard === 2) {

      return (
        <>
          <View
            style={styles.videoCard}
          >

            <Video
              source={WRITING_VIDEO}
              style={styles.lessonVideo}
              resizeMode="cover"
              repeat
              muted={false}
              playInBackground={false}
              playWhenInactive={false}
            />

          </View>

          <Animated.View
            style={[
              styles.writingContainer,
              {
                transform: [
                  {
                    translateY:
                      floatingAnimation,
                  },
                ],
              },
            ]}
          >

            <Text
              style={styles.smallLabel}
            >
              ASÍ SE ESCRIBE
            </Text>

            <View
              style={styles.lettersRow}
            >

              {letras.map(
                (
                  letra,
                  index,
                ) => (
                  <Animated.View
                    key={`${letra}-${index}`}
                    style={[
                      styles.letterCard,
                      {
                        transform: [
                          {
                            translateY:
                              floatingAnimation.interpolate({
                                inputRange: [
                                  -10,
                                  10,
                                ],
                                outputRange:
                                  index % 2 ===
                                  0
                                    ? [5, -5]
                                    : [-5, 5],
                              }),
                          },
                        ],
                      },
                    ]}
                  >

                    <Text
                      style={
                        styles.letterText
                      }
                    >
                      {letra}
                    </Text>

                  </Animated.View>
                ),
              )}

            </View>

            <Text
              style={
                styles.spellingWord
              }
            >
              {miskitoWord}
            </Text>

          </Animated.View>

          <View
            style={styles.didacticBox}
          >

            <Text
              style={
                styles.didacticTitle
              }
            >
              PREPARA LA PALABRA
            </Text>

            <Text
              style={
                styles.didacticText
              }
            >
              Observa cómo se escribe
              {` `}
              {miskitoWord}
              {` `}
              antes de comenzar el reto.
            </Text>

          </View>
        </>
      );
    }



    return (
      <>
        <Animated.View
          style={[
            styles.finalIcon,
            {
              transform: [
                {
                  scale:
                    scaleAnimation,
                },
                {
                  rotate:
                    rotateAnimation.interpolate({
                      inputRange: [
                        -1,
                        1,
                      ],
                      outputRange: [
                        '-4deg',
                        '4deg',
                      ],
                    }),
                },
              ],
            },
          ]}
        >

          <View
            style={styles.finalIconInner}
          />

        </Animated.View>

        <Text
          style={styles.cardTitle}
        >
          AHORA ES TU TURNO
        </Text>

        <Text
          style={
            styles.finalWord
          }
        >
          {miskitoWord}
        </Text>

        <Text
          style={
            styles.didacticText
          }
        >
          Forma la palabra colocando sus
          letras en el orden correcto.
        </Text>

        <View
          style={styles.challengeSteps}
        >

          <View
            style={styles.stepItem}
          >
            <View
              style={styles.stepNumber}
            >
              <Text
                style={styles.stepNumberText}
              >
                1
              </Text>
            </View>

            <Text
              style={styles.stepText}
            >
              Escucha
            </Text>
          </View>

          <View
            style={styles.stepItem}
          >
            <View
              style={styles.stepNumber}
            >
              <Text
                style={styles.stepNumberText}
              >
                2
              </Text>
            </View>

            <Text
              style={styles.stepText}
            >
              Ordena
            </Text>
          </View>

          <View
            style={styles.stepItem}
          >
            <View
              style={styles.stepNumber}
            >
              <Text
                style={styles.stepNumberText}
              >
                3
              </Text>
            </View>

            <Text
              style={styles.stepText}
            >
              Completa
            </Text>
          </View>

        </View>
      </>
    );
  };

  return (
    <LinearGradient
      colors={
        gradients[currentCard]
      }
      style={styles.container}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
    >

      <SafeAreaView
        style={styles.safeArea}
      >

        <View
          style={styles.header}
        >

          <Pressable
            style={styles.backButton}
            onPress={volver}
          >
            <Text
              style={styles.backText}
            >
              ‹
            </Text>
          </Pressable>

          <View
            style={styles.headerCenter}
          >

            <Text
              style={styles.headerTitle}
            >
              APRENDEMOS
            </Text>

            <Text
              style={styles.headerSubtitle}
            >
              HOLA EN MISKITO
            </Text>

          </View>

          <View
            style={styles.progressBadge}
          >

            <Text
              style={styles.progressText}
            >
              {currentCard + 1}/4
            </Text>

          </View>

        </View>

        <View
          style={styles.progressContainer}
        >

          {[0, 1, 2, 3].map(
            item => (
              <Animated.View
                key={item}
                style={[
                  styles.progressDot,
                  item <= currentCard &&
                    styles.progressDotActive,
                  item === currentCard && {
                    transform: [
                      {
                        scaleX: 1.25,
                      },
                    ],
                  },
                ]}
              />
            ),
          )}

        </View>

        <ScrollView
          contentContainerStyle={
            styles.scrollContent
          }
          showsVerticalScrollIndicator={
            false
          }
        >

          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  {
                    translateY:
                      slideAnimation,
                  },
                  {
                    scale:
                      scaleAnimation,
                  },
                ],
              },
            ]}
          >

            {renderCardContent()}

          </Animated.View>

        </ScrollView>

        <View
          style={styles.bottomContainer}
        >

          <View
            style={styles.navigationRow}
          >

            <Pressable
              style={[
                styles.previousButton,
                currentCard === 0 &&
                  styles.disabledButton,
              ]}
              disabled={
                currentCard === 0
              }
              onPress={
                tarjetaAnterior
              }
            >

              <Text
                style={
                  styles.previousButtonText
                }
              >
                ANTERIOR
              </Text>

            </Pressable>

            <Pressable
              style={
                styles.nextButton
              }
              onPress={
                siguienteTarjeta
              }
            >

              <Text
                style={
                  styles.nextButtonText
                }
              >
                {currentCard === 3
                  ? 'IR AL JUEGO'
                  : 'CONTINUAR'}
              </Text>

            </Pressable>

          </View>

        </View>

      </SafeAreaView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  header: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor:
      'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 42,
    fontWeight: '300',
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1,
  },

  headerSubtitle: {
    color:
      'rgba(255,255,255,0.88)',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
  },

  progressBadge: {
    minWidth: 54,
    height: 38,
    borderRadius: 19,
    backgroundColor:
      'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  progressDot: {
    width: 32,
    height: 7,
    borderRadius: 5,
    backgroundColor:
      'rgba(255,255,255,0.30)',
    marginHorizontal: 4,
  },

  progressDotActive: {
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 22,
    minHeight: 540,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 11,
  },

  videoCard: {
    width: '100%',
    height: 175,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 22,
    backgroundColor: '#E2E8F0',
  },

  lessonVideo: {
    width: '100%',
    height: '100%',
  },

  animatedWord: {
    alignItems: 'center',
    width: '100%',
  },

  smallLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 12,
  },

  mainWord: {
    fontSize:
      width > 380 ? 58 : 50,
    color: '#111827',
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
  },

  arrowContainer: {
    marginVertical: 4,
  },

  arrow: {
    fontSize: 38,
    color: '#F59E0B',
    fontWeight: '900',
  },

  languageLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '800',
    marginBottom: 6,
  },

  translationWord: {
    fontSize:
      width > 380 ? 50 : 44,
    color: '#2563EB',
    fontWeight: '900',
    letterSpacing: 2,
  },

  attentionBox: {
    marginTop: 26,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },

  attentionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    marginRight: 10,
  },

  attentionText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '800',
  },

  soundCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  soundWave: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 7,
    borderColor: '#16A34A',
  },

  cardTitle: {
    fontSize: 24,
    color: '#111827',
    fontWeight: '900',
    textAlign: 'center',
  },

  pronunciationWord: {
    fontSize: 48,
    color: '#16A34A',
    fontWeight: '900',
    marginTop: 12,
    letterSpacing: 2,
  },

  pronunciationText: {
    fontSize: 22,
    color: '#475569',
    fontWeight: '700',
    marginTop: 5,
  },

  soundButton: {
    width: '100%',
    minHeight: 64,
    borderRadius: 20,
    backgroundColor: '#16A34A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    paddingHorizontal: 15,
  },

  repeatButton: {
    width: '100%',
    minHeight: 58,
    borderRadius: 19,
    backgroundColor: '#0891B2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  playTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 9,
    borderBottomWidth: 9,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#FFFFFF',
    marginRight: 12,
  },

  soundButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  repeatButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  buttonPressed: {
    transform: [
      {
        scale: 0.96,
      },
    ],
    opacity: 0.88,
  },

  didacticBox: {
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    padding: 17,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },

  didacticTitle: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '900',
    marginBottom: 6,
    textAlign: 'center',
  },

  didacticText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
  },

  writingContainer: {
    alignItems: 'center',
    width: '100%',
  },

  lettersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 12,
  },

  letterCard: {
    width: 56,
    height: 68,
    borderRadius: 17,
    backgroundColor: '#EEF2FF',
    borderWidth: 2,
    borderColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    marginVertical: 5,
  },

  letterText: {
    fontSize: 33,
    color: '#4338CA',
    fontWeight: '900',
  },

  spellingWord: {
    marginTop: 22,
    fontSize: 36,
    color: '#111827',
    fontWeight: '900',
    letterSpacing: 3,
  },

  finalIcon: {
    width: 115,
    height: 115,
    borderRadius: 58,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  finalIconInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 8,
    borderColor: '#F59E0B',
  },

  finalWord: {
    fontSize: 46,
    color: '#EA580C',
    fontWeight: '900',
    letterSpacing: 3,
    marginVertical: 14,
  },

  challengeSteps: {
    width: '100%',
    marginTop: 25,
  },

  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 17,
    padding: 12,
    marginBottom: 8,
  },

  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  stepText: {
    color: '#7C2D12',
    fontSize: 16,
    fontWeight: '800',
  },

  bottomContainer: {
    paddingHorizontal: 18,
    paddingTop: 7,
    paddingBottom: 14,
  },

  navigationRow: {
    flexDirection: 'row',
    gap: 10,
  },

  previousButton: {
    flex: 0.8,
    minHeight: 62,
    borderRadius: 21,
    backgroundColor:
      'rgba(255,255,255,0.28)',
    borderWidth: 1.5,
    borderColor:
      'rgba(255,255,255,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.4,
  },

  previousButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  nextButton: {
    flex: 1.2,
    minHeight: 62,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },

  nextButtonText: {
    color: '#312E81',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});