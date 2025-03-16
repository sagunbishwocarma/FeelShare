import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import "../css/mood.css";

const Moods = () => {
    const { user } = useContext(UserContext);
    const [moodList, setMoodList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMoodsByUserID = async () => {
            const userId = user.userId;
            try {
                const { data } = await axios.get('/getDailyMood', {
                    params: { userId }
                });

                console.log("User ID:", userId);
                console.log("Response:", data);
                setMoodList(data.moodEntries);
            } catch (error) {
                console.error("Failed to fetch daily Moods:", error.response?.data || error.message);
                setMoodList([]);
            }
        };

        if (user) {
            fetchMoodsByUserID();
        }
    }, [user]);

    

    const handleDeleteMood = async (id) => {
        try {
            console.log("Daily Mood:", id);
            await axios.delete(`/deleteDailyMood/${id}`); 
            setMoodList((prevList) => prevList.filter((mood) => mood._id !== id));
            toast.success('Selected Mood is deleted successfully')
        } catch (error) {
            console.error("Error deleting daily mood:", error);
        }
    };

    return (
        <div>
            <NavBar />
            <li><Link to="/seekerDashboard">Home</Link></li>
            <div className="mood-container">
                <p>Track Your Daily Mood</p>
                <Link to="/moodTracker">
                    <button className="create-button">Track</button>
                </Link>
            </div>

            {user && moodList.length === 0 && <p>No mood entries found.</p>}

            {moodList.length > 0 && (
                <table className="mood-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Mood</th>+
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moodList.map((mood) => (
                            <tr key={mood._id}>                                
                                <td>{new Date(mood.date).toISOString().split("T")[0]}</td>
                                <td>{mood.mood}</td>
                                <td>{mood.notes}</td>

                                <td className="action-buttons">
                                    <button className="edit-button" onClick={() => navigate(`/updateMood/${mood._id}`)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDeleteMood(mood._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Footer />
        </div>
    );
}

export default Moods;
