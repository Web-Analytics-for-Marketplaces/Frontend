import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { SalesData } from '../api';

interface SalesChartProps {
  data: SalesData[];
}

function SalesChart({ data }: SalesChartProps) {
  // Format date for better readability
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.created_at).toLocaleDateString(),
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.375rem',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              formatter={(value) => [`$${value}`, 'Revenue']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_price"
              name="Revenue"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ stroke: '#2563EB', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;