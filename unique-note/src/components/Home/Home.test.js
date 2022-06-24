import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
/* import App from './App'; */
import { createMemoryHistory } from 'history';
import React from 'react'
import {Router} from 'react-router-dom'
import Home from './components/Home/Home.js';


 test('Home renderiza boton de iniciar sesion', async () => {
  const history = createMemoryHistory()
  render(
  <Router location = {history.location} navigator={history}>
  <Home />
  </Router>,
  )
  const user = userEvent.setup()
  expect(screen.getByText(/Inicia Sesión/i)).toBeInTheDocument()
  await user.click(screen.getByText(/login/i))
  });

/* test('Comprobar que useNavigate funcione', () => {
  render(<Home/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */