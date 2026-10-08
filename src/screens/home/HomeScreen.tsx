import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import HomeHeader from '../../components/home/HomeHeader';
import WorldCarousel from '../../components/home/WorldCarousel';

export default function HomeScreen() {
const student = useSelector(
(state:RootState)=>state.student.currentStudent
);

  const [currentIndex, setCurrentIndex] = useState(0);

  const gradients = [
    ['#4dfd9c', '#54d7ff'], 
    ['#7F67EF', '#EC5173'], 
    ['#F2994A', '#F2CC45'], 
  ];

  return (
    <SafeAreaView style={styles.safeArea}>

      <LinearGradient
        colors={gradients[currentIndex]}
        start={{x:0,y:0}}
        end={{x:0,y:1}}
        style={styles.container}
      >

    <HomeHeader 
 student={student}
/>

        <View style={styles.content}>

          <WorldCarousel
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />

        </View>

      </LinearGradient>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea:{
    flex:1,
  },

  container:{
    flex:1,
  },

  content:{
    flex:1,
    justifyContent:'center',
  },

});