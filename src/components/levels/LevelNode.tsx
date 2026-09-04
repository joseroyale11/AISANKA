import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

interface Props {
  number: number;
  unlocked: boolean;
}

export default function LevelNode({
  number,
  unlocked,
}: Props) {

  const navigation = useNavigation<any>();

  function abrirNivel() {

    if (!unlocked) {

      Alert.alert(
        'Nivel bloqueado',
        'Completa el nivel anterior para continuar.',
      );

      return;
    }

    navigation.navigate('Lesson', {
      levelId: number,
    });
  }

  return (

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={abrirNivel}
      style={[
        styles.circle,
        unlocked
          ? styles.open
          : styles.locked,
      ]}
    >

      <Text style={styles.text}>
        {unlocked ? number : '🔒'}
      </Text>

    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({

  circle: {

    width: 72,

    height: 72,

    borderRadius: 36,

    justifyContent: 'center',

    alignItems: 'center',

    marginVertical: 20,

    elevation: 8,

  },

  open: {

    backgroundColor: '#34D399',

  },

  locked: {

    backgroundColor: '#9CA3AF',

  },

  text: {

    color: '#FFF',

    fontSize: 24,

    fontWeight: 'bold',

  },

});