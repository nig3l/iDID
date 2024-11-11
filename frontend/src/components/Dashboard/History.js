import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';

const History = () => {
  const [achievements, setAchievements] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAchievements();
  }, [filter]);

  const fetchAchievements = async () => {
    let query = supabase.from('achievements').select('*');
    
    if (filter !== 'all') {
      const timeRanges = {
        week: 7,
        month: 30,
        year: 365
      };
      query = query.gte('created_at', 
        new Date(Date.now() - timeRanges[filter] * 24 * 60 * 60 * 1000).toISOString()
      );
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    if (!error) setAchievements(data);
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="history-container">
        <div className="history-header">
          <h2>Achievement History</h2>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Time
            </button>
            <button 
              className={`filter-btn ${filter === 'year' ? 'active' : ''}`}
              onClick={() => setFilter('year')}
            >
              This Year
            </button>
            <button 
              className={`filter-btn ${filter === 'month' ? 'active' : ''}`}
              onClick={() => setFilter('month')}
            >
              This Month
            </button>
            <button 
              className={`filter-btn ${filter === 'week' ? 'active' : ''}`}
              onClick={() => setFilter('week')}
            >
              This Week
            </button>
          </div>
        </div>
        <div className="achievements-timeline">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="timeline-item">
              <div className="timeline-date">
                {new Date(achievement.created_at).toLocaleDateString()}
              </div>
              <div className="timeline-content">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;