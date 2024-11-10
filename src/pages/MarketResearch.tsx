import React from 'react';
import { BarChart3, TrendingUp, Map, Building2 } from 'lucide-react';

export function MarketResearchPage() {
  const markets = [
    {
      city: 'New York City',
      metrics: {
        rentGrowth: '4.2%',
        occupancy: '96.8%',
        development: '15,000 units',
        absorption: '98%'
      },
      trend: 'up'
    },
    {
      city: 'Los Angeles',
      metrics: {
        rentGrowth: '3.8%',
        occupancy: '95.5%',
        development: '8,500 units',
        absorption: '96%'
      },
      trend: 'up'
    },
    {
      city: 'Miami',
      metrics: {
        rentGrowth: '5.1%',
        occupancy: '94.9%',
        development: '12,000 units',
        absorption: '97%'
      },
      trend: 'up'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Market Research</h1>
        <p className="text-gray-600 max-w-3xl">
          Comprehensive market analysis and insights for multifamily real estate investors. 
          Stay informed with the latest trends, demographics, and economic indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold">Market Reports</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Download detailed market analysis reports for major metropolitan areas.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold">Trend Analysis</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Track rent growth, occupancy rates, and other key performance indicators.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Map className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold">Submarket Data</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Explore detailed submarket statistics and demographic information.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold">Development Pipeline</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Monitor new construction and development activities in key markets.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
        <h2 className="text-xl font-bold mb-6">Featured Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {markets.map((market, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">{market.city}</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  market.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {market.trend === 'up' ? '↑ Growing' : '↓ Cooling'}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rent Growth</span>
                  <span className="font-medium">{market.metrics.rentGrowth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupancy</span>
                  <span className="font-medium">{market.metrics.occupancy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Development</span>
                  <span className="font-medium">{market.metrics.development}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Absorption</span>
                  <span className="font-medium">{market.metrics.absorption}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Latest Research Reports</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Q1 2024 Multifamily Market Report</h4>
                <p className="text-sm text-gray-600">Comprehensive analysis of market trends</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700">Download</button>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">2024 Investment Outlook</h4>
                <p className="text-sm text-gray-600">Future projections and opportunities</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700">Download</button>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Emerging Markets Analysis</h4>
                <p className="text-sm text-gray-600">Spotlight on high-growth regions</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700">Download</button>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Market Insights</h2>
          <ul className="space-y-4">
            <li>
              <p className="font-medium">Rising Interest Rates Impact</p>
              <p className="text-sm text-gray-600">Analysis of how changing rates affect multifamily investments</p>
            </li>
            <li>
              <p className="font-medium">Demographics Shift</p>
              <p className="text-sm text-gray-600">How population changes are affecting rental markets</p>
            </li>
            <li>
              <p className="font-medium">Construction Costs Trend</p>
              <p className="text-sm text-gray-600">Latest data on development expenses and implications</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}