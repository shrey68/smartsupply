import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Download, Calendar } from 'lucide-react';

export const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('30');
  const [selectedStore, setSelectedStore] = useState('all');

  const analyticsData = {
    turnoverRate: 8.5,
    stockoutRate: 2.3,
    overstockValue: 45000,
    forecastAccuracy: 94.2,
    avgLeadTime: 12.5,
    carryingCost: 18.7
  };

  const topProducts = [
    { name: 'iPhone 15 Pro', revenue: 125000, units: 125, margin: 22 },
    { name: 'Nike Air Max', revenue: 78000, units: 520, margin: 35 },
    { name: 'Samsung TV', revenue: 65000, units: 65, margin: 18 },
    { name: 'AirPods Pro', revenue: 42000, units: 210, margin: 28 },
    { name: 'Levi\'s Jeans', revenue: 35000, units: 350, margin: 42 }
  ];

  const categoryPerformance = [
    { category: 'Electronics', revenue: 285000, growth: 12.5, color: 'bg-blue-500' },
    { category: 'Clothing', revenue: 165000, growth: 8.3, color: 'bg-green-500' },
    { category: 'Sports', revenue: 125000, growth: 15.2, color: 'bg-purple-500' },
    { category: 'Home & Garden', revenue: 95000, growth: -2.1, color: 'bg-yellow-500' },
    { category: 'Books', revenue: 35000, growth: -8.7, color: 'bg-red-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Deep insights into inventory performance and trends</p>
        </div>
        <div className="flex space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-green-600">+0.5</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{analyticsData.turnoverRate}</div>
          <div className="text-sm text-gray-600">Inventory Turnover</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-5 w-5 text-red-600" />
            <span className="text-sm text-red-600">+0.2%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{analyticsData.stockoutRate}%</div>
          <div className="text-sm text-gray-600">Stockout Rate</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-5 w-5 text-yellow-600" />
            <span className="text-sm text-red-600">-$5K</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">${(analyticsData.overstockValue / 1000).toFixed(0)}K</div>
          <div className="text-sm text-gray-600">Overstock Value</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <PieChart className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-600">+1.2%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{analyticsData.forecastAccuracy}%</div>
          <div className="text-sm text-gray-600">Forecast Accuracy</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-green-600">-1.5</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{analyticsData.avgLeadTime}</div>
          <div className="text-sm text-gray-600">Avg Lead Time (days)</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Activity className="h-5 w-5 text-orange-600" />
            <span className="text-sm text-red-600">+0.8%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{analyticsData.carryingCost}%</div>
          <div className="text-sm text-gray-600">Carrying Cost</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Category Performance</h2>
          <div className="space-y-4">
            {categoryPerformance.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{category.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">${(category.revenue / 1000).toFixed(0)}K</span>
                    <span className={`text-sm ${category.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {category.growth >= 0 ? '+' : ''}{category.growth}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className={`${category.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${(category.revenue / 285000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-500">Product</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-500">Revenue</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-500">Units</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-500">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="py-3 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="py-3 text-sm text-gray-900 text-right">
                      ${(product.revenue / 1000).toFixed(0)}K
                    </td>
                    <td className="py-3 text-sm text-gray-900 text-right">{product.units}</td>
                    <td className="py-3 text-sm text-green-600 text-right font-medium">
                      {product.margin}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Inventory Health Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">ABC Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Category A (High Value)</span>
                <span className="text-sm font-medium text-gray-900">20% (80% value)</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Category B (Medium Value)</span>
                <span className="text-sm font-medium text-gray-900">30% (15% value)</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Category C (Low Value)</span>
                <span className="text-sm font-medium text-gray-900">50% (5% value)</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Seasonal Trends</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Spring Peak</span>
                <span className="text-sm font-medium text-green-600">+25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Summer Stable</span>
                <span className="text-sm font-medium text-gray-600">+5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fall Growth</span>
                <span className="text-sm font-medium text-green-600">+18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Winter Holiday</span>
                <span className="text-sm font-medium text-green-600">+45%</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Key Recommendations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">Increase safety stock for Category A items by 15%</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">Review slow-moving inventory in Home & Garden</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">Optimize reorder points based on lead time variations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;