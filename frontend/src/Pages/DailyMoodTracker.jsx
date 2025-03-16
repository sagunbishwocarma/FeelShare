import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import '../css/moodtracker.css'
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MoodTracker () {
    const { user } = useContext(UserContext);
    const today = new Date().toISOString().slice(0, 10);
    const navigate = useNavigate();

    const [dailyMood, setMood] = useState({
        date: today,
        notes: "",
        mood: ""
    });

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { date, notes, mood } = dailyMood;
        
        if (!user.userId) {
            toast.error("User is not logged in.");
            return;
        }       

        try {
            

            if(!mood || !notes){
                toast.error('Please fill the required fields.')

            }else{ await axios.post("/addDailyMood", { 
                mood,
                notes,
                date,  
                userId: user.userId 
            });
            toast.success("You have added your today's mood");
            setMood({ mood: "", notes: "", date: today });
            navigate('/moods') 
            }
            
            
            
        } catch (error) {
            toast.error("Failed to add your today's mood");
            console.error(error);
        }
    };

    return (
        <div>
            <NavBar/>
            <li><Link to="/seekerDashboard">Home</Link></li>

            <div className="mood-tracker">
            <h2>Daily Mood Tracker</h2>

            <form onSubmit={handleSubmit} className="mood-form">

                <label>Track Daily Mood</label>
                <input
                    type="range"
                    min="1"
                    max="5"
                    value={dailyMood.mood}
                    onChange={(e) => setMood({ ...dailyMood, mood: e.target.value })}
                    required
                />

                
                <label>Date:</label>
                <input
                    type="date"
                    value={dailyMood.date}
                    onChange={(e) => setMood({ ...dailyMood, date: e.target.value })}
                    required
                />              
                
                
                <label>Notes:</label>
                <textarea
                    placeholder="Add Notes."
                    value={dailyMood.notes}
                    onChange={(e) => setMood({ ...dailyMood, notes: e.target.value })}
                />

                
                <button type="submit" className="save-btn">Save</button>
            </form>
        </div>
        <Footer/>
        </div>
        
    );
};

export default MoodTracker;
