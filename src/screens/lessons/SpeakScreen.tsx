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

export default function SpeakScreen({
  route,
  navigation,
}: any) {

  const {levelId} = route.params;

  const student = useSelector(
    (state: RootState) =>
      state.student.currentStudent,
  );

  const [speaking, setSpeaking] = useState(false);
  const [completed, setCompleted] = useState(false);

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

  function comenzar() {

    setSpeaking(true);


    setTimeout(() => {
      setSpeaking(false);
      setCompleted(true);
    }, 1200);
  }

  function continuar() {
    navigation.navigate('Write', {
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
            ETAPA 4 DE 5
          </Text>

          <Text style={styles.title}>
            Ahora dilo tú
          </Text>

        </View>

        <View style={styles.content}>

          <View style={styles.card}>

            <Text style={styles.instruction}>
              Pronuncia:
            </Text>

            <Text style={styles.word}>
              {lesson.word}
            </Text>

            <Text style={styles.pronunciation}>
              {lesson.pronunciation}
            </Text>

            <TouchableOpacity
              style={[
                styles.microphone,
                speaking && styles.microphoneActive,
                completed && styles.microphoneCompleted,
              ]}
              onPress={comenzar}
              activeOpacity={0.8}>

              <Text style={styles.microphoneIcon}>
                {completed ? '✓' : '🎤'}
              </Text>

            </TouchableOpacity>

            <Text style={styles.helper}>

              {completed
                ? '¡Excelente! Lo hiciste muy bien.'
                : speaking
                ? 'Escuchando...'
                : 'Presiona el micrófono y repite.'}

            </Text>

          </View>

        </View>

        <View style={styles.footer}>

          <TouchableOpacity
            style={[
              styles.button,
              !completed && styles.disabledButton,
            ]}
            disabled={!completed}
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

  instruction: {
    fontSize: 18,
    color: '#64748B',
  },

  word: {
    fontSize: 58,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 15,
  },

  pronunciation: {
    fontSize: 23,
    fontStyle: 'italic',
    color: '#475569',
    marginTop: 10,
  },

  microphone: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#34D399',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 8,
  },

  microphoneActive: {
    transform: [{scale: 1.1}],
  },

  microphoneCompleted: {
    backgroundColor: '#22C55E',
  },

  microphoneIcon: {
    fontSize: 45,
    color: '#FFFFFF',
  },

  helper: {
    marginTop: 18,
    color: '#64748B',
    textAlign: 'center',
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