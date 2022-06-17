import {createContext, useContext } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext)
    return context
}

export function AuthProvider ({children}) {
    const signup = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password);

    const login = (email, password ) => {
    const userCredentials = signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials);
    }

    const logout = () => signOut(auth)
    console.log(logout);
    
    return (
    <authContext.Provider value={{signup, login, logout }}>{children}</authContext.Provider>
    );
}