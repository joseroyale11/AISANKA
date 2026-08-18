import React, {useState} from 'react';

import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useSelector} from 'react-redux';

import {RootState} from '../../store';
import {getLearningSession} from '../../engine/LearningEngine';

export default function WriteScreen({
  route,
  navigation,
}: any) {

  const {levelId} = route.params;

  const student = useSelector(
    (state: RootState) =>
      state.student.currentStudent,
  );

  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

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

  function comprobar() {

    const respuesta =
      answer.trim().toLowerCase();

    const palabra =
      lesson.word.trim().toLowerCase();

    setCorrect(respuesta === palabra);
    setChecked(true);
  }

  function continuar() {

    navigation.navigate('Reward', {
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
            ETAPA 5 DE 5
          </Text>

          <Text style={styles.title}>
            Escribe la palabra
          </Text>

        </View>

        <View style={styles.content}>

          <View style={styles.card}>

            <Text style={styles.instruction}>
              ¿Cómo se escribe?
            </Text>

            <Text style={styles.translation}>
              {lesson.translation}
            </Text>

            <TextInput
              value={answer}
              onChangeText={text => {
                setAnswer(text);
                setChecked(false);
              }}
              placeholder="Escribe aquí"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              autoCapitalize="none"
            />

            {!checked && (

              <TouchableOpacity
                style={styles.checkButton}
                onPress={comprobar}
                activeOpacity={0.85}>

                <Text style={styles.checkText}>
                  COMPROBAR
                </Text>

              </TouchableOpacity>

            )}

            {checked && (

              <View style={styles.result}>

                <Text style={styles.resultIcon}>
                  {correct ? '⭐' : '💡'}
                </Text>

                <Text style={styles.resultText}>

                  {correct
                    ? '¡Excelente!'
                    : `La palabra es: ${lesson.word}`}

                </Text>

              </View>

            )}

          </View>

        </View>

        <View style={styles.footer}>

          <TouchableOpacity
            style={[
              styles.button,
              !checked && styles.disabledButton,
            ]}
            disabled={!checked}
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

  translation: {
    fontSize: 28,
    fontWeight: '800',
    color: '#00A078',
    marginTop: 15,
  },

  input: {
    width: '100%',
    height: 65,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    marginTop: 30,
    paddingHorizontal: 20,
    fontSize: 22,
    textAlign: 'center',
    color: '#1F2937',
    backgroundColor: '#F8FAFC',
  },

  checkButton: {
    marginTop: 20,
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#34D399',
  },

  checkText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },

  result: {
    alignItems: 'center',
    marginTop: 20,
  },

  resultIcon: {
    fontSize: 35,
  },

  resultText: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
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