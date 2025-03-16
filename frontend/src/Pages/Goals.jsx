import React, {useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import GoalForm from "../Components/AddGoals";
import TaskItem from "../Components/TaskItem";

function ViewGoals(){
    
    return(
        <div>
            <NavBar/>
            <li><Link to="/seekerDashboard">Home</Link></li>

            <div>
                <GoalForm />
            </div>
            <div>
            </div>
            
            <Footer/>

        </div>

    );
}

export default ViewGoals;