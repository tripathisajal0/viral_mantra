import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CreatorDashboard from './pages/CreatorDashboard';

import AdminDashboard from './pages/AdminDashboard';
import CampaignDetail from './pages/CampaignDetail';
import UserWallet from './pages/UserWallet';
import UserProfile from './pages/UserProfile';

// Teammate Brand Pages
import BrandDashboard from './pages/brand/BrandDashboard';
import CampaignLaunch from './pages/brand/CampaignLaunch';
import BrandCampaignDetail from './pages/brand/BrandCampaignDetail';
import WalletBrand from './pages/brand/Wallet';
import DashboardLayout from './components/DashboardLayout';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, profile, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF0FB]">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  if (!profile && !loading) {
    return <Navigate to="/login" />;
  }

  if (profile && requiredRole && profile.role !== requiredRole) {
    return <Navigate to={profile.role === 'brand' ? '/brand' : '/creator'} />;
  }

  return children;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Creator Routes */}
        <Route path="/creator" element={
          <ProtectedRoute requiredRole="creator">
            <DashboardLayout>
              <CreatorDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/campaign/:id" element={
          <ProtectedRoute requiredRole="creator">
            <DashboardLayout>
              <CampaignDetail />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Shared Protected Routes */}
        <Route path="/wallet" element={
          <ProtectedRoute>
            <DashboardLayout>
              <UserWallet />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <DashboardLayout>
              <UserProfile />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Brand Routes */}
        <Route path="/brand" element={
          <ProtectedRoute requiredRole="brand">
            <DashboardLayout>
              <BrandDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/brand/launch" element={
          <ProtectedRoute requiredRole="brand">
            <DashboardLayout>
              <CampaignLaunch />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/brand/campaign/:id" element={
          <ProtectedRoute requiredRole="brand">
            <DashboardLayout>
              <BrandCampaignDetail />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/brand/wallet" element={
          <ProtectedRoute requiredRole="brand">
            <DashboardLayout>
              <WalletBrand />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute requiredRole="brand">
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
