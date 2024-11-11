import React, { useEffect, useState } from 'react'
import { supabase } from '../config/supabaseClient'
import { useLocation } from 'react-router-dom'
import './Auth.css'

export default function Auth() {
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(location.state?.isSignUp || false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (location.state?.isSignUp) {
      setIsSignUp(true);
    }
  }, [location]);

  const createProfile = async (userId) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([{ id: userId }]);
      if (error) throw error;
    } catch (error) {
      console.error('Error creating profile:', error.message);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        if (data?.user) {
          await createProfile(data.user.id)
          setMessage({ 
            type: 'success', 
            text: 'Registration successful! Please check your email to confirm your account.'
          })
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        setMessage({ 
          type: 'success', 
          text: 'Login successful! Redirecting to dashboard...'
        })
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message 
      })
    } finally {
      setLoading(false)
    }
  }

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