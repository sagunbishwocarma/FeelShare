import React from 'react';
import { useContext } from 'react';
import { ProfessionalContext } from '../../context/professionalContext';
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import "../css/dashboard.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ProfessionalDashboard() {
    const {professional, logoutProfessional} = useContext(ProfessionalContext) 
    const navigate = useNavigate();

    const handleLogout = async () => {
      await logoutProfessional(); 
      navigate('/login'); 
  };
    return (
      <div>
      <NavBar />
      <button onClick={handleLogout} className="logout-button">Logout</button>

      <div className="dashboard-container">
        {!!professional && (<h1 className="dashboard-title"> Hello {professional.username}!</h1>)}
        
       
        <div className="dashboard-cards">
          
          <div className="dashboard-card">
            <h3 className="card-title">Session Management</h3>
            <p className="card-subtitle">Manage the sessions</p>
            <Link to="/sessionmanagement">
            <button className="card-button" >Manage</button>
            </Link>
          </div>

          
          <div className="dashboard-card">
            <h3 className="card-title">Analytics</h3>
            <p className="card-subtitle">Check your analytics</p>
            <button className="card-button">Check</button>
          </div> 

          
          <div className="dashboard-card">
            <h3 className="card-title">Resources & Recommendations</h3>
            <p className="card-subtitle">Provide Resources and Recommendations</p>
            <Link to="/uploadResource">
            <button className="card-button" >Upload</button>
            </Link>
          </div>

          
          <div className="dashboard-card">
            <h3 className="card-title">Feedbacks & Ratings</h3>
            <p className="card-subtitle">View your ratings</p>
            <button className="card-button">View</button>
          </div>
          

          </div>
      </div>

      <Footer />
    </div>

      
   
    );
  }
  
  export default ProfessionalDashboard;