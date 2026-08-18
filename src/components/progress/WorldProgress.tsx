import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  progress: number;
}

export default function WorldProgress({progress}: Props) {

  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(animated, {
      toValue: progress,
      duration: 1200,
      useNativeDriver: false,
    }).start();

  }, [progress]);

  const width = animated.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (

    <View style={styles.card}>

      <View style={styles.header}>

        <Text style={styles.title}>
          Progreso
        </Text>

        <Text style={styles.percent}>
          {progress}%
        </Text>

      </View>

      <View style={styles.backgroundBar}>

        <Animated.View
          style={[
            styles.progress,
            {
              width,
            },
          ]}
        />

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  card:{

    width:'100%',

    backgroundColor:'rgba(123, 255, 200, 0.75)',

    padding:15,

    borderRadius:18,

    marginTop:5,

    elevation:5,

    shadowColor:'#000',

    shadowOpacity:0.15,

    shadowRadius:8,

    shadowOffset:{
      width:0,
      height:4,
    },

  },

  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10,
  },

  title:{
    fontWeight:'700',
    color:'#080808',
    fontSize:15,
  },

  percent:{
    fontWeight:'bold',
    color:'#0058a0',
    fontSize:15,
  },

  backgroundBar:{
    height:14,
    backgroundColor:'#e5e7eb',
    borderRadius:20,
    overflow:'hidden',
  },

  progress:{
    height:'100%',
    backgroundColor:'#00adc4',
    borderRadius:20,
  },

});