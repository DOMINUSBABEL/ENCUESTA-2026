# AtlasIntel Colombia 2026 - Dashboard de Análisis Electoral

## Descripción General
Este aplicativo es una solución de inteligencia de datos diseñada para el análisis detallado, técnico y visual de la encuesta presidencial **AtlasIntel - Semana (Enero 2026)**. 

La plataforma permite a analistas políticos, periodistas y ciudadanos explorar proyecciones electorales, realizar simulaciones de segunda vuelta y desglosar datos demográficos complejos a través de una interfaz interactiva de alto rendimiento.

**Desarrollado por:** Consultora Talleyrand.

---

## Arquitectura Técnica

Aunque la visualización es web (React), el sistema implementa una lógica de manejo de datos inspirada en **Python/Pandas**:
- **DataFrames Virtuales:** Las estructuras de datos en `constants.ts` simulan DataFrames, permitiendo operaciones de filtrado, agrupación y transformación en tiempo real.
- **Limpieza de Datos:** Módulo de pre-procesamiento que normaliza los porcentajes y maneja valores atípicos (NS/NR) para mantener la integridad estadística.
- **Visualización Vectorial:** Uso de `Recharts` para renderizado SVG de alta precisión, garantizando que los gráficos no pierdan calidad en ninguna resolución.

## Características Principales

### 1. Análisis Multidimensional
- **Desglose Demográfico:** Filtros cruzados por Género, Edad y Región.
- **Comparativa de Brechas:** Cálculo automático de diferenciales (puntos porcentuales) entre candidatos líderes.
- **Radar de Atributos:** Visualización de percepción de candidatos en ejes temáticos (Seguridad, Economía, etc.).

### 2. Simulador de Segunda Vuelta (Runoff)
- **Motor de Inferencia:** Algoritmo que permite al usuario ajustar variables críticas:
  - Distribución de votos indecisos (NS/NR).
  - Conversión de voto en blanco a voto válido.
- **Proyección en Tiempo Real:** Recálculo instantáneo de probabilidades de victoria basado en los parámetros ajustados.

### 3. Exportación de Datos
- Capacidad de exportar datasets procesados a formato **CSV** compatible con Excel, Python (Pandas) y R para análisis externos.
- Accesible desde cada vista para facilitar la portabilidad de la información.

### 4. Experiencia de Usuario (UX) Técnica
- **Diseño Limpio:** Tipografía Inter para máxima legibilidad.
- **Feedback Visual:** Indicadores de carga (Skeleton loaders) y tooltips interactivos con métricas contextuales.
- **Accesibilidad:** Navegación semántica y contrastes optimizados.

---

## Estructura del Proyecto

```
/
├── src/
│   ├── components/    # Componentes UI reutilizables (Sidebar, StatCard, Charts)
│   ├── views/         # Vistas lógicas (Primera Vuelta, Segunda Vuelta, Metodología)
│   ├── constants.ts   # "Base de datos" estática y definiciones de tipos
│   ├── utils.ts       # Motores de exportación y transformación de datos
│   └── App.tsx        # Enrutador y Layout principal
├── public/
└── package.json
```

## Stack Tecnológico

- **Core:** React 18+ (TypeScript)
- **Estilos:** Tailwind CSS (Utility-first framework)
- **Visualización:** Recharts (D3-based wrapper)
- **Iconografía:** Lucide React
- **Build Tool:** Vite / ESBuild

---

© 2026 Consultora Talleyrand. Todos los derechos reservados.
