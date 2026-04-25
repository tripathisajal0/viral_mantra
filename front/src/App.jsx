import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CreatorDashboard from './pages/CreatorDashboard';
import BrandDashboard from './pages/BrandDashboard';
import CampaignLaunch from './pages/CampaignLaunch';
import AdminDashboard from './pages/AdminDashboard';
import CampaignDetail from './pages/CampaignDetail';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, profile, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  // If user is logged in but profile is missing, they need to register/sign up
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
            <CreatorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/campaign/:id" element={
          <ProtectedRoute requiredRole="creator">
            <CampaignDetail />
          </ProtectedRoute>
        } />

        {/* Brand/Admin Routes */}
        <Route path="/brand" element={
          <ProtectedRoute requiredRole="brand">
            <BrandDashboard />
          </ProtectedRoute>
        } />
        <Route path="/brand/launch" element={
          <ProtectedRoute requiredRole="brand">
            <CampaignLaunch />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="brand">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
