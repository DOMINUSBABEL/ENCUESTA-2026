import { Scenario, RunoffScenario, ApprovalRating, Problem, DemographicBreakdown } from './types';

export const PRIMARY_COLOR = '#E30613'; // Semana Red
export const SECONDARY_COLOR = '#1f2937'; // Slate 800

// Scenario 1: First Round - Main
export const SCENARIO_1: Scenario = {
  id: 'escenario_1',
  title: 'Escenario 1 - Candidatos Totales',
  candidates: [
    { name: 'Abelardo de la Espriella', percentage: 28.0, color: '#2563eb' },
    { name: 'Iván Cepeda', percentage: 26.5, color: '#db2777' },
    { name: 'Sergio Fajardo', percentage: 9.4, color: '#10b981' },
    { name: 'Juan Carlos Pinzón', percentage: 5.1, color: '#4b5563' },
    { name: 'Paloma Valencia', percentage: 5.1, color: '#3b82f6' },
    { name: 'Claudia López', percentage: 2.6, color: '#8b5cf6' },
    { name: 'Enrique Peñalosa', percentage: 2.3, color: '#6b7280' },
    { name: 'Juan Daniel Oviedo', percentage: 1.8, color: '#f59e0b' },
    { name: 'Aníbal Gaviria', percentage: 1.3, color: '#9ca3af' },
    { name: 'Otros / NS / NR', percentage: 17.9, color: '#e5e7eb' } 
  ]
};

// Historical Data (Synthetic for visualization purposes)
export const HISTORICAL_DATA = [
  { date: 'Oct 2025', 'Abelardo de la Espriella': 22.1, 'Iván Cepeda': 24.5, 'Sergio Fajardo': 11.2, 'Otros': 42.2 },
  { date: 'Nov 2025', 'Abelardo de la Espriella': 24.8, 'Iván Cepeda': 25.1, 'Sergio Fajardo': 10.5, 'Otros': 39.6 },
  { date: 'Dic 2025', 'Abelardo de la Espriella': 26.5, 'Iván Cepeda': 25.8, 'Sergio Fajardo': 9.8, 'Otros': 37.9 },
  { date: 'Ene 2026', 'Abelardo de la Espriella': 28.0, 'Iván Cepeda': 26.5, 'Sergio Fajardo': 9.4, 'Otros': 36.1 },
];

// Candidate Attributes (Synthetic)
export const CANDIDATE_ATTRIBUTES = [
  { attribute: 'Economía', 'Abelardo de la Espriella': 85, 'Iván Cepeda': 45, 'Sergio Fajardo': 65 },
  { attribute: 'Seguridad', 'Abelardo de la Espriella': 90, 'Iván Cepeda': 30, 'Sergio Fajardo': 50 },
  { attribute: 'Salud', 'Abelardo de la Espriella': 60, 'Iván Cepeda': 75, 'Sergio Fajardo': 70 },
  { attribute: 'Corrupción', 'Abelardo de la Espriella': 70, 'Iván Cepeda': 65, 'Sergio Fajardo': 80 },
  { attribute: 'Empleo', 'Abelardo de la Espriella': 80, 'Iván Cepeda': 55, 'Sergio Fajardo': 60 },
];

