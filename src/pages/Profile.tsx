import React, { useState } from 'react';
import { User, Mail, Phone, Building2, BookOpen, Settings, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';

export function ProfilePage() {
  const { user, removeSavedProperty } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'saved' | 'settings'>('overview');

  if (!user) return null;

  const savedProperties = PROPERTIES.filter(property => 
    user.savedProperties.includes(property.id)
  );

  const handleRemoveProperty = (propertyId: string) => {
    removeSavedProperty(propertyId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-600 capitalize">{user.role.replace('_', ' ')}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.company && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Building2 className="w-5 h-5" />
                  <span>{user.company}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                  activeTab === 'overview' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  <span>Overview</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                  activeTab === 'saved' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5" />
                  <span>Saved Properties</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'overview' ? (
            <DashboardLayout />
          ) : activeTab === 'saved' ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Saved Properties</h2>
              {savedProperties.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">You haven't saved any properties yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSave={handleRemoveProperty}
                      showSaveButton={true}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Account Settings</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue={user.phone}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {user.company && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      defaultValue={user.company}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}