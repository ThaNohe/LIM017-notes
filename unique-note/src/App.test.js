import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotesForm from "./components/NotesForm/NotesForm";

import '@testing-library/jest-dom'

test("Home renderiza vista", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Home />
    </Router>
  );
  /* const user = userEvent.setup();  */
  expect(screen.getByText(/Un bloc de notas a tu alcance ¡Toma nota ahora!/i)).toBeInTheDocument()
  /* await user.click(screen.getByText(/about/i)); */
});

test("Register renderiza vista", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Register />
    </Router>
  );
  expect(screen.getByText(/Registrese/i)).toBeInTheDocument()
});

test("Login renderiza vista", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Login />
    </Router>
  );
  expect(screen.getByText(/Inicia sesión/i)).toBeInTheDocument()
});

test("NotesForm renderiza vista", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <NotesForm />
    </Router>
  );
  expect(screen.getByText(/Hola/i)).toBeInTheDocument()
});

/* test('Comprobar que useNavigate funcione', () => {
  render(<Home/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */
