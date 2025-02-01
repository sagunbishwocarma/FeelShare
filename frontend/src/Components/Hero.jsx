import React from 'react';
import hero from '../assets/heroimg.png';
import { Link } from 'react-router-dom';
import RoleSelection from "../Pages/RoleSelection";

function HeroSection() {
  return (
    <div className="Home">
      <style>
        {`
          .Home {
            margin:  auto;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          
          

          .hero {
            text-align: center;
            padding: 50px 20px;
            background-color: #fff;
          }

            

          .hero-content h1 {
            font-size: 50px;
            color: #191BA2;
            margin-bottom: 20px;
            font-weight: 700;
          }

          .hero-content p {
            font-size: 18px;
            color: #555;
            margin-bottom: 40px;
          }

          .start-today-btn {
            background-color: #191BA2;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            text-decoration: none;
          }

          .start-today-btn:hover {
            background-color: #0056b3;
          }
        `}
      </style>


      <section className="hero">
             
        <div className="hero-image">
            <img src={hero} alt="Mental Wellness" />
        </div>

        <div className="hero-content">
          <h1>Your Path to Mental Wellness Starts Here</h1>
          <p>
            A compassionate space to connect with professionals, explore resources,
            and support your mental health journey.
          </p>

          <Link to="/roleselection">
            <button className="start-today-btn">Start Today</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
