import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import '../css/login.css';
import { UserContext } from "../../context/userContext";
import { ProfessionalContext } from "../../context/professionalContext";

function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const { setUser } = useContext(UserContext); 
    const { setProfessional } = useContext(ProfessionalContext);
    
    const loginUser = async (e) => {
        e.preventDefault();

        const { email, password } = data;

        try {
            const { data: response } = await axios.post('/login', {
                email,
                password,
            });

            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success('Login Successful');

                
                if (response.type === 'Seeker') {
                    setUser(response);
                    navigate('/seekerDashboard');
                    
                } else if (response.type === 'Professional') {
                    setProfessional(response); 
                    navigate('/professionalDashboard');
                }

                setData({ email: '', password: '' });
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <NavBar />

            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={loginUser} className="login-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>

                <p className="signup-navigation">
                    Don't have an account? <Link to="/roleselection">Register</Link>
                </p>
            </div>

            <Footer />
        </div>
    );
}

export default Login;