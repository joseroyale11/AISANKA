import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function ImageBackground() {
  return (
    <Image
      source={require('../../assets/images/fondo.png')}
      style={styles.image}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});