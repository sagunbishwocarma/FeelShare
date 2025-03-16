import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ProfessionalContext = createContext({});

export function ProfessionalContextProvider({ children }) {
    const [professional, setProfessional] = useState(null);
      

    useEffect(() => {
        if (!professional) {
            fetchProfessionalProfile();
        }
    }, []);

    
    const fetchProfessionalProfile = async () => {
        try {
            const { data } = await axios.get('/profile');
            setProfessional(data);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            setProfessional(null); 
        } 
    };

    const logoutProfessional = async () => {
        try {
            await axios.post('/logout');
            setProfessional(null);
            navigate('/login');

        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    const fetchFiles = async () => {
        try {
            const res = await axios.get(`/files/${professional.professionalId}`);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ProfessionalContext.Provider value={{ 
            professional, 
            setProfessional,
            logoutProfessional,
            fetchFiles
        }}> 
            {children}
        </ProfessionalContext.Provider>
    );
}
