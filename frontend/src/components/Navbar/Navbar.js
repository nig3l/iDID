import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="dashboard-nav">
      <div className="nav-logo">iDID</div>
      <div className="nav-links">
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
          Overview
        </Link>
        <Link to="/dashboard/history" className={location.pathname === '/dashboard/history' ? 'active' : ''}>
          History
        </Link>
        {/* <Link to="/dashboard/stats" className={location.pathname === '/dashboard/stats' ? 'active' : ''}>
          Statistics
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
