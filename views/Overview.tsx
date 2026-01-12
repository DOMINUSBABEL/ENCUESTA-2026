import React, { useState, useEffect } from 'react';
import { Users, Calendar, Target, Activity, FileDown, Loader2, FileText } from 'lucide-react';
import StatCard from '../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SCENARIO_1, MAIN_PROBLEMS } from '../constants';
import CustomTooltip from '../components/CustomTooltip';
import { exportToCSV } from '../utils';

interface OverviewProps {
  setActiveTab: (tab: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ setActiveTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const topCandidates = SCENARIO_1.candidates.slice(0, 5);
  const topProblems = MAIN_PROBLEMS.slice(0, 5);

  useEffect(() => {
    // Check mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleExport = () => {
    const dataToExport = SCENARIO_1.candidates.map(c => ({
      Candidato: c.name,
      Porcentaje: c.percentage
    }));
    exportToCSV(dataToExport, 'resumen_candidatos_atlas_2026');
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-red-600" />
        <p>Cargando análisis detallado...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-center mb-2">
         <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Resumen Ejecutivo</h1>
         <button 
           onClick={handleExport}
           className="flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
         >
           <FileDown size={18} />
           <span className="hidden sm:inline">Exportar Datos</span>
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard 
          title="Tamaño de Muestra" 
          value="4.520" 
          subtitle="Encuestados"
          icon={<Users size={20} />}
          trend="neutral"
          trendValue="Estable" 
        />
        <StatCard 
          title="Margen de Error" 
          value="±1 p.p." 
          subtitle="Nivel Confianza 95%"
          icon={<Target size={20} />}
          trend="neutral"
          trendValue="--"
        />
        <StatCard 
          title="Método" 
          value="Atlas RDR" 
          subtitle="Reclutamiento Digital"
          icon={<Activity size={20} />}
          trend="neutral"
          trendValue="Validado"
        />
        <div 
          onClick={() => setActiveTab('methodology')}
          className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <StatCard 
            title="Documentación" 
            value="Ficha Técnica" 
            subtitle="Ver detalles completos"
            icon={<FileText size={20} />} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Snapshot: Scenario 1 */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Líderes - Escenario 1</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCandidates} layout="vertical" margin={{ left: isMobile ? 0 : 40, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={isMobile ? 80 : 100} tick={{fontSize: isMobile ? 11 : 12}} />
                <Tooltip content={<CustomTooltip formatter={(val) => [`${val}%`, 'Intención']} />} cursor={{fill: '#f9fafb'}} />
                <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                  {topCandidates.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Snapshot: Main Problems */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Principales Problemas</h3>
          <div className="space-y-4 overflow-y-auto h-64 pr-2">
            {topProblems.map((problem, index) => (
              <div key={index} className="relative group">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700 truncate mr-2">{problem.issue}</span>
                  <span className="font-bold text-gray-900 flex-shrink-0">{problem.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div 
                    className="bg-slate-700 h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:bg-red-600" 
                    style={{ width: `${problem.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800 flex items-start">
        <Activity className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <strong className="block mb-1">Nota Técnica:</strong>
          Muestra recolectada mediante Atlas RDR (Random Digital Recruitment). Las muestras son post-estratificadas usando un algoritmo iterativo.
        </div>
      </div>
    </div>
  );
};

export default Overview;