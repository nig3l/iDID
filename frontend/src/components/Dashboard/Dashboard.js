import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import './Dashboard.css';

const Dashboard = () => {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching achievements:', error);
    } else {
      setAchievements(data);
    }
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('achievements')
      .insert([{
        title: newAchievement.title,
        description: newAchievement.description,
        user_id: user.id
      }]);

    if (error) {
      console.error('Error adding achievement:', error);
    } else {
      setNewAchievement({ title: '', description: '' });
      fetchAchievements();
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error signing out:', error.message);
  };

  return (
    <div className="dashboard-container">
      <h1>Your Achievements Dashboard</h1>
      
      <form onSubmit={handleAddAchievement}>
        <input
          type="text"
          placeholder="Achievement Title"
          value={newAchievement.title}
          onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
        />
        <textarea
          placeholder="Description"
          value={newAchievement.description}
          onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
        />
        <button type="submit">Record Achievement</button>
      </form>

      <div className="achievements-list">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="achievement-card">
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
            <span>{new Date(achievement.created_at).toLocaleDateString()}</span>
          </div>
        ))}
      </div>

      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
