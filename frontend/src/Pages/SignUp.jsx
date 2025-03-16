import React, { useState } from "react";
import { Link } from 'react-router-dom';
import LogIn from './LogIn';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import '../css/register.css';

function Signup() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    password: '',
    confirmPassword: '',
    gender: '',
    type: 'Seeker'

  })


  const registerUser = async (e) => {
    e.preventDefault()
   
    const {firstName, lastName, email, phone, country, city, password,  confirmPassword, gender, type} = data
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const {data} = await axios.post('/signup', {
        firstName, lastName, email, phone, country, city, password, gender, type
      });
  
      if(data.error){
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Registration Successful')
        navigate('/login')
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div>
      <NavBar />
      <div className="signup-container">
      <h1>Seeker Register</h1>
      <form onSubmit={registerUser} className="signup-form">
        <div className="row">
          <input type="text" name="firstName" placeholder="First Name" value={data.firstName} onChange={(e) => setData({...data, firstName: e.target.value})} />
          <input type="text" name="lastName" placeholder="Last Name" value={data.lastName} onChange={(e) => setData({...data, lastName: e.target.value})}/>
        </div>

        <div className="row">
          <input type="email" name="email" placeholder="Email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
          <input type="text" name="phone" placeholder="Phone Number" value={data.phone} onChange={(e) => setData({...data, phone: e.target.value})}/>
        </div>

        <div className="row">
          <input type="text" name="country" placeholder="Country" value={data.country} onChange={(e) => setData({...data, country: e.target.value})}/>
          <input type="text" name="city" placeholder="City" value={data.city} onChange={(e) => setData({...data, city: e.target.value})}/>
        </div>

        <div className="row">
          <input type="password" name="password" placeholder="Password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
        </div>

        


        <div className="gender-group">
          <label>
            <input type="radio" name="gender" value="Male" checked={data.gender === "Male"} onChange={(e) => setData({...data, gender: e.target.value})}/>
            Male
          </label>

          <label>
            <input type="radio" name="gender" value="Female" checked={data.gender === "Female"} onChange={(e) => setData({...data, gender: e.target.value})}/>
            Female
          </label>

          <label>
            <input
              type="radio" name="gender" value="Others" checked={data.gender === "Others"} onChange={(e) => setData({...data, gender: e.target.value})}/>
            Others
          </label>

        </div>
        <button type="submit"  className="register-button">Register</button>
      </form>
      
      <p className="login-navigation">
      Already have an account? <Link to="/login">Log In</Link>
    </p>
    
    </div>
      <Footer />
    </div>

    
  );
}


export default Signup;
