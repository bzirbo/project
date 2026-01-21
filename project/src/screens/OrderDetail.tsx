import { ArrowLeft, CheckCircle, Clock, User, MapPin } from 'lucide-react';

interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
}

export default function OrderDetail({ orderId, onBack }: OrderDetailProps) {
  const order = {
    id: orderId,
    status: 'in-progress',
    store: 'Store A',
    destination: 'Kitchen',
    createdBy: 'Jane Smith',
    assignedTo: 'Mike Johnson',
    createdDate: '2026-01-20 13:45',
    items: [
      { id: 1, name: 'Flour', barcode: '2034', quantity: 10, measurement: 'kg', picked: true },
      { id: 2, name: 'Chicken Breast', barcode: '7821', quantity: 3, measurement: 'kg', picked: false },
    ],
    timeline: [
      { event: 'Order Created', timestamp: '2026-01-20 13:45', user: 'Jane Smith', completed: true },
      { event: 'Assigned to Mike Johnson', timestamp: '2026-01-20 13:47', user: 'System', completed: true },
      { event: 'Picking Started', timestamp: '2026-01-20 13:50', user: 'Mike Johnson', completed: true },
      { event: 'Items Picked', timestamp: 'Pending', user: '-', completed: false },
      { event: 'Transfer Complete', timestamp: 'Pending', user: '-', completed: false },
    ],
  };

  const completedItems = order.items.filter((item) => item.picked).length;
  const progress = (completedItems / order.items.length) * 100;

  return (
    <div className="p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Orders
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{order.id}</h1>
                <p className="text-gray-500">Created on {order.createdDate}</p>
              </div>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                In Progress
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin size={20} className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-semibold text-gray-900">{order.store}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin size={20} className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-semibold text-gray-900">{order.destination}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-gray-900">
                  {completedItems} of {order.items.length} items
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Items to Transfer</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        {item.picked && (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle size={12} />
                            Picked
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Barcode: {item.barcode} | Quantity: {item.quantity} {item.measurement}
                      </p>
                    </div>
                    {!item.picked && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Mark as Picked
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-200">
              <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                Complete Transfer
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Assignment</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <User size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created by</p>
                  <p className="font-medium text-gray-900">{order.createdBy}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <User size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned to</p>
                  <p className="font-medium text-gray-900">{order.assignedTo}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`p-1 rounded-full ${
                        event.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}
                    >
                      {event.completed ? (
                        <CheckCircle size={16} className="text-green-600" />
                      ) : (
                        <Clock size={16} className="text-gray-400" />
                      )}
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          event.completed ? 'bg-green-200' : 'bg-gray-200'
                        }`}
                      ></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-gray-900 text-sm">{event.event}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.timestamp}</p>
                    {event.user !== '-' && (
                      <p className="text-xs text-gray-500">by {event.user}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
