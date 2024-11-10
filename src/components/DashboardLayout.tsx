import React from 'react';
import { useAuth } from '../context/AuthContext';
import { InvestorDashboard } from './dashboards/InvestorDashboard';
import { BrokerDashboard } from './dashboards/BrokerDashboard';
import { PropertyManagerDashboard } from './dashboards/PropertyManagerDashboard';
import { InstructorDashboard } from './dashboards/InstructorDashboard';
import { AdminDashboard } from './dashboards/AdminDashboard';

export function DashboardLayout() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'investor':
      return <InvestorDashboard />;
    case 'broker':
      return <BrokerDashboard />;
    case 'property_manager':
      return <PropertyManagerDashboard />;
    case 'instructor':
      return <InstructorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return null;
  }
}