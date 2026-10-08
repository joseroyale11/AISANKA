/*
 * AISANKA — JUEGO DE CONSOLIDACIÓN: HOLA EN CHINO
 *
 * Este componente representa la actividad interactiva posterior a la
 * lección de chino. El estudiante debe identificar la palabra correcta
 * entre diferentes opciones visuales.
 *
 * El juego administra hasta tres intentos, calcula las estrellas según
 * el intento en el que se obtiene la respuesta correcta, muestra una
 * celebración animada y posteriormente permite desbloquear el personaje
 * correspondiente y regresar al mapa de niveles.
 */

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
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {useDispatch} from 'react-redux';

import {unlockNextLevel} from '../../store/slices/studentSlice';

interface Props {
  navigation: any;
  route?: any;
}

const OPCIONES = [

  {
    id: 'hola',
    chino: '你好',
    imagen:
      require('../../assets/images/hola.png'),
    correcta: true,
  },

  {
    id: 'adios',
    chino: '再见',
    imagen:
      require('../../assets/images/adios.png'),
    correcta: false,
  },

  {
    id: 'gracias',
    chino: '谢谢',
    imagen:
      require('../../assets/images/gracias.png'),
    correcta: false,
  },

];

export default function HolaChinoGame({
  navigation,
}: Props) {

  const dispatch = useDispatch();

  const [intentos, setIntentos] =
    useState(0);

  const [terminado, setTerminado] =
    useState(false);

  const [estrellas, setEstrellas] =
    useState(0);

  const [mostrarRecompensa, setMostrarRecompensa] =
    useState(false);

  const [mostrarPersonajes, setMostrarPersonajes] =
    useState(false);

  const [seleccionActual, setSeleccionActual] =
    useState<string | null>(null);

  const [respuestaCorrecta, setRespuestaCorrecta] =
    useState<boolean | null>(null);

  const [opcionesDisponibles, setOpcionesDisponibles] =
    useState(OPCIONES);

  const tituloAnim =
    useRef(new Animated.Value(0)).current;

  const opcionesAnim =
    useRef(new Animated.Value(0)).current;

  const progresoAnim =
    useRef(new Animated.Value(0)).current;

  const celebracionAnim =
    useRef(new Animated.Value(0)).current;

  const rubenAnim =
    useRef(new Animated.Value(0)).current;

  const pulseAnim =
    useRef(new Animated.Value(1)).current;

  const headerLineAnim =
    useRef(new Animated.Value(0)).current;

  const starAnimations =
    useRef(
      Array.from(
        {length: 3},
        () => new Animated.Value(0),
      ),
    ).current;

  useEffect(() => {

    Animated.parallel([

      Animated.spring(
        tituloAnim,
        {
          toValue: 1,
          friction: 7,
          tension: 50,
          useNativeDriver: true,
        },
      ),

      Animated.spring(
        opcionesAnim,
        {
          toValue: 1,
          friction: 7,
          tension: 45,
          delay: 180,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        headerLineAnim,
        {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        },
      ),

    ]).start();

    const loop =
      Animated.loop(

        Animated.sequence([

          Animated.timing(
            pulseAnim,
            {
              toValue: 1.018,
              duration: 1800,
              easing: Easing.inOut(
                Easing.ease,
              ),
              useNativeDriver: true,
            },
          ),

          Animated.timing(
            pulseAnim,
            {
              toValue: 1,
              duration: 1800,
              easing: Easing.inOut(
                Easing.ease,
              ),
              useNativeDriver: true,
            },
          ),

        ]),

      );

    loop.start();

    return () => {
      loop.stop();
    };

  }, []);

  useEffect(() => {

    Animated.spring(
      progresoAnim,
      {
        toValue:
          intentos / 3,
        friction: 7,
        tension: 50,
        useNativeDriver: false,
      },
    ).start();

  }, [intentos]);

  function seleccionar(id: string) {

    if (terminado) {
      return;
    }

    const opcion =
      OPCIONES.find(
        item =>
          item.id === id,
      );

    if (!opcion) {
      return;
    }

    const nuevoIntento =
      intentos + 1;

    setIntentos(
      nuevoIntento,
    );

    setSeleccionActual(id);

    setRespuestaCorrecta(
      opcion.correcta,
    );

    if (opcion.correcta) {

      let estrellasObtenidas = 1;

      if (nuevoIntento === 1) {

        estrellasObtenidas = 3;

      } else if (nuevoIntento === 2) {

        estrellasObtenidas = 2;

      }

      setEstrellas(
        estrellasObtenidas,
      );

      setTerminado(true);

      iniciarCelebracion(
        estrellasObtenidas,
      );

      return;
    }

    setTimeout(() => {

      setOpcionesDisponibles(
        opcionesActuales =>
          opcionesActuales.filter(
            item =>
              item.id !== id,
          ),
      );

      setSeleccionActual(null);

      setRespuestaCorrecta(null);

    }, 500);

    if (nuevoIntento >= 3) {

      setTimeout(() => {

        setTerminado(true);

        setEstrellas(0);

        iniciarCelebracion(0);

      }, 650);

    }

  }

  function iniciarCelebracion(
    cantidad: number,
  ) {

    celebracionAnim.setValue(0);

    Animated.spring(
      celebracionAnim,
      {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      },
    ).start();

    if (cantidad > 0) {

      starAnimations.forEach(
        animation => {
          animation.setValue(0);
        },
      );

      const animations =
        starAnimations
          .slice(0, cantidad)
          .map(
            (
              animation,
              index,
            ) =>

              Animated.sequence([

                Animated.delay(
                  index * 160,
                ),

                Animated.spring(
                  animation,
                  {
                    toValue: 1,
                    friction: 5,
                    tension: 60,
                    useNativeDriver: true,
                  },
                ),

              ]),
          );

      Animated.parallel(
        animations,
      ).start();

    }

  }

  function aceptarResultado() {

    if (estrellas > 0) {

      setTerminado(false);

      setTimeout(() => {

        setMostrarRecompensa(true);

        rubenAnim.setValue(0);

        Animated.spring(
          rubenAnim,
          {
            toValue: 1,
            friction: 5,
            tension: 45,
            useNativeDriver: true,
          },
        ).start();

      }, 150);

      return;
    }

    setTerminado(false);

    setIntentos(0);

    setEstrellas(0);

    setSeleccionActual(null);

    setRespuestaCorrecta(null);

    setOpcionesDisponibles(
      OPCIONES,
    );

  }

  function volver() {

    navigation.goBack();
  }

  function volverAlMapa() {

    dispatch(
      unlockNextLevel(2),
    );

    setMostrarRecompensa(false);

    navigation.navigate(
      'Levels',
    );

  }

  function verPersonajes() {

    setMostrarRecompensa(false);

    setMostrarPersonajes(true);

  }

  function cerrarPersonajes() {

    setMostrarPersonajes(false);

    navigation.navigate(
      'Levels',
    );

  }

  const tituloTranslate =
    tituloAnim.interpolate({

      inputRange: [0, 1],

      outputRange: [
        -30,
        0,
      ],

    });

  const opcionesTranslate =
    opcionesAnim.interpolate({

      inputRange: [0, 1],

      outputRange: [
        40,
        0,
      ],

    });

  const celebrationScale =
    celebracionAnim.interpolate({

      inputRange: [0, 1],

      outputRange: [
        0.5,
        1,
      ],

    });

  const progresoWidth =
    progresoAnim.interpolate({

      inputRange: [0, 1],

      outputRange: [
        '0%',
        '100%',
      ],

    });

  const headerLineWidth =
    headerLineAnim.interpolate({

      inputRange: [0, 1],

      outputRange: [
        '10%',
        '100%',
      ],

    });

  return (

    <LinearGradient
      colors={[
        '#DDF8ED',
        '#FFF5D6',
        '#E5F0FF',
      ]}
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

      <SafeAreaView
        style={styles.safeArea}
      >

        <View
          pointerEvents="none"
          style={styles.backgroundDecorations}
        >

          <View
            style={[
              styles.backgroundCircle,
              styles.backgroundCircleOne,
            ]}
          />

          <View
            style={[
              styles.backgroundCircle,
              styles.backgroundCircleTwo,
            ]}
          />

          <View
            style={[
              styles.backgroundSquare,
              styles.backgroundSquareOne,
            ]}
          />

          <View
            style={[
              styles.backgroundSquare,
              styles.backgroundSquareTwo,
            ]}
          />

        </View>

        <View style={styles.topBar}>

          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={volver}
          >

            <View
              style={styles.backArrow}
            >

              <View
                style={styles.backArrowLine}
              />

              <View
                style={styles.backArrowHead}
              />

            </View>


          </TouchableOpacity>

          <View
            style={styles.attemptBadge}
          >

            <Text
              style={styles.attemptBadgeText}
            >
              {intentos} / 3
            </Text>

          </View>

        </View>

        <Animated.View
          style={[
            styles.header,
            {
              opacity:
                tituloAnim,

              transform: [
                {
                  translateY:
                    tituloTranslate,
                },
              ],
            },
          ]}
        >

          <View style={styles.challengeBadge}>

            <View
              style={
                styles.badgeIndicator
              }
            />

            <Text
              style={styles.challengeText}
            >
              DESAFÍO
            </Text>

          </View>

          <Text style={styles.title}>
            Encuentra la palabra
          </Text>

          <Text style={styles.targetSpanish}>
            HOLA
          </Text>


          <Text
            style={styles.instruction}
          >
            Selecciona la opción que
            aprendiste.
          </Text>

          <Animated.View
            style={[
              styles.headerLine,
              {
                width:
                  headerLineWidth,
              },
            ]}
          />

        </Animated.View>

        <View
          style={styles.progressSection}
        >

          <View
            style={styles.progressTop}
          >

            <Text
              style={styles.progressLabel}
            >
              PROGRESO
            </Text>

            <Text
              style={styles.progressNumber}
            >
              {intentos} DE 3 INTENTOS
            </Text>

          </View>

          <View
            style={styles.progressTrack}
          >

            <Animated.View
              style={[
                styles.progressFill,
                {
                  width:
                    progresoWidth,
                },
              ]}
            />

          </View>

        </View>

        <Animated.View
          style={[
            styles.optionsContainer,
            {
              opacity:
                opcionesAnim,

              transform: [
                {
                  translateY:
                    opcionesTranslate,
                },
                {
                  scale:
                    pulseAnim,
                },
              ],
            },
          ]}
        >

          {opcionesDisponibles.map(
            (opcion, index) => {

              const seleccionada =
                seleccionActual ===
                opcion.id;

              const correcta =
                seleccionada &&
                respuestaCorrecta ===
                  true;

              const incorrecta =
                seleccionada &&
                respuestaCorrecta ===
                  false;

              return (

                <AnimatedOption
                  key={opcion.id}
                  opcion={opcion}
                  index={index}
                  seleccionada={
                    seleccionada
                  }
                  correcta={
                    correcta
                  }
                  incorrecta={
                    incorrecta
                  }
                  disabled={
                    terminado
                  }
                  onPress={() =>
                    seleccionar(
                      opcion.id,
                    )
                  }
                />

              );

            },
          )}

        </Animated.View>

        <View
          style={styles.bottomHint}
        >

          <View
            style={styles.hintLine}
          />

          <Text
            style={styles.hintText}
          >
            Observa con atención antes
            de elegir.
          </Text>

          <View
            style={styles.hintLine}
          />

        </View>

      </SafeAreaView>

      <Modal
        visible={terminado}
        transparent
        animationType="fade"
      >

        <View
          style={styles.modalBackground}
        >

          <Animated.View
            style={[
              styles.resultModal,
              {
                transform: [
                  {
                    scale:
                      celebrationScale,
                  },
                ],
              },
            ]}
          >

            {estrellas > 0 ? (

              <>

                <View
                  style={
                    styles.successCircle
                  }
                >

                  <View
                    style={
                      styles.successCheck
                    }
                  />

                </View>

                <Text
                  style={styles.resultTitle}
                >
                  Muy bien
                </Text>

                <Text
                  style={styles.resultText}
                >
                  Encontraste correctamente
                  la palabra.
                </Text>

                <Text
                  style={styles.resultWord}
                >
                  你好
                </Text>

                <View
                  style={styles.stars}
                >

                  {starAnimations.map(
                    (
                      animation,
                      index,
                    ) => (

                      <Animated.Text
                        key={index}
                        style={[
                          styles.star,
                          {
                            opacity:
                              animation,

                            transform: [
                              {
                                scale:
                                  animation,
                              },
                            ],
                          },
                        ]}
                      >
                        ★
                      </Animated.Text>

                    ),
                  )}

                </View>

                <Text
                  style={styles.starMessage}
                >
                  {estrellas === 3
                    ? 'Lo lograste en el primer intento.'
                    : estrellas === 2
                    ? 'Muy buen trabajo.'
                    : 'Lo conseguiste.'}
                </Text>

              </>

            ) : (

              <>

                <View
                  style={
                    styles.practiceCircle
                  }
                >

                  <View
                    style={
                      styles.practiceSymbol
                    }
                  />

                </View>

                <Text
                  style={styles.resultTitle}
                >
                  Vamos a practicar
                </Text>

                <Text
                  style={styles.resultText}
                >
                  Puedes volver a intentarlo.
                  {'\n'}
                  Cada intento ayuda a aprender.
                </Text>

              </>

            )}

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.acceptButton}
              onPress={
                aceptarResultado
              }
            >

              <Text
                style={styles.acceptText}
              >
                {estrellas > 0
                  ? 'CONTINUAR'
                  : 'INTENTAR DE NUEVO'}
              </Text>

              <View
                style={styles.buttonArrow}
              >

                <View
                  style={styles.buttonArrowLine}
                />

                <View
                  style={styles.buttonArrowHead}
                />

              </View>

            </TouchableOpacity>

          </Animated.View>

        </View>

      </Modal>

      <Modal
        visible={mostrarRecompensa}
        transparent
        animationType="fade"
      >

        <View
          style={styles.modalBackground}
        >

          <View
            style={styles.rewardModal}
          >

            <View
              style={styles.rewardBadge}
            >

              <Text
                style={styles.rewardBadgeText}
              >
                NUEVO PERSONAJE
              </Text>

            </View>

            <Text
              style={styles.rewardTitle}
            >
              Personaje desbloqueado
            </Text>

            <Animated.View
              style={[
                styles.rubenContainer,
                {
                  transform: [
                    {
                      scale:
                        rubenAnim,
                    },
                  ],
                },
              ]}
            >

              <Image
                source={
                  require('../../assets/images/ruben.png')
                }
                style={styles.ruben}
                resizeMode="contain"
              />

            </Animated.View>

            <Text
              style={styles.rubenName}
            >
              Rubén
            </Text>

            <Text
              style={styles.rewardText}
            >
              Rubén ahora forma parte
              de tu colección.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.mapButton}
              onPress={
                volverAlMapa
              }
            >

              <Text
                style={styles.mapButtonText}
              >
                VOLVER AL MAPA
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={
                styles.collectionButton
              }
              onPress={
                verPersonajes
              }
            >

              <Text
                style={
                  styles.collectionButtonText
                }
              >
                VER PERSONAJES
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

      <Modal
        visible={mostrarPersonajes}
        transparent
        animationType="fade"
      >

        <View
          style={styles.modalBackground}
        >

          <View
            style={
              styles.collectionModal
            }
          >

            <Text
              style={
                styles.collectionTitle
              }
            >
              Mi colección
            </Text>

            <Text
              style={
                styles.collectionSubtitle
              }
            >
              Personajes desbloqueados
            </Text>

            <View
              style={
                styles.characterCard
              }
            >

              <Image
                source={
                  require('../../assets/images/ruben.png')
                }
                style={
                  styles.collectionImage
                }
                resizeMode="contain"
              />

              <View
                style={
                  styles.characterInfo
                }
              >

                <Text
                  style={
                    styles.collectionName
                  }
                >
                  Rubén
                </Text>

                <Text
                  style={
                    styles.collectionDescription
                  }
                >
                  Personaje desbloqueado.
                </Text>

              </View>

            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.mapButton}
              onPress={
                cerrarPersonajes
              }
            >

              <Text
                style={
                  styles.mapButtonText
                }
              >
                VOLVER AL MAPA
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </LinearGradient>
  );
}

