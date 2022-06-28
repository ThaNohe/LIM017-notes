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
  //Estados 27
  /*   const [notes, setNotes] = useState({initialState: null});
   */ /* const [notesDocs, setNotesDocs]= useState({initialState: null}) */

  //Creacion de la coleccion 31 32
  /* const saveNotes = (note) => {
addDoc(collection(db, 'noteswrite'), {note});
  } */
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

  //Boton que envía nota a cloudfirestore 48 49 50
  /* const btnsaveNotes = () => {
    saveNotes(notes)
    } */
  //Funcion para resetear info luego de enviarla;
  const handleSubmit = async (e) => {
    e.preventDefault();
    /* console.log(dataInputs); */
    try {
      await addDoc(collection(db, "notesGenerate"), {
        ...dataInputs,
      });
    } catch (error) {
      console.log(error);
    }
    setDataInputs({ ...inicializeDataInputs });
  };

  //Funcion para capturar data de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataInputs({ ...dataInputs, [name]: value });
    /* console.log(name, value) */
  };

  //Funcion para renderizar lista de notas
  useEffect(() => {
    const getList = async () => {
      try {
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
    getList();
  }, [list]);

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
        <form onSubmit={handleSubmit}>
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
            ></textarea>
          </div>
          <div className="btn-saveNotes">
            <button className="button-components-saveNotes"> Guardar </button>
            </div>
        </form>
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
