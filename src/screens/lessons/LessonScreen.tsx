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

import COLORS from '../../theme/colors';


export default function LessonScreen({route, navigation}: any) {

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

        <Text style={styles.errorText}>
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

        <Text style={styles.errorText}>
          No se encontró esta lección.
        </Text>

      </View>

    );

  }


  const lesson =
    session.lesson;


  function continuar() {

    navigation.navigate(
      'LearnWord',
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

          <Text style={styles.smallText}>
            NIVEL {levelId}
          </Text>

          <Text style={styles.title}>
            {lesson.title}
          </Text>

        </View>



        <View style={styles.content}>


          <View style={styles.wordCard}>


            <Text style={styles.word}>
              {lesson.word}
            </Text>


            <View style={styles.separator} />


            <Text style={styles.translation}>
              {lesson.translation}
            </Text>


          </View>




          <View style={styles.progressContainer}>

            <View style={styles.progressActive} />

            <View style={styles.progressInactive} />

            <View style={styles.progressInactive} />

            <View style={styles.progressInactive} />

          </View>


          <Text style={styles.instruction}>
            Mira la palabra y descubre qué significa.
          </Text>


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


  smallText: {

    fontSize: 14,

    fontWeight: '700',

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

    minHeight: 280,

    borderRadius: 30,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    alignItems: 'center',

    padding: 30,

    elevation: 10,

    shadowColor: '#000',

    shadowOpacity: 0.15,

    shadowRadius: 15,

    shadowOffset: {

      width: 0,

      height: 7,

    },

  },


  word: {

    fontSize: 64,

    fontWeight: '800',

    color: '#1F2937',

    textAlign: 'center',

  },


  separator: {

    width: 80,

    height: 4,

    borderRadius: 2,

    backgroundColor: '#34D399',

    marginVertical: 20,

  },


  translation: {

    fontSize: 30,

    fontWeight: '700',

    color: '#00A078',

    textAlign: 'center',

  },


  progressContainer: {

    flexDirection: 'row',

    marginTop: 25,

    gap: 8,

  },


  progressActive: {

    width: 35,

    height: 8,

    borderRadius: 10,

    backgroundColor: '#34D399',

  },


  progressInactive: {

    width: 20,

    height: 8,

    borderRadius: 10,

    backgroundColor: '#D1D5DB',

  },


  instruction: {

    marginTop: 18,

    fontSize: 16,

    color: '#64748B',

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

    fontWeight: 'bold',

    marginLeft: 12,

  },


  errorContainer: {

    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

  },


  errorText: {

    fontSize: 18,

    color: '#D00',

  },

});