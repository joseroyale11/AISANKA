import React, {useEffect, useState} from 'react';

import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../store';

import {
  completeLesson,
  getStudentProgress,
} from '../../engine/ProgressManager';

import {
  unlockNextLevel,
} from '../../store/slices/studentSlice';


export default function RewardScreen({
  route,
  navigation,
}: any) {

  const {levelId} = route.params;

  const dispatch = useDispatch();

  const student = useSelector(
    (state: RootState) =>
      state.student.currentStudent,
  );


 
  const [step, setStep] = useState(0);


 
  useEffect(() => {

    if (!student) {
      return;
    }

    const progress =
      getStudentProgress(student.id);

    if (!progress) {
      return;
    }

    const updatedProgress =
      completeLesson(
        progress,
        levelId,
      );


    if (
      updatedProgress.unlockedLevels.includes(
        levelId + 1,
      )
    ) {

      dispatch(
        unlockNextLevel(
          levelId + 1,
        ),
      );

    }

  }, []);


  function continuar() {

    setStep(1);

  }


  function regresarMapa() {

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Levels',
        },
      ],
    });

  }


  if (step === 0) {

    return (

      <LinearGradient
        colors={[
          '#DFF8F0',
          '#E7F4FF',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.background}
      >

        <SafeAreaView style={styles.container}>

          <View style={styles.content}>

            <View style={styles.starCard}>

              <Text style={styles.title}>
                ¡LO LOGRASTE!
              </Text>

              <Text style={styles.subtitle}>
                Nivel {levelId} completado
              </Text>


              <Text style={styles.star}>
                ⭐
              </Text>


              <Text style={styles.starsTitle}>
                ¡Ganaste una estrella!
              </Text>


              <Text style={styles.student}>
                {student?.nombre}
              </Text>

            </View>

          </View>


          <View style={styles.footer}>

            <TouchableOpacity
              style={styles.button}
              onPress={continuar}
              activeOpacity={0.85}
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

      </LinearGradient>

    );
  }


 
  return (

    <LinearGradient
      colors={[
        '#EDE7FF',
        '#FFF1F5',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.background}
    >

      <SafeAreaView style={styles.container}>

        <View style={styles.content}>

          <View style={styles.characterCard}>

            <Text style={styles.unlockTitle}>
              🎁 NUEVA RECOMPENSA
            </Text>


            <Text style={styles.characterTitle}>
              ¡Conociste a Rubén!
            </Text>


            <View style={styles.imageContainer}>

              <Image
                source={require('../../assets/images/ruben.png')}
                style={styles.characterImage}
                resizeMode="contain"
              />

            </View>


            <Text style={styles.characterText}>
              ¡Rubén se ha unido a tu aventura!
            </Text>


            <Text style={styles.characterDescription}>
              Sigue aprendiendo para descubrir
              nuevos personajes.
            </Text>

          </View>

        </View>


        <View style={styles.footer}>

          <TouchableOpacity
            style={styles.button}
            onPress={regresarMapa}
            activeOpacity={0.85}
          >

            <Text style={styles.buttonText}>
              VOLVER AL MAPA
            </Text>

            <Text style={styles.arrow}>
              →
            </Text>

          </TouchableOpacity>

        </View>

      </SafeAreaView>

    </LinearGradient>

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


  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },



  starCard: {
    width: '100%',
    paddingVertical: 42,
    paddingHorizontal: 25,

    borderRadius: 30,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',

    elevation: 7,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },


  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#00A078',
    textAlign: 'center',
  },


  subtitle: {
    fontSize: 20,
    color: '#475569',
    marginTop: 8,
    textAlign: 'center',
  },


  star: {
    fontSize: 80,
    marginTop: 30,
  },


  starsTitle: {
    marginTop: 12,
    fontSize: 23,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
  },


  student: {
    marginTop: 10,
    fontSize: 17,
    color: '#64748B',
  },




  characterCard: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 22,

    borderRadius: 30,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',

    elevation: 7,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },


  unlockTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#64748B',
    textAlign: 'center',
  },


  characterTitle: {
    marginTop: 10,
    fontSize: 27,
    fontWeight: '900',
    color: '#334155',
    textAlign: 'center',
  },


  imageContainer: {
    width: 220,
    height: 240,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },


  characterImage: {
    width: 210,
    height: 230,
  },


  characterText: {
    marginTop: 10,
    fontSize: 19,
    fontWeight: '800',
    color: '#334155',
    textAlign: 'center',
  },


  characterDescription: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
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
    fontSize: 18,
    fontWeight: '800',
  },


  arrow: {
    color: '#FFFFFF',
    fontSize: 28,
    marginLeft: 12,
  },

});