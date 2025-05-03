import React, { useState, useEffect } from 'react';
import { fetchProducts, generateBarcode, Product } from '../api';
import { Barcode as BarcodeIcon, Download, Check } from 'lucide-react';

function Barcodes() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [codeType, setCodeType] = useState<string>('EAN-13');
  const [barcodeImage, setBarcodeImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
        if (data.length > 0) {
          setSelectedProduct(data[0].sku);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setSuccess(false);
    setBarcodeImage(null);
    
    try {
      const response = await generateBarcode({
        product: selectedProduct,
        code_type: codeType,
        data: selectedProduct
      });
      
      setBarcodeImage(response.image);
      setSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to generate barcode:', err);
      setError('Failed to generate barcode. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Barcode Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Generate Barcode</h2>
          
          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 flex items-center">
              <Check size={20} className="text-green-500 mr-2" />
              <p className="text-sm text-green-700">Barcode successfully generated!</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Product
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {products.map((product) => (
                  <option key={product.id} value={product.sku}>
                    {product.name} ({product.sku})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Barcode Type
              </label>
              <select
                value={codeType}
                onChange={(e) => setCodeType(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="EAN-13">EAN-13</option>
                <option value="UPC-A">UPC-A</option>
                <option value="CODE128">CODE128</option>
                <option value="QR">QR Code</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={isGenerating}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isGenerating ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <BarcodeIcon size={20} className="mr-2" />
                  Generate Barcode
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Barcode Types:</h3>
            <ul className="text-xs text-gray-500 space-y-1 ml-4 list-disc">
              <li>EAN-13: Used for retail products worldwide</li>
              <li>UPC-A: Common in US/Canada retail</li>
              <li>CODE128: Versatile, alphanumeric</li>
              <li>QR: 2D codes for websites, text, etc.</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Barcode Preview</h2>
          
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6">
            {barcodeImage ? (
              <div className="flex flex-col items-center">
                <img 
                  src={barcodeImage} 
                  alt="Generated barcode" 
                  className="max-w-full max-h-48 object-contain" 
                />
                <div className="text-sm text-gray-500 mt-2">
                  {selectedProduct}
                </div>
                <button
                  className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    // In a real app, this would trigger a proper download
                    window.open(barcodeImage, '_blank');
                  }}
                >
                  <Download size={16} className="mr-2" />
                  Download
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-400 flex flex-col items-center">
                <BarcodeIcon size={48} className="mb-2" />
                <p>Generate a barcode to see the preview here</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Tips:</h3>
            <ul className="text-xs text-gray-500 space-y-1 ml-4 list-disc">
              <li>Print barcodes on non-glossy paper for better scanning</li>
              <li>Ensure adequate white space around the barcode</li>
              <li>For bulk printing, use label sheets compatible with your printer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Barcodes;