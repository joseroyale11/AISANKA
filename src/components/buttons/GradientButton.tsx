import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

interface Props{

title:string;

onPress:()=>void;

}

export default function GradientButton({

title,

onPress,

}:Props){

return(

<Pressable onPress={onPress}>

<LinearGradient

colors={['#EC5173','#7F67EF']}

start={{x:0,y:0}}

end={{x:1,y:0}}

style={styles.button}>

<Text style={styles.text}>

{title}

</Text>

</LinearGradient>

</Pressable>

);

}

const styles=StyleSheet.create({

button:{

height:58,

borderRadius:30,

justifyContent:'center',

alignItems:'center',

marginTop:20,

elevation:8,

},

text:{

fontSize:18,

fontWeight:'700',

color:'#FFFFFF',

},

});