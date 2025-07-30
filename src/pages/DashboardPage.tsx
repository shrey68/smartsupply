import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Package, AlertTriangle, DollarSign, ShoppingCart, Target, Clock } from 'lucide-react';
import KPICard from '../components/KPICard';
import InventoryChart from '../components/InventoryChart';
import ForecastChart from '../components/ForecastChart';
import AlertPanel from '../components/AlertPanel';
import { generateAdvancedSalesData, calculateAdvancedKPIs, storeProfiles } from '../utils/dataGenerator';

const DashboardPage = () => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [kpis, setKPIs] = useState<any>(null);
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const days = parseInt(selectedPeriod);
      const data = generateAdvancedSalesData(days);
      
      // Filter by store if specific store selected
      const filteredData = selectedStore === 'all' 
        ? data 
        : data.filter((record: any) => record.store === selectedStore);
      
      setSalesData(filteredData);
      setKPIs(calculateAdvancedKPIs(filteredData));
      setIsLoading(false);
    };

    loadDashboardData();
  }, [selectedStore, selectedPeriod]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading advanced analytics...</p>
        </div>
      </div>
    );
  }

  if (!kpis) return null;

  const stores = [
    { id: 'all', name: 'All Stores' },
    ...storeProfiles.map(store => ({ id: store.id, name: store.name }))
  ];

  const periods = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: '365', label: 'Last year' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time inventory intelligence and performance metrics</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {stores.map(store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Revenue"
          value={`$${kpis.totalRevenue.toLocaleString()}`}
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          color="green"
        />
        <KPICard
          title="Inventory Value"
          value={`$${kpis.inventoryValue.toLocaleString()}`}
          change="-3.2%"
          trend="down"
          icon={Package}
          color="blue"
        />
        <KPICard
          title="Forecast Accuracy"
          value={`${kpis.forecastAccuracy}%`}
          change="+2.1%"
          trend="up"
          icon={Target}
          color="green"
        />
        <KPICard
          title="Service Level"
          value={`${kpis.serviceLevel}%`}
          change="+0.8%"
          trend="up"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Secondary KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Inventory Turnover"
          value={`${kpis.turnoverRate}x`}
          change="+0.3"
          trend="up"
          icon={TrendingUp}
          color="blue"
        />
        <KPICard
          title="Stockout Rate"
          value={`${kpis.stockoutRate}%`}
          change="-0.5%"
          trend="down"
          icon={AlertTriangle}
          color="green"
        />
        <KPICard
          title="Avg Lead Time"
          value={`${kpis.avgLeadTime} days`}
          change="-1.2"
          trend="down"
          icon={Clock}
          color="yellow"
        />
        <KPICard
          title="Carrying Cost"
          value={`${kpis.carryingCost}%`}
          change="+0.3%"
          trend="up"
          icon={DollarSign}
          color="red"
        />
      </div>

      {/* Enhanced Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Inventory Health by Category</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Optimal</span>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Warning</span>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Critical</span>
            </div>
          </div>
          <InventoryChart data={salesData} />
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">7-Day Demand Forecast</h2>
            <div className="text-sm text-gray-500">XGBoost Model (95.1% accuracy)</div>
          </div>
          <ForecastChart data={salesData} />
        </div>
      </div>

      {/* Performance Metrics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Trends</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">94.2%</div>
                <div className="text-sm text-blue-800">Forecast Accuracy</div>
                <div className="text-xs text-blue-600 mt-1">↑ 2.1% vs last month</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">8.5x</div>
                <div className="text-sm text-green-800">Inventory Turnover</div>
                <div className="text-xs text-green-600 mt-1">↑ 0.3 vs industry avg</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">97.8%</div>
                <div className="text-sm text-purple-800">Service Level</div>
                <div className="text-xs text-purple-600 mt-1">↑ 0.8% vs target</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Inventory Optimization Score</span>
                  <span className="text-sm text-gray-600">87/100</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Demand Prediction Confidence</span>
                  <span className="text-sm text-gray-600">92/100</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Stock Level Health</span>
                  <span className="text-sm text-gray-600">78/100</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-500" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Generate Reorder Report</div>
                  <div className="text-xs text-blue-600">15 products need attention</div>
                </div>
                <Package className="h-5 w-5" />
              </div>
            </button>
            
            <button className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Update Forecasts</div>
                  <div className="text-xs text-green-600">Run ML models</div>
                </div>
                <TrendingUp className="h-5 w-5" />
              </div>
            </button>
            
            <button className="w-full text-left p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 rounded-lg hover:from-yellow-100 hover:to-yellow-200 transition-all duration-200 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Review Alerts</div>
                  <div className="text-xs text-yellow-600">3 critical items</div>
                </div>
                <AlertTriangle className="h-5 w-5" />
              </div>
            </button>
            
            <button className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Export Analytics</div>
                  <div className="text-xs text-purple-600">Download reports</div>
                </div>
                <ShoppingCart className="h-5 w-5" />
              </div>
            </button>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Data Sync</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">ML Models</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Updated</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Forecasts</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-yellow-600">Processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AlertPanel />
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Forecast updated for Electronics category</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Reorder triggered for iPhone 15 Pro</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Stock level warning for Winter Parka</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">ML model retrained with new data</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;