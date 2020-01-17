import React from 'react';
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './Navbar.css';

const Navbar: React.FC = () => {
  const handleLogout = () => localStorage.setItem('token', '');
  const token: any = localStorage.getItem('token');
  const { name } = jwtDecode(token);

  return (
    <nav className="navbar-container">
      <div className="left-container">
        <NavLink to="/dashboard" className="logo">
          <h1>
            CURiOUS
            <span>!</span>
          </h1>
        </NavLink>
        <div id="welcome">
          <p>Welcome </p>
          <p>{name}</p>
        </div>
      </div>
      <ul className="right-container" id="js-menu">
        <li>
          <NavLink to="/dashboard">My Roadmaps</NavLink>
        </li>
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={handleLogout}>Sign Out</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
