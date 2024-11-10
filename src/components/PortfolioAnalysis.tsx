import React, { useState } from 'react';
import { PieChart, X, DollarSign, Building2, TrendingUp } from 'lucide-react';
import { Property } from '../types';
import { PROPERTIES } from '../data/properties';

interface PortfolioAnalysisProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PortfolioAnalysis({ isOpen, onClose }: PortfolioAnalysisProps) {
  const [portfolio] = useState<Property[]>(PROPERTIES.slice(0, 5));
  const [timeframe, setTimeframe] = useState('1y');

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const portfolioMetrics = {
    totalValue: portfolio.reduce((sum, p) => sum + p.price, 0),
    totalUnits: portfolio.reduce((sum, p) => sum + p.units, 0),
    averageCapRate: portfolio.reduce((sum, p) => sum + p.cap_rate, 0) / portfolio.length,
    totalNOI: portfolio.reduce((sum, p) => sum + (p.noi || 0), 0),
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <PieChart className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold">Portfolio Analysis</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <DollarSign className="w-5 h-5" />
                <span>Total Value</span>
              </div>
              <p className="text-2xl font-bold">{formatter.format(portfolioMetrics.totalValue)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Building2 className="w-5 h-5" />
                <span>Total Units</span>
              </div>
              <p className="text-2xl font-bold">{portfolioMetrics.totalUnits}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span>Average Cap Rate</span>
              </div>
              <p className="text-2xl font-bold">{portfolioMetrics.averageCapRate.toFixed(1)}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <DollarSign className="w-5 h-5" />
                <span>Total NOI</span>
              </div>
              <p className="text-2xl font-bold">{formatter.format(portfolioMetrics.totalNOI)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Portfolio Properties</h3>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="px-3 py-1 border rounded-lg"
                >
                  <option value="1y">Last Year</option>
                  <option value="3y">Last 3 Years</option>
                  <option value="5y">Last 5 Years</option>
                </select>
              </div>
              <div className="space-y-4">
                {portfolio.map((property) => (
                  <div key={property.id} className="bg-white border p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{property.title}</h4>
                        <p className="text-sm text-gray-600">{property.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatter.format(property.price)}</p>
                        <p className="text-sm text-gray-600">{property.cap_rate}% Cap Rate</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Units</p>
                        <p className="font-semibold">{property.units}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">NOI</p>
                        <p className="font-semibold">{formatter.format(property.noi!)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Price/Unit</p>
                        <p className="font-semibold">{formatter.format(property.price_per_unit!)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Portfolio Metrics</h3>
              <div className="bg-white border p-6 rounded-lg">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Value Distribution</h4>
                    <div className="h-40 bg-gray-50 rounded flex items-center justify-center">
                      Chart Placeholder
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Performance Trends</h4>
                    <div className="h-40 bg-gray-50 rounded flex items-center justify-center">
                      Chart Placeholder
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}