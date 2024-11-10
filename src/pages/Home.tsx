import React, { useState } from 'react';
import { Building2, MapPin, DollarSign, TrendingUp, Shield, Users, ArrowRight } from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { SearchFilters } from '../components/SearchFilters';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { user, saveProperty, removeSavedProperty } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [location, setLocation] = useState('');

  // Get 8 featured properties (you could implement your own logic for featuring properties)
  const featuredProperties = PROPERTIES
    .sort((a, b) => b.views - a.views) // Sort by views to get "most popular"
    .slice(0, 8);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTypeChange = (type: string) => {
    setPropertyType(type);
  };

  const handlePriceRangeChange = (range: string) => {
    setPriceRange(range);
  };

  const handleLocationChange = (loc: string) => {
    setLocation(loc);
  };

  const handleSaveProperty = (propertyId: string) => {
    if (!user) return;
    
    if (user.savedProperties.includes(propertyId)) {
      removeSavedProperty(propertyId);
    } else {
      saveProperty(propertyId);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Discover Premium Multifamily Investment Opportunities
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Access institutional-quality multifamily properties with detailed analytics, 
              market insights, and professional investment tools.
            </p>
            <div className="flex gap-4">
              <Link
                to="/market-research"
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Markets
              </Link>
              <Link
                to="/investment-tools"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Investment Tools
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <SearchFilters
          onSearch={handleSearch}
          onTypeChange={handleTypeChange}
          onPriceRangeChange={handlePriceRangeChange}
          onLocationChange={handleLocationChange}
        />
      </div>

      {/* Key Benefits */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Iverston</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive solutions for multifamily real estate investors, 
              from market analysis to deal execution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-indigo-600">
                <TrendingUp className="w-8 h-8" />
                <h3 className="text-lg font-semibold">Data-Driven Insights</h3>
              </div>
              <p className="text-gray-600">
                Access comprehensive market data and analytics to make informed investment decisions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-indigo-600">
                <Shield className="w-8 h-8" />
                <h3 className="text-lg font-semibold">Verified Properties</h3>
              </div>
              <p className="text-gray-600">
                Every listing undergoes thorough due diligence and verification process.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-indigo-600">
                <Users className="w-8 h-8" />
                <h3 className="text-lg font-semibold">Expert Support</h3>
              </div>
              <p className="text-gray-600">
                Get guidance from experienced multifamily investment professionals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
            <p className="text-gray-600">
              Discover our handpicked selection of premium multifamily investments
            </p>
          </div>
          <Link
            to="/properties"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            View All Properties
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSave={handleSaveProperty}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
                <p className="text-gray-600 mb-6">
                  Join thousands of investors who trust Iverston for their multifamily 
                  investment needs. Get access to exclusive properties and professional tools.
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/signup"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Create Account
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-2xl mb-1">$2.5B+</h4>
                  <p className="text-gray-600">Property Value</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-2xl mb-1">5,000+</h4>
                  <p className="text-gray-600">Active Investors</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-2xl mb-1">98%</h4>
                  <p className="text-gray-600">Success Rate</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-2xl mb-1">24/7</h4>
                  <p className="text-gray-600">Expert Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}