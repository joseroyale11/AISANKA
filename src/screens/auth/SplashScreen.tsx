import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import COLORS from '../../constants/colors';

type Props = NativeStackScreenProps<any>;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

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
color: COLORS.white,
          fontSize: 34,
          fontWeight: 'bold',
        }}>
        AISANKA
      </Text>
    </SafeAreaView>
  );
}