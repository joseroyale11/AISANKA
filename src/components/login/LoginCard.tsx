import React from 'react';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import {View, StyleSheet} from 'react-native';
import {
Animated
} from 'react-native';
export default function LoginCard({

children,

}:any){

return(

<Animated.View>

{children}

</Animated.View>

);

}

const styles=StyleSheet.create({

card:{

backgroundColor:'rgba(255,255,255,0.12)',

borderRadius:30,

padding:25,

borderWidth:1,

borderColor:'rgba(255,255,255,0.25)',

shadowColor:'#000',

shadowOpacity:0.25,

shadowRadius:20,

shadowOffset:{

width:0,

height:10,

},

elevation:12,

}

});