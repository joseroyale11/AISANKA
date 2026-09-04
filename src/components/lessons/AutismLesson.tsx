import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  lesson: any;
  repetitions: number;
  onContinue: () => void;
}

export default function AutismLesson({
  lesson,
  repetitions,
  onContinue,
}: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.smallTitle}>
        APRENDAMOS
      </Text>

      <Text style={styles.instruction}>
        Observa y aprende
      </Text>

      <View style={styles.lessonCard}>

        <Text style={styles.word}>
          {lesson.word}
        </Text>

        <Text style={styles.translation}>
          {lesson.translation}
        </Text>

        <Text style={styles.pronunciation}>
          {lesson.pronunciation}
        </Text>

      </View>

      <View style={styles.repetitionCard}>

        <Text style={styles.repetitionTitle}>
          Repite conmigo
        </Text>

        <Text style={styles.repetitionText}>
          {repetitions} veces
        </Text>

      </View>

      <TouchableOpacity
        style={styles.audioButton}
        activeOpacity={0.8}
      >
        <Text style={styles.audioIcon}>
          🔊
        </Text>

        <Text style={styles.audioText}>
          Escuchar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.continueButton}
        activeOpacity={0.85}
        onPress={onContinue}
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
     backgroundColor: '#FFFFFF',
  },

  smallTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#6B7280',
    marginBottom: 8,
  },

  instruction: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 25,
    textAlign: 'center',
  },

  lessonCard: {
    width: '100%',
    minHeight: 230,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    elevation: 6,
  },

  word: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },

  translation: {
    fontSize: 25,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  pronunciation: {
    fontSize: 19,
    fontStyle: 'italic',
    color: '#6B7280',
  },

  repetitionCard: {
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },

  repetitionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },

  repetitionText: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 3,
  },

  audioButton: {
    marginTop: 20,
    width: 190,
    height: 58,
    borderRadius: 30,
    backgroundColor: '#D1FAE5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  audioIcon: {
    fontSize: 23,
    marginRight: 10,
  },

  audioText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#047857',
  },

  continueButton: {
    marginTop: 18,
    width: '85%',
    height: 58,
    borderRadius: 30,
    backgroundColor: '#00A078',
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

});