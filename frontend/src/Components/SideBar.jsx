import React from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css"; // Import External CSS

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">My Journal</h2>

            <nav className="sidebar-nav">
                <Link to="/" className="sidebar-link"> Dashboard </Link>

                <Link to="/journals" className="sidebar-link"> My Journals </Link>

                <Link to="/profile" className="sidebar-link"> Profile </Link>

                <button className="sidebar-link logout-btn"> Logout </button>
            </nav>
        </div>
    );
};

export default Sidebar;
