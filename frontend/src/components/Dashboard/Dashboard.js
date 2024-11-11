import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import Navbar from '../Navbar/Navbar';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '' });
  const [timeframe, setTimeframe] = useState('week');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, [timeframe]);

  const fetchAchievements = async () => {
    const timeframes = {
      week: '7 days',
      month: '30 days',
      year: '365 days'
    };

    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .gte('created_at', new Date(Date.now() - parseInt(timeframes[timeframe].split(' ')[0]) * 24 * 60 * 60 * 1000).toISOString())
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
    
    const { error } = await supabase
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
      setShowForm(false);
      fetchAchievements();
    }
  };

  const getChartData = () => {
    const dates = achievements.reduce((acc, achievement) => {
      const date = new Date(achievement.created_at).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(dates),
      datasets: [{
        label: 'Achievements',
        data: Object.values(dates),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <div className="header-actions">
          <h1>Your Dashboard</h1>
          <button className="add-achievement-btn" onClick={() => setShowForm(true)}>
            Record New Achievement
          </button>
        </div>

        {showForm && (
          <div className="achievement-form-container">
            <form onSubmit={handleAddAchievement} className="achievement-form">
              <h3>Record New Achievement</h3>
              <input
                type="text"
                placeholder="Achievement Title"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                required
              />
              <textarea
                placeholder="Description"
                value={newAchievement.description}
                onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                required
              />
              <div className="form-actions">
                <button type="submit">Save Achievement</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="stats-section">
          <div className="stat-card">
            <h3>Total Achievements</h3>
            <p className="stat-number">{achievements.length}</p>
          </div>
          <div className="stat-card">
            <h3>This Week</h3>
            <p className="stat-number">
              {achievements.filter(a => 
                new Date(a.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length}
            </p>
          </div>
          <div className="stat-card">
            <h3>This Month</h3>
            <p className="stat-number">
              {achievements.filter(a => 
                new Date(a.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              ).length}
            </p>
          </div>
        </div>


        <div className="recent-achievements">
          <h2>Recent Achievements</h2>
          <div className="achievements-grid">
            {achievements.slice(0, 6).map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <span>{new Date(achievement.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;