import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppHeader, JourneyScreen, PaperCard, PrimaryButton } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';

export default function QuantumInviteScreen() {
  return (
    <JourneyScreen scroll={false}>
      <View style={styles.page}>
        <AppHeader title="Siguiente descubrimiento" back />
        <View style={styles.steps}>
          <Text style={styles.stepDone}>Quipu ✓</Text>
          <View style={styles.line} />
          <Text style={styles.stepDone}>Bit ✓</Text>
          <View style={styles.line} />
          <Text style={styles.stepCurrent}>Qubit</Text>
        </View>

        <PaperCard style={styles.card}>
          <Image source={require('@/assets/qubitpacha/kusi.png')} style={styles.kusi} resizeMode="contain" />
          <Text style={styles.eyebrow}>KUSI TE INVITA</Text>
          <Text style={styles.title}>¿Quieres comprobarlo en un computador cuántico?</Text>
          <Text style={styles.copy}>
            Ya conoces los bits. Ahora crea un qubit, predice qué ocurrirá y contrasta tu hipótesis con 100 mediciones.
          </Text>
        </PaperCard>

        <View style={styles.questionCard}>
          <Text style={styles.question}>Del bit al qubit</Text>
          <Text style={styles.questionCopy}>Una puerta Hadamard abre dos resultados posibles: 0 y 1.</Text>
        </View>

        <View style={styles.action}>
          <PrimaryButton secondary label="Ejecutar experimento" onPress={() => router.push('/quantum-lab')} />
        </View>
      </View>
    </JourneyScreen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, paddingHorizontal: 4, paddingBottom: 24 },
  steps: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  stepDone: { color: Colors.green, fontFamily: 'Nunito_800ExtraBold', fontSize: 12 },
  stepCurrent: { color: Colors.orange, fontFamily: 'Nunito_800ExtraBold', fontSize: 12 },
  line: { width: 28, height: 1, backgroundColor: Colors.line, marginHorizontal: 7 },
  card: { alignItems: 'center', marginTop: 24, paddingHorizontal: 20, paddingBottom: 23 },
  kusi: { width: 178, height: 142, marginTop: -4 },
  eyebrow: { color: Colors.teal, fontFamily: 'Nunito_800ExtraBold', fontSize: 11, letterSpacing: 1.4 },
  title: { color: Colors.ink, fontFamily: 'Lora_700Bold', fontSize: 27, lineHeight: 34, textAlign: 'center', marginTop: 9 },
  copy: { color: Colors.inkSoft, fontFamily: 'Nunito_600SemiBold', fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 12 },
  questionCard: { borderLeftWidth: 3, borderLeftColor: Colors.gold, paddingLeft: 13, marginTop: 22 },
  question: { color: Colors.ink, fontFamily: 'Lora_700Bold', fontSize: 18 },
  questionCopy: { color: Colors.inkSoft, fontFamily: 'Nunito_600SemiBold', fontSize: 13, lineHeight: 19, marginTop: 4 },
  action: { marginTop: 'auto' },
});
