import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Video from 'react-native-video';

import {
  Lesson,
} from '../../types/Lesson';


// =========================================================
// AUDIOS
// =========================================================

const AUDIO_EJERCICIO =
  require(
    '../../assets/sounds/ejercicio.mp3'
  );

const AUDIO_LETRAS: Record<
  string,
  any
> = {

  H: require(
    '../../assets/sounds/letrah.mp3'
  ),

  O: require(
    '../../assets/sounds/letrao.mp3'
  ),

  L: require(
    '../../assets/sounds/letral.mp3'
  ),

  A: require(
    '../../assets/sounds/letraa.mp3'
  ),

};

const AUDIO_ESTRELLAS: Record<
  number,
  any
> = {

  1: require(
    '../../assets/sounds/estrella_1.mp3'
  ),

  2: require(
    '../../assets/sounds/estrella_2.mp3'
  ),

  3: require(
    '../../assets/sounds/estrella_3.mp3'
  ),

};

const AUDIO_HEROE =
  require(
    '../../assets/sounds/Heroe.mp3'
  );


// =========================================================
// COMPONENTE
// =========================================================

export default function HolaEspañolGame({
  route,
  navigation,
}: any) {


  // =======================================================
  // LECCIÓN
  // =======================================================

  const params =
    route?.params ?? {};

  const lesson:
    Lesson | undefined =
    params.lesson;


  // =======================================================
  // PALABRA
  // =======================================================

  const correctWord =
    'HOLA';

  const scrambledLetters =
    ['L', 'H', 'O', 'A'];


  // =======================================================
  // RESPUESTA
  // null = posición vacía
  // =======================================================

  const [
    selectedLetters,
    setSelectedLetters,
  ] = useState<
    Array<string | null>
  >([
    null,
    null,
    null,
    null,
  ]);


  // =======================================================
  // LETRAS FIJADAS
  // =======================================================

  const [
    fixedLetters,
    setFixedLetters,
  ] = useState<
    Array<string | null>
  >([
    null,
    null,
    null,
    null,
  ]);


  // =======================================================
  // LETRAS DISPONIBLES
  // =======================================================

  const [
    availableLetters,
    setAvailableLetters,
  ] = useState<string[]>(
    scrambledLetters,
  );


  // =======================================================
  // INTENTO
  // =======================================================

  const [
    attempt,
    setAttempt,
  ] = useState(1);


  // =======================================================
  // BLOQUEO
  // =======================================================

  const [
    locked,
    setLocked,
  ] = useState(false);


  // =======================================================
  // MODAL
  // =======================================================

  const [
    modal,
    setModal,
  ] = useState<
    'stars' |
    'hero' |
    'failed' |
    null
  >(null);


  // =======================================================
  // ESTRELLAS
  // =======================================================

  const [
    stars,
    setStars,
  ] = useState(0);


  // =======================================================
  // AUDIO
  // =======================================================

  const [
    audioSource,
    setAudioSource,
  ] = useState<any>(
    AUDIO_EJERCICIO,
  );

  const [
    audioVersion,
    setAudioVersion,
  ] = useState(0);


  // =======================================================
  // ANIMACIONES
  // =======================================================

  const screenOpacity =
    useRef(
      new Animated.Value(0),
    ).current;

  const screenTranslate =
    useRef(
      new Animated.Value(35),
    ).current;

  const shake =
    useRef(
      new Animated.Value(0),
    ).current;

  const modalScale =
    useRef(
      new Animated.Value(0.75),
    ).current;

  const modalOpacity =
    useRef(
      new Animated.Value(0),
    ).current;

  const letterScale =
    useRef(
      new Animated.Value(1),
    ).current;

  const fixedPulse =
    useRef(
      new Animated.Value(1),
    ).current;


  // =======================================================
  // ENTRADA
  // =======================================================

  useEffect(() => {

    Animated.parallel([

      Animated.timing(
        screenOpacity,
        {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        },
      ),

      Animated.spring(
        screenTranslate,
        {
          toValue: 0,
          friction: 7,
          tension: 55,
          useNativeDriver: true,
        },
      ),

    ]).start();

  }, [
    screenOpacity,
    screenTranslate,
  ]);


  // =======================================================
  // ANIMACIÓN DE LETRAS FIJADAS
  // =======================================================

  useEffect(() => {

    if (
      fixedLetters.some(
        letter => letter !== null,
      )
    ) {

      Animated.loop(

        Animated.sequence([

          Animated.timing(
            fixedPulse,
            {
              toValue: 1.04,
              duration: 700,
              useNativeDriver: true,
            },
          ),

          Animated.timing(
            fixedPulse,
            {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            },
          ),

        ]),

      ).start();

    } else {

      fixedPulse.setValue(1);

    }

  }, [
    fixedLetters,
    fixedPulse,
  ]);


  // =======================================================
  // AUDIO
  // =======================================================

  function reproducirAudio(
    source: any,
  ) {

    if (!source) {
      return;
    }

    setAudioSource(source);

    setAudioVersion(
      value =>
        value + 1,
    );

  }


  // =======================================================
  // AUDIO INICIAL
  // =======================================================

  useEffect(() => {

    reproducirAudio(
      AUDIO_EJERCICIO,
    );

  }, []);


  // =======================================================
  // AUDIO DE MODALES
  // =======================================================

  useEffect(() => {

    if (
      modal === 'stars'
    ) {

      reproducirAudio(
        AUDIO_ESTRELLAS[
          stars
        ],
      );

    }

    if (
      modal === 'hero'
    ) {

      reproducirAudio(
        AUDIO_HEROE,
      );

    }

  }, [
    modal,
    stars,
  ]);


  // =======================================================
  // ANIMACIÓN MODAL
  // =======================================================

  useEffect(() => {

    if (!modal) {
      return;
    }

    modalScale.setValue(0.75);
    modalOpacity.setValue(0);

    Animated.parallel([

      Animated.spring(
        modalScale,
        {
          toValue: 1,
          friction: 6,
          tension: 75,
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

  }, [
    modal,
    modalScale,
    modalOpacity,
  ]);


  // =======================================================
  // OBTENER ESTADO INICIAL
  // =======================================================

  function prepararSiguienteIntento(
    fixed: Array<string | null>,
  ) {

    const nextSelected =
      fixed.map(
        letter =>
          letter ?? null,
      );

    const usedFixed =
      fixed.filter(
        (
          letter,
        ): letter is string =>
          letter !== null,
      );

    const nextAvailable =
      scrambledLetters.filter(
        letter => {

          const index =
            usedFixed.indexOf(
              letter,
            );

          if (index === -1) {
            return true;
          }

          usedFixed.splice(
            index,
            1,
          );

          return false;

        },
      );

    setSelectedLetters(
      nextSelected,
    );

    setAvailableLetters(
      nextAvailable,
    );

  }


  // =======================================================
  // SELECCIONAR LETRA
  // =======================================================

  function seleccionarLetra(
    letter: string,
  ) {

    if (locked) {
      return;
    }

    if (
      !availableLetters.includes(
        letter,
      )
    ) {
      return;
    }


    // -----------------------------------------------------
    // AUDIO
    // -----------------------------------------------------

    reproducirAudio(
      AUDIO_LETRAS[letter],
    );


    // -----------------------------------------------------
    // ANIMACIÓN
    // -----------------------------------------------------

    letterScale.setValue(0.88);

    Animated.spring(
      letterScale,
      {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      },
    ).start();


    // -----------------------------------------------------
    // BUSCAR PRIMERA POSICIÓN LIBRE
    // -----------------------------------------------------

    const position =
      selectedLetters.findIndex(
        (
          current,
          index,
        ) =>
          current === null &&
          fixedLetters[index] === null,
      );


    if (position === -1) {
      return;
    }


    // -----------------------------------------------------
    // NUEVA RESPUESTA
    // -----------------------------------------------------

    const newSelected =
      [...selectedLetters];

    newSelected[position] =
      letter;


    // -----------------------------------------------------
    // NUEVAS LETRAS DISPONIBLES
    // -----------------------------------------------------

    const letterIndex =
      availableLetters.indexOf(
        letter,
      );

    const newAvailable =
      [...availableLetters];

    newAvailable.splice(
      letterIndex,
      1,
    );


    setSelectedLetters(
      newSelected,
    );

    setAvailableLetters(
      newAvailable,
    );


    // -----------------------------------------------------
    // PALABRA COMPLETA
    // -----------------------------------------------------

    const complete =
      newSelected.every(
        letter =>
          letter !== null,
      );

    if (complete) {

      comprobarRespuesta(
        newSelected as string[],
      );

    }

  }


  // =======================================================
  // COMPROBAR RESPUESTA
  // =======================================================

  function comprobarRespuesta(
    answer: string[],
  ) {

    setLocked(true);


    // =====================================================
    // DETERMINAR LETRAS CORRECTAS
    // =====================================================

    const nextFixed =
      fixedLetters.map(
        (
          fixed,
          index,
        ) => {

          if (fixed) {
            return fixed;
          }

          if (
            answer[index] ===
            correctWord[index]
          ) {
            return answer[index];
          }

          return null;

        },
      );


    const isCorrect =
      answer.join('') ===
      correctWord;


    // =====================================================
    // RESPUESTA CORRECTA
    // =====================================================

    if (isCorrect) {

      const earnedStars =
        attempt === 1
          ? 3
          : attempt === 2
            ? 2
            : 1;

      setFixedLetters(
        nextFixed,
      );

      setStars(
        earnedStars,
      );


      Animated.sequence([

        Animated.spring(
          letterScale,
          {
            toValue: 1.08,
            friction: 4,
            tension: 90,
            useNativeDriver: true,
          },
        ),

        Animated.spring(
          letterScale,
          {
            toValue: 1,
            friction: 4,
            tension: 90,
            useNativeDriver: true,
          },
        ),

      ]).start(() => {

        setTimeout(() => {

          setModal(
            'stars',
          );

          setLocked(false);

        }, 350);

      });

      return;

    }


    // =====================================================
    // RESPUESTA INCORRECTA
    // =====================================================

    Animated.sequence([

      Animated.timing(
        shake,
        {
          toValue: -13,
          duration: 65,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        shake,
        {
          toValue: 13,
          duration: 65,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        shake,
        {
          toValue: -8,
          duration: 55,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        shake,
        {
          toValue: 8,
          duration: 55,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        shake,
        {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        },
      ),

    ]).start(() => {


      // ===================================================
      // TERCER INTENTO
      // ===================================================

      if (
        attempt >= 3
      ) {

        setFixedLetters(
          nextFixed,
        );

        prepararSiguienteIntento(
          nextFixed,
        );

        setLocked(false);

        setModal(
          'failed',
        );

        return;

      }


      // ===================================================
      // GUARDAR CORRECTAS
      // ===================================================

      setFixedLetters(
        nextFixed,
      );

      prepararSiguienteIntento(
        nextFixed,
      );


      // ===================================================
      // SIGUIENTE INTENTO
      // ===================================================

      setAttempt(
        value =>
          value + 1,
      );

      setLocked(false);


      setTimeout(() => {

        reproducirAudio(
          AUDIO_EJERCICIO,
        );

      }, 250);

    });

  }


  // =======================================================
  // REINICIAR INTENTO
  // =======================================================

  function reiniciarIntento() {

    setModal(null);

    setAttempt(1);

    setStars(0);

    setLocked(false);

    setFixedLetters(
      fixedLetters,
    );

    prepararSiguienteIntento(
      fixedLetters,
    );

    reproducirAudio(
      AUDIO_EJERCICIO,
    );

  }


  // =======================================================
  // BORRAR RESPUESTA
  // =======================================================

  function borrarRespuesta() {

    if (locked) {
      return;
    }


    prepararSiguienteIntento(
      fixedLetters,
    );

    reproducirAudio(
      AUDIO_EJERCICIO,
    );

  }


  // =======================================================
  // ACEPTAR ESTRELLAS
  // =======================================================

  function aceptarEstrellas() {

    setModal(
      'hero',
    );

  }


  // =======================================================
  // VOLVER
  // =======================================================

  function volverAtras() {

    if (locked) {
      return;
    }

    navigation.goBack();

  }


  // =======================================================
  // VOLVER AL MAPA
  // =======================================================

  function volverMapa() {

    setModal(null);

    navigation.reset({

      index: 0,

      routes: [
        {
          name: 'Levels',
        },
      ],

    });

  }


  // =======================================================
  // LETRA FIJADA
  // =======================================================

  function esLetraFijada(
    index: number,
  ) {

    return (
      fixedLetters[index] !== null
    );

  }


  // =======================================================
  // RENDER
  // =======================================================

  return (

    <SafeAreaView
      style={styles.container}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#EEF5FF"
      />


      {}

      <Video
        key={
          `audio-${audioVersion}`
        }
        source={
          audioSource
        }
        paused={false}
        repeat={false}
        controls={false}
        volume={1}
        playInBackground={false}
        playWhenInactive={false}
        style={styles.hiddenAudio}
      />


      {}

      <Animated.View
        style={[
          styles.screenContent,
          {
            opacity:
              screenOpacity,

            transform: [
              {
                translateY:
                  screenTranslate,
              },
            ],
          },
        ]}
      >


        {}

        <View
          style={styles.header}
        >

          <Pressable
            style={
              styles.backHeaderButton
            }
            onPress={
              volverAtras
            }
          >

            <Text
              style={
                styles.backHeaderIcon
              }
            >
              ‹
            </Text>

            <Text
              style={
                styles.backHeaderText
              }
            >
              ATRÁS
            </Text>

          </Pressable>


          <View
            style={styles.gameBadge}
          >

            <Text
              style={
                styles.gameBadgeText
              }
            >
              RETO DE PALABRAS
            </Text>

          </View>

        </View>


        {}

        <View
          style={
            styles.titleContainer
          }
        >

          <Text
            style={styles.title}
          >
            Forma NAKSA en español
          </Text>

          <Text
            style={styles.subtitle}
          >
            Coloca cada letra en su lugar
          </Text>

        </View>


        {}

        <View
          style={
            styles.attemptContainer
          }
        >

          <Text
            style={
              styles.attemptText
            }
          >
            INTENTO {attempt} DE 3
          </Text>

          <View
            style={
              styles.attemptProgress
            }
          >

            {[1, 2, 3].map(
              number => (

                <View
                  key={number}
                  style={[
                    styles.attemptBar,

                    number <= attempt
                      ? styles.attemptBarActive
                      : styles.attemptBarInactive,
                  ]}
                />

              ),
            )}

          </View>

        </View>




        {}

        <Animated.View
          style={[
            styles.answerCard,
            {
              transform: [
                {
                  translateX:
                    shake,
                },

                {
                  scale:
                    letterScale,
                },
              ],
            },
          ]}
        >

          <Text
            style={
              styles.answerLabel
            }
          >
            TU PALABRA
          </Text>

          <View
            style={
              styles.answerLetters
            }
          >

            {correctWord
              .split('')
              .map(
                (_, index) => {

                  const fixed =
                    esLetraFijada(
                      index,
                    );

                  const selected =
                    selectedLetters[
                      index
                    ];

                  return (

                    <Animated.View
                      key={index}
                      style={[
                        styles.answerBox,

                        fixed &&
                          styles.answerBoxFixed,

                        fixed && {
                          transform: [
                            {
                              scale:
                                fixedPulse,
                            },
                          ],
                        },

                        !fixed &&
                          selected &&
                          styles.answerBoxSelected,
                      ]}
                    >

                      <Text
                        style={[
                          styles.answerLetter,

                          fixed &&
                            styles.answerLetterFixed,

                          !fixed &&
                            selected &&
                            styles.answerLetterSelected,
                        ]}
                      >
                        {selected ?? '—'}
                      </Text>

                      {fixed && (

                        <Text
                          style={
                            styles.correctLabel
                          }
                        >
                          CORRECTA
                        </Text>

                      )}

                    </Animated.View>

                  );

                },
              )}

          </View>

        </Animated.View>


        {}

        <View
          style={
            styles.lettersContainer
          }
        >

          <Text
            style={
              styles.lettersTitle
            }
          >
            ELIGE UNA LETRA
          </Text>

          <View
            style={
              styles.lettersRow
            }
          >

            {availableLetters.map(
              letter => (

                <Pressable
                  key={letter}
                  disabled={
                    locked
                  }
                  onPress={() =>
                    seleccionarLetra(
                      letter,
                    )
                  }
                  style={({pressed}) => [

                    styles.letterButton,

                    pressed &&
                      styles.letterPressed,

                    locked &&
                      styles.letterDisabled,

                  ]}
                >

                  <Text
                    style={
                      styles.letterText
                    }
                  >
                    {letter}
                  </Text>

                </Pressable>

              ),
            )}

          </View>

        </View>


        {}

        <Pressable
          disabled={locked}
          onPress={
            borrarRespuesta
          }
          style={({pressed}) => [

            styles.clearButton,

            pressed &&
              styles.clearPressed,

          ]}
        >

          <Text
            style={
              styles.clearButtonText
            }
          >
            LIMPIAR LETRAS
          </Text>

        </Pressable>


        {}

        <View
          style={
            styles.helpBox
          }
        >

          <Text
            style={
              styles.helpText
            }
          >
            Las letras correctas se quedan en su lugar.
          </Text>

        </View>

      </Animated.View>


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
          style={
            styles.modalOverlay
          }
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

            <View
              style={
                styles.successCircle
              }
            >

              <Text
                style={
                  styles.successNumber
                }
              >
                {stars}
              </Text>

            </View>

            <Text
              style={
                styles.modalTitle
              }
            >
              MUY BIEN
            </Text>

            <Text
              style={
                styles.modalSubtitle
              }
            >
              Formaste HOLA correctamente.
            </Text>

            <View
              style={
                styles.starsContainer
              }
            >

              {[1, 2, 3].map(
                number => (

                  <Text
                    key={number}
                    style={[
                      styles.star,
                      number <= stars
                        ? styles.starActive
                        : styles.starInactive,
                    ]}
                  >
                    ★
                  </Text>

                ),
              )}

            </View>

            <Text
              style={
                styles.starsMessage
              }
            >
              {stars === 3
                ? 'Excelente trabajo.'
                : stars === 2
                  ? 'Muy bien. Sigue aprendiendo.'
                  : 'Lo lograste. Continúa practicando.'}
            </Text>

            <Pressable
              style={({pressed}) => [

                styles.modalButton,

                pressed &&
                  styles.modalButtonPressed,

              ]}
              onPress={
                aceptarEstrellas
              }
            >

              <Text
                style={
                  styles.modalButtonText
                }
              >
                CONTINUAR
              </Text>

            </Pressable>

          </Animated.View>

        </View>

      </Modal>


      {}

      <Modal
        visible={
          modal === 'hero'
        }
        transparent
        animationType="none"
        onRequestClose={() =>
          setModal(null)
        }
      >

        <View
          style={
            styles.modalOverlay
          }
        >

          <Animated.View
            style={[
              styles.modalCard,
              styles.heroCard,
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

            {lesson?.reward?.image && (

              <Image
                source={
                  lesson.reward.image
                }
                resizeMode="contain"
                style={
                  styles.heroImage
                }
              />

            )}

            <Text
              style={
                styles.heroTitle
              }
            >
              NUEVO HÉROE
            </Text>

            <Text
              style={
                styles.heroName
              }
            >
              RUBÉN
            </Text>

            <Text
              style={
                styles.heroDescription
              }
            >
              Has desbloqueado a Rubén.
              Ahora forma parte de tu colección
              de héroes de AISANKA.
            </Text>

            <View
              style={
                styles.collectionBadge
              }
            >

              <Text
                style={
                  styles.collectionBadgeText
              }
              >
                HÉROE DESBLOQUEADO
              </Text>

            </View>

            <Pressable
              style={({pressed}) => [

                styles.modalButton,

                pressed &&
                  styles.modalButtonPressed,

              ]}
              onPress={
                volverMapa
              }
            >

              <Text
                style={
                  styles.modalButtonText
                }
              >
                VOLVER AL MAPA
              </Text>

            </Pressable>

          </Animated.View>

        </View>

      </Modal>


      {}

      <Modal
        visible={
          modal === 'failed'
        }
        transparent
        animationType="none"
        onRequestClose={() =>
          setModal(null)
        }
      >

        <View
          style={
            styles.modalOverlay
          }
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

            <View
              style={
                styles.retryCircle
              }
            >

              <Text
                style={
                  styles.retryNumber
                }
              >
                3
              </Text>

            </View>

            <Text
              style={
                styles.modalTitle
              }
            >
              SIGUE INTENTANDO
            </Text>

            <Text
              style={
                styles.modalSubtitle
              }
            >
              Algunas letras ya están correctas.
              Escucha nuevamente y completa las
              posiciones que faltan.
            </Text>

            <Pressable
              style={({pressed}) => [

                styles.modalButton,

                pressed &&
                  styles.modalButtonPressed,

              ]}
              onPress={
                reiniciarIntento
              }
            >

              <Text
                style={
                  styles.modalButtonText
                }
              >
                INTENTAR DE NUEVO
              </Text>

            </Pressable>

            <Pressable
              style={
                styles.secondaryModalButton
              }
              onPress={
                volverAtras
              }
            >

              <Text
                style={
                  styles.secondaryModalText
                }
              >
                VOLVER
              </Text>

            </Pressable>

          </Animated.View>

        </View>

      </Modal>

    </SafeAreaView>

  );

}


// =========================================================
// ESTILOS
// =========================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEF5FF',
    paddingHorizontal: 18,
  },

  screenContent: {
    flex: 1,
  },

  hiddenAudio: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },


  // =======================================================
  // HEADER
  // =======================================================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 7,
  },

  backHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },

  backHeaderIcon: {
    fontSize: 38,
    lineHeight: 38,
    color: '#0F172A',
    fontWeight: '700',
  },

  backHeaderText: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '900',
    color: '#334155',
  },

  gameBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },

  gameBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#2563EB',
    letterSpacing: 0.7,
  },


  // =======================================================
  // TÍTULO
  // =======================================================

  titleContainer: {
    alignItems: 'center',
    paddingTop: 7,
  },

  title: {
    fontSize: 33,
    lineHeight: 38,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 2,
    fontSize: 16,
    color: '#64748B',
    fontWeight: '700',
    textAlign: 'center',
  },


  // =======================================================
  // INTENTOS
  // =======================================================

  attemptContainer: {
    alignItems: 'center',
    marginTop: 8,
  },

  attemptText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#475569',
    letterSpacing: 1.2,
  },

  attemptProgress: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },

  attemptBar: {
    width: 45,
    height: 7,
    borderRadius: 7,
  },

  attemptBarActive: {
    backgroundColor: '#2563EB',
  },

  attemptBarInactive: {
    backgroundColor: '#CBD5E1',
  },


  // =======================================================
  // PREGUNTA
  // =======================================================

  questionCard: {
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },

  questionAccent: {
    width: 6,
    borderRadius: 6,
    backgroundColor: '#2563EB',
  },

  questionContent: {
    flex: 1,
    paddingLeft: 11,
  },

  questionTitle: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.1,
    color: '#2563EB',
  },

  questionText: {
    marginTop: 2,
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '800',
    color: '#1E293B',
  },


  // =======================================================
  // RESPUESTA
  // =======================================================

  answerCard: {
    marginTop: 11,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 5,
  },

  answerLabel: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    color: '#64748B',
  },

  answerLetters: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },

  answerBox: {
    width: 63,
    height: 66,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  answerBoxSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#DBEAFE',
  },

  answerBoxFixed: {
    borderColor: '#22C55E',
    backgroundColor: '#DCFCE7',
    borderWidth: 3,
  },

  answerLetter: {
    fontSize: 34,
    fontWeight: '900',
    color: '#CBD5E1',
  },

  answerLetterSelected: {
    color: '#1D4ED8',
  },

  answerLetterFixed: {
    color: '#15803D',
  },

  correctLabel: {
    position: 'absolute',
    bottom: 3,
    fontSize: 6,
    fontWeight: '900',
    color: '#15803D',
    letterSpacing: 0.5,
  },


  // =======================================================
  // LETRAS
  // =======================================================

  lettersContainer: {
    marginTop: 11,
    alignItems: 'center',
  },

  lettersTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#64748B',
    letterSpacing: 1.2,
  },

  lettersRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 7,
  },

  letterButton: {
    width: 64,
    height: 64,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOpacity: 0.08,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  letterPressed: {
    transform: [
      {
        scale: 0.91,
      },
    ],
    backgroundColor: '#DBEAFE',
  },

  letterDisabled: {
    opacity: 0.5,
  },

  letterText: {
    fontSize: 35,
    fontWeight: '900',
    color: '#1D4ED8',
  },


  // =======================================================
  // LIMPIAR
  // =======================================================

  clearButton: {
    alignSelf: 'center',
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#DBEAFE',
  },

  clearPressed: {
    transform: [
      {
        scale: 0.95,
      },
    ],
  },

  clearButtonText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1D4ED8',
  },


  // =======================================================
  // AYUDA
  // =======================================================

  helpBox: {
    marginTop: 7,
    marginBottom: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 15,
    backgroundColor:
      'rgba(255,255,255,0.78)',
    alignItems: 'center',
  },

  helpText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'center',
  },


  // =======================================================
  // MODALES
  // =======================================================

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(15,23,42,0.60)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalCard: {
    width: '100%',
    maxWidth: 410,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingVertical: 28,
    alignItems: 'center',
    elevation: 20,
  },


  // =======================================================
  // CORRECTO
  // =======================================================

  successCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#22C55E',
  },

  successNumber: {
    fontSize: 34,
    fontWeight: '900',
    color: '#15803D',
  },

  modalTitle: {
    marginTop: 10,
    fontSize: 29,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
  },

  modalSubtitle: {
    marginTop: 7,
    fontSize: 17,
    lineHeight: 24,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
  },

  starsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },

  star: {
    fontSize: 48,
    marginHorizontal: 3,
  },

  starActive: {
    color: '#F59E0B',
  },

  starInactive: {
    color: '#CBD5E1',
  },

  starsMessage: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: '900',
    color: '#334155',
    textAlign: 'center',
  },


  // =======================================================
  // HÉROE
  // =======================================================

  heroCard: {
    paddingTop: 20,
  },

  heroImage: {
    width: 175,
    height: 175,
  },

  heroTitle: {
    marginTop: 4,
    fontSize: 25,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
  },

  heroName: {
    marginTop: 5,
    fontSize: 37,
    fontWeight: '900',
    color: '#1D4ED8',
    letterSpacing: 2,
  },

  heroDescription: {
    marginTop: 9,
    fontSize: 16,
    lineHeight: 23,
    color: '#64748B',
    textAlign: 'center',
  },

  collectionBadge: {
    marginTop: 15,
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
  },

  collectionBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1D4ED8',
    letterSpacing: 0.7,
  },


  // =======================================================
  // FALLÓ
  // =======================================================

  retryCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F59E0B',
  },

  retryNumber: {
    fontSize: 30,
    fontWeight: '900',
    color: '#B45309',
  },


  // =======================================================
  // BOTONES MODAL
  // =======================================================

  modalButton: {
    width: '100%',
    minHeight: 56,
    marginTop: 21,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalButtonPressed: {
    transform: [
      {
        scale: 0.96,
      },
    ],
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.3,
  },

  secondaryModalButton: {
    marginTop: 9,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },

  secondaryModalText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '900',
  },

});