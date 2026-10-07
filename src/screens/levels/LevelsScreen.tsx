/*
  AISANKA - Pantalla del Mundo 1

  Esta pantalla presenta el mapa de niveles sobre un fondo degradado
  morado, rosa y naranja. El encabezado contiene el acceso al perfil y
  la parte inferior identifica el mundo actualmente seleccionado.
*/

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import {RootState} from '../../store';

import LevelsHeader from '../../components/levels/LevelsHeader';
import LevelMap from '../../components/levels/LevelMap';

export default function LevelsScreen() {

  const student = useSelector(
    (state: RootState) =>
      state.student.currentStudent,
  );

  return (

    <LinearGradient
      colors={[
        '#7C3AED',
        '#EC4899',
        '#F97316',
      ]}
      locations={[
        0,
        0.48,
        1,
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

      <SafeAreaView style={styles.safeArea}>

        <LevelsHeader
          student={student}
        />

        <View style={styles.content}>

          <LevelMap
            student={student}
          />

        </View>

        <View style={styles.worldFooter}>

          <View style={styles.worldLine} />

          <Text style={styles.worldLabel}>
            MUNDO 1
          </Text>

          <Text style={styles.worldName}>
            EXPLORANDO MI ENTORNO
          </Text>

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

  content: {
    flex: 1,
  },

  worldFooter: {
    minHeight: 72,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  worldLine: {
    width: 45,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 7,
  },

  worldLabel: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },

  worldName: {
    marginTop: 2,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.7,
    textAlign: 'center',
  },

});