import React from 'react';
import { Users, Calendar, Target, Activity } from 'lucide-react';
import StatCard from '../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SCENARIO_1, MAIN_PROBLEMS } from '../constants';

const Overview: React.FC = () => {
  const topCandidates = SCENARIO_1.candidates.slice(0, 5);
  const topProblems = MAIN_PROBLEMS.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tamaño de Muestra" 
          value="4.520" 
          subtitle="Encuestados"
          icon={<Users size={20} />} 
        />
        <StatCard 
          title="Fecha de Recolección" 
          value="05-08 Ene" 
          subtitle="Año 2026"
          icon={<Calendar size={20} />} 
        />
        <StatCard 
          title="Margen de Error" 
          value="±1 p.p." 
          subtitle="Nivel Confianza 95%"
          icon={<Target size={20} />} 
        />
        <StatCard 
          title="Método" 
          value="Atlas RDR" 
          subtitle="Reclutamiento Digital"
          icon={<Activity size={20} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Snapshot: Scenario 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Líderes - Escenario 1</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCandidates} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Intención']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Principales Problemas</h3>
          <div className="space-y-4">
            {topProblems.map((problem, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{problem.issue}</span>
                  <span className="font-bold text-gray-900">{problem.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div 
                    className="bg-slate-700 h-2.5 rounded-full" 
                    style={{ width: `${problem.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800">
        <strong className="block mb-1">Nota Técnica:</strong>
        Muestra recolectada mediante Atlas RDR (Random Digital Recruitment). Las muestras son post-estratificadas usando un algoritmo iterativo en un conjunto de variables: sexo, edad, nivel educativo, ingresos, región y comportamiento electoral anterior.
      </div>
    </div>
  );
};

export default Overview;
