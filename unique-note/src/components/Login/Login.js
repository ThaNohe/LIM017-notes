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
    //uso de hooks y método useState
   const [user, setUser] = useState({
     email: '',
     password: '',
   }); 
  /* const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); */

/* const { login } = useContext(authContext)
 */   /* const { login } = useAuth()  */
   const navigate = useNavigate();
   const [error, setError] = useState(); 

   const contextValue = useContext(authContext)
  
   const handleChange = ({target:{name, value}}) => 
     setUser({...user,[name]: value}) 
   
    const handleSubmit = (e) => {
     e.preventDefault()
     setError('') 
     contextValue.login(user.email, user.password) 
     .then((response)=>
     navigate('/NotesForm'))
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
      placeholder='Email' 
      required
      /* value = { email } */
      onChange={handleChange} 
     /*  onChange={(e)=> setEmail(e.target.value)} */
      />

      <input 
      type='password'
      name='password'
      className='text-field' 
      placeholder='Password' 
      required
      /* value= { password} */
      onChange={handleChange} 
      /* onChange={(e)=> setPassword(e.target.value)} */
      />
      <p>{error}</p>

      <div className='content-btn'>
      <button type='submit' id='btnRegister' className='button-components'>Ingresa </button>
      </div>
    </form>
   </div>
  );
};
export default Login