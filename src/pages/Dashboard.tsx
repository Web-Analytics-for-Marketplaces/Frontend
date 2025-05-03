import React, { useState, useEffect } from 'react';
import { BarChart2, Package, DollarSign, Users } from 'lucide-react';
import { fetchSales, fetchProducts, SalesData } from '../api';
import SalesChart from '../components/SalesChart';
import StatCard from '../components/StatCard';

function Dashboard() {
  const [sales, setSales] = useState<SalesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Mock stats for demonstration
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$24,567', 
      icon: <DollarSign size={20} />, 
      change: 12.5 
    },
    { 
      title: 'Products', 
      value: '245', 
      icon: <Package size={20} />, 
      change: 3.2 
    },
    { 
      title: 'Conversion Rate', 
      value: '3.2%', 
      icon: <BarChart2 size={20} />, 
      change: -1.8 
    },
    { 
      title: 'Active Customers', 
      value: '1,234', 
      icon: <Users size={20} />, 
      change: 8.3 
    }
  ];

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const salesData = await fetchSales();
        setSales(salesData);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={sales} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-8 bg-blue-600 rounded-sm mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-900">Product {item}</p>
                    <p className="text-xs text-gray-500">SKU-00{item}</p>
                  </div>
                </div>
                <p className="font-semibold">${Math.floor(Math.random() * 1000)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;