import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Package, BarChart3, Shield, Zap, Target } from 'lucide-react';

export const HomePage = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Demand Forecasting',
      description: 'Advanced ML models predict future demand with 95%+ accuracy using Prophet, ARIMA, and ensemble methods.',
    },
    {
      icon: Package,
      title: 'Inventory Optimization',
      description: 'Intelligent stock level recommendations minimize overstock and stockouts while maximizing profitability.',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Interactive dashboards provide instant insights into inventory health, forecast accuracy, and KPIs.',
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Automated alerts and safety stock calculations protect against supply chain disruptions.',
    },
    {
      icon: Zap,
      title: 'Automated Reordering',
      description: 'Smart reorder points and quantities based on lead times, seasonality, and demand patterns.',
    },
    {
      icon: Target,
      title: 'Multi-Store Support',
      description: 'Manage inventory across multiple locations with store-specific optimization and reporting.',
    },
  ];

  const stats = [
    { label: 'Inventory Costs Reduced', value: '25%' },
    { label: 'Stockout Prevention', value: '98%' },
    { label: 'Forecast Accuracy', value: '95%' },
    { label: 'Time Saved Weekly', value: '15hrs' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Smart Inventory Management for
          <span className="text-blue-600"> Small Retail</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your inventory management with AI-powered demand forecasting, 
          intelligent optimization, and real-time analytics. Reduce costs, prevent stockouts, 
          and maximize profitability across all your store locations.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Dashboard
          </Link>
          <Link
            to="/documentation"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Complete Inventory Intelligence Platform
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Inventory Management?</h2>
        <p className="text-xl mb-6 opacity-90">
          Experience the power of AI-driven inventory optimization with our comprehensive demo
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/forecasting"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Forecasting
          </Link>
          <Link
            to="/analytics"
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            See Analytics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;