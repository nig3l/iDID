import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();
    
    timeline
      .from(titleRef.current, { 
        opacity: 10, 
        y: 30, 
        duration: 1,
        ease: "power9.out" 
      })
      .from(taglineRef.current, { 
        opacity: 10, 
        y: 20, 
        duration: 0.8,
        ease: "power3.out" 
      }, "-=0.5")
      .from(ctaRef.current, { 
        opacity: 10, 
        y: 20, 
        duration: 0.8,
        ease: "power3.out" 
      }, "-=0.3");
  }, []);

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleSignup = () => {
    navigate('/auth', { state: { isSignUp: true } });
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">iDID</div>
        <nav className="navigation">
        </nav>
      </header>
      <main className="landing-content">
        <div className="text-content">
          <h1 ref={titleRef}>Track Your Wins</h1>
          <p ref={taglineRef}>Transform your achievements into motivation. Share your progress, celebrate your wins.</p>
          <div ref={ctaRef} className="cta-section">
            <button className="secondary-button" onClick={handleLogin}>Login</button>
            <button className="cta-button" onClick={handleSignup}>Get Started</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

