# Demo ideal de QubitPacha

Esta guía condensa el problema, la experiencia de aprendizaje y el valor docente en menos de dos minutos.

## Objetivo

Demostrar que QubitPacha permite comprender una idea cuántica concreta —la relación entre superposición, medición y patrón probabilístico— sin comenzar con formalismo universitario.

## Guion sugerido

### 0:00–0:20 · El problema

**Fiorella:**

> Una profesora quiere explicar computación cuántica, pero los recursos empiezan con matemáticas avanzadas o analogías que no permiten experimentar. ¿Cómo puede ayudar a sus estudiantes a construir una intuición correcta?

Mostrar brevemente el modo profesor y pasar al mapa.

### 0:20–0:35 · La ruta

- Abrir el mapa de constelaciones.
- Seleccionar **Azar y probabilidad**.
- Explicar que los conocimientos escolares funcionan como punto de partida hacia una idea cuántica.

### 0:35–0:55 · Predicción

El estudiante encuentra un qubit inicialmente en `|0⟩` y una puerta Hadamard.

Pregunta:

> ¿Qué esperas observar si aplicamos Hadamard y medimos 100 veces?

Opciones sugeridas:

1. Siempre obtendremos 0.
2. Obtendremos aproximadamente la mitad 0 y la mitad 1.
3. Los resultados alternarán exactamente entre 0 y 1.

La respuesta correcta es la segunda. La palabra **aproximadamente** es pedagógicamente importante.

### 0:55–1:15 · Experimento

- Aplicar Hadamard.
- Ejecutar 100 shots.
- Mostrar un histograma con resultados plausibles, por ejemplo 48 ceros y 52 unos.
- Resaltar que una ejecución individual no puede predecirse, pero muchas mediciones revelan una distribución estable.

### 1:15–1:35 · Comprensión

Pregunta conceptual:

> ¿Qué demuestra el resultado?

Respuesta esperada:

> Cada medición es incierta, pero el conjunto de mediciones revela las probabilidades del estado preparado.

Aclaraciones:

- Hadamard no obliga a alternar 0 y 1.
- Un resultado 50/50 no significa que cada bloque de 100 shots será exactamente 50/50.
- La medición produce un valor clásico y modifica el estado preparado.

### 1:35–1:45 · Recompensa

- Encender una estrella de la constelación.
- Entregar XP.
- Mostrar una frase corta de Kusi que refuerce el aprendizaje, no solo la recompensa.

### 1:45–2:00 · Valor docente

Cambiar al modo profesor y mostrar:

- Predicción elegida.
- Conteos observados.
- Respuesta conceptual.
- Recomendación pedagógica.

Ejemplo de recomendación:

> El estudiante reconoce el patrón 50/50. Para consolidar la diferencia entre probabilidad teórica y frecuencia observada, compara ejecuciones de 10, 100 y 1000 shots.

## Criterios de éxito

Al terminar, el jurado debe poder responder:

1. ¿Qué problema educativo resuelve QubitPacha?
2. ¿Qué hizo el estudiante, además de leer información?
3. ¿Qué idea cuántica comprendió?
4. ¿Cómo utiliza el profesor la evidencia generada?

## Preparación técnica

- Abrir la app antes del pitch y dejar cargados los assets.
- Mantener una ruta directa desde el mapa hacia la misión.
- Usar resultados generados localmente si la API todavía no está disponible.
- Preparar un resultado de respaldo para evitar depender de la red.
- Verificar que la sesión estudiante y la vista profesor compartan el mismo resultado.

## Mensaje de cierre

> QubitPacha no intenta demostrar cuánto contenido puede almacenar. Demuestra que un estudiante puede construir, observar y explicar por primera vez un patrón cuántico que antes parecía inaccesible.
