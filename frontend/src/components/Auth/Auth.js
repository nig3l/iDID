import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      if (isSignUp) {
        await authService.signup(email, password);
        setMessage({
          type: 'success',
          text: 'Registration successful! Please login.'
        });
        setIsSignUp(false);
      } else {
        const { data } = await authService.login(email, password);
        localStorage.setItem('token', data.access_token);
        setSession({ token: data.access_token });
        navigate('/dashboard');
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'An error occurred'
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading}>
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Login')}
          </button>
        </form>
        <p>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  )
}