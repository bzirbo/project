import { useState } from 'react';
import { Search, AlertCircle, Package } from 'lucide-react';

export default function StoreInventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Tomatoes',
      barcode: '4011',
      stock: 45,
      measurement: 'kg',
      store: 'Store A',
      status: 'normal',
      lastUpdated: '2 min ago',
    },
    {
      id: 2,
      name: 'Olive Oil',
      barcode: '8411',
      stock: 12,
      measurement: 'L',
      store: 'Store A',
      status: 'low',
      lastUpdated: '5 min ago',
    },
    {
      id: 3,
      name: 'Flour',
      barcode: '2034',
      stock: 89,
      measurement: 'kg',
      store: 'Store B',
      status: 'normal',
      lastUpdated: '1 min ago',
    },
    {
      id: 4,
      name: 'Chicken Breast',
      barcode: '7821',
      stock: 5,
      measurement: 'kg',
      store: 'Store A',
      status: 'critical',
      lastUpdated: '3 min ago',
    },
    {
      id: 5,
      name: 'Mozzarella',
      barcode: '9234',
      stock: 28,
      measurement: 'kg',
      store: 'Store B',
      status: 'normal',
      lastUpdated: '10 min ago',
    },
    {
      id: 6,
      name: 'Pasta',
      barcode: '5612',
      stock: 156,
      measurement: 'kg',
      store: 'Store A',
      status: 'normal',
      lastUpdated: '15 min ago',
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery);
    const matchesStore = selectedStore === 'all' || product.store === selectedStore;
    return matchesSearch && matchesStore;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Store Inventory</h1>
        <p className="text-gray-600 mt-2">Real-time view of products in store</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 mb-6 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by product name or barcode..."
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
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Product</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Barcode</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Store</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Stock Level</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Package size={20} className="text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{product.barcode}</td>
                <td className="px-6 py-4 text-gray-600">{product.store}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">
                    {product.stock} {product.measurement}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {product.status === 'critical' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      <AlertCircle size={14} />
                      Critical
                    </span>
                  ) : product.status === 'low' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      <AlertCircle size={14} />
                      Low Stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Normal
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{product.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