interface AnimatedOptionProps {

  opcion:
    typeof OPCIONES[number];

  index: number;

  seleccionada: boolean;

  correcta: boolean;

  incorrecta: boolean;

  disabled: boolean;

  onPress: () => void;
}

function AnimatedOption({
  opcion,
  index,
  seleccionada,
  correcta,
  incorrecta,
  disabled,
  onPress,
}: AnimatedOptionProps) {

  const scale =
    useRef(new Animated.Value(1)).current;

  const opacity =
    useRef(new Animated.Value(1)).current;

  const translateX =
    useRef(new Animated.Value(0)).current;

  useEffect(() => {

    if (!incorrecta) {
      return;
    }

    Animated.sequence([

      Animated.timing(
        translateX,
        {
          toValue: -8,
          duration: 60,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        translateX,
        {
          toValue: 8,
          duration: 60,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        translateX,
        {
          toValue: -5,
          duration: 50,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        translateX,
        {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        opacity,
        {
          toValue: 0,
          duration: 300,
          delay: 120,
          useNativeDriver: true,
        },
      ),

    ]).start();

  }, [incorrecta]);

  function presionar() {

    Animated.sequence([

      Animated.spring(
        scale,
        {
          toValue: 0.96,
          friction: 6,
          useNativeDriver: true,
        },
      ),

      Animated.spring(
        scale,
        {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        },
      ),

    ]).start();

    onPress();
  }

  return (

    <Animated.View
      style={[
        styles.optionWrapper,
        {
          opacity,

          transform: [
            {
              scale,
            },
            {
              translateX,
            },
          ],
        },
      ]}
    >

      <TouchableOpacity
        activeOpacity={0.9}
        disabled={disabled}
        onPress={presionar}
        style={[
          styles.option,

          seleccionada &&
            styles.optionSelected,

          correcta &&
            styles.optionCorrect,

          incorrecta &&
            styles.optionIncorrect,
        ]}
      >

        <View
          style={styles.optionNumber}
        >

          <Text
            style={
              styles.optionNumberText
            }
          >
            {index + 1}
          </Text>

        </View>

        <View
          style={styles.imageContainer}
        >

          <Image
            source={opcion.imagen}
            style={styles.image}
            resizeMode="contain"
          />

        </View>

        <View
          style={styles.optionInfo}
        >

          <Text
            style={styles.chineseText}
          >
            {opcion.chino}
          </Text>

        </View>

        {correcta && (

          <View
            style={
              styles.feedbackCorrect
            }
          >

            <View
              style={
                styles.feedbackCheck
              }
            />

          </View>

        )}

      </TouchableOpacity>

    </Animated.View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 18,
  },

  backgroundDecorations: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },

  backgroundCircle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    opacity: 0.25,
  },

  backgroundCircleOne: {
    width: 220,
    height: 220,
    top: -100,
    right: -80,
  },

  backgroundCircleTwo: {
    width: 180,
    height: 180,
    bottom: -70,
    left: -90,
  },

  backgroundSquare: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
  },

  backgroundSquareOne: {
    top: 170,
    left: 10,
    transform: [
      {
        rotate: '20deg',
      },
    ],
  },

  backgroundSquareTwo: {
    bottom: 170,
    right: 15,
    transform: [
      {
        rotate: '35deg',
      },
    ],
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },

  backButton: {
    height: 42,
    paddingHorizontal: 14,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },

  backArrow: {
    width: 18,
    height: 18,
    marginRight: 7,
    justifyContent: 'center',
  },

  backArrowLine: {
    position: 'absolute',
    left: 0,
    top: 7,
    width: 14,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#475569',
  },

  backArrowHead: {
    position: 'absolute',
    left: 0,
    top: 3,
    width: 9,
    height: 9,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#475569',
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },

  backText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#475569',
    letterSpacing: 0.6,
  },

  attemptBadge: {
    minWidth: 58,
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  attemptBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#00856F',
  },

  header: {
    alignItems: 'center',
    paddingTop: 8,
  },

  challengeBadge: {
    height: 28,
    paddingHorizontal: 13,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.85)',
    flexDirection: 'row',
    alignItems: 'center',
  },

  badgeIndicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#00A078',
    marginRight: 7,
  },

  challengeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#047857',
    letterSpacing: 1.5,
  },

  title: {
    marginTop: 8,
    fontSize: 23,
    fontWeight: '900',
    color: '#16352F',
    textAlign: 'center',
  },

  targetSpanish: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1.5,
  },

  targetChinese: {
    marginTop: 1,
    fontSize: 35,
    fontWeight: '900',
    color: '#00856F',
  },

  instruction: {
    marginTop: 3,
    fontSize: 13,
    color: '#52736C',
    textAlign: 'center',
  },

  headerLine: {
    marginTop: 8,
    maxWidth: 220,
    height: 3,
    borderRadius: 4,
    backgroundColor: '#00A078',
  },

  progressSection: {
    marginTop: 12,
  },

  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },

  progressLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#52736C',
    letterSpacing: 1.2,
  },

  progressNumber: {
    fontSize: 10,
    fontWeight: '900',
    color: '#00856F',
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

  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },

  optionWrapper: {
    width: '100%',
  },

  option: {
    minHeight: 118,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.97)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#0F172A',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  optionSelected: {
    borderColor: '#F59E0B',
  },

  optionCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },

  optionIncorrect: {
    borderColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },

  optionNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E6FFFA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionNumberText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#00856F',
  },

  imageContainer: {
    width: 92,
    height: 92,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 88,
    height: 88,
  },

  optionInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chineseText: {
    fontSize: 31,
    color: '#00856F',
    fontWeight: '900',
  },

  feedbackCorrect: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },

  feedbackCheck: {
    width: 17,
    height: 9,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#FFFFFF',
    transform: [
      {
        rotate: '-45deg',
      },
    ],
  },

  bottomHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },

  hintLine: {
    width: 25,
    height: 1,
    backgroundColor: 'rgba(82,115,108,0.35)',
  },

  hintText: {
    marginHorizontal: 8,
    fontSize: 11,
    color: '#52736C',
    fontWeight: '700',
    textAlign: 'center',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.62)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  resultModal: {
    width: '100%',
    maxWidth: 390,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 27,
    alignItems: 'center',
    elevation: 20,
  },

  successCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  successCheck: {
    width: 31,
    height: 17,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#059669',
    transform: [
      {
        rotate: '-45deg',
      },
    ],
  },

  practiceCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  practiceSymbol: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: '#2563EB',
  },

  resultTitle: {
    marginTop: 15,
    fontSize: 27,
    fontWeight: '900',
    color: '#1F2937',
    textAlign: 'center',
  },

  resultText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#64748B',
    textAlign: 'center',
  },

  resultWord: {
    marginTop: 7,
    fontSize: 42,
    fontWeight: '900',
    color: '#00856F',
  },

  stars: {
    flexDirection: 'row',
    marginTop: 16,
    height: 55,
    alignItems: 'center',
  },

  star: {
    fontSize: 43,
    color: '#F59E0B',
    marginHorizontal: 4,
  },

  starMessage: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
  },

  acceptButton: {
    width: '100%',
    height: 57,
    marginTop: 21,
    borderRadius: 29,
    backgroundColor: '#00A078',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },

  acceptText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  buttonArrow: {
    width: 23,
    height: 18,
    marginLeft: 9,
    justifyContent: 'center',
  },

  buttonArrowLine: {
    position: 'absolute',
    left: 0,
    top: 7,
    width: 17,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },

  buttonArrowHead: {
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

  rewardModal: {
    width: '100%',
    maxWidth: 390,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    elevation: 20,
  },

  rewardBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },

  rewardBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#B45309',
    letterSpacing: 1.2,
  },

  rewardTitle: {
    marginTop: 13,
    fontSize: 23,
    fontWeight: '900',
    color: '#1F2937',
    textAlign: 'center',
  },

  rubenContainer: {
    width: 205,
    height: 205,
    marginTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ruben: {
    width: 195,
    height: 195,
  },

  rubenName: {
    fontSize: 25,
    fontWeight: '900',
    color: '#00856F',
  },

  rewardText: {
    marginTop: 5,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },

  mapButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#00A078',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19,
    elevation: 5,
  },

  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  collectionButton: {
    width: '100%',
    minHeight: 53,
    borderWidth: 2,
    borderColor: '#00A078',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
  },

  collectionButtonText: {
    color: '#00856F',
    fontSize: 13,
    fontWeight: '900',
  },

  collectionModal: {
    width: '100%',
    maxWidth: 390,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    elevation: 20,
  },

  collectionTitle: {
    fontSize: 27,
    fontWeight: '900',
    color: '#1F2937',
    textAlign: 'center',
  },

  collectionSubtitle: {
    marginTop: 5,
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
  },

  characterCard: {
    width: '100%',
    marginTop: 18,
    borderRadius: 24,
    backgroundColor: '#ECFDF5',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  collectionImage: {
    width: 115,
    height: 115,
  },

  characterInfo: {
    flex: 1,
    marginLeft: 9,
  },

  collectionName: {
    fontSize: 23,
    fontWeight: '900',
    color: '#00856F',
  },

  collectionDescription: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    color: '#64748B',
  },

});