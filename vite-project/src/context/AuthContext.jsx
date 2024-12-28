import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const[user,setUser] = useState(null);
    const navigate = useNavigate();

    const login = async(credentials) =>{
        try {
            const res = await fetch('http://localhost:5000/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(credentials),
            });
            const data = await res.json();
            if(data.success){
                setUser(data.user);
                navigate('/reserve'); 
            }
            else alert(data.message);
        } catch (error) {
            console.error('Login failed', error);
        }
    }

    const signup = async(credentials) =>{
        try {
            const res = await fetch('http://localhost:5000/api/signup',{
                method:'POST',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify(credentials),
            });
            const data = await res.json();
            if(data.success){
                setUser(data.user);
                navigate('/reserve');
            }
            else alert(data.message);
        } catch (error) {
            console.error('Signup failed', error);
        }
    }
    
  return (
    <AuthContext.Provider value={{user,login,signup}}>
        {children}
    </AuthContext.Provider>
  )
}
