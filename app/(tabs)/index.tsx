import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Colors } from '@/constants/Colors';
import { lessons } from '@/data/lessons';

export default function Home() {
  return (
    <Screen>
      <Text style={styles.title}>Quantika</Text>
      <Text style={styles.subtitle}>
        La computación cuántica explicada como si tuvieras 15 años y mucha curiosidad.
      </Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>⚛️</Text>
        <Text style={styles.heroText}>
          Aprende qué es un qubit, juega con la superposición y crea tu primer estado de Bell.
          Sin fórmulas enormes, sin instalación, sin cuenta.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Empieza por aquí</Text>
      {lessons.slice(0, 3).map((l) => (
        <Link key={l.id} href={{ pathname: '/lesson/[id]', params: { id: l.id } }} asChild>
          <View style={styles.lessonCard}>
            <Text style={styles.lessonEmoji}>{l.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.lessonTitle}>{l.title}</Text>
              <Text style={styles.lessonSummary} numberOfLines={2}>
                {l.summary}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        </Link>
      ))}

      <Link href="/lessons" asChild>
        <View style={styles.allLink}>
          <Text style={styles.allLinkText}>Ver todas las lecciones →</Text>
        </View>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: Colors.text, fontSize: 34, fontWeight: '800', marginTop: 8 },
  subtitle: { color: Colors.textMuted, fontSize: 15, marginTop: 6, lineHeight: 22 },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 18,
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heroEmoji: { fontSize: 40, marginRight: 14 },
  heroText: { color: Colors.text, flex: 1, fontSize: 14, lineHeight: 20 },
  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 28,
    marginBottom: 10,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgElevated,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  lessonEmoji: { fontSize: 28, marginRight: 12 },
  lessonTitle: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  lessonSummary: { color: Colors.textMuted, fontSize: 13, marginTop: 2, lineHeight: 18 },
  chevron: { color: Colors.textMuted, fontSize: 28, marginLeft: 8 },
  allLink: { marginTop: 14, alignItems: 'center' },
  allLinkText: { color: Colors.primary, fontWeight: '600' },
});
