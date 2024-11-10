import React from 'react';
import { Building2, Users, TrendingUp, MessageSquare } from 'lucide-react';

export function BrokerDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Broker Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <h3>Listed Properties</h3>
          </div>
          <p className="text-2xl font-bold">12</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3>Active Leads</h3>
          </div>
          <p className="text-2xl font-bold">24</p>
        </div>

        {/* Add more metrics */}
      </div>

      {/* Property Listings, Lead Management, Tour Requests, etc. */}
    </div>
  );
}