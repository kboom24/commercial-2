export interface Property {
  id: string;
  title: string;
  type: 'garden-style' | 'mid-rise' | 'high-rise' | 'townhome';
  price: number;
  size: number;
  units: number;
  location: string;
  imageUrl: string;
  description: string;
  features: string[];
  cap_rate?: number;
  noi?: number;
  price_per_unit?: number;
  estimatedValue: number;
  specialFeatures: string[];
  listingDate: string;
  views: number;
  potentialBuyers: number;
  priceHistory: {
    date: string;
    price: number;
    change: number;
  }[];
  taxHistory: {
    year: number;
    amount: number;
    change: number;
  }[];
}