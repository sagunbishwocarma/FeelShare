import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { ProfessionalContext } from "../../context/professionalContext";

function ViewResources() {
    const [resourceList, setResourceList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResources = async () => {
            
            
            try {
                const { data } = await axios.get('/getArticle');

                
                setResourceList(data.articleEntry);

            } catch (error) {
                console.error("Failed to fetch resources:", error.response?.data || error.message);
                setResourceList([]);
            }
        };

        fetchResources();
    }, []);

    return (
        <div>
            <NavBar />
            <div>
            <div class = 'search-resources'>
                <label for="search-resources">Search Resources:</label>
                <input type="text"/>
                <button type="button" class="search" >Search</button>
                <button type="button" class="clear-search">Clear</button>

            </div>
            <div>
            {resourceList.length > 0 ? (
                        resourceList.map(article => (
                            <div key={article._id} className="article-box">
                                <h2>{article.title}</h2>
                                <p>{new Date(article.date).toLocaleDateString()}</p>
                                <p>Created by: {article.email}</p>
                                <Link to={`/article/${article._id}`} className="view-button">View</Link>
                            </div>
                        ))
                    ) : (
                        <p className="no-articles">No articles found</p>
                    )}
            </div>

            </div>
            <Footer />
        </div>
    )

}

export default ViewResources;