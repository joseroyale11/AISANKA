import React, {useState} from 'react';

import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

import {useDispatch} from 'react-redux';

import {unlockNextLevel} from '../../store/slices/studentSlice';

interface Props {
  navigation: any;
  route: any;
}

const OPCIONES = [
  {
    id: 'hola',
    nombre: 'Hola',
    imagen: require('../../assets/images/hola.png'),
    correcta: true,
  },
  {
    id: 'adios',
    nombre: 'Adiós',
    imagen: require('../../assets/images/adios.png'),
    correcta: false,
  },
  {
    id: 'gracias',
    nombre: 'Gracias',
    imagen: require('../../assets/images/gracias.png'),
    correcta: false,
  },
];

export default function HolaChinoGame({
  navigation,
}: Props) {

  const dispatch = useDispatch();

  const [intentos, setIntentos] = useState(0);

  const [terminado, setTerminado] = useState(false);

  const [estrellas, setEstrellas] = useState(0);

  const [mostrarRecompensa, setMostrarRecompensa] =
    useState(false);

  const [mostrarPersonajes, setMostrarPersonajes] =
    useState(false);

  function seleccionar(id: string) {

    if (terminado) {
      return;
    }

    const opcion = OPCIONES.find(
      item => item.id === id,
    );

    if (!opcion) {
      return;
    }

    const nuevoIntento = intentos + 1;

    if (opcion.correcta) {

      let estrellasObtenidas = 1;

      if (nuevoIntento === 1) {
        estrellasObtenidas = 3;
      } else if (nuevoIntento === 2) {
        estrellasObtenidas = 2;
      }

      setEstrellas(estrellasObtenidas);

      setIntentos(nuevoIntento);

      setTerminado(true);

      return;
    }

    if (nuevoIntento >= 3) {

      setEstrellas(0);

      setIntentos(nuevoIntento);

      setTerminado(true);

      return;
    }

    setIntentos(nuevoIntento);
  }

  function aceptarResultado() {

    setMostrarRecompensa(true);
  }

  function volverAlMapa() {

    dispatch(unlockNextLevel(2));

    navigation.navigate('Levels');
  }

  function verPersonajes() {

    setMostrarPersonajes(true);
  }

  function cerrarPersonajes() {

    setMostrarPersonajes(false);
  }

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.level}>
          NIVEL 1
        </Text>

        <Text style={styles.title}>
          ¿Cuál significa HOLA?
        </Text>

        <Text style={styles.instruction}>
          Elige la imagen correcta.
        </Text>

      </View>


      <View style={styles.options}>

        {OPCIONES.map(opcion => (

          <TouchableOpacity
            key={opcion.id}
            activeOpacity={0.85}
            disabled={terminado}
            onPress={() =>
              seleccionar(opcion.id)
            }
            style={styles.option}
          >

            <Image
              source={opcion.imagen}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.optionText}>
              {opcion.nombre}
            </Text>

          </TouchableOpacity>

        ))}

      </View>


      <View style={styles.footer}>

        <Text style={styles.attemptText}>
          Intentos: {intentos} / 3
        </Text>

      </View>


      {}

      <Modal
        visible={terminado}
        transparent
        animationType="fade"
      >

        <View style={styles.modalBackground}>

          <View style={styles.resultModal}>

            {estrellas > 0 ? (

              <>
                <Text style={styles.successEmoji}>
                  🎉
                </Text>

                <Text style={styles.resultTitle}>
                  ¡Muy bien!
                </Text>

                <Text style={styles.resultText}>
                  Encontraste HOLA.
                </Text>

                <View style={styles.stars}>

                  {Array.from({
                    length: estrellas,
                  }).map((_, index) => (

                    <Text
                      key={index}
                      style={styles.star}
                    >
                      ⭐
                    </Text>

                  ))}

                </View>
              </>

            ) : (

              <>
                <Text style={styles.successEmoji}>
                  💪
                </Text>

                <Text style={styles.resultTitle}>
                  ¡Buen intento!
                </Text>

                <Text style={styles.resultText}>
                  Vamos a seguir aprendiendo.
                </Text>
              </>

            )}


            <TouchableOpacity
              style={styles.acceptButton}
              onPress={aceptarResultado}
            >

              <Text style={styles.acceptText}>
                ACEPTAR
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>


      {}

      <Modal
        visible={mostrarRecompensa}
        transparent
        animationType="slide"
      >

        <View style={styles.modalBackground}>

          <View style={styles.rewardModal}>

            <Text style={styles.rewardTitle}>
              ¡Nuevo personaje!
            </Text>

            <Image
              source={require('../../assets/images/ruben.png')}
              style={styles.ruben}
              resizeMode="contain"
            />

            <Text style={styles.rubenName}>
              Rubén
            </Text>

            <Text style={styles.rewardText}>
              Has desbloqueado a Rubén.
            </Text>


            <TouchableOpacity
              style={styles.mapButton}
              onPress={volverAlMapa}
            >

              <Text style={styles.mapButtonText}>
                VOLVER AL MAPA
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              style={styles.collectionButton}
              onPress={verPersonajes}
            >

              <Text style={styles.collectionButtonText}>
                VER PERSONAJES COLECCIONADOS
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>


      {}

      <Modal
        visible={mostrarPersonajes}
        transparent
        animationType="fade"
      >

        <View style={styles.modalBackground}>

          <View style={styles.collectionModal}>

            <Text style={styles.collectionTitle}>
              Mis personajes
            </Text>

            <Image
              source={require('../../assets/images/ruben.png')}
              style={styles.collectionImage}
              resizeMode="contain"
            />

            <Text style={styles.collectionName}>
              Rubén
            </Text>

            <Text style={styles.collectionDescription}>
              Personaje desbloqueado
            </Text>


            <TouchableOpacity
              style={styles.mapButton}
              onPress={cerrarPersonajes}
            >

              <Text style={styles.mapButtonText}>
                VOLVER AL MAPA
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 20,
  },

  header: {
    alignItems: 'center',
    paddingTop: 30,
  },

  level: {
    fontSize: 14,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 2,
  },

  title: {
    marginTop: 12,
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
  },

  instruction: {
    marginTop: 8,
    fontSize: 17,
    color: '#64748B',
    textAlign: 'center',
  },

  options: {
    flex: 1,
    justifyContent: 'center',
    gap: 18,
  },

  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    minHeight: 145,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    elevation: 7,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },

  image: {
    width: 85,
    height: 85,
  },

  optionText: {
    marginTop: 5,
    fontSize: 19,
    fontWeight: '700',
    color: '#334155',
  },

  footer: {
    alignItems: 'center',
    paddingBottom: 25,
  },

  attemptText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748B',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  resultModal: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    elevation: 15,
  },

  successEmoji: {
    fontSize: 55,
  },

  resultTitle: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
  },

  resultText: {
    marginTop: 10,
    fontSize: 17,
    color: '#64748B',
    textAlign: 'center',
  },

  stars: {
    flexDirection: 'row',
    marginTop: 20,
  },

  star: {
    fontSize: 38,
    marginHorizontal: 4,
  },

  acceptButton: {
    width: '100%',
    marginTop: 25,
    backgroundColor: '#00A078',
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
  },

  acceptText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  rewardModal: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
  },

  rewardTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
  },

  ruben: {
    width: 190,
    height: 190,
    marginTop: 10,
  },

  rubenName: {
    fontSize: 25,
    fontWeight: '800',
    color: '#00A078',
  },

  rewardText: {
    marginTop: 5,
    fontSize: 16,
    color: '#64748B',
  },

  mapButton: {
    width: '100%',
    backgroundColor: '#00A078',
    borderRadius: 25,
    paddingVertical: 14,
    marginTop: 20,
    alignItems: 'center',
  },

  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  collectionButton: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#00A078',
    borderRadius: 25,
    paddingVertical: 14,
    marginTop: 12,
    alignItems: 'center',
  },

  collectionButtonText: {
    color: '#00A078',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },

  collectionModal: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
  },

  collectionTitle: {
    fontSize: 27,
    fontWeight: '800',
    color: '#1F2937',
  },

  collectionImage: {
    width: 180,
    height: 180,
    marginTop: 15,
  },

  collectionName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#00A078',
  },

  collectionDescription: {
    marginTop: 5,
    fontSize: 15,
    color: '#64748B',
  },

});