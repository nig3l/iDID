import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../Navbar/Navbar';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { session } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/profile', {
        headers: {
          'Authorization': `Bearer ${session.token}`
        }
      });
      const data = await response.json();
      setProfile(data);
      setFormData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-layout">
      <Navbar />
      <div className="profile-container">
        {profile && (
          <>
            {!isEditing ? (
              <div className="profile-view">
                <img src={profile.avatar_url || '/default-avatar.png'} alt="Profile" />
                <h2>{profile.username}</h2>
                <p>{profile.bio}</p>
                <p>Member since: {new Date(profile.joined_date).toLocaleDateString()}</p>
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="profile-form">
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="Username"
                />
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Bio"
                />
                <input
                  type="url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
                  placeholder="Avatar URL"
                />
                <div className="form-actions">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
