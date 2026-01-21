import { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Camera, X, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  barcode: string;
  stock: number;
  measurement: string;
  store: string;
}

export default function BarcodeScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string>('');
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  const products: Product[] = [
    { id: 1, name: 'Tomatoes', barcode: '4011', stock: 45, measurement: 'kg', store: 'Store A' },
    { id: 2, name: 'Olive Oil', barcode: '8411', stock: 12, measurement: 'L', store: 'Store A' },
    { id: 3, name: 'Flour', barcode: '2034', stock: 89, measurement: 'kg', store: 'Store B' },
    { id: 4, name: 'Chicken Breast', barcode: '7821', stock: 25, measurement: 'kg', store: 'Store A' },
    { id: 5, name: 'Mozzarella', barcode: '9234', stock: 28, measurement: 'kg', store: 'Store B' },
    { id: 6, name: 'Pasta', barcode: '5612', stock: 156, measurement: 'kg', store: 'Store A' },
  ];

  useEffect(() => {
    readerRef.current = new BrowserMultiFormatReader();

    const getDevices = async () => {
      try {
        const videoDevices = await readerRef.current?.listVideoInputDevices();
        if (videoDevices) {
          setDevices(videoDevices);
          if (videoDevices.length > 0) {
            setSelectedDevice(videoDevices[0].deviceId);
          }
        }
      } catch (err) {
        setError('Unable to access camera devices');
      }
    };

    getDevices();

    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    if (!readerRef.current || !videoRef.current) return;

    try {
      setError('');
      setIsScanning(true);
      setProduct(null);
      setScannedBarcode('');

      await readerRef.current.decodeFromVideoDevice(
        selectedDevice || undefined,
        videoRef.current,
        (result, error) => {
          if (result) {
            const barcode = result.getText();
            setScannedBarcode(barcode);

            const foundProduct = products.find(p => p.barcode === barcode);
            if (foundProduct) {
              setProduct(foundProduct);
            } else {
              setProduct(null);
            }

            stopScanning();
          }
        }
      );
    } catch (err) {
      setError('Failed to start camera. Please check camera permissions.');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (readerRef.current) {
      readerRef.current.reset();
    }
    setIsScanning(false);
  };

  const resetScanner = () => {
    setScannedBarcode('');
    setProduct(null);
    setError('');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Barcode Scanner</h1>
        <p className="text-gray-600 mt-2">Scan product barcodes using your camera</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Camera Feed</h2>
            </div>

            <div className="p-6">
              {devices.length > 1 && !isScanning && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Camera
                  </label>
                  <select
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {devices.map((device) => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Camera ${device.deviceId.substring(0, 8)}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                />

                {!isScanning && !scannedBarcode && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="text-center">
                      <Camera size={64} className="mx-auto text-white mb-4" />
                      <p className="text-white text-lg">Camera ready</p>
                    </div>
                  </div>
                )}

                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="border-4 border-blue-500 rounded-lg" style={{ width: '60%', height: '40%' }}>
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500"></div>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-red-800 font-medium">Error</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                {!isScanning && !scannedBarcode && (
                  <button
                    onClick={startScanning}
                    disabled={devices.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Camera size={20} />
                    Start Scanning
                  </button>
                )}

                {isScanning && (
                  <button
                    onClick={stopScanning}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    <X size={20} />
                    Stop Scanning
                  </button>
                )}

                {scannedBarcode && (
                  <button
                    onClick={resetScanner}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    <RefreshCw size={20} />
                    Scan Again
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Scan Results</h2>
            </div>

            <div className="p-6">
              {!scannedBarcode && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Camera size={40} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">No barcode scanned yet</p>
                  <p className="text-sm text-gray-400 mt-1">Start scanning to see results</p>
                </div>
              )}

              {scannedBarcode && (
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Scanned Barcode</p>
                    <p className="text-2xl font-bold text-gray-900 font-mono">{scannedBarcode}</p>
                  </div>

                  {product ? (
                    <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle size={24} className="text-green-600" />
                        <h3 className="text-lg font-semibold text-green-900">Product Found</h3>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-green-700">Product Name</p>
                          <p className="text-xl font-bold text-green-900">{product.name}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-green-700">Store Location</p>
                            <p className="font-semibold text-green-900">{product.store}</p>
                          </div>
                          <div>
                            <p className="text-sm text-green-700">Current Stock</p>
                            <p className="font-semibold text-green-900">
                              {product.stock} {product.measurement}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-green-200">
                        <p className="text-sm text-green-700 mb-3">Quick Actions</p>
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Add to Transfer
                          </button>
                          <button className="px-4 py-2 bg-white text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-yellow-200 rounded-lg p-6 bg-yellow-50">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertCircle size={24} className="text-yellow-600" />
                        <h3 className="text-lg font-semibold text-yellow-900">Product Not Found</h3>
                      </div>
                      <p className="text-yellow-700">
                        No product with barcode <span className="font-mono font-semibold">{scannedBarcode}</span> was found in the inventory.
                      </p>
                      <button className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                        Add New Product
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Tips for Best Results</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Ensure good lighting conditions</li>
              <li>• Hold the barcode steady within the scanning frame</li>
              <li>• Keep the barcode at a comfortable distance from the camera</li>
              <li>• Make sure the barcode is in focus and not blurry</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
