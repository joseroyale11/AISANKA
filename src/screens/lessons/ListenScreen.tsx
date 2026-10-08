import React, {useState} from 'react';

import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useSelector} from 'react-redux';

import {RootState} from '../../store';
import {getLearningSession} from '../../engine/LearningEngine';

export default function ListenScreen({
  route,
  navigation,
}: any) {

  const {levelId} = route.params;

  const student = useSelector(
    (state: RootState) =>
      state.student.currentStudent,
  );

  const [played, setPlayed] = useState(false);

  if (!student) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>
          No hay estudiante activo.
        </Text>
      </View>
    );
  }

  const studentForLesson = {
    ...student,
    currentLevel: levelId,
  };

  const session = getLearningSession(
    studentForLesson,
  );

  if (!session.lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>
          No se encontró la lección.
        </Text>
      </View>
    );
  }

  const lesson = session.lesson;

  function escuchar() {

    setPlayed(true);
  }

  function continuar() {
    navigation.navigate('Speak', {
      levelId,
    });
  }

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover">

      <SafeAreaView style={styles.container}>

        <View style={styles.header}>

          <Text style={styles.stage}>
            ETAPA 3 DE 5
          </Text>

          <Text style={styles.title}>
            Escucha y repite
          </Text>

        </View>

        <View style={styles.content}>

          <View style={styles.card}>

            <Text style={styles.word}>
              {lesson.word}
            </Text>

            <Text style={styles.translation}>
              {lesson.translation}
            </Text>

            <TouchableOpacity
              style={[
                styles.audioButton,
                played && styles.audioButtonPlayed,
              ]}
              onPress={escuchar}
              activeOpacity={0.8}>

              <Text style={styles.audioIcon}>
                🔊
              </Text>

            </TouchableOpacity>

            <Text style={styles.pronunciation}>
              {lesson.pronunciation}
            </Text>

            <Text style={styles.helper}>
              {played
                ? '¡Muy bien! Escúchala otra vez si quieres.'
                : 'Presiona el botón para escuchar.'}
            </Text>

          </View>

        </View>

        <View style={styles.footer}>

          <TouchableOpacity
            style={[
              styles.button,
              !played && styles.disabledButton,
            ]}
            disabled={!played}
            onPress={continuar}
            activeOpacity={0.85}>

            <Text style={styles.buttonText}>
              CONTINUAR
            </Text>

            <Text style={styles.arrow}>
              →
            </Text>

          </TouchableOpacity>

        </View>

      </SafeAreaView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 25,
  },

  header: {
    alignItems: 'center',
    paddingTop: 25,
  },

  stage: {
    fontSize: 13,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 2,
  },

  title: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '100%',
    minHeight: 400,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    elevation: 10,
  },

  word: {
    fontSize: 58,
    fontWeight: '800',
    color: '#1F2937',
  },

  translation: {
    fontSize: 24,
    color: '#00A078',
    fontWeight: '700',
    marginTop: 15,
  },

  audioButton: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: '#34D399',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 7,
  },

  audioButtonPlayed: {
    transform: [{scale: 1.05}],
  },

  audioIcon: {
    fontSize: 45,
  },

  pronunciation: {
    marginTop: 20,
    fontSize: 24,
    fontStyle: 'italic',
    color: '#475569',
  },

  helper: {
    marginTop: 15,
    textAlign: 'center',
    color: '#64748B',
    fontSize: 15,
  },

  footer: {
    paddingBottom: 25,
  },

  button: {
    height: 62,
    borderRadius: 31,
    backgroundColor: '#00A078',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
  },

  disabledButton: {
    backgroundColor: '#A7F3D0',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 28,
    marginLeft: 12,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    fontSize: 18,
    color: '#D00',
  },

});