import React from 'react';
import './Register.css';
import { useState, useContext } from 'react';
/* import { useAuth } from '../../context/authContext'*/
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authContext'

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
   /* const { signup } = useAuth() */ 
   const navigate = useNavigate();
   const [error, setError] = useState(); 

   const contextValue = useContext(authContext)

//Info de cada input sea capturada
   const handleChange = ({target:{name, value}}) => 
     setUser({...user,[name]: value})
   
    const handleSubmit = (e) => {
     e.preventDefault();
     setError('')
     contextValue.signup(user.email, user.password)
     .then(()=>
     navigate('/Login'))
     .catch ((error)=> {
      console.log(error.code);
      switch(error.code){
        case '':
        setError('Campo vacío.Ingrese correo electrónico')
        break;
        case'auth/invalid-email':
        setError('Correo inválido')
        break;
        case'auth/email-already-in-use':
        setError('Correo en uso')
        break;
        case'auth/weak-password':
        setError('Contraseña débil')
        break;
        default:setError('Otro error');
      }
   
    }); 
 
   } 
  

   return (
    <div className='Container-for'>
    <form className='Form-reg'  onSubmit={handleSubmit}  >
      <img 
      className='Img-register' src={require('../../img/post3.png')}
      alt='Img Notes'/>
      <h1 className='title-div'>Registrese</h1>
      <input 
      type='text'
      name='text' 
      className='text-field' 
      placeholder='🎎Nombre' 
      required
      onChange={handleChange}
      />

      <input 
      type='email' 
      name='email'
      className='text-field' 
      placeholder='📧@Email' 
      required
      onChange={handleChange}
      />

      <input 
      type='password'
      name='password'
      className='text-field' 
      placeholder='🔒Password' 
      required
      onChange={handleChange}
      />

       <p>{error}</p>

      <div className='content-btn'>
      <button  type='submit' id='btnLog' className='button-components'>Registrate </button>
      </div>
    </form>
    </div>
  );
}
export default Register