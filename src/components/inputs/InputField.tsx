import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import COLORS from '../../theme/colors';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: string;
  secureTextEntry?: boolean;
}

export default function InputField({

value,

onChangeText,

placeholder,

secureTextEntry,

}:Props){

const[focus,setFocus]=useState(false);

return(

<View
style={[

styles.container,

focus && styles.focus,

]}>

<TextInput

placeholder={placeholder}

placeholderTextColor="#999"

value={value}

secureTextEntry={secureTextEntry}

onFocus={()=>setFocus(true)}

onBlur={()=>setFocus(false)}

onChangeText={onChangeText}

style={styles.input}

/>

</View>

);

}

const styles=StyleSheet.create({

container:{

height:58,

backgroundColor:'rgba(255,255,255,0.90)',

borderRadius:18,

paddingHorizontal:20,

justifyContent:'center',

marginBottom:18,

},

focus:{

borderWidth:2,

borderColor:COLORS.purple,

},

input:{

fontSize:16,

color:COLORS.text,

},

});