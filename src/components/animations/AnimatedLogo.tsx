import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
} from 'react-native';

export default function AnimatedLogo() {

  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.loop(

      Animated.parallel([

        Animated.sequence([

          Animated.timing(scale,{
            toValue:1.08,
            duration:1800,
            useNativeDriver:true,
          }),

          Animated.timing(scale,{
            toValue:1,
            duration:1800,
            useNativeDriver:true,
          })

        ]),

        Animated.sequence([

          Animated.timing(translateY,{
            toValue:-8,
            duration:1800,
            useNativeDriver:true,
          }),

          Animated.timing(translateY,{
            toValue:0,
            duration:1800,
            useNativeDriver:true,
          })

        ])

      ])

    ).start();

  },[]);

  return(

    <Animated.Image

      source={require('../../assets/images/logo.png')}

      style={[

        styles.logo,

        {

          transform:[

            {scale},

            {translateY},

          ]

        }

      ]}

    />

  );

}

const styles=StyleSheet.create({

logo:{

width:180,

height:180,

alignSelf:'center',

resizeMode:'contain',

},

});