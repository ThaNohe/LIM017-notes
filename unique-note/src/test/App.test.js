import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
/* import { Router } from "react-router-dom"; */

import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event' 
import Home from "../components/Home/Home";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import NotesForm from "../components/NotesForm/NotesForm";
import * as Routerobj  from 'react-router-dom';

test.only("Home renderiza vista Home",  async () => {
  const history = createMemoryHistory();
  console.log(Routerobj)
  const spyForNavigate = jest.spyOn(Routerobj,'useNavigate')
  
  render(
   /*  <Router location={history.location} navigator={history}> */
      <Home />
/*     </Router>
 */  );
  const user = userEvent.setup();  
  expect(screen.getByText(/Un bloc de notas a tu alcance ¡Toma nota ahora!/i)).toBeInTheDocument()
  await user.click(screen.getByText(/Registrarse/i)) 
expect(spyForNavigate).toHaveBeenCalledWith() 

});

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

test('full app rendering/navigating', async () => {
  const {
    container,
    history: {navigate},
  } = renderWithRouter(<App />)
  const appContainer = container
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(appContainer.innerHTML).toMatch('You are home')

  // with reach-router we don't need to simulate a click event, we can just transition
  // to the page using the navigate function returned from the history object.
  await navigate('/about')
  expect(container.innerHTML).toMatch('You are on the about page')
})
