import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/Home';
import { MarketResearchPage } from './pages/MarketResearch';
import { InvestmentToolsPage } from './pages/InvestmentTools';
import { ContactPage } from './pages/Contact';
import { AcademyPage } from './pages/Academy';
import { InstructorsPage } from './pages/Instructors';
import { ProfilePage } from './pages/Profile';
import { SavedPropertiesPage } from './pages/SavedProperties';
import { MyCoursesPage } from './pages/MyCourses';
import { SettingsPage } from './pages/Settings';
import { PropertyDetailsPage } from './pages/PropertyDetails';
import { PropertiesPage } from './pages/Properties';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/market-research" element={<MarketResearchPage />} />
            <Route path="/investment-tools" element={<InvestmentToolsPage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/instructors" element={<InstructorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/saved-properties" element={<SavedPropertiesPage />} />
            <Route path="/my-courses" element={<MyCoursesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;