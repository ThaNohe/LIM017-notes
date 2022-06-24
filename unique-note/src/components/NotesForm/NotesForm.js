import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebaseConfig';
import { authContext } from '../../context/authContext';
import './NotesForm.css'



function NotesForm() {
  let user = auth.currentUser.email;
  const[email, setEmail] = useState()
  const context = useContext(authContext)

  const navigation = useNavigate()

  const handleLogout = (e) =>{
    context.logout(email)
    .then(() => navigation('/home'))
    .catch((error) => {
      console.log(error.code)
    })
  }


//Estados 
  const [notes, setNotes] = useState({initialState: null});
  /* const [notesDocs, setNotesDocs]= useState({initialState: null}) */
 
//Creacion de la coleccion
  const saveNotes = (note) => {
addDoc(collection(db, 'noteswrite'), {note});
  }
// Consulta a la base de datos
/* const getNotes = getDocs(query(collection(db, 'noteswrite')))

useEffect( () => {
getNotesData()
}, [])

const getNotesData = async () =>{
  const n = await getNotes();
  console.log(n);
  setNotesDocs(n) 
} */

//Boton que envía nota a cloudfirestore
  const btnsaveNotes = () => {
    saveNotes(notes)
    }

  return (
    <div className='Container-for'>
      <h1 onChange={e => setEmail(e.target.value)}>Bienvenido {user} </h1>
    <div className='content-btn'>
      <input
      type='text'
      onChange={ e => setNotes(e.target.value)}
      />
      <button onClick={btnsaveNotes} className='button-components'>Agregar Nota</button>
      <button onClick={handleLogout} className='button-components'>Cerrar Sesión</button>
      </div>
    </div>
  )
}

export default NotesForm