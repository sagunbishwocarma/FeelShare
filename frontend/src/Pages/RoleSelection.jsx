import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/roleselection.css";
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <div className="role-container">
      <h1 className="role-title">Get Started by Choosing Your Role</h1>

      <div className="role-options">
         
        <div className="role-card">
          <p>Here to explore resources and support for my wellness journey</p>
          <button className="role-button" onClick={() => navigate("/signup")}>
            Select
          </button>
        </div>

         
        <div className="role-card">
          <p>Licensed professional offering support and guidance</p>
          <button className="role-button" onClick={() => navigate("/professionalregister")}>
            Select
          </button>
        </div>
      </div>

      <p className="role-login">
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
      <Footer />
    </div>
    
  );
};

export default RoleSelection;
