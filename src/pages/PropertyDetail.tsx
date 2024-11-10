import React from 'react';
import { useParams } from 'react-router-dom';
import { Building2, MapPin, DollarSign, Users } from 'lucide-react';

// Demo property data
const demoProperty = {
  id: '1',
  title: 'Luxury Waterfront Apartments',
  description: 'Premium multifamily property featuring modern amenities and stunning waterfront views. Recently renovated with high-end finishes and smart home technology throughout.',
  type: 'high-rise',
  price: 15000000,
  size: 45000,
  units: 45,
  location: 'Miami, FL',
  imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000',
  features: ['Pool', 'Fitness Center', 'Covered Parking', 'Pet Friendly'],
  cap_rate: 5.8,
  noi: 870000,
  price_per_unit: 333333,
  estimatedValue: 16500000,
  specialFeatures: [
    'Waterfront Views',
    'Recently Renovated',
    'Smart Home Technology',
    'Rooftop Terrace'
  ],
  listingDate: '2024-01-15',
  views: 1250,
  potentialBuyers: 85,
};

export default function PropertyDetail() {
  const { id } = useParams();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={demoProperty.imageUrl}
            alt={demoProperty.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{demoProperty.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{demoProperty.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{formatter.format(demoProperty.price)}</div>
              <div className="text-gray-600">{formatter.format(demoProperty.price_per_unit)}/unit</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Building2 className="w-5 h-5" />
                <span>Property Type</span>
              </div>
              <p className="text-xl font-bold">{demoProperty.type}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Users className="w-5 h-5" />
                <span>Units</span>
              </div>
              <p className="text-xl font-bold">{demoProperty.units}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <DollarSign className="w-5 h-5" />
                <span>Cap Rate</span>
              </div>
              <p className="text-xl font-bold">{demoProperty.cap_rate}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Building2 className="w-5 h-5" />
                <span>Size</span>
              </div>
              <p className="text-xl font-bold">{demoProperty.size.toLocaleString()} sqft</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-600">{demoProperty.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Features</h2>
              <ul className="grid grid-cols-2 gap-4">
                {demoProperty.features.map((feature, index) => (
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
                {demoProperty.specialFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}