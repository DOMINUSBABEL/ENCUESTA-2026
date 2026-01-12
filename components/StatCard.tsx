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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        {icon && (
          <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
            {icon}
          </div>
        )}
      </div>
      {(subtitle || trend) && (
        <div className="mt-4 flex items-center text-sm">
          {trend && (
            <span className={`flex items-center font-medium mr-2 ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {trendValue}
            </span>
          )}
          <span className="text-gray-400">{subtitle}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
