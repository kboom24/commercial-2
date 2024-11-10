import React from 'react';
import { useAuth } from '../context/AuthContext';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyDetails } from '../components/PropertyDetails';
import { Heart } from 'lucide-react';

export function SavedPropertiesPage() {
  const { user } = useAuth();
  const [selectedProperty, setSelectedProperty] = React.useState(null);

  if (!user) return null;

  const savedProperties = PROPERTIES.filter(property => 
    user.savedProperties.includes(property.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-6 h-6 text-indigo-600" />
        <h1 className="text-2xl font-bold">Saved Properties</h1>
      </div>

      {savedProperties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">You haven't saved any properties yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSave={() => {}}
            />
          ))}
        </div>
      )}

      {selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}