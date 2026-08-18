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

export default function AuditoryLesson({
  lesson,
  onContinue,
}: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        MIRA Y APRENDE
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

      <View style={styles.signCard}>

        <Text style={styles.signEmoji}>
          🤟
        </Text>

        <Text style={styles.signTitle}>
          APOYO VISUAL
        </Text>

        <Text style={styles.signText}>
          Observa la seña de esta palabra
        </Text>

      </View>

      <View style={styles.subtitleCard}>

        <Text style={styles.subtitleTitle}>
          SUBTÍTULO
        </Text>

        <Text style={styles.subtitle}>
          {lesson.word}
        </Text>

      </View>

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
    paddingHorizontal: 22,
    backgroundColor: '#F8FAFC',
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },

  lessonCard: {
    width: '100%',
    padding: 25,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 6,
  },

  word: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#0F172A',
  },

  translation: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
    color: '#334155',
  },

  pronunciation: {
    fontSize: 18,
    marginTop: 8,
    color: '#64748B',
  },

  signCard: {
    width: '100%',
    marginTop: 15,
    padding: 18,
    borderRadius: 22,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
  },

  signEmoji: {
    fontSize: 42,
  },

  signTitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0369A1',
  },

  signText: {
    marginTop: 5,
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
  },

  subtitleCard: {
    width: '100%',
    marginTop: 15,
    padding: 15,
    borderRadius: 18,
    backgroundColor: '#0F172A',
    alignItems: 'center',
  },

  subtitleTitle: {
    fontSize: 12,
    color: '#CBD5E1',
    fontWeight: 'bold',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  continueButton: {
    width: '90%',
    height: 58,
    marginTop: 18,
    borderRadius: 30,
    backgroundColor: '#0284C7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

});