import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/Pages/LandingPage';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import History from './components/Dashboard/History';
import PrivateRoute from './components/Private/PrivateRoute';
import About from './components/Pages/About';
import Pricing from './components/Pages/Pricing';
import Profile from './components/Profile/Profile';

function App() {
  const {session } = useAuth();


  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={!session ? <LandingPage /> : <Navigate to="/dashboard" />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/dashboard/history" element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
             <Profile />
            </PrivateRoute>
           } />

        </Routes>
      </Router>
    </AuthProvider>
  );

  
}

export default App;