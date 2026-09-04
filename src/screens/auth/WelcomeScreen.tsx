import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import COLORS from '../../constants/colors';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
backgroundColor: COLORS.primary,
      }}>
      <Text
        style={{
          fontSize: 28,
          marginBottom: 30,
color: COLORS.white,
        }}>
        Bienvenido a AISANKA
      </Text>

      <Button
        title="Comenzar"
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
}