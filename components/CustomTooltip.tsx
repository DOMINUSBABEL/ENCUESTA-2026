import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: number) => [string, string];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, formatter }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const value = data.value;
    const name = data.name;
    const color = data.color || data.payload?.color || data.fill;
    
    // Use custom formatter if provided, otherwise default
    const [formattedValue, formattedName] = formatter 
      ? formatter(value) 
      : [`${value}%`, name];

    return (
      <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg min-w-[150px]">
        <p className="font-bold text-gray-900 mb-2 border-b border-gray-100 pb-1 text-sm">
          {label || data.payload.name}
        </p>
        <div className="flex items-center justify-between text-sm">
           <div className="flex items-center space-x-2">
             <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color }} />
             <span className="text-gray-600 font-medium">{formattedName}:</span>
           </div>
           <span className="font-bold text-gray-900 ml-3">{formattedValue}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
