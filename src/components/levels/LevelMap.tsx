import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {StudentProfile} from '../../types/StudentProfile';

interface Props {
  student: StudentProfile | null;
}

const levels = [
  {
    id: 1,
    title: 'Nivel 1',
    subtitle: 'Comienza tu aprendizaje',
    image: require('../../assets/images/nivel_1.png'),
  },
  {
    id: 2,
    title: 'Nivel 2',
    subtitle: 'Nivel no habilitado',
    image: require('../../assets/images/nivel_2.png'),
  },
  {
    id: 3,
    title: 'Nivel 3',
    subtitle: 'Nivel no habilitado',
    image: require('../../assets/images/nivel_3.png'),
  },
];

export default function LevelMap({
  student,
}: Props) {
  const [blockedVisible, setBlockedVisible] =
    useState(false);

  const [selectedLevel, setSelectedLevel] =
    useState(2);

  const nivel1Habilitado =
    student?.unlockedLevels?.includes(1) ?? true;

  function abrirNivel(levelId: number) {
    if (levelId === 1 && nivel1Habilitado) {
      return;
    }

    setSelectedLevel(levelId);
    setBlockedVisible(true);
  }

  return (
    <>
      <View style={styles.map}>

        {/* LÍNEA DEL CAMINO */}
        <View style={styles.pathLine} />

        {/* NIVEL 3 - ARRIBA / IZQUIERDA */}
        <View style={styles.levelThree}>
          <LevelItem
            level={levels[2]}
            onPress={() => abrirNivel(3)}
          />
        </View>

        {/* NIVEL 2 - CENTRO / DERECHA */}
        <View style={styles.levelTwo}>
          <LevelItem
            level={levels[1]}
            onPress={() => abrirNivel(2)}
          />
        </View>

        {/* NIVEL 1 - ABAJO / IZQUIERDA */}
        <View style={styles.levelOne}>
          <LevelItem
            level={levels[0]}
            onPress={() => abrirNivel(1)}
          />
        </View>

      </View>

      {/* VENTANA DE NIVEL BLOQUEADO */}
      <Modal
        visible={blockedVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setBlockedVisible(false)
        }
      >
        <View style={styles.modalOverlay}>

          <View style={styles.blockedModal}>

            {/* DECORACIÓN SUPERIOR */}
            <View style={styles.modalTop}>
              <View style={styles.modalCircle}>
                <Text style={styles.lockText}>
                  {selectedLevel}
                </Text>
              </View>
            </View>

            {/* IMAGEN DEL NIVEL */}
            <Image
              source={
                levels[selectedLevel - 1].image
              }
              style={styles.modalLevelImage}
              resizeMode="contain"
            />

            <Text style={styles.modalTitle}>
              NIVEL {selectedLevel}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.modalSubtitle}>
              NIVEL NO HABILITADO
            </Text>

            <Text style={styles.modalDescription}>
              Este nivel todavía no ha sido habilitado
              por tu docente.
            </Text>

            <Text style={styles.modalHint}>
              Continúa aprendiendo en el nivel disponible
              para avanzar en AISANKA.
            </Text>

            <Pressable
              style={styles.modalButton}
              onPress={() =>
                setBlockedVisible(false)
              }
            >
              <Text style={styles.modalButtonText}>
                ENTENDIDO
              </Text>
            </Pressable>

          </View>
        </View>
      </Modal>
    </>
  );
}

function LevelItem({
  level,
  onPress,
}: {
  level: {
    id: number;
    title: string;
    subtitle: string;
    image: any;
  };
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.levelItem}
    >

      {/* IMAGEN */}
      <Image
        source={level.image}
        style={styles.levelImage}
        resizeMode="contain"
      />

      {/* TEXTO DEBAJO DE LA IMAGEN */}
      <View style={styles.levelTextContainer}>

        <Text style={styles.levelTitle}>
          {level.title}
        </Text>

        <Text style={styles.levelSubtitle}>
          {level.subtitle}
        </Text>

      </View>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 20,
  },

  pathLine: {
    position: 'absolute',
    width: 4,
    height: '76%',
    backgroundColor: 'rgba(255,255,255,0.35)',
    left: '50%',
    top: '10%',
    marginLeft: -2,
    borderRadius: 4,
  },

  levelOne: {
    position: 'absolute',
    left: 18,
    bottom: 25,
    width: 155,
    alignItems: 'center',
  },

  levelTwo: {
    position: 'absolute',
    right: 13,
    bottom: '40%',
    width: 155,
    alignItems: 'center',
  },

  levelThree: {
    position: 'absolute',
    left: 18,
    top: 25,
    width: 155,
    alignItems: 'center',
  },

  levelItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  levelImage: {
    width: 145,
    height: 125,
  },

  levelTextContainer: {
    alignItems: 'center',
    marginTop: -2,
    width: 155,
  },

  levelTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.20)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 3,
  },

  levelSubtitle: {
    color: 'rgba(255,255,255,0.90)',
    fontSize: 8,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 3,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 10, 45, 0.70)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  blockedModal: {
    width: '91%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 24,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.30,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },

  modalTop: {
    width: '100%',
    height: 50,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  modalCircle: {
    position: 'absolute',
    bottom: -27,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#A855F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lockText: {
    color: '#7C3AED',
    fontSize: 18,
    fontWeight: '900',
  },

  modalLevelImage: {
    width: 155,
    height: 135,
    marginTop: 22,
  },

  modalTitle: {
    color: '#261337',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
  },

  divider: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#A855F7',
    marginVertical: 11,
  },

  modalSubtitle: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  modalDescription: {
    color: '#4B4453',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 12,
  },

  modalHint: {
    color: '#8A8490',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
  },

  modalButton: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 4,
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});