// Demographic Data for Scenario 1 (From Page 8)
export const SCENARIO_1_DEMOGRAPHICS: DemographicBreakdown[] = [
  {
    category: 'Género',
    segments: [
      { segmentName: 'Hombre', values: { 'Abelardo de la Espriella': 30.4, 'Iván Cepeda': 27.3, 'Sergio Fajardo': 10.1 } },
      { segmentName: 'Mujer', values: { 'Abelardo de la Espriella': 25.7, 'Iván Cepeda': 25.6, 'Sergio Fajardo': 8.7 } }
    ]
  },
  {
    category: 'Edad',
    segments: [
      { segmentName: '18-24', values: { 'Abelardo de la Espriella': 12.9, 'Iván Cepeda': 39.3, 'Sergio Fajardo': 9.9 } },
      { segmentName: '25-34', values: { 'Abelardo de la Espriella': 25.5, 'Iván Cepeda': 30.7, 'Sergio Fajardo': 9.0 } },
      { segmentName: '35-44', values: { 'Abelardo de la Espriella': 29.2, 'Iván Cepeda': 21.1, 'Sergio Fajardo': 8.9 } },
      { segmentName: '45-59', values: { 'Abelardo de la Espriella': 34.0, 'Iván Cepeda': 18.7, 'Sergio Fajardo': 10.2 } },
      { segmentName: '60-100', values: { 'Abelardo de la Espriella': 34.7, 'Iván Cepeda': 26.7, 'Sergio Fajardo': 8.5 } }
    ]
  },
  {
     category: 'Región',
     segments: [
       { segmentName: 'Bogotá D.C.', values: { 'Abelardo de la Espriella': 28.2, 'Iván Cepeda': 27.6, 'Sergio Fajardo': 12.0 } },
       { segmentName: 'Caribe', values: { 'Abelardo de la Espriella': 24.4, 'Iván Cepeda': 26.4, 'Sergio Fajardo': 5.6 } },
       { segmentName: 'Central', values: { 'Abelardo de la Espriella': 34.1, 'Iván Cepeda': 24.4, 'Sergio Fajardo': 9.5 } },
       { segmentName: 'Pacífica', values: { 'Abelardo de la Espriella': 23.4, 'Iván Cepeda': 27.8, 'Sergio Fajardo': 12.3 } }
     ]
  }
];

// Scenario 2 (Page 10)
export const SCENARIO_2: Scenario = {
  id: 'escenario_2',
  title: 'Escenario 2',
  candidates: [
    { name: 'Abelardo de la Espriella', percentage: 31.7, color: '#2563eb' },
    { name: 'Iván Cepeda', percentage: 28.6, color: '#db2777' },
    { name: 'Sergio Fajardo', percentage: 14.8, color: '#10b981' },
    { name: 'Paloma Valencia', percentage: 9.3, color: '#3b82f6' },
    { name: 'Voto Blanco / Nulo', percentage: 6.8, color: '#9ca3af' },
    { name: 'No sé', percentage: 7.4, color: '#e5e7eb' }
  ]
};

// 2nd Round Scenarios (Page 17)
export const RUNOFF_SCENARIOS: RunoffScenario[] = [
  {
    candidate1: { name: 'Abelardo de la Espriella', percentage: 44.2, color: '#2563eb' },
    candidate2: { name: 'Iván Cepeda', percentage: 34.9, color: '#db2777' },
    nsNr: 10.3,
    nullVote: 10.6
  },
  {
    candidate1: { name: 'Sergio Fajardo', percentage: 39.6, color: '#10b981' },
    candidate2: { name: 'Iván Cepeda', percentage: 32.1, color: '#db2777' },
    nsNr: 10.4,
    nullVote: 17.9
  },
  {
    candidate1: { name: 'Paloma Valencia', percentage: 38.2, color: '#3b82f6' },
    candidate2: { name: 'Iván Cepeda', percentage: 35.8, color: '#db2777' },
    nsNr: 12.1,
    nullVote: 13.9
  }
];

// Government Approval (Page 28)
export const APPROVAL_RATINGS: ApprovalRating[] = [
  { category: 'Desapruebo', percentage: 53.5, color: '#ef4444' },
  { category: 'Apruebo', percentage: 35.7, color: '#10b981' },
  { category: 'No sé', percentage: 10.8, color: '#d1d5db' },
];

// Main Problems (Page 33)
export const MAIN_PROBLEMS: Problem[] = [
  { issue: 'Corrupción', percentage: 33.9 },
  { issue: 'La guerrilla', percentage: 14.1 },
  { issue: 'Inseguridad', percentage: 13.8 },
  { issue: 'Impuestos altos / Estado ineficiente', percentage: 8.7 },
  { issue: 'Narcotráfico', percentage: 6.3 },
  { issue: 'Pobreza / Falta oportunidades', percentage: 5.8 },
  { issue: 'Desempleo', percentage: 5.3 },
  { issue: 'Salud', percentage: 3.8 },
];