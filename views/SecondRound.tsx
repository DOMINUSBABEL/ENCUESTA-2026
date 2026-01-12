import React, { useState, useEffect } from 'react';
import { RUNOFF_SCENARIOS } from '../constants';
import { FileDown, Loader2 } from 'lucide-react';
import { exportToCSV } from '../utils';

const SecondRound: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleExport = () => {
    const data = RUNOFF_SCENARIOS.map(s => ({
      Candidato1: s.candidate1.name,
      Porcentaje1: s.candidate1.percentage,
      Candidato2: s.candidate2.name,
      Porcentaje2: s.candidate2.percentage,
      Nulo: s.nullVote,
      NS_NR: s.nsNr
    }));
    exportToCSV(data, 'escenarios_segunda_vuelta_2026');
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-red-600" />
        <p>Generando escenarios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Escenarios de 2ª Vuelta</h2>
            <p className="text-gray-500">Enfrentamientos directos hipotéticos.</p>
          </div>
          <button 
             onClick={handleExport}
             className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
          >
            <FileDown size={18} />
            <span>CSV</span>
          </button>
        </div>

        <div className="space-y-8">
          {RUNOFF_SCENARIOS.map((scenario, index) => {
            return (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-left">
                    <span className="block text-2xl font-bold" style={{color: scenario.candidate1.color}}>
                      {scenario.candidate1.percentage}%
                    </span>
                    <span className="text-sm font-medium text-gray-700">{scenario.candidate1.name}</span>
                  </div>
                  
                  <div className="text-center text-xs text-gray-400 pb-2 bg-gray-50 px-2 py-1 rounded-full">VS</div>

                  <div className="text-right">
                    <span className="block text-2xl font-bold" style={{color: scenario.candidate2.color}}>
                      {scenario.candidate2.percentage}%
                    </span>
                    <span className="text-sm font-medium text-gray-700">{scenario.candidate2.name}</span>
                  </div>
                </div>

                {/* Visual Bar */}
                <div className="h-8 w-full bg-gray-200 rounded-lg overflow-hidden flex relative">
                  <div 
                    style={{ width: `${scenario.candidate1.percentage}%`, backgroundColor: scenario.candidate1.color }}
                    className="h-full transition-all duration-1000 ease-out"
                    title={scenario.candidate1.name}
                  ></div>
                  
                  {/* Gap for NS/NR/Null visualization */}
                  <div 
                    style={{ width: `${scenario.nsNr + scenario.nullVote}%` }} 
                    className="h-full bg-gray-300 flex items-center justify-center text-[10px] text-gray-600 font-medium"
                    title="Blanco / Nulo / NS / NR"
                  >
                  </div>

                  <div 
                    style={{ width: `${scenario.candidate2.percentage}%`, backgroundColor: scenario.candidate2.color }}
                    className="h-full transition-all duration-1000 ease-out"
                    title={scenario.candidate2.name}
                  ></div>
                </div>
                
                <div className="mt-2 flex justify-center space-x-4 text-xs text-gray-500">
                  <span>Blanco/Nulo: <strong className="text-gray-700">{scenario.nullVote}%</strong></span>
                  <span>NS/NR: <strong className="text-gray-700">{scenario.nsNr}%</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecondRound;
