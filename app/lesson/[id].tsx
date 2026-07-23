import { useState, useMemo } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Screen } from '@/components/Screen';
import { GateButton } from '@/components/GateButton';
import { ProbabilityBar } from '@/components/ProbabilityBar';
import { Colors } from '@/constants/Colors';
import { lessons } from '@/data/lessons';
import {
  newState,
  applyGate,
  measureOnce,
  probs,
  describeState,
  type QubitCount,
  type Gate,
} from '@/lib/quantum';

// ponytail: renderer markdown mínimo. Soporta **bold**, saltos de línea y "• ".
// Upgrade path: react-native-markdown-display cuando el contenido crezca.

interface Block {
  kind: 'h3' | 'p' | 'bullet' | 'code';
  text: string;
}

const parseMarkdown = (md: string): Block[] => {
  const lines = md.split('\n');
  const out: Block[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('### ')) out.push({ kind: 'h3', text: line.slice(4) });
    else if (line.startsWith('• ')) out.push({ kind: 'bullet', text: line.slice(2) });
    else out.push({ kind: 'p', text: line });
  }
  return out;
};

const renderInline = (text: string) => {
  const parts: { txt: string; bold: boolean }[] = [];
  let i = 0;
  let buf = '';
  let bold = false;
  while (i < text.length) {
    if (text[i] === '*' && text[i + 1] === '*') {
      if (buf) parts.push({ txt: buf, bold });
      buf = '';
      bold = !bold;
      i += 2;
    } else {
      buf += text[i];
      i++;
    }
  }
  if (buf) parts.push({ txt: buf, bold });
  return parts.map((p, idx) => (
    <Text key={idx} style={p.bold ? styles.bold : undefined}>
      {p.txt}
    </Text>
  ));
};

const gateUsesTwoQubits = (g: Gate) => g === 'CNOT';

export default function LessonPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = useMemo(() => lessons.find((l) => l.id === id), [id]);

  const needsTwoQ = lesson?.tryIt?.some((s) => gateUsesTwoQubits(s.gate)) ?? false;
  const initialN: QubitCount = needsTwoQ ? 2 : 1;

  const [n] = useState<QubitCount>(initialN);
  const [state, setState] = useState(() => newState(initialN));
  const [applied, setApplied] = useState(0);
  const [outcome, setOutcome] = useState<string | null>(null);

  if (!lesson) {
    return (
      <Screen>
        <Text style={styles.h1}>Lección no encontrada</Text>
      </Screen>
    );
  }

  const blocks = parseMarkdown(lesson.body);
  const items = probs(state);
  const expr = describeState(state);

  const applyStep = (idx: number) => {
    if (!lesson.tryIt) return;
    if (idx >= lesson.tryIt.length) return;
    const { gate } = lesson.tryIt[idx];
    if (gate === 'CNOT') {
      setState((s) => applyGate(s, 'CNOT', 1, 0));
    } else if (gate === 'I') {
      // no-op
    } else {
      setState((s) => applyGate(s, gate, 0));
    }
    setApplied(idx + 1);
    setOutcome(null);
  };

  const doMeasure = () => {
    const r = measureOnce(state);
    setState(r.post);
    setOutcome(r.outcome);
  };

  const reset = () => {
    setState(newState(n));
    setApplied(0);
    setOutcome(null);
  };

  return (
    <>
      <Stack.Screen options={{ title: lesson.title }} />
      <Screen>
        <Text style={styles.emoji}>{lesson.emoji}</Text>
        <Text style={styles.h1}>{lesson.title}</Text>
        <Text style={styles.meta}>⏱ {lesson.readMinutes} min de lectura</Text>

        <View style={styles.body}>
          {blocks.map((b, idx) => {
            if (b.kind === 'h3') return <Text key={idx} style={styles.h3}>{b.text}</Text>;
            if (b.kind === 'bullet') return <Text key={idx} style={styles.bullet}>• {renderInline(b.text)}</Text>;
            return <Text key={idx} style={styles.p}>{renderInline(b.text)}</Text>;
          })}
        </View>

        {lesson.tryIt && lesson.tryIt.length > 0 && (
          <View style={styles.labCard}>
            <Text style={styles.labTitle}>🧪 Laboratorio</Text>
            <Text style={styles.labSub}>
              Aplica las compuertas en orden y observa qué pasa.
            </Text>

            <View style={styles.stateRow}>
              <Text style={styles.label}>Estado</Text>
              <Text style={styles.expr}>{expr}</Text>
            </View>

            <View style={styles.bars}>
              {items.map((it) => (
                <ProbabilityBar
                  key={it.basis}
                  label={it.basis}
                  prob={it.prob}
                  highlight={outcome === it.basis}
                />
              ))}
            </View>

            {lesson.tryIt.map((step, idx) => {
              const done = idx < applied;
              const active = idx === applied;
              return (
                <Pressable
                  key={idx}
                  onPress={() => applyStep(idx)}
                  style={[styles.step, done && styles.stepDone, active && styles.stepActive]}
                >
                  <Text style={styles.stepNum}>{done ? '✓' : `${idx + 1}`}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stepGate}>{step.gate === 'I' ? '(inicio)' : step.gate}</Text>
                    <Text style={styles.stepDesc}>{step.description}</Text>
                  </View>
                </Pressable>
              );
            })}

            <View style={styles.row}>
              <GateButton label="📏 Medir" onPress={doMeasure} style={{ flex: 1 }} />
              <GateButton label="↺ Reset" onPress={reset} variant="ghost" style={{ flex: 1 }} />
            </View>

            {outcome !== null && (
              <Text style={styles.outcome}>
                Resultado: <Text style={styles.outcomeVal}>|{outcome}⟩</Text>
              </Text>
            )}
          </View>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  emoji: { fontSize: 48, marginTop: 6 },
  h1: { color: Colors.text, fontSize: 26, fontWeight: '800', marginTop: 8 },
  meta: { color: Colors.textMuted, fontSize: 13, marginTop: 4 },
  body: { marginTop: 18 },
  h3: { color: Colors.primary, fontSize: 16, fontWeight: '700', marginTop: 14, marginBottom: 6 },
  p: { color: Colors.text, fontSize: 15, lineHeight: 23, marginBottom: 8 },
  bullet: { color: Colors.text, fontSize: 15, lineHeight: 23, marginLeft: 6, marginBottom: 4 },
  bold: { fontWeight: '800', color: Colors.text },
  labCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  labTitle: { color: Colors.accent, fontSize: 16, fontWeight: '800' },
  labSub: { color: Colors.textMuted, fontSize: 13, marginTop: 4 },
  stateRow: { marginTop: 14 },
  label: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  expr: {
    color: Colors.text,
    fontFamily: 'Courier',
    fontSize: 16,
    marginTop: 4,
  },
  bars: { marginTop: 10 },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgElevated,
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepDone: { borderColor: Colors.success, opacity: 0.7 },
  stepActive: { borderColor: Colors.accent },
  stepNum: {
    color: Colors.text,
    fontWeight: '800',
    fontSize: 18,
    width: 30,
    textAlign: 'center',
    marginRight: 10,
  },
  stepGate: { color: Colors.text, fontWeight: '700', fontFamily: 'Courier', fontSize: 15 },
  stepDesc: { color: Colors.textMuted, fontSize: 12, marginTop: 2 },
  row: { flexDirection: 'row', gap: 8, marginTop: 16 },
  outcome: {
    color: Colors.text,
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  outcomeVal: { color: Colors.accent, fontFamily: 'Courier', fontWeight: '700' },
});
