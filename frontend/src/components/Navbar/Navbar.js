import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <header className="navbar">
      <Link to="/dashboard" className="nav-logo">iDID</Link>
      <nav className="nav-links">
        <Link 
          to="/dashboard" 
          className={location.pathname === '/dashboard' ? 'active' : ''}
        >
          Overview
        </Link>
        <Link 
          to="/dashboard/history" 
          className={location.pathname === '/dashboard/history' ? 'active' : ''}
        >
          History
        </Link>
        <Link 
          to="/profile" 
          className={location.pathname === '/profile' ? 'active' : ''}
         >
          Profile
        </Link>

      </nav>
    </header>
  );
};

export default Navbar;

