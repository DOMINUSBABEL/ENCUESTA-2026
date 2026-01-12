import React, { useState, useEffect } from 'react';
import { SCENARIO_1, SCENARIO_2, SCENARIO_1_DEMOGRAPHICS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { FileDown, Loader2 } from 'lucide-react';
import CustomTooltip from '../components/CustomTooltip';
import { exportToCSV } from '../utils';

const FirstRound: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScenarioId, setActiveScenarioId] = useState<'s1' | 's2'>('s1');
  const [demographicFilter, setDemographicFilter] = useState<string>('Edad');

  const currentScenario = activeScenarioId === 's1' ? SCENARIO_1 : SCENARIO_2;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeScenarioId]);

  // Transform demographics for chart
  const currentDemoData = SCENARIO_1_DEMOGRAPHICS.find(d => d.category === demographicFilter);
  const chartData = currentDemoData ? currentDemoData.segments.map(seg => ({
    name: seg.segmentName,
    ...seg.values
  })) : [];

  const candidatesToCompare = ['Abelardo de la Espriella', 'Iván Cepeda', 'Sergio Fajardo'];
  const candidateColors: {[key: string]: string} = {
    'Abelardo de la Espriella': '#2563eb',
    'Iván Cepeda': '#db2777',
    'Sergio Fajardo': '#10b981'
  };

  const handleExport = () => {
    const data = currentScenario.candidates.map(c => ({
      Escenario: currentScenario.title,
      Candidato: c.name,
      Intencion: c.percentage
    }));
    exportToCSV(data, `${currentScenario.id}_datos`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Scenario Selector & Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">Intención de Voto 1ª Vuelta</h2>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveScenarioId('s1')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeScenarioId === 's1' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Escenario 1
            </button>
            <button
              onClick={() => setActiveScenarioId('s2')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeScenarioId === 's2' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Escenario 2
            </button>
          </div>
          <button 
             onClick={handleExport}
             className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
             title="Exportar CSV"
          >
            <FileDown size={20} />
          </button>
        </div>
      </div>

      {isLoading ? (
         <div className="h-96 flex flex-col items-center justify-center text-gray-400 bg-white rounded-xl border border-gray-100">
           <Loader2 className="w-8 h-8 animate-spin mb-4 text-red-600" />
           <p>Calculando proyecciones...</p>
         </div>
      ) : (
        <>
          {/* Main Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[500px]">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">{currentScenario.title}</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={currentScenario.candidates} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  interval={0} 
                  angle={-45} 
                  textAnchor="end" 
                  height={80} 
                  tick={{fontSize: 11, fontWeight: 500}}
                />
                <YAxis tickFormatter={(val) => `${val}%`} />
                <Tooltip content={<CustomTooltip formatter={(val) => [`${val}%`, 'Votos']} />} cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="percentage" animationDuration={1000} radius={[4, 4, 0, 0]}>
                   {currentScenario.candidates.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Demographic Analysis (Only for S1 for now based on available data) */}
          {activeScenarioId === 's1' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Análisis Demográfico (Top 3)</h3>
                  <p className="text-sm text-gray-500">Comparativa entre los líderes de la encuesta</p>
                </div>
                <select 
                  value={demographicFilter}
                  onChange={(e) => setDemographicFilter(e.target.value)}
                  className="mt-4 sm:mt-0 form-select block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                >
                  {SCENARIO_1_DEMOGRAPHICS.map(d => (
                    <option key={d.category} value={d.category}>{d.category}</option>
                  ))}
                </select>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                    <Legend iconType="circle" />
                    {candidatesToCompare.map(candidate => (
                      <Bar 
                        key={candidate} 
                        dataKey={candidate} 
                        fill={candidateColors[candidate]} 
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FirstRound;
