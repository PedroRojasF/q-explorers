import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, BottomNav, JourneyScreen, PaperCard, PrimaryButton, Stat } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';
import { useJourney } from '@/lib/JourneyContext';

export default function TeacherHome() {
  const { experiment } = useJourney();

  return (
    <JourneyScreen style={styles.screen}>
      <View style={styles.main}>
        <AppHeader title="Bienvenido, Profe" right={<Text style={styles.avatar}>👨🏽‍🏫</Text>} />
        <Text style={styles.name}>Profe Andino</Text>
        <PaperCard style={styles.stats}>
          <Stat icon="✦" value={2} label="Clases" />
          <Stat value={18} label="Estudiantes" />
          <Stat value={6} label="Misiones activas" />
        </PaperCard>

        <Text style={styles.section}>Experimentos cuánticos realizados</Text>
        <PaperCard style={styles.quantumCard}>
          <View style={styles.quantumStats}>
            <Stat value={18} label="Estudiantes" />
            <Stat value={243} label="Experimentos" />
            <Stat value="92%" label="Promedio" />
          </View>
          <View style={styles.divider} />
          <Text style={styles.recommendationLabel}>RECOMENDACIÓN PEDAGÓGICA</Text>
          <Text style={styles.recommendation}>Pide al grupo explicar por qué una sola medición no basta para identificar el patrón de Hadamard.</Text>
          {experiment && <Text style={styles.latest}>Última evidencia: {experiment.zeros} resultados 0 · {experiment.ones} resultados 1</Text>}
        </PaperCard>

        <Text style={styles.section}>Clases recientes</Text>
        <Pressable onPress={() => router.push('/class/2a')}>
          <PaperCard style={styles.classCard}>
            <View><Text style={styles.className}>2°A Secundaria</Text><Text style={styles.meta}>27 estudiantes · 72% de progreso</Text></View>
            <Text style={styles.chevron}>›</Text>
          </PaperCard>
        </Pressable>
        <Pressable onPress={() => router.push('/class/3b')}>
          <PaperCard style={styles.classCard}>
            <View><Text style={styles.className}>3°B Secundaria</Text><Text style={styles.meta}>40 estudiantes · 64% de progreso</Text></View>
            <Text style={styles.chevron}>›</Text>
          </PaperCard>
        </Pressable>
        <View style={styles.actions}><PrimaryButton secondary label="Nueva clase" onPress={() => router.push('/class/2a')} /></View>
      </View>
      <BottomNav teacher />
    </JourneyScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0 }, main: { flex: 1, paddingHorizontal: 18, paddingBottom: 18 }, avatar: { fontSize: 27 }, name: { color: Colors.ink, fontFamily: 'Georgia', fontWeight: '700', fontSize: 21, marginTop: 5 },
  stats: { flexDirection: 'row', marginTop: 13, paddingVertical: 5 }, section: { color: Colors.ink, fontFamily: 'Georgia', fontSize: 18, fontWeight: '700', marginTop: 20, marginBottom: 9 },
  quantumCard: { padding: 13 }, quantumStats: { flexDirection: 'row' }, divider: { height: 1, backgroundColor: Colors.line, marginVertical: 9 }, recommendationLabel: { color: Colors.teal, fontFamily: 'Nunito_800ExtraBold', fontSize: 9, letterSpacing: .8 }, recommendation: { color: Colors.ink, fontFamily: 'Nunito_600SemiBold', fontSize: 11, lineHeight: 16, marginTop: 4 }, latest: { color: Colors.orange, fontFamily: 'Nunito_700Bold', fontSize: 10, marginTop: 7 },
  classCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }, className: { color: Colors.ink, fontWeight: '800' }, meta: { color: Colors.inkSoft, fontSize: 11, marginTop: 4 }, chevron: { color: Colors.inkSoft, fontSize: 25 }, actions: { marginTop: 3 },
});
