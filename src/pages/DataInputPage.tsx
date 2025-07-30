import React, { useState } from 'react';
import { Upload, Database, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export const DataInputPage = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadStatus('processing');
      // Simulate file processing
      setTimeout(() => {
        setUploadStatus('success');
      }, 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Input & Management</h1>
        <p className="text-gray-600">Upload sales data, manage product information, and configure store settings</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Upload className="h-4 w-4 inline-block mr-2" />
              Upload Data
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'manual'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Database className="h-4 w-4 inline-block mr-2" />
              Manual Entry
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'api'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="h-4 w-4 inline-block mr-2" />
              API Integration
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Sales Data</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop your files here or click to browse
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Supports CSV, Excel, JSON formats. Maximum file size: 50MB
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".csv,.xlsx,.json"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                  >
                    Choose File
                  </label>
                </div>

                {uploadStatus === 'processing' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                    <span className="text-blue-800">Processing file...</span>
                  </div>
                )}

                {uploadStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span className="text-green-800">File uploaded successfully! 1,245 records processed.</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Sales Data Template</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Download our CSV template with required columns
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Download Template
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Product Catalog</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Upload product information and specifications
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Upload Products
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Store Locations</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Manage store information and settings
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Manage Stores
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Manual Data Entry</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter SKU"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                      <option>Select category</option>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Sports</option>
                      <option>Home & Garden</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Location</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                      <option>Select store</option>
                      <option>Downtown Store</option>
                      <option>Mall Location</option>
                      <option>Suburban Store</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Stock</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter stock quantity"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter unit price"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product description"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">API Integration</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-blue-900">API Documentation</h3>
                    <p className="text-sm text-blue-800 mt-1">
                      Integrate with our RESTful API to automatically sync sales data, inventory levels, and product information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Connection Settings</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Endpoint</label>
                    <input
                      type="url"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="https://api.your-pos-system.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your API key"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sync Frequency</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                      <option>Real-time</option>
                      <option>Every 15 minutes</option>
                      <option>Hourly</option>
                      <option>Daily</option>
                    </select>
                  </div>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Test Connection
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Supported Integrations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Shopify</h4>
                        <p className="text-sm text-gray-600">E-commerce platform</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Configure
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Square POS</h4>
                        <p className="text-sm text-gray-600">Point of sale system</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Configure
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">WooCommerce</h4>
                        <p className="text-sm text-gray-600">WordPress e-commerce</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataInputPage;