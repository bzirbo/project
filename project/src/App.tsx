import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import StoreInventory from './screens/StoreInventory';
import TransferCreation from './screens/TransferCreation';
import ActiveOrders from './screens/ActiveOrders';
import OrderDetail from './screens/OrderDetail';
import Traceability from './screens/Traceability';
import BarcodeScanner from './screens/BarcodeScanner';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentPage('order-detail');
  };

  const handleBackToOrders = () => {
    setSelectedOrderId(null);
    setCurrentPage('orders');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <StoreInventory />;
      case 'transfer':
        return <TransferCreation />;
      case 'orders':
        return <ActiveOrders onViewOrder={handleViewOrder} />;
      case 'order-detail':
        return selectedOrderId ? (
          <OrderDetail orderId={selectedOrderId} onBack={handleBackToOrders} />
        ) : (
          <ActiveOrders onViewOrder={handleViewOrder} />
        );
      case 'history':
        return <Traceability />;
      case 'scanner':
        return <BarcodeScanner />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
