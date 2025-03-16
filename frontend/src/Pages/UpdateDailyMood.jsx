import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import toast
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";

function UpdateMood() {
  const { moodId } = useParams();
  const navigate = useNavigate();
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  // Fetch the journal data when the component mounts
  useEffect(() => {
    const fetchMood = async () => {

      try {
        const { data } = await axios.get(`/getMoodById/${moodId}`);

        setMood(data.dailyMood.mood); // Accessing mood from the selected day
        setNotes(data.dailyMood.notes); // Accessing nnotes from the selected day

      } catch (error) {
        console.error("Failed to fetch selected mood:", error.response?.data || error.message);
        toast.error("Failed to fetch selected mood. Please try again."); 
      }
    };
    fetchMood();
  }, [moodId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/updateMood/${moodId}`, {
        mood,
        notes,
      });
      if (data.success) {
        toast.success("Mood updated successfully!");
        navigate("/moods");
      }
    } catch (error) {
      console.error("Failed to update selected mood:", error.response?.data || error.message);
      toast.error("Failed to update selected mood. Please try again."); 
    }
  };

  // Handle canceling edit
  const cancelEditing = () => {
    navigate("/moods");
  };

  return (
    <div>
      <NavBar />
      <li><Link to="/moods">Back</Link></li>
      <div className ="mood-tracker">
        
        <form onSubmit={handleSubmit} className="mood-form">
        <h2>Update Selected Mood</h2>
          <div>
            <label>Mood</label>
            <input
              type="range"
              min="1"
              max="5"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Notes:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit">Save</button>
            <button type="button" onClick={cancelEditing}>Cancel</button>
          </div>

        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateMood;