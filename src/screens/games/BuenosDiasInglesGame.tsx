import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  Easing,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Video from 'react-native-video';

import {useDispatch} from 'react-redux';

import {unlockNextLevel} from '../../store/slices/studentSlice';

interface Props {
  navigation: any;
  route?: any;
}


const OPCIONES = [
  {
    id: 1,
    word: 'Video 1',
    video: require('../../assets/videos/buenos_dias.mp4'),
    correct: true,
  },
  {
    id: 2,
    word: 'Video 2',
    video: require('../../assets/videos/buenas_noches.mp4'),
    correct: false,
  },
];

const MAX_ATTEMPTS = 2;

const STARS_BY_ATTEMPT: Record<number, number> = {
  1: 3,
  2: 2,
};

const REWARD = {
  characterId: 2,
  name: 'Benjamín Zeledón',
  image: require('../../assets/images/benjamin.png'),
  description:
    '¡Has desbloqueado a Benjamín Zeledón! Ahora forma parte de tu colección de héroes de Nicaragua.',
};


export default function BuenosDiasInglesGame({
  navigation,
}: Props) {
  const dispatch = useDispatch();


  const [visibleOptions, setVisibleOptions] =
    useState(OPCIONES);

  const [attempt, setAttempt] =
    useState(1);

  const [locked, setLocked] =
    useState(false);

  const [stars, setStars] =
    useState(0);

  const [playingId, setPlayingId] =
    useState<number | null>(null);

  const [modal, setModal] =
    useState<
      'stars' |
      'reward' |
      'collection' |
      null
    >(null);


  const bubbleOne =
    useRef(
      new Animated.Value(0),
    ).current;

  const bubbleTwo =
    useRef(
      new Animated.Value(0),
    ).current;

  const bubbleThree =
    useRef(
      new Animated.Value(0),
    ).current;

  const modalScale =
    useRef(
      new Animated.Value(0.8),
    ).current;

  const modalOpacity =
    useRef(
      new Animated.Value(0),
    ).current;


  const starScale =
    useRef(
      new Animated.Value(0.5),
    ).current;


  const optionAnimations =
    useRef<
      Record<
        number,
        {
          scale: Animated.Value;
          opacity: Animated.Value;
          translateX: Animated.Value;
        }
      >
    >({}).current;

  function getOptionAnimation(id: number) {
    if (!optionAnimations[id]) {
      optionAnimations[id] = {
        scale: new Animated.Value(1),
        opacity: new Animated.Value(1),
        translateX: new Animated.Value(0),
      };
    }

    return optionAnimations[id];
  }


  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          bubbleOne,
          {
            toValue: 1,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          bubbleOne,
          {
            toValue: 0,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          },
        ),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          bubbleTwo,
          {
            toValue: 1,
            duration: 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          bubbleTwo,
          {
            toValue: 0,
            duration: 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          },
        ),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          bubbleThree,
          {
            toValue: 1,
            duration: 4500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          bubbleThree,
          {
            toValue: 0,
            duration: 4500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          },
        ),
      ]),
    ).start();
  }, []);


  useEffect(() => {
    if (modal) {
      modalScale.setValue(0.8);
      modalOpacity.setValue(0);

      Animated.parallel([
        Animated.spring(
          modalScale,
          {
            toValue: 1,
            friction: 7,
            tension: 55,
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          modalOpacity,
          {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          },
        ),
      ]).start();
    }
  }, [modal]);


  useEffect(() => {
    if (stars > 0) {
      starScale.setValue(0.5);

      Animated.spring(
        starScale,
        {
          toValue: 1,
          friction: 5,
          tension: 60,
          useNativeDriver: true,
        },
      ).start();
    }
  }, [stars]);


  function seleccionarOpcion(option: any) {
    if (locked) {
      return;
    }

    setLocked(true);
    setPlayingId(null);

    const animation =
      getOptionAnimation(option.id);


    if (option.correct) {
      const starsEarned =
        STARS_BY_ATTEMPT[attempt] ?? 1;

      setStars(starsEarned);

      Animated.parallel([
        Animated.spring(
          animation.scale,
          {
            toValue: 1.08,
            friction: 4,
            tension: 60,
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          animation.opacity,
          {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          },
        ),
      ]).start();

      setTimeout(() => {
        setModal('stars');
      }, 450);

      return;
    }


    Animated.parallel([
      Animated.timing(
        animation.translateX,
        {
          toValue: 35,
          duration: 120,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        animation.opacity,
        {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        animation.scale,
        {
          toValue: 0.85,
          duration: 300,
          useNativeDriver: true,
        },
      ),
    ]).start(() => {
      setVisibleOptions(
        current =>
          current.filter(
            item =>
              item.id !== option.id,
          ),
      );


      if (attempt < MAX_ATTEMPTS) {
        setAttempt(
          current => current + 1,
        );

        setLocked(false);

        return;
      }


      setStars(0);

      setTimeout(() => {
        setModal('stars');
      }, 300);
    });
  }

  function reiniciarJuego() {
    setVisibleOptions(OPCIONES);

    setAttempt(1);

    setStars(0);

    setPlayingId(null);

    setLocked(false);

    setModal(null);

    Object.keys(optionAnimations).forEach(
      key => {
        const animation =
          optionAnimations[
            Number(key)
          ];

        animation.scale.setValue(1);
        animation.opacity.setValue(1);
        animation.translateX.setValue(0);
      },
    );
  }


  function aceptarEstrellas() {
    setModal(null);

    if (stars > 0) {
      setTimeout(() => {
        setModal('reward');
      }, 250);

      return;
    }

    reiniciarJuego();
  }


  function volverMapa() {
    setModal(null);

    dispatch(
      unlockNextLevel(2),
    );

    navigation.navigate(
      'Levels',
    );
  }


  function verColeccion() {
    setModal('collection');
  }


  function cerrarColeccion() {
    setModal('reward');
  }


  const bubbleOneTranslate =
    bubbleOne.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 18],
    });

  const bubbleTwoTranslate =
    bubbleTwo.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -20],
    });

  const bubbleThreeTranslate =
    bubbleThree.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 15],
    });


  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#DFF7FF"
      />

      <LinearGradient
        colors={[
          '#DFF7FF',
          '#E7E4FF',
          '#FFF3D6',
        ]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.background}
      >

        <SafeAreaView
          style={styles.container}
        >

          {}

          <View
            pointerEvents="none"
            style={styles.decorations}
          >

            <Animated.View
              style={[
                styles.bubble,
                styles.bubbleOne,
                {
                  transform: [
                    {
                      translateY:
                        bubbleOneTranslate,
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.bubble,
                styles.bubbleTwo,
                {
                  transform: [
                    {
                      translateY:
                        bubbleTwoTranslate,
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.bubble,
                styles.bubbleThree,
                {
                  transform: [
                    {
                      translateY:
                        bubbleThreeTranslate,
                    },
                  ],
                },
              ]}
            />

            <Text
              style={[
                styles.backgroundStar,
                styles.backgroundStarOne,
              ]}
            >
              ✦
            </Text>

            <Text
              style={[
                styles.backgroundStar,
                styles.backgroundStarTwo,
              ]}
            >
              ✦
            </Text>

            <Text
              style={[
                styles.backgroundStar,
                styles.backgroundStarThree,
              ]}
            >
              •
            </Text>

          </View>

          {}

          <View
            style={styles.header}
          >

            <View
              style={styles.challengeBadge}
            >
              <Text
                style={styles.challengeBadgeText}
              >
                ⭐ DESAFÍO
              </Text>
            </View>

            <Text
              style={styles.questionSmall}
            >
              BUSCA ESTA EXPRESIÓN
            </Text>

            <Text
              style={styles.targetWord}
            >
              GOOD MORNING
            </Text>

            <Text
              style={styles.questionHelp}
            >
              Toca el video que representa
              {'\n'}
              esta expresión.
            </Text>

          </View>

          {}

          <View
            style={styles.attemptContainer}
          >

            <Text
              style={styles.attemptText}
            >
              INTENTO {attempt} DE {MAX_ATTEMPTS}
            </Text>

            <View
              style={styles.attemptDots}
            >

              {Array.from(
                {
                  length:
                    MAX_ATTEMPTS,
                },
              ).map(
                (_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.attemptDot,
                      index + 1 <=
                        attempt &&
                        styles.attemptDotActive,
                    ]}
                  />
                ),
              )}

            </View>

          </View>

          {}

          <View
            style={styles.optionsContainer}
          >

            {visibleOptions.map(
              option => {
                const animation =
                  getOptionAnimation(
                    option.id,
                  );

                return (
                  <Animated.View
                    key={option.id}
                    style={[
                      styles.optionWrapper,
                      {
                        opacity:
                          animation.opacity,

                        transform: [
                          {
                            scale:
                              animation.scale,
                          },
                          {
                            translateX:
                              animation.translateX,
                          },
                        ],
                      },
                    ]}
                  >

                    <Pressable
                      disabled={locked}
                      onPress={() =>
                        seleccionarOpcion(
                          option,
                        )
                      }
                      style={({pressed}) => [
                        styles.optionCard,

                        pressed &&
                          styles.optionPressed,
                      ]}
                    >

                      {}

                      <View
                        style={
                          styles.videoContainer
                        }
                      >

                        <Video
                          source={
                            option.video
                          }
                          paused={
                            playingId !==
                            option.id
                          }
                          controls={false}
                          repeat={false}
                          resizeMode="contain"
                          onEnd={() =>
                            setPlayingId(
                              null,
                            )
                          }
                          onError={() =>
                            setPlayingId(
                              null,
                            )
                          }
                          style={
                            styles.video
                          }
                        />

                        {playingId !==
                          option.id && (
                          <View
                            style={
                              styles.playOverlay
                            }
                          >
                            <Text
                              style={
                                styles.playIcon
                              }
                            >
                              ▶
                            </Text>
                          </View>
                        )}

                      </View>

                      {}

                      <Text
                        style={styles.optionWord}
                      >
                        {option.word}
                      </Text>

                      {}

                      <TouchableOpacity
                        style={
                          styles.watchButton
                        }
                        disabled={locked}
                        onPress={() =>
                          setPlayingId(
                            playingId ===
                              option.id
                              ? null
                              : option.id,
                          )
                        }
                        activeOpacity={0.8}
                      >

                        <Text
                          style={
                            styles.watchButtonText
                          }
                        >
                          {playingId ===
                          option.id
                            ? 'PAUSAR'
                            : 'VER VIDEO'}
                        </Text>

                      </TouchableOpacity>

                    </Pressable>

                  </Animated.View>
                );
              },
            )}

          </View>

          {}

          <View
            style={styles.helpBox}
          >

            <Text
              style={styles.helpIcon}
            >
              💡
            </Text>

            <Text
              style={styles.helpText}
            >
              Observa con atención y elige
              el video correcto.
            </Text>

          </View>

        </SafeAreaView>

        {}

        <Modal
          visible={
            modal === 'stars'
          }
          transparent
          animationType="none"
          onRequestClose={() =>
            setModal(null)
          }
        >

          <View
            style={styles.modalOverlay}
          >

            <Animated.View
              style={[
                styles.modalCard,
                {
                  opacity:
                    modalOpacity,

                  transform: [
                    {
                      scale:
                        modalScale,
                    },
                  ],
                },
              ]}
            >

              {stars > 0 ? (
                <>
                  <Text
                    style={
                      styles.successEmoji
                    }
                  >
                    🎉
                  </Text>

                  <Text
                    style={
                      styles.modalTitle
                    }
                  >
                    ¡Muy bien!
                  </Text>

                  <Text
                    style={
                      styles.modalSubtitle
                    }
                  >
                    ¡Encontraste
                    {' '}
                    <Text
                      style={
                        styles.modalStrong
                      }
                    >
                      GOOD MORNING
                    </Text>
                    !
                  </Text>

                  <Animated.View
                    style={[
                      styles.starsContainer,
                      {
                        transform: [
                          {
                            scale:
                              starScale,
                          },
                        ],
                      },
                    ]}
                  >

                    {[1, 2, 3].map(
                      star => (
                        <Text
                          key={star}
                          style={[
                            styles.star,
                            star >
                              stars &&
                              styles.emptyStar,
                          ]}
                        >
                          {star <=
                          stars
                            ? '⭐'
                            : '☆'}
                        </Text>
                      ),
                    )}

                  </Animated.View>

                  <Text
                    style={
                      styles.starsMessage
                    }
                  >
                    {stars === 3
                      ? '¡Excelente trabajo!'
                      : '¡Muy bien! Sigue aprendiendo.'}
                  </Text>

                </>
              ) : (
                <>
                  <Text
                    style={
                      styles.tryEmoji
                    }
                  >
                    💪
                  </Text>

                  <Text
                    style={
                      styles.modalTitle
                    }
                  >
                    ¡Sigamos practicando!
                  </Text>

                  <Text
                    style={
                      styles.modalSubtitle
                    }
                  >
                    No pasa nada.
                    {'\n'}
                    Vamos a intentarlo otra vez.
                  </Text>
                </>
              )}

              <TouchableOpacity
                style={
                  styles.modalButton
                }
                onPress={
                  aceptarEstrellas
                }
                activeOpacity={0.85}
              >

                <Text
                  style={
                    styles.modalButtonText
                  }
                >
                  {stars > 0
                    ? 'ACEPTAR'
                    : 'INTENTAR DE NUEVO'}
                </Text>

              </TouchableOpacity>

            </Animated.View>

          </View>

        </Modal>

        {}

        <Modal
          visible={
            modal === 'reward'
          }
          transparent
          animationType="none"
          onRequestClose={() =>
            setModal(null)
          }
        >

          <View
            style={styles.modalOverlay}
          >

            <Animated.View
              style={[
                styles.modalCard,
                styles.rewardCard,
                {
                  opacity:
                    modalOpacity,

                  transform: [
                    {
                      scale:
                        modalScale,
                    },
                  ],
                },
              ]}
            >

              <Text
                style={
                  styles.rewardEmoji
                }
              >
                🏆
              </Text>

              <Text
                style={
                  styles.modalTitle
                }
              >
                ¡NUEVO HÉROE!
              </Text>

              <Image
                source={
                  REWARD.image
                }
                style={
                  styles.rewardImage
                }
                resizeMode="contain"
              />

              <Text
                style={
                  styles.rewardName
                }
              >
                {REWARD.name}
              </Text>

              <Text
                style={
                  styles.rewardDescription
                }
              >
                {REWARD.description}
              </Text>

              <TouchableOpacity
                style={
                  styles.modalButton
                }
                onPress={
                  volverMapa
                }
                activeOpacity={0.85}
              >

                <Text
                  style={
                    styles.modalButtonText
                  }
                >
                  VOLVER AL MAPA
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.collectionButton
                }
                onPress={
                  verColeccion
                }
                activeOpacity={0.85}
              >

                <Text
                  style={
                    styles.collectionButtonText
                  }
                >
                  VER HÉROES COLECCIONADOS
                </Text>

              </TouchableOpacity>

            </Animated.View>

          </View>

        </Modal>

        {}

        <Modal
          visible={
            modal === 'collection'
          }
          transparent
          animationType="none"
          onRequestClose={
            cerrarColeccion
          }
        >

          <View
            style={styles.modalOverlay}
          >

            <Animated.View
              style={[
                styles.modalCard,
                styles.collectionCard,
                {
                  opacity:
                    modalOpacity,

                  transform: [
                    {
                      scale:
                        modalScale,
                    },
                  ],
                },
              ]}
            >

              <Text
                style={
                  styles.collectionEmoji
                }
              >
                🦸
              </Text>

              <Text
                style={
                  styles.modalTitle
                }
              >
                HÉROES COLECCIONADOS
              </Text>

              <View
                style={
                  styles.heroItem
                }
              >

                <Image
                  source={
                    REWARD.image
                  }
                  style={
                    styles.collectionImage
                  }
                  resizeMode="contain"
                />

                <Text
                  style={
                    styles.collectionName
                  }
                >
                  {REWARD.name}
                </Text>

                <Text
                  style={
                    styles.collectionDescription
                  }
                >
                  Héroe desbloqueado
                </Text>

              </View>

              <TouchableOpacity
                style={
                  styles.modalButton
                }
                onPress={
                  volverMapa
                }
                activeOpacity={0.85}
              >

                <Text
                  style={
                    styles.modalButtonText
                  }
                >
                  VOLVER AL MAPA
                </Text>

              </TouchableOpacity>

            </Animated.View>

          </View>

        </Modal>

      </LinearGradient>
    </>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },


  decorations: {
...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },

  bubble: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.22,
  },

  bubbleOne: {
    width: 170,
    height: 170,
    backgroundColor: '#A5F3FC',
    top: 20,
    left: -60,
  },

  bubbleTwo: {
    width: 210,
    height: 210,
    backgroundColor: '#C4B5FD',
    top: 250,
    right: -90,
  },

  bubbleThree: {
    width: 150,
    height: 150,
    backgroundColor: '#FDE68A',
    bottom: -30,
    left: -40,
  },

  backgroundStar: {
    position: 'absolute',
    color: '#FFFFFF',
    opacity: 0.75,
    fontWeight: '900',
  },

  backgroundStarOne: {
    top: 90,
    right: 35,
    fontSize: 30,
  },

  backgroundStarTwo: {
    top: 330,
    left: 25,
    fontSize: 22,
  },

  backgroundStarThree: {
    bottom: 80,
    right: 45,
    fontSize: 35,
  },


  header: {
    alignItems: 'center',
    paddingTop: 18,
  },

  challengeBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 22,
    elevation: 4,
  },

  challengeBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  questionSmall: {
    marginTop: 18,
    fontSize: 15,
    color: '#475569',
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },

  targetWord: {
    marginTop: 5,
    fontSize: 32,
    color: '#4338CA',
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },

  questionHelp: {
    marginTop: 7,
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '600',
  },


  attemptContainer: {
    alignItems: 'center',
    marginTop: 14,
  },

  attemptText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.7,
  },

  attemptDots: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },

  attemptDot: {
    width: 30,
    height: 7,
    borderRadius: 10,
    backgroundColor: '#CBD5E1',
  },

  attemptDotActive: {
    backgroundColor: '#6366F1',
  },


  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 18,
  },

  optionWrapper: {
    width: '100%',
  },

  optionCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 12,
    elevation: 6,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  optionPressed: {
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  videoContainer: {
    width: '100%',
    height: 145,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },

  video: {
    width: '100%',
    height: '100%',
  },

  playOverlay: {
  ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.18)',
  },

  playIcon: {
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: 'rgba(99, 102, 241, 0.92)',
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
    paddingLeft: 4,
    overflow: 'hidden',
  },

  optionWord: {
    marginTop: 10,
    textAlign: 'center',
    color: '#334155',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  watchButton: {
    marginTop: 10,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  watchButtonText: {
    color: '#4338CA',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },


  helpBox: {
    minHeight: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.82)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginBottom: 10,
    elevation: 3,
  },

  helpIcon: {
    fontSize: 23,
    marginRight: 9,
  },

  helpText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.48)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
  },

  modalCard: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    elevation: 12,
  },

  rewardCard: {
    paddingTop: 20,
  },

  collectionCard: {
    paddingTop: 22,
  },

  successEmoji: {
    fontSize: 55,
  },

  tryEmoji: {
    fontSize: 58,
    marginBottom: 8,
  },

  modalTitle: {
    marginTop: 7,
    fontSize: 25,
    fontWeight: '900',
    color: '#334155',
    textAlign: 'center',
  },

  modalSubtitle: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 23,
    color: '#64748B',
    textAlign: 'center',
  },

  modalStrong: {
    color: '#4338CA',
    fontWeight: '900',
  },

  starsContainer: {
    flexDirection: 'row',
    marginTop: 17,
    alignItems: 'center',
  },

  star: {
    fontSize: 42,
    marginHorizontal: 3,
  },

  emptyStar: {
    opacity: 0.25,
  },

  starsMessage: {
    marginTop: 10,
    color: '#64748B',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },

  modalButton: {
    width: '100%',
    height: 55,
    borderRadius: 28,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    elevation: 5,
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  rewardEmoji: {
    fontSize: 40,
  },

  rewardImage: {
    width: 190,
    height: 210,
    marginTop: 5,
  },

  rewardName: {
    marginTop: 0,
    fontSize: 25,
    fontWeight: '900',
    color: '#4338CA',
    textAlign: 'center',
  },

  rewardDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
    textAlign: 'center',
  },

  collectionButton: {
    width: '100%',
    minHeight: 50,
    borderRadius: 25,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  collectionButtonText: {
    color: '#4338CA',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
  },

  collectionEmoji: {
    fontSize: 45,
  },

  heroItem: {
    width: '100%',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },

  collectionImage: {
    width: 160,
    height: 170,
  },

  collectionName: {
    marginTop: 5,
    fontSize: 23,
    fontWeight: '900',
    color: '#334155',
  },

  collectionDescription: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748B',
  },
});