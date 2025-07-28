import React from 'react';
import { AlertTriangle, TrendingDown, Package, Clock } from 'lucide-react';

type AlertType = 'critical' | 'warning' | 'info';

interface Alert {
  id: number;
  type: AlertType;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  message: string;
  time: string;
  store: string;
}

const AlertPanel = () => {
  const alerts: Alert[] = [
    {
      id: 1,
      type: 'critical',
      icon: AlertTriangle,
      title: 'Low Stock Alert',
      message: 'iPhone 15 Pro inventory below safety stock (5 units remaining)',
      time: '2 minutes ago',
      store: 'Downtown Store'
    },
    {
      id: 2,
      type: 'warning',
      icon: TrendingDown,
      title: 'Demand Drop',
      message: 'Winter coats showing 30% decrease in demand vs forecast',
      time: '15 minutes ago',
      store: 'Mall Location'
    },
    {
      id: 3,
      type: 'info',
      icon: Package,
      title: 'Reorder Recommendation',
      message: 'Suggested reorder for running shoes based on seasonal trends',
      time: '1 hour ago',
      store: 'Suburban Store'
    },
    {
      id: 4,
      type: 'warning',
      icon: Clock,
      title: 'Lead Time Alert',
      message: 'Supplier XYZ experiencing delays - adjust reorder timing',
      time: '3 hours ago',
      store: 'All Stores'
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-l-4 p-4 rounded-r-lg ${getAlertColor(alert.type)}`}
          >
            <div className="flex items-start space-x-3">
              <alert.icon className={`h-5 w-5 mt-0.5 ${getIconColor(alert.type)}`} />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{alert.title}</h3>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-2">{alert.store}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 font-medium">
        View All Alerts
      </button>
    </div>
  );
};

export default AlertPanel;