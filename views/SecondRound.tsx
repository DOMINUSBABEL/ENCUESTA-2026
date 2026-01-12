import React from 'react';
import { RUNOFF_SCENARIOS } from '../constants';

const SecondRound: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Escenarios de 2ª Vuelta</h2>
        <p className="text-gray-500 mb-6">Enfrentamientos directos hipotéticos.</p>

        <div className="space-y-8">
          {RUNOFF_SCENARIOS.map((scenario, index) => {
            const total = scenario.candidate1.percentage + scenario.candidate2.percentage + scenario.nsNr + scenario.nullVote;
            // Normalize for visual bar if numbers don't add perfectly to 100 due to rounding
            
            return (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-left">
                    <span className="block text-2xl font-bold" style={{color: scenario.candidate1.color}}>
                      {scenario.candidate1.percentage}%
                    </span>
                    <span className="text-sm font-medium text-gray-700">{scenario.candidate1.name}</span>
                  </div>
                  
                  <div className="text-center text-xs text-gray-400 pb-2">VS</div>

                  <div className="text-right">
                    <span className="block text-2xl font-bold" style={{color: scenario.candidate2.color}}>
                      {scenario.candidate2.percentage}%
                    </span>
                    <span className="text-sm font-medium text-gray-700">{scenario.candidate2.name}</span>
                  </div>
                </div>

                {/* Visual Bar */}
                <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${scenario.candidate1.percentage}%`, backgroundColor: scenario.candidate1.color }}
                    className="h-full"
                    title={scenario.candidate1.name}
                  ></div>
                  
                  {/* Gap for NS/NR/Null visualization */}
                  <div 
                    style={{ width: `${scenario.nsNr + scenario.nullVote}%` }} 
                    className="h-full bg-gray-300 flex items-center justify-center"
                    title="Blanco / Nulo / NS / NR"
                  >
                  </div>

                  <div 
                    style={{ width: `${scenario.candidate2.percentage}%`, backgroundColor: scenario.candidate2.color }}
                    className="h-full"
                    title={scenario.candidate2.name}
                  ></div>
                </div>
                
                <div className="mt-2 text-center text-xs text-gray-500">
                  Blanco/Nulo: {scenario.nullVote}% • NS/NR: {scenario.nsNr}%
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
