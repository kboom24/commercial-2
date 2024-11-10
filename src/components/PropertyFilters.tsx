import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const PropertyFilters: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <select className="w-full border rounded-lg p-2">
              <option>Any</option>
              <option>$1M - $5M</option>
              <option>$5M - $10M</option>
              <option>$10M - $20M</option>
              <option>$20M+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select className="w-full border rounded-lg p-2">
              <option>All Types</option>
              <option>Garden Style</option>
              <option>Mid-Rise</option>
              <option>High-Rise</option>
              <option>Townhome</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cap Rate</label>
            <select className="w-full border rounded-lg p-2">
              <option>Any</option>
              <option>4% - 5%</option>
              <option>5% - 6%</option>
              <option>6% - 7%</option>
              <option>7%+</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;