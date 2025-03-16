import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/NavBar.css"; 
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const UserNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {logoutUser} = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);

  };

  const handleLogout = async () => {
    await logoutUser(); 
    navigate('/login'); 
};

  return (
    <nav className="navbar">
      
      <div className="logo">
        <img src={logo} alt="Feel Share Logo" />
      </div>

      
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/journals">Journals</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      
      <div className="menu-container">
        <button className="menu-button" onClick={toggleMenu}>☰</button>
      </div>

      
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/journals">Journals</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavBar;
