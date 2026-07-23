// ponytail: simulator de 1-2 qubits sin dependencias, suficiente para enseñanza.
// Upgrade path: si se añaden más qubits, cambiar vector denso a sparse o usar un tensor network.

export type Complex = { re: number; im: number };

const C = (re: number, im: number = 0): Complex => ({ re, im });

const cAdd = (a: Complex, b: Complex): Complex => C(a.re + b.re, a.im + b.im);
const cSub = (a: Complex, b: Complex): Complex => C(a.re - b.re, a.im - b.im);
const cMul = (a: Complex, b: Complex): Complex =>
  C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const cScale = (a: Complex, s: number): Complex => C(a.re * s, a.im * s);

export type Gate1Q = 'X' | 'H' | 'Z' | 'S' | 'T' | 'I';
export type Gate2Q = 'CNOT';
export type Gate = Gate1Q | Gate2Q;

export type QubitCount = 1 | 2;

export interface State {
  n: QubitCount;
  // vector de tamaño 2^n; índice 0 = |0...0⟩, último = |1...1⟩
  vec: Complex[];
}

export const newState = (n: QubitCount): State => {
  const vec = new Array<Complex>(1 << n).fill(C(0));
  vec[0] = C(1);
  return { n, vec };
};

const isZero = (z: Complex) => Math.abs(z.re) < 1e-9 && Math.abs(z.im) < 1e-9;

const mat1 = (g: Gate1Q): Complex[][] => {
  const s = Math.SQRT1_2;
  switch (g) {
    case 'I':
      return [[C(1), C(0)], [C(0), C(1)]];
    case 'X':
      return [[C(0), C(1)], [C(1), C(0)]];
    case 'Z':
      return [[C(1), C(0)], [C(0), C(-1)]];
    case 'H':
      return [
        [C(s), C(s)],
        [C(s), C(-s)],
      ];
    case 'S':
      return [[C(1), C(0)], [C(0), C(0, 1)]];
    case 'T':
      return [[C(1), C(0)], [C(0), C(s, s)]];
  }
};

const apply1Q = (st: State, qubit: 0 | 1, gate: Gate1Q): State => {
  if (st.n === 1) {
    const m = mat1(gate);
    const v = st.vec;
    return {
      n: st.n,
      vec: [cAdd(cMul(m[0][0], v[0]), cMul(m[0][1], v[1])), cAdd(cMul(m[1][0], v[0]), cMul(m[1][1], v[1]))],
    };
  }
  // 2 qubits, qubit = 0 (q0) o 1 (q1). vector reordenado por qubit objetivo.
  // Para simplificar, construimos la matriz 4x4 y multiplicamos.
  const m = mat1(gate);
  const dim = 4;
  const M: Complex[][] = Array.from({ length: dim }, () => new Array<Complex>(dim).fill(C(0)));
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      const bitI = (i >> qubit) & 1;
      const bitJ = (j >> qubit) & 1;
      // las otras patas quedan iguales
      const otherI = i ^ (bitI << qubit);
      const otherJ = j ^ (bitJ << qubit);
      if (otherI !== otherJ) continue;
      M[i][j] = m[bitI][bitJ];
    }
  }
  const out: Complex[] = new Array(dim).fill(C(0));
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      if (isZero(M[i][j])) continue;
      out[i] = cAdd(out[i], cMul(M[i][j], st.vec[j]));
    }
  }
  return { n: st.n, vec: out };
};

const applyCNOT = (st: State, control: 0 | 1, target: 0 | 1): State => {
  const dim = 4;
  const out: Complex[] = st.vec.slice();
  for (let i = 0; i < dim; i++) {
    const cBit = (i >> control) & 1;
    const tBit = (i >> target) & 1;
    if (cBit === 1 && tBit === 0) {
      const j = i ^ (1 << target);
      const tmp = out[i];
      out[i] = out[j];
      out[j] = tmp;
    }
  }
  return { n: st.n, vec: out };
};

export const applyGate = (st: State, gate: Gate, target: 0 | 1, control?: 0 | 1): State => {
  if (gate === 'CNOT') {
    if (st.n !== 2) return st;
    if (control === undefined || control === target) return st;
    return applyCNOT(st, control, target);
  }
  if (st.n === 2 && target === 1 && (gate === 'X' || gate === 'H' || gate === 'Z')) {
    // q1 en notación little-endian: índice 0 = |00⟩, 1 = |01⟩, 2 = |10⟩, 3 = |11⟩
    return apply1Q(st, target, gate);
  }
  return apply1Q(st, target, gate);
};

export const probOf = (st: State, basis: string): number => {
  const idx = parseInt(basis, 2);
  const a = st.vec[idx];
  return a.re * a.re + a.im * a.im;
};

export const probs = (st: State): { basis: string; prob: number; amp: Complex }[] => {
  const out: { basis: string; prob: number; amp: Complex }[] = [];
  for (let i = 0; i < st.vec.length; i++) {
    const a = st.vec[i];
    const prob = a.re * a.re + a.im * a.im;
    out.push({ basis: i.toString(2).padStart(st.n, '0'), prob, amp: a });
  }
  return out;
};

export const measureOnce = (st: State): { outcome: string; post: State } => {
  const r = Math.random();
  let acc = 0;
  let chosen = 0;
  for (let i = 0; i < st.vec.length; i++) {
    acc += probOf(st, i.toString(2).padStart(st.n, '0'));
    if (r <= acc) {
      chosen = i;
      break;
    }
  }
  // colapsa: |ψ'⟩ = |basis⟩ (probabilidad 1)
  const post: Complex[] = new Array(st.vec.length).fill(C(0));
  post[chosen] = C(1);
  return { outcome: chosen.toString(2).padStart(st.n, '0'), post: { n: st.n, vec: post } };
};

export const formatAmp = (a: Complex): string => {
  if (isZero(a)) return '0';
  const r = Math.sqrt(a.re * a.re + a.im * a.im);
  const phase = Math.atan2(a.im, a.re);
  const fmt = (x: number) => (Math.abs(x) < 1e-6 ? '0' : x.toFixed(2));
  if (Math.abs(phase) < 1e-3) return fmt(a.re);
  if (Math.abs(Math.abs(phase) - Math.PI) < 1e-3) return (a.re < 0 ? '-' : '') + fmt(Math.abs(a.re));
  // muestra real e imag
  return `${fmt(a.re)}${a.im >= 0 ? '+' : ''}${fmt(a.im)}i`;
};

export const describeState = (st: State): string => {
  const parts: string[] = [];
  for (let i = 0; i < st.vec.length; i++) {
    const a = st.vec[i];
    if (isZero(a)) continue;
    const basis = `|${i.toString(2).padStart(st.n, '0')}⟩`;
    if (parts.length === 0) parts.push(`${formatAmp(a)}·${basis}`);
    else parts.push(`${formatAmp(a).startsWith('-') ? '−' : '+'}${formatAmp(a).replace('-', '')}·${basis}`);
  }
  return parts.length ? parts.join(' ') : '0';
};
