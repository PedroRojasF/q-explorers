// ponytail: self-check del simulador cuántico. Ejecutar con: npx tsx _check.ts
import { newState, applyGate, probs, describeState, measureOnce } from './lib/quantum';

const eps = 1e-9;
const near = (a: number, b: number) => Math.abs(a - b) < eps;

const assert = (label: string, cond: boolean) => {
  console.log(`${cond ? 'OK  ' : 'FAIL'}  ${label}`);
  if (!cond) process.exit(1);
};

// 1. X|0⟩ = |1⟩
let s = newState(1);
s = applyGate(s, 'X', 0);
let p = probs(s);
assert('X|0⟩ = |1⟩', near(p[0].prob, 0) && near(p[1].prob, 1));

// 2. H|0⟩ = (|0⟩+|1⟩)/√2 → 50/50
s = newState(1);
s = applyGate(s, 'H', 0);
p = probs(s);
assert('H|0⟩ = 50/50', near(p[0].prob, 0.5) && near(p[1].prob, 0.5));

// 3. H·H·|0⟩ = |0⟩
s = newState(1);
s = applyGate(s, 'H', 0);
s = applyGate(s, 'H', 0);
p = probs(s);
assert('H·H|0⟩ = |0⟩', near(p[0].prob, 1) && near(p[1].prob, 0));

// 4. Z|0⟩ = |0⟩, Z|1⟩ = |1⟩ (no cambia probabilidades)
s = newState(1);
s = applyGate(s, 'X', 0);
s = applyGate(s, 'Z', 0);
s = applyGate(s, 'H', 0); // H|1⟩ = (|0⟩-|1⟩)/√2
p = probs(s);
assert('Z|1⟩ mide 50/50 tras H', near(p[0].prob, 0.5) && near(p[1].prob, 0.5));

// 5. Estado de Bell: H|0⟩ ⊗ CNOT(0→1) sobre |00⟩ → (|00⟩+|11⟩)/√2
s = newState(2);
s = applyGate(s, 'H', 0);
s = applyGate(s, 'CNOT', 1, 0);
p = probs(s);
const bellOk = near(p[0].prob, 0.5) && near(p[1].prob, 0) && near(p[2].prob, 0) && near(p[3].prob, 0.5);
assert('Bell (|00⟩+|11⟩)/√2', bellOk);
console.log('   Estado:', describeState(s));

// 6. Medición colapsa al estado medido
s = newState(1);
s = applyGate(s, 'H', 0);
const m = measureOnce(s);
const postP = probs(m.post);
const ok = (m.outcome === '0' || m.outcome === '1') && near(postP[0].prob + postP[1].prob, 1);
assert('Medición colapsa a un valor', ok && (near(postP[0].prob, 1) || near(postP[1].prob, 1)));

console.log('\nTodos los checks pasaron.');
