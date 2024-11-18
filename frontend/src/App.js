import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './components/config/supabaseClient';
import LandingPage from './components/Pages/LandingPage';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import History from './components/Dashboard/History';
import PrivateRoute from './components/Private/PrivateRoute';
import About from './components/Pages/About';
import Pricing from './components/Pages/Pricing';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!session ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard session={session} />
          </PrivateRoute>
        } />
        <Route path="/dashboard/history" element={
          <PrivateRoute>
            <History session={session} />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;