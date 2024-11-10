import React from 'react';
import { BarChart3, TrendingUp, Users, Home, DollarSign, Activity } from 'lucide-react';
import { Property } from '../types';

interface MarketAnalysisProps {
  property: Property;
  onClose: () => void;
}

export function MarketAnalysis({ property, onClose }: MarketAnalysisProps) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const marketData = {
    averageRent: property.price / property.units / 200, // Estimated monthly rent
    occupancyRate: 95.2,
    marketGrowth: 4.2,
    comparableProperties: [
      {
        name: 'Similar Property 1',
        price: property.price * 0.95,
        units: property.units - 5,
        pricePerUnit: (property.price * 0.95) / (property.units - 5),
      },
      {
        name: 'Similar Property 2',
        price: property.price * 1.05,
        units: property.units + 8,
        pricePerUnit: (property.price * 1.05) / (property.units + 8),
      },
      {
        name: 'Similar Property 3',
        price: property.price * 0.98,
        units: property.units - 2,
        pricePerUnit: (property.price * 0.98) / (property.units - 2),
      },
    ],
    demographics: {
      population: '458,000',
      medianIncome: '$75,000',
      employmentGrowth: '2.8%',
      medianAge: '34',
    },
    marketIndicators: {
      supplyGrowth: '1.2%',
      rentGrowth: '3.8%',
      absorption: '95%',
      marketCycle: 'Expansion',
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold">Market Analysis</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Market Overview</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Average Market Rent</span>
                  </div>
                  <p className="text-2xl font-bold">{formatter.format(marketData.averageRent)}/mo</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Users className="w-4 h-4" />
                    <span>Market Occupancy Rate</span>
                  </div>
                  <p className="text-2xl font-bold">{marketData.occupancyRate}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Annual Market Growth</span>
                  </div>
                  <p className="text-2xl font-bold">{marketData.marketGrowth}%</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Comparable Properties</h3>
              <div className="space-y-4">
                {marketData.comparableProperties.map((prop, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium mb-2">{prop.name}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <p className="font-semibold">{formatter.format(prop.price)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Price/Unit:</span>
                        <p className="font-semibold">{formatter.format(prop.pricePerUnit)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Demographics</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Population</p>
                    <p className="font-semibold">{marketData.demographics.population}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Median Income</p>
                    <p className="font-semibold">{marketData.demographics.medianIncome}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Employment Growth</p>
                    <p className="font-semibold">{marketData.demographics.employmentGrowth}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Median Age</p>
                    <p className="font-semibold">{marketData.demographics.medianAge}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Market Indicators</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Supply Growth</p>
                    <p className="font-semibold">{marketData.marketIndicators.supplyGrowth}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Rent Growth</p>
                    <p className="font-semibold">{marketData.marketIndicators.rentGrowth}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Absorption Rate</p>
                    <p className="font-semibold">{marketData.marketIndicators.absorption}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Market Cycle</p>
                    <p className="font-semibold">{marketData.marketIndicators.marketCycle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-indigo-600">Market Outlook</h3>
            </div>
            <p className="text-gray-700">
              Based on current market indicators, this submarket shows strong fundamentals with steady 
              population growth and rising employment rates. The property's price per unit aligns with 
              market comparables, while above-average occupancy rates and consistent rent growth suggest 
              favorable investment conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}