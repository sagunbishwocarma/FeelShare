import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import "../css/journal.css";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";


function JournalForm() {
    const {user} = useContext(UserContext);
    const today = new Date().toISOString().split('T')[0]; 
    const navigate = useNavigate();

    const [journalContent, setJournalContent] = useState({
        title: '',
        content: '',
        date: today, 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, content, date } = journalContent;

        try {
            const {journalContent} = await axios.post("/createJournal", { 
                title, content, date, userId: user.userId });
            toast.success("Journal entry created!");
            setJournalContent({ title: "", content: "", date: today }); 
            navigate('/journals')
            
        } catch (error) {
            toast.error("Failed to create journal entry");
            console.error(error);
        }
    };

    const cancelCreating = () => {
        navigate("/journals");
      };

    return (
        <div>
            <NavBar />
            <li><Link to="/journals">Back</Link></li>
            
            <div className="journal-entry">
                <form onSubmit={handleSubmit} className="journal-form">
                    <h2>Create Daily Journals</h2>
                    
                    <input
                        type="text"
                        placeholder="Title"
                        value={journalContent.title}
                        onChange={(e) =>
                            setJournalContent({ ...journalContent, title: e.target.value })
                        }
                        required
                    />

                    <input
                        type="date"
                        value={journalContent.date}
                        onChange={(e) =>
                            setJournalContent({ ...journalContent, date: e.target.value })
                        }
                        required
                    />

                    <textarea
                        placeholder="Write your journal"
                        value={journalContent.content}
                        onChange={(e) =>
                            setJournalContent({ ...journalContent, content: e.target.value })
                        }
                        required
                    />
                    
                    <button type="submit">Save</button>
                    <button type = "button" onClick={cancelCreating}>Cancel</button>
                </form>
            </div>
            
            <Footer />
        </div>
    );
}

export default JournalForm;
