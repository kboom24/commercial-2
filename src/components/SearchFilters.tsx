import React, { useState } from 'react';
import { Search, Building2, DollarSign, MapPin, SlidersHorizontal } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onTypeChange: (type: string) => void;
  onPriceRangeChange: (range: string) => void;
  onLocationChange: (location: string) => void;
  onCapRateChange?: (range: string) => void;
  onUnitsChange?: (range: string) => void;
  onStrategyChange?: (strategy: string) => void;
}

export function SearchFilters({ 
  onSearch, 
  onTypeChange, 
  onPriceRangeChange, 
  onLocationChange,
  onCapRateChange,
  onUnitsChange,
  onStrategyChange
}: SearchFiltersProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // US States for location filter
  const states = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by location, property name, or type..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              <optgroup label="Major Markets">
                <option value="NY">New York</option>
                <option value="CA">California</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
                <option value="IL">Illinois</option>
              </optgroup>
              <optgroup label="All States">
                {states.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              onChange={(e) => onPriceRangeChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Price Ranges</option>
              <option value="0-10000000">Under $10M</option>
              <option value="10000000-20000000">$10M - $20M</option>
              <option value="20000000-30000000">$20M - $30M</option>
              <option value="30000000-50000000">$30M - $50M</option>
              <option value="50000000">$50M+</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters</span>
        </button>
      </div>

      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            >
              <option value="">All Property Types</option>
              <option value="high-rise">High Rise</option>
              <option value="mid-rise">Mid Rise</option>
              <option value="garden-style">Garden Style</option>
              <option value="townhome">Townhome</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cap Rate Range
            </label>
            <select 
              onChange={(e) => onCapRateChange?.(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            >
              <option value="">Any Cap Rate</option>
              <option value="4-5">4% - 5%</option>
              <option value="5-6">5% - 6%</option>
              <option value="6-7">6% - 7%</option>
              <option value="7+">7%+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Units
            </label>
            <select 
              onChange={(e) => onUnitsChange?.(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            >
              <option value="">Any Size</option>
              <option value="50-100">50 - 100 Units</option>
              <option value="100-200">100 - 200 Units</option>
              <option value="200-300">200 - 300 Units</option>
              <option value="300+">300+ Units</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Investment Strategy
            </label>
            <select 
              onChange={(e) => onStrategyChange?.(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            >
              <option value="">Any Strategy</option>
              <option value="core">Core</option>
              <option value="core-plus">Core Plus</option>
              <option value="value-add">Value Add</option>
              <option value="opportunistic">Opportunistic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Features
            </label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
              <option value="">Any Features</option>
              <option value="pool">Pool</option>
              <option value="fitness">Fitness Center</option>
              <option value="parking">Covered Parking</option>
              <option value="pet">Pet Friendly</option>
              <option value="business">Business Center</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year Built
            </label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
              <option value="">Any Year</option>
              <option value="2020+">2020 or newer</option>
              <option value="2010-2019">2010 - 2019</option>
              <option value="2000-2009">2000 - 2009</option>
              <option value="pre-2000">Before 2000</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}