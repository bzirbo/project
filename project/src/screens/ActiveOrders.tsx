import { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Eye, User } from 'lucide-react';

interface Order {
  id: string;
  items: Array<{ name: string; quantity: number; measurement: string }>;
  status: 'pending' | 'in-progress' | 'completed';
  store: string;
  destination: string;
  createdBy: string;
  assignedTo?: string;
  createdDate: string;
  itemCount: number;
}

interface ActiveOrdersProps {
  onViewOrder: (orderId: string) => void;
}

export default function ActiveOrders({ onViewOrder }: ActiveOrdersProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const orders: Order[] = [
    {
      id: 'ORD-001',
      items: [
        { name: 'Tomatoes', quantity: 5, measurement: 'kg' },
        { name: 'Olive Oil', quantity: 2, measurement: 'L' },
      ],
      status: 'pending',
      store: 'Store A',
      destination: 'Kitchen',
      createdBy: 'John Doe',
      createdDate: '2026-01-20 14:30',
      itemCount: 2,
    },
    {
      id: 'ORD-002',
      items: [
        { name: 'Flour', quantity: 10, measurement: 'kg' },
        { name: 'Chicken Breast', quantity: 3, measurement: 'kg' },
      ],
      status: 'in-progress',
      store: 'Store B',
      destination: 'Kitchen',
      createdBy: 'Jane Smith',
      assignedTo: 'Mike Johnson',
      createdDate: '2026-01-20 13:45',
      itemCount: 2,
    },
    {
      id: 'ORD-003',
      items: [{ name: 'Pasta', quantity: 15, measurement: 'kg' }],
      status: 'completed',
      store: 'Store A',
      destination: 'Food Court',
      createdBy: 'Sarah Wilson',
      assignedTo: 'Tom Brown',
      createdDate: '2026-01-20 12:15',
      itemCount: 1,
    },
    {
      id: 'ORD-004',
      items: [
        { name: 'Mozzarella', quantity: 4, measurement: 'kg' },
        { name: 'Tomatoes', quantity: 8, measurement: 'kg' },
        { name: 'Basil', quantity: 0.5, measurement: 'kg' },
      ],
      status: 'pending',
      store: 'Store A',
      destination: 'Kitchen',
      createdBy: 'John Doe',
      createdDate: '2026-01-20 14:15',
      itemCount: 3,
    },
  ];

  const filteredOrders = orders.filter(
    (order) => filterStatus === 'all' || order.status === filterStatus
  );

  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'yellow',
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          label: 'Pending',
        };
      case 'in-progress':
        return {
          icon: AlertCircle,
          color: 'blue',
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          label: 'In Progress',
        };
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'green',
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          label: 'Completed',
        };
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Active Orders</h1>
        <p className="text-gray-600 mt-2">Manage and track transfer orders</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 mb-6 p-6">
        <div className="flex gap-2">
          {['all', 'pending', 'in-progress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={order.id}
              className={`bg-white rounded-xl border-2 ${statusConfig.border} hover:shadow-lg transition-shadow`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.createdDate}</p>
                  </div>
                  <span
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}
                  >
                    <StatusIcon size={16} />
                    {statusConfig.label}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-700">From:</span>
                    <span className="text-gray-600">{order.store}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-700">To:</span>
                    <span className="text-gray-600">{order.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User size={16} className="text-gray-400" />
                    <span className="font-medium text-gray-700">Created by:</span>
                    <span className="text-gray-600">{order.createdBy}</span>
                  </div>
                  {order.assignedTo && (
                    <div className="flex items-center gap-2 text-sm">
                      <User size={16} className="text-gray-400" />
                      <span className="font-medium text-gray-700">Assigned to:</span>
                      <span className="text-gray-600">{order.assignedTo}</span>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Items ({order.itemCount})</p>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        • {item.name} ({item.quantity} {item.measurement})
                      </p>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onViewOrder(order.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  <Eye size={18} />
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
