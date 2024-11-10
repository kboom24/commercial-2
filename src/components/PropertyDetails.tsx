import React, { useState } from 'react';
import { Building2, DollarSign, MapPin, Home, BarChart3, Calculator, Calendar } from 'lucide-react';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';
import { FinancialCalculator } from './FinancialCalculator';
import { ScheduleTour } from './ScheduleTour';
import { MarketAnalysis } from './MarketAnalysis';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
}

export function PropertyDetails({ property, onClose }: PropertyDetailsProps) {
  const { user, saveProperty, removeSavedProperty } = useAuth();
  const isSaved = user?.savedProperties.includes(property.id);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showTourScheduler, setShowTourScheduler] = useState(false);
  const [showMarketAnalysis, setShowMarketAnalysis] = useState(false);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-96">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{property.location}</span>
              </div>
            </div>
            <button
              onClick={() => isSaved ? removeSavedProperty(property.id) : saveProperty(property.id)}
              className={`px-4 py-2 rounded-lg border ${
                isSaved ? 'border-indigo-600 text-indigo-600' : 'border-gray-300 text-gray-600'
              } hover:bg-gray-50`}
            >
              {isSaved ? 'Saved' : 'Save Property'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <DollarSign className="w-5 h-5" />
                <span>Price</span>
              </div>
              <p className="text-2xl font-bold">{formatter.format(property.price)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Building2 className="w-5 h-5" />
                <span>Property Size</span>
              </div>
              <p className="text-2xl font-bold">{property.size.toLocaleString()} sq ft</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Home className="w-5 h-5" />
                <span>Units</span>
              </div>
              <p className="text-2xl font-bold">{property.units}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Financial Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per Unit</span>
                  <span className="font-semibold">{formatter.format(property.price_per_unit!)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cap Rate</span>
                  <span className="font-semibold">{property.cap_rate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">NOI</span>
                  <span className="font-semibold">{formatter.format(property.noi!)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Property Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setShowTourScheduler(true)}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Schedule Tour
            </button>
            <button 
              onClick={() => setShowCalculator(true)}
              className="flex-1 bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Financial Calculator
            </button>
            <button 
              onClick={() => setShowMarketAnalysis(true)}
              className="flex-1 bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              Market Analysis
            </button>
          </div>
        </div>
      </div>

      {showCalculator && (
        <FinancialCalculator
          property={property}
          onClose={() => setShowCalculator(false)}
        />
      )}

      {showTourScheduler && (
        <ScheduleTour
          property={property}
          onClose={() => setShowTourScheduler(false)}
        />
      )}

      {showMarketAnalysis && (
        <MarketAnalysis
          property={property}
          onClose={() => setShowMarketAnalysis(false)}
        />
      )}
    </div>
  );
}