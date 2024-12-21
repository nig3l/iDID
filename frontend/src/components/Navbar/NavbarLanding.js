import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const NavbarLanding = ({ onSignup }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="navbar">
      <Link to="/" className="nav-logo">iDID</Link>
      {isMobile && (
        <div className="menu-icon" onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      )}
      <nav className={`nav-links ${isMenuOpen ? 'active' : ''} ${isMobile ? 'mobile' : ''}`}>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
        <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
        <Link to="/auth" className="signup-btn" onClick={() => {
          setIsMenuOpen(false);
          onSignup?.();
        }}>Sign Up</Link>
      </nav>
    </header>
  );
};

export default NavbarLanding;

