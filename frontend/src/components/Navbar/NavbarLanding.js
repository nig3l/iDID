import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavbarLanding = ({ onSignup }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="landing-header">
      <div className="logo">iDID</div>
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
        <a href="/about">About</a>
        <a href="/pricing">Pricing</a>
        {/* <a className="cta-button" onClick={onSignup}>Sign Up</a> */}
      </nav>
    </header>
  );
};

export default NavbarLanding;
