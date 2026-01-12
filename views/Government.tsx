import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { APPROVAL_RATINGS, MAIN_PROBLEMS } from '../constants';
import { FileDown } from 'lucide-react';
import { exportToCSV } from '../utils';
import CustomTooltip from '../components/CustomTooltip';

const Government: React.FC = () => {
  const handleExportApproval = () => {
    exportToCSV(APPROVAL_RATINGS, 'aprobacion_gobierno_2026');
  };

  const handleExportProblems = () => {
    exportToCSV(MAIN_PROBLEMS, 'problemas_pais_2026');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Approval Rating */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold text-gray-900">Aprobación Presidencial (Gustavo Petro)</h2>
           <button onClick={handleExportApproval} className="text-gray-400 hover:text-blue-600 transition-colors" title="Exportar CSV">
             <FileDown size={20} />
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={APPROVAL_RATINGS}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="percentage"
                  nameKey="category"
                >
                  {APPROVAL_RATINGS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
             {APPROVAL_RATINGS.map((rating) => (
               <div key={rating.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                 <div className="flex items-center">
                   <div className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: rating.color}}></div>
                   <span className="font-medium text-gray-700">{rating.category}</span>
                 </div>
                 <span className="font-bold text-xl">{rating.percentage}%</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Main Problems */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Principales Problemas de Colombia</h2>
          <button onClick={handleExportProblems} className="text-gray-400 hover:text-blue-600 transition-colors" title="Exportar CSV">
             <FileDown size={20} />
           </button>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={MAIN_PROBLEMS}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis 
                dataKey="issue" 
                type="category" 
                width={150} 
                tick={{fontSize: 12, fontWeight: 500}}
              />
              <RechartsTooltip content={<CustomTooltip formatter={(val) => [`${val}%`, 'Mención']} />} cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="percentage" fill="#4b5563" radius={[0, 4, 4, 0]}>
                {MAIN_PROBLEMS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#E30613' : '#4b5563'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Government;
