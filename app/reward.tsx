import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { JourneyScreen, PrimaryButton } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';
import { worlds } from '@/data/journey';

export default function RewardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isQuantumExperiment = id === 'quantum-experiment';
  const mission = worlds[0].missions.find((m) => m.id === id) ?? worlds[0].missions[0];
  return (
    <JourneyScreen dark scroll={false}>
      <View style={styles.page}>
        <Text style={styles.spark}>✦    ·    ✧</Text><Text style={styles.title}>{isQuantumExperiment ? '¡Experimento completado!' : '¡Correcto!'}</Text>
        <Text style={styles.fact}>{isQuantumExperiment ? 'Predijiste, mediste y usaste evidencia para descubrir el patrón de un qubit.' : mission.fact}</Text>
        <View style={styles.medallion}><Text style={styles.medallionIcon}>{isQuantumExperiment ? '⚛️' : '🪢'}</Text></View>
        <Text style={styles.xp}>+10 XP</Text><Text style={styles.copy}>Has encendido una estrella{`\n`}en tu constelación.</Text><Text style={styles.star}>★</Text>
        {isQuantumExperiment && <View style={styles.badge}><Text style={styles.badgeIcon}>✦</Text><View><Text style={styles.badgeLabel}>NUEVA INSIGNIA</Text><Text style={styles.badgeTitle}>Primer Experimento Cuántico</Text></View></View>}
        <PrimaryButton secondary label={isQuantumExperiment ? 'Volver a la constelación' : 'Siguiente'} onPress={() => router.replace('/world/codigo-secreto')} />
      </View>
    </JourneyScreen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, justifyContent: 'center', paddingHorizontal: 4, paddingBottom: 24 }, spark: { color: Colors.gold, textAlign: 'center', letterSpacing: 10, fontSize: 22 }, title: { color: Colors.white, fontFamily: 'Georgia', fontSize: 37, fontWeight: '700', textAlign: 'center', marginTop: 15 }, fact: { color: '#D9E4DE', fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 15 },
  medallion: { width: 175, height: 175, borderRadius: 88, alignSelf: 'center', marginVertical: 24, backgroundColor: '#071723', borderWidth: 2, borderColor: Colors.gold, alignItems: 'center', justifyContent: 'center', shadowColor: Colors.gold, shadowOpacity: .7, shadowRadius: 20 }, medallionIcon: { fontSize: 78 }, xp: { color: Colors.orange, fontSize: 25, fontWeight: '800', textAlign: 'center' }, copy: { color: Colors.white, fontSize: 13, textAlign: 'center', lineHeight: 19, marginTop: 6 }, star: { color: Colors.gold, fontSize: 34, textAlign: 'center', marginVertical: 10 },
  badge: { alignSelf: 'center', width: '100%', maxWidth: 340, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(244,229,194,.12)', borderWidth: 1, borderColor: Colors.gold, borderRadius: 13, padding: 10, marginBottom: 14 }, badgeIcon: { color: Colors.gold, fontSize: 26, marginRight: 11 }, badgeLabel: { color: Colors.gold, fontSize: 9, fontWeight: '800', letterSpacing: 1 }, badgeTitle: { color: Colors.white, fontFamily: 'Georgia', fontSize: 15, fontWeight: '700', marginTop: 2 },
});
