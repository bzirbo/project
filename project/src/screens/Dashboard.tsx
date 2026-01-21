import { TrendingUp, Package, Clock, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      label: 'Total Items in Store',
      value: '1,247',
      change: '+12%',
      icon: Package,
      color: 'blue',
    },
    {
      label: 'Pending Transfers',
      value: '8',
      change: '2 urgent',
      icon: Clock,
      color: 'yellow',
    },
    {
      label: 'Items Transferred Today',
      value: '156',
      change: '+8%',
      icon: TrendingUp,
      color: 'green',
    },
    {
      label: 'Low Stock Alerts',
      value: '3',
      change: 'Action needed',
      icon: AlertCircle,
      color: 'red',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Transfer Completed',
      product: 'Tomatoes (5kg)',
      from: 'Store A',
      to: 'Kitchen',
      time: '5 min ago',
      status: 'completed',
    },
    {
      id: 2,
      action: 'Transfer Pending',
      product: 'Olive Oil (2L)',
      from: 'Store A',
      to: 'Food Court',
      time: '15 min ago',
      status: 'pending',
    },
    {
      id: 3,
      action: 'Transfer In Progress',
      product: 'Flour (10kg)',
      from: 'Store B',
      to: 'Kitchen',
      time: '23 min ago',
      status: 'in-progress',
    },
    {
      id: 4,
      action: 'Transfer Completed',
      product: 'Chicken Breast (3kg)',
      from: 'Store A',
      to: 'Kitchen',
      time: '1 hour ago',
      status: 'completed',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time overview of stock movements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            yellow: 'bg-yellow-50 text-yellow-600',
            green: 'bg-green-50 text-green-600',
            red: 'bg-red-50 text-red-600',
          }[stat.color];

          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses}`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <p className="text-gray-600 text-sm mt-1">Latest stock movements and transfers</p>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{activity.product}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : activity.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {activity.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {activity.from} → {activity.to}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
