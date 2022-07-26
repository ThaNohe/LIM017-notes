import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();
  const btnforLog = () => {
    navigate("/Login");
  };

  const btnforReg = () => {
    navigate("/Register");
  };

  return (
    <div className="container-home">
      <img
        className="img-title"
        src={require("../../img/text3.gif")}
        alt="Img title"
      />
      <img
        className="img-home"
        src={require("../../img/post5.png")}
        alt="Img newpostit"
      />
      <div className="title-welcome1">
        <h1>Un bloc de notas a tu alcance <br></br>¡Toma nota ahora!</h1>
      </div>
      <div className="content-btn">
        <button
          onClick={btnforLog}
          type="submit"
          id="btnLog"
          className="button-components-h1"
        >
          Inicia Sesión
        </button>
        <button
          onClick={btnforReg}
          type="submit"
          id="btnReg"
          className="button-components-h2"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Home;
