import { useState, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Screen } from '@/components/Screen';
import { GateButton } from '@/components/GateButton';
import { ProbabilityBar } from '@/components/ProbabilityBar';
import { Colors } from '@/constants/Colors';
import {
  newState,
  applyGate,
  measureOnce,
  probs,
  describeState,
  type QubitCount,
  type Gate1Q,
} from '@/lib/quantum';

export default function Simulator() {
  const [n, setN] = useState<QubitCount>(1);
  const [state, setState] = useState(() => newState(1));
  const [lastOutcome, setLastOutcome] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const switchN = (next: QubitCount) => {
    setN(next);
    setState(newState(next));
    setLastOutcome(null);
    setStep(0);
  };

  const reset = () => {
    setState(newState(n));
    setLastOutcome(null);
    setStep(0);
  };

  const onGate = (g: Gate1Q, target: 0 | 1) => {
    setState((s) => applyGate(s, g, target));
    setLastOutcome(null);
    setStep((x) => x + 1);
  };

  const onCNOT = () => {
    setState((s) => applyGate(s, 'CNOT', 1, 0));
    setLastOutcome(null);
    setStep((x) => x + 1);
  };

  const onMeasure = () => {
    const r = measureOnce(state);
    setState(r.post);
    setLastOutcome(r.outcome);
    setStep((x) => x + 1);
  };

  const items = useMemo(() => probs(state), [state]);
  const expr = useMemo(() => describeState(state), [state]);

  return (
    <Screen>
      <Text style={styles.h1}>Simulador</Text>
      <Text style={styles.sub}>
        Toca una compuerta. Observa cómo cambian las probabilidades. Mide cuando quieras.
      </Text>

      <View style={styles.seg}>
        {[1, 2].map((q) => (
          <Pressable
            key={q}
            onPress={() => switchN(q as QubitCount)}
            style={[styles.segItem, n === q && styles.segItemActive]}
          >
            <Text style={[styles.segText, n === q && styles.segTextActive]}>
              {q} qubit{q > 1 ? 's' : ''}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.stateCard}>
        <Text style={styles.label}>Estado cuántico</Text>
        <Text style={styles.expr}>{expr}</Text>
        <Text style={styles.steps}>paso {step}</Text>
      </View>

      <Text style={styles.label}>Probabilidades de medir</Text>
      <View style={styles.bars}>
        {items.map((it) => (
          <ProbabilityBar
            key={it.basis}
            label={it.basis}
            prob={it.prob}
            highlight={lastOutcome === it.basis}
          />
        ))}
      </View>

      {lastOutcome !== null && (
        <View style={styles.outcome}>
          <Text style={styles.outcomeText}>
            🎯 Mediste: <Text style={styles.outcomeValue}>|{lastOutcome}⟩</Text>
          </Text>
          <Text style={styles.outcomeHint}>El estado colapsó. Pulsa Reset para volver a |0⟩.</Text>
        </View>
      )}

      <Text style={[styles.label, { marginTop: 18 }]}>Compuertas</Text>

      <Text style={styles.gateGroup}>q0 (cúbit de arriba)</Text>
      <View style={styles.row}>
        <GateButton label="X" onPress={() => onGate('X', 0)} />
        <GateButton label="H" onPress={() => onGate('H', 0)} />
        <GateButton label="Z" onPress={() => onGate('Z', 0)} />
        <GateButton label="S" onPress={() => onGate('S', 0)} />
        <GateButton label="T" onPress={() => onGate('T', 0)} />
      </View>

      {n === 2 && (
        <>
          <Text style={styles.gateGroup}>q1 (cúbit de abajo)</Text>
          <View style={styles.row}>
            <GateButton label="X" onPress={() => onGate('X', 1)} />
            <GateButton label="H" onPress={() => onGate('H', 1)} />
            <GateButton label="Z" onPress={() => onGate('Z', 1)} />
            <GateButton label="S" onPress={() => onGate('S', 1)} />
            <GateButton label="T" onPress={() => onGate('T', 1)} />
          </View>

          <Text style={styles.gateGroup}>2 qubits (entrelaza)</Text>
          <View style={styles.row}>
            <GateButton label="CNOT" onPress={onCNOT} />
          </View>
        </>
      )}

      <View style={[styles.row, { marginTop: 24 }]}>
        <GateButton label="📏 Medir" onPress={onMeasure} variant="primary" style={{ flex: 1 }} />
        <GateButton label="↺ Reset" onPress={reset} variant="ghost" style={{ flex: 1 }} />
      </View>

      <Text style={styles.tip}>
        💡 Prueba: 2 qubits → H en q0 → CNOT. Verás el estado de Bell (|00⟩+|11⟩)/√2.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { color: Colors.text, fontSize: 30, fontWeight: '800' },
  sub: { color: Colors.textMuted, fontSize: 14, marginTop: 6, lineHeight: 20 },
  seg: {
    flexDirection: 'row',
    backgroundColor: Colors.bgElevated,
    borderRadius: 10,
    padding: 4,
    marginTop: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  segItem: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  segItemActive: { backgroundColor: Colors.primary },
  segText: { color: Colors.textMuted, fontWeight: '700' },
  segTextActive: { color: Colors.text },
  stateCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 18,
  },
  expr: {
    color: Colors.text,
    fontFamily: 'Courier',
    fontSize: 18,
    marginTop: 6,
    lineHeight: 24,
  },
  steps: { color: Colors.textMuted, fontSize: 12, marginTop: 8 },
  bars: { marginTop: 10 },
  outcome: {
    backgroundColor: Colors.bgElevated,
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
  },
  outcomeText: { color: Colors.text, fontSize: 15 },
  outcomeValue: { color: Colors.accent, fontFamily: 'Courier', fontWeight: '700' },
  outcomeHint: { color: Colors.textMuted, fontSize: 12, marginTop: 4 },
  gateGroup: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 14,
    marginBottom: 6,
    fontWeight: '600',
  },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tip: {
    color: Colors.textMuted,
    fontSize: 13,
    marginTop: 18,
    lineHeight: 19,
    fontStyle: 'italic',
  },
});
