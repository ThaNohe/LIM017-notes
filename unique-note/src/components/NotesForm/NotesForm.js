import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc
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
  const [postNote, setPostNote] = useState('');
  const [updatingNote, setUpdatingNote] = useState(false)

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

  //Funcion para guardar y actualizar datos 
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
  
  const updateNote =  async(e) =>{
    e.preventDefault()
    updateDoc(doc(db,'notesGenerate', dataInputs.id),{
    ...dataInputs})
    .then((response) =>{
      setDataInputs({ ...inicializeDataInputs })})
    getList() 
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
      /* console.log("holaaaaaaaaaa"); */
      const querySnapshot = await getDocs(collection(db, 'notesGenerate'));
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

  //Funcion para eliminar usuario
const deleteUser = async(id) =>{
await deleteDoc(doc(db,'notesGenerate', id))
.then(() =>{
  getList()
})
  }

const getPostNote = async(id) => {
  list.forEach(note =>{
    if(note.id===id){
      setDataInputs(note)
      setUpdatingNote(true)
    }
  })
}

useEffect(() => {
if(postNote !== '') {
  getPostNote(postNote)
}
},[]) 

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
            ></textarea>
          </div>
          <div className="btn-saveNotes">
            {
              updatingNote 
              ? <button onClick={(e) =>updateNote(e)} className="button-components-saveNotes"> Editar </button>
              :  <button onClick={(e) =>saveNotes(e)} className="button-components-saveNotes"> Guardar </button>
            }
         
            </div>
        
      </div>

      <div className="Container-PrintNotes">
        <div className="titleList">
        <h2>Lista de Notas</h2>
        </div>
        <div>
          {list.map((listes) => (
            <div key={listes.id}>
              <p>Author:{listes.author}</p>
              <p>Titulo:{listes.notestitle}</p>
              <p>Descripcion:{listes.description}</p>

              <button className="btn-borrar" onClick ={() =>deleteUser(listes.id)}>Borrar</button>
              <button className="btn-editar" onClick ={() =>getPostNote(listes.id)}>Editar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotesForm;
