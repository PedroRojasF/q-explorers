export type Mission = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  question: string;
  options: string[];
  answer: number;
  fact: string;
};

export type World = {
  id: string;
  number: number;
  title: string;
  theme: string;
  animal: string;
  color: string;
  description: string;
  missions: Mission[];
};

export const worlds: World[] = [
  {
    id: 'codigo-secreto',
    number: 1,
    title: 'Código secreto',
    theme: 'Bits y quipus',
    animal: '🦙',
    color: '#F3A712',
    description: 'Antes los incas usaban el quipu para guardar información. Hoy usamos bits: 0 y 1. Descubre cómo empezó todo.',
    missions: [
      {
        id: 'quipu-digital', title: 'El quipu digital', eyebrow: 'Misión 1 de 4',
        description: 'Observa el quipu y descubre qué información guarda.',
        question: '¿Qué representa este quipu?', options: ['Un número', 'Un texto', 'Una historia'], answer: 0,
        fact: 'Los quipus usaban nudos, colores y posiciones para registrar cantidades. ¡Un código ancestral!',
      },
      {
        id: 'bits-accion', title: 'Bits en acción', eyebrow: 'Misión 2 de 4',
        description: 'Un bit solo puede ser 0 o 1. Combínalos para representar información.',
        question: '¿Qué combinación binaria representa el número 5?', options: ['0101', '1010', '1100'], answer: 0,
        fact: '0101 equivale a 5: cada posición encendida suma una potencia de dos.',
      },
      {
        id: 'contar-binario', title: 'Contar en binario', eyebrow: 'Misión 3 de 4',
        description: 'Aprende a leer el idioma de las computadoras.',
        question: '¿Cuál es el número que sigue después de 011?', options: ['100', '012', '111'], answer: 0,
        fact: 'En binario, después de 011 viene 100, igual que después de 99 viene 100 en decimal.',
      },
      {
        id: 'reto-final', title: 'Reto final', eyebrow: 'Misión 4 de 4',
        description: 'Conecta el conocimiento ancestral con el mundo digital.',
        question: '¿Qué tienen en común un quipu y un bit?', options: ['Guardan información', 'Usan electricidad', 'Solo sirven para sumar'], answer: 0,
        fact: 'Ambos son formas de codificar información. Cambian las herramientas, no nuestra necesidad de guardar conocimiento.',
      },
    ],
  },
  {
    id: 'azar-probabilidad', number: 2, title: 'Azar y probabilidad', theme: 'Patrones del mundo', animal: '🦊', color: '#79A84D',
    description: 'Descubre cómo el azar revela patrones y prepara el camino hacia los estados cuánticos.', missions: [],
  },
  {
    id: 'superposicion', number: 3, title: 'Dos caminos', theme: 'Superposición', animal: '🐆', color: '#D85A1B',
    description: 'Explora cómo una posibilidad puede recorrer más de un camino al mismo tiempo.', missions: [],
  },
  {
    id: 'entrelazamiento', number: 4, title: 'Lazos invisibles', theme: 'Entrelazamiento', animal: '🦅', color: '#168A91',
    description: 'Conecta partículas lejanas como las estrellas de una misma constelación.', missions: [],
  },
  {
    id: 'medicion', number: 5, title: 'La mirada cambia todo', theme: 'Medición', animal: '🐍', color: '#8D6745',
    description: 'Comprueba por qué observar un sistema cuántico transforma su resultado.', missions: [],
  },
  {
    id: 'algoritmos', number: 6, title: 'Senderos cuánticos', theme: 'Algoritmos', animal: '🐻', color: '#244D67',
    description: 'Combina todo lo aprendido para resolver desafíos de una manera nueva.', missions: [],
  },
];

export const guides = [
  { id: 'kusi', name: 'Kusi', animal: '🦜', trait: 'Curioso y veloz', color: '#082D48' },
  { id: 'sami', name: 'Sami', animal: '🦙', trait: 'Sabia y tranquila', color: '#E9D2A4' },
  { id: 'inti', name: 'Inti', animal: '🐦', trait: 'Visión y balance', color: '#E5C68D' },
] as const;

export const students = [
  { name: 'Ana Quispe', xp: 120, progress: 92 },
  { name: 'Luis Mamani', xp: 110, progress: 78 },
  { name: 'María Yana', xp: 100, progress: 67 },
  { name: 'Diego H.', xp: 80, progress: 45 },
  { name: 'Sofía C.', xp: 60, progress: 32 },
];
