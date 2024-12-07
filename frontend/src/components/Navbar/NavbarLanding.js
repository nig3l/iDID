import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const NavbarLanding = ({ onSignup }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <Link to="/" className="nav-logo">iDID</Link>
      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/about">About</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/auth" className="active">Sign Up</Link>
      </nav>
    </header>
  );
};

export default NavbarLanding;

