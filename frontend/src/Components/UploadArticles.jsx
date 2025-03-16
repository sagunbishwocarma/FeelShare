import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { ProfessionalContext } from "../../context/professionalContext";


function UploadArticle() {
    const {professional} = useContext(ProfessionalContext);
    const today = new Date().toISOString().slice(0, 10); 

    const [articleContent, setArticleContent] = useState({
        title: '',
        content: '',
        date: today, 
        source: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, content, date, source } = articleContent;

        try {
            await axios.post("/createArticle", { 
                title, content, date, source, professionalId: professional.professionalId, emailAddress: professional.email });

            toast.success("Article created!");
            setArticleContent({ title: "", content: "", date: today, source: "" }); 
            
        } catch (error) {
            toast.error("Failed to create an article");
            console.error(error);
        }
    };

    return (

        <div className="create-article">
                <form onSubmit={handleSubmit} className="article-form">
                    <h2>Upload an Article</h2>
                    
                    <input
                        type="text"
                        placeholder="Title"
                        value={articleContent.title}
                        onChange={(e) =>
                            setArticleContent({ ...articleContent, title: e.target.value })
                        }
                        required
                    />

                    <input
                        type="date"
                        value={articleContent.date}
                        onChange={(e) =>
                            setArticleContent({ ...articleContent, date: e.target.value })
                        }
                        required
                    />

                    <textarea
                        placeholder="Write your article"
                        value={articleContent.content}
                        onChange={(e) =>
                            setArticleContent({ ...articleContent, content: e.target.value })
                        }
                        required
                    />

                    <textarea
                        placeholder="Source"
                        value={articleContent.source}
                        onChange={(e) =>
                            setArticleContent({ ...articleContent, source: e.target.value })
                        }
                        required
                    />
                    
                    <button type="submit">Save</button>
                </form>
            </div>
    );
}

export default UploadArticle;
