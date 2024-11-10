import React from 'react';
import { Building2, Users, ClipboardCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function PropertyManagerDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <h3>Managed Properties</h3>
          </div>
          <p className="text-2xl font-bold">{user.listedProperties?.length || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3>Total Units</h3>
          </div>
          <p className="text-2xl font-bold">247</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck className="w-5 h-5 text-indigo-600" />
            <h3>Maintenance Requests</h3>
          </div>
          <p className="text-2xl font-bold">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-indigo-600" />
            <h3>Urgent Issues</h3>
          </div>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Maintenance Requests</h3>
          <div className="space-y-4">
            {/* Add maintenance requests list */}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Property Occupancy</h3>
          <div className="space-y-4">
            {/* Add occupancy charts/stats */}
          </div>
        </div>
      </div>
    </div>
  );
}