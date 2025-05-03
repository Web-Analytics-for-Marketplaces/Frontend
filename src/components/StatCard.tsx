import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeTimeframe?: string;
}

function StatCard({ title, value, icon, change = 0, changeTimeframe = 'from last month' }: StatCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {change !== undefined && (
          <div className="flex items-center mt-2">
            <span className={`inline-flex items-center text-sm ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <span className="ml-1">{Math.abs(change)}%</span>
            </span>
            <span className="text-xs text-gray-500 ml-2">{changeTimeframe}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;