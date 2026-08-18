import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

const PrimaryButton = ({
  title,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={onPress}>

      <Text style={styles.text}>
        {title}
      </Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  button:{

    width:'100%',

    height:55,

    backgroundColor:'#3D6261',

    borderRadius:18,

    justifyContent:'center',

    alignItems:'center',

    marginTop:10,

  },

  text:{

    color:'#FFFFFF',

    fontSize:18,

    fontWeight:'700',

  }

});

export default PrimaryButton;