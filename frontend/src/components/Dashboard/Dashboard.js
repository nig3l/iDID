import React from 'react';
import { supabase } from '../config/supabaseClient';
import './Dashboard.css';

const Dashboard = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error signing out:', error.message);
  };

  return (
    <div className="dashboard-container">
      <h1>Your Achievements Dashboard</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      {/* Add achievement recording functionality here */}
    </div>
  );
};

export default Dashboard;
