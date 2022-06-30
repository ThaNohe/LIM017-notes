import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { authContext } from "../../context/authContext";
import "./NotesForm.css";

function NotesForm() {
  const [email, setEmail] = useState();
  const context = useContext(authContext);

  const inicializeDataInputs = {
    notestitle: "",
    description: "",
    author: localStorage.getItem("email"),
  };
  //Variables de estado
  const [dataInputs, setDataInputs] = useState(inicializeDataInputs);
  const [list, setList] = useState([]);

  //Funciones para logout
  const navigation = useNavigate();
  const handleLogout = (e) => {
    context
      .logout(email)
      .then(() => navigation("/home"))
      .catch((error) => {
        console.log(error.code);
      });
  };

  //Funcion para resetear info luego de enviarla;
  const saveNotes = async (e) => {
    e.preventDefault()
    await addDoc(collection(db, "notesGenerate"), 
    {...dataInputs,
    }).then((response) => {
    console.log(response)
    setDataInputs({ ...inicializeDataInputs });
    getList()
    })
  }
  
  //Funcion para capturar data de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataInputs({ ...dataInputs, [name]: value });
    /* console.log(name, value) */
  };

  //Funcion para renderizar lista de notas
  const getList = async () => {
    try {
      console.log("holaaaaaaaaaa");
      const querySnapshot = await getDocs(collection(db, "notesGenerate"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setList(docs);
    } catch (error) {
      /* console.log(error) */
    }
  };
  useEffect(() => {
    
    getList();
  }, []);

  return (
    <div className="Container-Gen">
      <div className="Container-WelcomeUser">
        <h1> Hola 👋 {localStorage.getItem("email")} Haz iniciado sesión </h1>
      </div>
      <div className="Container-InputNotes">
        <div className="btn-position">
          <button onClick={handleLogout} className="button-components-logout">
            {
              <img
                className="Img-logout"
                src={require("../../img/logOut.png")}
                alt="Img salir"
              />
            }
          </button>
        </div>
      
          <div>
            <input
              className="titleNote"
              type="text"
              name="notestitle"
              placeholder="Titulo de la  nota"
              onChange={handleInputChange}
              value={dataInputs.notestitle}
              /* onChange={ e => setNotes(e.target.value)} */
            />
            <textarea
              className="textareaNote"
              name="description"
              placeholder="Escribe una nota..."
              onChange={handleInputChange}
              value={dataInputs.description}
            ></textarea>F
          </div>
          <div className="btn-saveNotes">
          <button onClick={(e) =>saveNotes(e)} className="button-components-saveNotes"> Guardar </button>
            </div>
        
      </div>

      <div className="Container-PrintNotes">
        <div className="titleList">
        <h2>Lista de Notas</h2>
        </div>
        <div>
          {list.map((list) => (
            <div key={list.id}>
              <p>Author:{list.author}</p>
              <p>Titulo:{list.notestitle}</p>
              <p>Descripcion:{list.description}</p>

              <button className="btn-borrar">Borrar</button>
              <button className="btn-editar">Editar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotesForm;
