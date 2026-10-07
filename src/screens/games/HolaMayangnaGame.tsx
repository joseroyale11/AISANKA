// Esta pantalla contiene el juego de memoria de PARASTH. Controla las tarjetas, los intentos, el cálculo de estrellas, la ventana de recompensa y el desbloqueo del héroe antes de regresar al mapa.

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  Easing,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {Lesson} from '../../types/Lesson';

type GameCard = {
  id: number;
  word: string;
  isTarget: boolean;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function HolaMayangnaGame({
  route,
  navigation,
}: any) {
  const lesson =
    route.params?.lesson as Lesson | undefined;

  const reward = lesson?.reward;

  const [cards, setCards] = useState<GameCard[]>([]);

  const [firstCard, setFirstCard] =
    useState<number | null>(null);

  const [secondCard, setSecondCard] =
    useState<number | null>(null);

  const [attempts, setAttempts] =
    useState(0);

  const [matchedPairs, setMatchedPairs] =
    useState(0);

  const [isChecking, setIsChecking] =
    useState(false);

  const [showStars, setShowStars] =
    useState(false);

  const [showHero, setShowHero] =
    useState(false);

  const entrance =
    useRef(new Animated.Value(0)).current;

  const titleScale =
    useRef(new Animated.Value(0.85)).current;

  const starsScale =
    useRef(new Animated.Value(0.7)).current;

  const heroScale =
    useRef(new Animated.Value(0.7)).current;

  const pulse =
    useRef(new Animated.Value(1)).current;

  const stars = useMemo(() => {
    if (attempts <= 2) {
      return 3;
    }

    if (attempts <= 4) {
      return 2;
    }

    return 1;
  }, [attempts]);

  const buildCards = (): GameCard[] => {
    const baseCards: GameCard[] = [
      {
        id: 1,
        word: 'PARASTH',
        isTarget: true,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 2,
        word: 'NAKSA',
        isTarget: false,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 3,
        word: 'HELLO',
        isTarget: false,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 4,
        word: 'PARASTH',
        isTarget: true,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 5,
        word: 'NAKSA',
        isTarget: false,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 6,
        word: 'HELLO',
        isTarget: false,
        isFlipped: false,
        isMatched: false,
      },
    ];

    return [...baseCards].sort(
      () => Math.random() - 0.5,
    );
  };

  const startGame = () => {
    setCards(buildCards());

    setFirstCard(null);
    setSecondCard(null);

    setAttempts(0);
    setMatchedPairs(0);

    setIsChecking(false);

    setShowStars(false);
    setShowHero(false);

    entrance.setValue(0);
    titleScale.setValue(0.85);

    Animated.parallel([
      Animated.timing(entrance, {
        toValue: 1,
        duration: 550,
        easing: Easing.out(
          Easing.cubic,
        ),
        useNativeDriver: true,
      }),

      Animated.spring(titleScale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    startGame();

    const pulseAnimation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.04,
            duration: 850,
            easing: Easing.inOut(
              Easing.ease,
            ),
            useNativeDriver: true,
          }),

          Animated.timing(pulse, {
            toValue: 1,
            duration: 850,
            easing: Easing.inOut(
              Easing.ease,
            ),
            useNativeDriver: true,
          }),
        ]),
      );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  const flipCard = (index: number) => {
    if (
      isChecking ||
      firstCard === index ||
      cards[index]?.isMatched ||
      cards[index]?.isFlipped ||
      showStars ||
      showHero
    ) {
      return;
    }

    const updatedCards = [...cards];

    updatedCards[index] = {
      ...updatedCards[index],
      isFlipped: true,
    };

    setCards(updatedCards);

    if (firstCard === null) {
      setFirstCard(index);
      return;
    }

    setSecondCard(index);
    setIsChecking(true);

    const newAttempt = attempts + 1;

    setAttempts(newAttempt);

    const first =
      updatedCards[firstCard];

    const second =
      updatedCards[index];

    const isCorrectPair =
      first.isTarget &&
      second.isTarget;

    setTimeout(() => {
      if (isCorrectPair) {
        const matchedCards =
          updatedCards.map(
            (item, cardIndex) => {
              if (
                cardIndex === firstCard ||
                cardIndex === index
              ) {
                return {
                  ...item,
                  isMatched: true,
                  isFlipped: true,
                };
              }

              return item;
            },
          );

        const newMatchedPairs =
          matchedPairs + 1;

        setCards(matchedCards);

        setMatchedPairs(
          newMatchedPairs,
        );

        setFirstCard(null);
        setSecondCard(null);
        setIsChecking(false);

        if (newMatchedPairs === 1) {
          setTimeout(() => {
            openStars();
          }, 600);
        }

        return;
      }

      const resetCards =
        updatedCards.map(
          (item, cardIndex) => {
            if (
              cardIndex === firstCard ||
              cardIndex === index
            ) {
              return {
                ...item,
                isFlipped: false,
              };
            }

            return item;
          },
        );

      setCards(resetCards);

      setFirstCard(null);
      setSecondCard(null);
      setIsChecking(false);
    }, 850);
  };

  const openStars = () => {
    setShowStars(true);

    starsScale.setValue(0.65);

    Animated.spring(starsScale, {
      toValue: 1,
      friction: 5,
      tension: 65,
      useNativeDriver: true,
    }).start();
  };

  const openHero = () => {
    setShowStars(false);

    setShowHero(true);

    heroScale.setValue(0.7);

    Animated.spring(heroScale, {
      toValue: 1,
      friction: 6,
      tension: 55,
      useNativeDriver: true,
    }).start();
  };

  const goBack = () => {
    navigation.goBack();
  };

  const goToMap = () => {
    navigation.navigate('Levels');
  };

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[
            '#C7F5DC',
            '#CFEFFF',
          ]}
          style={styles.errorScreen}
        >
          <View style={styles.errorIcon}>
            <View
              style={
                styles.errorIconInner
              }
            />
          </View>

          <Text
            style={styles.errorTitle}
          >
            No se encontró la lección
          </Text>

          <Pressable
            style={styles.mainButton}
            onPress={goBack}
          >
            <Text
              style={
                styles.mainButtonText
              }
            >
              Volver
            </Text>
          </Pressable>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <LinearGradient
        colors={[
          '#6EE7B7',
          '#60A5FA',
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
        <Animated.View
          style={[
            styles.header,
            {
              opacity: entrance,
              transform: [
                {
                  translateY:
                    entrance.interpolate({
                      inputRange: [
                        0,
                        1,
                      ],
                      outputRange: [
                        -20,
                        0,
                      ],
                    }),
                },
              ],
            },
          ]}
        >
          <Pressable
            style={styles.backButton}
            onPress={goBack}
          >
            <Text
              style={
                styles.backButtonText
              }
            >
              Volver
            </Text>
          </Pressable>

          <Animated.View
            style={{
              transform: [
                {
                  scale: titleScale,
                },
              ],
            }}
          >
            <Text
              style={
                styles.headerTitle
              }
            >
              Encuentra PARASTH
            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >
              Encuentra las dos tarjetas correctas
            </Text>
          </Animated.View>

          <View
            style={styles.attemptBadge}
          >
            <Text
              style={
                styles.attemptNumber
              }
            >
              {attempts}
            </Text>

            <Text
              style={
                styles.attemptLabel
              }
            >
              intentos
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.instructionCard,
            {
              opacity: entrance,
              transform: [
                {
                  scale: titleScale,
                },
              ],
            },
          ]}
        >
          <View
            style={styles.targetIcon}
          >
            <View
              style={styles.targetOuter}
            >
              <View
                style={styles.targetMiddle}
              >
                <View
                  style={styles.targetInner}
                />
              </View>
            </View>
          </View>

          <Text
            style={
              styles.instructionTitle
            }
          >
            Encuentra las 2 tarjetas PARASTH
          </Text>

          <Text
            style={
              styles.instructionText
            }
          >
            Selecciona dos tarjetas y descubre
            cuáles forman la pareja correcta.
          </Text>
        </Animated.View>

        <View
          style={styles.progressArea}
        >
          <View
            style={
              styles.progressLabelRow
            }
          >
            <Text
              style={
                styles.progressLabel
              }
            >
              Progreso
            </Text>

            <Text
              style={
                styles.progressValue
              }
            >
              {matchedPairs}/1
            </Text>
          </View>

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
                    matchedPairs === 1
                      ? '100%'
                      : '0%',
                },
              ]}
            />
          </View>
        </View>

        <Animated.View
          style={[
            styles.grid,
            {
              opacity: entrance,
              transform: [
                {
                  translateY:
                    entrance.interpolate({
                      inputRange: [
                        0,
                        1,
                      ],
                      outputRange: [
                        35,
                        0,
                      ],
                    }),
                },
              ],
            },
          ]}
        >
          {cards.map(
            (card, index) => (
              <MemoryCard
                key={card.id}
                card={card}
                index={index}
                onPress={() =>
                  flipCard(index)
                }
              />
            ),
          )}
        </Animated.View>

        <Animated.View
          style={{
            transform: [
              {
                scale: pulse,
              },
            ],
          }}
        >
          <View
            style={styles.footerCard}
          >
            <Text
              style={
                styles.footerText
              }
            >
              Encuentra las dos tarjetas PARASTH
              para completar el reto.
            </Text>
          </View>
        </Animated.View>

        {showStars && (
          <View
            style={styles.overlay}
          >
            <Animated.View
              style={[
                styles.modalCard,
                {
                  transform: [
                    {
                      scale: starsScale,
                    },
                  ],
                },
              ]}
            >
              <View
                style={
                  styles.modalTopDecoration
                }
              />

              <Text
                style={styles.modalTitle}
              >
                Reto completado
              </Text>

              <Text
                style={
                  styles.modalSubtitle
                }
              >
                Encontraste las dos tarjetas PARASTH
              </Text>

              <View
                style={styles.starsRow}
              >
                {Array.from({
                  length: 3,
                }).map(
                  (_, index) => (
                    <Animated.View
                      key={index}
                      style={[
                        styles.starShape,
                        index >= stars &&
                          styles.starInactive,
                        {
                          transform: [
                            {
                              scale:
                                index <
                                stars
                                  ? 1
                                  : 0.88,
                            },
                          ],
                        },
                      ]}
                    >
                      <Text
                        style={
                          styles.starText
                        }
                      >
                        ★
                      </Text>
                    </Animated.View>
                  ),
                )}
              </View>

              <Text
                style={
                  styles.starResult
                }
              >
                {stars}{' '}
                {stars === 1
                  ? 'estrella ganada'
                  : 'estrellas ganadas'}
              </Text>

              <Text
                style={
                  styles.attemptResult
                }
              >
                Completaste el reto en{' '}
                {attempts}{' '}
                {attempts === 1
                  ? 'intento'
                  : 'intentos'}
              </Text>

              <Pressable
                style={
                  styles.heroButton
                }
                onPress={
                  openHero
                }
              >
                <Text
                  style={
                    styles.heroButtonText
                  }
                >
                  Ver héroe coleccionado
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        )}

        {showHero && reward && (
          <View
            style={styles.overlay}
          >
            <Animated.View
              style={[
                styles.heroModal,
                {
                  transform: [
                    {
                      scale: heroScale,
                    },
                  ],
                },
              ]}
            >
              <View
                style={
                  styles.heroTopBar
                }
              >
                <Text
                  style={
                    styles.heroTopText
                  }
                >
                  Héroe desbloqueado
                </Text>
              </View>

              <View
                style={
                  styles.heroImageContainer
                }
              >
                <Image
                  source={reward.image}
                  style={
                    styles.heroImage
                  }
                  resizeMode="contain"
                />
              </View>

              <Text
                style={
                  styles.heroUnlockedTitle
                }
              >
                Nuevo héroe
              </Text>

              <Text
                style={styles.heroName}
              >
                {reward.name}
              </Text>

              <Text
                style={
                  styles.heroDescription
                }
              >
                {reward.description}
              </Text>

              <Pressable
                style={
                  styles.mapButton
                }
                onPress={
                  goToMap
                }
              >
                <Text
                  style={
                    styles.mapButtonText
                  }
                >
                  Volver al mapa
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        )}

        {showHero && !reward && (
          <View
            style={styles.overlay}
          >
            <Animated.View
              style={[
                styles.heroModal,
                {
                  transform: [
                    {
                      scale: heroScale,
                    },
                  ],
                },
              ]}
            >
              <View
                style={
                  styles.heroTopBar
                }
              >
                <Text
                  style={
                    styles.heroTopText
                  }
                >
                  Reto completado
                </Text>
              </View>

              <Text
                style={
                  styles.noRewardTitle
                }
              >
                Has completado el reto
              </Text>

              <Text
                style={
                  styles.noRewardText
                }
              >
                No hay un héroe configurado
                para esta lección.
              </Text>

              <Pressable
                style={
                  styles.mapButton
                }
                onPress={
                  goToMap
                }
              >
                <Text
                  style={
                    styles.mapButtonText
                  }
                >
                  Volver al mapa
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

function MemoryCard({
  card,
  index,
  onPress,
}: {
  card: GameCard;
  index: number;
  onPress: () => void;
}) {
  const rotation =
    useRef(
      new Animated.Value(0),
    ).current;

  const scale =
    useRef(
      new Animated.Value(1),
    ).current;

  useEffect(() => {
    Animated.spring(rotation, {
      toValue:
        card.isFlipped ||
        card.isMatched
          ? 1
          : 0,
      friction: 8,
      tension: 70,
      useNativeDriver: true,
    }).start();

    if (card.isMatched) {
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.08,
          friction: 4,
          tension: 70,
          useNativeDriver: true,
        }),

        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          tension: 60,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [
    card.isFlipped,
    card.isMatched,
  ]);

  const frontRotation =
    rotation.interpolate({
      inputRange: [0, 1],
      outputRange: [
        '0deg',
        '180deg',
      ],
    });

  const backRotation =
    rotation.interpolate({
      inputRange: [0, 1],
      outputRange: [
        '180deg',
        '360deg',
      ],
    });

  return (
    <Pressable
      onPress={onPress}
      style={
        styles.memoryCardWrapper
      }
    >
      <Animated.View
        style={[
          styles.memoryCard,
          {
            transform: [
              {
                rotateY:
                  frontRotation,
                },
              {
                scale,
              },
            ],
          },
        ]}
      >
        <View
          style={[
            styles.cardBack,
            index % 2 === 0
              ? styles.cardBackA
              : styles.cardBackB,
          ]}
        >
          <View
            style={
              styles.cardPattern
            }
          >
            <View
              style={
                styles.patternCircle
              }
            />

            <View
              style={
                styles.patternCircleSmall
              }
            />
          </View>

          <Text
            style={
              styles.cardQuestion
            }
          >
            ?
          </Text>

          <Text
            style={
              styles.cardBackLabel
            }
          >
            Mayangna
          </Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.memoryCard,
          styles.cardFace,
          {
            transform: [
              {
                rotateY:
                  backRotation,
              },
              {
                scale,
              },
            ],
          },
        ]}
      >
        <View
          style={[
            styles.wordCircle,
            card.isTarget
              ? styles.targetCircle
              : styles.otherCircle,
          ]}
        />

        <Text
          style={[
            styles.cardWord,
            card.isTarget &&
              styles.targetWord,
          ]}
        >
          {card.word}
        </Text>

        <View
          style={[
            styles.cardStatus,
            card.isTarget
              ? styles.targetStatus
              : styles.otherStatus,
          ]}
        >
          <Text
            style={
              styles.cardStatusText
            }
          >
            {card.isTarget
              ? 'OBJETIVO'
              : 'OTRA PALABRA'}
          </Text>
        </View>

        {card.isMatched && (
          <View
            style={
              styles.matchedBadge
            }
          >
            <Text
              style={
                styles.matchedBadgeText
              }
            >
              ✓
            </Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },

  header: {
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    minWidth: 66,
    height: 42,
    paddingHorizontal: 13,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  backButtonText: {
    color: '#31516F',
    fontSize: 13,
    fontWeight: '900',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },

  headerSubtitle: {
    marginTop: 2,
    color: 'rgba(255,255,255,0.88)',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },

  attemptBadge: {
    minWidth: 55,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  attemptNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: '#31516F',
  },

  attemptLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#71859C',
  },

  instructionCard: {
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 16,
    alignItems: 'center',
    elevation: 7,
  },

  targetIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5F8ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },

  targetOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 4,
    borderColor: '#35B86F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  targetMiddle: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#35B86F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  targetInner: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#35B86F',
  },

  instructionTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#294665',
    textAlign: 'center',
  },

  instructionText: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: '#70839B',
    textAlign: 'center',
    maxWidth: 310,
  },

  progressArea: {
    marginTop: 12,
    marginBottom: 8,
  },

  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  progressLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  progressValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  progressBackground: {
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },

  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 6,
  },

  memoryCardWrapper: {
    width: '31%',
    height: 142,
    marginBottom: 10,
  },

  memoryCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    elevation: 7,
  },

  cardBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  cardBackA: {
    backgroundColor: '#356D9C',
  },

  cardBackB: {
    backgroundColor: '#4B5FA9',
  },

  cardPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  patternCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor:
      'rgba(255,255,255,0.18)',
  },

  patternCircleSmall: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor:
      'rgba(255,255,255,0.18)',
  },

  cardQuestion: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  cardBackLabel: {
    marginTop: 8,
    fontSize: 9,
    fontWeight: '800',
    color:
      'rgba(255,255,255,0.75)',
  },

  cardFace: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  wordCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    position: 'absolute',
    top: 10,
  },

  targetCircle: {
    backgroundColor: '#DDF7E8',
  },

  otherCircle: {
    backgroundColor: '#EEF1FF',
  },

  cardWord: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '900',
    color: '#465D78',
    textAlign: 'center',
  },

  targetWord: {
    color: '#20975A',
  },

  cardStatus: {
    position: 'absolute',
    bottom: 9,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
  },

  targetStatus: {
    backgroundColor: '#DDF7E8',
  },

  otherStatus: {
    backgroundColor: '#EEF1FF',
  },

  cardStatusText: {
    fontSize: 6,
    fontWeight: '900',
    color: '#61758E',
  },

  matchedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#35B86F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  matchedBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  footerCard: {
    borderRadius: 18,
    paddingVertical: 11,
    paddingHorizontal: 14,
    backgroundColor:
      'rgba(255,255,255,0.9)',
    alignItems: 'center',
  },

  footerText: {
    color: '#4D6885',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:
      'rgba(19,39,63,0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 100,
    elevation: 100,
  },

  modalCard: {
    width: '100%',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    padding: 25,
    alignItems: 'center',
    elevation: 20,
  },

  modalTopDecoration: {
    width: 55,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#53C982',
    marginBottom: 17,
  },

  modalTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#294665',
    textAlign: 'center',
  },

  modalSubtitle: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 20,
    color: '#71849C',
    textAlign: 'center',
  },

  starsRow: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 21,
  },

  starShape: {
    width: 55,
    height: 55,
    borderRadius: 17,
    backgroundColor: '#FFD84D',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  starInactive: {
    backgroundColor: '#DCE3EA',
  },

  starText: {
    fontSize: 35,
    color: '#FFFFFF',
  },

  starResult: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '900',
    color: '#3C5F7D',
  },

  attemptResult: {
    marginTop: 5,
    fontSize: 13,
    color: '#788BA0',
  },

  heroButton: {
    width: '100%',
    minHeight: 55,
    borderRadius: 28,
    backgroundColor: '#315D91',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    elevation: 5,
  },

  heroButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  heroModal: {
    width: '100%',
    maxHeight: '92%',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    paddingBottom: 22,
    overflow: 'hidden',
    elevation: 20,
    alignItems: 'center',
  },

  heroTopBar: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#315D91',
    alignItems: 'center',
  },

  heroTopText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },

  heroImageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#EEF7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroImage: {
    width: '90%',
    height: '90%',
  },

  heroUnlockedTitle: {
    marginTop: 18,
    fontSize: 14,
    fontWeight: '800',
    color: '#7A8BA0',
  },

  heroName: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: '900',
    color: '#294665',
    textAlign: 'center',
  },

  heroDescription: {
    marginTop: 8,
    paddingHorizontal: 25,
    fontSize: 13,
    lineHeight: 20,
    color: '#71849C',
    textAlign: 'center',
  },

  mapButton: {
    width: '88%',
    minHeight: 53,
    borderRadius: 27,
    backgroundColor: '#39B879',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 5,
  },

  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  noRewardTitle: {
    marginTop: 30,
    fontSize: 23,
    fontWeight: '900',
    color: '#294665',
    textAlign: 'center',
  },

  noRewardText: {
    marginTop: 10,
    paddingHorizontal: 25,
    fontSize: 14,
    lineHeight: 21,
    color: '#71849C',
    textAlign: 'center',
  },

  errorScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  errorIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  errorIconInner: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#76B995',
  },

  errorTitle: {
    fontSize: 23,
    fontWeight: '900',
    color: '#294665',
    textAlign: 'center',
    marginBottom: 20,
  },

  mainButton: {
    minWidth: 190,
    minHeight: 54,
    borderRadius: 27,
    backgroundColor: '#315D91',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
});