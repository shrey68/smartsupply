import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ForecastingPage from './pages/ForecastingPage';
import InventoryPage from './pages/InventoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DataInputPage from './pages/DataInputPage';
import DocumentationPage from './pages/DocumentationPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/forecasting" element={<ForecastingPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/data-input" element={<DataInputPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;