import React, { useState } from 'react';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { PropertySkeleton } from '../components/PropertySkeleton';
import { SearchFilters } from '../components/SearchFilters';
import { useAuth } from '../context/AuthContext';

export function PropertiesPage() {
  const { user, saveProperty, removeSavedProperty } = useAuth();
  const [filteredProperties, setFilteredProperties] = useState(PROPERTIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProperties(query, propertyType, priceRange, location);
  };

  const handleTypeChange = (type: string) => {
    setPropertyType(type);
    filterProperties(searchQuery, type, priceRange, location);
  };

  const handlePriceRangeChange = (range: string) => {
    setPriceRange(range);
    filterProperties(searchQuery, propertyType, range, location);
  };

  const handleLocationChange = (loc: string) => {
    setLocation(loc);
    filterProperties(searchQuery, propertyType, priceRange, loc);
  };

  const filterProperties = (query: string, type: string, range: string, loc: string) => {
    setIsLoading(true);
    let filtered = PROPERTIES;

    if (query) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (type) {
      filtered = filtered.filter(property => property.type === type);
    }

    if (range) {
      const [min, max] = range.split('-').map(Number);
      filtered = filtered.filter(property =>
        property.price >= min && (!max || property.price <= max)
      );
    }

    if (loc) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(loc.toLowerCase())
      );
    }

    setTimeout(() => {
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 500);
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Properties</h1>
        <p className="text-gray-600">
          Browse our complete collection of premium multifamily investment opportunities
        </p>
      </div>

      <SearchFilters
        onSearch={handleSearch}
        onTypeChange={handleTypeChange}
        onPriceRangeChange={handlePriceRangeChange}
        onLocationChange={handleLocationChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <PropertySkeleton key={index} />
          ))
        ) : (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSave={handleSaveProperty}
            />
          ))
        )}
      </div>

      {!isLoading && filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No properties found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}