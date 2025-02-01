import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import ProfessionalRegister from './Pages/ProfessionalRegister';
import LogIn from './Pages/LogIn';
import SeekerDashboard  from './Pages/SeekerDashboard';
import ProfessionalDashboard  from './Pages/ProfessionalDashboard';
import RoleSelection  from './Pages/RoleSelection';
import FAQs from './Components/FAQs';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';
import Hero from './Components/Hero';
import HowItWorks from './Components/howItWorks';
import './app.css';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';


// Set up Axios defaults
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
    <Toaster position='top-center' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/professionalregister" element={<ProfessionalRegister/>} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/seekerDashboard" element={<SeekerDashboard />} />
        <Route path="/professionalDashboard" element={<ProfessionalDashboard />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/howitworks" element={<howItWorks/>} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/roleselection" element={<RoleSelection/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
