import React, { useState, useEffect } from "react";

import { addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import {
  db,
  getDocs,
  query,
  where,
  collection,
} from "../../firebase/firebaseConfig";

import './NotesForm.css';
import { AddTitleComponent } from "./AddTitleComponent";

function NotesForm() {
  const inicializeDataInputs = {
    notestitle: "",
    description: "",
    author: localStorage.getItem("email"),
  };
  //Variables de estado
  const [dataInputs, setDataInputs] = useState(inicializeDataInputs);
  const [list, setList] = useState([]);
  const [updatingNote, setUpdatingNote] = useState(false);

  //Funcion para capturar data de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataInputs({ ...dataInputs, [name]: value });
    /* console.log(name, value) */
  };

  //Funcion para guardar y actualizar datos
  const saveNotes = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "notesGenerate"), { ...dataInputs }).then(
      (response) => {
        console.log(response);
        setDataInputs({ ...inicializeDataInputs });
        getList();
      }
    );
  };

  //Funcion para renderizar lista de notas
  const getList = async () => {
    try {
      /* console.log("holaaaaaaaaaa");  */
      const q = query(
        collection(db, "notesGenerate"),
        where("author", "==", localStorage.getItem("email"))
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot, 'db') 
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      console.log("buscar2", docs);
      setList(docs);
    } catch (error) {
      console.log("busca1", error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  // Comparación para edición
  const getPostNote = (id) => {
    list.forEach((note) => {
      if (note.id === id) {
        setDataInputs(note);
        setUpdatingNote(true);
      }
    });
  };
  //Función que actualiza data luego de editarla , cambio de boton guardar y editar
  const updateNote = (e) => {
    e.preventDefault();
    updateDoc(doc(db, "notesGenerate", dataInputs.id), {
      ...dataInputs,
    }).then((response) => {
      setDataInputs({ ...inicializeDataInputs });
      setUpdatingNote(false);
    });
    getList();
  };

  //Funcion para eliminar nota generada por usuario
  const deleteUser = (id) => {
     deleteDoc(doc(db, "notesGenerate", id)).then(() => {
      getList();
    });
  };

  return (
    <div>
      <div>
        <AddTitleComponent/>
      </div>
    
      <div className="container-gen">
        <div className="container-input-notes">
          <div>
            <div className="title-list">
              <h2>Escribe una nota</h2>
            </div>
            <input
              className="title-note"
              type="text"
              name="notestitle"
              placeholder="Titulo de la  nota"
              onChange={handleInputChange}
              value={dataInputs.notestitle}
              /* onChange={ e => setNotes(e.target.value)} */
            />
            <textarea
              className="textarea-note"
              name="description"
              placeholder="Escribe una nota..."
              onChange={handleInputChange}
              value={dataInputs.description}
            ></textarea>
          </div>
          <div className="btn-saveNotes">
            {updatingNote ? (
              <button
                onClick={(e) => updateNote(e)}
                className="btn-comp-save-notes"
              >
                {" "}
                Editar{" "}
              </button>
            ) : (
              <button
                onClick={(e) => saveNotes(e)}
                className="btn-comp-save-notes"
              >
                {" "}
                Guardar{" "}
              </button>
            )}
          </div>
        </div>

        <div className="container-print-notes">
          <div className="title-list">
            <h2>Lista de Notas</h2>
          </div>
          <div className="container-notes">
            {list.map((listes) => (
              <div className="container-textarea-note-generate" key={listes.id}>
                <div className="text-title">
                  <p>Titulo:{listes.notestitle}</p>
                </div>
                <div className="text-descript">
                  <p>Descripcion:{listes.description}</p>
                </div>

                <button
                  className="btn-borrar"
                  onClick={() => deleteUser(listes.id)}
                >
                  Borrar
                </button>
                <button
                  className="btn-editar"
                  onClick={() => getPostNote(listes.id)}
                >
                  Editar
                </button>
              </div>
            ))}
          </div>
        </div> 
      </div>
    </div>
  );
}

export default NotesForm;
