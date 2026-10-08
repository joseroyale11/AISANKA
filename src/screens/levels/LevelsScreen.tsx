import React from 'react';

import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {useSelector} from 'react-redux';

import {RootState} from '../../store';

import LevelsHeader from '../../components/levels/LevelsHeader';
import LevelMap from '../../components/levels/LevelMap';


export default function LevelsScreen() {

  const student = useSelector(
    (state: RootState) =>
      state.student.currentStudent,
  );


  return (

    <ImageBackground
      source={require('../../assets/images/fondo_niveles.png')}
      style={styles.container}
      resizeMode="cover">

      <SafeAreaView style={styles.safeArea}>

        <LevelsHeader />

        <LevelMap
          student={student}
        />

      </SafeAreaView>

    </ImageBackground>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

});