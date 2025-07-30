import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Target, BarChart3, Brain, Activity, Zap, AlertCircle } from 'lucide-react';
import { generateForecastData, productMaster } from '../utils/dataGenerator';

// Update if generateForecastData returns more fields
type Forecast = { predicted: number };

type ModelComparisonItem = {
  model: string;
  accuracy: string;
  avgPrediction: number;
  mape: string;
  rmse: string;
  trainingTime: string;
};

const ForecastingPage = () => {
  const [selectedProduct, setSelectedProduct] = useState('ELEC-001');
  const [forecastPeriod, setForecastPeriod] = useState('30');
  const [selectedModel, setSelectedModel] = useState('xgboost');
  const [forecastData, setForecastData] = useState<Forecast[]>([]);
  const [modelComparison, setModelComparison] = useState<ModelComparisonItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const models = [
    { 
      id: 'xgboost', 
      name: 'XGBoost Ensemble', 
      accuracy: '95.1%',
      description: 'Advanced gradient boosting for complex patterns',
      icon: Brain,
      color: 'text-green-600',
      bestFor: 'Complex patterns, non-linear relationships'
    },
    { 
      id: 'prophet', 
      name: 'Prophet (Meta)', 
      accuracy: '94.2%',
      description: 'Excellent for seasonality and trend analysis',
      icon: TrendingUp,
      color: 'text-blue-600',
      bestFor: 'Seasonal patterns, holiday effects'
    },
    { 
      id: 'neural', 
      name: 'Neural Network', 
      accuracy: '92.7%',
      description: 'Deep learning for pattern recognition',
      icon: Activity,
      color: 'text-purple-600',
      bestFor: 'Large datasets, complex interactions'
    },
    { 
      id: 'arima', 
      name: 'ARIMA Time Series', 
      accuracy: '91.8%',
      description: 'Statistical approach for stable trends',
      icon: BarChart3,
      color: 'text-yellow-600',
      bestFor: 'Stable trends, statistical modeling'
    }
  ];

  useEffect(() => {
    const runForecast = async () => {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const forecast = generateForecastData(
        selectedProduct, 
        parseInt(forecastPeriod),
        selectedModel as any
      );

      setForecastData(forecast);

      // Generate model comparison data
      const comparison = await generateModelComparison(selectedProduct);
      setModelComparison(comparison);

      setIsLoading(false);
    };

    runForecast();
  }, [selectedProduct, forecastPeriod, selectedModel]);

  const generateModelComparison = async (productId: string): Promise<ModelComparisonItem[]> => {
    // Simulate running all models for comparison
    const allModels = ['prophet', 'xgboost', 'arima', 'neural'];
    const comparisons: ModelComparisonItem[] = [];
    
    for (const model of allModels) {
      const forecast = generateForecastData(productId, 7, model as any);
      const avgPrediction = forecast.reduce((sum, f) => sum + f.predicted, 0) / forecast.length;
      const modelInfo = models.find(m => m.id === model);
      
      comparisons.push({
        model: modelInfo?.name || model,
        accuracy: modelInfo?.accuracy || '90%',
        avgPrediction: Math.round(avgPrediction),
        mape: (Math.random() * 3 + 4).toFixed(1) + '%',
        rmse: (Math.random() * 5 + 10).toFixed(1),
        trainingTime: model === 'neural' ? '45 min' : 
                     model === 'xgboost' ? '15 min' :
                     model === 'arima' ? '5 min' : '3 min'
      });
    }
    
    return comparisons.sort((a, b) => parseFloat(b.accuracy) - parseFloat(a.accuracy));
  };

  const selectedProductData = productMaster.find(p => p.id === selectedProduct);
  const selectedModelData = models.find(m => m.id === selectedModel);

  const forecastMetrics = {
    accuracy: selectedModelData?.accuracy || '95.1%',
    mape: (Math.random() * 2 + 4).toFixed(1) + '%',
    rmse: (Math.random() * 5 + 10).toFixed(1),
    trend: selectedProductData?.lifecycle === 'growth' ? 'increasing' : 
           selectedProductData?.lifecycle === 'decline' ? 'decreasing' : 'stable'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Demand Forecasting</h1>
        <p className="text-gray-600">Machine learning models for accurate demand prediction and inventory optimization</p>
      </div>

      {/* Enhanced Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Product</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {productMaster.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} ({product.category})
                </option>
              ))}
            </select>
            {selectedProductData && (
              <div className="mt-2 text-xs text-gray-500">
                <div>Lead Time: {selectedProductData.leadTime} days</div>
                <div>Volatility: {selectedProductData.volatility}</div>
                <div>Lifecycle: {selectedProductData.lifecycle}</div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Forecast Period</label>
            <select
              value={forecastPeriod}
              onChange={(e) => setForecastPeriod(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="7">7 Days</option>
              <option value="14">14 Days</option>
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ML Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {models.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name} ({model.accuracy})
                </option>
              ))}
            </select>
            {selectedModelData && (
              <div className="mt-2 text-xs text-gray-500">
                {selectedModelData.description}
              </div>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
              <div className="text-blue-800">
                <div className="font-medium">Running {selectedModelData?.name} model...</div>
                <div className="text-sm">Processing {forecastPeriod} days of forecasts for {selectedProductData?.name}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Model Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {models.map((model) => {
          const Icon = model.icon;
          const isSelected = model.id === selectedModel;
          
          return (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 shadow-lg' 
                  : 'bg-white border border-gray-200 hover:shadow-md hover:border-gray-300'
              } rounded-lg p-6`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`h-6 w-6 ${isSelected ? 'text-blue-600' : model.color}`} />
                <div className={`text-sm font-semibold ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                  {model.accuracy}
                </div>
              </div>
              <h3 className={`font-semibold mb-2 ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                {model.name}
              </h3>
              <p className={`text-sm mb-3 ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                {model.description}
              </p>
              <div className={`text-xs ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                Best for: {model.bestFor}
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Forecast Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-100">
          <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{forecastMetrics.accuracy}</div>
          <div className="text-sm text-gray-600">Model Accuracy</div>
          <div className="text-xs text-green-600 mt-1">↑ Industry leading</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-100">
          <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{forecastMetrics.mape}</div>
          <div className="text-sm text-gray-600">MAPE Error</div>
          <div className="text-xs text-blue-600 mt-1">↓ 0.3% vs last run</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-100">
          <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{forecastMetrics.rmse}</div>
          <div className="text-sm text-gray-600">RMSE</div>
          <div className="text-xs text-purple-600 mt-1">Root Mean Sq Error</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-100">
          <Calendar className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 capitalize">{forecastMetrics.trend}</div>
          <div className="text-sm text-gray-600">Trend Direction</div>
          <div className="text-xs text-yellow-600 mt-1">Next {forecastPeriod} days</div>
        </div>
      </div>

      {/* Enhanced Forecast Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {forecastPeriod}-Day Demand Forecast
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {selectedProductData?.name} - {selectedModelData?.name} Model
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Actual</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Predicted</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-blue-200 rounded"></div>
              <span>Confidence</span>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">Generating Forecast</h3>
              <p className="text-sm text-gray-500">Running ML algorithms...</p>
            </div>
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Interactive Forecast Chart</h3>
              <p className="text-sm text-gray-500 mb-4">
                Predicted demand with {forecastMetrics.accuracy} accuracy
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-gray-700">Avg Daily Demand</div>
                  <div className="text-blue-600">
                    {forecastData.length > 0 ? 
                      Math.round(forecastData.reduce((sum, f) => sum + f.predicted, 0) / forecastData.length) :
                      0
                    } units
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Peak Demand</div>
                  <div className="text-red-600">
                    {forecastData.length > 0 ? 
                      Math.max(...forecastData.map(f => f.predicted)) :
                      0
                    } units
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Total Forecast</div>
                  <div className="text-green-600">
                    {forecastData.reduce((sum, f) => sum + f.predicted, 0)} units
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Model Comparison */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Model Performance Comparison</h2>
            <p className="text-sm text-gray-600 mt-1">Evaluation metrics for {selectedProductData?.name}</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-blue-600">
            <Zap className="h-4 w-4" />
            <span>Auto-updated daily</span>
          </div>
        </div>
        
        {isLoading || !modelComparison.length ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-gray-600">Comparing model performance...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MAPE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RMSE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Prediction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modelComparison.map((model, index) => (
                  <tr key={index} className={selectedModel === models.find(m => m.name === model.model)?.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{model.model}</div>
                        {selectedModel === models.find(m => m.name === model.model)?.id && (
                          <div className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Active</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-semibold text-green-600">{model.accuracy}</div>
                        {index === 0 && <div className="ml-2 text-xs text-yellow-600">🏆 Best</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{model.mape}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{model.rmse}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{model.trainingTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {model.avgPrediction} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Ready
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">Model Selection Recommendations</h3>
              <div className="mt-2 text-sm text-blue-800 space-y-1">
                <div>• <strong>XGBoost</strong>: Best overall accuracy, handles complex patterns and seasonal variations</div>
                <div>• <strong>Prophet</strong>: Excellent for products with strong seasonal patterns and holiday effects</div>
                <div>• <strong>Neural Network</strong>: Ideal for high-volume products with large historical datasets</div>
                <div>• <strong>ARIMA</strong>: Reliable for products with stable demand and minimal external factors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastingPage;