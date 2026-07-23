import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Colors } from '@/constants/Colors';

export default function About() {
  return (
    <Screen>
      <Text style={styles.h1}>Sobre Quantika</Text>

      <View style={styles.card}>
        <Text style={styles.h2}>¿Por qué?</Text>
        <Text style={styles.p}>
          La computación cuántica suele explicarse con física de nivel universitario. Pero las
          ideas centrales (qubit, superposición, entrelazamiento) se pueden entender con una
          moneda y un par de analogías. Quantika intenta cerrar esa distancia.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.h2}>¿Para quién?</Text>
        <Text style={styles.p}>
          Estudiantes de secundaria y bachillerato con curiosidad. No necesitas saber
          cálculo, álgebra lineal ni programación.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.h2}>¿Qué hay dentro?</Text>
        <Text style={styles.p}>
          • Lecciones cortas con lenguaje cercano.{'\n'}
          • Un simulador de 1 y 2 qubits que cabe en la palma de la mano.{'\n'}
          • Ejercicios: aplicar compuertas, ver probabilidades, medir.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.h2}>Lo que NO es</Text>
        <Text style={styles.p}>
          No es un curso completo, ni un reemplazo de Qiskit. Es un primer paso: entender
          la intuición antes de pelearse con la matemática.
        </Text>
      </View>

      <Text style={styles.foot}>
        Hecho con ❤️ para democratizar la computación cuántica.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { color: Colors.text, fontSize: 30, fontWeight: '800', marginBottom: 16 },
  card: {
    backgroundColor: Colors.bgElevated,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  h2: { color: Colors.primary, fontSize: 14, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  p: { color: Colors.text, fontSize: 14, lineHeight: 21, marginTop: 8 },
  foot: { color: Colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: 20 },
});
