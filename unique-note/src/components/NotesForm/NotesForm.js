import React from 'react'
import { useNavigate } from 'react-router-dom';

function NotesForm() {
  const navigateforHom = useNavigate() 
    const btnforHom = () => {
        navigateforHom('/Home');
    }

  return (
    <div className='Container-for'>
    <div className='content-btn'>
      <button onClick={btnforHom} type='submit' id='btnHom' className='button-components'>Cerrar Sesión</button>
      </div>
    </div>
  )
}

export default NotesForm