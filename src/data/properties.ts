import { Property } from '../types';

const propertyImages = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1000'
];

const cities = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'San Francisco, CA',
  'Charlotte, NC', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Boston, MA'
];

const propertyTypes = ['garden-style', 'mid-rise', 'high-rise', 'townhome'] as const;
const features = [
  'Pool', 'Fitness Center', 'Covered Parking', 'Pet Friendly', 'Business Center',
  'Clubhouse', 'Package Lockers', 'Dog Park', 'Playground', 'BBQ Area',
  'Rooftop Deck', 'Bike Storage', 'Storage Units', 'Elevator', 'Gated Access'
];

export const PROPERTIES: Property[] = Array.from({ length: 100 }, (_, i) => {
  const id = (i + 1).toString();
  const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  const units = Math.floor(Math.random() * (300 - 50) + 50);
  const pricePerUnit = Math.floor(Math.random() * (250000 - 150000) + 150000);
  const price = units * pricePerUnit;
  const size = units * Math.floor(Math.random() * (1200 - 800) + 800);
  const cap_rate = (Math.random() * (7.5 - 4.5) + 4.5).toFixed(1);
  const noi = price * (parseFloat(cap_rate) / 100);
  const location = cities[Math.floor(Math.random() * cities.length)];
  
  const propertyFeatures = [...features]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 5) + 4);

  const specialFeatures = [
    `${units} Total Units`,
    `${Math.floor(size / units)} SF Average Unit Size`,
    `Built in ${Math.floor(Math.random() * (2020 - 1990) + 1990)}`,
    `${Math.floor(Math.random() * 3) + 1} Miles from Downtown`
  ];

  const currentDate = new Date();
  const priceHistory = Array.from({ length: 3 }, (_, i) => {
    const date = new Date();
    date.setFullYear(currentDate.getFullYear() - i);
    const historicalPrice = price * (1 - (i * 0.05));
    const change = i === 0 ? 0 : ((historicalPrice / (price * (1 - ((i-1) * 0.05)))) - 1) * 100;
    return {
      date: date.getFullYear().toString(),
      price: Math.floor(historicalPrice),
      change: parseFloat(change.toFixed(1))
    };
  });

  const taxHistory = Array.from({ length: 3 }, (_, i) => {
    const year = currentDate.getFullYear() - i;
    const amount = price * 0.015 * (1 - (i * 0.02));
    const change = i === 0 ? 3.5 : 3.2;
    return {
      year,
      amount: Math.floor(amount),
      change
    };
  });

  return {
    id,
    title: `${type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Apartments`,
    type,
    price,
    size,
    units,
    location,
    imageUrl: propertyImages[i % propertyImages.length],
    description: `Luxurious ${type} property featuring modern amenities and premium finishes. Ideal location with easy access to transportation, shopping, and entertainment.`,
    features: propertyFeatures,
    cap_rate: parseFloat(cap_rate),
    noi,
    price_per_unit: pricePerUnit,
    estimatedValue: Math.floor(price * 1.1),
    specialFeatures,
    listingDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    views: Math.floor(Math.random() * 2000) + 500,
    potentialBuyers: Math.floor(Math.random() * 100) + 20,
    priceHistory,
    taxHistory
  };
});

export const properties = PROPERTIES;

export const getPropertyById = (id: string): Property | undefined => {
  return PROPERTIES.find(property => property.id === id);
};