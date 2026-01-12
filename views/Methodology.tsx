import React from 'react';
import { FileText, Users, Calendar, Target, ShieldCheck, Globe, Database } from 'lucide-react';
import { exportToCSV } from '../utils';

const Methodology: React.FC = () => {
  const technicalData = [
    { label: "Encuestadora", value: "AtlasIntel" },
    { label: "Contratante", value: "Revista Semana" },
    { label: "Fecha de Recolección", value: "05 a 08 de Enero de 2026" },
    { label: "Tamaño de Muestra", value: "4.520 encuestados" },
    { label: "Ámbito Geográfico", value: "Nacional (Colombia)" },
    { label: "Universo", value: "Hombres y mujeres mayores de 18 años" },
    { label: "Metodología", value: "Atlas RDR (Reclutamiento Digital Aleatorio)" },
    { label: "Margen de Error", value: "±1 punto porcentual" },
    { label: "Nivel de Confianza", value: "95%" },
    { label: "Diseño Muestral", value: "Probabilístico estratificado" },
  ];

  const handleExport = () => {
    exportToCSV(technicalData, 'ficha_tecnica_atlas_2026');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ficha Técnica</h2>
          <p className="text-gray-500 mt-1">Detalles metodológicos y técnicos del estudio</p>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <FileText size={18} />
          <span>Exportar Datos</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2 text-red-600" />
            Parámetros del Estudio
          </h3>
          <div className="divide-y divide-gray-100">
            {technicalData.slice(0, 5).map((item, index) => (
              <div key={index} className="py-3 flex justify-between">
                <span className="text-gray-600 font-medium">{item.label}</span>
                <span className="text-gray-900 text-right font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-red-600" />
            Validez Estadística
          </h3>
          <div className="divide-y divide-gray-100">
            {technicalData.slice(5).map((item, index) => (
              <div key={index} className="py-3 flex justify-between">
                <span className="text-gray-600 font-medium">{item.label}</span>
                <span className="text-gray-900 text-right font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-slate-700" />
            Metodología Atlas RDR
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          La metodología <strong>Atlas RDR (Random Digital Recruitment)</strong> evita el sesgo de las encuestas telefónicas tradicionales y las encuestas web opt-in. Los encuestados son reclutados orgánicamente durante su navegación web habitual, asegurando anonimato y reduciendo la presión social en las respuestas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 text-center">
             <div className="text-red-600 font-bold text-lg mb-1">Sin Intermediarios</div>
             <p className="text-xs text-gray-500">Encuestas auto-administradas sin interacción humana que pueda influir.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 text-center">
             <div className="text-red-600 font-bold text-lg mb-1">Representatividad</div>
             <p className="text-xs text-gray-500">Algoritmo iterativo de post-estratificación por múltiples variables.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 text-center">
             <div className="text-red-600 font-bold text-lg mb-1">Cobertura</div>
             <p className="text-xs text-gray-500">Acceso a segmentos poblacionales difíciles de contactar telefónicamente.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
