import React from 'react';
import './Register.css';
import { useState } from 'react';
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom';

/* import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig'
import { useAuth } from '../../context/authContext'; */

 function Register() {
  //uso de hooks y método useState
  const [user, setUser] = useState({
     email: '',
     password: '',
   });
   const { signup } = useAuth()
   const navigate = useNavigate();
   const [error, setError] = useState(); 

//Info de cada input sea capturada
   const handleChange = ({target:{name, value}}) => 
     setUser({...user,[name]: value})
   
     
    const handleSubmit = async e => {
     e.preventDefault();
     setError('')
     try {
      await signup(user.email, user.password);
      navigate('/Login');
     } catch (error) {
       console.log(error.code);
       
     }   
   } 
  
   

   return (
    <div className='Container-for'>
    <form className='Form-reg'  onSubmit={handleSubmit}  >
      <img 
      className='Img-register' src={require('../../img/post3.png')}
      alt='Img Notes'/>
      <h1 className='title-div'>Registrate</h1>
      <input 
      type='text'
      name='text' 
      className='text-field' 
      placeholder='Nombre' 
      required
      onChange={handleChange}
      />

      <input 
      type='email' 
      name='email'
      className='text-field' 
      placeholder='Email' 
      required
      onChange={handleChange}
      />

      <input 
      type='password'
      name='password'
      className='text-field' 
      placeholder='Password' 
      required
      onChange={handleChange}
      />

      <div className='content-btn'>
      <button  type='submit' id='btnLog' className='button-components'>Registrate </button>
      </div>
    </form>
    </div>
  );
}
export default Register