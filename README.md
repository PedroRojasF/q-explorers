# Qubitpacha

Aplicación educativa para estudiantes de secundaria que conecta los fundamentos de la computación cuántica con constelaciones, animales y sistemas de conocimiento andinos.

## Recorridos

- **Estudiante:** bienvenida, elección de guía, mapa de constelaciones, mundos, misiones interactivas, recompensas, diario y perfil.
- **Profesor:** resumen de clases, progreso y estudiantes, asignación de misiones y recursos para trabajar dentro o fuera del aula.

El progreso de la sesión se mantiene en un contexto compartido: las respuestas correctas entregan XP, encienden estrellas y desbloquean la misión siguiente.

## Desarrollo

```bash
npm install
npm start
```

Para ejecutar en web:

```bash
npm run web
```

También están disponibles `npm run android` y `npm run ios` para los entornos compatibles.

## Estructura principal

- `app/`: rutas y pantallas de Expo Router.
- `components/JourneyUI.tsx`: sistema visual compartido.
- `data/journey.ts`: mundos, misiones, guías y datos docentes.
- `lib/JourneyContext.tsx`: rol, guía y progreso de la sesión.
- `lib/quantum.ts`: simulador cuántico conservado como base para futuros retos.

Construido con Expo SDK 54, React Native y TypeScript.
