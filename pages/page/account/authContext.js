import React from "react";
import { useEffect,useState,useContext, use } from "react";

const Authcontext = React.createContext();

export function useAuth(){
    return useContext(Authcontext)
}

export function AuthProvider(props){
    const [authUser,setAuthUser] = useState(null);
    // const [isLoggedIn,setIsLoggedIn] =useState(false);
    
    const isLoggedIn =Boolean(authUser);


    const login = (user) => {
        setAuthUser(user);
      };

    const logout = () => {
        setAuthUser(null); 
      };



    const value ={
        authUser,
        isLoggedIn,
        logout,login
        
    }

    return (
        <Authcontext.Provider value={value}>{props}</Authcontext.Provider>
    )
}


