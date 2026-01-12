import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, trend, trendValue }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 p-6 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1">
      
      {/* Abstract decorative shape for technical feel */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-slate-100 to-transparent opacity-50 blur-2xl group-hover:opacity-70 transition-opacity" />

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
        </div>
        {icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 text-slate-600 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
            {icon}
          </div>
        )}
      </div>
      
      {(subtitle || trend) && (
        <div className="relative z-10 mt-4 flex items-center text-sm">
          {trend && (
            <span className={`flex items-center font-bold mr-2 px-2 py-0.5 rounded-full text-xs border ${
              trend === 'up' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                : trend === 'down' 
                  ? 'bg-red-50 text-red-700 border-red-100' 
                  : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}>
              {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'} {trendValue}
            </span>
          )}
          <span className="text-slate-400 font-medium text-xs">{subtitle}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;