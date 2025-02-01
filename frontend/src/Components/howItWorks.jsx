import React from 'react';

const HowItWorks = () => {
  return (
    <div>
      <style>
        {`
          .how-it-works-container {
            height: 100vh; 
            display: flex;
            flex-direction: column;
            justify-content: center; 
            align-items: center; 
            padding: 24px;
            text-align: center;
            background-color: #DAE5F3;
          }

          .section-title {
            font-size: 50px;
            font-weight: 700;
            color: #191BA2;
            margin-bottom: 40px;
            
          }

          .steps-container {
            display: flex;
            width: 1000px;
            flex-direction: column;
            gap: 50px;
          }

          .step-card {
            background-color: white; 
            padding: 16px;
            border-radius: 8px;        
          }

          .step-card h3 {
            font-size: 30px;
            font-weight: 600; 
            margin-bottom: 8px;
            color: #191BA2;
            
          }

          .step-card p {
            font-size: 20px;
            color: #4B5563; 
          }
        `}
      </style>

      <div className="how-it-works-container">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <h3>Sign Up:</h3>
            <p>Create your profile and start exploring.</p>
          </div>
          <div className="step-card">
            <h3>Connect with Professionals:</h3>
            <p>Book sessions with professionals as per your needs.</p>
          </div>
          <div className="step-card">
            <h3>Access Resources:</h3>
            <p>Learn from articles, exercises, and community support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
