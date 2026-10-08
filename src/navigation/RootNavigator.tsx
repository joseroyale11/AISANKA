import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/home/HomeScreen';
import LevelsScreen from '../screens/levels/LevelsScreen';
import LessonScreen from '../screens/lessons/LessonScreen';
import LearnWordScreen from '../screens/lessons/LearnWordScreen';
import ListenScreen from '../screens/lessons/ListenScreen';
import SpeakScreen from '../screens/lessons/SpeakScreen';
import WriteScreen from '../screens/lessons/WriteScreen';
import RewardScreen from '../screens/lessons/RewardScreen';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Levels"
          component={LevelsScreen}
        />

       <Stack.Screen
  name="Lesson"
  component={LessonScreen}
/>

<Stack.Screen
  name="LearnWord"
  component={LearnWordScreen}
/>

<Stack.Screen
  name="Listen"
  component={ListenScreen}
/>

<Stack.Screen
  name="Speak"
  component={SpeakScreen}
/>

<Stack.Screen
  name="Write"
  component={WriteScreen}
/>

<Stack.Screen
  name="Reward"
  component={RewardScreen}
/>

      </Stack.Navigator>

    </NavigationContainer>

  );

}