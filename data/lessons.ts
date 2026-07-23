export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  summary: string;
  readMinutes: number;
  body: string;
  tryIt?: { gate: import('@/lib/quantum').Gate; description: string }[];
}

export const lessons: Lesson[] = [
  {
    id: 'qubit',
    title: '¿Qué es un qubit?',
    emoji: '🪙',
    summary: 'El bit clásico solo vale 0 o 1. Un qubit puede ser los dos a la vez.',
    readMinutes: 3,
    body:
      'Un **bit clásico** es una moneda tirada en la mesa: solo puede mostrar cara (0) o cruz (1). Un **qubit** es una moneda que está girando en el aire: en ese momento *es* las dos cosas a la vez.\n\n' +
      'Matemáticamente lo escribimos como α|0⟩ + β|1⟩, donde α y β son números que dicen "cuánto" de cada valor hay. La regla sagrada es |α|² + |β|² = 1, así que las probabilidades siempre suman 100%.\n\n' +
      'Cuando mides el qubit, la moneda cae: obtienes 0 con probabilidad |α|² y 1 con probabilidad |β|². El estado cuántico se destruye al medir.',
    tryIt: [
      { gate: 'I', description: 'Estado |0⟩: 100% probabilidad de medir 0.' },
      { gate: 'X', description: 'Aplica X (NOT) y verás |1⟩: 100% de medir 1.' },
    ],
  },
  {
    id: 'superposicion',
    title: 'Superposición: la moneda en el aire',
    emoji: '🌗',
    summary: 'La compuerta Hadamard pone al qubit en el aire: mitad 0, mitad 1.',
    readMinutes: 4,
    body:
      'La compuerta **Hadamard (H)** toma un qubit decidido (0 o 1) y lo pone en superposición: ahora es 50% cero y 50% uno, con la misma fase.\n\n' +
      'H|0⟩ = (|0⟩ + |1⟩)/√2\n' +
      'H|1⟩ = (|0⟩ − |1⟩)/√2\n\n' +
      'Aplicar H dos veces seguidas devuelve el qubit a su estado original: H·H = I. Es como girar la moneda dos veces seguidas en direcciones opuestas y que termine como empezó.\n\n' +
      'La superposición **no** significa "el qubit vale 0 o 1 pero no sabemos cuál". Significa que realmente está en ambos valores a la vez hasta que medimos.',
    tryIt: [
      { gate: 'H', description: 'Aplica H sobre |0⟩. Verás 50/50.' },
      { gate: 'H', description: 'Aplica H otra vez. Vuelve a |0⟩.' },
    ],
  },
  {
    id: 'medicion',
    title: 'Medición: cuando la moneda cae',
    emoji: '🎯',
    summary: 'Medir destruye la superposición y da un resultado al azar.',
    readMinutes: 3,
    body:
      'La **medición** es la única forma de obtener un resultado clásico (un 0 o un 1) desde un qubit. El problema: es aleatoria.\n\n' +
      'Si tu qubit está en (|0⟩ + |1⟩)/√2, medir te dará 0 la mitad de las veces y 1 la otra mitad. No hay forma de predecirlo.\n\n' +
      'Y lo más importante: **después de medir, el estado cuántico se destruye**. Si vuelves a medir, obtienes el mismo valor con 100% de certeza, pero ya no queda nada cuántico que explorar.\n\n' +
      'Por eso los algoritmos cuánticos son cuidadosos: miden solo al final, cuando ya no necesitan la superposición.',
    tryIt: [
      { gate: 'H', description: 'Aplica H, luego mide varias veces. Verás que sale 0 y 1.' },
    ],
  },
  {
    id: 'entrelazamiento',
    title: 'Entrelazamiento: la conexión imposible',
    emoji: '🔗',
    summary: 'Dos qubits pueden estar correlacionados sin importar la distancia.',
    readMinutes: 5,
    body:
      'El **entrelazamiento** es la parte más extraña de la mecánica cuántica. Dos qubits entrelazados no se pueden describir por separado: forman un solo estado conjunto.\n\n' +
      'El ejemplo clásico es el **estado de Bell**:\n' +
      'H sobre el primer qubit + CNOT hacia el segundo.\n\n' +
      'El resultado es (|00⟩ + |11⟩)/√2. Si mides el primer qubit y sale 0, el segundo *seguro* vale 0. Si sale 1, el segundo seguro vale 1. Esto pasa incluso si están en galaxias distintas.\n\n' +
      'Ojo: esto **no** sirve para enviar mensajes más rápido que la luz. La correlación existe, pero el resultado sigue siendo aleatorio: no controlas qué valor va a salir.\n\n' +
      'El entrelazamiento es la base de la teleportación cuántica, la criptografía cuántica y los algoritmos como Grover o Shor.',
    tryIt: [
      { gate: 'H', description: 'Aplica H al qubit 0.' },
      { gate: 'CNOT', description: 'Aplica CNOT con q0 como control y q1 como objetivo.' },
    ],
  },
  {
    id: 'compuertas',
    title: 'Tu caja de herramientas cuántica',
    emoji: '🧰',
    summary: 'X, Z, H, S, T y CNOT: las seis letras del alfabeto cuántico.',
    readMinutes: 4,
    body:
      'Cualquier algoritmo cuántico se construye combinando un puñado de compuertas:\n\n' +
      '• **X** (NOT): invierte |0⟩ ↔ |1⟩. La más simple.\n' +
      '• **Z**: invierte la fase de |1⟩. Sola no cambia probabilidades, pero combinada con H actúa como una "puerta lógica cuántica".\n' +
      '• **H** (Hadamard): pone en superposición. La más usada.\n' +
      '• **S** y **T**: rotaciones de fase pequeñas. Son los "ladrillos" de algoritmos avanzados.\n' +
      '• **CNOT**: entrelaza dos qubits. La única compuerta de 2 qubits en este simulador.\n\n' +
      'Con H + CNOT ya puedes hacer teleportación y construir estados de Bell. Con H + T + CNOT puedes construir **cualquier** circuito cuántico, por raro que parezca. Se llama "conjunto universal".',
  },
];
