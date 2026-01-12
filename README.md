# AtlasIntel Colombia 2026 - Plataforma de Inteligencia Electoral

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![Status](https://img.shields.io/badge/status-production-success.svg)
![Developer](https://img.shields.io/badge/developer-Consultora%20Talleyrand-red.svg)

## 📋 Descripción Ejecutiva

Esta plataforma representa una solución de **Inteligencia de Datos (Business Intelligence)** aplicada al escenario electoral colombiano 2026. Desarrollada exclusivamente por **Consultora Talleyrand**, la herramienta transforma los datos estáticos de la encuesta AtlasIntel (Enero 2026) en un tablero de control dinámico, interactivo y analítico.

El sistema permite la simulación de escenarios, el análisis de brechas demográficas y la proyección de voto efectivo mediante algoritmos de inferencia estadística ejecutados en tiempo real en el cliente.

---

## 🏗 Arquitectura Técnica

El aplicativo sigue una arquitectura **SPA (Single Page Application)** desacoplada, optimizada para el rendimiento y la portabilidad de datos.

### Stack Tecnológico
*   **Core:** React 18 (TypeScript) para tipado estricto y seguridad en tiempo de compilación.
*   **Styling:** Tailwind CSS con arquitectura Utility-First para diseño responsivo y consistente.
*   **Data Visualization:** Recharts (basado en D3.js) para renderizado vectorial (SVG) de alta precisión.
*   **Icons:** Lucide React para iconografía semántica ligera.
*   **Build System:** Vite para HMR (Hot Module Replacement) instantáneo y bundling optimizado.

### Paradigma de Datos "Pandas-Like"
Aunque la aplicación se ejecuta en un entorno web, la estructuración de datos en `src/constants.ts` emula la arquitectura de **DataFrames de Pandas (Python)**:
1.  **Normalización:** Los datos se estructuran en arreglos de objetos tipados (`Scenario`, `DemographicBreakdown`) actuando como filas indexadas.
2.  **Vectorización Virtual:** Las operaciones de filtrado (`filter`, `map`, `reduce`) se aplican sobre estos conjuntos de datos para generar vistas dinámicas sin necesidad de un backend, emulando las operaciones `groupby` y `pivot_table`.
3.  **Inmutabilidad:** El estado de la aplicación maneja las transformaciones de datos de manera inmutable para garantizar la integridad referencial en los gráficos.

---

## 🎨 Sistema de Diseño y UI/UX

La interfaz ha sido refactorizada para transmitir profesionalismo técnico y claridad en la toma de decisiones, alineada con la identidad de **Consultora Talleyrand**.

### Componentes Clave
*   **Tarjetas de KPI (StatCards):** Implementan un diseño técnico avanzado con fondos degradados sutiles (`bg-gradient-to-br`), sombras difusas de alta profundidad (`box-shadow`) y micro-interacciones de elevación al pasar el cursor, mejorando la percepción de jerarquía visual.
*   **Paleta de Colores:**
    *   *Slate (Pizarra):* Usado para textos y estructuras para reducir la fatiga visual comparado con el negro puro.
    *   *Semana Red (#E30613):* Color de marca utilizado estratégicamente para acciones primarias y énfasis.
    *   *System Blue:* Para interactividad y selección de datos.

### Tipografía
Se utiliza **Inter**, una tipografía variable diseñada específicamente para pantallas de ordenador, garantizando una legibilidad óptima en tablas de datos densas y etiquetas de gráficos pequeños.

---

## 🧮 Lógica de Simulación (Motor de Segunda Vuelta)

El módulo de **Segunda Vuelta (`SecondRound.tsx`)** implementa un algoritmo determinista para la proyección de voto.

**Fórmula de Transferencia de Votos:**

Dado un escenario base con candidatos $C_1$ y $C_2$, votos nulos $N$ e indecisos $I$ (NS/NR):

$$
P_{final}(C_x) = P_{base}(C_x) + (I \times \alpha) + (N \times \beta \times 0.5)
$$

Donde:
*   $P_{base}$: Porcentaje de intención de voto original.
*   $\alpha$: Coeficiente de distribución de indecisos (controlado por slider, $0 \le \alpha \le 1$).
*   $\beta$: Tasa de conversión de voto nulo a válido (controlado por slider).
*   $0.5$: Factor de equiprobabilidad para la conversión de nulos (en este modelo simplificado).

El sistema recalcula estas proyecciones en $<16ms$ (un frame de renderizado), proporcionando feedback visual instantáneo.

---

## 📂 Estructura del Proyecto

```bash
/
├── src/
│   ├── components/       # Átomos y Moléculas UI (Atomic Design)
│   │   ├── Sidebar.tsx   # Navegación principal y Branding
│   │   ├── StatCard.tsx  # Indicadores KPI
│   │   └── ...
│   ├── views/            # Organismos y Páginas Lógicas
│   │   ├── Overview.tsx    # Dashboard Ejecutivo
│   │   ├── FirstRound.tsx  # Análisis Multidimensional (Radar, Barras, Líneas)
│   │   ├── SecondRound.tsx # Simulador Algorítmico
│   │   └── ...
│   ├── constants.ts      # SSOT (Single Source of Truth) de Datos
│   ├── types.ts          # Definiciones de Interfaces TypeScript
│   ├── utils.ts          # Motores de Exportación (CSV/Excel)
│   └── App.tsx           # Layout Shell y Routing
├── public/
└── package.json
```

---

## 🚀 Instalación y Despliegue

### Prerrequisitos
*   Node.js v18+
*   npm o yarn

### Pasos de Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/consultora-talleyrand/atlas-2026.git
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Compilar para producción:**
    ```bash
    npm run build
    ```

---

## 📊 Capacidades de Exportación

El sistema incluye un motor de serialización (`utils.ts`) que convierte las estructuras de datos JSON internas en archivos **CSV (Comma Separated Values)** estandarizados.

*   **Codificación:** UTF-8 para soporte de caracteres especiales (tildes, ñ).
*   **Compatibilidad:** Archivos generados listos para ingesta en Excel, PowerBI, Python (Pandas) o R.

---

## 🔮 Roadmap de Desarrollo

*   **Fase 1 (Actual):** Visualización estática y simulación determinista básica.
*   **Fase 2:** Integración de API para datos de encuestas en tiempo real.
*   **Fase 3:** Implementación de modelos probabilísticos Monte Carlo para el simulador de segunda vuelta.
*   **Fase 4:** Módulo de análisis de sentimiento basado en redes sociales (NLP).

---

## ⚖️ Licencia y Autoría

**Copyright © 2026 Consultora Talleyrand.**

Este software es propiedad intelectual de Consultora Talleyrand. Su uso está destinado a fines analíticos e informativos. La metodología de visualización y los algoritmos de simulación son propietarios.

*   **Datos Fuente:** AtlasIntel / Revista Semana (Dominio Público).
*   **Desarrollo:** Equipo de Ingeniería de Datos, Consultora Talleyrand.
