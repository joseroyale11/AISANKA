import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  AccessibilityInfo,
  Animated,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import SoundPlayer from 'react-native-sound-player';

import {Lesson} from '../../types/Lesson';
import {miskitoLessons} from '../../data/lessons/miskito/world1';

interface HolaMiskitoGameProps {
  route: any;
  navigation: any;
}

interface LetterItem {
  id: number;
  letter: string;
  originalIndex: number;
}

const NAKSA_AUDIO = require(
  '../../assets/sounds/nacksa.mp3',
);

const RUBEN_IMAGE = require(
  '../../assets/images/ruben.png',
);

const MAX_ATTEMPTS = 3;

export default function HolaMiskitoGame({
  route,
  navigation,
}: HolaMiskitoGameProps) {
  const lesson =
    route?.params?.lesson as
      | Lesson
      | undefined;

  const levelId =
    route?.params?.levelId ?? 1;

  const miskitoLesson =
    miskitoLessons.find(
      item =>
        item.world === 1 &&
        item.level === levelId,
    ) ?? miskitoLessons[0];

  const targetWord = (
    miskitoLesson?.word ||
    'NAKSA'
  )
    .replace(/\s/g, '')
    .toUpperCase();

  const spanishWord = (
    miskitoLesson?.translation ||
    'Hola'
  ).toUpperCase();

  const targetLetters = useMemo(
    () => targetWord.split(''),
    [targetWord],
  );

  const crearLetrasDesordenadas = (
    excludedIndexes: number[] = [],
  ): LetterItem[] => {
    const excluded =
      new Set(excludedIndexes);

    const letters: LetterItem[] =
      targetLetters
        .map((letter, index) => ({
          id: index,
          letter,
          originalIndex: index,
        }))
        .filter(
          item =>
            !excluded.has(
              item.originalIndex,
            ),
        );

    if (
      targetWord === 'NAKSA' &&
      excludedIndexes.length === 0
    ) {
      return [
        {
          id: 0,
          letter: 'K',
          originalIndex: 2,
        },
        {
          id: 1,
          letter: 'A',
          originalIndex: 1,
        },
        {
          id: 2,
          letter: 'N',
          originalIndex: 0,
        },
        {
          id: 3,
          letter: 'S',
          originalIndex: 3,
        },
        {
          id: 4,
          letter: 'A',
          originalIndex: 4,
        },
      ];
    }

    return letters.reverse();
  };

  const [availableLetters, setAvailableLetters] =
    useState<LetterItem[]>(
      crearLetrasDesordenadas(),
    );

  const [selectedLetters, setSelectedLetters] =
    useState<
      Array<LetterItem | null>
    >(
      Array(targetWord.length).fill(null),
    );

  const [lockedPositions, setLockedPositions] =
    useState<boolean[]>(
      Array(targetWord.length).fill(false),
    );

  const [attempt, setAttempt] =
    useState(1);

  const [stars, setStars] =
    useState(0);

  const [feedback, setFeedback] =
    useState('');

  const [success, setSuccess] =
    useState(false);

  const [resultVisible, setResultVisible] =
    useState(false);

  const [collectionVisible, setCollectionVisible] =
    useState(false);

  const pulse =
    useRef(
      new Animated.Value(1),
    ).current;

  const successScale =
    useRef(
      new Animated.Value(0.65),
    ).current;

  const shake =
    useRef(
      new Animated.Value(0),
    ).current;

  const progressAnimation =
    useRef(
      new Animated.Value(0),
    ).current;

  const floatingAnimation =
    useRef(
      new Animated.Value(0),
    ).current;

  const letterAnimations =
    useRef(
      targetWord
        .split('')
        .map(
          () =>
            new Animated.Value(0),
        ),
    ).current;

  useEffect(() => {
    const animation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            pulse,
            {
              toValue: 1.045,
              duration: 850,
              useNativeDriver: true,
            },
          ),
          Animated.timing(
            pulse,
            {
              toValue: 1,
              duration: 850,
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
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            },
          ),
          Animated.timing(
            floatingAnimation,
            {
              toValue: 0,
              duration: 1500,
              useNativeDriver: true,
            },
          ),
        ]),
      );

    animation.start();
    floating.start();

    return () => {
      animation.stop();
      floating.stop();
    };
  }, [
    pulse,
    floatingAnimation,
  ]);

  useEffect(() => {
    const completed =
      selectedLetters.filter(Boolean)
        .length;

    Animated.spring(
      progressAnimation,
      {
        toValue:
          completed /
          targetWord.length,
        friction: 7,
        tension: 70,
        useNativeDriver: false,
      },
    ).start();
  }, [
    selectedLetters,
    targetWord.length,
    progressAnimation,
  ]);

  const anunciar = (
    texto: string,
  ) => {
    AccessibilityInfo
      .announceForAccessibility(
        texto,
      );
  };

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

  useEffect(() => {
    anunciar(
      `Juego. Forma la palabra `,
    );

    return () => {
      try {
        SoundPlayer.stop();
      } catch {}
    };
  }, [targetWord]);

  const animarLetra = (
    index: number,
  ) => {
    if (!letterAnimations[index]) {
      return;
    }

    letterAnimations[index].setValue(0);

    Animated.spring(
      letterAnimations[index],
      {
        toValue: 1,
        friction: 5,
        tension: 90,
        useNativeDriver: true,
      },
    ).start();
  };

  const seleccionarLetra = (
    item: LetterItem,
  ) => {
    const siguiente =
      [...selectedLetters];

    const emptyIndex =
      siguiente.findIndex(
        (letter, index) =>
          !letter &&
          !lockedPositions[index],
      );

    if (emptyIndex === -1) {
      return;
    }

    siguiente[emptyIndex] = item;

    setSelectedLetters(
      siguiente,
    );

    setAvailableLetters(
      previous =>
        previous.filter(
          letter =>
            letter.id !== item.id,
        ),
    );

    animarLetra(emptyIndex);

    anunciar(
      `Letra ${item.letter}`,
    );

    const completed =
      siguiente.every(
        (letter, index) =>
          letter !== null ||
          lockedPositions[index],
      );

    if (completed) {
      setTimeout(() => {
        comprobarRespuesta(
          siguiente,
        );
      }, 450);
    }
  };

  const comprobarRespuesta = (
    respuesta: Array<LetterItem | null>,
  ) => {
    const correctPositions =
      respuesta.map(
        (item, index) =>
          item?.letter ===
          targetLetters[index],
      );

    const allCorrect =
      correctPositions.every(Boolean);

    if (allCorrect) {
      const estrellasGanadas =
        attempt === 1
          ? 3
          : attempt === 2
          ? 2
          : 1;

      setStars(
        estrellasGanadas,
      );

      setSuccess(true);

      setFeedback(
        'Palabra correcta',
      );

      anunciar(
        `Excelente. Formaste la palabra ${targetWord}. Ganaste ${estrellasGanadas} estrellas.`,
      );

      Animated.spring(
        successScale,
        {
          toValue: 1,
          friction: 5,
          tension: 70,
          useNativeDriver: true,
        },
      ).start();

      setTimeout(() => {
        setResultVisible(
          true,
        );
      }, 650);

      return;
    }

    const newLockedPositions =
      lockedPositions.map(
        (locked, index) =>
          locked ||
          correctPositions[index],
      );

    const wrongIndexes =
      targetLetters
        .map((_, index) => index)
        .filter(
          index =>
            !newLockedPositions[
              index
            ],
        );

    if (
      attempt >= MAX_ATTEMPTS
    ) {
      setSuccess(false);

      setFeedback(
        'Terminaste los intentos',
      );

      anunciar(
        'Terminaste los intentos disponibles.',
      );

      setTimeout(() => {
        setResultVisible(
          true,
        );
      }, 600);

      return;
    }

    setLockedPositions(
      newLockedPositions,
    );

    Animated.sequence([
      Animated.timing(
        shake,
        {
          toValue: 11,
          duration: 65,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        shake,
        {
          toValue: -11,
          duration: 65,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        shake,
        {
          toValue: 7,
          duration: 65,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        shake,
        {
          toValue: 0,
          duration: 65,
          useNativeDriver: true,
        },
      ),
    ]).start();

    setFeedback(
      'Las letras correctas se mantienen.',
    );

    anunciar(
      'Las letras que están en la posición correcta se mantienen.',
    );

    setTimeout(() => {
      const preserved =
        Array(targetWord.length)
          .fill(null)
          .map(
            (_, index) =>
              newLockedPositions[index]
                ? respuesta[index]
                : null,
          );

      setSelectedLetters(
        preserved,
      );

      setAvailableLetters(
        crearLetrasDesordenadas(
          newLockedPositions
            .map(
              (locked, index) =>
                locked
                  ? index
                  : -1,
            )
            .filter(
              index => index >= 0,
            ),
        ),
      );

      setAttempt(
        previous =>
          previous + 1,
      );
    }, 850);
  };

  const reiniciarJuego = () => {
    setResultVisible(false);

    setSelectedLetters(
      Array(targetWord.length).fill(null),
    );

    setLockedPositions(
      Array(targetWord.length).fill(false),
    );

    setAvailableLetters(
      crearLetrasDesordenadas(),
    );

    setAttempt(1);
    setStars(0);
    setSuccess(false);
    setFeedback('');

    successScale.setValue(
      0.65,
    );
  };

  const quitarLetra = (
    index: number,
  ) => {
    if (lockedPositions[index]) {
      return;
    }

    const letter =
      selectedLetters[index];

    if (!letter) {
      return;
    }

    const next =
      [...selectedLetters];

    next[index] = null;

    setSelectedLetters(
      next,
    );

    setAvailableLetters(
      previous => [
        ...previous,
        letter,
      ],
    );
  };

  const mostrarColeccion = () => {
    setResultVisible(false);

    setCollectionVisible(
      true,
    );

    anunciar(
      'Has desbloqueado a Rubén Darío.',
    );
  };



  const volverMapa = () => {
    setCollectionVisible(false);

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Levels',
        },
      ],
    });
  };

  const renderStars = (
    cantidad: number,
  ) => {
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3].map(
          item => (
            <View
              key={item}
              style={[
                styles.star,
                item <= cantidad &&
                  styles.starActive,
              ]}>
              <View style={styles.starShape}>
                <View
                  style={
                    styles.starInner
                  }
                />
              </View>
            </View>
          ),
        )}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[
        '#312E81',
        '#7C3AED',
        '#DB2777',
      ]}
      style={styles.container}>
      <SafeAreaView
        style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() =>
              navigation.goBack()
            }
            accessibilityRole="button"
            accessibilityLabel="Volver atrás">
            <Text
              style={styles.backText}>
              ‹
            </Text>
          </Pressable>

          <View
            style={styles.headerCenter}>
            <Text
              style={styles.headerTitle}>
              JUEGO
            </Text>

            <Text
              style={
                styles.headerSubtitle
              }>
              ORDENA LA PALABRA
            </Text>
          </View>

          <View
            style={styles.attemptBadge}>
            <Text
              style={styles.attemptText}>
              {attempt}/3
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={
            styles.scrollContent
          }
          showsVerticalScrollIndicator={
            false
          }>
          <Animated.View
            style={[
              styles.instructionCard,
              {
                transform: [
                  {
                    scale: pulse,
                  },
                ],
              },
            ]}>
            <Animated.View
              style={{
                transform: [
                  {
                    translateY:
                      floatingAnimation.interpolate(
                        {
                          inputRange: [
                            0,
                            1,
                          ],
                          outputRange: [
                            4,
                            -4,
                          ],
                        },
                      ),
                  },
                ],
              }}>
              <View
                style={
                  styles.gameSymbol
                }>
                <View
                  style={
                    styles.gameSymbolLine
                  }
                />
                <View
                  style={
                    styles.gameSymbolLine
                  }
                />
                <View
                  style={
                    styles.gameSymbolLine
                  }
                />
              </View>
            </Animated.View>

            <Text
              style={
                styles.instructionTitle
              }>
              FORMA LA PALABRA
            </Text>



          </Animated.View>

          <Animated.View
            style={[
              styles.progressCard,
              {
                transform: [
                  {
                    translateX: shake,
                  },
                ],
              },
            ]}>
            <View
              style={
                styles.progressTrack
              }>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width:
                      progressAnimation.interpolate(
                        {
                          inputRange: [
                            0,
                            1,
                          ],
                          outputRange: [
                            '0%',
                            '100%',
                          ],
                        },
                      ),
                  },
                ]}
              />
            </View>

            <Text
              style={
                styles.progressLabel
              }>
              {selectedLetters.filter(Boolean)
                .length}{' '}
              de {targetWord.length} letras
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.answerContainer,
              {
                transform: [
                  {
                    translateX: shake,
                  },
                ],
              },
            ]}>
            {targetLetters.map(
              (_, index) => {
                const letter =
                  selectedLetters[
                    index
                  ];

                return (
                  <Pressable
                    key={index}
                    style={[
                      styles.answerSlot,
                      letter &&
                        styles.answerSlotFilled,
                      lockedPositions[
                        index
                      ] &&
                        styles.answerSlotLocked,
                    ]}
                    onPress={() =>
                      quitarLetra(index)
                    }
                    disabled={
                      lockedPositions[
                        index
                      ]
                    }
                    accessibilityRole="button"
                    accessibilityLabel={
                      lockedPositions[
                        index
                      ]
                        ? `Letra ${letter?.letter} correcta y bloqueada`
                        : letter
                        ? `Quitar letra ${letter.letter}`
                        : `Posición ${index + 1} vacía`
                    }>
                    <Animated.Text
                      style={[
                        styles.answerLetter,
                        {
                          transform: [
                            {
                              scale:
                                letterAnimations[
                                  index
                                ]?.interpolate(
                                  {
                                    inputRange: [
                                      0,
                                      1,
                                    ],
                                    outputRange: [
                                      0.65,
                                      1,
                                    ],
                                  },
                                ) ??
                                1,
                            },
                          ],
                        },
                      ]}>
                      {letter?.letter ||
                        '·'}
                    </Animated.Text>

                    {lockedPositions[
                      index
                    ] && (
                      <View
                        style={
                          styles.lockIndicator
                        }
                      />
                    )}
                  </Pressable>
                );
              },
            )}
          </Animated.View>

          <View
            style={
              styles.feedbackContainer
            }>
            <Text
              style={
                styles.feedbackText
              }>
              {feedback ||
                'Toca las letras para colocarlas'}
            </Text>
          </View>

          <View
            style={
              styles.lettersContainer
            }>
            {availableLetters.map(
              item => (
                <Pressable
                  key={item.id}
                  style={({
                    pressed,
                  }) => [
                    styles.letterButton,
                    pressed &&
                      styles.letterButtonPressed,
                  ]}
                  onPress={() =>
                    seleccionarLetra(
                      item,
                    )
                  }
                  accessibilityRole="button"
                  accessibilityLabel={`Letra ${item.letter}`}>
                  <Text
                    style={
                      styles.letterButtonText
                    }>
                    {item.letter}
                  </Text>
                </Pressable>
              ),
            )}
          </View>

          <Pressable
            style={styles.audioButton}
            onPress={() => {
              reproducirNaksa();

              anunciar(
                `Escucha la palabra ${targetWord}`,
              );
            }}
            accessibilityRole="button"
            accessibilityLabel={`Escuchar ${targetWord}`}>
            <View
              style={
                styles.audioIcon
              }>
              <View
                style={
                  styles.audioTriangle
                }
              />
            </View>

            <Text
              style={styles.audioText}>
              ESCUCHAR NAKSA
            </Text>
          </Pressable>
        </ScrollView>

        <Modal
          visible={resultVisible}
          transparent
          animationType="fade"
          onRequestClose={() =>
            setResultVisible(false)
          }>
          <View
            style={
              styles.modalOverlay
            }>
            <Animated.View
              style={[
                styles.resultModal,
                {
                  transform: [
                    {
                      scale:
                        success
                          ? successScale
                          : 1,
                    },
                  ],
                },
              ]}>
              {success ? (
                <>
                  <View
                    style={
                      styles.successSymbol
                    }>
                    <View
                      style={
                        styles.successCheck
                      }
                    />
                  </View>

                  <Text
                    style={
                      styles.resultTitle
                    }>
                    EXCELENTE
                  </Text>

                  <Text
                    style={
                      styles.resultText
                    }>
                    Formaste correctamente
                  </Text>

                  <Text
                    style={
                      styles.resultWord
                    }>
                    {targetWord}
                  </Text>

                  {renderStars(stars)}

                  <Pressable
                    style={
                      styles.resultButton
                    }
                    onPress={
                      mostrarColeccion
                    }>
                    <Text
                      style={
                        styles.resultButtonText
                      }>
                      VER HÉROE
                    </Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <View
                    style={
                      styles.tryAgainSymbol
                    }>
                    <View
                      style={
                        styles.tryAgainLine
                      }
                    />
                  </View>

                  <Text
                    style={
                      styles.resultTitle
                    }>
                    SIGUE INTENTANDO
                  </Text>

                  <Text
                    style={
                      styles.resultText
                    }>
                    Puedes practicar nuevamente
                    la palabra.
                  </Text>

                  <Pressable
                    style={
                      styles.resultButton
                    }
                    onPress={
                      reiniciarJuego
                    }>
                    <Text
                      style={
                        styles.resultButtonText
                      }>
                      INTENTAR DE NUEVO
                    </Text>
                  </Pressable>
                </>
              )}
            </Animated.View>
          </View>
        </Modal>

        <Modal
          visible={collectionVisible}
          transparent
          animationType="slide"
          onRequestClose={() => {

          }}>
          <View
            style={
              styles.heroModalOverlay
            }>
            <View
              style={
                styles.collectionModal
              }>
              <View
                style={
                  styles.heroTopLine
                }
              />

              <Text
                style={
                  styles.collectionTitle
                }>
                HÉROE DESBLOQUEADO
              </Text>

              <View
                style={
                  styles.heroImageContainer
                }>
                <View
                  style={
                    styles.heroImageGlow
                  }
                />

                <Animated.Image
                  source={RUBEN_IMAGE}
                  resizeMode="contain"
                  style={
                    styles.heroImage
                  }
                />
              </View>

              <Text
                style={
                  styles.heroName
                }>
                Rubén Darío
              </Text>

              <View
                style={
                  styles.heroDivider
                }
              />

              <Text
                style={
                  styles.collectionText
                }>
                Este héroe ahora forma parte
                de tu colección de héroes.
              </Text>

              <View
                style={
                  styles.collectionStars
                }>
                {renderStars(stars)}
              </View>

              <Pressable
                style={
                  styles.mapButton
                }
                onPress={
                  volverMapa
                }
                accessibilityRole="button"
                accessibilityLabel="Volver al mapa">
                <Text
                  style={
                    styles.mapButtonText
                  }>
                  VOLVER AL MAPA
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
    height: 78,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor:
      'rgba(255,255,255,0.20)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '300',
    lineHeight: 42,
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },

  headerSubtitle: {
    color:
      'rgba(255,255,255,0.82)',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
  },

  attemptBadge: {
    minWidth: 52,
    height: 38,
    borderRadius: 19,
    backgroundColor:
      'rgba(255,255,255,0.20)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  attemptText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 35,
  },

  instructionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
    alignItems: 'center',
    marginBottom: 15,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 8,
  },

  gameSymbol: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  gameSymbolLine: {
    width: 30,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#7C3AED',
    marginVertical: 3,
  },

  instructionTitle: {
    fontSize: 24,
    color: '#312E81',
    fontWeight: '900',
    textAlign: 'center',
  },

  instructionText: {
    marginTop: 8,
    color: '#64748B',
    fontSize: 16,
    fontWeight: '700',
  },

  targetWord: {
    fontSize: 42,
    color: '#7C3AED',
    fontWeight: '900',
    letterSpacing: 4,
    marginTop: 7,
  },

  translationText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 5,
  },

  progressCard: {
    backgroundColor:
      'rgba(255,255,255,0.15)',
    borderRadius: 17,
    padding: 12,
    marginBottom: 12,
  },

  progressTrack: {
    height: 7,
    backgroundColor:
      'rgba(255,255,255,0.25)',
    borderRadius: 5,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },

  progressLabel: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 6,
  },

  answerContainer: {
    minHeight: 90,
    borderRadius: 24,
    backgroundColor:
      'rgba(255,255,255,0.96)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
    marginBottom: 10,
  },

  answerSlot: {
    width: 48,
    height: 58,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },

  answerSlotFilled: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
    borderStyle: 'solid',
  },

  answerSlotLocked: {
    backgroundColor: '#DCFCE7',
    borderColor: '#22C55E',
    borderWidth: 3,
  },

  answerLetter: {
    color: '#312E81',
    fontSize: 28,
    fontWeight: '900',
  },

  lockIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },

  feedbackContainer: {
    alignItems: 'center',
    minHeight: 38,
    justifyContent: 'center',
  },

  feedbackText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },

  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },

  letterButton: {
    width: 64,
    height: 64,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },

  letterButtonPressed: {
    transform: [
      {
        scale: 0.9,
      },
    ],
    backgroundColor: '#E0E7FF',
  },

  letterButtonText: {
    fontSize: 33,
    color: '#4F46E5',
    fontWeight: '900',
  },

  audioButton: {
    marginTop: 20,
    minHeight: 60,
    borderRadius: 20,
    backgroundColor:
      'rgba(255,255,255,0.20)',
    borderWidth: 2,
    borderColor:
      'rgba(255,255,255,0.50)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  audioIcon: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  audioTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#312E81',
    marginLeft: 2,
  },

  audioText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(15,23,42,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  resultModal: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 28,
    alignItems: 'center',
  },

  successSymbol: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  successCheck: {
    width: 28,
    height: 16,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#16A34A',
    transform: [
      {
        rotate: '-45deg',
      },
    ],
    marginTop: -6,
  },

  tryAgainSymbol: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  tryAgainLine: {
    width: 34,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D97706',
  },

  resultTitle: {
    color: '#312E81',
    fontSize: 27,
    fontWeight: '900',
    textAlign: 'center',
  },

  resultText: {
    color: '#64748B',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },

  resultWord: {
    color: '#7C3AED',
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 3,
    marginTop: 8,
  },

  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 18,
  },

  star: {
    width: 48,
    height: 48,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  starActive: {
    transform: [
      {
        scale: 1.08,
      },
    ],
  },

  starShape: {
    width: 35,
    height: 35,
    backgroundColor: '#CBD5E1',
    transform: [
      {
        rotate: '45deg',
      },
    ],
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  starInner: {
    width: 18,
    height: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },

  resultButton: {
    width: '100%',
    minHeight: 60,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  resultButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },

  heroModalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(15,23,42,0.86)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  collectionModal: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 34,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 25,
    alignItems: 'center',
  },

  heroTopLine: {
    width: 55,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#C7D2FE',
    marginBottom: 17,
  },

  collectionTitle: {
    color: '#312E81',
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
  },

  heroImageContainer: {
    width: 190,
    height: 190,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heroImageGlow: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#FEF3C7',
    opacity: 0.8,
  },

  heroImage: {
    width: 180,
    height: 180,
  },

  heroName: {
    color: '#92400E',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 8,
  },

  heroDivider: {
    width: '75%',
    height: 2,
    backgroundColor: '#E2E8F0',
    marginVertical: 14,
  },

  collectionText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 23,
  },

  collectionStars: {
    marginTop: 2,
    marginBottom: 2,
  },

  mapButton: {
    width: '100%',
    minHeight: 64,
    borderRadius: 21,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});