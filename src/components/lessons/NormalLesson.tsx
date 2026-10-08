// Esta pantalla presenta las tarjetas de aprendizaje, controla la navegación, reproduce los recursos multimedia y anima la experiencia educativa.

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';

import {Lesson} from '../../types/Lesson';

interface NormalLessonProps {
  lesson: Lesson;
  levelId?: number;
  onComplete: () => void;
  onBack?: () => void;
}

export default function NormalLesson({
  lesson,
  levelId,
  onComplete,
  onBack,
}: NormalLessonProps) {

  const [currentCard, setCurrentCard] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslate = useRef(new Animated.Value(45)).current;
  const cardScale = useRef(new Animated.Value(0.92)).current;
  const floatingAnimation = useRef(new Animated.Value(0)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;

  const cards = lesson.cards ?? [];
  const totalCards = cards.length;
  const card = cards[currentCard];

  const gradients = [
    ['#28C76F', '#43C6F5'],
    ['#FFD93D', '#FF6B35'],
    ['#FF8A65', '#7C4DFF'],
  ];

  const gradient =
    gradients[currentCard % gradients.length];

  const animateCard = () => {
    cardOpacity.setValue(0);
    cardTranslate.setValue(45);
    cardScale.setValue(0.92);

    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.spring(cardTranslate, {
        toValue: 0,
        friction: 7,
        tension: 55,
        useNativeDriver: true,
      }),

      Animated.spring(cardScale, {
        toValue: 1,
        friction: 6,
        tension: 55,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animateCard();

    setIsPlayingAudio(false);
    setVideoFinished(false);
  }, [currentCard]);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnimation, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(floatingAnimation, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, {
          toValue: 1.04,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(buttonPulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  if (!cards.length) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#DFF8EA', '#DDF4FF']}
          style={styles.emptyScreen}
        >
          <View style={styles.emptyIcon}>
            <View style={styles.emptyIconInner} />
          </View>

          <Text style={styles.emptyTitle}>
            No hay contenido
          </Text>

          <Text style={styles.emptyText}>
            Esta lección todavía no tiene
            tarjetas disponibles.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={onBack}
          >
            <Text style={styles.primaryButtonText}>
              Volver
            </Text>
          </Pressable>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const audioSource =
    card?.audio ?? lesson.audio;

  const videoSource =
    card?.video ?? lesson.video;

  const nextCard = () => {
    if (currentCard < totalCards - 1) {
      setCurrentCard(currentCard + 1);
      return;
    }

    onComplete();
  };

  const previousCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      return;
    }

    onBack?.();
  };

  const progress =
    ((currentCard + 1) / totalCards) * 100;

  const videoShouldPlay =
    currentCard === 0 || currentCard === 2;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.background}
      >

        <Animated.View
          style={[
            styles.decorCircle,
            {
              transform: [
                {
                  translateY:
                    floatingAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -18],
                    }),
                },
              ],
            },
          ]}
        />

        <View style={styles.decorCircleTwo} />

        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={previousCard}
          >
            <Text style={styles.headerButtonText}>
              Volver
            </Text>
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>
              Aprende Mayangna
            </Text>

            <Text style={styles.headerSubtitle}>
              Paso {currentCard + 1} de {totalCards}
            </Text>
          </View>

          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {currentCard + 1}/{totalCards}
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>
        </View>

        <Animated.View
          style={[
            styles.card,
            {
              opacity: cardOpacity,
              transform: [
                {
                  translateY: cardTranslate,
                },
                {
                  scale: cardScale,
                },
              ],
            },
          ]}
        >

          <View style={styles.cardTop}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>
                {currentCard + 1}
              </Text>
            </View>

            <View style={styles.cardLines}>
              <View style={styles.lineOne} />
              <View style={styles.lineTwo} />
            </View>
          </View>

          {currentCard === 0 && (
            <View style={styles.cardContent}>
              <View style={styles.iconCircle}>
                <View style={styles.waveIcon}>
                  <View style={styles.waveOne} />
                  <View style={styles.waveTwo} />
                  <View style={styles.waveThree} />
                </View>
              </View>

              <Text style={styles.instruction}>
                Conoce una nueva palabra
              </Text>

              <Text style={styles.word}>
                PARASTH
              </Text>

              <View style={styles.translationCard}>
                <Text style={styles.translationLabel}>
                  En español significa
                </Text>

                <Text style={styles.translation}>
                  Hola
                </Text>
              </View>

              <Text style={styles.helperText}>
            
              </Text>

              <View style={styles.videoContainer}>
                <Video
                  source={require('../../assets/videos/hola_guardabarranco.mp4')}
                  paused={!videoShouldPlay}
                  style={styles.video}
                  resizeMode="cover"
                  repeat={false}
                  controls={false}
                  onEnd={() => {
                    setVideoFinished(true);
                  }}
                  onError={() => {
                    setVideoFinished(false);
                  }}
                />

                <View style={styles.videoLabel}>
                  <Text style={styles.videoLabelText}>
                    {videoFinished
                      ? 'Video terminado'
                      : 'Video de aprendizaje'}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {currentCard === 1 && (
            <View style={styles.cardContent}>
              <View style={styles.iconCircle}>
                <View style={styles.soundIcon}>
                  <View style={styles.soundShape} />
                  <View style={styles.soundWaveOne} />
                  <View style={styles.soundWaveTwo} />
                </View>
              </View>

              <Text style={styles.instruction}>
                Escucha y pronuncia
              </Text>

              <Text style={styles.word}>
                PARASTAH
              </Text>

              <Text style={styles.pronunciation}>
                parasta
              </Text>

              <Text style={styles.audioHint}>
                Escucha atentamente y después
                repite la palabra en voz alta.
              </Text>

              {audioSource && (
                <Video
                  source={require('../../assets/sounds/parastah.mp3')}
                  paused={!isPlayingAudio}
                  style={styles.hiddenAudio}
                  repeat={false}
                  controls={false}
                  volume={1}
                  playInBackground={false}
                  ignoreSilentSwitch="ignore"
                  onEnd={() => {
                    setIsPlayingAudio(false);
                  }}
                  onError={() => {
                    setIsPlayingAudio(false);
                  }}
                />
              )}

              <Animated.View
                style={{
                  transform: [
                    {
                      scale: buttonPulse,
                    },
                  ],
                }}
              >
                <Pressable
                  style={[
                    styles.audioButton,
                    isPlayingAudio &&
                      styles.audioButtonActive,
                  ]}
                  onPress={() => {
                    setIsPlayingAudio(true);
                  }}
                >
                  <View style={styles.playIcon}>
                    <View style={styles.playTriangle} />
                  </View>

                  <Text style={styles.audioButtonText}>
                    {isPlayingAudio
                      ? 'Escuchando'
                      : 'Escuchar pronunciación'}
                  </Text>
                </Pressable>
              </Animated.View>

              <Text style={styles.repeatText}>
                Ahora repítela tú
              </Text>
            </View>
          )}

          {currentCard === 2 && (
            <View style={styles.cardContent}>
              <View style={styles.iconCircle}>
                <View style={styles.pencilIcon}>
                  <View style={styles.pencilBody} />
                  <View style={styles.pencilTip} />
                </View>
              </View>

              <Text style={styles.instruction}>
                Aprende a escribirla
              </Text>

              <Text style={styles.word}>
                PARASTH
              </Text>

              <Text style={styles.helperText}>
                Observa cómo se escribe la palabra.
              </Text>

              <View style={styles.videoContainer}>
                <Video
                  source={require('../../assets/videos/escritura_hola_mayangna.mp4')}
                  paused={!videoShouldPlay}
                  style={styles.video}
                  resizeMode="contain"
                  repeat={false}
                  controls={false}
                  onEnd={() => {
                    setVideoFinished(true);
                  }}
                />

                <View style={styles.videoLabel}>
                  <Text style={styles.videoLabelText}>
                    {videoFinished
                      ? 'Video terminado'
                      : 'Observa y aprende'}
                  </Text>
                </View>
              </View>
            </View>
          )}

        </Animated.View>

        <View style={styles.dotsContainer}>
          {cards.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentCard &&
                  styles.dotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.bottomContainer}>
          <Pressable
            style={styles.backBottomButton}
            onPress={previousCard}
          >
            <Text style={styles.backBottomText}>
              Volver
            </Text>
          </Pressable>

          <Pressable
            style={styles.nextButton}
            onPress={nextCard}
          >
            <Text style={styles.nextButtonText}>
              {currentCard === totalCards - 1
                ? 'Comenzar juego'
                : 'Continuar'}
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
  },

  decorCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.18)',
    right: -45,
    top: 90,
  },

  decorCircleTwo: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.14)',
    left: -25,
    bottom: 130,
  },

  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerButton: {
    minWidth: 68,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  headerButtonText: {
    color: '#29466C',
    fontSize: 14,
    fontWeight: '900',
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
  },

  counter: {
    minWidth: 52,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterText: {
    color: '#35567E',
    fontSize: 13,
    fontWeight: '900',
  },

  progressContainer: {
    marginTop: 4,
    marginBottom: 12,
  },

  progressBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    elevation: 10,
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    overflow: 'hidden',
  },

  cardTop: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  stepBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EAF5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepBadgeText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#3E73B8',
  },

  cardLines: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  lineOne: {
    width: 28,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D7E9F7',
  },

  lineTwo: {
    width: 10,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D7E9F7',
  },

  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EDF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  waveIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  waveOne: {
    width: 5,
    height: 16,
    borderRadius: 3,
    backgroundColor: '#2DBB78',
  },

  waveTwo: {
    width: 5,
    height: 29,
    borderRadius: 3,
    backgroundColor: '#2DBB78',
  },

  waveThree: {
    width: 5,
    height: 21,
    borderRadius: 3,
    backgroundColor: '#2DBB78',
  },

  soundIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  soundShape: {
    width: 18,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#F5B927',
  },

  soundWaveOne: {
    width: 18,
    height: 18,
    borderRightWidth: 3,
    borderColor: '#F5B927',
    borderRadius: 12,
    marginLeft: -4,
  },

  soundWaveTwo: {
    width: 26,
    height: 27,
    borderRightWidth: 3,
    borderColor: '#F5B927',
    borderRadius: 15,
    marginLeft: -15,
  },

  pencilIcon: {
    transform: [
      {
        rotate: '-35deg',
      },
    ],
  },

  pencilBody: {
    width: 38,
    height: 11,
    borderRadius: 4,
    backgroundColor: '#7B61FF',
  },

  pencilTip: {
    position: 'absolute',
    right: -7,
    top: 1,
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 9,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#E5B887',
  },

  instruction: {
    fontSize: 19,
    fontWeight: '800',
    color: '#526B8C',
    textAlign: 'center',
    marginBottom: 10,
  },

  word: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#263F64',
    textAlign: 'center',
    marginBottom: 14,
  },

  translationCard: {
    width: '86%',
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 18,
    backgroundColor: '#F1F8FF',
    alignItems: 'center',
  },

  translationLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7890AE',
    marginBottom: 4,
  },

  translation: {
    fontSize: 28,
    fontWeight: '900',
    color: '#3172B5',
  },

  helperText: {
    marginTop: 13,
    maxWidth: 340,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#73859D',
    textAlign: 'center',
  },

  videoContainer: {
    width: '100%',
    height: 205,
    marginTop: 14,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#EEF3F8',
  },

  video: {
    width: '100%',
    height: '100%',
  },

  videoLabel: {
    position: 'absolute',
    left: 12,
    bottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: 'rgba(24,45,70,0.72)',
  },

  videoLabelText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  pronunciation: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7C61C9',
    marginBottom: 10,
  },

  audioHint: {
    maxWidth: 320,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    color: '#73859D',
    marginBottom: 18,
  },

  hiddenAudio: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },

  audioButton: {
    minWidth: 235,
    minHeight: 58,
    borderRadius: 29,
    paddingHorizontal: 20,
    backgroundColor: '#F2B632',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },

  audioButtonActive: {
    backgroundColor: '#E29B0C',
  },

  playIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  playTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#D28B00',
    marginLeft: 2,
  },

  audioButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  repeatText: {
    marginTop: 17,
    fontSize: 16,
    fontWeight: '800',
    color: '#5E718E',
  },

  dotsContainer: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  dotActive: {
    width: 28,
    backgroundColor: '#FFFFFF',
  },

  bottomContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 3,
  },

  backBottomButton: {
    flex: 0.8,
    minHeight: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backBottomText: {
    color: '#58708E',
    fontSize: 15,
    fontWeight: '900',
  },

  nextButton: {
    flex: 1.5,
    minHeight: 54,
    borderRadius: 27,
    backgroundColor: '#284F80',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },

  emptyScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  emptyIcon: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  emptyIconInner: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#86CFA7',
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#29466C',
    marginBottom: 8,
  },

  emptyText: {
    maxWidth: 320,
    fontSize: 15,
    lineHeight: 22,
    color: '#60758F',
    textAlign: 'center',
    marginBottom: 22,
  },

  primaryButton: {
    minWidth: 180,
    minHeight: 52,
    paddingHorizontal: 24,
    borderRadius: 26,
    backgroundColor: '#294F7F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
});