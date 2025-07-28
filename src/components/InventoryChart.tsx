import React from 'react';

interface InventoryChartProps {
  data: any[];
}

const InventoryChart: React.FC<InventoryChartProps> = ({ data }) => {
  const categories = [
    { name: 'Electronics', current: 245, optimal: 300, color: 'bg-blue-500' },
    { name: 'Clothing', current: 180, optimal: 200, color: 'bg-green-500' },
    { name: 'Home & Garden', current: 95, optimal: 150, color: 'bg-purple-500' },
    { name: 'Sports', current: 160, optimal: 120, color: 'bg-yellow-500' },
    { name: 'Books', current: 75, optimal: 100, color: 'bg-red-500' },
  ];

  const maxValue = Math.max(...categories.map(cat => Math.max(cat.current, cat.optimal)));

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{category.name}</span>
            <span className="text-sm text-gray-500">
              {category.current}/{category.optimal}
            </span>
          </div>
          <div className="relative">
            <div className="bg-gray-200 rounded-full h-4">
              <div
                className={`${category.color} h-4 rounded-full transition-all duration-500`}
                style={{ width: `${(category.current / maxValue) * 100}%` }}
              />
            </div>
            <div
              className="absolute top-0 h-4 border-2 border-gray-400 rounded-full opacity-50"
              style={{ 
                width: `${(category.optimal / maxValue) * 100}%`,
                backgroundColor: 'transparent'
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Current: {category.current}</span>
            <span>Optimal: {category.optimal}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryChart;