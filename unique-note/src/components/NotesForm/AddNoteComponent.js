import React from 'react';

import "./NotesForm.css";

export function AddNoteComponent(deleteUser){
    

    return (
        <div className="Container-PrintNotes">
        <div className="titleList">
            <h2>Lista de Notas</h2>
          </div>
          <div>
          {list.map((listes) => (
            <div className="Container-textareaNoteGenerate" key={listes.id}>
              <div className="Text-Title">
                <p>Titulo:{listes.notestitle}</p>
              </div>
              <div className="Text-Descript">
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
        
    );

}

export default AddNoteComponent;