import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import ProfileModal from '../profile/ProfileModal';
import {
  AvatarId,
  getAvatarSource,
} from '../profile/profileAvatars';
import {StudentProfile} from '../../types/StudentProfile';

interface Props {
  student: StudentProfile | null;
}

const AVATAR_STORAGE_KEY = '@aisanka_avatar';

export default function LevelsHeader({
  student,
}: Props) {
  const navigation = useNavigation<any>();

  const [profileVisible, setProfileVisible] =
    useState(false);

  const [selectedAvatar, setSelectedAvatar] =
    useState<AvatarId>('gueguense');

  useEffect(() => {
    cargarAvatar();
  }, []);

  async function cargarAvatar() {
    try {
      const avatar =
        await AsyncStorage.getItem(
          AVATAR_STORAGE_KEY,
        );

      if (
        avatar === 'gueguense' ||
        avatar === 'guardabarranco' ||
        avatar === 'gigantona'
      ) {
        setSelectedAvatar(avatar);
      }
    } catch (error) {
      console.log(
        'No se pudo cargar el avatar:',
        error,
      );
    }
  }

  function abrirPerfil() {
    setProfileVisible(true);
  }

  function cerrarPerfil() {
    setProfileVisible(false);
  }

  function cambiarAvatar(avatar: AvatarId) {
    setSelectedAvatar(avatar);
  }

  return (
    <>
      <View style={styles.container}>

        {/* REGRESAR */}
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={10}
        >
          <Text style={styles.backText}>
            ←
          </Text>
        </Pressable>

        {/* TÍTULO */}
        <View style={styles.worldContainer}>
          <Text style={styles.worldSmall}>
            MUNDO 1
          </Text>

          <Text style={styles.worldTitle}>
            EXPLORANDO MI ENTORNO
          </Text>
        </View>

        {/* AVATAR */}
        <Pressable
          onPress={abrirPerfil}
          hitSlop={10}
          style={styles.profileButton}
        >
          <View style={styles.profileAvatarContainer}>
            <Image
              source={getAvatarSource(selectedAvatar)}
              style={styles.profileAvatar}
              resizeMode="contain"
            />
          </View>
        </Pressable>
      </View>

      <ProfileModal
        visible={profileVisible}
        student={student}
        onClose={cerrarPerfil}
        onAvatarChange={cambiarAvatar}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '700',
    marginTop: -2,
  },

  worldContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },

  worldSmall: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  worldTitle: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 2,
  },

  profileButton: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileAvatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.80)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 5,
  },

  profileAvatar: {
    width: 39,
    height: 39,
  },
});