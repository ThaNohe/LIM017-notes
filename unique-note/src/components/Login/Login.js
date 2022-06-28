import React from 'react';
import './Login.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authContext';

/* import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig'
import { useAuth } from '../../context/authContext'; */

 function Login () {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

   const navigate = useNavigate();
   const [error, setError] = useState(); 

   const contextValue = useContext(authContext)
    const handleSubmit = (e) => {
     e.preventDefault()
     setError('') 
     contextValue.login(email, password) 
     .then((user)=> {
      localStorage.setItem('email',user.user.email)
      navigate('/NotesForm')})
     .catch ((error)=> {
       console.log(error.code,'imp error login');
       switch(error.code){
        case '':
            setError('Campos vacíos.Ingrese correo y contraseña');
            break;
        case 'auth/user-not-found':
            setError('Usuario no registrado');
            break;
        case 'auth/wrong-password':
            setError('Contraseña inválida.Intente nuevamente');
            break;
        case 'auth/invalid-email':
            setError('Ingrese un correo válido');
        break;
        default:setError ('Otro error');
    }
      });

    }

    const  handleGoogleSignin = (e) =>{
      e.preventDefault()
      contextValue.loginWithGoogle()
      .then((user) => { 
        localStorage.setItem('email',user.user.email)
        navigate('/NotesForm')})
    }

  return (
<div className='Container-for'>
    <form className='Form-log' onSubmit={handleSubmit} >
      <img 
      className='Img-register' src={require('../../img/post3.png')}
      alt='Img Notes'/>
      <h1 className='title-div'>Inicia sesión</h1>
      
      <input 
      type='email' 
      name='email'
      className='text-field' 
      placeholder='📧@Email' 
      required
     onChange={(e)=> setEmail(e.target.value)} 
      />

      <input 
      type='password'
      name='password'
      className='text-field' 
      placeholder='🔒Password' 
      required
       onChange={(e)=> setPassword(e.target.value)} 
      />
      <p>{error}</p>

      <div className='content-btn'>
        <div className='btn-ingresar'>
        <button type='submit' id='btnRegister' className='button-components'>Ingresa</button>
        </div>
      <div className='btn-google'>
      <button onClick={handleGoogleSignin} className='button-google'> 
      Continue con Google
      {<img
        className="Img-google"
        src={require("../../img/google.png")}
        alt="Img google"
              />}
      </button>
      </div>
      </div>
    </form>
   </div>
  );
};
export default Login