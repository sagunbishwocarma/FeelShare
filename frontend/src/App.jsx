import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import ProfessionalRegister from './Pages/ProfessionalRegister';
import LogIn from './Pages/LogIn';
import SeekerDashboard  from './Pages/SeekerDashboard';
import ProfessionalDashboard  from './Pages/ProfessionalDashboard';
import SessionManagement  from './Pages/SessionManagement';
import RoleSelection  from './Pages/RoleSelection';
import FAQs from './Components/FAQs';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';
import Hero from './Components/Hero';
import HowItWorks from './Components/howItWorks';
import './app.css';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import { ProfessionalContextProvider } from '../context/professionalContext';
import JournalForm from './Pages/CreateJournal';
import Journals from './Pages/Journals';
import MoodTracker from './Pages/DailyMoodTracker';
import UploadFile from './Components/UploadFile';
import UploadResource from './Pages/UploadResource';
import UploadArticle from './Components/UploadArticles';
import GoalForm from './Components/AddGoals';
import ViewGoals from './Pages/Goals';
import TaskItem from './Components/TaskItem';
import UpdateJournal from './Pages/UpdateJournal';
import UserNavBar from './Components/UserNavbar';
import Moods from './Pages/MoodTracker';
import UpdateMood from './Pages/UpdateDailyMood';
import ViewResources from './Pages/ViewResources';

// import PublicRoute from './Components/PublicRoute';
// import ProfessionalRoute from './Components/ProfessionalRoute';
// import UserRoute from './Components/UserRoute';

// Set up Axios defaults
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
    <ProfessionalContextProvider>
    <BrowserRouter>
    <Toaster position='top-center' toastOptions={{duration: 2000}} />
      <Routes>

        

          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/professionalregister" element={<ProfessionalRegister />} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/roleselection" element={<RoleSelection />} />

        
       

         

          <Route path="/seekerDashboard" element={<SeekerDashboard />} />        
          <Route path="/goalForm" element={<GoalForm />} />
          <Route path="/taskItem" element={<TaskItem />} />
          <Route path="/viewGoals" element={<ViewGoals />} />
          
          <Route path="/moodTracker" element={<MoodTracker />} />
          <Route path="/moods" element={<Moods />} />
          <Route path="/updateMood/:moodId" element={<UpdateMood />} />


          <Route path="/createJournal" element={<JournalForm />} />
          <Route path="/updateJournal/:journalId" element={<UpdateJournal />} />
          <Route path="/journals" element={<Journals />} />
        
         
          <Route path="/viewResources" element={<ViewResources/>} />
         

          <Route path="/professionalDashboard" element={<ProfessionalDashboard />} />
          <Route path="/uploadResource" element={<UploadResource />} />
          <Route path="/uploadFile" element={<UploadFile />} />
          <Route path="/uploadArticle" element={<UploadArticle />} />
          <Route path="/sessionmanagement" element={<SessionManagement/>} />
        
        
        


        <Route path="/faqs" element={<FAQs />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/howitworks" element={<HowItWorks/>} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/userNavbar" element={<UserNavBar/>} />
        
                
      </Routes>
    </BrowserRouter>
    </ProfessionalContextProvider>    
    </UserContextProvider>
    
  );
}

export default App;
