export type QuantumExperimentResult = {
  zeros: number;
  ones: number;
  shots: number;
};

export const QISKIT_HADAMARD_CODE = `from qiskit import QuantumCircuit

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)

# En producción, este circuito se enviará
# a un backend de IBM Quantum.`;

/**
 * Ejecuta el experimento Hadamard usado por la demo.
 *
 * Hoy devuelve un resultado local y estable para que la presentación no
 * dependa de red. La pantalla solo conoce este contrato, por lo que esta
 * implementación se puede reemplazar por una llamada REST a Qiskit/IBM
 * Quantum sin cambiar la experiencia de usuario.
 */
export async function runHadamardExperiment(shots: number): Promise<QuantumExperimentResult> {
  const safeShots = Math.max(1, Math.round(shots));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const zeros = Math.round(safeShots * 0.49);
  return { zeros, ones: safeShots - zeros, shots: safeShots };
}
