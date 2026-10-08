import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';


import WorldProgress from '../progress/WorldProgress';


interface Props {
  world: {
    id: number;
    title: string;
    image: any;
    unlocked: boolean;
    progress: number;
  };
}

export default function WorldCard({world}: Props) {

  const student = useSelector(
(state:RootState)=>state.student.currentStudent
);

  const navigation = useNavigation<any>();
function abrirMundo() {
  if (!world.unlocked) {
    Alert.alert(
      'Mundo bloqueado',
      'Completa el Mundo 1 para desbloquear este nuevo mundo.',
    );
    return;
  }

 navigation.navigate('Levels', {

worldId: world.id,

studentId: student?.id,

});
}

  return (
    <View style={styles.card}>
   <Text style={styles.unit}>
          {world.title}
        </Text>
      
      <Image
        source={world.image}
        style={[
          styles.image,
          !world.unlocked && styles.lockedImage,
        ]}
      />

      {!world.unlocked && (
        <View style={styles.lockContainer}>
          <MaterialCommunityIcons
            name="lock"
            size={70}
            color="#FFFFFF"
          />
        </View>
      )}

      <View style={styles.info}>
     

        {world.unlocked && (
<View style={styles.progressContainer}>
  <WorldProgress progress={world.progress} />
</View>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            !world.unlocked && styles.lockButton,
          ]}
          activeOpacity={0.85}
          onPress={abrirMundo}>
          <Text style={styles.buttonText}>
            {world.unlocked
              ? `Mundo ${world.id}`
              : 'Bloqueado'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    alignSelf: 'center',
    overflow: 'hidden',

    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  image: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
  },

  lockedImage: {
    opacity: 0.35,
  },


progressContainer:{
    width:'90%',
    marginTop:5,
},

  lockContainer: {
    position: 'absolute',
    top: 110,
    width: '100%',
    alignItems: 'center',
  },

  info: {
    paddingVertical: 20,
    alignItems: 'center',
  },

  unit: {
    fontSize: 22,
    fontWeight: '700',
    color: '#344054',
    textAlign: 'center',
    marginBottom: 18,
  },

  button: {
    width: 180,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: '#00A078',
    alignItems: 'center',
    elevation: 5,
  },

  lockButton: {
    backgroundColor: '#9CA3AF',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});