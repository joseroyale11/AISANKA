import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LevelsHeader() {

  return (

    <View style={styles.container}>

      <TouchableOpacity>

        <Icon
          name="arrow-left"
          size={32}
          color="#FFFFFF"
        />

      </TouchableOpacity>

   

      <TouchableOpacity>

        <Icon
          name="bag-personal"
          size={34}
          color="#FFFFFF"
        />

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

    paddingHorizontal:20,
    paddingVertical:18,
  },

  world:{
    color:'#FFF',
    fontWeight:'bold',
    fontSize:18,
    textAlign:'center',
  },

  title:{
    color:'#FFF',
    fontSize:15,
    textAlign:'center',
  },

});