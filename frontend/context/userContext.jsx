import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);
   
    
    useEffect(() => {
        
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get('/profile');
                setUser(data); 
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                setUser(null); 
            } 
        };

        fetchUserProfile();
    }, []);

    

    const logoutUser = async () => {
        try {
            await axios.post('/logout');
            setUser(null); 
            navigate('/login');
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    

  
    return (
        <UserContext.Provider value={{ user, setUser, logoutUser }}> 
            {children}
        </UserContext.Provider>
    )
}

