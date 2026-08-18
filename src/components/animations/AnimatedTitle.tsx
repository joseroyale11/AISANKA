import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Text,
  StyleSheet,
} from 'react-native';

import COLORS from '../../theme/colors';

export default function AnimatedTitle() {

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.sequence([

      Animated.timing(animation,{
        toValue:1,
        duration:2200,
        useNativeDriver:false,
      }),

      Animated.timing(animation,{
        toValue:2,
        duration:1000,
        useNativeDriver:false,
      })

    ]).start();

  },[]);

  const color=animation.interpolate({

    inputRange:[0,1,2],

    outputRange:[
      '#FFFFFF',
      '#FFFFFF',
      COLORS.text,
    ]

  });

  return(

      <Animated.Text
      style={[
        styles.title,
        {
          color,
        }
      ]}>
        AISANKA
      </Animated.Text>

  );

}

const styles=StyleSheet.create({

title:{
fontSize:40,
fontWeight:'900',
letterSpacing:3,
}

});