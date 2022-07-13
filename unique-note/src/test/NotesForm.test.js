import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event' 
import Home from "../components/Home/Home";
import NotesForm from "../components/NotesForm/NotesForm";
import { getDocs } from "firebase/firestore";


jest.mock('firebase/firestore', () => { getDocs })
describe.only('Pruebas para NotesForm Componentes', ()=>{
it('Validacion de cargado de notas', () =>{
    const history = createMemoryHistory();
    render(
    <Router location={history.location} navigator={history}>
    <NotesForm/>
    </Router>)
    expect(screen.getByText(/Titulo/i)).toBeInTheDocument()   
})
})
