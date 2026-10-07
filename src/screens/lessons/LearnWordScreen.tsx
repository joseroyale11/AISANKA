import React from 'react';

import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useSelector} from 'react-redux';

import {RootState} from '../../store';

import {getLearningSession} from '../../engine/LearningEngine';

import AuditoryLesson from '../../components/lessons/AuditoryLesson';
import AutismLesson from '../../components/lessons/AutismLesson';
import TDAHLesson from '../../components/lessons/TDAHLesson';
import VisualLesson from '../../components/lessons/VisualLesson';
import NormalLesson from '../../components/lessons/NormalLesson';

export default function LearnWordScreen({
  route,
  navigation,
}: any) {

  const {levelId} = route.params;

  const student = useSelector(
    (state: RootState) =>
      state.student.currentStudent,
  );

  // =====================================================
  // SIN ESTUDIANTE
  // =====================================================

  if (!student) {

    return (
      <View style={styles.errorContainer}>

        <Text style={styles.errorText}>
          No hay estudiante activo.
        </Text>

      </View>
    );

  }

  // =====================================================
  // SESIÓN
  // =====================================================

  const studentForLesson = {
    ...student,
    currentLevel: levelId,
  };

  const session =
    getLearningSession(
      studentForLesson,
    );

  if (!session.lesson) {

    return (
      <View style={styles.errorContainer}>

        <Text style={styles.errorText}>
          No se encontró esta lección.
        </Text>

      </View>
    );

  }

  const lesson = session.lesson;

  // =====================================================
  // PERFIL AUDITIVO
  // =====================================================

  if (student.profile === 'auditivo') {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <AuditoryLesson
          lesson={lesson}

          onComplete={() => {

            navigation.navigate(
              'BuenosDiasInglesGame',
              {
                lesson,
                levelId,
              },
            );

          }}
        />

      </SafeAreaView>

    );

  }





  
  // =====================================================
  // PERFIL normal
  // =====================================================

  if (student.profile === 'normal') {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <AuditoryLesson
          lesson={lesson}

          onComplete={() => {

            navigation.navigate(
              'HolaMayangnaGame',
              {
                lesson,
                levelId,
              },
            );

          }}
        />

      </SafeAreaView>

    );

  }




  
    // =====================================================
  // PERFIL TDHA
  // =====================================================

  if (student.profile === 'tdah') {

    return (

      <ImageBackground
        source={require(
          '../../assets/images/fondo.png'
        )}
        style={styles.background}
        resizeMode="cover"
      >

        <SafeAreaView
          style={styles.container}
        >

          <AutismLesson
            lesson={lesson}

            onComplete={() => {

              navigation.navigate(
                'HolaMisktoGame',
                {
                  lesson,
                  levelId,
                },
              );

            }}
          />

        </SafeAreaView>

      </ImageBackground>

    );

  }


  // =====================================================
  // PERFIL VISUAL
  // =====================================================

  if (student.profile === 'visual') {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <VisualLesson
          lesson={lesson}
          onComplete={() => {
            navigation.navigate(
              'HolaEspañolGame',
              {
                lesson,
                levelId,
              },
            );

          }}

        />


    </SafeAreaView>

  );

}

  // =====================================================
  // PERFIL AUTISMO
  // =====================================================

  if (student.profile === 'autismo') {

    return (

      <ImageBackground
        source={require(
          '../../assets/images/fondo.png'
        )}
        style={styles.background}
        resizeMode="cover"
      >

        <SafeAreaView
          style={styles.container}
        >

          <AutismLesson
            lesson={lesson}

            onComplete={() => {

              navigation.navigate(
                'HolaChinoGame',
                {
                  lesson,
                  levelId,
                },
              );

            }}
          />

        </SafeAreaView>

      </ImageBackground>

    );

  }

  // =====================================================
  // PERFIL NO DISPONIBLE
  // =====================================================

  return (

    <View style={styles.errorContainer}>

      <Text style={styles.errorText}>
        Adaptación no disponible para este perfil.
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  errorContainer: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    padding: 30,
  },

  errorText: {
    fontSize: 18,

    color: '#DC2626',

    textAlign: 'center',

    fontWeight: '600',
  },

});