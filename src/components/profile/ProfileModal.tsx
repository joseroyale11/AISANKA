import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {StudentProfile} from '../../types/StudentProfile';
import {
  AVATAR_OPTIONS,
  AvatarId,
} from './profileAvatars';

interface Props {
  visible: boolean;
  student: StudentProfile | null;
  onClose: () => void;
  onAvatarChange?: (avatar: AvatarId) => void;
  onLogout?: () => void;
}

const AVATAR_STORAGE_KEY = '@aisanka_avatar';

export default function ProfileModal({
  visible,
  student,
  onClose,
  onAvatarChange,
  onLogout,
}: Props) {
  const [selectedAvatar, setSelectedAvatar] =
    useState<AvatarId>('gueguense');

  useEffect(() => {
    cargarAvatar();
  }, []);

  async function cargarAvatar() {
    try {
      const avatarGuardado =
        await AsyncStorage.getItem(AVATAR_STORAGE_KEY);

      if (
        avatarGuardado === 'gueguense' ||
        avatarGuardado === 'guardabarranco' ||
        avatarGuardado === 'gigantona'
      ) {
        setSelectedAvatar(avatarGuardado);
        onAvatarChange?.(avatarGuardado);
      }
    } catch (error) {
      console.log('No se pudo cargar el avatar:', error);
    }
  }

  async function seleccionarAvatar(avatar: AvatarId) {
    setSelectedAvatar(avatar);

    try {
      await AsyncStorage.setItem(
        AVATAR_STORAGE_KEY,
        avatar,
      );
    } catch (error) {
      console.log('No se pudo guardar el avatar:', error);
    }

    onAvatarChange?.(avatar);
  }

  if (!student) {
    return null;
  }

  const avatarActual =
    AVATAR_OPTIONS.find(
      item => item.id === selectedAvatar,
    )?.source ??
    require('../../assets/images/perfil_gueguense.png');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>

          {/* ENCABEZADO */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>
                MI PERFIL
              </Text>

              <Text style={styles.headerSubtitle}>
                Información del estudiante
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >

            {/* AVATAR */}
            <View style={styles.avatarSection}>
              <View style={styles.avatarCircle}>
                <Image
                  source={avatarActual}
                  style={styles.mainAvatar}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.studentName}>
                {student.nombre}
              </Text>

              <Text style={styles.studentLanguage}>
                {student.idioma}
              </Text>
            </View>

            {/* ELEGIR AVATAR */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                ELIGE TU PERSONAJE
              </Text>

              <Text style={styles.sectionDescription}>
                Selecciona el personaje que aparecerá en tu perfil.
              </Text>

              <View style={styles.avatarOptions}>
                {AVATAR_OPTIONS.map(avatar => {
                  const selected =
                    selectedAvatar === avatar.id;

                  return (
                    <Pressable
                      key={avatar.id}
                      onPress={() =>
                        seleccionarAvatar(avatar.id)
                      }
                      style={[
                        styles.avatarOption,
                        selected &&
                          styles.avatarOptionSelected,
                      ]}
                    >
                      <View
                        style={[
                          styles.avatarOptionCircle,
                          selected &&
                            styles.avatarOptionCircleSelected,
                        ]}
                      >
                        <Image
                          source={avatar.source}
                          style={styles.optionAvatar}
                          resizeMode="contain"
                        />
                      </View>

                      <Text
                        style={[
                          styles.avatarName,
                          selected &&
                            styles.avatarNameSelected,
                        ]}
                      >
                        {avatar.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* INFORMACIÓN */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                INFORMACIÓN
              </Text>

              <InfoRow
                label="Docente"
                value="Henrry Montes"
              />

              <InfoRow
                label="Nivel actual"
                value={`Nivel ${student.currentLevel}`}
              />

              <InfoRow
                label="Idioma"
                value={student.idioma}
              />

              <InfoRow
                label="Estrellas"
                value={`${student.stars}`}
              />

              <InfoRow
                label="Escuela"
                value="No disponible"
              />

              <InfoRow
                label="Comunidad"
                value="No disponible"
              />

              <InfoRow
                label="Municipio"
                value="No disponible"
              />
            </View>

            {/* PERSONAJES DESBLOQUEADOS */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                PERSONAJES DESBLOQUEADOS
              </Text>

              <View style={styles.charactersCard}>
                <Text style={styles.charactersLevel}>
                  NIVEL {student.currentLevel}
                </Text>

                <Text style={styles.charactersText}>
                  Los personajes que desbloquees durante tu
                  aprendizaje aparecerán aquí.
                </Text>
              </View>
            </View>

            {/* CERRAR SESIÓN */}
            {onLogout && (
              <Pressable
                style={styles.logoutButton}
                onPress={onLogout}
              >
                <Text style={styles.logoutText}>
                  CERRAR SESIÓN
                </Text>
              </Pressable>
            )}

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 10, 40, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },

  modalContainer: {
    width: '94%',
    maxHeight: '91%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },

  header: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 17,
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  headerSubtitle: {
    color: '#EDE9FE',
    fontSize: 12,
    marginTop: 3,
    fontWeight: '600',
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '300',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 25,
  },

  avatarSection: {
    alignItems: 'center',
    marginBottom: 22,
  },

  avatarCircle: {
    width: 125,
    height: 125,
    borderRadius: 63,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#A855F7',
    marginBottom: 10,
  },

  mainAvatar: {
    width: 105,
    height: 105,
  },

  studentName: {
    fontSize: 21,
    fontWeight: '900',
    color: '#241238',
    textAlign: 'center',
  },

  studentLanguage: {
    marginTop: 3,
    fontSize: 13,
    color: '#7C3AED',
    fontWeight: '800',
  },

  section: {
    marginBottom: 21,
  },

  sectionTitle: {
    fontSize: 15,
    color: '#5B21B6',
    fontWeight: '900',
    marginBottom: 5,
  },

  sectionDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 13,
    lineHeight: 18,
  },

  avatarOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  avatarOption: {
    width: '31%',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 18,
  },

  avatarOptionSelected: {
    backgroundColor: '#F3E8FF',
  },

  avatarOptionCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarOptionCircleSelected: {
    borderColor: '#8B5CF6',
    borderWidth: 3,
  },

  optionAvatar: {
    width: 65,
    height: 65,
  },

  avatarName: {
    marginTop: 6,
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '700',
    textAlign: 'center',
  },

  avatarNameSelected: {
    color: '#6D28D9',
    fontWeight: '900',
  },

  infoRow: {
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EAF8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  infoLabel: {
    fontSize: 13,
    color: '#77727F',
    fontWeight: '600',
  },

  infoValue: {
    maxWidth: '55%',
    fontSize: 13,
    color: '#241238',
    fontWeight: '800',
    textAlign: 'right',
  },

  charactersCard: {
    backgroundColor: '#FAF5FF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },

  charactersLevel: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 6,
  },

  charactersText: {
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 18,
  },

  logoutButton: {
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  logoutText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '900',
  },
});