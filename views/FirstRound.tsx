import React, { useState, useEffect } from 'react';
import { SCENARIO_1, SCENARIO_2, SCENARIO_1_DEMOGRAPHICS, HISTORICAL_DATA, CANDIDATE_ATTRIBUTES } from '../constants';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, 
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { FileDown, Loader2, Filter, TrendingUp, Map, Award, Activity } from 'lucide-react';
import CustomTooltip from '../components/CustomTooltip';
import { exportToCSV } from '../utils';

const FirstRound: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScenarioId, setActiveScenarioId] = useState<'s1' | 's2'>('s1');
  const [demographicFilter, setDemographicFilter] = useState<string>('Edad');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>(['Abelardo de la Espriella', 'Iván Cepeda']);

  // Responsive state for chart axis
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const candidateColors: {[key: string]: string} = {
    'Abelardo de la Espriella': '#2563eb',
    'Iván Cepeda': '#db2777',
    'Sergio Fajardo': '#10b981',
    'Otros': '#9ca3af'
  };

  // Toggle candidate selection
  const toggleCandidate = (name: string) => {
    if (selectedCandidates.includes(name)) {
      if (selectedCandidates.length > 1) {
        setSelectedCandidates(selectedCandidates.filter(c => c !== name));
      }
    } else {
      if (selectedCandidates.length < 3) {
        setSelectedCandidates([...selectedCandidates, name]);
      }
    }
  };

  const handleExport = () => {
    const data = currentScenario.candidates.map(c => ({
      Escenario: currentScenario.title,
      Candidato: c.name,
      Intencion: c.percentage
    }));
    exportToCSV(data, `${currentScenario.id}_datos`);
  };

  const regionData = SCENARIO_1_DEMOGRAPHICS.find(d => d.category === 'Región')?.segments.map(s => ({
    region: s.segmentName,
    ...s.values
  })) || [];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Análisis Profundo 1ª Vuelta</h2>
          <p className="text-sm text-gray-500">Proyecciones, históricos y demografía</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="flex p-1 bg-gray-100 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => setActiveScenarioId('s1')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all text-center ${
                activeScenarioId === 's1' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Escenario 1
            </button>
            <button
              onClick={() => setActiveScenarioId('s2')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all text-center ${
                activeScenarioId === 's2' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Escenario 2
            </button>
          </div>
          <button 
             onClick={handleExport}
             className="flex items-center justify-center p-2.5 text-gray-500 hover:text-blue-600 bg-white border border-gray-200 hover:bg-blue-50 rounded-lg transition-colors"
             title="Exportar CSV"
          >
            <FileDown size={20} />
            <span className="ml-2 sm:hidden text-sm font-medium">Descargar CSV</span>
          </button>
        </div>
      </div>

      {isLoading ? (
         <div className="h-96 flex flex-col items-center justify-center text-gray-400 bg-white rounded-xl border border-gray-100">
           <Loader2 className="w-8 h-8 animate-spin mb-4 text-red-600" />
           <p>Procesando datos complejos...</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Main Bar Chart */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-600" />
              Intención de Voto General
            </h3>
            <div className="w-full h-[300px] sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentScenario.candidates} margin={{ top: 20, right: 10, left: 0, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    interval={0} 
                    angle={isMobile ? -45 : -20} 
                    textAnchor="end" 
                    height={80} 
                    tick={{fontSize: isMobile ? 10 : 11, fontWeight: 500}}
                  />
                  <YAxis tickFormatter={(val) => `${val}%`} width={40} tick={{fontSize: 12}} />
                  <Tooltip content={<CustomTooltip formatter={(val) => [`${val}%`, 'Votos']} />} cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="percentage" animationDuration={1000} radius={[4, 4, 0, 0]}>
                     {currentScenario.candidates.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Historical Trend */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Evolución Histórica
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={HISTORICAL_DATA} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{fontSize: '12px', marginTop: '10px'}} />
                  <Line type="monotone" dataKey="Abelardo de la Espriella" stroke="#2563eb" strokeWidth={3} dot={{r: 4}} />
                  <Line type="monotone" dataKey="Iván Cepeda" stroke="#db2777" strokeWidth={3} dot={{r: 4}} />
                  <Line type="monotone" dataKey="Sergio Fajardo" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attribute Radar */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Percepción de Atributos
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius={isMobile ? "70%" : "80%"} data={CANDIDATE_ATTRIBUTES}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="attribute" tick={{fontSize: isMobile ? 10 : 12}} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fontSize: 10}} />
                  <Radar name="A. de la Espriella" dataKey="Abelardo de la Espriella" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
                  <Radar name="I. Cepeda" dataKey="Iván Cepeda" stroke="#db2777" fill="#db2777" fillOpacity={0.2} />
                  <Tooltip />
                  <Legend wrapperStyle={{fontSize: '11px', marginTop: '5px'}} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Map Substitute */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Map className="w-5 h-5 mr-2 text-purple-600" />
              Fortaleza Regional Comparada
            </h3>
            <div className="h-80 sm:h-96">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={regionData} layout="vertical" margin={{ top: 5, right: 30, left: isMobile ? 0 : 20, bottom: 5 }}>
                   <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                   <XAxis type="number" tick={{fontSize: 12}} />
                   <YAxis dataKey="region" type="category" width={isMobile ? 80 : 120} tick={{fontSize: isMobile ? 11 : 13, width: 80}} />
                   <Tooltip content={<CustomTooltip />} />
                   <Legend wrapperStyle={{fontSize: isMobile ? '10px' : '12px'}} />
                   <Bar dataKey="Abelardo de la Espriella" fill="#2563eb" stackId="a" />
                   <Bar dataKey="Iván Cepeda" fill="#db2777" stackId="a" />
                   <Bar dataKey="Sergio Fajardo" fill="#10b981" stackId="a" />
                 </BarChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* Demographic Analysis */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-4 gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-gray-400" />
                  Desglose Demográfico
                </h3>
                <p className="text-sm text-gray-500 mt-1">Comparativa por segmentos</p>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {SCENARIO_1_DEMOGRAPHICS.map(d => (
                  <button
                    key={d.category}
                    onClick={() => setDemographicFilter(d.category)}
                    className={`flex-1 sm:flex-none px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors ${
                      demographicFilter === d.category
                        ? 'bg-slate-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {d.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Toggle for Comparison */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Abelardo de la Espriella', 'Iván Cepeda', 'Sergio Fajardo'].map(c => (
                <button
                  key={c}
                  onClick={() => toggleCandidate(c)}
                  className={`flex items-center px-3 py-2 rounded-md text-xs font-semibold border transition-all touch-manipulation ${
                    selectedCandidates.includes(c) 
                      ? 'border-transparent text-white shadow-sm transform scale-105' 
                      : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'
                  }`}
                  style={{ backgroundColor: selectedCandidates.includes(c) ? candidateColors[c] : undefined }}
                >
                   {selectedCandidates.includes(c) && "✓ "} {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-72 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{left: -20}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize: isMobile ? 10 : 12}} interval={0} />
                    <YAxis tick={{fontSize: 11}} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                    <Legend iconType="circle" wrapperStyle={{paddingTop: '10px', fontSize: '11px'}} />
                    {selectedCandidates.map(candidate => (
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

              {/* Comparative Metrics Panel */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 overflow-y-auto max-h-60 lg:max-h-80">
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Brecha (Puntos %)</h4>
                {selectedCandidates.length >= 2 && chartData.map((segment, i) => {
                  const val1 = segment[selectedCandidates[0]] as number;
                  const val2 = segment[selectedCandidates[1]] as number;
                  const diff = (val1 - val2).toFixed(1);
                  const leader = val1 > val2 ? selectedCandidates[0] : selectedCandidates[1];
                  const color = candidateColors[leader];
                  
                  return (
                    <div key={i} className="mb-3 last:mb-0 bg-white p-3 rounded shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">{segment.name}</div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg" style={{color}}>{Math.abs(Number(diff))}%</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                           +{Math.abs(Number(diff))} para {leader.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  )
                })}
                {selectedCandidates.length < 2 && (
                  <p className="text-sm text-gray-500 italic text-center mt-10">Selecciona al menos 2 candidatos para ver el análisis de brecha.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default FirstRound;