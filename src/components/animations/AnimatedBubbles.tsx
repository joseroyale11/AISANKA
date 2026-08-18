import React, {useEffect, useRef} from 'react';
import { Animated, StyleSheet,} from 'react-native';
import COLORS from '../../theme/colors';

export default function AnimatedBubbles() {
  const move1 = useRef(new Animated.Value(0)).current;
  const move2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(move1,{
          toValue:-30,
          duration:4000,
          useNativeDriver:true,
        }),

        Animated.timing(move1,{
          toValue:0,
          duration:4000,
          useNativeDriver:true,
        })
      ])
    )
    
    .start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(move2,{
          toValue:25,
          duration:5000,
          useNativeDriver:true,
        }),

        Animated.timing(move2,{
          toValue:0,
          duration:5000,
          useNativeDriver:true,
        })
      ])
    ).start();
  },[]);

  return (
    <>

      <Animated.View
        style={[
          styles.circle1,
          {
            transform:[
              {
                translateY:move1
              }
            ]
          }
        ]}

      />

      <Animated.View

        style={[
          styles.circle2,
          {
            transform:[
              {
                translateY:move2
              }
            ]
          }
        ]}

      />

      <Animated.View style={styles.circle3}/>

      <Animated.View style={styles.circle4}/>

    </>

  );

}

const styles=StyleSheet.create({

circle1:{
position:'absolute',
width:180,
height:180,
borderRadius:90,
backgroundColor:COLORS.secondary,
opacity:0.18,
top:-60,
right:-60,
},

circle2:{
position:'absolute',
width:140,
height:140,
borderRadius:70,
backgroundColor:COLORS.pink,
opacity:0.16,
bottom:40,
left:-50,
},

circle3:{
position:'absolute',
width:70,
height:70,
borderRadius:35,
backgroundColor:COLORS.primary,
opacity:0.14,
top:170,
left:30,
},

circle4:{
position:'absolute',
width:90,
height:90,
borderRadius:45,
backgroundColor:COLORS.purple,
opacity:0.14,
bottom:220,
right:20,
},

});