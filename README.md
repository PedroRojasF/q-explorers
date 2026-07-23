# Quantika Mobile

App en React Native + Expo para introducir la computación cuántica a estudiantes de secundaria.

## Empezar

```bash
cd mobile
npm install
npx expo start
```

Escanea el QR con la app **Expo Go** (Android/iOS) o pulsa `w` para abrir en el navegador.

## Estructura

```
mobile/
├── app/                    # Rutas con expo-router (file-based)
│   ├── _layout.tsx         # Stack raíz
│   ├── (tabs)/             # Tabs inferiores
│   │   ├── _layout.tsx
│   │   ├── index.tsx       # Inicio
│   │   ├── lessons.tsx     # Índice de lecciones
│   │   ├── simulator.tsx   # Simulador 1-2 qubits
│   │   └── about.tsx
│   └── lesson/[id].tsx     # Detalle de lección + laboratorio
├── components/             # UI compartido
│   ├── Screen.tsx
│   ├── ProbabilityBar.tsx
│   └── GateButton.tsx
├── lib/
│   └── quantum.ts          # Simulador de 1-2 qubits (sin dependencias)
├── data/
│   └── lessons.ts          # Contenido educativo
├── constants/
│   └── Colors.ts           # Paleta
├── app.json                # Configuración Expo
├── package.json
└── tsconfig.json
```

## Cómo añadir una lección

Edita `data/lessons.ts` y añade un objeto al array `lessons`:

```ts
{
  id: 'mi-leccion',
  title: 'Título corto',
  emoji: '🔮',
  summary: 'Una frase que enganche.',
  readMinutes: 3,
  body: 'Texto en markdown básico (**negrita**, líneas, • viñetas).',
  tryIt: [
    { gate: 'H', description: 'Aplica H sobre |0⟩.' },
  ],
}
```

`gate` puede ser `'X' | 'H' | 'Z' | 'S' | 'T' | 'I' | 'CNOT'`. Si usas `CNOT`, la lección se abrirá con 2 qubits automáticamente.

## Notas técnicas

- **Sin dependencias cuánticas.** El simulador está en `lib/quantum.ts` con aritmética de complejos manual. 1 o 2 qubits; suficiente para intuición.
- **Sin Tailwind, sin librerías UI.** `StyleSheet` de React Native y paleta propia en `constants/Colors.ts`.
- **Modo oscuro por defecto** con paleta de alto contraste.

## Pendientes (cuando la base esté validada)

- Marcador de progreso por lección (`AsyncStorage`).
- Más qubits (sparse vector o cambio a `dwave-qiskit`/`cirq` JS).
- Visualización de la esfera de Bloch con `react-native-svg`.
- Cuenta atrás / quiz por lección.
