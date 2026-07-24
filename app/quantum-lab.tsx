import { useState } from 'react';
import { router } from 'expo-router';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, JourneyScreen, PaperCard, PrimaryButton } from '@/components/JourneyUI';
import { Colors } from '@/constants/Colors';
import { useJourney } from '@/lib/JourneyContext';
import { QISKIT_HADAMARD_CODE, QuantumExperimentResult, runHadamardExperiment } from '@/services/quantumService';

type Prediction = 'zero' | 'one' | 'half';

const predictions: { id: Prediction; label: string }[] = [
  { id: 'zero', label: 'Siempre 0' },
  { id: 'one', label: 'Siempre 1' },
  { id: 'half', label: 'Aproximadamente mitad y mitad' },
];

export default function QuantumLabScreen() {
  const { completeMission, recordExperiment } = useJourney();
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<QuantumExperimentResult | null>(null);
  const [showCode, setShowCode] = useState(false);

  const execute = async () => {
    if (!prediction || running) return;
    setRunning(true);
    const nextResult = await runHadamardExperiment(100);
    setResult(nextResult);
    recordExperiment({
      zeros: nextResult.zeros,
      ones: nextResult.ones,
      prediction,
      conceptualAnswer: prediction === 'half' ? 'correct' : 'review',
      completedAt: new Date().toISOString(),
    });
    completeMission('quantum-experiment');
    setRunning(false);
  };

  return (
    <JourneyScreen>
      <View style={styles.page}>
        <AppHeader title="Laboratorio Cuántico" back />
        <Text style={styles.eyebrow}>EXPERIMENTO 01 · HADAMARD</Text>
        <Text style={styles.title}>Un qubit, dos posibilidades</Text>
        <Text style={styles.copy}>Prepara un qubit en 0, aplica Hadamard y mídelo 100 veces.</Text>

        <PaperCard style={styles.circuitCard}>
          <View style={styles.circuit}>
            <View style={styles.state}><Text style={styles.stateText}>|0⟩</Text></View>
            <View style={styles.wire} />
            <View style={styles.gate}><Text style={styles.gateText}>H</Text></View>
            <View style={styles.wire} />
            <View style={styles.measure}><Text style={styles.measureIcon}>⌁</Text><Text style={styles.measureText}>Medir</Text></View>
          </View>
          <Text style={styles.shots}>100 mediciones</Text>
          {__DEV__ && <Pressable onPress={() => setShowCode(true)}><Text style={styles.codeLink}>Ver circuito</Text></Pressable>}
        </PaperCard>

        {!result ? (
          <>
            <Text style={styles.sectionTitle}>¿Qué crees que ocurrirá?</Text>
            <View style={styles.options}>
              {predictions.map((item) => (
                <Pressable key={item.id} disabled={running} onPress={() => setPrediction(item.id)} style={[styles.option, prediction === item.id && styles.optionSelected]}>
                  <View style={[styles.radio, prediction === item.id && styles.radioSelected]} />
                  <Text style={styles.optionText}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
            <PrimaryButton label={running ? 'Ejecutando 100 mediciones…' : 'Ejecutar 100 mediciones'} disabled={!prediction || running} onPress={execute} />
            {running && <Text style={styles.running}>El qubit atraviesa la puerta Hadamard ✦</Text>}
          </>
        ) : (
          <View style={styles.results}>
            <Text style={styles.sectionTitle}>Resultado observado</Text>
            <ResultBar label="0" value={result.zeros} shots={result.shots} color={Colors.teal} />
            <ResultBar label="1" value={result.ones} shots={result.shots} color={Colors.orange} />

            <View style={[styles.feedback, prediction === 'half' ? styles.feedbackGood : styles.feedbackReview]}>
              <Text style={styles.feedbackTitle}>{prediction === 'half' ? '¡Tu hipótesis fue comprobada!' : 'Tu hipótesis encontró algo nuevo'}</Text>
              <Text style={styles.feedbackText}>
                {prediction === 'half'
                  ? 'Las 100 mediciones formaron el patrón que anticipaste.'
                  : 'Hadamard no obliga al qubit a elegir siempre el mismo valor: al repetir, aparecen ambos resultados.'}
              </Text>
            </View>

            <PaperCard style={styles.explanation}>
              <Text style={styles.explanationTitle}>¿Qué descubriste?</Text>
              <Text style={styles.explanationText}>La puerta Hadamard prepara una superposición. Cada medición entrega 0 o 1, pero muchas repeticiones revelan un patrón cercano a mitad y mitad.</Text>
            </PaperCard>

            <View style={styles.ibmSeal}>
              <Text style={styles.ibmIcon}>⚛</Text>
              <View style={styles.ibmCopy}><Text style={styles.ibmTitle}>Compatible con IBM Quantum</Text><Text style={styles.ibmMeta}>Modo demo · simulación local preparada para conexión real</Text></View>
            </View>
            <PrimaryButton secondary label="Continuar" onPress={() => router.replace({ pathname: '/reward', params: { id: 'quantum-experiment' } })} />
          </View>
        )}
      </View>

      <Modal visible={showCode} transparent animationType="fade" onRequestClose={() => setShowCode(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Circuito en Qiskit</Text>
            <Text style={styles.code}>{QISKIT_HADAMARD_CODE}</Text>
            <PrimaryButton secondary label="Cerrar" onPress={() => setShowCode(false)} />
          </View>
        </View>
      </Modal>
    </JourneyScreen>
  );
}

function ResultBar({ label, value, shots, color }: { label: string; value: number; shots: number; color: string }) {
  const percentage = Math.round((value / shots) * 100);
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>|{label}⟩</Text>
      <View style={styles.resultTrack}><View style={[styles.resultFill, { width: `${percentage}%`, backgroundColor: color }]} /></View>
      <Text style={styles.resultValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, paddingHorizontal: 4, paddingBottom: 26 },
  eyebrow: { color: Colors.orange, fontFamily: 'Nunito_800ExtraBold', fontSize: 11, letterSpacing: 1.2, marginTop: 14 },
  title: { color: Colors.ink, fontFamily: 'Lora_700Bold', fontSize: 29, lineHeight: 36, marginTop: 6 },
  copy: { color: Colors.inkSoft, fontFamily: 'Nunito_600SemiBold', fontSize: 14, lineHeight: 20, marginTop: 5 },
  circuitCard: { marginTop: 18, alignItems: 'center' },
  circuit: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  state: { width: 48, alignItems: 'center' }, stateText: { color: Colors.ink, fontFamily: 'Lora_700Bold', fontSize: 21 },
  wire: { width: 30, height: 2, backgroundColor: Colors.inkSoft },
  gate: { width: 50, height: 50, borderRadius: 9, backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#00555B' },
  gateText: { color: Colors.white, fontFamily: 'Lora_700Bold', fontSize: 24 },
  measure: { width: 60, height: 50, borderRadius: 9, backgroundColor: '#FFF0D0', borderWidth: 1, borderColor: Colors.line, alignItems: 'center', justifyContent: 'center' },
  measureIcon: { color: Colors.orange, fontSize: 19, lineHeight: 18 }, measureText: { color: Colors.inkSoft, fontFamily: 'Nunito_700Bold', fontSize: 9 },
  shots: { color: Colors.ink, fontFamily: 'Nunito_800ExtraBold', fontSize: 12, marginTop: 12 },
  codeLink: { color: Colors.teal, fontFamily: 'Nunito_700Bold', fontSize: 11, textDecorationLine: 'underline', marginTop: 7 },
  sectionTitle: { color: Colors.ink, fontFamily: 'Lora_700Bold', fontSize: 19, marginTop: 21, marginBottom: 10 },
  options: { gap: 8, marginBottom: 17 },
  option: { minHeight: 48, borderRadius: 11, borderWidth: 1, borderColor: Colors.line, backgroundColor: '#FFF0D0', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13 },
  optionSelected: { borderColor: Colors.teal, borderWidth: 2, backgroundColor: '#DCE8D9' },
  radio: { width: 17, height: 17, borderRadius: 9, borderWidth: 2, borderColor: Colors.inkSoft, marginRight: 11 },
  radioSelected: { borderWidth: 5, borderColor: Colors.teal },
  optionText: { color: Colors.ink, fontFamily: 'Nunito_700Bold', fontSize: 13 },
  running: { color: Colors.teal, textAlign: 'center', fontFamily: 'Nunito_700Bold', fontSize: 12, marginTop: 10 },
  results: { paddingBottom: 5 },
  resultRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  resultLabel: { width: 36, color: Colors.ink, fontFamily: 'Lora_700Bold', fontSize: 17 },
  resultTrack: { flex: 1, height: 22, borderRadius: 11, backgroundColor: '#E4D1AA', overflow: 'hidden' },
  resultFill: { height: '100%', borderRadius: 11 },
  resultValue: { width: 36, color: Colors.ink, fontFamily: 'Nunito_800ExtraBold', fontSize: 14, textAlign: 'right' },
  feedback: { borderRadius: 12, padding: 13, marginTop: 6 }, feedbackGood: { backgroundColor: '#DCE5C2' }, feedbackReview: { backgroundColor: '#F7DEB6' },
  feedbackTitle: { color: Colors.ink, fontFamily: 'Nunito_800ExtraBold', fontSize: 14 }, feedbackText: { color: Colors.inkSoft, fontFamily: 'Nunito_600SemiBold', fontSize: 12, lineHeight: 17, marginTop: 3 },
  explanation: { marginTop: 12, padding: 13 }, explanationTitle: { color: Colors.ink, fontFamily: 'Lora_700Bold', fontSize: 16 }, explanationText: { color: Colors.inkSoft, fontFamily: 'Nunito_600SemiBold', fontSize: 12, lineHeight: 18, marginTop: 4 },
  ibmSeal: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Colors.teal, borderRadius: 12, padding: 10, marginVertical: 12, backgroundColor: '#E1ECE3' },
  ibmIcon: { color: Colors.teal, fontSize: 25, marginRight: 9 }, ibmCopy: { flex: 1 }, ibmTitle: { color: Colors.ink, fontFamily: 'Nunito_800ExtraBold', fontSize: 12 }, ibmMeta: { color: Colors.inkSoft, fontFamily: 'Nunito_600SemiBold', fontSize: 10, marginTop: 2 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(3,26,45,.72)', alignItems: 'center', justifyContent: 'center', padding: 22 },
  modalCard: { width: '100%', maxWidth: 430, borderRadius: 18, backgroundColor: Colors.paper, padding: 20 },
  modalTitle: { color: Colors.ink, fontFamily: 'Lora_700Bold', fontSize: 22, marginBottom: 13 },
  code: { color: Colors.paper, backgroundColor: Colors.night, borderRadius: 12, padding: 14, fontFamily: 'monospace', fontSize: 12, lineHeight: 18, marginBottom: 16 },
});
