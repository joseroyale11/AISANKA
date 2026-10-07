/*
 * AISANKA — COMPONENTE DE LECCIÓN PARA PERFIL AUTISMO
 *
 * Este componente presenta una lección educativa dividida en tarjetas
 * interactivas. Cada tarjeta utiliza estímulos visuales controlados,
 * animaciones suaves, colores diferenciados y controles grandes para
 * facilitar la comprensión y navegación del estudiante.
 *
 * La lección contiene:
 * 1. Presentación visual mediante video.
 * 2. Pronunciación mediante audio.
 * 3. Presentación de la escritura mediante video.
 *
 * El componente no modifica la lógica general del motor de aprendizaje.
 * Únicamente recibe una Lesson y notifica mediante onComplete cuando
 * el estudiante termina las tarjetas.
 */

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Video from 'react-native-video';

import {
  Lesson,
  LessonCard,
} from '../../types/Lesson';

interface Props {
  lesson: Lesson;
  onComplete: () => void;
}

export default function AutismLesson({
  lesson,
  onComplete,
}: Props) {

  const [currentCard, setCurrentCard] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const cards: LessonCard[] = lesson.cards ?? [];

  const card = cards[currentCard];

  const fadeAnimation =
    useRef(new Animated.Value(0)).current;

  const scaleAnimation =
    useRef(new Animated.Value(0.94)).current;

  const translateAnimation =
    useRef(new Animated.Value(35)).current;

  const buttonScale =
    useRef(new Animated.Value(1)).current;

  const titleAnimation =
    useRef(new Animated.Value(0)).current;

  const decorativeAnimation =
    useRef(new Animated.Value(0)).current;

  const audioPulse =
    useRef(new Animated.Value(1)).current;

  const progressAnimation =
    useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.parallel([

      Animated.timing(
        fadeAnimation,
        {
          toValue: 1,
          duration: 420,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        },
      ),

      Animated.spring(
        scaleAnimation,
        {
          toValue: 1,
          friction: 7,
          tension: 55,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        translateAnimation,
        {
          toValue: 0,
          duration: 420,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        },
      ),

      Animated.spring(
        titleAnimation,
        {
          toValue: 1,
          friction: 7,
          tension: 50,
          useNativeDriver: true,
        },
      ),

      Animated.spring(
        progressAnimation,
        {
          toValue:
            cards.length > 0
              ? (currentCard + 1) / cards.length
              : 0,
          friction: 8,
          tension: 50,
          useNativeDriver: false,
        },
      ),

    ]).start();

    setAudioPlaying(false);
    setVideoPlaying(false);

  }, [
    currentCard,
    cards.length,
  ]);

  useEffect(() => {

    Animated.loop(

      Animated.sequence([

        Animated.timing(
          decorativeAnimation,
          {
            toValue: 1,
            duration: 2800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          decorativeAnimation,
          {
            toValue: 0,
            duration: 2800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          },
        ),

      ],

      ),

    ).start();

  }, []);

  useEffect(() => {

    if (!audioPlaying) {
      audioPulse.setValue(1);
      return;
    }

    Animated.loop(

      Animated.sequence([

        Animated.timing(
          audioPulse,
          {
            toValue: 1.08,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          audioPulse,
          {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          },
        ),

      ],

      ),

    ).start();

  }, [audioPlaying]);

  if (!card) {

    return (

      <LinearGradient
        colors={[
          '#E0F2FE',
          '#ECFDF5',
        ]}
        style={styles.errorContainer}
      >

        <View style={styles.errorCard}>

          <View style={styles.errorIcon}>

            <View
              style={styles.errorIconLine}
            />

            <View
              style={styles.errorIconDot}
            />

          </View>

          <Text style={styles.errorTitle}>
            Contenido no disponible
          </Text>

          <Text style={styles.errorText}>
            No encontramos el contenido de esta
            lección.
          </Text>

          <TouchableOpacity
            style={styles.errorButton}
            onPress={onComplete}
            activeOpacity={0.85}
          >

            <Text style={styles.errorButtonText}>
              CONTINUAR
            </Text>

          </TouchableOpacity>

        </View>

      </LinearGradient>
    );
  }

  const isFirstCard =
    currentCard === 0;

  const isLastCard =
    currentCard === cards.length - 1;

  let gradientColors: string[];

  if (currentCard === 0) {

    gradientColors = [
      '#D9F7E8',
      '#FFF4CC',
      '#E0F2FE',
    ];

  } else if (currentCard === 1) {

    gradientColors = [
      '#FFF4CC',
      '#FFE4C7',
      '#EDE9FE',
    ];

  } else {

    gradientColors = [
      '#E0F2FE',
      '#EDE9FE',
      '#DCFCE7',
    ];
  }

  function animarBoton() {

    Animated.sequence([

      Animated.spring(
        buttonScale,
        {
          toValue: 0.94,
          friction: 6,
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
  }

  function siguiente() {

    animarBoton();

    if (!isLastCard) {

      setCurrentCard(
        currentCard + 1,
      );

      return;
    }

    onComplete();
  }

  function anterior() {

    animarBoton();

    if (!isFirstCard) {

      setCurrentCard(
        currentCard - 1,
      );

      return;
    }
  }

  function reproducirAudio() {

    setAudioPlaying(true);
  }

  function alternarVideo() {

    setVideoPlaying(
      estado => !estado,
    );
  }

  const titleTranslate =
    titleAnimation.interpolate({

      inputRange: [0, 1],

      outputRange: [
        -20,
        0,
      ],

    });

  const decorativeTranslate =
    decorativeAnimation.interpolate({

      inputRange: [0, 1],

      outputRange: [
        -10,
        10,
      ],

    });

  const progressWidth =
    progressAnimation.interpolate({

      inputRange: [0, 1],

      outputRange: [
        '0%',
        '100%',
      ],

    });

  return (

    <LinearGradient
      colors={gradientColors}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
      style={styles.container}
    >

      <View
        pointerEvents="none"
        style={styles.decorations}
      >

        <Animated.View
          style={[
            styles.decorativeCircle,
            styles.decorativeCircleOne,
            {
              transform: [
                {
                  translateY:
                    decorativeTranslate,
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.decorativeCircle,
            styles.decorativeCircleTwo,
            {
              transform: [
                {
                  translateY:
                    decorativeTranslate,
                },
              ],
            },
          ]}
        />

        <View
          style={[
            styles.decorativeSquare,
            styles.decorativeSquareOne,
          ]}
        />

        <View
          style={[
            styles.decorativeSquare,
            styles.decorativeSquareTwo,
          ]}
        />

      </View>

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backTopButton}
          onPress={anterior}
          activeOpacity={0.8}
          disabled={isFirstCard}
        >

          <Text
            style={[
              styles.backTopText,
              isFirstCard &&
                styles.backTopDisabled,
            ]}
          >
            ATRÁS
          </Text>

        </TouchableOpacity>

        <Animated.View
          style={[
            styles.headerContent,
            {
              opacity:
                titleAnimation,

              transform: [
                {
                  translateY:
                    titleTranslate,
                },
              ],
            },
          ]}
        >

          <View style={styles.lessonBadge}>

            <Text style={styles.lessonBadgeText}>
              APRENDAMOS
            </Text>

          </View>

          <Text style={styles.level}>
            NIVEL {lesson.level}
          </Text>

          <Text style={styles.title}>
            {lesson.title}
          </Text>

        </Animated.View>

      </View>

      <View style={styles.progressArea}>

        <View style={styles.progressHeader}>

          <Text style={styles.progressLabel}>
            PASO {currentCard + 1}
          </Text>

          <Text style={styles.progressNumber}>
            {currentCard + 1} / {cards.length}
          </Text>

        </View>

        <View style={styles.progressTrack}>

          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressWidth,
              },
            ]}
          />

        </View>

      </View>

      <Animated.View
        style={[
          styles.card,
          {
            opacity:
              fadeAnimation,

            transform: [
              {
                scale:
                  scaleAnimation,
              },
              {
                translateY:
                  translateAnimation,
              },
            ],
          },
        ]}
      >

        <View style={styles.cardHeader}>

          <View style={styles.stepIndicator}>

            <Text style={styles.stepNumber}>
              {currentCard + 1}
            </Text>

          </View>

          <View style={styles.cardHeaderText}>

            <Text style={styles.cardTitle}>
              {card.title}
            </Text>

            {card.description ? (

              <Text style={styles.description}>
                {card.description}
              </Text>

            ) : null}

          </View>

        </View>

        {currentCard === 0 && (

          <View style={styles.contentArea}>

            <View style={styles.wordIntro}>

              <Text style={styles.wordLabel}>
                EN ESPAÑOL
              </Text>

              <Text style={styles.spanishWord}>
                Hola
              </Text>

            </View>

            <View style={styles.connectionLine} />

            <View style={styles.wordTarget}>

              <Text style={styles.wordLabel}>
                EN CHINO
              </Text>

              <Text style={styles.chineseWord}>
                你好
              </Text>

            </View>

            <View style={styles.videoFrame}>

              <Video
                key={`intro-${card.id}`}
                source={
                  card.media?.source ??
                  lesson.video
                }
                style={styles.video}
                resizeMode="contain"
                controls
                paused={false}
                repeat
                playInBackground={false}
                playWhenInactive={false}
                ignoreSilentSwitch="ignore"
                onError={error => {
                  console.log(
                    'Error del video:',
                    error,
                  );
                }}
              />

              <View
                style={styles.videoLabel}
              >

                <Text
                  style={styles.videoLabelText}
                >
                  OBSERVA Y APRENDE
                </Text>

              </View>

            </View>

          </View>

        )}

        {currentCard === 1 && (

          <View style={styles.contentArea}>

            <View style={styles.pronunciationHeader}>

              <Text
                style={styles.wordLabel}
              >
                PALABRA
              </Text>

              <Text style={styles.chineseWord}>
                你好
              </Text>

              <Text
                style={styles.pronunciation}
              >
                Nǐ hǎo
              </Text>

            </View>

            <View style={styles.audioPanel}>

              <Animated.View
                style={[
                  styles.audioOuter,
                  {
                    transform: [
                      {
                        scale:
                          audioPulse,
                      },
                    ],
                  },
                ]}
              >

                <TouchableOpacity
                  style={styles.audioButton}
                  activeOpacity={0.85}
                  onPress={
                    reproducirAudio
                  }
                >

                  <View
                    style={
                      styles.audioButtonCircle
                    }
                  >

                    <View
                      style={
                        styles.playTriangle
                      }
                    />

                  </View>

                  <Text
                    style={
                      styles.audioButtonText
                    }
                  >
                    {audioPlaying
                      ? 'REPRODUCIENDO'
                      : 'ESCUCHAR'}
                  </Text>

                </TouchableOpacity>

              </Animated.View>

              <Video
                key={`audio-${card.id}`}
                source={
                  card.audio ??
                  card.media?.source
                }
                paused={!audioPlaying}
                playInBackground={false}
                playWhenInactive={false}
                onEnd={() =>
                  setAudioPlaying(false)
                }
                onError={error => {

                  console.log(
                    'Error reproduciendo audio:',
                    error,
                  );

                  setAudioPlaying(false);
                }}
                style={styles.hiddenAudio}
              />

              <Text
                style={styles.audioMainText}
              >
                Escucha y repite
              </Text>

              <Text
                style={styles.audioSecondaryText}
              >
                Escucha con atención y repite
                después del audio.
              </Text>

            </View>

          </View>

        )}

        {currentCard === 2 && (

          <View style={styles.contentArea}>

            <View style={styles.writingHeader}>

              <Text style={styles.wordLabel}>
                ASÍ SE ESCRIBE
              </Text>

              <Text style={styles.spanishWord}>
                Hola
              </Text>

              <View style={styles.writingDivider} />

              <Text style={styles.chineseWriting}>
                你好
              </Text>

              <Text style={styles.pronunciation}>
                Nǐ hǎo
              </Text>

            </View>

            <View style={styles.videoFrameWriting}>

              <Video
                key={`writing-${card.id}`}
                source={
                  card.media?.source ??
                  require('../../assets/videos/escritura_hola_chino.mp4')
                }
                style={styles.writingVideo}
                resizeMode="contain"
                controls
                paused={!videoPlaying}
                repeat={false}
                playInBackground={false}
                playWhenInactive={false}
                ignoreSilentSwitch="ignore"
                onEnd={() =>
                  setVideoPlaying(false)
                }
                onError={error => {

                  console.log(
                    'Error del video de escritura:',
                    error,
                  );

                  setVideoPlaying(false);
                }}
              />

              {!videoPlaying && (

                <TouchableOpacity
                  style={styles.videoPlayOverlay}
                  onPress={
                    alternarVideo
                  }
                  activeOpacity={0.85}
                >

                  <View
                    style={
                      styles.videoPlayCircle
                    }
                  >

                    <View
                      style={
                        styles.playTriangleLarge
                      }
                    />

                  </View>

                  <Text
                    style={
                      styles.videoPlayText
                    }
                  >
                    VER CÓMO SE ESCRIBE
                  </Text>

                </TouchableOpacity>

              )}

            </View>

          </View>

        )}

      </Animated.View>

      <View style={styles.navigation}>

        <TouchableOpacity
          style={[
            styles.previousButton,
            isFirstCard &&
              styles.previousButtonDisabled,
          ]}
          activeOpacity={0.8}
          onPress={anterior}
          disabled={isFirstCard}
        >

          <Text
            style={[
              styles.previousButtonText,
              isFirstCard &&
                styles.previousButtonTextDisabled,
            ]}
          >
            ANTERIOR
          </Text>

        </TouchableOpacity>

        <Animated.View
          style={[
            styles.nextButtonWrapper,
            {
              transform: [
                {
                  scale:
                    buttonScale,
                },
              ],
            },
          ]}
        >

          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.85}
            onPress={siguiente}
          >

            <Text style={styles.nextButtonText}>
              {isLastCard
                ? 'IR AL JUEGO'
                : 'CONTINUAR'}
            </Text>

            <View style={styles.nextArrow}>

              <View
                style={styles.arrowLine}
              />

              <View
                style={styles.arrowHead}
              />

            </View>

          </TouchableOpacity>

        </Animated.View>

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 14,
  },

  decorations: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },

  decorativeCircle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.25,
  },

  decorativeCircleOne: {
    width: 190,
    height: 190,
    backgroundColor: '#FFFFFF',
    top: -70,
    right: -60,
  },

  decorativeCircleTwo: {
    width: 160,
    height: 160,
    backgroundColor: '#FFFFFF',
    bottom: -50,
    left: -70,
  },

  decorativeSquare: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    opacity: 0.22,
  },

  decorativeSquareOne: {
    top: 170,
    left: 12,
    transform: [
      {
        rotate: '18deg',
      },
    ],
  },

  decorativeSquareTwo: {
    bottom: 210,
    right: 15,
    transform: [
      {
        rotate: '30deg',
      },
    ],
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 82,
  },

  backTopButton: {
    width: 70,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  backTopText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#475569',
    letterSpacing: 0.8,
  },

  backTopDisabled: {
    opacity: 0.3,
  },

  headerContent: {
    flex: 1,
    alignItems: 'center',
    marginRight: 70,
  },

  lessonBadge: {
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },

  lessonBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#047857',
    letterSpacing: 1.5,
  },

  level: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: '900',
    color: '#64748B',
    letterSpacing: 1.5,
  },

  title: {
    marginTop: 2,
    fontSize: 22,
    fontWeight: '900',
    color: '#1F2937',
    textAlign: 'center',
  },

  progressArea: {
    marginTop: 8,
    marginBottom: 12,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  progressLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#64748B',
    letterSpacing: 1.2,
  },

  progressNumber: {
    fontSize: 11,
    fontWeight: '900',
    color: '#047857',
  },

  progressTrack: {
    width: '100%',
    height: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#00A078',
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 18,
    elevation: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  stepIndicator: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#E6FFFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  stepNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: '#00856F',
  },

  cardHeaderText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#1F2937',
  },

  description: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    color: '#64748B',
  },

  contentArea: {
    flex: 1,
    justifyContent: 'center',
  },

  wordIntro: {
    alignItems: 'center',
  },

  wordLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94A3B8',
    letterSpacing: 1.7,
  },

  spanishWord: {
    marginTop: 4,
    fontSize: 30,
    fontWeight: '900',
    color: '#334155',
    textAlign: 'center',
  },

  connectionLine: {
    alignSelf: 'center',
    width: 65,
    height: 3,
    borderRadius: 5,
    backgroundColor: '#34D399',
    marginVertical: 8,
  },

  wordTarget: {
    alignItems: 'center',
  },

  chineseWord: {
    marginTop: 3,
    fontSize: 56,
    fontWeight: '900',
    color: '#00856F',
    textAlign: 'center',
  },

  videoFrame: {
    width: '100%',
    height: 205,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },

  video: {
    width: '100%',
    height: '100%',
  },

  videoLabel: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'rgba(15,23,42,0.72)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  videoLabelText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  pronunciationHeader: {
    alignItems: 'center',
  },

  pronunciation: {
    marginTop: 5,
    fontSize: 21,
    fontWeight: '700',
    color: '#64748B',
  },

  audioPanel: {
    marginTop: 18,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },

  audioOuter: {
    borderRadius: 50,
  },

  audioButton: {
    width: 205,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#00A078',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
  },

  audioButtonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  playTriangle: {
    marginLeft: 3,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#00856F',
  },

  audioButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },

  hiddenAudio: {
    width: 1,
    height: 1,
    opacity: 0,
    position: 'absolute',
  },

  audioMainText: {
    marginTop: 17,
    fontSize: 18,
    fontWeight: '900',
    color: '#334155',
  },

  audioSecondaryText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    color: '#64748B',
  },

  writingHeader: {
    alignItems: 'center',
  },

  writingDivider: {
    width: 55,
    height: 3,
    borderRadius: 4,
    backgroundColor: '#34D399',
    marginVertical: 7,
  },

  chineseWriting: {
    fontSize: 64,
    fontWeight: '900',
    color: '#00856F',
  },

  videoFrameWriting: {
    width: '100%',
    height: 220,
    marginTop: 12,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },

  writingVideo: {
    width: '100%',
    height: '100%',
  },

  videoPlayOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15,23,42,0.25)',
  },

  videoPlayCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  playTriangleLarge: {
    marginLeft: 5,
    width: 0,
    height: 0,
    borderTopWidth: 13,
    borderBottomWidth: 13,
    borderLeftWidth: 19,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#00856F',
  },

  videoPlayText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },

  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  previousButton: {
    height: 56,
    paddingHorizontal: 19,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginRight: 9,
  },

  previousButtonDisabled: {
    opacity: 0.35,
  },

  previousButtonText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#475569',
    letterSpacing: 0.8,
  },

  previousButtonTextDisabled: {
    color: '#94A3B8',
  },

  nextButtonWrapper: {
    flex: 1,
  },

  nextButton: {
    height: 58,
    borderRadius: 29,
    backgroundColor: '#00A078',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  nextArrow: {
    width: 24,
    height: 18,
    marginLeft: 9,
    justifyContent: 'center',
  },

  arrowLine: {
    position: 'absolute',
    left: 0,
    top: 7,
    width: 18,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },

  arrowHead: {
    position: 'absolute',
    right: 0,
    top: 3,
    width: 9,
    height: 9,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#FFFFFF',
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  errorCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
  },

  errorIcon: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorIconLine: {
    width: 30,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#DC2626',
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },

  errorIconDot: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#DC2626',
  },

  errorTitle: {
    marginTop: 15,
    fontSize: 23,
    fontWeight: '900',
    color: '#1F2937',
  },

  errorText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    color: '#64748B',
  },

  errorButton: {
    marginTop: 20,
    width: '100%',
    height: 55,
    borderRadius: 28,
    backgroundColor: '#00A078',
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

});