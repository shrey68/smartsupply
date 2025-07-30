import React from 'react';

interface ForecastChartProps {
  data: any[];
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const forecastData = [
    { day: 'Mon', actual: 1200, forecast: 1180, confidence: [1100, 1260] },
    { day: 'Tue', actual: 980, forecast: 1050, confidence: [970, 1130] },
    { day: 'Wed', actual: 1350, forecast: 1320, confidence: [1240, 1400] },
    { day: 'Thu', actual: 1100, forecast: 1150, confidence: [1070, 1230] },
    { day: 'Fri', actual: 1800, forecast: 1750, confidence: [1650, 1850] },
    { day: 'Sat', actual: 2100, forecast: 2050, confidence: [1950, 2150] },
    { day: 'Sun', actual: 1600, forecast: 1620, confidence: [1520, 1720] },
  ];

  const maxValue = Math.max(...forecastData.map(d => Math.max(d.actual, d.confidence[1])));

  return (
    <div className="h-64">
      <div className="flex items-end justify-between h-full space-x-2">
        {forecastData.map((item, index) => (
          <div key={item.day} className="flex-1 flex flex-col items-center">
            <div className="relative w-full h-48 flex items-end justify-center space-x-1">
              {/* Confidence interval */}
              <div
                className="bg-blue-100 w-2 rounded-t"
                style={{ height: `${(item.confidence[1] / maxValue) * 100}%` }}
              />
              {/* Forecast bar */}
              <div
                className="bg-blue-400 w-3 rounded-t"
                style={{ height: `${(item.forecast / maxValue) * 100}%` }}
              />
              {/* Actual bar */}
              <div
                className="bg-green-500 w-3 rounded-t"
                style={{ height: `${(item.actual / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 mt-2">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Actual</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-400 rounded"></div>
          <span>Forecast</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-100 rounded"></div>
          <span>Confidence</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;