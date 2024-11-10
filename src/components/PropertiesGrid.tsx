import React from 'react';
import { Link } from 'react-router-dom';
import { PROPERTIES } from '../data/properties';

const PropertiesGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROPERTIES.map((property) => (
          <Link 
            to={`/property/${property.id}`} 
            key={property.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-gray-800 font-semibold">
                ${property.price.toLocaleString()}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
              <p className="text-gray-600 mb-4">{property.location}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Units</p>
                  <p className="font-semibold">{property.units}</p>
                </div>
                <div>
                  <p className="text-gray-500">Cap Rate</p>
                  <p className="font-semibold">{property.cap_rate}%</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertiesGrid;