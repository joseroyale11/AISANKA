import React from 'react';

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


export default function LearnWordScreen({
  route,
  navigation,
}: any) {


  const {
    levelId,
  } = route.params;


  const student = useSelector(
    (state: RootState) =>
      state.student.currentStudent
  );


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


  const session =
    getLearningSession(
      studentForLesson
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


  const lesson =
    session.lesson;


  function continuar() {

    navigation.navigate(
      'Listen',
      {
        levelId: levelId,
      }
    );

  }


  return (

    <ImageBackground
      style={styles.background}
      resizeMode="cover"
    >

      <SafeAreaView style={styles.container}>


        <View style={styles.header}>

          <Text style={styles.stage}>
            ETAPA 2 DE 4
          </Text>

          <Text style={styles.title}>
            Escucha cómo se dice
          </Text>

        </View>


        <View style={styles.content}>


          <View style={styles.wordCard}>

            <Text style={styles.word}>
              {lesson.word}
            </Text>


            <Text style={styles.pronunciation}>
              {lesson.pronunciation}
            </Text>


            <View style={styles.audioCircle}>

              <Text style={styles.audioIcon}>
                🔊
              </Text>

            </View>


            <Text style={styles.audioText}>
              Escuchar
            </Text>

          </View>


        </View>


        <View style={styles.footer}>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={continuar}
          >

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


  wordCard: {

    width: '100%',

    minHeight: 350,

    borderRadius: 30,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 10,

    padding: 30,

  },


  word: {

    fontSize: 58,

    fontWeight: '800',

    color: '#1F2937',

  },


  pronunciation: {

    fontSize: 25,

    fontStyle: 'italic',

    color: '#64748B',

    marginTop: 20,

  },


  audioCircle: {

    width: 90,

    height: 90,

    borderRadius: 45,

    backgroundColor: '#34D399',

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 30,

    elevation: 6,

  },


  audioIcon: {

    fontSize: 40,

  },


  audioText: {

    marginTop: 10,

    fontSize: 17,

    fontWeight: '700',

    color: '#475569',

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