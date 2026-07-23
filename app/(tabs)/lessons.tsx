import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Colors } from '@/constants/Colors';
import { lessons } from '@/data/lessons';

export default function LessonsList() {
  return (
    <Screen>
      <Text style={styles.h1}>Lecciones</Text>
      <Text style={styles.sub}>
        Cada lección es corta. Lee, juega con el simulador, repite. No hay examen.
      </Text>

      {lessons.map((l, i) => (
        <Link key={l.id} href={{ pathname: '/lesson/[id]', params: { id: l.id } }} asChild>
          <View style={styles.card}>
            <View style={styles.num}>
              <Text style={styles.numText}>{i + 1}</Text>
            </View>
            <Text style={styles.emoji}>{l.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{l.title}</Text>
              <Text style={styles.summary} numberOfLines={2}>
                {l.summary}
              </Text>
              <Text style={styles.meta}>⏱ {l.readMinutes} min</Text>
            </View>
          </View>
        </Link>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { color: Colors.text, fontSize: 30, fontWeight: '800' },
  sub: { color: Colors.textMuted, fontSize: 14, marginTop: 6, lineHeight: 20, marginBottom: 18 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgElevated,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  num: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  numText: { color: Colors.text, fontWeight: '700' },
  emoji: { fontSize: 26, marginRight: 12 },
  title: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  summary: { color: Colors.textMuted, fontSize: 13, marginTop: 2, lineHeight: 18 },
  meta: { color: Colors.textMuted, fontSize: 12, marginTop: 6 },
});
