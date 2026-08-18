import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  lesson: any;
  onContinue: () => void;
}

export default function VisualLesson({
  lesson,
  onContinue,
}: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        ESCUCHA Y APRENDE
      </Text>

      <View style={styles.audioCircle}>
        <Text style={styles.audioIcon}>
          🔊
        </Text>
      </View>

      <Text style={styles.instruction}>
        AISANKA te dirá la palabra
      </Text>

      <View style={styles.wordCard}>

        <Text style={styles.word}>
          {lesson.word}
        </Text>

        <Text style={styles.translation}>
          {lesson.translation}
        </Text>

      </View>

      <TouchableOpacity
        style={styles.listenButton}
        activeOpacity={0.8}
      >
        <Text style={styles.listenText}>
          🔊  ESCUCHAR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={onContinue}
        activeOpacity={0.85}
      >
        <Text style={styles.continueText}>
          CONTINUAR
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },

  audioCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  audioIcon: {
    fontSize: 50,
  },

  instruction: {
    marginTop: 20,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  wordCard: {
    width: '100%',
    marginTop: 25,
    padding: 25,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 8,
  },

  word: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#111827',
  },

  translation: {
    fontSize: 23,
    marginTop: 12,
    color: '#374151',
  },

  listenButton: {
    width: '90%',
    height: 60,
    marginTop: 25,
    borderRadius: 30,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listenText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },

  continueButton: {
    width: '90%',
    height: 60,
    marginTop: 15,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  continueText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
  },

});