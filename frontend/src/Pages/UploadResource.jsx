import React, {useState, useContext } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import UploadFile from "../Components/UploadFile";
import UploadArticle from "../Components/UploadArticles";
import { Link } from "react-router-dom";

function UploadResource(){
    return(
        <div>
            <NavBar/>
            <li><Link to="/professionalDashboard">Home</Link></li>
            <div>
                <UploadFile />
            </div>
            <div>
                
                <UploadArticle />
            </div>
            <Footer/>

        </div>

    );
}

export default UploadResource;