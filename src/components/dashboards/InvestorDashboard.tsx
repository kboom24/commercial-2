import React from 'react';
import { Building2, Heart, BookOpen, Calculator } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function InvestorDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Investor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5 text-indigo-600" />
            <h3>Saved Properties</h3>
          </div>
          <p className="text-2xl font-bold">{user.savedProperties.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3>Enrolled Courses</h3>
          </div>
          <p className="text-2xl font-bold">{user.enrolledCourses.length}</p>
        </div>

        {/* Add more metrics */}
      </div>

      {/* Recent Activity, Saved Properties, Course Progress, etc. */}
    </div>
  );
}