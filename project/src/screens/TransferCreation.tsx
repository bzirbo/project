import { useState } from 'react';
import { Search, Plus, Minus, ShoppingCart, Scan, X } from 'lucide-react';

interface CartItem {
  productId: number;
  name: string;
  barcode: string;
  quantity: number;
  measurement: string;
  availableStock: number;
}

export default function TransferCreation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedStore, setSelectedStore] = useState('Store A');
  const [destination, setDestination] = useState('Kitchen');

  const products = [
    { id: 1, name: 'Tomatoes', barcode: '4011', stock: 45, measurement: 'kg', store: 'Store A' },
    { id: 2, name: 'Olive Oil', barcode: '8411', stock: 12, measurement: 'L', store: 'Store A' },
    { id: 3, name: 'Flour', barcode: '2034', stock: 89, measurement: 'kg', store: 'Store A' },
    { id: 4, name: 'Chicken Breast', barcode: '7821', stock: 25, measurement: 'kg', store: 'Store A' },
    { id: 5, name: 'Mozzarella', barcode: '9234', stock: 28, measurement: 'kg', store: 'Store A' },
    { id: 6, name: 'Pasta', barcode: '5612', stock: 156, measurement: 'kg', store: 'Store A' },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.barcode.includes(searchQuery)) &&
      product.store === selectedStore
  );

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find((item) => item.productId === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          name: product.name,
          barcode: product.barcode,
          quantity: 1,
          measurement: product.measurement,
          availableStock: product.stock,
        },
      ]);
    }
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    const item = cart.find((i) => i.productId === productId);
    if (!item) return;

    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else if (newQuantity <= item.availableStock) {
      setCart(cart.map((item) => (item.productId === productId ? { ...item, quantity: newQuantity } : item)));
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const handleSubmit = () => {
    alert('Transfer order created successfully!');
    setCart([]);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Transfer Order</h1>
        <p className="text-gray-600 mt-2">Select products to transfer from store to kitchen/food court</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 mb-6 p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search products or scan barcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Scan size={20} />
                Scan Barcode
              </button>
            </div>

            <div className="flex gap-4 mb-6">
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Store A">Store A</option>
                <option value="Store B">Store B</option>
              </select>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Kitchen">Kitchen</option>
                <option value="Food Court">Food Court</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Available Products</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredProducts.map((product) => (
                <div key={product.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        Barcode: {product.barcode} | Available: {product.stock} {product.measurement}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 sticky top-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart size={20} className="text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Transfer Cart</h2>
              </div>
              <p className="text-sm text-gray-500">{cart.length} items</p>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">Cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.productId} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                          <p className="text-xs text-gray-500">
                            Available: {item.availableStock} {item.measurement}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 0)}
                          className="w-20 text-center px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">{item.measurement}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={cart.length === 0}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Transfer Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
