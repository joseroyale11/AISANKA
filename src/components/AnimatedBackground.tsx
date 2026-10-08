import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

import COLORS from '../constants/colors';


export default function AnimatedBackground({children}: any) {

  const move = useRef(
    new Animated.Value(0)
  ).current;


  useEffect(()=>{

    Animated.loop(

      Animated.sequence([

        Animated.timing(move,{
          toValue:1,
          duration:4000,
          useNativeDriver:true,
        }),

        Animated.timing(move,{
          toValue:0,
          duration:4000,
          useNativeDriver:true,
        }),

      ])

    ).start();


  },[]);



  const translateY = move.interpolate({

    inputRange:[0,1],

    outputRange:[0,20],

  });



  return(

    <View style={styles.container}>


      <Animated.View
        style={[
          styles.circle,
          {
            transform:[
              {
                translateY
              }
            ]
          }
        ]}
      />


      {children}


    </View>

  );

}



const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:COLORS.background,
},


circle:{

position:'absolute',

width:250,

height:250,

borderRadius:125,

backgroundColor:COLORS.primary,

opacity:0.15,

top:-80,

right:-60,

},


});