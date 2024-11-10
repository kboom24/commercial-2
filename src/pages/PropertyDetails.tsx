import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building2, MapPin, DollarSign, Calendar, BarChart3, Calculator, 
  Heart, Share2, Clock, Eye, Users, TrendingUp, ArrowLeft 
} from 'lucide-react';
import { getPropertyById } from '../data/properties';
import { useAuth } from '../context/AuthContext';
import { FinancialCalculator } from '../components/FinancialCalculator';
import { MarketAnalysis } from '../components/MarketAnalysis';
import { ScheduleTour } from '../components/ScheduleTour';

export function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, saveProperty, removeSavedProperty } = useAuth();
  const [showCalculator, setShowCalculator] = useState(false);
  const [showMarketAnalysis, setShowMarketAnalysis] = useState(false);
  const [showTourScheduler, setShowTourScheduler] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const property = getPropertyById(id!);
  const isSaved = user?.savedProperties.includes(id!);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <button
            onClick={() => navigate('/properties')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Return to Properties
          </button>
        </div>
      </div>
    );
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const handleSaveProperty = () => {
    if (!user) {
      // TODO: Show auth modal
      return;
    }
    
    if (isSaved) {
      removeSavedProperty(id!);
    } else {
      saveProperty(id!);
    }
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Properties
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
              <span className="font-bold">{property.cap_rate}% Cap Rate</span>
            </div>
            <button
              onClick={handleSaveProperty}
              className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  isSaved ? 'fill-red-500 text-red-500' : 'text-gray-500'
                }`}
              />
            </button>
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-500" />
              </button>
              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Copy Link
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Share via Email
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{formatter.format(property.price)}</div>
              <div className="text-gray-600">{formatter.format(property.price_per_unit!)}/unit</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Building2 className="w-5 h-5" />
                <span>Property Type</span>
              </div>
              <p className="text-xl font-bold capitalize">{property.type.replace('-', ' ')}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Users className="w-5 h-5" />
                <span>Units</span>
              </div>
              <p className="text-xl font-bold">{property.units}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <DollarSign className="w-5 h-5" />
                <span>NOI</span>
              </div>
              <p className="text-xl font-bold">{formatter.format(property.noi!)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Building2 className="w-5 h-5" />
                <span>Size</span>
              </div>
              <p className="text-xl font-bold">{property.size.toLocaleString()} sqft</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Listed {new Date(property.listingDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Eye className="w-4 h-4" />
              <span>{property.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>{property.potentialBuyers} interested buyers</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Features</h2>
              <ul className="grid grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Special Features</h2>
              <ul className="grid grid-cols-1 gap-4">
                {property.specialFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Price History</h2>
              <div className="space-y-4">
                {property.priceHistory.map((history, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{history.date}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">
                        {formatter.format(history.price)}
                      </span>
                      <span className={`text-sm ${
                        history.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {history.change > 0 ? '+' : ''}{history.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Tax History</h2>
              <div className="space-y-4">
                {property.taxHistory.map((tax, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{tax.year}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">
                        {formatter.format(tax.amount)}
                      </span>
                      <span className={`text-sm ${
                        tax.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {tax.change > 0 ? '+' : ''}{tax.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
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