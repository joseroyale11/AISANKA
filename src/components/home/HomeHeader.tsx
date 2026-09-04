import React from 'react';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


import COLORS from '../../theme/colors';

import { StudentProfile } from '../../types/StudentProfile';


interface Props{

  student: StudentProfile | null;

}


export default function HomeHeader({
  student
}:Props){

    return(

        <View style={styles.container}>

<View>


<View style={styles.info}>
  <Text style={styles.title}>
    Hola {student?.nombre} 
  </Text>


</View>

</View>

            <TouchableOpacity style={styles.bag}>

                <MaterialCommunityIcons
                    name="bag-personal"
                    size={34}
                    color={COLORS.white}
                />

            </TouchableOpacity>

    

  

        </View>

    );

}

const styles = StyleSheet.create({

container:{
  height:90,
  paddingHorizontal:20,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
},


info:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
},


title:{
  fontSize:20,
  fontWeight:'700',
  color:'#1F2937',
},


unit:{
  fontSize:14,
  color:'#6B7280',
  textAlign:'center',
},



bag:{

width:55,

height:55,

borderRadius:28,

backgroundColor:'#02ff81',

justifyContent:'center',

alignItems:'center',

elevation:8,

},





starBox:{

flexDirection:'row',

alignItems:'center',

backgroundColor:'#FFFFFF',

paddingHorizontal:12,

paddingVertical:8,

borderRadius:20,

elevation:5,

},

starText:{

marginLeft:5,

fontWeight:'700',

fontSize:18,

},

});