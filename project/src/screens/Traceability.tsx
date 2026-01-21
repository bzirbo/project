import { useState } from 'react';
import { Search, Calendar, Download, ArrowRight, DollarSign } from 'lucide-react';

export default function Traceability() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('today');
  const [selectedStore, setSelectedStore] = useState('all');

  const transactions = [
    {
      id: 'TRX-001',
      orderId: 'ORD-001',
      product: 'Tomatoes',
      quantity: 5,
      measurement: 'kg',
      from: 'Store A',
      to: 'Kitchen',
      timestamp: '2026-01-20 14:30',
      user: 'John Doe',
      cost: 45.5,
      status: 'completed',
    },
    {
      id: 'TRX-002',
      orderId: 'ORD-001',
      product: 'Olive Oil',
      quantity: 2,
      measurement: 'L',
      from: 'Store A',
      to: 'Kitchen',
      timestamp: '2026-01-20 14:30',
      user: 'John Doe',
      cost: 28.0,
      status: 'completed',
    },
    {
      id: 'TRX-003',
      orderId: 'ORD-002',
      product: 'Flour',
      quantity: 10,
      measurement: 'kg',
      from: 'Store B',
      to: 'Kitchen',
      timestamp: '2026-01-20 13:45',
      user: 'Jane Smith',
      cost: 15.0,
      status: 'completed',
    },
    {
      id: 'TRX-004',
      orderId: 'ORD-003',
      product: 'Pasta',
      quantity: 15,
      measurement: 'kg',
      from: 'Store A',
      to: 'Food Court',
      timestamp: '2026-01-20 12:15',
      user: 'Sarah Wilson',
      cost: 37.5,
      status: 'completed',
    },
    {
      id: 'TRX-005',
      orderId: 'ORD-002',
      product: 'Chicken Breast',
      quantity: 3,
      measurement: 'kg',
      from: 'Store B',
      to: 'Kitchen',
      timestamp: '2026-01-20 13:45',
      user: 'Jane Smith',
      cost: 45.0,
      status: 'completed',
    },
  ];

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStore = selectedStore === 'all' || txn.from === selectedStore;
    return matchesSearch && matchesStore;
  });

  const totalCost = filteredTransactions.reduce((sum, txn) => sum + txn.cost, 0);
  const totalItems = filteredTransactions.length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Traceability & History</h1>
        <p className="text-gray-600 mt-2">Complete audit trail of all stock movements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ArrowRight size={20} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total Transfers</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
          <p className="text-sm text-gray-500 mt-1">In selected period</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total Cost</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">${totalCost.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">In selected period</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar size={20} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Avg per Day</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{Math.round(totalItems / 1)}</p>
          <p className="text-sm text-gray-500 mt-1">Transfers per day</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 mb-6 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by product, order ID, or transaction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Stores</option>
            <option value="Store A">Store A</option>
            <option value="Store B">Store B</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Transaction ID</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Order ID</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Product</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Quantity</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Transfer Route</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Cost</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">User</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-gray-900">{txn.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-blue-600 hover:underline cursor-pointer">
                    {txn.orderId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">{txn.product}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">
                    {txn.quantity} {txn.measurement}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{txn.from}</span>
                    <ArrowRight size={16} className="text-gray-400" />
                    <span className="text-gray-600">{txn.to}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">${txn.cost.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{txn.user}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{txn.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
