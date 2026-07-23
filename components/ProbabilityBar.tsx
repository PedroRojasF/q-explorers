import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Props {
  label: string;
  prob: number;
  highlight?: boolean;
}

export function ProbabilityBar({ label, prob, highlight }: Props) {
  const pct = Math.max(0, Math.min(1, prob));
  return (
    <View style={styles.row}>
      <Text style={styles.label}>|{label}⟩</Text>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${pct * 100}%` },
            highlight ? styles.fillHighlight : null,
          ]}
        />
      </View>
      <Text style={styles.pct}>{(pct * 100).toFixed(0)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  label: {
    color: Colors.text,
    fontFamily: 'Courier',
    fontSize: 16,
    width: 48,
  },
  track: {
    flex: 1,
    height: 22,
    backgroundColor: Colors.probLow,
    borderRadius: 6,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.probHigh,
    borderRadius: 6,
  },
  fillHighlight: { backgroundColor: Colors.accent },
  pct: {
    color: Colors.textMuted,
    fontFamily: 'Courier',
    fontSize: 14,
    width: 44,
    textAlign: 'right',
  },
});
