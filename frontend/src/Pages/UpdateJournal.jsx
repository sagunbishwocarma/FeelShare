import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import toast
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import "../css/journal.css";
import { Link } from "react-router-dom";

function UpdateJournal() {
  const { journalId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch the journal data when the component mounts
  useEffect(() => {
    const fetchJournal = async () => {

      try {
        const { data } = await axios.get(`/getJournalById/${journalId}`);

        setTitle(data.journal.title); // Accessing title from journal
        setContent(data.journal.content); // Accessing content from journal

      } catch (error) {
        console.error("Failed to fetch journal:", error.response?.data || error.message);
        toast.error("Failed to fetch journal. Please try again."); 
      }
    };
    fetchJournal();
  }, [journalId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/updateJournal/${journalId}`, {
        title,
        content,
      });
      if (data.success) {
        toast.success("Journal updated successfully!");
        navigate("/journals");
      }
    } catch (error) {
      console.error("Failed to update journal:", error.response?.data || error.message);
      toast.error("Failed to update journal. Please try again."); 
    }
  };

  // Handle canceling edit
  const cancelEditing = () => {
    navigate("/journals");
  };

  return (
    <div>
      <NavBar />
      <li><Link to="/journals">Back</Link></li>
      <div className ="journal-entry">
        
        <form onSubmit={handleSubmit} className="journal-form">
        <h2>Update Journal</h2>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
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

export default UpdateJournal;