import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotesForm from './components/NotesForm/NotesForm';
import { AuthProvider } from './context/authContext'
import Header from './components/Header/Header'

function App () {
  return (
    <AuthProvider> 
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />      
        <Route path="login" element={<Login />} />
        <Route path="notesform" element={<><Header/><NotesForm /></>} />
    </Routes>
  </BrowserRouter>
  </AuthProvider> 
  )
}

export default App;