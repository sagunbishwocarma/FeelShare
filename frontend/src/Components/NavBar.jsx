import React from 'react';
import logo from '../assets/logo.png';

const NavBar = () => {
  return (
    <div>
      <style>
        {`
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            background-color: white;
          }

          
          .menu-button {
            font-size: 24px;
            color: #1e3a8a;
            background: none;
            border: none;
            cursor: pointer;
          }
        `}
      </style>

      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Feel Share Logo" />
        </div>
      
      <div class="menu-container">
        <button class="menu-button" onClick="toggleMenu()">☰</button>
        
      </div>

      </nav>
    </div>
  );
};

export default NavBar;
