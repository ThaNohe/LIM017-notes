import React from 'react'
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    
    const navigateforLog = useNavigate() 
    const btnforLog = () => {
        navigateforLog('/Login');
    }

    const navigateforReg = useNavigate() 
    const btnforReg = () => {
        navigateforReg('/Register');
    }

  return (
    <div className='Container-home'>
        <img 
      className='Img-title' src={require('../../img/text3.gif')}
      alt='Img title'/>
      <img 
      className='Img-home' src={require('../../img/post5.png')}
      alt='Img newpostit'/>
      <p>Un bloc de notas a tu alcance
          ¡Toma nota ahora!
        </p>
        <div className='content-btn'>
      <button onClick={btnforLog} type='submit' id='btnLog' className='button-components-h1'>Inicia Sesión </button>
      <button onClick={btnforReg} type='submit' id='btnReg' className='button-components-h2'>Registrarse </button>
      </div>
    </div>
  )
}

export default Home