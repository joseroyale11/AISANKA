import Tts from 'react-native-tts';

export async function configurarLector(): Promise<void> {
  try {
    await Tts.setDefaultLanguage('es-ES');

    Tts.setDefaultRate(0.45);
    Tts.setDefaultPitch(1.0);
  } catch (error) {
    console.log(
      'AISANKA - Error configurando lector:',
      error,
    );
  }
}

export function leerTexto(
  texto: string,
  velocidad: 'lenta' | 'normal' = 'normal',
): void {

  try {

    Tts.stop();

    const rate =
      velocidad === 'lenta'
        ? 0.32
        : 0.48;

    Tts.setDefaultRate(rate);

    Tts.speak(texto);

  } catch (error) {

    console.log(
      'AISANKA - Error de lectura:',
      error,
    );

  }

}

export function detenerLectura(): void {

  try {

    Tts.stop();

  } catch (error) {

    console.log(
      'AISANKA - Error deteniendo lector:',
      error,
    );

  }

}