import React, { useState, useEffect } from 'react';
import { RUNOFF_SCENARIOS } from '../constants';
import { FileDown, Loader2, Trophy } from 'lucide-react';
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

        <div className="space-y-12">
          {RUNOFF_SCENARIOS.map((scenario, index) => {
            // Calculate effective vote (valid votes only)
            const validVotes = scenario.candidate1.percentage + scenario.candidate2.percentage;
            const c1Effective = ((scenario.candidate1.percentage / validVotes) * 100).toFixed(1);
            const c2Effective = ((scenario.candidate2.percentage / validVotes) * 100).toFixed(1);

            return (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-12 last:pb-0">
                {/* Main Intention Bar */}
                <div className="flex justify-between items-end mb-2">
                  <div className="text-left">
                    <span className="block text-3xl font-bold" style={{color: scenario.candidate1.color}}>
                      {scenario.candidate1.percentage}%
                    </span>
                    <span className="text-base font-semibold text-gray-900">{scenario.candidate1.name}</span>
                  </div>
                  
                  <div className="text-center text-xs text-gray-400 pb-2 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    Intención Total
                  </div>

                  <div className="text-right">
                    <span className="block text-3xl font-bold" style={{color: scenario.candidate2.color}}>
                      {scenario.candidate2.percentage}%
                    </span>
                    <span className="text-base font-semibold text-gray-900">{scenario.candidate2.name}</span>
                  </div>
                </div>

                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden flex relative mb-6">
                  <div 
                    style={{ width: `${scenario.candidate1.percentage}%`, backgroundColor: scenario.candidate1.color }}
                    className="h-full"
                  />
                  <div 
                    style={{ width: `${scenario.nsNr + scenario.nullVote}%` }} 
                    className="h-full bg-gray-300"
                  />
                  <div 
                    style={{ width: `${scenario.candidate2.percentage}%`, backgroundColor: scenario.candidate2.color }}
                    className="h-full"
                  />
                </div>
                
                {/* Win Probability / Effective Vote Projection */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center mb-3">
                     <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                     <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Proyección Voto Válido</h4>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-1">
                     <span className="font-medium text-slate-600">{c1Effective}%</span>
                     <span className="font-medium text-slate-600">{c2Effective}%</span>
                  </div>

                  <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
                    <div 
                      style={{ width: `${c1Effective}%`, backgroundColor: scenario.candidate1.color, opacity: 0.8 }}
                      className="h-full"
                    ></div>
                    <div className="w-0.5 h-full bg-white z-10 absolute left-1/2 transform -translate-x-1/2"></div>
                    <div 
                      style={{ width: `${c2Effective}%`, backgroundColor: scenario.candidate2.color, opacity: 0.8 }}
                      className="h-full"
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs text-slate-400">
                    <span>Sin blanco / nulo / indecisos</span>
                    <span>Probabilidad estimada</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-center space-x-6 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded">Blanco/Nulo: <strong className="text-gray-700">{scenario.nullVote}%</strong></span>
                  <span className="px-2 py-1 bg-gray-100 rounded">NS/NR: <strong className="text-gray-700">{scenario.nsNr}%</strong></span>
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