import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import "../css/dashboard.css";
import { useNavigate } from 'react-router-dom';

function SeekerDashboard() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser(); 
    navigate('/login'); 
};


  return (
    <div>
      <NavBar />
      <button onClick={handleLogout} className="logout-button">Logout</button>

      <div className="dashboard-container">
        {!!user && (<h1 className="dashboard-title"> Hi {user.username}!</h1>)}
        <p className="dashboard-subtitle">You're taking positive steps today.</p>
        
       
        <div className="dashboard-cards">
          
          <div className="dashboard-card">
            <h3 className="card-title">Mood Tracking</h3>
            <p className="card-subtitle">Track your daily moods</p>

            <Link to="/moods">
              <button className="card-button" >Open</button>
            </Link>

          </div>

          
          <div className="dashboard-card">
            <h3 className="card-title">Journal</h3>
            <p className="card-subtitle">Write your thoughts</p>
            <Link to="/journals">
              <button className="card-button" >Open</button>
            </Link>
          </div>

          
          <div className="dashboard-card">
            <h3 className="card-title">Goals</h3>
            <p className="card-subtitle">Set personal goals</p>
            <Link to="/viewGoals">
              <button className="card-button" >Open</button>
            </Link>
          </div>

          
          <div className="dashboard-card">
            <h3 className="card-title">Resources</h3>
            <p className="card-subtitle">Helpful resources</p>

            <Link to="/viewResources">
              <button className="card-button" >View</button>
            </Link>
            
          </div>

          
          <div className="dashboard-card">
            <h3 className="card-title">Sessions</h3>
            <p className="card-subtitle">Book a session</p>
            <button className="card-button">Open</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SeekerDashboard;