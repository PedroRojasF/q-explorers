import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, BottomNav, JourneyScreen, PaperCard, ProgressBar } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';
import { worlds } from '@/data/journey';
import { useJourney } from '@/lib/JourneyContext';

export default function MissionsScreen() {
  const { completed } = useJourney();
  return (
    <JourneyScreen scroll={false} style={styles.screen}>
      <View style={styles.main}>
        <AppHeader title="Misiones" />
        <Text style={styles.lead}>Tu ruta de aprendizaje</Text>
        <PaperCard style={styles.featured}>
          <View style={styles.row}><View><Text style={styles.eyebrow}>MUNDO 1</Text><Text style={styles.title}>Código secreto</Text></View><Text style={styles.animal}>🦙</Text></View>
          <ProgressBar value={(completed.length / 4) * 100} /><Text style={styles.progress}>{completed.length} de 4 misiones completadas</Text>
        </PaperCard>
        <View style={styles.list}>{worlds[0].missions.map((mission, index) => {
          const done = completed.includes(mission.id); const unlocked = index === 0 || completed.includes(worlds[0].missions[index - 1].id);
          return <Pressable key={mission.id} disabled={!unlocked} onPress={() => router.push(`/mission/${mission.id}` as never)} style={[styles.item, !unlocked && { opacity: .55 }]}><View style={[styles.num, done && styles.done]}><Text style={styles.numText}>{done ? '✓' : index + 1}</Text></View><View style={{ flex: 1 }}><Text style={styles.itemTitle}>{mission.title}</Text><Text style={styles.itemMeta}>{done ? 'Completada · 10 XP' : unlocked ? 'Lista para explorar' : 'Bloqueada'}</Text></View><Text style={styles.chevron}>{unlocked ? '›' : '⌁'}</Text></Pressable>;
        })}</View>
      </View><BottomNav />
    </JourneyScreen>
  );
}
const styles = StyleSheet.create({ screen: { paddingHorizontal: 0 }, main: { flex: 1, paddingHorizontal: 18 }, lead: { color: Colors.inkSoft, textAlign: 'center', marginTop: -6, marginBottom: 18 }, featured: { backgroundColor: '#F2D7A2' }, row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, eyebrow: { color: Colors.orange, fontWeight: '800', fontSize: 11, letterSpacing: 1 }, title: { color: Colors.ink, fontFamily: 'Georgia', fontSize: 24, fontWeight: '700', marginVertical: 4 }, animal: { fontSize: 54 }, progress: { color: Colors.inkSoft, fontSize: 10, marginTop: 6 }, list: { marginTop: 16, gap: 9 }, item: { minHeight: 68, backgroundColor: Colors.paperCard, borderRadius: 13, borderWidth: 1, borderColor: Colors.line, flexDirection: 'row', alignItems: 'center', padding: 10 }, num: { width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.orange, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, done: { backgroundColor: Colors.green }, numText: { color: Colors.white, fontWeight: '800' }, itemTitle: { color: Colors.ink, fontWeight: '800' }, itemMeta: { color: Colors.inkSoft, fontSize: 11, marginTop: 3 }, chevron: { color: Colors.inkSoft, fontSize: 24 } });
