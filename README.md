# QubitPacha

QubitPacha es una aplicación educativa para estudiantes de secundaria. Presenta conceptos de computación cuántica a partir de temas conocidos en el colegio, como el sistema binario, la probabilidad y la medición.

La navegación se organiza como un mapa de constelaciones. Cada mundo contiene misiones cortas, preguntas y recompensas. La identidad visual utiliza una paleta inspirada en el cielo andino, quipus, constelaciones y una chakana. Estos elementos sirven como contexto visual y no se presentan como equivalencias históricas con la computación cuántica.

## Qué contiene el proyecto

La aplicación tiene dos recorridos principales.

### Estudiante

- Selección de rol y guía.
- Mapa con seis mundos temáticos.
- Misiones con preguntas de opción múltiple.
- Progreso mediante XP, estrellas e insignias.
- Diario y perfil del estudiante.
- Laboratorio para explorar un circuito con puerta Hadamard.

El primer mundo, **Código secreto**, comienza con quipus y bits. Después de completar **Bits en acción**, el estudiante pasa al laboratorio cuántico, formula una predicción y compara su respuesta con 100 mediciones.

### Profesor

- Resumen de clases y estudiantes.
- Progreso general y misiones activas.
- Resultados de experimentos cuánticos.
- Recomendaciones pedagógicas.
- Asignación de misiones y recursos de clase.

Los datos del panel docente son locales y sirven para mostrar el funcionamiento del prototipo. Todavía no hay cuentas, clases persistentes ni sincronización con un servidor.

## Laboratorio cuántico

El circuito utilizado es:

```text
|0⟩ ── H ── M
```

El estudiante elige primero una hipótesis:

- siempre se obtiene 0;
- siempre se obtiene 1;
- se obtiene aproximadamente la mitad de cada resultado.

Luego ejecuta 100 mediciones y observa el histograma. El objetivo es mostrar que una medición individual entrega un valor concreto, mientras que muchas repeticiones permiten reconocer el patrón asociado a la superposición preparada por Hadamard.

`services/quantumService.ts` define el contrato del experimento:

```ts
runHadamardExperiment(shots): Promise<{
  zeros: number;
  ones: number;
  shots: number;
  backend: 'qiskit-aer' | 'ibm-quantum';
}>
```

La implementación actual devuelve un resultado local reproducible para que el recorrido funcione sin conexión. No ejecuta todavía un job remoto de Qiskit o IBM Quantum. El servicio está separado de la interfaz para poder reemplazarlo más adelante por una llamada a una API sin modificar las pantallas.

El botón **Ver circuito** aparece durante el desarrollo o cuando `EXPO_PUBLIC_DEMO_MODE=true`. Abre un panel con el código equivalente en Qiskit, el diagrama y una explicación breve.

## Tecnologías

- React Native y Expo SDK 57.
- Expo Router para navegación basada en archivos.
- TypeScript.
- AsyncStorage para persistencia local.
- Lora para títulos y Nunito para texto e interfaz.
- EAS Hosting para la versión web.

El motor científico previsto utilizará Python, Qiskit y Qiskit Aer detrás de una API REST. Esa API aún no forma parte del repositorio.

## Estructura

```text
app/
  (tabs)/                 portada, lecciones y simulador
  mission/[id].tsx        actividades del estudiante
  world/[id].tsx          detalle de cada mundo
  quantum-invite.tsx      transición de bits a qubits
  quantum-lab.tsx         experimento Hadamard
  teacher.tsx             inicio del profesor
  class/[id].tsx          detalle de una clase
assets/qubitpacha/        imágenes de la aplicación
components/               componentes visuales compartidos
constants/Colors.ts       paleta de colores
data/                     mundos, misiones y lecciones
lib/JourneyContext.tsx    estado y persistencia del recorrido
lib/quantum.ts            utilidades de simulación local
services/quantumService.ts contrato del experimento cuántico
```

## Estado y persistencia

`JourneyContext` mantiene el rol, la guía elegida, las misiones completadas y el último experimento. El estado se guarda en AsyncStorage con la clave `@qubitpacha/journey-v1`.

Las estrellas y el XP se calculan a partir de las misiones completadas. No se almacenan credenciales ni datos personales.

## Ejecutar el proyecto

Requisitos:

- Bun 1.3.14.
- Node.js LTS, necesario para algunos comandos internos de Expo.

```bash
git clone https://github.com/PedroRojasF/q-explorers.git
cd q-explorers
bun install
bun run start
```

Desde Expo puedes abrir Android, iOS o web. También están disponibles estos comandos:

```bash
bun run android
bun run ios
bun run web
```

Para mostrar las herramientas adicionales del laboratorio en un build web, crea `.env.local` a partir de la plantilla:

```bash
cp .env.example .env.local
```

El archivo debe contener:

```env
EXPO_PUBLIC_DEMO_MODE=true
```

Los archivos `.env` reales no se guardan en Git.

## Verificación

Antes de publicar cambios se ejecutan las siguientes comprobaciones:

```bash
bun audit
bunx expo-doctor@latest
bunx tsc --noEmit
bun run export:web
```

El workflow `.github/workflows/ci.yml` repite estas validaciones en cada pull request y en cada cambio enviado a `main`. Dependabot y el escaneo de secretos están habilitados en GitHub.

## Despliegue web

La exportación web utiliza Metro y genera una aplicación de una sola página en `dist/`.

```bash
bun run export:web
bun run deploy:web
```

Para actualizar el entorno de producción:

```bash
bun run deploy:web:prod
```

El workflow `.eas/workflows/deploy-web.yml` publica automáticamente en EAS Hosting cuando hay cambios en `main`. La variable `EXPO_PUBLIC_DEMO_MODE` está configurada en EAS para los entornos de preview y producción.

## Limitaciones actuales

- El experimento cuántico se resuelve localmente.
- El panel docente usa datos de ejemplo.
- No hay autenticación ni backend.
- Solo el primer recorrido de aprendizaje está desarrollado por completo.
- Los mundos restantes están definidos, pero su contenido todavía está pendiente.

## Recursos visuales

Los assets propios de QubitPacha se encuentran en `assets/qubitpacha/`. Las fuentes Lora y Nunito se distribuyen bajo SIL Open Font License. Antes de una distribución comercial debe completarse el inventario de licencias de todos los recursos gráficos.
