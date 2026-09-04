import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import {useDispatch} from 'react-redux';

import {setStudent} from '../../store/slices/studentSlice';
import Overlay from '../../components/background/Overlay';
import ImageBackground from '../../components/background/ImageBackground';
import AnimatedLogo from '../../components/animations/AnimatedLogo';
import AnimatedBubbles from '../../components/animations/AnimatedBubbles';
import LoginCard from '../../components/cards/LoginCard';

import InputField from '../../components/inputs/InputField';
import PrimaryButton from '../../components/buttons/PrimaryButton';

import COLORS from '../../theme/colors';
import SPACING from '../../theme/spacing';

import {MOCK_USERS} from '../../mock/auth';
import {STUDENTS} from '../../mock/students';

export default function LoginScreen({navigation}: any) {
  const dispatch = useDispatch();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function iniciarSesion() {
    if (!correo.trim() || !password.trim()) {
      Alert.alert(
        'Campos incompletos',
        'Ingrese su correo y contraseña.',
      );
      return;
    }

    const usuario = MOCK_USERS.find(
      u =>
        u.correo.toLowerCase() === correo.trim().toLowerCase() &&
        u.password === password,
    );

    if (!usuario) {
      Alert.alert(
        'Acceso denegado',
        'Correo o contraseña incorrectos.',
      );
      return;
    }

const estudiante = STUDENTS.find(

  item =>
    item.profile === usuario.estudiante

);
  console.log('Inicio de sesión correcto');
console.log(estudiante);


if(estudiante){

dispatch(
setStudent(estudiante)
);


navigation.replace('Home');

}
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground />
      <Overlay />
      <AnimatedBubbles />


      <View style={styles.content}>
        <LoginCard>
          <AnimatedLogo />

          <InputField
            placeholder="Correo electrónico"
            icon="mail"
            value={correo}
            onChangeText={setCorreo}
          />

          <View style={styles.passwordContainer}>
            <InputField
              placeholder="Contraseña"
              icon="lock"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.eye}
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.7}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={25}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          <PrimaryButton
            title="Comenzar aventura"
            onPress={iniciarSesion}
          />
        </LoginCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },

  passwordContainer: {
    position: 'relative',
  },

  eye: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
    zIndex: 10,
  },
});