import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/NavbarLanding';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleSignup = () => {
    navigate('/auth', { state: { isSignUp: true } });
  };

  return (
    <div className="landing-container">
      <Navbar onSignup={handleSignup} />
      <main className="landing-content">
        <div className="text-content">
          <h1 ref={titleRef}>Celebrate Every Achievement</h1>
          <div ref={taglineRef} className="tagline-section">
            <p className="main-tagline">Track and celebrate learning milestones that matter.</p>
            <div className="audience-benefits">
              <p>📚 For Students: Document your academic wins and study progress</p>
              <p>👩‍🏫 For Teachers: Record classroom achievements and student growth</p>
              <p>👨‍👩‍👧‍👦 For Parents: Track your children's homework completion and learning journey</p>
            </div>
          </div>
          <div ref={ctaRef} className="cta-section">
            <button className="secondary-button" onClick={handleLogin}>Login</button>
            <button className="cta-button" onClick={handleSignup}>Start Recording Wins</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;


