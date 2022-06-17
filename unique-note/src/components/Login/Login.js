import React from 'react';
import './Login.css';
import { useState } from 'react';
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom';

/* import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig'
import { useAuth } from '../../context/authContext'; */

 function Login() {
  
  const [user, setUser] = useState({
     email: '',
     password: '',
   });

   const { login } = useAuth()
   const navigate = useNavigate();
   const [error, setError] = useState(); 

   const handleChange = ({target:{name, value}}) => 
     setUser({...user,[name]: value})
   
    const handleSubmit = async (e) => {
     e.preventDefault();
     setError('')
     try {
      await login(user.email, user.password);
      navigate('/NotesForm');
     } catch (error) {
       console.log(error.code);
/*        const wrongInput = divElement.querySelector('.error');
 */       switch (error.code) {
        case '':
          /* error-message = 'Correo invalido'; */
          setError('Campo vacio')
          break;
        case 'auth/invalid-email':
          setError('Correo inválido') 
          break;
        case 'auth/email-already-in-use':
          setError('Correo ya registrado')
          break;
        default:
      }

       /* if(error.code === 'auth/internal-error'){
         setError('Correo invalido')} */
         /* if(error.code === 'auth/user-not-found'){
          setError('Correo invalido');
          console.log(setError)
        } */
       }
     }   
    

  return (
<div className='Container-for'>
    <form className='Form-log'  onSubmit={handleSubmit}  >
      <img 
      className='Img-register' src={require('../../img/post3.png')}
      alt='Img Notes'/>
      <h1 className='title-div'>Inicia sesión</h1>
      
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
      <p className='error-message'></p>


      <div className='content-btn'>
      <button type='submit' id='btnRegister' className='button-components'>Ingresa </button>
      </div>
    
    </form>
    </div>
  );
}
export default Login