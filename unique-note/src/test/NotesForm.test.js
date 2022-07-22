import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";
import NotesForm from "../components/NotesForm/NotesForm";

jest.mock("../firebase/firebaseConfig");
describe("Pruebas para NotesForm Componentes", () => {
  it.only("Validacion de cargado de notas", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <NotesForm />
      </Router>
    );
    await waitFor(() => expect(screen.getByText(/Titulo:test/i)).toBeInTheDocument());
  });
});
