import React, { useState } from 'react';
import { Property } from '../types';
import { PROPERTIES } from '../data/properties';
import { TrendingUp, X, Search } from 'lucide-react';

interface InvestmentComparisonProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InvestmentComparison({ isOpen, onClose }: InvestmentComparisonProps) {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const handleAddProperty = (property: Property) => {
    if (selectedProperties.length < 3) {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  const handleRemoveProperty = (propertyId: string) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId));
  };

  const filteredProperties = PROPERTIES.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold">Compare Properties</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Available Properties</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => handleAddProperty(property)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{property.title}</h4>
                        <p className="text-sm text-gray-600">{property.location}</p>
                      </div>
                      <p className="font-semibold">{formatter.format(property.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Selected Properties</h3>
              <div className="space-y-4">
                {selectedProperties.map((property) => (
                  <div key={property.id} className="bg-white border p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{property.title}</h4>
                        <p className="text-sm text-gray-600">{property.location}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveProperty(property.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Price</p>
                        <p className="font-semibold">{formatter.format(property.price)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cap Rate</p>
                        <p className="font-semibold">{property.cap_rate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Units</p>
                        <p className="font-semibold">{property.units}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Price/Unit</p>
                        <p className="font-semibold">{formatter.format(property.price_per_unit!)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {selectedProperties.length === 0 && (
                  <p className="text-center text-gray-600 py-8">
                    Select properties to compare
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              disabled={selectedProperties.length < 2}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Compare Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}