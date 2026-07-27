import { useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, JourneyScreen, PrimaryButton, ProgressBar } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';
import { worlds } from '@/data/journey';
import { useJourney } from '@/lib/JourneyContext';

export default function MissionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { completeMission } = useJourney();
  const mission = useMemo(() => worlds.flatMap((w) => w.missions).find((m) => m.id === id) ?? worlds[0].missions[0], [id]);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = selected === mission.answer;
  const submit = () => {
    if (selected === null) return;
    setChecked(true);
    if (selected === mission.answer) completeMission(mission.id);
  };
  const next = () => {
    if (mission.id === 'bits-accion') {
      router.replace('/quantum-invite');
      return;
    }
    router.replace({ pathname: '/reward', params: { id: mission.id, correct: correct ? '1' : '0' } });
  };

  return (
    <JourneyScreen scroll={false}>
      <View style={styles.page}>
        <AppHeader title={mission.eyebrow} back />
        <ProgressBar value={(Number(mission.eyebrow.match(/\d/)?.[0] ?? 1) / 4) * 100} />
        <Text style={styles.title}>{mission.title}</Text><Text style={styles.description}>{mission.description}</Text>
        <View style={styles.quipu}><Text style={styles.rope}>━━━━━━━</Text><Text style={styles.knots}>{mission.id === 'bits-accion' ? '💡  ◉  ◌  ◉' : '│╿│╿╽│╿│'}</Text></View>
        <Text style={styles.question}>{mission.question}</Text>
        <View style={styles.options}>{mission.options.map((option, index) => {
          const active = selected === index;
          const stateStyle = checked && index === mission.answer ? styles.correct : checked && active ? styles.wrong : active ? styles.selected : null;
          return <Pressable key={option} disabled={checked} onPress={() => setSelected(index)} style={[styles.option, stateStyle]}><Text style={styles.letter}>{String.fromCharCode(65 + index)}.</Text><Text style={styles.optionText}>{option}</Text>{checked && index === mission.answer && <Text style={styles.mark}>✓</Text>}</Pressable>;
        })}</View>
        {checked && <View style={[styles.feedback, correct ? styles.feedbackGood : styles.feedbackBad]}><Text style={styles.feedbackTitle}>{correct ? '¡Correcto!' : 'Casi, explorador'}</Text><Text style={styles.feedbackText}>{correct ? '+10 XP · Encendiste una estrella' : 'Observa las pistas e inténtalo de nuevo.'}</Text></View>}
        <PrimaryButton secondary={checked} disabled={selected === null} label={checked ? (correct ? (mission.id === 'bits-accion' ? 'Continuar' : 'Ver recompensa') : 'Reintentar') : 'Comprobar'} onPress={checked ? (correct ? next : () => { setChecked(false); setSelected(null); }) : submit} />
      </View>
    </JourneyScreen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, paddingHorizontal: 4, paddingBottom: 22 }, title: { color: Colors.ink, fontFamily: 'Georgia', fontSize: 28, fontWeight: '700', marginTop: 25 }, description: { color: Colors.ink, fontSize: 14, lineHeight: 20, marginTop: 6 },
  quipu: { height: 145, alignItems: 'center', justifyContent: 'center' }, rope: { color: '#8A3E1E', fontSize: 31, letterSpacing: -3 }, knots: { color: '#A54C20', fontFamily: 'Courier', fontSize: 45, marginTop: -5 }, question: { color: Colors.ink, fontWeight: '800', fontSize: 15, marginBottom: 10 }, options: { gap: 8, flex: 1 },
  option: { minHeight: 49, borderRadius: 10, borderWidth: 1, borderColor: Colors.line, backgroundColor: '#FFF0D0', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13 }, selected: { borderColor: Colors.green, backgroundColor: '#DCE5C2', borderWidth: 2 }, correct: { borderColor: Colors.green, backgroundColor: '#DCE5C2' }, wrong: { borderColor: Colors.coral, backgroundColor: '#F2D4C8' }, letter: { color: Colors.ink, fontWeight: '800', width: 27 }, optionText: { color: Colors.ink, flex: 1 }, mark: { color: Colors.green, fontSize: 19, fontWeight: '800' },
  feedback: { padding: 11, borderRadius: 10, marginBottom: 10 }, feedbackGood: { backgroundColor: '#DCE5C2' }, feedbackBad: { backgroundColor: '#F2D4C8' }, feedbackTitle: { color: Colors.ink, fontWeight: '800' }, feedbackText: { color: Colors.inkSoft, fontSize: 11, marginTop: 2 },
});
