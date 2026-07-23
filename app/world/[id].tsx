import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, BottomNav, JourneyScreen, ProgressBar } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';
import { worlds } from '@/data/journey';
import { useJourney } from '@/lib/JourneyContext';

export default function WorldScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { completed } = useJourney();
  const world = worlds.find((item) => item.id === id) ?? worlds[0];
  const progress = world.missions.filter((m) => completed.includes(m.id)).length;
  return (
    <JourneyScreen dark scroll={false} style={styles.screen}>
      <View style={styles.main}>
        <AppHeader dark title={`Mundo ${world.number}`} back />
        <Text style={styles.title}>{world.title}</Text><Text style={styles.theme}>{world.theme}</Text>
        <View style={styles.hero}><Text style={styles.animal}>{world.animal}</Text><Text style={styles.sparkles}>✦  ·  ✧</Text></View>
        <Text style={styles.description}>{world.description}</Text>
        <View style={styles.progressRow}><Text style={styles.sectionTitle}>Misiones</Text><Text style={styles.progressCopy}>{progress}/{world.missions.length || 4} completadas</Text></View>
        <ProgressBar value={(progress / Math.max(world.missions.length, 4)) * 100} dark />
        <View style={styles.missions}>
          {(world.missions.length ? world.missions : [{ id: 'locked', title: 'Completa el mundo anterior' }]).map((mission, index) => {
            const done = completed.includes(mission.id);
            const unlocked = index === 0 || completed.includes(world.missions[index - 1]?.id);
            return <Pressable key={mission.id} disabled={!unlocked} onPress={() => router.push(`/mission/${mission.id}` as never)} style={[styles.mission, !unlocked && { opacity: .55 }]}>
              <View style={[styles.missionNumber, done && { backgroundColor: Colors.green }]}><Text style={styles.missionNumberText}>{done ? '✓' : index + 1}</Text></View>
              <Text style={styles.missionTitle}>{mission.title}</Text><Text style={styles.missionLock}>{unlocked ? '›' : '⌁'}</Text>
            </Pressable>;
          })}
        </View>
      </View>
      <BottomNav />
    </JourneyScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0 }, main: { flex: 1, paddingHorizontal: 18 }, title: { color: Colors.white, fontFamily: 'Georgia', fontSize: 31, fontWeight: '700', marginTop: 4 }, theme: { color: Colors.gold, fontSize: 15, fontWeight: '700', marginTop: 3 },
  hero: { position: 'absolute', right: 24, top: 75, alignItems: 'center' }, animal: { fontSize: 90, opacity: .75 }, sparkles: { color: Colors.gold, letterSpacing: 8 }, description: { color: '#E5E3D5', fontSize: 14, lineHeight: 21, width: '68%', minHeight: 130, marginTop: 20 },
  progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15, marginBottom: 9 }, sectionTitle: { color: Colors.white, fontFamily: 'Georgia', fontSize: 18, fontWeight: '700' }, progressCopy: { color: Colors.gold, fontSize: 11 }, missions: { gap: 9, marginTop: 14 },
  mission: { minHeight: 55, borderRadius: 12, backgroundColor: Colors.paper, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.line }, missionNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.orange, alignItems: 'center', justifyContent: 'center' }, missionNumberText: { color: Colors.white, fontWeight: '800' }, missionTitle: { flex: 1, color: Colors.ink, fontWeight: '700', marginLeft: 10 }, missionLock: { color: Colors.inkSoft, fontSize: 22 },
});
