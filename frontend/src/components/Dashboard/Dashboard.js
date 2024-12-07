import React, { useState, useEffect } from 'react';
import { achievementService } from '../services/api';
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

  const fetchAchievements = async () => {
    try {
      const { data } = await achievementService.getAll();
      const filteredData = data.filter(achievement => {
        const achievementDate = new Date(achievement.created_at);
        const timeframes = {
          week: 7,
          month: 30,
          year: 365
        };
        return achievementDate > new Date(Date.now() - timeframes[timeframe] * 24 * 60 * 60 * 1000);
      });
      setAchievements(filteredData);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [timeframe]);

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    try {
      // Explicit logging of the data being sent
      console.log('Sending achievement data:', {
        title: newAchievement.title,  // Ensure this is a non-empty string
        description: newAchievement.description
      });
  
      // Validate input before sending
      if (!newAchievement.title || newAchievement.title.trim() === '') {
        alert('Please enter a title for your achievement');
        return;
      }
  
      const response = await achievementService.create({
        title: newAchievement.title.trim(),  // Trim to remove any whitespace
        description: newAchievement.description || ''  // Provide a default empty string
      });
      
      console.log('Full create achievement response:', response);
      
      // Reset form and refresh achievements
      setNewAchievement({ title: '', description: '' });
      setShowForm(false);
      fetchAchievements();
    } catch (error) {
      // Comprehensive error logging
      console.error('Error in handleAddAchievement:', error);
      
      // More detailed error information
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        
        // Show user-friendly error message
        alert(`Failed to add achievement: ${error.response.data.msg || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        alert('No response received from server');
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
        alert('Error setting up the request');
      }
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

        <div className="chart-section">
           <h2>Achievement Trends</h2>
            <Line data={getChartData()} options={{
                 responsive: true,
                    plugins: {
                      legend: {
                          position: 'top',
           },
          title: {
            display: true,
              text: 'Daily Achievement Count'
            }
           }
      }} />
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
