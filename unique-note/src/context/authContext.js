import {createContext, useContext } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'

export const authContext = createContext();

export const useAuth = () => useContext(authContext)
  

export function AuthProvider ({children}) {
    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const login = (email, password ) => signInWithEmailAndPassword(auth, email, password);
    
     const logout = () => signOut(auth)
      /* console.log(logout);  */
 
   const google = ()  => {
    console.log("google esta iniciando")

   }
    return (
    <authContext.Provider value={{signup, login, logout, google}}>{children}</authContext.Provider>
    );
}