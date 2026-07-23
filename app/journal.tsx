import { StyleSheet, Text, View } from 'react-native';
import { AppHeader, BottomNav, JourneyScreen, PaperCard } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';
import { useJourney } from '@/lib/JourneyContext';

const discoveries = [
  { icon: '🪢', title: 'El quipu digital', text: 'Los códigos guardan información usando símbolos y posiciones.' },
  { icon: '💡', title: 'Bits en acción', text: 'Cada bit puede estar apagado (0) o encendido (1).' },
  { icon: '✦', title: 'Constelación personal', text: 'Cada misión completada enciende una nueva estrella.' },
];
export default function JournalScreen() {
  const { completed } = useJourney();
  return <JourneyScreen scroll={false} style={styles.screen}><View style={styles.main}><AppHeader title="Diario del explorador" /><Text style={styles.lead}>Tus descubrimientos viven aquí</Text><View style={styles.book}><View style={styles.binding} />{discoveries.map((item, index) => <PaperCard key={item.title} style={[styles.entry, index >= Math.max(1, completed.length) && { opacity: .45 }]}><Text style={styles.icon}>{item.icon}</Text><View style={{ flex: 1 }}><Text style={styles.title}>{item.title}</Text><Text style={styles.text}>{index < Math.max(1, completed.length) ? item.text : 'Completa una misión para revelar este hallazgo.'}</Text></View></PaperCard>)}</View><Text style={styles.quote}>“Aprender es encender una luz en el cielo.”</Text></View><BottomNav /></JourneyScreen>;
}
const styles = StyleSheet.create({ screen: { paddingHorizontal: 0 }, main: { flex: 1, paddingHorizontal: 18 }, lead: { color: Colors.inkSoft, textAlign: 'center', marginTop: -6 }, book: { marginTop: 26, gap: 13, borderLeftWidth: 4, borderLeftColor: '#B46A33', paddingLeft: 13 }, binding: { position: 'absolute', width: 8, left: -6, top: 10, bottom: 10, backgroundColor: '#8B4C2A', borderRadius: 4 }, entry: { flexDirection: 'row', gap: 13, backgroundColor: '#FFF0CE' }, icon: { fontSize: 34 }, title: { color: Colors.ink, fontFamily: 'Georgia', fontSize: 17, fontWeight: '700' }, text: { color: Colors.inkSoft, fontSize: 12, lineHeight: 17, marginTop: 4 }, quote: { color: Colors.orange, fontFamily: 'Georgia', fontStyle: 'italic', textAlign: 'center', marginTop: 28 } });
