import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../css/mainJournalPage.css";
import UserNavBar from "../Components/UserNavbar";
import NavBar from "../Components/NavBar";

const Journals = () => {
    const { user } = useContext(UserContext);
    const [journalList, setJournalList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJournalsByUserID = async () => {
            const userId = user.userId;
            try {
                const { data } = await axios.get('/getJournal', {
                    params: { userId }
                });

                console.log("User ID:", userId);
                console.log("Response:", data);
                setJournalList(data.journalEntries);
            } catch (error) {
                console.error("Failed to fetch journals:", error.response?.data || error.message);
                setJournalList([]);
            }
        };

        if (user) {
            fetchJournalsByUserID();
        }
    }, [user]);

    

    const handleDeleteJournal = async (id) => {
        try {
            console.log("JournalId:", id);
            await axios.delete(`/deleteJournal/${id}`); 
            setJournalList((prevList) => prevList.filter((journal) => journal._id !== id));
        } catch (error) {
            console.error("Error deleting journal:", error);
        }
    };

    return (
        <div>
            <NavBar />
            <li><Link to="/seekerDashboard">Home</Link></li>
            <div className="journal-container">
                <p>Create a new Journal</p>
                <Link to="/createJournal">
                    <button className="create-button">Create</button>
                </Link>
            </div>

            {user && journalList.length === 0 && <p>No journals found.</p>}

            {journalList.length > 0 && (
                <table className="journal-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Created On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {journalList.map((journal) => (
                            <tr key={journal._id}>
                                <td>{journal.title}</td>
                                <td>{journal.content}</td>
                                <td>{new Date(journal.date).toISOString().split("T")[0]}</td>
                                <td className="action-buttons">
                                    <button className="edit-button" onClick={() => navigate(`/updateJournal/${journal._id}`)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDeleteJournal(journal._id)}>Delete</button>
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

export default Journals;
