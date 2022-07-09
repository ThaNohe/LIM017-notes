import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom"; 

import '@testing-library/jest-dom'
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import NotesForm from "../components/NotesForm/NotesForm";


test("Register renderiza vista Register", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Register />
    </Router>
  );
  expect(screen.getByText(/Registrese/i)).toBeInTheDocument()
});

test("Login renderiza vista Login", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Login />
    </Router>
  );
  expect(screen.getByText(/Inicia sesión/i)).toBeInTheDocument()
});

test("NotesForm renderiza vista NotesForm", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <NotesForm />
    </Router>
  );
  expect(screen.getByText(/Hola/i)).toBeInTheDocument()
}); 

