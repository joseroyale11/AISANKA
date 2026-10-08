import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Overlay() {
  return <View style={styles.overlay} />;
}

const styles = StyleSheet.create({

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0, 0, 0, 0.64)',
  },

});