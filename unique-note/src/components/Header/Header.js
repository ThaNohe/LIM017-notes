import React, {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import './Header.css'

function Header () {
    const context = useContext(authContext);
    //Funciones para logout
  const navigation = useNavigate();
  const handleLogout = (e) => {
    context
      .logout()
      .then(() => navigation("/home"))
      .catch((error) => {
        console.log(error.code);
      });
  };

    return(
        <div className='Container-NavBar'>
        <div className='header-title-Name'>
            {/* <h1>UNIQUE NOTES</h1> */}
        <img
        className="Img-title-h"
        src={require("../../img/text3.gif")}
        alt="Img title"
      />
      {/* <div className='Welcome-h'>
       <h1> Hola 👋 {localStorage.getItem("email")} Haz iniciado sesión</h1>
       </div> */}
        </div>
        <div className='Container-Btn-Logout'>
             <div className="btn-position">
          <button onClick={handleLogout} className="button-components-logout">
            {
              <img
                className="Img-logout"
                src={require("../../img/logOut2.png")}
                alt="Img salir"
              />
            }
          </button>
        </div>
    </div>
</div>     
    )
}

export default Header