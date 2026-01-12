import React, { useState, useEffect } from 'react';
import { RUNOFF_SCENARIOS } from '../constants';
import { FileDown, Loader2, Trophy, Sliders, RefreshCw } from 'lucide-react';
import { exportToCSV } from '../utils';

const SecondRound: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Simulation State
  const [undecidedSplit, setUndecidedSplit] = useState(50); // 50% split default
  const [nullVoteReduction, setNullVoteReduction] = useState(0); // 0% reduction default

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
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Escenarios de 2ª Vuelta</h2>
            <p className="text-gray-500 text-sm sm:text-base">Enfrentamientos directos con simulador de transferencia.</p>
          </div>
          <button 
             onClick={handleExport}
             className="mt-4 sm:mt-0 flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center"
          >
            <FileDown size={18} />
            <span>Descargar CSV</span>
          </button>
        </div>

        {/* Simulation Controls */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 mb-8">
           <div className="flex items-center mb-4">
             <Sliders className="w-5 h-5 mr-2 text-slate-700" />
             <h3 className="font-bold text-slate-800">Simulador de Transferencia de Votos</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
             <div>
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-3">
                 Distribución de Indecisos (NS/NR)
               </label>
               <input 
                 type="range" 
                 min="0" 
                 max="100" 
                 value={undecidedSplit} 
                 onChange={(e) => setUndecidedSplit(Number(e.target.value))}
                 className="w-full h-4 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 touch-pan-y"
               />
               <div className="flex justify-between text-xs mt-2 text-slate-600 font-medium">
                 <span>{100 - undecidedSplit}% Candidato 1</span>
                 <span>{undecidedSplit}% Candidato 2</span>
               </div>
             </div>

             <div>
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-3">
                 Reducción Voto Blanco/Nulo
               </label>
               <input 
                 type="range" 
                 min="0" 
                 max="50" 
                 value={nullVoteReduction} 
                 onChange={(e) => setNullVoteReduction(Number(e.target.value))}
                 className="w-full h-4 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 touch-pan-y"
               />
               <div className="flex justify-between text-xs mt-2 text-slate-600 font-medium">
                 <span>0% Conversión</span>
                 <span>{nullVoteReduction}% se vuelven válidos</span>
               </div>
             </div>
           </div>

           <div className="mt-6 flex justify-end">
             <button 
               onClick={() => { setUndecidedSplit(50); setNullVoteReduction(0); }}
               className="text-xs flex items-center text-slate-500 hover:text-red-600 transition-colors py-2 px-3 border border-slate-200 rounded bg-white"
             >
               <RefreshCw size={12} className="mr-1" />
               Resetear Parámetros
             </button>
           </div>
        </div>

        <div className="space-y-12">
          {RUNOFF_SCENARIOS.map((scenario, index) => {
            // SIMULATION LOGIC
            const indecisos = scenario.nsNr;
            const nulos = scenario.nullVote;
            
            // Calculate redistributed votes from undecided
            const addedToC1_fromNS = (indecisos * (100 - undecidedSplit)) / 100;
            const addedToC2_fromNS = (indecisos * undecidedSplit) / 100;

            // Calculate redistributed votes from Null
            const votesFromNull = (nulos * nullVoteReduction) / 100;
            const addedToC1_fromNull = votesFromNull / 2;
            const addedToC2_fromNull = votesFromNull / 2;

            // Final Simulated Percentages
            const simC1 = (scenario.candidate1.percentage + addedToC1_fromNS + addedToC1_fromNull).toFixed(1);
            const simC2 = (scenario.candidate2.percentage + addedToC2_fromNS + addedToC2_fromNull).toFixed(1);
            
            const totalSim = Number(simC1) + Number(simC2);
            const winProbC1 = ((Number(simC1) / totalSim) * 100).toFixed(1);
            const winProbC2 = ((Number(simC2) / totalSim) * 100).toFixed(1);

            return (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-12 last:pb-0">
                {/* Simulated Intention Bar - Responsive Layout */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-4 gap-4 sm:gap-0">
                  <div className="text-center sm:text-left w-full sm:w-auto order-1 sm:order-none">
                    <span className="block text-4xl font-bold" style={{color: scenario.candidate1.color}}>
                      {simC1}%
                    </span>
                    <span className="text-base font-semibold text-gray-900">{scenario.candidate1.name}</span>
                    {Number(simC1) > scenario.candidate1.percentage && (
                       <span className="block text-xs text-green-600 font-medium">+{ (Number(simC1) - scenario.candidate1.percentage).toFixed(1) }%</span>
                    )}
                  </div>
                  
                  <div className="text-center w-full sm:w-auto order-3 sm:order-none">
                    <div className="text-[10px] sm:text-xs text-gray-400 pb-2 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-wider font-semibold inline-block">
                      Simulado
                    </div>
                  </div>

                  <div className="text-center sm:text-right w-full sm:w-auto order-2 sm:order-none">
                    <span className="block text-4xl font-bold" style={{color: scenario.candidate2.color}}>
                      {simC2}%
                    </span>
                    <span className="text-base font-semibold text-gray-900">{scenario.candidate2.name}</span>
                    {Number(simC2) > scenario.candidate2.percentage && (
                       <span className="block text-xs text-green-600 font-medium">+{ (Number(simC2) - scenario.candidate2.percentage).toFixed(1) }%</span>
                    )}
                  </div>
                </div>

                <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex relative mb-6 border border-gray-200">
                  <div 
                    style={{ width: `${winProbC1}%`, backgroundColor: scenario.candidate1.color }}
                    className="h-full transition-all duration-500 ease-out"
                  />
                  <div className="w-1 h-full bg-white z-10 absolute left-1/2 transform -translate-x-1/2 opacity-50"></div>
                  <div 
                    style={{ width: `${winProbC2}%`, backgroundColor: scenario.candidate2.color }}
                    className="h-full transition-all duration-500 ease-out"
                  />
                </div>
                
                {/* Win Probability / Effective Vote Projection */}
                <div className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <div className="flex items-center mb-3">
                     <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                     <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Probabilidad de Victoria (Voto Válido)</h4>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm font-bold text-slate-800">
                     <span>{winProbC1}%</span>
                     <span>{winProbC2}%</span>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs text-slate-400">
                    <span>{scenario.candidate1.name}</span>
                    <span>{scenario.candidate2.name}</span>
                  </div>
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