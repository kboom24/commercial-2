import React from 'react';
import { Building2, MapPin, DollarSign, Heart, ArrowRight, Eye, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';

interface PropertyCardProps {
  property: Property;
  onSave?: (propertyId: string) => void;
  showSaveButton?: boolean;
}

export function PropertyCard({ property, onSave, showSaveButton = true }: PropertyCardProps) {
  const { user } = useAuth();
  const isSaved = user?.savedProperties?.includes(property.id);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) {
      onSave(property.id);
    }
  };

  return (
    <Link 
      to={`/property/${property.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative h-48">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="bg-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {property.cap_rate}% Cap Rate
          </div>
          {showSaveButton && (
            <button
              onClick={handleSaveClick}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
            >
              <Heart
                className={`w-5 h-5 ${
                  isSaved ? 'fill-red-500 text-red-500' : 'text-gray-500'
                }`}
              />
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{property.location}</span>
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-4">
          {formatter.format(property.price)}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-gray-600">
            <Building2 className="w-4 h-4 mr-1" />
            <span>{property.units} Units</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{formatter.format(property.price / property.units)}/unit</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{property.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{property.potentialBuyers} interested</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-gray-500">
              Listed {new Date(property.listingDate).toLocaleDateString()}
            </span>
            <div 
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}